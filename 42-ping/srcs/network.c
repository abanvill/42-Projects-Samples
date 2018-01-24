#include "../includes/ping.h"

void                  send_packet(t_ping *ping)
{
  int                 fd;
  int                 data_sended;
  unsigned int        data_length;
  char                *data;

  if (ping->opts.flag.count && !ping->opts.count) {
    print_outro(ping);
    exit(EXIT_SUCCESS);
  }

  update_total_time(ping);
  update_stats(ping, triggered);

  fd = ping->ip.fd.raw;
  data = ping->ip.frame.body;
  data_length = ping->ip.frame.hdr.ip.tot_len;

  if ((data_sended = sendto(fd, data, data_length, 0, ping->infos->ai_addr, ping->infos->ai_addrlen)))
    update_stats(ping, transmitted);
  else if (data_sended == -1) {
    printf("send_packet(): socket error [%d]\n", fd);
    exit(EXIT_FAILURE);
  }

  update_stats(ping, sended);
  update_icmp_header(ping);

  if (ping->opts.flag.count) {
    ping->opts.count--;
  }
}

static int                   scan_packet(t_ping *ping, t_frame *frame)
{
  struct iphdr        *ip;
  struct icmphdr      *icmp;

  ip = &frame->hdr.ip;
  icmp = &frame->hdr.icmp;

  if (ip->version != 0x04 || ip->ihl != 0x05)
    return (1);
  else if ((icmp->type || icmp->code)) {
    if (ip->saddr != 0x100007F && ip->saddr != 0x00)
      return (2);
    return (5); // Ignore the packet
  }
  else if (icmp->un.echo.id != ping->pid)
    return (3);
  else if (icmp->un.echo.sequence != ping->stats.transmitted)
    return (4);
  return (0);
}

void                   recv_packet(t_ping *ping)
{
  int                 data_received;
  struct iovec        iov[IOV_SIZE];
  struct msghdr       msg;
  char                msg_buffer[IOV_SIZE][IOV_BUFFER_SIZE];

  ft_memset(&iov, 0, sizeof(struct iovec) * IOV_SIZE);
  ft_memset(&msg, 0, sizeof(struct msghdr));
  msg.msg_iov = iov;
  msg.msg_iovlen = IOV_SIZE;
  iov[0].iov_base = msg_buffer[0];
  iov[0].iov_len = IOV_BUFFER_SIZE;

  if ((data_received = recvmsg(ping->ip.fd.raw, &msg, 0)) > 0) {
    update_stats(ping, received);
    switch (scan_packet(ping, (t_frame *)iov[0].iov_base)) {
      case (0):
        update_stats(ping, acknowledged);
        update_triptime(ping);
        print_line_base(ping, (t_frame *)iov[0].iov_base);
        print_line_stats(ping, (t_frame *)iov[0].iov_base);
        break ;
      case (1):
        // printf("Packet from another ip version\n");
        break ;
      case (2):
        ping->stats.errors = (ping->stats.errors + 1) & 0xFFFFFFFF;
        print_message(ping, (t_frame *)iov[0].iov_base);
        break ;
      case (3):
        // printf("Packet from another process\n");
        break;
      case (4):
        printf("(Time out)\n");
        break ;
      default:
        break ;
    }
  }
}
