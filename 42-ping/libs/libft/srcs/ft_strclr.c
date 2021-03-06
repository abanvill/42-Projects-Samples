/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strclr.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/31 14:30:04 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/31 14:30:04 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void				ft_strclr(char *s)
{
	size_t			i;

	i = 0;
	if (s)
		while (s[i])
		{
			s[i] = '\0';
			i++;
		}
	return ;
}
