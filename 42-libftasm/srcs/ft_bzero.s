; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_bzero.s                                         :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/19 13:06:34 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 14:09:03 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_bzero

_ft_bzero:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x10

	XOR			rax, rax
	MOV			rcx, rsi
	CMP			rsi, 0
	JLE			_ft_bzero_return
	CLD
	REP			STOSB
	JMP			_ft_bzero_return

_ft_bzero_return:
	LEAVE
	RET
