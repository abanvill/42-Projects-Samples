; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_isdigit.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/12 10:50:35 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/08 15:06:38 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_isdigit

_ft_isdigit:
	CMP			rdi, 48
	JL			_ft_isdigit_return
	CMP			rdi, 57
	JG			_ft_isdigit_return
	MOV			rax, 1
	RET

_ft_isdigit_return:
	XOR 		rax, rax
	RET
