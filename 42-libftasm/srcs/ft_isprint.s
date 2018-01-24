; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_isprint.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/12 10:50:35 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/08 15:06:53 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_isprint

_ft_isprint:
	CMP			rdi, 32
	JL			_ft_isprint_return
	CMP			rdi, 126
	JG			_ft_isprint_return
	MOV			rax, 1
	RET

_ft_isprint_return:
	XOR 		rax, rax
	RET
