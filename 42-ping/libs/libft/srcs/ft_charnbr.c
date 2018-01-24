/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_charnbr.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2016/10/10 10:10:28 by abanvill          #+#    #+#             */
/*   Updated: 2016/10/10 10:10:31 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

size_t				ft_charnbr(const char c, const char *str)
{
	size_t			count;

	count = 0;
	while (*(str++))
		if (*(str - 1) == c)
			count++;
	return (count);
}
