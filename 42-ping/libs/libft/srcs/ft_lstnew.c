/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstnew.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/02/03 15:00:49 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:39:57 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "libft.h"

t_list				*ft_lstnew(void const *content, size_t content_size)
{
	t_list			*lst;

	lst = (t_list *)malloc(sizeof(t_list));
	if (lst)
	{
		lst->next = NULL;
		lst->content = NULL;
		if (content)
		{
			lst->content_size = content_size;
			lst->content = (void *)malloc(content_size);
			ft_memcpy(lst->content, content, content_size);
		}
		else
			lst->content_size = 0;
		return (lst);
	}
	return (NULL);
}
