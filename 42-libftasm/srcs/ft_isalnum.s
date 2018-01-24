;******************************************************************************;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_isalnum.s                                       :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/12 13:59:59 by abanvill          #+#    #+#              ;
;    Updated: 2015/03/19 12:50:17 by abanvill         ###   ########.fr        ;
;                                                                              ;
;******************************************************************************;

[SECTION .text]

global	_ft_isalnum
extern	_ft_isalpha
extern	_ft_isdigit
	
_ft_isalnum:
	XOR			rax, rax
	CALL		_ft_isalpha
	CMP			rax, 1
	JE			_ft_isalnum_return
	CALL		_ft_isdigit
	RET

_ft_isalnum_return:
	RET
