/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_strtrim.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/01/31 16:57:58 by abanvill          #+#    #+#             */
/*   Updated: 2015/01/31 16:57:59 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

char				*ft_strtrim(const char *s)
{
	size_t			i;
	size_t			j;
	char			*str;

	i = 0;
	if (!s)
		return (NULL);
	while (s[i] == ' ' || s[i] == '\n' || s[i] == '\t')
		i++;
	j = ft_strlen(s);
	while ((s[j] == ' ' || s[j] == '\n' || s[j] == '\t' || s[j] == 0) && j > i)
		j--;
	str = ft_strsub(s, i, (j - i) + 1);
	return (str);
}
