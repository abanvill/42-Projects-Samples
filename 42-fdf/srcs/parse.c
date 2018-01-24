/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   parse.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/21 12:44:11 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/23 13:10:23 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

static int			step(char **ptr, char **tmp, uint32_t *size)
{
	if ((*tmp = ft_strchr(*ptr, ' ')))
	{
		*size = *tmp - *ptr;
		*tmp = *ptr;
		*ptr = (char *)(*ptr + *size + 1);
	}
	else if ((*tmp = ft_strchr(*ptr, '\0')))
	{
		*size = *tmp - *ptr;
		*tmp = *ptr;
		*ptr = NULL;
	}
	else
		*ptr = NULL;
	if (*size > 10)
	{
		ft_putendl_fd("Map error.", 2);
		exit(EXIT_FAILURE);
	}
	return (0);
}

static void			check_parsing(t_sgl *sgl, uint32_t cols)
{
	if (sgl->matrix.cols && cols != sgl->matrix.cols)
	{
		ft_putendl_fd("Map error.", 2);
		exit(EXIT_FAILURE);
	}
	else
		sgl->matrix.cols = cols;
}

int					init_matrix_from_line(t_sgl *sgl, char *line)
{
	char			*ptr;
	char			*tmp;
	uint32_t		size;
	uint32_t		cols;

	size = 0;
	cols = 0;
	tmp = NULL;
	ptr = line;
	while (ptr)
	{
		step(&ptr, &tmp, &size);
		if (tmp && size)
			++cols;
	}
	check_parsing(sgl, cols);
	return (0);
}

int					fill_matrix_from_line(t_sgl *sgl, char *line, uint32_t row)
{
	char			buf[0x10];
	char			*ptr;
	char			*tmp;
	uint32_t		size;
	uint32_t		col;

	size = 0;
	col = 0;
	tmp = NULL;
	ptr = line;
	while (ptr)
	{
		step(&ptr, &tmp, &size);
		if (tmp && size)
		{
			ft_memset(buf, 0, 0x10);
			ft_strncpy(buf, tmp, size);
			sgl->matrix.data[row][col] = ft_atoi(buf);
			++col;
		}
	}
	check_parsing(sgl, col);
	return (0);
}
