; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_puts.s                                          :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 16:08:37 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 14:05:41 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

%define MACH_SYSCALL(nb)		0x2000000 | nb
%define WRITE 					4

global _ft_puts
extern _ft_strlen

[SECTION .data]

_null:
	DB				"(null)", 10, 0
_newline:
	DB				10

[SECTION .text]

_ft_puts:
	PUSH			rbp
	MOV				rbp, rsp
	SUB				rsp, 0x10

	PUSH			rdi
	XOR				rax ,rax
	CMP				rdi, 0
	JLE				_ft_puts_null
	CALL			_ft_strlen
	MOV				rdx, rax
	MOV				rsi, rdi
	MOV				rdi, 1
	MOV				rax, MACH_SYSCALL(WRITE)
	SYSCALL

	CMP 			rax, -1
	JE				_ft_puts_error

	MOV 			rdi, 1
	MOV 			rsi, _newline
	MOV 			rdx, 1
	MOV				rax, MACH_SYSCALL(WRITE)
	SYSCALL

	CMP				rax, -1
	JE				_ft_puts_error

	POP				rdi
	MOV				rax, 10

	LEAVE
	RET

_ft_puts_null:
	MOV 			rdi, 1
	MOV 			rsi, _null
	MOV 			rdx, 7
	MOV				rax, MACH_SYSCALL(WRITE)
	SYSCALL

	POP				rdi
	MOV				rax, 10

	LEAVE
	RET

_ft_puts_error:
	POP				rdi
	MOV 			rax, -1

	LEAVE
	RET
