/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   pixels.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/21 11:21:51 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 13:03:06 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

void				init_image(t_sgl *sgl)
{
	int				*bpp;
	int				*size;
	int				*endian;

	bpp = &sgl->screen.bpp;
	size = &sgl->screen.size;
	endian = &sgl->screen.endian;
	sgl->img = mlx_new_image(sgl->mlx, sgl->screen.height, sgl->screen.width);
	sgl->img_data = mlx_get_data_addr(sgl->img, bpp, size, endian);
}

void				print_image(t_sgl *sgl)
{
	int				*bpp;
	int				*size;
	int				*endian;

	draw_map(sgl);
	mlx_put_image_to_window(sgl->mlx, sgl->win, sgl->img, 0, 0);
	bpp = &sgl->screen.bpp;
	size = &sgl->screen.size;
	endian = &sgl->screen.endian;
	mlx_destroy_image(sgl->mlx, sgl->img);
	sgl->img = mlx_new_image(sgl->mlx, sgl->screen.width, sgl->screen.height);
	sgl->img_data = mlx_get_data_addr(sgl->img, bpp, size, endian);
}

t_pixel				create_pixel(const int x, const int y, const uint32_t color)
{
	t_pixel			pixel;

	pixel.x = x;
	pixel.y = y;
	pixel.color = color;
	return (pixel);
}

int					put_mlx_pixel(const t_sgl *sgl, const t_pixel pixel)
{
	uint32_t		x;
	uint32_t		y;
	int				bpp;
	int				size;

	x = pixel.x;
	y = pixel.y;
	bpp = sgl->screen.bpp;
	size = sgl->screen.size;
	if (x >= sgl->screen.width)
		return (0);
	if (y >= sgl->screen.height)
		return (0);
	sgl->img_data[y * size + x * bpp / 8 + 0] = (pixel.color & 0xFF0000) >> 16;
	sgl->img_data[y * size + x * bpp / 8 + 1] = (pixel.color & 0x00FF00) >> 8;
	sgl->img_data[y * size + x * bpp / 8 + 2] = (pixel.color & 0x0000FF);
	return (0);
}
