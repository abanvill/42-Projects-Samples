;******************************************************************************;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_toupper.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/19 15:20:56 by abanvill          #+#    #+#              ;
;    Updated: 2015/03/19 16:12:27 by abanvill         ###   ########.fr        ;
;                                                                              ;
;******************************************************************************;

[SECTION .text]

global _ft_toupper
extern _ft_islower
	
_ft_toupper:
	CALL		_ft_islower
	CMP			rax, 0
	JG			_ft_toupper_process
	MOV			rax, rdi
	RET
	
_ft_toupper_process:
	MOV			rax, rdi
	SUB			rax, 32
	RET