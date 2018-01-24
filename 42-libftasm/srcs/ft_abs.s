; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_abs.s                                           :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/19 13:06:34 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/10 13:00:51 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_abs

_ft_abs:
	XOR				rax, rax
	CMP				edi,  0
	JL				_ft_abs_invert
	RET

_ft_abs_invert:
	MOV				eax, edi
	XOR				eax, -1
	INC				eax
	RET
