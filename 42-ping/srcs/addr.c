#include "../includes/ping.h"

/*
** Taking only the first result but can be enhanced to take any addresses
*/
static int            register_addr_infos(t_ping *ping)
{
  void                *addr;
  struct addrinfo		  *infos;

  infos = ping->infos;

  addr = ((void *)&((struct sockaddr_in *)infos->ai_addr)->sin_addr);
  inet_ntop(AF_INET, addr, ping->ip.tostr, INET_ADDRSTRLEN);
  return (1); // Useless
}

int                   request_addr_infos(const char *target, t_ping *ping)
{
  int                 status;
  struct addrinfo			hints, **infos;

  if (target && *target == '-') {
    print_usage(ping->pname);
    exit(EXIT_SUCCESS);
  }

  status = 0;
  infos = &ping->infos;
  ft_memset(&hints, 0, sizeof(struct addrinfo));

  hints.ai_family = AF_INET; // AF_INET || AF_INET6 || AF_UNSPEC
  hints.ai_flags = AI_CANONNAME;
  hints.ai_socktype = SOCK_STREAM;

  if ((status = getaddrinfo(target, NULL, &hints, infos))) {
    printf("%s: unknown host %s\n", ping->pname, target);
    return (0);
  }
  if (!infos) {
    printf("request_addr_infos(): No result.\n");
    return (0);
  }
  if (!(register_addr_infos(ping))) {
    printf("request_addr_infos(): infos registering failure.\n");
    return (0);
  }
  return (1);
}
