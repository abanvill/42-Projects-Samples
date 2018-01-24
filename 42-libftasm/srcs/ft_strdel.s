; **************************************************************************** ;
;                                                                              ;
;                                                         :::      ::::::::    ;
;    ft_strdel.s                                        :+:      :+:    :+:    ;
;                                                     +:+ +:+         +:+      ;
;    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         ;
;                                                 +#+#+#+#+#+   +#+            ;
;    Created: 2015/03/20 11:31:03 by abanvill          #+#    #+#              ;
;    Updated: 2017/05/11 14:03:40 by abanvill         ###   ########.fr        ;
;                                                                              ;
; **************************************************************************** ;

[SECTION .text]

global _ft_strdel
extern _free
extern _ft_memdel

_ft_strdel:
	PUSH		rbp
	MOV			rbp, rsp
	SUB			rsp, 0x10

	PUSH		rdi
	TEST		rdi, rdi
	JZ			_ft_strdel_return
	CALL		_ft_memdel
	JMP			_ft_strdel_return

_ft_strdel_return:
	POP			rdi
	LEAVE
	RET
