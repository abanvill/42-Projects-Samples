#include "../includes/ping.h"

static int            option_packet_size(t_ping *ping, char *arg)
{
  int                 res;

  if (!arg) {
    print_usage(ping->pname);
    return (0);
  }
  if ((res = ft_atoi(arg)) > 0xFFFF - (8 - 1)) {
    printf("%s: packet size too large: %d\n", ping->pname, res);
    return (0);
  }
  else if ((unsigned int)res > (unsigned int)(0xFFFF - (int)(HDS))) {
    printf("Error: packet size %d is too large. Maximum is %d\n", res, 0xFFFF - (int)(HDS));
    return (0);
  }
  else if (res < 0) {
    printf("%s: illegal negative packet size %d.\n", ping->pname, res);
    return (0);
  }
  ping->opts.flag.packetsize = 1;
  ping->opts.packetsize = res;
  return (1);
}

static int            option_ttl(t_ping *ping, char *arg)
{
  int                 res;

  if (!arg) {
    printf("%s: option requires an argument -- 't'\n", ping->pname);
    print_usage(ping->pname);
    return (0);
  }
  if ((res = ft_atoi(arg)) > (int)0xFF || res < 0) {
    printf("%s: ttl %u out of range\n", ping->pname, res);
    return (0);
  }
  else if (!res) {
    printf("%s: can't set unicast time-to-live: Invalid argument\n", ping->pname);
    return (0);
  }
  ping->opts.flag.ttl = 1;
  ping->opts.ttl = res;
  return (1);
}

static void           option_help(t_ping *ping, char *arg)
{
  (void)arg;
  (void)ping;
  print_usage(ping->pname);
  exit(EXIT_SUCCESS);
}

static int            option_show_timestamp(t_ping *ping, char *arg)
{
  (void)arg;
  (void)ping;
  ping->opts.flag.showtimestamp = 1;
  return (1);
}

static int            option_verbose(t_ping *ping, char *arg)
{
  (void)arg;
  ping->opts.flag.verbose = 1;
  return (1);
}

static int            option_set_deadline(t_ping *ping, char *arg)
{
  int                 res;

  if (!arg) {
    printf("%s: option requires an argument -- 'w'\n", ping->pname);
    print_usage(ping->pname);
    return (0);
  }
  if ((unsigned int)(res = ft_atoi(arg)) > 0xFFFFFFFF || res < 0) {
    printf("%s: bad wait time.\n", ping->pname);
    return (0);
  }
  if (!res)
    return (1);
  ping->opts.flag.deadline = 1;
  ping->opts.deadline = res;
  return (1);
}

static int            option_set_count(t_ping *ping, char *arg)
{
  int                 res;

  if (!arg) {
    printf("%s: option requires an argument -- 'c'\n", ping->pname);
    print_usage(ping->pname);
    return (0);
  }
  if ((unsigned int)(res = ft_atoi(arg)) > 0xFFFFFFFF || res <= 0) {
    printf("%s: bad number of packets to transmit.\n", ping->pname);
    return (0);
  }
  ping->opts.flag.count = 1;
  ping->opts.count = res;
  return (1);
}

static int            option_set_preload(t_ping *ping, char *arg)
{
  int                 res;

  if (!arg) {
    printf("%s: option requires an argument -- 'c'\n", ping->pname);
    print_usage(ping->pname);
    return (0);
  }
  if ((unsigned int)(res = ft_atoi(arg)) > 0xFF || res <= 0) {
    printf("%s: bad preload value, should be 1..256\n", ping->pname);
    return (0);
  }
  else if (ping->uid && res > 3) {
    printf("%s: cannot set preload to value > 3\n", ping->pname);
    return (0);
  }
  ping->opts.flag.preload = 1;
  ping->opts.preload = res;
  return (1);
}

static int            option_set_type(t_ping *ping, char *arg)
{
  int                 res;

  if (!arg) {
    printf("%s: option requires an argument -- 'T'\n", ping->pname);
    print_usage(ping->pname);
    return (0);
  }
  if ((unsigned int)(res = ft_atoi(arg)) > 32 || res < 0) {
    printf("%s: bad icmp type value, should be 0..32\n", ping->pname);
    return (0);
  }
  ping->opts.flag.icmp_type = 1;
  ping->opts.icmp_type = res;
  return (1);
}

static int            option_set_code(t_ping *ping, char *arg)
{
  int                 res;

  if (!arg) {
    printf("%s: option requires an argument -- 'C'\n", ping->pname);
    print_usage(ping->pname);
    return (0);
  }
  if ((unsigned int)(res = ft_atoi(arg)) > 32 || res < 0) {
    printf("%s: bad icmp code value, should be 0..16\n", ping->pname);
    return (0);
  }
  ping->opts.flag.icmp_code = 1;
  ping->opts.icmp_code = res;
  return (1);
}

int                   check_opt(char *arg, char *opt, int *args)
{
  size_t              i, j;

  i = 0;
  if (arg[i] != '-') {
    return (0);
  }
  i++;

  *opt = arg[i];

  j = 0;
  while (j < VALID_OPTIONS_NBR) {
    if (VALID_OPTIONS[j] == arg[i]) {
      *args = VALID_OPTIONS_ARGS[j] - 0x30;
      return (1);
    }
    j++;
  }
  return (-1);
}

int                   browse_opts(t_ping *ping, int argc, char *argv[])
{
  size_t              i;
  char                opt;
  int                 opt_args, res;
  void                *arg;

  i = 1;
  ping->pname = argv[0];
  argc -= 0;
  while (i < (unsigned int)argc) {
    if ((res = check_opt(argv[i], &opt, &opt_args)) == 1) {
      if (opt_args && i + 1 < (unsigned int)argc) {
        arg = argv[i + 1];
        i++;
        if (i == (unsigned int)argc - 1) {
          print_usage(ping->pname);
          exit(EXIT_SUCCESS);
        }
      }
      else
        arg = NULL;
      if (!parse_opts(ping, opt, arg)) {
        exit(EXIT_FAILURE);
      }
    }
    else if (res == -1) {
      printf("%s: invalid option -- '%c'\n", ping->pname, opt);
      exit(EXIT_FAILURE);
    }
    i++;
  }
  return (1);
}

int                   parse_opts(t_ping *ping, char opt, char *arg)
{
  switch (opt) {
    case ('c'):
      return (option_set_count(ping, arg));
    case ('h'):
      option_help(ping, arg);
      break ;
    case ('l'):
      return (option_set_preload(ping, arg));
    case ('s'):
      return (option_packet_size(ping, arg));
    case ('t'):
      return (option_ttl(ping, arg));
    case ('v'):
      return (option_verbose(ping, NULL));
    case ('w'):
      return (option_set_deadline(ping, arg));
    case ('C'):
      return (option_set_code(ping, arg));
    case ('D'):
      return (option_show_timestamp(ping, arg));
    case ('T'):
      return (option_set_type(ping, arg));
    default:
      break ;
  }
  return (1);
}
