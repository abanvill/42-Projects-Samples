; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_islower.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/19 15:24:58 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/08 15:06:56 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_islower

_ft_islower:
	CMP			rdi, 97
	JL			_ft_islower_return
	CMP			rdi, 122
	JG			_ft_islower_return
	MOV			rax, 1
	RET

_ft_islower_return:
	XOR			rax, rax
	RET
