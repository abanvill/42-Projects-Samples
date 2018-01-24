;******************************************************************************;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_isalpha.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/12 12:19:54 by abanvill          #+#    #+#              ;
;    Updated: 2015/03/19 15:32:19 by abanvill         ###   ########.fr        ;
;                                                                              ;
;******************************************************************************;

[SECTION .text]

global _ft_isalpha
extern _ft_islower
extern _ft_isupper
	
_ft_isalpha:	
	CALL		_ft_islower
	CMP			rax, 0
	JNE			_ft_isalpha_return
	CALL		_ft_isupper
	RET

_ft_isalpha_return:
	RET
	