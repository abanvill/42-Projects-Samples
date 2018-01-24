/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstmap.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/02/03 16:22:03 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:39:54 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "libft.h"

t_list				*ft_lstmap(t_list *lst, t_list *(*f)(t_list *elem))
{
	t_list			*new;
	t_list			*tmp;
	t_list			*root;

	root = lst;
	if ((new = (t_list *)malloc(sizeof(t_list))))
	{
		new->next = NULL;
		while (root)
		{
			if (!new->content_size)
			{
				new->content = (f(root))->content;
				new->content_size = (f(root))->content_size;
			}
			else
			{
				tmp = ft_lstnew((f(root))->content, (f(root))->content_size);
				ft_lstpush(&new, tmp);
			}
			root = root->next;
		}
	}
	return (new);
}
