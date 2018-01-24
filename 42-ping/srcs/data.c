#include "../includes/ping.h"

static int           init_stats_struct(t_stats *stats)
{
  if (!stats) {
    printf("init_stats_struct(): stats struct is null.\n");
    return (0);
  }
  ft_memset(stats, 0, sizeof(t_stats));
  return (1);
}

static int           init_ip_struct(t_ip *ip)
{
  if (!ip) {
    printf("init_ip_struct(): ip struct is null.\n");
    return (0);
  }
  ip->domain = IPV4_DOMAIN;
  ip->type = IPV4_TYPE;
  return (1);
}

int                  init_struct(t_ping *ping)
{
  ping->pid = getpid() % 0xFFFF;
  ping->uid = getuid() % 0xFFFF;

  ping->stats.mintt = PING_TIMEOUT * TV_SEC_FACTOR;

  init_ip_struct(&ping->ip);
  init_stats_struct(&ping->stats);

  return (1);
}

t_ping                *require_data(void)
{
  static t_ping       root = { 0 };

  return (&root);
}
