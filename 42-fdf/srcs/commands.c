/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   commands.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/20 11:29:28 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 12:41:53 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

void				command_center(struct s_sgl *sgl, uint8_t mode)
{
	t_coords		*origin;
	uint32_t		size;

	origin = &sgl->map.pos;
	size = sgl->map.size;
	if (mode == CMD_CENTER)
	{
		origin->x = (WIN_WIDTH >> 1) - (((size >> 2) * sgl->map.scale) / 2);
		origin->y = (WIN_HEIGHT >> 1) - (((size >> 2) * sgl->map.scale) / 2);
	}
}

void				command_rotate(struct s_sgl *sgl, uint8_t mode)
{
	if (mode == CMD_ROTATE_R)
		rotate_map(&sgl->matrix, sgl->map.current, CMD_ROTATE_INDICE);
	else if (mode == CMD_ROTATE_L)
		rotate_map(&sgl->matrix, sgl->map.current, -CMD_ROTATE_INDICE);
}

void				command_zoom(struct s_sgl *sgl, uint8_t mode)
{
	float			*scale;
	uint32_t		*size;
	uint32_t		cols;
	uint32_t		rows;

	scale = &sgl->map.scale;
	rows = sgl->matrix.rows;
	cols = sgl->matrix.cols;
	size = &sgl->map.size;
	if (mode == CMD_ZOOM_P)
		*scale = (*scale < 10) ? *scale * 2 : *scale;
	else if (mode == CMD_ZOOM_M)
		*scale = (*scale > 0.001) ? *scale / 2 : *scale;
}

void				command_move(struct s_sgl *sgl, uint8_t mode)
{
	t_coords		*origin;

	origin = &sgl->map.pos;
	if (mode == CMD_MOVE_U)
		origin->y += CMD_MOVE_INDICE;
	else if (mode == CMD_MOVE_D)
		origin->y -= CMD_MOVE_INDICE;
	else if (mode == CMD_MOVE_R)
		origin->x += CMD_MOVE_INDICE;
	else if (mode == CMD_MOVE_L)
		origin->x -= CMD_MOVE_INDICE;
}

void				command_project(struct s_sgl *sgl, uint8_t mode)
{
	reset_map(sgl);
	if (mode == CMD_PROJECT_ISO)
		project_map_iso(&sgl->matrix, sgl->map.current);
}
