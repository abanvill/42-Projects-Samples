/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strncat.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/30 18:05:27 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/30 18:05:28 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char				*ft_strncat(char *s1, const char *s2, size_t n)
{
	size_t			i;
	size_t			len;
	size_t			end;

	i = 0;
	end = ft_strlen(s1);
	len = ft_strlen(s2);
	while (i < len && i < n)
	{
		s1[end + i] = s2[i];
		i++;
	}
	s1[end + i] = '\0';
	return (s1);
}
