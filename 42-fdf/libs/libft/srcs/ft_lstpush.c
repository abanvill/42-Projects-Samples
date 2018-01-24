/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstpush.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/02/03 16:59:42 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:38:06 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void				ft_lstpush(t_list **alst, t_list *elem)
{
	t_list			*ptr;

	ptr = *alst;
	while (ptr->next)
		ptr = ptr->next;
	ptr->next = elem;
	return ;
}
