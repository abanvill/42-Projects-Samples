#include "../includes/ping.h"

void                  update_triptime(t_ping *ping)
{
  struct timeval      res;
  unsigned long       tt;

  res = get_time(&ping->stats.transmitted_at, &ping->stats.acknowledged_at);
  tt = get_triptime(&res) & 0xFFFFFFFF;

  ping->stats.tottt += tt & 0xFFFFFFFFFFFFFFFF;
  ping->stats.sqrtt += (tt * tt) & 0xFFFFFFFFFFFFFFFF;
  ping->stats.curtt = tt;

  if (ping->stats.sended == 1)
    ping->stats.mintt = tt;
  else if (tt < (unsigned int)ping->stats.mintt - 1)
    ping->stats.mintt = tt;
  if (tt > ping->stats.maxtt)
    ping->stats.maxtt = tt;
}

unsigned long         get_triptime(struct timeval *val)
{
  return ((val->tv_sec * TV_SEC_FACTOR) + val->tv_usec);
}

struct timeval        get_time(struct timeval *before, struct timeval *after)
{
  struct timeval      res;

  res.tv_sec = 0;
  res.tv_usec = 0;

  if (before->tv_sec) {
    if (after->tv_sec > before->tv_sec)
      res.tv_sec = after->tv_sec - before->tv_sec;
    else
      res.tv_sec = before->tv_sec - after->tv_sec;
    if (res.tv_sec == 1)
      res.tv_sec = 0;
  }
  if (before->tv_usec) {
    if (after->tv_usec > before->tv_usec)
      res.tv_usec = after->tv_usec - before->tv_usec;
    else
      res.tv_usec = before->tv_usec - after->tv_usec;
  }
  return (res);
}

unsigned long         get_milliseconds(struct timeval *before, struct timeval *after)
{
  unsigned long       secs, usecs;

  secs = 0;
  usecs = 0;

  if (before->tv_sec) {
    if (after->tv_sec > before->tv_sec)
      secs = after->tv_sec - before->tv_sec;
    else
      secs = before->tv_sec - after->tv_sec;
    secs *= 1000;
  }
  if (before->tv_usec) {
    if (after->tv_usec > before->tv_usec)
      usecs = after->tv_usec - before->tv_usec;
    else
      usecs = before->tv_usec - after->tv_usec;
    if (usecs < 1000)
      usecs /= 100;
    else if (usecs < 100)
      usecs /= 10;
    else
      usecs /= 1000;
  }
  return (secs + usecs);
}
