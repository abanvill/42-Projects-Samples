; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_strcmp.s                                        :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/12 12:19:54 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 10:00:02 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_strcmp
extern _ft_islower
extern _ft_isupper

_ft_strcmp:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x20

	PUSH		rdi
	PUSH		rsi

	CMPSB

	RET

_ft_strcmp_return:
	RET
