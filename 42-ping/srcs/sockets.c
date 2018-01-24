#include "../includes/ping.h"

int                   create_raw_socket(t_ping *ping)
{
  int							    sockfd, sockopt;
  t_ip                *ip;

  ip = &ping->ip;
  sockfd = 0x00;
	if ((sockfd = socket(ip->domain, SOCK_RAW, IPPROTO_ICMP)) == -1) {
		printf("init_raw_socket(): ipv%c socket creation failure.\n", (ip->type + 0x30));
		return (0);
	}
  else if (sockfd < 3) {
		printf("init_raw_socket(): ipv%c socket creation failure.\n", (ip->type + 0x30));
		return (0);
	}
  sockopt = 0x01;
  if ((setsockopt(sockfd, IPPROTO_IP, IP_HDRINCL, &sockopt, sizeof(int))) == -1) {
    printf("init_raw_socket(): option set failure.\n");
    return (0);
  }
  ip->fd.raw = sockfd;
  return (1);
}
