/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_flagparse.work.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/02/07 15:34:28 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:50:46 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include "libft.h"

t_flag					*ft_flaginit(void)
{
	t_flag				*root;

	if (!(root = (t_flag *)malloc(sizeof(t_flag))))
		ft_putendl("error: flags initialization failed");
	else
	{
		root->nbr = 0;
		root->table = NULL;
	}
	return (root);
}

t_flag					*ft_flagparse(char *line)
{
	int					i;
	char				**args;
	t_flag				*root;

	i = 0;
	root = ft_flaginit();
	args = ft_strsplit(line, ' ');
	while (args[i] != NULL)
	{
		if (ft_isflaglike(args[i]))
			break ;
		i = i + 1;
	}
}

int						ft_isflaglike(char *str)
{
	int					i;
	int					len;
	int					itr;

	i = 0;
	itr = 0;
	len = ft_strlen(str);
	if (len < 2)
		return (0);
	if (str[0] == '-')
	{
		if (str[1] == '-')
			return (1);
		else if (!ft_isalnum(str[1]))
			return (0);
	}
	return (1);
}
