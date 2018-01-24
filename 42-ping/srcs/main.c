#include "../includes/ping.h"

static int            create_dependancies(t_ping *ping)
{
  if (!(create_raw_socket(ping))) {
    printf("create_dependancies(): ipv4 socket initialization failure.\n");
    return (0);
  }
  if (!(create_icmp_header(ping))) {
    printf("create_dependancies(): ICMP header initialization failure.\n");
    return (0);
  }
  if (!(create_ip_header(ping))) {
    printf("create_dependancies(): IP header initialization failure.\n");
    return (0);
  }
  return (1);
}

static int            start_program(t_ping *ping)
{
  if (ping->opts.flag.preload) {
    while (ping->opts.preload--)
      send_packet(ping);
  }

  update_stats(ping, started);
  print_intro(ping);

  while (1)
    recv_packet(ping);

  return (1);
}

static int           init_program(t_ping *ping, int argc, char *argv[])
{
  if (!browse_opts(ping, argc, argv))
    return (0);
  if (!init_struct(ping))
    return (0);
  if (!(request_addr_infos(argv[argc - 1], ping)))
    return (0);
  if (!(create_dependancies(ping)))
    return (0);

  bind_signals();
  alarm(1);

  return (start_program(ping));
}

int                   main(int argc, char *argv[])
{
  t_ping              *ping;

  ping = NULL;
  if (getuid() != 0)
    printf("The program need the root rights to be launched\n");
  else if (argc < 2)
    print_usage(argv[0]);
  else if (!(ping = require_data()))
    printf("main(): cannot load t_ping root struct.\n");
  else if (!init_program(ping, argc, argv))
    printf("main(): program initialization failure\n");

	return (0);
}
