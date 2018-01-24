; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_putendl.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 16:08:37 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 11:43:24 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

%define MACH_SYSCALL(nb)		0x2000000 | nb
%define WRITE 					4

global _ft_putendl
extern _ft_strlen
extern _ft_putstr

[SECTION .data]

_newline:
	DB				10, 0

[SECTION .text]

_ft_putendl:
	PUSH			rbp
	MOV				rbp, rsp
	SUB				rsp, 0x20

	PUSH			rdi
	XOR				rax ,rax

	CMP				rdi, 0
	JLE				_ft_putendl_return

	CALL			_ft_putstr
	MOV 			rdi, _newline
	CALL			_ft_putstr

	POP				rdi
	JMP				_ft_putendl_return

_ft_putendl_return:
	LEAVE
	RET
