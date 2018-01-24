#include "../includes/ping.h"

void                  alarm_callback(int signbr) {
  t_ping              *ping;

  (void)signbr;
  ping = require_data();
  if (ping->opts.flag.deadline) {
    ping->opts.deadline--;
    if (ping->opts.deadline == 0xFFFFFFFF) {
      print_outro(ping);
      exit(EXIT_SUCCESS);
    }
  }
  send_packet(ping);
  alarm(1);

}

void                  kill_callback(int signbr) {
  (void)signbr;
  printf("Kill signal\n");
  exit(EXIT_FAILURE);
}

void                  term_callback(int signbr) {
  (void)signbr;
  printf("Term signal\n");
  exit(EXIT_FAILURE);
}

/*
** Must print statistics line
*/
void                  quit_callback(int signbr) {
  (void)signbr;
  printf("Quit signal\n");
  exit(EXIT_FAILURE);
}

void                  abort_callback(int signbr) {
  (void)signbr;
  printf("Abort signal\n");
  exit(EXIT_FAILURE);
}

void                  interrupt_callback(int signbr) {
  t_ping              *ping;

  (void)signbr;
  ping = require_data();
  update_stats(ping, ended);
  print_outro(ping);

  exit(EXIT_SUCCESS);
}
