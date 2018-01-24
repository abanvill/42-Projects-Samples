/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strcpy.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/30 16:34:25 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/30 16:34:26 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char				*ft_strcpy(char *dst, const char *src)
{
	size_t			len;

	len = ft_strlen(src);
	if (len)
		ft_bzero(dst, len + 1);
	dst = ft_memmove(dst, src, len);
	return (dst);
}
