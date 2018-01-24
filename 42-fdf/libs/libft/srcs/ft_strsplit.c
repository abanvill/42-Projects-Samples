/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strsplit.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/31 14:45:45 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:44:59 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "libft.h"

char				**ft_strsplit(char const *s, char c)
{
	size_t			i;
	size_t			j;
	size_t			k;
	char			**table;

	i = 0;
	j = 0;
	if (!s)
		return (NULL);
	table = (char **)malloc(sizeof(char *) * ft_strlen(s) + 1);
	while (s[i])
	{
		while (s[i] && s[i] == c)
			i++;
		k = i;
		while (s[i] && s[i] != c)
			i++;
		table[j] = (k == ft_strlen(s)) ? NULL : ft_strsub(s, k, i - k);
		j++;
	}
	table[j] = (void *)0;
	return (table);
}
