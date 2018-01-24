/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   planes.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/20 15:10:34 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 12:38:38 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

int					draw_map(t_sgl *sgl)
{
	uint32_t		i;
	uint32_t		j;
	uint32_t		color;
	t_vector		**map;

	i = 0;
	j = 0;
	color = sgl->screen.fgcolor;
	map = sgl->map.current;
	while (i < sgl->matrix.rows)
	{
		while (j < sgl->matrix.cols)
		{
			if (i + 1 < sgl->matrix.rows)
				calc_line(sgl, map[i][j], map[i + 1][j], map[i + 1][j].color);
			if (j + 1 < sgl->matrix.cols)
				calc_line(sgl, map[i][j], map[i][j + 1], map[i][j + 1].color);
			++j;
		}
		++i;
		j = 0;
	}
	return (0);
}

int					rotate_map(t_matrix *matrix, t_vector **map, int angle)
{
	uint32_t		rows;
	uint32_t		cols;
	uint32_t		i;
	uint32_t		j;

	i = 0;
	j = 0;
	rows = matrix->rows;
	cols = matrix->cols;
	while (i < rows)
	{
		while (j < cols)
		{
			map[i][j] = rotate_vector(map[i][j], angle);
			j++;
		}
		j = 0;
		i++;
	}
	return (0);
}

int					project_map_iso(t_matrix *matrix, t_vector **map)
{
	int				rows;
	int				cols;
	int				i;
	int				j;

	i = 0;
	j = 0;
	rows = matrix->rows;
	cols = matrix->cols;
	while (i < rows)
	{
		while (j < cols)
		{
			map[i][j] = isometric_vector(map[i][j]);
			j++;
		}
		j = 0;
		i++;
	}
	return (0);
}

int					reset_map(t_sgl *sgl)
{
	copy_map(&sgl->matrix, sgl->map.current, sgl->map.origin);
	return (0);
}
