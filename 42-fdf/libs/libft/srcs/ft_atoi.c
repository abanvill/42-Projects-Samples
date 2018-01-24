/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_atoi.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/31 13:29:14 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 12:50:09 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

int					ft_atoi(const char *str)
{
	size_t			i;
	size_t			side;
	size_t			sign;
	size_t			result;

	i = 0;
	result = 0;
	while (str[i] >= 0 && str[i] <= 32)
		i++;
	side = (str[i] == '-') ? -1 : 1;
	sign = (str[i] == '+' || str[i] == '-') ? 1 : 0;
	while (str[i] && ft_isdigit(str[i + sign]))
	{
		result = (result * 10) + (str[i + sign] - '0');
		i++;
	}
	return (result * side);
}
