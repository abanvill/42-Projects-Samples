; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_strdup.s                                        :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 16:08:37 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 14:03:07 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_strdup
extern _ft_memcpy
extern _ft_strlen
extern _malloc

_ft_strdup:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x20

	XOR			rax, rax			; Réinitialisation à 0 de RAX
	CMP			rdi, 0
	JE			_ft_strdup_null

	PUSH		rdi					; Sauvegarde de l'addresse de [*src](RDI) dans la stack
	PUSH		r14
	PUSH		rcx
	PUSH		rdi

	MOV			rcx, -1
	XOR			r14, r14			; Réinitialisation à 0 de R14

	CALL		_ft_strlen			; Calcul de la taille de [*src](RDI)

	INC			rax					; Ajout de un byte pour le '\0' terminal
	MOV			r14, rax			; Sauvegarde du retour de la taille de [*src](strlen(RDI))
	MOV			rdi, rax			; Déplacement du retour de la taille de [*src] dans RDI (Pour appel de malloc())

	CALL		_malloc				; Appel de malloc(RDI)
	CMP			rax, 0				; Verifie si l'allocation a réussie (Differente de 0|NULL)
	JE			_malloc_error		; Si non, quitte la fonction

	MOV			rdi, rax			; Déplacement du résultat de malloc dans RDI
	POP			rsi					; Déplacement de l'addresse de [*src](RDI) dans RSI
	MOV			rdx, r14			; Déplacement de la copie de la taille de [*src] dans RDX

	CALL		_ft_memcpy			;
	JMP			_malloc_return

_ft_strdup_null:
	LEAVE
	RET

_malloc_return:
	POP			rcx
	POP			r14
	POP			rdi
	LEAVE
	RET

_malloc_error:
	POP			rdi					; Récupération du RDI originel
	JMP			_malloc_return
