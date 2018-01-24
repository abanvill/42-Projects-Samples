/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   lines.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/21 11:39:17 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 12:46:51 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

static void			init_delta(t_pixel *delta, t_pixel *a, t_pixel *b, int *err)
{
	delta->x = abs(b->x - a->x);
	delta->y = abs(b->y - a->y);
	*err = ((delta->x > delta->y) ? delta->x : -delta->y) >> 1;
}

static void			init_direction(t_pixel *direction, t_pixel *a, t_pixel *b)
{
	direction->x = (a->x < b->x) ? 1 : -1;
	direction->y = (a->y < b->y) ? 1 : -1;
}

void				draw_line(const t_sgl *sgl, t_pixel a, t_pixel b)
{
	t_pixel			delta;
	t_pixel			direction;
	int				error;
	int				tmp;

	init_delta(&delta, &a, &b, &error);
	init_direction(&direction, &a, &b);
	while (1)
	{
		put_mlx_pixel(sgl, a);
		if ((a.x == b.x && a.y == b.y) || (delta.x == 1 && delta.y == 1))
			break ;
		tmp = error;
		if (tmp > -delta.x)
		{
			error -= delta.y;
			a.x += direction.x;
		}
		if (tmp < delta.y)
		{
			error += delta.x;
			a.y += direction.y;
		}
	}
}

#define SML(x) (x * sgl->map.vert)

int					calc_line(t_sgl *sgl, t_vector a, t_vector b, int color)
{
	t_coords		ref;
	t_pixel			cur;
	t_pixel			next;
	uint32_t		size;
	float			scale;

	scale = sgl->map.scale;
	ref = sgl->map.pos;
	size = sgl->map.size;
	cur.x = round(((a.x + 1) / 8) * (size * scale) + ref.x);
	cur.y = round(((a.y + 1) / 8) * (size * scale) + ref.y + SML(a.z));
	cur.color = color;
	if (cur.x < 0 || cur.y < 0 ||
		cur.x >= (int)sgl->screen.width || cur.y >= (int)sgl->screen.height)
		return (0);
	next.x = round(((b.x + 1) / 8) * (size * scale) + ref.x);
	next.y = round(((b.y + 1) / 8) * (size * scale) + ref.y + SML(b.z));
	next.color = color;
	if (next.x < 0 || next.y < 0 ||
		next.x >= (int)sgl->screen.width || next.y >= (int)sgl->screen.height)
		return (0);
	draw_line(sgl, cur, next);
	return (0);
}
