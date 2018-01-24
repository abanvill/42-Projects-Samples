/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   vectors.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/21 12:20:00 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 12:38:13 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "../includes/fdf.h"

t_vector			create_vector(const float x, const float y)
{
	t_vector		vector;

	vector.x = x;
	vector.y = y;
	vector.color = 0;
	return (vector);
}

t_vector			rotate_vector(t_vector vector, const int angle)
{
	float			px;
	float			py;
	float			matrix[4];
	float			theta;

	px = 0.0f;
	py = 0.0f;
	theta = angle * (M_PI / 180);
	matrix[0] = cos(theta);
	matrix[1] = -sin(theta);
	matrix[2] = sin(theta);
	matrix[3] = cos(theta);
	px = vector.x * matrix[0] + vector.y * matrix[1];
	py = vector.x * matrix[2] + vector.y * matrix[3];
	vector.x = px;
	vector.y = py;
	return (vector);
}

t_vector			isometric_vector(t_vector vector)
{
	float			px;
	float			py;

	px = 0.0f;
	py = 0.0f;
	px = sqrt(2) / 3 * -(vector.x - vector.y);
	py = sqrt(2) / 3 - 1 / sqrt(6) * -(vector.x + vector.y);
	vector.x = -px;
	vector.y = py;
	return (vector);
}
