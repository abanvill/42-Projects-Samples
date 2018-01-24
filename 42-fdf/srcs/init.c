/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/20 10:36:27 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 12:24:28 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

static void			calc_init(uint32_t size, float *factor, float *scale)
{
	if (size > 1000)
	{
		*factor = (size > 25000) ? 2400 : 600;
		*scale = (size > 25000) ? 0.02 : 0.1;
	}
	else if (size > 500)
	{
		*factor = (size > 750) ? 20 : 40;
		*scale = (size > 750) ? 2.0 : 3.0;
	}
	else
	{
		*factor = 120;
		*scale = 10.0;
	}
}

int					init_sgl_screen(t_sgl *sgl)
{
	sgl->screen.width = WIN_WIDTH;
	sgl->screen.height = WIN_HEIGHT;
	sgl->screen.bgcolor = 0x000000;
	sgl->screen.fgcolor = 0xFFFFFF;
	return (0);
}

int					init_sgl_map(t_sgl *sgl)
{
	sgl->map.vert = 0;
	sgl->map.size = (sgl->matrix.cols * sgl->matrix.rows);
	calc_init(sgl->map.size, &sgl->map.factor, &sgl->map.scale);
	sgl->map.pos.x = (WIN_WIDTH >> 1) - (WIN_WIDTH >> 2);
	sgl->map.pos.y = (WIN_HEIGHT >> 1) - (WIN_WIDTH >> 2);
	sgl->map.current = create_map(sgl);
	sgl->map.origin = create_map(sgl);
	return (0);
}

int					init_sgl(t_sgl *sgl)
{
	ft_memset(sgl, 0, sizeof(t_sgl));
	sgl->mlx = NULL;
	sgl->win = NULL;
	sgl->screen = (t_screen){0, 0, 0, 0, 0, 0, 0};
	return (0);
}

int					init_commands(t_sgl *sgl)
{
	sgl->cmd[CMD_ROTATE_L] = command_rotate;
	sgl->cmd[CMD_ROTATE_R] = command_rotate;
	sgl->cmd[CMD_ZOOM_P] = command_zoom;
	sgl->cmd[CMD_ZOOM_M] = command_zoom;
	sgl->cmd[CMD_MOVE_U] = command_move;
	sgl->cmd[CMD_MOVE_D] = command_move;
	sgl->cmd[CMD_MOVE_L] = command_move;
	sgl->cmd[CMD_MOVE_R] = command_move;
	sgl->cmd[CMD_PROJECT_ISO] = command_project;
	sgl->cmd[CMD_PROJECT_FRONT] = command_project;
	sgl->cmd[CMD_CENTER] = command_center;
	sgl->cmd[CMD_FACTOR_M] = command_factor;
	sgl->cmd[CMD_FACTOR_P] = command_factor;
	sgl->cmd[CMD_QUIT] = command_quit;
	return (0);
}
