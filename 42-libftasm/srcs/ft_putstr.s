; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_putstr.s                                        :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 16:08:37 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 11:44:22 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

%define MACH_SYSCALL(nb)		0x2000000 | nb
%define WRITE 					4

global _ft_putstr
extern _ft_strlen

[SECTION .text]

_ft_putstr:
	PUSH			rbp
	MOV				rbp, rsp
	SUB				rsp, 0x20

	PUSH			rdx
	PUSH			rsi
	PUSH			rdi
	PUSH			rdi

	CMP				rdi, 0
	JLE				_ft_putstr_return
	CALL			_ft_strlen
	POP				rdi
	MOV				rdx, rax
	MOV				rsi, rdi
	MOV				rdi, 1
	MOV				rax, MACH_SYSCALL(WRITE)
	SYSCALL

	POP				rdi
	POP				rsi
	POP				rdx

	JMP				_ft_putstr_return

_ft_putstr_return:
	LEAVE
	RET
