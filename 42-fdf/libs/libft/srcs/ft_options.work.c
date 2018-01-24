/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_options.work.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/02/07 15:43:00 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:52:18 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "libft.h"

t_opts				*ft_require_options(void)
{
	t_opts static	*root = NULL;

	if (!root)
	{
		if (!(root = (t_opts *)malloc(sizeof(t_opts)))) {
			ft_putendl_fd("error: cannot initialize options framework", 2);
			return (NULL);
		}
		root->opt = NULL;
		root->desc = NULL;
		root->symbol = '@';
		root->active = 0;
		root->next = NULL;
		root->prev = NULL;
	}
	return (root);
}

void				ft_print_option(t_opts *option)
{
	ft_putstr("  -");
	ft_putchar(option->symbol);
	ft_putstr(", --");
	ft_putstr(option->opt);
	ft_putstr("\t\t\t\t- ");
	ft_putendl(option->desc);
	return ;
}

void				ft_print_options(const int mode)
{
	t_opts			*root;
	t_opts			*iter;

	root = ft_require_options();
	iter = root;
	while (iter->next){
		iter = iter->next;
		if (mode == ACTIVE_ONLY && iter->active)
			ft_print_option(iter);
		else if (mode != ACTIVE_ONLY)
			ft_print_option(iter);
	}
}

t_opts				*ft_search_option_by_symbol(char symbol)
{
	t_opts			*root;
	t_opts			*iter;

	root = ft_require_options();
	iter = root;
	while (iter->next)
	{
		if (iter->symbol == symbol)
			return (iter);
		iter = iter->next;
	}
	return (NULL);
}

t_opts				*ft_search_option_by_name(char *option)
{
	t_opts			*root;
	t_opts			*iter;

	root = ft_require_options();
	iter = root;
	while (iter->next)
	{
		if (!ft_strcmp(iter->opt, option))
			return (iter);
		iter = iter->next;
	}
	return (NULL);
}

int 				ft_fill_options(char ***table)
{
	size_t			i;

	i = 0;
	while (table[i])
	{
		if (!(ft_create_option(table[i][0], table[i][1], table[i][2])))
		{
			ft_putendl_fd("error: options filling fail", 2);
			return (1);
		}
		i = i + 1;
	}
	return (0);
}

int 				ft_create_option(char *symbol, char *opt, char *desc)
{
	t_opts			*root;
	t_opts			*elem;
	t_opts			*iter;

	root = ft_require_options();
	iter = root;
	desc = (desc == NULL) ? "" : desc;
	if (ft_search_option_by_symbol(*symbol))
	{
		ft_putendl_fd("error: option symbol exist already", 2);
		return (0);
	}
	if (!(elem = (t_opts *)malloc(sizeof(t_opts))))
	{
		ft_putendl_fd("error: cannot add options to the option list", 2);
		return (0);
	}
	while (iter->next)
		iter = iter->next;
	iter->next = elem;
	elem->opt = opt;
	elem->desc = desc;
	elem->symbol = *symbol;
	elem->active = 0;
	elem->next = NULL;
	elem->prev = iter;
	return (1);
}

int 			 ft_clean_options(void)
{
	t_opts		*root;
	t_opts		*iter;

	root = ft_require_options();
	iter = root;
	while (iter->next)
		iter = iter->next;
	while (iter->prev)
	{
		iter->opt = NULL;
		iter->desc = NULL;
		if (iter->next)
		{
			free(iter->next);
			iter->next = NULL;
		}
		iter = iter->prev;
	}
	free(iter);
	iter = NULL;
	return (0);
}
