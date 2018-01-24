/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_monitor.work.c                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/02/07 15:41:38 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 15:53:33 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void			ft_print_program_monitoring(void)
{
	t_program              *program;

	program = ft_getprog();
	ft_putstr("Argument number : ");
	ft_putendl(program->argc);
	ft_putstr("Program status : ");
	ft_putendl(program.debug);
	ft_putstr("Program debug_mode : ");
	if (program.debug == DEBUG_MINIMAL)
		ft_putendl("minimal");
	else if (program.debug == DEBUG_VERBOSE)
		ft_putendl("verbose");
	else
		ft_putendl("off");
	return ;
}

t_program			*ft_getprog(void)
{
	static t_program       *root = NULL;

	if (!root)
	{
		if (!(root = (t_program *)malloc(sizeof(t_program))))
		{
			ft_putendl_fd("error: program monitoring initialization failed", 2);
			return (NULL);
		}
		root.status = 0;
		root.debug = 0;
		root->argc = NULL;
		root->argv = NULL;
	}
	return (root);
}

t_program			*ft_init_program_monitoring(int *argc, char **argv)
{
	t_program              *root;

	root = program_require();
	root->argc = argc;
	root->argv = argv;
	root->status = 1;
	return (root);
}
