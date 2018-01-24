; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_strncat.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 16:08:37 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 13:29:27 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_strncat
extern _ft_strlen

_ft_strncat:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x10

	PUSH		rdi					; Push par copie du RDI original RDONLY dans la stack
	XOR			rax, rax			; Initialisation de RAX (Registre de retour par défaut) á zero
	MOV 		rcx, -1 			; Préparation pour les répétiteurs

	CALL		_ft_strlen			; Récupération de la taille de DST
	ADD			rdi, rax			; Déplacement de offset de RDI
	PUSH		rdi					; Push de DST dans la stack

	MOV			rcx, rdx			; Remplacement de RCX par la taille de SRC
	POP			rdi					; Récupération de DST
	REPNZ		MOVSB 				; Copie des Bytes de SRC(RSI) dans DST(RDI) (RCX != 0)
	MOV			byte [rdi], 0		; "\0" de fin
	POP			rdi					; Récupération du RDI originel
	MOV			rax, rdi			; Récupération de l adresse originelle

	LEAVE
	RET

_ft_strncat_return:
	POP			rdi 				; Récupération du RDI modifié
	POP			rdi					; Écrasement du RDI modifié par récupération du RDI originel
	MOV			rax, rdi			; Récupération de l adresse originelle

	LEAVE
	RET
