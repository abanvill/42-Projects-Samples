#include "../includes/ping.h"

unsigned short        inet_checksum(unsigned short *ptr, unsigned long checksum, size_t len)
{
  size_t            size;

  size = (len % 2) ? ((len + 1) >> 1) : (len >> 1);
  checksum = (checksum) ? checksum + 1 : checksum;
  while (size--) {
    checksum += ptr[size];
  }
  checksum = (checksum >> 16) + (checksum & 0xFFFF);
  checksum += (checksum >> 16);
  return ((unsigned short)(~checksum));
}

/*
** Original function taken from ping source code
*/
long                  llsqrt(long long a)
{
	long long prev = ~((long long)1 << 63);
	long long x = a;

	if (x > 0) {
		while (x < prev) {
			prev = x;
			x = (x + (a / x)) / 2;
		}
	}
	return (long)x;
}
