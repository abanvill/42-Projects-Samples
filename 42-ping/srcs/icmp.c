#include "../includes/ping.h"

/*
** Must be enhanced to be ip version agnostic
*/
int                   create_icmp_header(t_ping *ping)
{
  struct icmphdr      *icmp;
  unsigned long       *data;
  struct timeval      start;

  gettimeofday(&start, NULL);

  data = (unsigned long *)&ping->ip.frame.hdr.data;
  *data = (start.tv_sec & 0xFFFFFFFF);

  icmp = &ping->ip.frame.hdr.icmp;

  icmp->un.echo.id = ping->pid;
  icmp->un.echo.sequence = 0x01;

  icmp->type = (ping->opts.flag.icmp_type) ? ping->opts.icmp_type : ICMP_ECHO;
  icmp->code = (ping->opts.flag.icmp_code) ? ping->opts.icmp_code : 0;

  return (update_icmp_checksum(&ping->ip));
}

/*
** Must be enhanced to be ip version agnostic
*/
int                   update_icmp_header(t_ping *ping)
{
  struct icmphdr      *icmp;
  unsigned long      *data;

  data = (unsigned long *)&ping->ip.frame.hdr.data;
  *data = (ping->stats.sended_at.tv_sec & 0xFFFFFFFF);

  icmp = &ping->ip.frame.hdr.icmp;
  icmp->un.echo.sequence = (ping->stats.transmitted + 1) & 0xFFFF;

  return (update_icmp_checksum(&ping->ip));
}

int                   update_icmp_checksum(t_ip *ip)
{
  struct icmphdr      *icmp;
  unsigned short      *data;
  unsigned short      data_checksum;

  data = (unsigned short *)&ip->frame.hdr.data;
  data_checksum = inet_checksum(data, 0, DEFAULT_DATA_SIZE);

  icmp = &ip->frame.hdr.icmp;
  icmp->checksum = 0;
  icmp->checksum = inet_checksum((unsigned short *)icmp, ~data_checksum, sizeof(struct icmphdr)); // - Backup

  return (1);
}
