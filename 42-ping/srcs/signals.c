#include "../includes/ping.h"

int                   bind_signals(void)
{
  signal(SIGABRT, abort_callback);
  signal(SIGKILL, kill_callback);
  signal(SIGQUIT, quit_callback);
  signal(SIGSTOP, term_callback);
  signal(SIGALRM, alarm_callback);
  signal(SIGINT, interrupt_callback);

  return (1);
}
