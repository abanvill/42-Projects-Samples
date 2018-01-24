/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   program.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/21 11:42:11 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/23 10:43:08 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

int					link_mlx(t_sgl *sgl)
{
	uint32_t		width;
	uint32_t		height;
	int				*bpp;
	int				*endian;
	int				*size;

	width = sgl->screen.width;
	height = sgl->screen.height;
	bpp = &sgl->screen.bpp;
	endian = &sgl->screen.endian;
	size = &sgl->screen.size;
	sgl->mlx = mlx_init();
	sgl->win = mlx_new_window(sgl->mlx, width, height, WIN_TITLE);
	sgl->img = mlx_new_image(sgl->mlx, width, height);
	sgl->img_data = mlx_get_data_addr(sgl->img, bpp, size, endian);
	return (0);
}

t_sgl				*require_sgl(void)
{
	static t_sgl	sgl;

	return (&sgl);
}
