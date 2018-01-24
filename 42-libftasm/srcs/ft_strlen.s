; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_strlen.s                                        :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/19 12:59:24 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 10:44:37 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_strlen

_ft_strlen:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x10

	PUSH		rdi				; Push par copie du RDI original RDONLY dans la stack
	PUSH		rdi				; Push par copie du RDI original WRITABLE dans la stack
	XOR			rax, rax 		; Initialisation de RAX (Registre de retour par défaut) á zero
	CMP			rdi, 0
	JBE			_ft_strlen_return
	MOV			rcx, -1 		; Initialisation de RCX
	REPNE		SCASB			; Repeat while Not Equal - [Scan String Byte] (Comparaison doctets RDI-RAX || RCX == 0)
	POP			rcx				; Recuperation de la copie de RDI de la stack dans RCX
	ADD			rcx, 1			; Equilibrage
	SUB			rdi, rcx 		; Soustraction des offsets pour déterminer la longueur
	MOV			rax, rdi		; Copie du résultat dans le RAX
	POP 		rdi 			; Recuperation du RDI originel
	JMP			_ft_strlen_return

_ft_strlen_return:
	LEAVE
	RET
