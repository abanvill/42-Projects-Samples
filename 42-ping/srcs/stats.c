#include "../includes/ping.h"

void                  update_total_time(t_ping *ping)
{
  struct timeval      current;

  gettimeofday(&current, NULL);
  ping->stats.total_time += get_milliseconds(&ping->stats.triggered_at, &current);
}

void                  update_stats(t_ping *ping, u_int8_t type)
{
  gettimeofday(&ping->stats.started_at + type, NULL);
  switch (type) {
    case (sended):
      ping->stats.sended = (ping->stats.sended + 1) & 0xFFFFFFFF; // Must be protected
      break;
    case (received):
      ping->stats.received = (ping->stats.received + 1) & 0xFFFFFFFF; // Must be protected
      break;
    case (transmitted):
      ping->stats.transmitted = (ping->stats.transmitted + 1) & 0xFFFFFFFF; // Must be protected
      break;
    case (acknowledged):
      ping->stats.acknowledged = (ping->stats.acknowledged + 1) & 0xFFFFFFFF; // Must be protected
      break;
    default:
      break ;
  }
}
