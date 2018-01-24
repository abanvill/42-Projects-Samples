/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fdf.h                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/01/24 13:07:48 by abanvill          #+#    #+#             */
/*   Updated: 2018/01/24 13:10:38 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FDF_H
# define FDF_H

# include "../libs/libmlx/mlx.h"
# include "../libs/libft/includes/libft.h"

# include <math.h>
# include <stdlib.h>
# include <stdio.h>
# include <unistd.h>
# include <time.h>
# include <stdlib.h>
# include <fcntl.h>

# define WIN_WIDTH 1280
# define WIN_HEIGHT 768
# define WIN_TITLE "Wireframe v0.42"

# define LINE_WIDTH 1
# define LINE_LENGTH 32

# define CMD_ROTATE_INDICE 5
# define CMD_ROTATE_L 30
# define CMD_ROTATE_R 33
# define CMD_ZOOM_P 24
# define CMD_ZOOM_M 27
# define CMD_MOVE_INDICE 15
# define CMD_MOVE_L 124
# define CMD_MOVE_U 126
# define CMD_MOVE_R 123
# define CMD_MOVE_D 125
# define CMD_PROJECT_ISO 34
# define CMD_PROJECT_FRONT 35
# define CMD_CENTER 8
# define CMD_QUIT 53
# define CMD_FACTOR_M 25
# define CMD_FACTOR_P 29

# define MAP_MAX_SIZE 0xFFFFFFFF
# define MAP_MAX_SQR 20000

typedef struct		s_vector
{
	float			x;
	float			y;
	float			z;
	uint32_t		color;
}					t_vector;

typedef struct		s_pixel
{
	int				x;
	int				y;
	uint32_t		color;
}					t_pixel;

typedef struct		s_coords
{
	int				x;
	int				y;
}					t_coords;

typedef struct		s_line
{
	t_pixel			a;
	t_pixel			b;
	t_pixel			delta;
	uint32_t		color;
}					t_line;

typedef struct		s_map
{
	float			scale;
	float			factor;
	float			vert;
	uint32_t		size;
	t_coords		pos;
	t_vector		**origin;
	t_vector		**current;
}					t_map;

typedef struct		s_screen
{
	uint32_t		width;
	uint32_t		height;
	int				bpp;
	int				endian;
	int				size;
	uint32_t		bgcolor;
	uint32_t		fgcolor;
}					t_screen;

typedef struct		s_matrix
{
	uint32_t		rows;
	uint32_t		cols;
	int				**data;
}					t_matrix;

typedef struct		s_sgl
{
	t_screen		screen;
	void			*mlx;
	void			*win;
	void			*img;
	char			*img_data;
	t_map			map;
	t_matrix		matrix;
	void			(*cmd[0xFF])(struct s_sgl *sgl, uint8_t mode);
}					t_sgl;

/*
** In development
*/

void				print_image(t_sgl *sgl);
int					copy_map(t_matrix *matrix, t_vector **dst, t_vector **src);
int					calc_line(t_sgl *sgl, t_vector a, t_vector b, int color);
int					draw_map(t_sgl *sgl);
int					refactor_map(t_matrix *matrix, t_vector **map, float vert);
int					rotate_map(t_matrix *matrix, t_vector **map, int angle);
int					project_map_iso(t_matrix *matrix, t_vector **map);
int					reset_map(t_sgl *sgl);
void				init_map(t_vector **map, t_matrix *mat, float factor);
t_vector			**create_map(t_sgl *sgl);
t_vector			**allocate_map(const uint32_t rows, const uint32_t cols);

/*
** Initialisation
*/

int					init_commands(t_sgl *sgl);
int					init_sgl(t_sgl *sgl);
int					init_sgl_map(t_sgl *sgl);
int					init_sgl_screen(t_sgl *sgl);
int					link_mlx(t_sgl *sgl);

/*
** Design pattern
*/

t_sgl				*require_sgl(void);

/*
** Pixels
*/

void				clean_win(const t_sgl *sgl);
int					put_mlx_pixel(const t_sgl *sgl, const t_pixel pixel);

/*
** Colors
*/

uint32_t			normalize_color(int color);
uint32_t			lighten_color(uint32_t color, int percent);
uint32_t			darken_color(uint32_t color, int percent);

/*
** Vectors
*/

t_vector			refactor_vector(t_vector vector, const float vert);
t_vector			create_vector(const float x, const float y);
t_vector			rotate_vector(t_vector vector, const int angle);
t_vector			isometric_vector(t_vector vector);
void				print_vector(t_vector vector);

/*
** Lines
*/

void				draw_line(const t_sgl *sgl, t_pixel a, const t_pixel b);

/*
** Parsing
*/

int					dirty_strishexa(char *str);
int					fill_matrix_from_file(t_sgl *sgl, int fd);
int					fill_matrix_from_line(t_sgl *sgl, char *line, uint32_t row);
int					init_matrix_from_file(t_sgl *sgl, int fd);
int					init_matrix_from_line(t_sgl *sgl, char *line);
int					parse_file(t_sgl *sgl, char *file);
int					process_line(t_sgl *sgl, char *line);

/*
** Commands
*/

int					command_expose(void *param);
int					command_clbk(int keycode, void *param);
void				command_center(t_sgl *sgl, uint8_t mode);
void				command_factor(t_sgl *sgl, uint8_t mode);
void				command_move(t_sgl *sgl, uint8_t mode);
void				command_project(t_sgl *sgl, uint8_t mode);
void				command_quit(t_sgl *sgl, uint8_t mode);
void				command_rotate(t_sgl *sgl, uint8_t mode);
void				command_zoom(t_sgl *sgl, uint8_t mode);

#endif
