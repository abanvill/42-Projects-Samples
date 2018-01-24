/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_readline.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/03/04 14:58:59 by abanvill          #+#    #+#             */
/*   Updated: 2017/02/07 12:52:42 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include <stdlib.h>
#include <unistd.h>

#include "libft.h"

t_frag				*get_buffer(int fd)
{
	t_frag			*new;
	t_frag			*root;
	t_frag			*iter;

	if (!(root = get_root()) || fd < 0)
		return (NULL);
	iter = root;
	while (iter->fd != fd && iter->next)
		iter = iter->next;
	if (iter->fd != fd)
	{
		if (!(new = (t_frag *)ft_memalloc(sizeof(t_frag))))
			return (NULL);
		else
		{
			new->fd = fd;
			new->bfr = NULL;
			new->size = 0;
			new->next = NULL;
			iter->next = new;
			iter = new;
		}
	}
	iter->status = 0;
	return (iter);
}

t_frag				*get_root(void)
{
	static t_frag	*root;

	if (!root)
	{
		if (!(root = (t_frag *)ft_memalloc(sizeof(t_frag))))
			return (NULL);
		else
		{
			root->fd = 0;
			root->bfr = NULL;
			root->size = 0;
			root->status = 0;
			root->next = NULL;
		}
	}
	return (root);
}

int					find_process(t_frag *frag, char **line)
{
	size_t			i;
	char			*tmp;
	char			last;
	char			found;

	i = 0;
	last = 1;
	found = 0;
	while (i < frag->size && !found)
	{
		if (frag->bfr[i] == '\n')
			found = 1;
		last = (!found && i + 1 == frag->size) ? 0 : 1;
		i++;
	}
	if (found || !last)
	{
		*line = ft_strsub(frag->bfr, 0, i - last);
		tmp = ft_strsub(frag->bfr, i, ft_strlen(frag->bfr) - i);
		ft_strdel(&frag->bfr);
		frag->size = ft_strlen(tmp);
		frag->bfr = tmp;
		return (1);
	}
	return (0);
}

int					buffer_process(t_frag *frag, int fd)
{
	int				len;
	char			*tmp;
	char			buf[BUFFER_SIZE + 1];

	ft_bzero(buf, BUFFER_SIZE + 1);
	if ((len = read(fd, &buf, BUFFER_SIZE)) == -1)
		return (-1);
	else if (len == 0)
	{
		frag->status = 1;
		if (!frag->size)
			return (1);
	}
	else if (len > 0)
	{
		if (!(tmp = (char *)ft_memalloc(sizeof(char) * frag->size + len + 1)))
			return (-1);
		if (frag->bfr)
			ft_strcpy(tmp, frag->bfr);
		ft_strcat(tmp, buf);
		ft_strdel(&frag->bfr);
		frag->size = ft_strlen(tmp);
		frag->bfr = tmp;
	}
	return (0);
}

int					ft_readline(int const fd, char **line)
{
	char			end;
	size_t			i;
	t_frag			*frag;

	end = 0;
	if (line == NULL || !(frag = get_buffer(fd)))
		return (-1);
	while (frag->size || !frag->status)
	{
		while (!end && !frag->status)
		{
			i = 0;
			if (frag->bfr != NULL)
				while (frag->bfr[i] && frag->bfr[i] != '\n')
					i++;
			end = (frag->bfr && frag->bfr[i] && frag->bfr[i] == '\n') ? 1 : 0;
			if (!end)
				if (buffer_process(frag, fd) == -1)
					return (-1);
		}
		if (find_process(frag, line))
			return (1);
	}
	*line = NULL;
	return (0);
}
