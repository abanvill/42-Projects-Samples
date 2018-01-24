#ifndef _PING_H_
# define _PING_H_

# include <arpa/inet.h>
# include <netdb.h>
# include <netinet/if_ether.h>
# include <netinet/in.h>
# include <netinet/ip_icmp.h>
# include <signal.h>
# include <stdio.h>
# include <stdlib.h>
# include <string.h>
# include <sys/socket.h>
# include <sys/time.h>
# include <sys/types.h>
# include <sys/uio.h>
# include <unistd.h>

# include "libft.h"

# define VALID_OPTIONS      "htvDcwTC"
# define VALID_OPTIONS_ARGS "01001111"
# define VALID_OPTIONS_NBR  9

# define MAX_IP_PACKET_SIZE 0xFFFF

# define DEFAULT_DATA_SIZE 56
# define HEADERS_DATA_SIZE sizeof(struct icmphdr) + sizeof(struct iphdr)
# define FULL_DATA_SIZE DEFAULT_DATA_SIZE + HEADERS_DATA_SIZE

# define DDS DEFAULT_DATA_SIZE
# define HDS HEADERS_DATA_SIZE
# define FDS FULL_DATA_SIZE

# define TV_SEC_FACTOR 1000000
# define PING_TIMEOUT 1

# define IPV4_DOMAIN AF_INET
# define IPV4_TYPE 0x04
# define IPV4_DEFAULT_TTL 0x80
# define IPV4_HEADER_LENGTH 0x05  // Default (20 bytes)

# define IOV_SIZE 1
# define IOV_BUFFER_SIZE 128

# define NTOHS(x) (((x << 8) & 0xFF00) | ((x >> 8) & 0x00FF))

/*
** Unreach errors
*/

# define UNAVAILABLE_NETWORK_ERROR "Destination Net Unreachable"
# define UNAVAILABLE_HOST_ERROR "Destination Host Unreachable"
# define UNAVAILABLE_PROTOCOL_ERROR "Destination Protocol Unreachable"
# define UNAVAILABLE_PORT_ERROR "Destination Port Unreachable"
# define FRAGMENTATION_NEEDED_ERROR "Frag needed and DF set"
# define ROUTING_FAILURE_ERROR "Source Route Failed"
# define UNKNOWN_NETWORK_ERROR "Destination Net Unknown"
# define UNKNOWN_HOST_ERROR "Destination Host Unknown"
# define MACHINE_NOT_CONNECTED_ERROR "Source Host Isolated"
# define FORBIDDEN_NETWORK_ERROR "Destination Net Prohibited"
# define FORBIDDEN_HOST_ERROR "Destination Host Prohibited"
# define UNAVAILABLE_NETWORK_FOR_SERVICE_ERROR "Destination Net Unreachable for Type of Service"
# define UNAVAILABLE_HOST_FOR_SERVICE_ERROR "Destination Host Unreachable for Type of Service"
# define COMMUNICATION_FORBIDDEN_ERROR "Packet filtered"
# define HOST_PRIORITY_VIOLATION_ERROR "Precedence Violation"
# define PRIORITY_LIMIT_REACHED_ERROR "Precedence Cutoff"

/*
** Redirect errors
*/

# define REDIRECT_NET_ERROR "Redirect Network"
# define REDIRECT_HOST_ERROR "Redirect Host"
# define REDIRECT_TOS_NET_ERROR "Redirect Type of Service and Network"
# define REDIRECT_TOS_HOST_ERROR "Redirect Type of Service and Host"

/*
** Time exceeded errors
*/

# define TIME_EXCEEDED_IN_TRANSIT "Time to live exceeded"
# define TIME_EXCEEDED_REASSEMBLY "Frag reassembly time exceeded"

enum {
  started = 0,
  triggered,
  sended,
  transmitted,
  acknowledged,
  received,
  ended
};

typedef struct        s_fds {
  int                 raw;
  int                 tcp;
  int                 udp;
}                     t_fds;

typedef struct        s_hdrs {
  struct iphdr        ip;
  struct icmphdr      icmp;
  char                data[MAX_IP_PACKET_SIZE - 28];  // Not portable
}                     t_hdrs;

typedef union         u_frame {
  t_hdrs              hdr;
  char                body[MAX_IP_PACKET_SIZE];
}                     t_frame;

typedef struct        s_ip {
  int                 type;
  int                 domain;
  char                tostr[INET_ADDRSTRLEN];
  char                fromstr[INET_ADDRSTRLEN];
  t_frame             frame;
  t_fds               fd;
}                     t_ip;

typedef struct        s_stats {
  unsigned long       sended;
  unsigned long       transmitted;
  unsigned long       acknowledged;
  unsigned long       received;
  unsigned long       errors;
  unsigned long       duplicates;
  unsigned long       corrupted;
  unsigned long       total_time;
  unsigned long       curtt;
  unsigned long       mintt;
  unsigned long       avgtt;
  unsigned long       maxtt;
  long long           tottt;
  long long           sqrtt;
  struct timeval      started_at;
  struct timeval      triggered_at;
  struct timeval      sended_at;
  struct timeval      transmitted_at;
  struct timeval      acknowledged_at;
  struct timeval      received_at;
  struct timeval      ended_at;
}                     t_stats;

typedef struct        s_opts {
  struct {
    char              packetsize;
    char              ttl;
    char              verbose;
    char              showtimestamp;
    char              deadline;
    char              count;
    char              preload;
    char              icmp_type;
    char              icmp_code;
  }                   flag;
  int                 packetsize;
  int                 ttl;
  unsigned int        deadline;
  unsigned int        count;
  int                 preload;
  short               icmp_code;
  short               icmp_type;
}                     t_opts;

typedef struct        s_ping {
  struct addrinfo     *infos;
  t_ip                ip;
  t_stats             stats;
  t_opts              opts;
  pid_t               pid;
  uid_t               uid;
  char                *pname;
}                     t_ping;

/*
** addr.c
*/

int                   request_addr_infos(const char *target, t_ping *ping);

/*
** callbacks.c
*/

void                  alarm_callback(int signbr);
void                  kill_callback(int signbr);
void                  quit_callback(int signbr);
void                  term_callback(int signbr);
void                  abort_callback(int signbr);
void                  interrupt_callback(int signbr);

/*
** data.c
*/

int                   init_struct(t_ping *ping);
t_ping                *require_data(void);

/*
** icmp.c
*/

int                   create_icmp_header(t_ping *ping);
int                   update_icmp_header(t_ping *ping);
int                   update_icmp_checksum(t_ip *ip);

/*
** ip.c
*/

int                   create_ip_header(t_ping *ping);

/*
** misc.c
*/

unsigned short        inet_checksum(unsigned short *ptr, unsigned long checksum, size_t len);
long                  llsqrt(long long a);

/*
** network.c
*/

void                  recv_packet(t_ping *ping);
void                  send_packet(t_ping *ping);

/*
** options.c
*/

int                   browse_opts(t_ping *ping, int argc, char *argv[]);
int                   check_opt(char *arg, char *opt, int *args);
int                   parse_opts(t_ping *ping, char opt, char *arg);

/*
** print.c
*/

void                  print_icmp_message(t_frame *frame, const short type, const short code);
void                  print_intro(t_ping *ping);
void                  print_line_base(t_ping *ping, t_frame *frame);
void                  print_line_stats(t_ping *ping, t_frame *frame);
void                  print_line_stats_new(t_ping *ping, t_frame *frame);
void                  print_line_verbose(t_ping *ping, t_frame *frame);
void                  print_message(t_ping *ping, t_frame *frame);
void                  print_outro(t_ping *ping);
void                  print_rtt(t_ping *ping);
void                  print_usage(char *prog_name);

/*
** signals.c
*/

int                   bind_signals(void);

/*
** sockets.c
*/

int                   create_raw_socket(t_ping *ping);

/*
** stats.c
*/

void                  update_stats(t_ping *ping, u_int8_t type);
void                  update_total_time(t_ping *ping);

/*
** time.c
*/

unsigned long         get_milliseconds(struct timeval *before, struct timeval *after);
struct timeval        get_time(struct timeval *before, struct timeval *after);
unsigned long         get_triptime(struct timeval *value);
void                  update_triptime(t_ping *ping);

#endif
