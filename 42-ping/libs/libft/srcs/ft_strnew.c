/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strnew.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/31 14:25:39 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:44:53 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "libft.h"

char				*ft_strnew(size_t size)
{
	size_t			i;
	char			*str;

	i = 0;
	if ((str = (char *)malloc(size)))
		while (i < size)
		{
			str[i] = '\0';
			i++;
		}
	return (str);
}
