/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strnstr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/30 19:16:12 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/30 19:16:12 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char				*ft_strnstr(const char *s1, const char *s2, size_t n)
{
	size_t			i;
	size_t			j;
	size_t			len;

	i = 0;
	len = ft_strlen(s2);
	if (!len)
		return ((char *)s1);
	while (s1[i] && i < n)
	{
		j = 0;
		while (i + j < n && s1[i + j] && s1[i + j] == s2[j])
			j++;
		if (j == len)
			return ((char *)&s1[i]);
		i++;
	}
	return (NULL);
}
