[SECTION .text]

global _ft_memset

_ft_memset:
	PUSH			rbp
	MOV				rbp, rsp
	SUB				rsp, 0x10

	PUSH			rdi
	PUSH			rcx
	XOR				rax, rax
	MOV				rax, rsi
	MOV				rcx, rdx
	CMP				rcx, 0
	JLE				_ft_memset_return
	REP				STOSB
	JMP				_ft_memset_return

_ft_memset_return:
	POP				rcx
	POP				rdi
	MOV				rax, rdi
	LEAVE
	RET
