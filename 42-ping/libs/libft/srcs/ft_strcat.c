/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcat.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/30 17:42:29 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/30 17:42:30 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char				*ft_strcat(char *s1, const char *s2)
{
	size_t			i;
	size_t			len;
	size_t			end;

	i = 0;
	end = ft_strlen(s1);
	len = ft_strlen(s2);
	while (i < len)
	{
		s1[end + i] = s2[i];
		i++;
	}
	s1[end + i] = '\0';
	return (s1);
}
