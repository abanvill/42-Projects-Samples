/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_itoa.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/31 17:38:15 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:39:37 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "libft.h"

static char			*ft_itoarev(char *s)
{
	size_t			i;
	size_t			j;
	size_t			mode;
	char			*tmp;

	i = 0;
	j = ft_strlen(s);
	tmp = ft_strnew(j);
	mode = (s[i] == '-') ? 1 : 0;
	while (s[i + mode])
	{
		tmp[i] = s[j - 1];
		j = j - 1;
		i = i + 1;
	}
	i = 0 + mode;
	while (tmp[i - mode])
	{
		s[i] = tmp[i - mode];
		i = i + 1;
	}
	free(tmp);
	tmp = NULL;
	return (s);
}

char				*ft_itoa(int n)
{
	char			*tmp;
	size_t			limit;
	size_t			i;

	i = 0;
	limit = (n == -2147483648) ? 1 : 0;
	if (!(tmp = ft_strnew(20 + 1)))
		return (NULL);
	if (n < 0)
	{
		tmp[i] = '-';
		n = (n == -2147483648) ? n + 1 : n;
		n = -n;
		i = i + 1;
	}
	while (n > 9)
	{
		tmp[i] = (limit && i == 1) ? ((n % 10) + 1) + 48 : (n % 10) + 48;
		n = (n / 10);
		i = i + 1;
	}
	tmp[i] = (n % 10) + 48;
	tmp = ft_itoarev(tmp);
	return (tmp);
}
