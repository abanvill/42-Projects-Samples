/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   hooks.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/23 12:56:02 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 13:32:53 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

static int			check_keycode(int keycode)
{
	if (keycode == CMD_ROTATE_L || keycode == CMD_ROTATE_R)
		return (1);
	else if (keycode == CMD_ZOOM_P || keycode == CMD_ZOOM_M)
		return (1);
	else if (keycode == CMD_MOVE_U || keycode == CMD_MOVE_D)
		return (1);
	else if (keycode == CMD_MOVE_L || keycode == CMD_MOVE_R)
		return (1);
	else if (keycode == CMD_PROJECT_ISO || keycode == CMD_PROJECT_FRONT)
		return (1);
	else if (keycode == CMD_FACTOR_M || keycode == CMD_FACTOR_P)
		return (1);
	else if (keycode == CMD_CENTER)
		return (1);
	else if (keycode == CMD_QUIT)
		return (1);
	return (0);
}

void				command_factor(struct s_sgl *sgl, uint8_t mode)
{
	float			v;

	v = sgl->map.vert;
	if (mode == CMD_FACTOR_P)
		sgl->map.vert = (v < 10) ? v + 0.1 : v;
	else if (mode == CMD_FACTOR_M)
		sgl->map.vert = (v > -10) ? v - 0.1 : v;
}

int					command_expose(void *param)
{
	t_sgl			*sgl;

	sgl = (t_sgl *)param;
	print_image(sgl);
	return (0);
}

int					command_clbk(int keycode, void *param)
{
	t_sgl			*sgl;

	sgl = (t_sgl *)param;
	if (check_keycode(keycode))
	{
		sgl->cmd[keycode]((t_sgl *)param, keycode);
		print_image(sgl);
	}
	return (0);
}

void				command_quit(struct s_sgl *sgl, uint8_t mode)
{
	(void)mode;
	free(sgl->matrix.data[0]);
	free(sgl->matrix.data);
	free(sgl->map.current[0]);
	free(sgl->map.current);
	free(sgl->map.origin[0]);
	free(sgl->map.origin);
	mlx_destroy_image(sgl->mlx, sgl->img);
	mlx_destroy_window(sgl->mlx, sgl->win);
	free(sgl->mlx);
	exit(EXIT_SUCCESS);
}
