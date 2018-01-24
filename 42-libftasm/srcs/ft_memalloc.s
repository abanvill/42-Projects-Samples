; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_memalloc.s                                      :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 16:08:37 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 14:07:13 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_memalloc
extern _malloc
extern _ft_bzero

_ft_memalloc:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x20

	XOR			rax, rax			; Réinitialisation à 0 de RAX
	CMP			edi, 0
	JBE			_ft_memalloc_return
	PUSH		rdi
	PUSH		rsi
	CALL		_malloc				; Appel de malloc(RDI)
	POP			rsi
	POP			rdi
	CMP			rax, 0				; Verifie si l'allocation a réussie (Differente de 0|NULL)
	JE			_ft_memalloc_return	; Si non, quitte la fonction
	MOV			rsi, rdi
	MOV			rdi, rax			; Déplacement du résultat de malloc dans RDI
	PUSH		rdi
	CALL		_ft_bzero
	POP			rdi
	MOV			rax, rdi
	JMP			_ft_memalloc_return	;

_ft_memalloc_return:
	LEAVE
	RET
