;******************************************************************************;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_tolower.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/19 16:16:47 by abanvill          #+#    #+#              ;
;    Updated: 2015/03/19 16:20:38 by abanvill         ###   ########.fr        ;
;                                                                              ;
;******************************************************************************;

[SECTION .text]

global _ft_tolower
extern _ft_isupper

_ft_tolower:
	CALL		_ft_isupper
	CMP			rax, 0
	JG			_ft_tolower_process
	MOV			rax, rdi
	RET

_ft_tolower_process:
	MOV			rax, rdi
	ADD			rax, 32
	RET
