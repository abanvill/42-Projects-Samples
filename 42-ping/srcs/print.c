#include "../includes/ping.h"

static void           print_human(void)
{
  printf("\n");
  printf("%4s, %-64s\n", "-t", "Set provided [ttl] in the IP header time-to-live value.");
  printf("%4s, %-64s\n", "-v", "Showing the 'type' and the 'code' ICMP values as required in project subject.");
  printf("%4s, %-64s\n", "-D", "Print the standard Unix timestamps (Unix time + Microsecs).");
  printf("%4s, %-64s\n", "-c", "Stop after sending [count] echo requests packets.");
  printf("%4s, %-64s\n", "-w", "Set provided [deadline] as timeout in seconds.");
  printf("%4s, %-64s\n", "-T", "(Not legacy) Set provided [type] as icmp packet type.");
  printf("%4s, %-64s\n", "-C", "(Not legacy) Set provided [code] as icmp packet code.");
  printf("\n");
}

void                  print_usage(char *prog_name)
{
  printf("Usage: %s ", prog_name);
  printf("[-t ttl] ");
  printf("[-v verbose] ");
  printf("[-D print timestamp] ");
  printf("\n\t\t ");
  printf("[-c count] ");
  printf("[-w deadline] ");
  printf("[-T icmp type] ");
  printf("[-C icmp code] ");
  printf("destination\n");
  print_human();
}

void                  print_intro(t_ping *ping)
{
  char                *host, *ip;
  unsigned int        data_size;

  host = ping->infos->ai_canonname;
  ip = ping->ip.tostr;
  data_size = (ping->opts.flag.packetsize) ? ping->opts.packetsize : DDS;

  printf("PING %s (%s) %u(%lu) bytes of data\n", host, ip, data_size, data_size + HDS);
}

void                  print_line_base(t_ping *ping, t_frame *frame)
{
  struct icmphdr      *icmp;
  struct iphdr        *ip;

  ip = &frame->hdr.ip;
  icmp = &frame->hdr.icmp;
  if (ping->opts.flag.showtimestamp)
    printf("[%lu.%06lu] ", ping->stats.acknowledged_at.tv_sec, ping->stats.acknowledged_at.tv_usec);
  printf("%ld bytes ", (unsigned long)NTOHS(ip->tot_len) - (ip->ihl * 4));
  printf("from %s: ", ping->ip.tostr);
  printf("icmp_seq=%hd ", icmp->un.echo.sequence);
}

void                  print_line_verbose(t_ping *ping, t_frame *frame)
{
  (void)ping;
  printf("type=%hd code=%d ", frame->hdr.icmp.type, frame->hdr.icmp.code);
}

void                  print_line_stats(t_ping *ping, t_frame *frame)
{
  struct iphdr        *ip;
  unsigned long       tt;

  ip = &frame->hdr.ip;
  tt = ping->stats.curtt;

  printf("ttl=%hd ", ip->ttl & 0xFF);
  if (!ping->opts.preload) {
    if (tt >= 100000)
      printf("time=%ld ms ", tt / 1000);
    else if (tt >= 10000)
      printf("time=%ld.%01ld ms ", tt / 1000, (tt % 1000) / 100);
    else if (tt >= 1000)
      printf("time=%ld.%02ld ms ", tt / 1000, (tt % 1000) / 10);
    else
      printf("time=%ld.%03ld ms ", tt / 1000, (tt % 1000));
  }
  if (ping->opts.flag.verbose)
    print_line_verbose(ping, frame);

  printf("\n");
}

void                  print_message(t_ping *ping, t_frame *frame)
{
  struct icmphdr      *icmp;
  struct iphdr        *ip;

  (void)ip;
  ip = &frame->hdr.ip;
  icmp = &frame->hdr.icmp;

  inet_ntop(AF_INET, &ip->saddr, ping->ip.fromstr, INET_ADDRSTRLEN);

  if (ping->opts.flag.showtimestamp)
    printf("[%lu.%06lu] ", ping->stats.transmitted_at.tv_sec, ping->stats.transmitted_at.tv_usec);

  printf("From %s ", ping->ip.fromstr);
  printf("icmp_seq=%ld ", ping->stats.received);

  if (ping->opts.flag.verbose)
    print_line_verbose(ping, frame);

  print_icmp_message(frame, icmp->type, icmp->code);

}

void                  print_icmp_message(t_frame *frame, const short type, const short code)
{
  char                *unavailable_errors[16] = {
    UNAVAILABLE_NETWORK_ERROR,
    UNAVAILABLE_HOST_ERROR,
    UNAVAILABLE_PROTOCOL_ERROR,
    UNAVAILABLE_PORT_ERROR,
    FRAGMENTATION_NEEDED_ERROR,
    ROUTING_FAILURE_ERROR,
    UNKNOWN_NETWORK_ERROR,
    UNKNOWN_HOST_ERROR,
    MACHINE_NOT_CONNECTED_ERROR,
    FORBIDDEN_NETWORK_ERROR,
    FORBIDDEN_HOST_ERROR,
    UNAVAILABLE_NETWORK_FOR_SERVICE_ERROR,
    UNAVAILABLE_HOST_FOR_SERVICE_ERROR,
    COMMUNICATION_FORBIDDEN_ERROR,
    HOST_PRIORITY_VIOLATION_ERROR,
    PRIORITY_LIMIT_REACHED_ERROR
  };
  char                *redirect_errors[4] = {
    REDIRECT_NET_ERROR,
    REDIRECT_HOST_ERROR,
    REDIRECT_TOS_NET_ERROR,
    REDIRECT_TOS_HOST_ERROR
  };
  char                *time_exceeded_errors[2] = {
    TIME_EXCEEDED_IN_TRANSIT,
    TIME_EXCEEDED_REASSEMBLY
  };

  switch (type) {
    case (3):
      if (code >= 0 && code <= 15)
        printf("%s", (char *)unavailable_errors[code]);
      else
        printf("Dest Unreachable, Bad Code: %d", code);
      break ;
    case (4):
      if (code == 0)
        printf("Source Quench");
      break ;
    case (5):
      if (code >= 0 && code <= 3)
        printf("%s", redirect_errors[code]);
      else
        printf("Redirect, Bad Code: %d", code);
      break ;
    case (8):
      return ;
    case (11):
      if (code >= 0 && code <= 1)
        printf("%s", (char *)time_exceeded_errors[code]);
      else
        printf("Time exceeded, Bad Code: %d", code);
      break ;
    case (12):
      if (code == 0)
        printf("Parameter problem: pointer = %u", (unsigned int)*frame->hdr.data);
      break ;
    case (13):
      if (code == 0)
        printf("Timestamp");
      break ;
    case (14):
      if (code == 0)
        printf("Timestamp Reply");
      break ;
    case (15):
      if (code == 0)
        printf("Information Request");
      break ;
    case (16):
      if (code == 0)
        printf("Information Reply");
      break ;
    case (17):
      if (code == 0)
        printf("Address Mask Request");
      break ;
    case (18):
      if (code == 0)
        printf("Address Mask Reply");
      break ;
    default:
      printf("Bad ICMP type: %d", type);
      break ;
  }
  printf("\n");
  return ;
}

void                  print_outro(t_ping *ping)
{
  char                *host, *ip;
  long                trm, rcv, snd, ttm;
  float               loss;

  host = ping->infos->ai_canonname;
  ip = ping->ip.tostr;
  (void)ip;

  loss = 0;
  snd = ping->stats.sended;
  trm = ping->stats.transmitted;
  rcv = ping->stats.acknowledged;
  ttm = ping->stats.total_time;

  if (snd)
    loss = (float)100 - ((rcv / snd) * 100);

  printf("\n--- %s ping statistics ---\n", host);
  printf("%ld packets transmitted, ", trm);
  printf("%ld received", rcv);
  if (ping->stats.errors)
    printf(", +%ld errors", ping->stats.errors);
  printf(", %g%% packet loss", loss);
  printf(", time %ldms\n", ttm);
  print_rtt(ping);
}

void                  print_rtt(t_ping *ping)
{
  unsigned long       *mintt, *avgtt, *maxtt;
  long long           *tottt, *sqrtt;
  long                mdev;

  mintt = &ping->stats.mintt;
  avgtt = &ping->stats.avgtt;
  maxtt = &ping->stats.maxtt;

  tottt = &ping->stats.tottt;
  sqrtt = &ping->stats.sqrtt;

  mdev = 0;

  if (*maxtt >= *mintt)
    *avgtt = *mintt + ((*maxtt - *mintt) >> 1);

  if (ping->stats.acknowledged) {
    *tottt /= ping->stats.acknowledged;
    *sqrtt /= ping->stats.acknowledged;
    mdev = llsqrt(*sqrtt - (*tottt * *tottt));
  }

  if (!ping->stats.errors) {
    printf("rtt min/avg/max/mdev = %ld.%03ld/%ld.%03ld/%ld.%03ld/%ld.%03ld ms\n",
      (long)*mintt / 1000, (long)*mintt % 1000,
      (long)*avgtt / 1000, (long)*avgtt % 1000,
      (long)*maxtt / 1000, (long)*maxtt % 1000,
      (long)mdev / 1000, (long)mdev % 1000);
  }
}
