; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_isupper.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/19 15:26:56 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/08 15:06:50 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_isupper

_ft_isupper:
	CMP			rdi, 65
	JL			_ft_isupper_return
	CMP			rdi, 90
	JG			_ft_isupper_return
	MOV			rax, 1
	RET

_ft_isupper_return:
	XOR			rax, rax
	RET
