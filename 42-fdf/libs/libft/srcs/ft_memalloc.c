/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_memalloc.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/28 19:11:28 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:40:02 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "libft.h"

void				*ft_memalloc(size_t size)
{
	size_t			i;
	void			*mem;

	if (size && (mem = (void *)malloc(size)))
	{
		i = 0;
		while (i < size)
		{
			((unsigned char *)mem)[i] = 0;
			i++;
		}
		return (mem);
	}
	return (NULL);
}
