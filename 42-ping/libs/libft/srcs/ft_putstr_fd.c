/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_putstr_fd.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/28 19:39:40 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:44:11 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <unistd.h>
#include "libft.h"

void				ft_putstr_fd(char const *s, int fd)
{
	size_t			i;

	i = 0;
	while (s[i])
		i++;
	write(fd, s, i);
}
