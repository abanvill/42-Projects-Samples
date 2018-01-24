/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/19 11:16:02 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/23 16:50:48 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

static int			launch_mlx(t_sgl *sgl)
{
	command_center(sgl, CMD_CENTER);
	print_image(sgl);
	mlx_expose_hook(sgl->win, &command_expose, sgl);
	mlx_hook(sgl->win, 2, 64, &command_clbk, sgl);
	mlx_loop(sgl->mlx);
	return (0);
}

int					main(int ac, char *av[])
{
	t_sgl			*sgl;

	if (ac != 2)
		return (EXIT_FAILURE);
	sgl = require_sgl();
	if (init_sgl(sgl) == -1)
		return (EXIT_FAILURE);
	if (init_sgl_screen(sgl) == -1)
		return (EXIT_FAILURE);
	if (parse_file(sgl, av[1]) == -1)
		return (EXIT_FAILURE);
	if (init_sgl_map(sgl) == -1)
		return (EXIT_FAILURE);
	if (init_commands(sgl) == -1)
		return (EXIT_FAILURE);
	if (link_mlx(sgl) == -1)
		return (-1);
	launch_mlx(sgl);
	return (EXIT_SUCCESS);
}
