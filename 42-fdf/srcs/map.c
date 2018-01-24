/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   map.c                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/23 10:52:42 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 13:05:02 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

static int			set_color(uint32_t *color, int value)
{
	if (value > 9)
		*color = 0xFFFFFF;
	else if (value > 5)
		*color = 0xBBBBBB;
	else if (value > 3)
		*color = 0xA8A8A8;
	else if (value > 1)
		*color = 0x888888;
	else if (value > -1)
		*color = 0x777777;
	else if (value > -3)
		*color = 0x666666;
	else if (value > -5)
		*color = 0x555555;
	else
		*color = 0x444444;
	return (1);
}

int					copy_map(t_matrix *matrix, t_vector **dst, t_vector **src)
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
			dst[i][j] = src[i][j];
			++j;
		}
		j = 0;
		++i;
	}
	return (0);
}

void				init_map(t_vector **map, t_matrix *mat, float factor)
{
	uint32_t		i;
	uint32_t		j;
	double			factors[2];

	i = 0;
	j = 0;
	factors[0] = round((mat->cols >> 1) + 0.5);
	factors[1] = round((mat->rows >> 1) + 0.5);
	while (i < mat->rows)
	{
		while (j < mat->cols)
		{
			map[i][j].x = ((j + 1) - factors[0]) / (mat->cols >> 1);
			map[i][j].y = ((i + 1) - factors[1]) / (mat->cols >> 1);
			map[i][j].z = mat->data[i][j];
			if (set_color(&map[i][j].color, mat->data[i][j]) && mat->data[i][j])
			{
				map[i][j].x -= (mat->data[i][j] / factor) - 0.01;
				map[i][j].y -= (mat->data[i][j] / factor) - 0.01;
			}
			++j;
		}
		++i;
		j = 0;
	}
}

t_vector			**allocate_map(const uint32_t rows, const uint32_t cols)
{
	t_vector		**map;
	t_vector		*content;
	uint32_t		i;

	i = 0;
	if (!(map = (t_vector **)malloc(sizeof(t_vector *) * rows)))
	{
		perror(NULL);
		return (NULL);
	}
	if (!(content = (t_vector *)malloc(sizeof(t_vector) * (rows * cols))))
	{
		perror(NULL);
		return (NULL);
	}
	while (i < rows)
	{
		map[i] = (t_vector *)(content + (i * cols));
		++i;
	}
	return (map);
}

t_vector			**create_map(t_sgl *sgl)
{
	t_vector		**map;
	t_matrix		*mat;

	mat = &sgl->matrix;
	if (!(map = allocate_map(mat->rows, mat->cols)))
	{
		perror(NULL);
		return (NULL);
	}
	init_map(map, mat, sgl->map.factor);
	return (map);
}
