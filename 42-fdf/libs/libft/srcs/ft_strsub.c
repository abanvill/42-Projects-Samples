/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strsub.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/31 14:45:24 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/31 14:45:24 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char				*ft_strsub(char const *s, unsigned int start, size_t len)
{
	size_t			i;
	char			*str;

	i = 0;
	str = NULL;
	if (s && (str = ft_strnew(len + 1)))
		while (i < len)
		{
			str[i] = s[start + i];
			i++;
		}
	return (str);
}
