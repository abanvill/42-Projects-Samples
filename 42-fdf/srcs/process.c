/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   process.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/23 13:09:36 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/23 16:30:54 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

int					init_matrix_from_file(t_sgl *sgl, int fd)
{
	char			*line;

	line = NULL;
	while (ft_readline(fd, &line) > 0)
	{
		if (init_matrix_from_line(sgl, line) == -1)
			exit(EXIT_FAILURE);
		else
		{
			++sgl->matrix.rows;
			free(line);
		}
	}
	if (sgl->matrix.rows > MAP_MAX_SQR || sgl->matrix.cols > MAP_MAX_SQR)
		ft_putendl_fd("File is too big for this humble program.\n", 2);
	else if (!sgl->matrix.rows && !sgl->matrix.cols)
		ft_putendl_fd("Invalid file.", 2);
	else
		return (0);
	return (-1);
}

int					fill_matrix_from_file(t_sgl *sgl, int fd)
{
	uint32_t		row;
	char			*line;

	line = NULL;
	row = 0;
	while (ft_readline(fd, &line) > 0)
	{
		if (fill_matrix_from_line(sgl, line, row) == -1)
			exit(EXIT_FAILURE);
		else
		{
			++row;
			free(line);
		}
	}
	return (0);
}

static void			allocate_matrix(t_sgl *sgl)
{
	uint32_t		rows;
	uint32_t		cols;
	int				**matrix;
	int				*data;
	size_t			i;

	i = 0;
	rows = sgl->matrix.rows;
	cols = sgl->matrix.cols;
	matrix = (int **)malloc(sizeof(int *) * rows);
	data = (int *)malloc(sizeof(int) * (rows * cols));
	if (!matrix || !data)
	{
		perror(NULL);
		exit(EXIT_FAILURE);
	}
	while (i < rows)
	{
		matrix[i] = &data[i * cols];
		++i;
	}
	sgl->matrix.data = matrix;
}

int					parse_file(t_sgl *sgl, char *file)
{
	int				fd;

	if ((fd = open(file, O_RDONLY)) == -1)
	{
		perror(NULL);
		exit(EXIT_FAILURE);
	}
	if (init_matrix_from_file(sgl, fd) == -1)
		exit(EXIT_FAILURE);
	close(fd);
	allocate_matrix(sgl);
	if ((fd = open(file, O_RDONLY)) == -1)
	{
		perror(NULL);
		exit(EXIT_FAILURE);
	}
	if (fill_matrix_from_file(sgl, fd) == -1)
		exit(EXIT_FAILURE);
	close(fd);
	return (0);
}
