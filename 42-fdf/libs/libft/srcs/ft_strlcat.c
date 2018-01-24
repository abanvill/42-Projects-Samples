/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strlcat.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/30 18:09:22 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/30 18:09:22 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

size_t				ft_strlcat(char *s1, const char *s2, size_t size)
{
	size_t			i;
	size_t			len;
	size_t			end;

	i = 0;
	end = ft_strlen(s1);
	len = ft_strlen(s2);
	if (size < end)
		return (len + size);
	while ((size - 1) > (end + i))
	{
		s1[end + i] = s2[i];
		i++;
	}
	s1[end + i] = '\0';
	return (end + len);
}
