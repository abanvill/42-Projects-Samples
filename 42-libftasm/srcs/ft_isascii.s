;******************************************************************************;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_isascii.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/19 12:54:59 by abanvill          #+#    #+#              ;
;    Updated: 2015/03/19 12:58:30 by abanvill         ###   ########.fr        ;
;                                                                              ;
;******************************************************************************;

[SECTION .text]

global _ft_isascii

_ft_isascii:
	XOR			rax, rax
	CMP			rdi, 0
	JL			_ft_isascii_return
	CMP			rdi, 127
	JG			_ft_isascii_return
	MOV			rax, 1
	RET

_ft_isascii_return:
	RET
