/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_isascii.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/31 14:07:17 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/31 14:07:17 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

int					ft_isascii(int c)
{
	return (c >= 0 && c <= 127);
}