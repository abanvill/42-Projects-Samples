/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strstr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/30 19:15:57 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/30 19:15:57 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char				*ft_strstr(const char *s1, const char *s2)
{
	size_t			i;
	size_t			j;
	size_t			len;

	i = 0;
	len = ft_strlen(s2);
	if (!len)
		return ((char *)s1);
	while (s1[i])
	{
		j = 0;
		while (s1[i + j] && s1[i + j] == s2[j])
			j++;
		if (j == len)
			return ((char *)&s1[i]);
		i++;
	}
	return (NULL);
}
