; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_cat.s                                           :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/12 13:59:59 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 14:10:14 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

%define MACH_SYSCALL(nb)		0x2000000 | nb
%define WRITE 					4
%define READ 					3
%define BUFFER_SIZE				64
%define STDOUT					1

global _ft_cat
extern _ft_strlen

[SECTION .bss]

_buffer:
	RESB			BUFFER_SIZE

[SECTION .text]

; Read syscall
; rdi = File descriptor
; rsi = Buffer address
; rdx = Buffer length

_ft_cat:
	PUSH 			rbp
	MOV 			rbp, rsp
	SUB				rsp, 0x10
	JMP				_ft_cat_read

_ft_cat_read:
	PUSH			rdi
	LEA				rsi, [rel _buffer]
	MOV				rdx, BUFFER_SIZE
	MOV				rax, MACH_SYSCALL(READ)
	SYSCALL

	JC				_ft_cat_error
	CMP				rax, 0
	JLE				_ft_cat_return

	MOV				rdx, rax
	MOV				rdi, STDOUT
	MOV				rax, MACH_SYSCALL(WRITE)
	SYSCALL

	POP				rdi
	JC				_ft_cat_error
	JMP				_ft_cat_read

	LEAVE
	RET

_ft_cat_error:
	XOR				rax, rax

_ft_cat_return:
	LEAVE
	RET
