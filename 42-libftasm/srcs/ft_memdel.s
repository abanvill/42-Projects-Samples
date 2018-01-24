; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_memdel.s                                        :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 11:31:03 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 14:06:43 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_memdel
extern _free

_ft_memdel:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x10
	
	PUSH		rdi
	MOV			rax, rdi
	MOV			rdi, [rax]
	PUSH		rax
	CALL		_free
	POP			rax
	MOV			qword [rax], 0
	POP			rdi
	XOR			rax, rax
	LEAVE
	RET
