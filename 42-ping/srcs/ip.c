#include "../includes/ping.h"

int                   create_ip_header(t_ping *ping)
{
  struct iphdr				*in;
  struct addrinfo     *infos;

  infos = ping->infos;
  in = &ping->ip.frame.hdr.ip;
  in->ihl = IPV4_HEADER_LENGTH;
  in->version = ping->ip.type;
  in->id = ping->pid & 0xFFFF;
  in->protocol = IPPROTO_ICMP;
  in->daddr = ((struct sockaddr_in *)infos->ai_addr)->sin_addr.s_addr;

  if (ping->opts.flag.packetsize)
    in->tot_len = sizeof(struct iphdr) + sizeof(struct icmphdr) + ping->opts.packetsize;
  else
    in->tot_len = sizeof(struct iphdr) + sizeof(struct icmphdr) + DEFAULT_DATA_SIZE; // - Backup

  if (ping->opts.flag.ttl)
    in->ttl = ping->opts.ttl;
  else
    in->ttl = IPV4_DEFAULT_TTL;

  in->check = inet_checksum((unsigned short *)in, 0, sizeof(struct iphdr));
  return (1);
}
