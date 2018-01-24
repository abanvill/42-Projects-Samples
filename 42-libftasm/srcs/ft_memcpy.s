; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_memcpy.s                                        :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 11:31:03 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 14:06:58 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_memcpy

_ft_memcpy:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x10
	
	XOR			rax, rax
	PUSH		rdi				; RDI - Save
	MOV			rax, rdi		; Place [*dst] directement dans le registre de retour
	MOV			rcx, rdx		; Déplace le second argument (size_t n) dans RCX
	REP			MOVSB			; Déplace les bytes de RSI dans RDI tant que (RDI != RAX || RCX != 0)
	POP			rdi				; RDI - Restoration
	LEAVE
	RET
