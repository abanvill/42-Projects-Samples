/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/03/12 11:19:28 by abanvill          #+#    #+#             */
/*   Updated: 2017/05/11 14:11:16 by abanvill         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* -------------------------------------------------------- */
/* 				Custom library header	    				*/
/* -------------------------------------------------------- */

# include "libfta.h"

/* -------------------------------------------------------- */
/* 				Comment/Uncomment this 						*/
/* -------------------------------------------------------- */

#define CAT_UNIT(argv)						unit_cat(argv);
#define PUTS_UNIT							unit_puts();
#define ABS_UNIT							unit_abs();
#define BZERO_UNIT							unit_bzero();
#define ISTHING_UNIT						unit_isthing();
#define MEMALLOC_UNIT						unit_memalloc();
#define MEMCPY_UNIT							unit_memcpy();
#define MEMDEL_UNIT							unit_memdel();
#define MEMSET_UNIT							unit_memset();
#define PUTSTR_UNIT							unit_putstr();
#define PUTENDL_UNIT						unit_putendl();
#define STRCAT_UNIT							unit_strcat();
#define STRNCAT_UNIT						unit_strncat();
#define STRDUP_UNIT							unit_strdup();
#define STRLEN_UNIT							unit_strlen();
#define TOLOWER_UNIT						unit_tolower();
#define TOUPPER_UNIT						unit_toupper();

/* -------------------------------------------------------- */

/* Unit tests Macro Replacement - Protection */

#ifndef ABS_UNIT
# define ABS_UNIT
#endif
#ifndef BZERO_UNIT
# define BZERO_UNIT
#endif
#ifndef CAT_UNIT
# define CAT_UNIT
#endif
#ifndef ISTHING_UNIT
# define ISTHING_UNIT
#endif
#ifndef MEMALLOC_UNIT
# define MEMALLOC_UNIT
#endif
#ifndef MEMDEL_UNIT
# define MEMDEL_UNIT
#endif
#ifndef MEMCPY_UNIT
# define MEMCPY_UNIT
#endif
#ifndef MEMSET_UNIT
# define MEMSET_UNIT
#endif
#ifndef PUTS_UNIT
# define PUTS_UNIT
#endif
#ifndef PUTSTR_UNIT
# define PUTSTR_UNIT
#endif
#ifndef PUTENDL_UNIT
# define PUTENDL_UNIT
#endif
#ifndef STRCAT_UNIT
# define STRCAT_UNIT
#endif
#ifndef STRNCAT_UNIT
# define STRNCAT_UNIT
#endif
#ifndef STRLEN_UNIT
# define STRLEN_UNIT
#endif
#ifndef STRDUP_UNIT
# define STRDUP_UNIT
#endif
#ifndef TOLOWER_UNIT
# define TOLOWER_UNIT
#endif
#ifndef TOUPPER_UNIT
# define TOUPPER_UNIT
#endif

/* -------------------------------------------------------- */

int				unit_abs(void);
int				unit_bzero(void);
int				unit_cat(char **argv);
int				unit_isthing(void);
int				unit_memalloc(void);
int				unit_memcpy(void);
int				unit_memdel(void);
int				unit_memset(void);
int				unit_puts(void);
int				unit_putstr(void);
int				unit_putendl(void);
int				unit_strcat(void);
int				unit_strncat(void);
int				unit_strdup(void);
int				unit_strlen(void);
int				unit_tolower(void);
int				unit_toupper(void);

/* -------------------------------------------------------- */


#define BZERO								"void ft_bzero(void *s, size_t n)"
#define TEST_BZERO_1						42
#define TEST_BZERO_2						0

#define ISTHING								"int is(alpha|digit|alnum|ascii|print)(int c)"
#define TEST_ISALPHA_1						'a'
#define TEST_ISALPHA_2						'0'
#define TEST_ISDIGIT_1						'a'
#define TEST_ISDIGIT_2						'0'
#define TEST_ISALNUM_1						'a'
#define TEST_ISALNUM_2						'0'
#define TEST_ISALNUM_3						'@'
#define TEST_ISASCII_1						'a'
#define TEST_ISASCII_2						'0'
#define TEST_ISASCII_3						'@'
#define TEST_ISASCII_4						'\t'
#define TEST_ISPRINT_1						'a'
#define TEST_ISPRINT_2						'0'
#define TEST_ISPRINT_3						'@'
#define TEST_ISPRINT_4						'\t'

#define MEMSET								"void *ft_memset(void *b, int c, size_t len)"
#define TEST_MEMSET_1						42

#define MEMCPY								"void *ft_memcpy(void *dst, const void *src, size_t n)"
#define TEST_MEMCPY_1						"Hello World !"
#define TEST_MEMCPY_2						""

#define MEMDEL								"void ft_memdel(void **ap)"
#define TEST_MEMDEL_1						"Hello World !"
#define TEST_MEMDEL_2						""

#define MEMALLOC							"void *ft_memalloc(size_t size)"
#define TEST_MEMALLOC						42

#define FTABS								"unsigned int ft_abs(int nbr)"
#define TEST_FTABS_1 						-42
#define TEST_FTABS_2 						-147483648

#define PUTSTR 								"void ft_putstr(char const *s)"
#define TEST_PUTSTR_1 						"Hello World !"
#define TEST_PUTSTR_2 						NULL

#define PUTENDL 							"void ft_putendl(char const *s);"
#define TEST_PUTENDL_1 						"Hello World !"
#define TEST_PUTENDL_2 						"42"

#define PUTS 								"void ft_puts(char const *s)"
#define TEST_PUTS_1 						"Hello World !"

#define STRCAT								"char *ft_strcat(char *s1, const char *s2)"
#define STRNCAT								"char *ft_strncat(char *s1, const char *s2, size_t n)"
#define TEST_STRCAT_1A						"12345"
#define TEST_STRCAT_1B						"67890A	"
#define TEST_STRCAT_DSTSIZE					8

#define STRLEN								"size_t ft_strlen(const char *s)"
#define TEST_STRLEN_1 						"Hello World !"
#define TEST_STRLEN_2 						"0123456789"
#define TEST_STRLEN_3 						NULL

#define STRDUP								"char *ft_strdup(const char *s1)"
#define TEST_STRDUP_1 						"Hello World !"
#define TEST_STRDUP_2 						"123456789"
#define TEST_STRDUP_3 						NULL

#define TOLOWER 							"int ft_tolower(int c)"
#define TEST_TOLOWER_1						'a'
#define TEST_TOLOWER_2						'A'

#define TOUPPER 							"int ft_toupper(int c)"
#define TEST_TOUPPER_1						'a'
#define TEST_TOUPPER_2						'A'
#define TEST_TOUPPER_3						'Z'

#define TEST_ISLOWER_1 						'a'
#define TEST_ISLOWER_2 						'A'

#define TEST_ISUPPER_1 						'z'
#define TEST_ISUPPER_2 						'Z'

#define BOOL_TERNARY 						"True":"False"

/* -------------------------------------------------------- */
/* 				------------------------					*/
/* -------------------------------------------------------- */

#define TITLE_SEPARATOR 					"###########################################################################\n"
#define COMP_SEPARATOR 						"---------------------------------------------------------------------------\n"
#define SEPARATOR(str) 						printf("\n%s - @\033[32m%s\033[0m\n%s", TITLE_SEPARATOR, str, TITLE_SEPARATOR);

#define MEM_INIT_CHR 						'?'
#define MEM_INIT(dst) 						memset(dst, MEM_INIT_CHR, strlen(dst));
#define MEM_INIT_SIZE(dst, size) 			memset(dst, MEM_INIT_CHR, size);

#define MEM_MALLOC(dst, size)				(dst = (char *)malloc(sizeof(char) * size));
#define MEM_MALLOC_INIT(dst, size)			MEM_MALLOC(dst, size) ; MEM_INIT_SIZE(dst, size)

#define MEM_FREE(src)						free(src); src = NULL;
#define MEM_DBL_FREE(ori, ctm)				MEM_FREE(ori) ; MEM_FREE(ctm);

#define CHR_DEMO_PATTERN(demo)				printf("Test Tool:\n\t\"%c\"\n", demo);
#define INT_DEMO_PATTERN(demo)				printf("Test Tool:\n\t\"%d\"\n", demo);
#define SZT_DEMO_PATTERN(demo)				printf("Test Tool:\n\t\"%ld\"\n", demo);
#define DBL_DEMO_PATTERN(demo)				printf("Test Tool:\n\t\"%lf\"\n", demo);
#define STR_DEMO_PATTERN(demo)				printf("Test Tool:\n\t\"%s\"\n", demo);

#define STR_DBL_DEMO_PATTERN(dst, src)		printf("\nTest Tool:\n\t[\"%s\"|\"%s\"]\n", dst, src);
#define STT_DBL_DEMO_PATTERN(dst, src)		printf("\nPTR State:\n\t[\"%s\"|\"%s\"]\n", dst, src);

#define STR_ORIGINAL_PATTERN(ori)			printf("Original pointer :\n[%s]", ori);

#define CHR_COMP_PATTERN(ori, ctm)			printf("\nOriginal \n\t[%c]\nCustom   \n\t[%c]\n%s", ori, ctm, COMP_SEPARATOR);
#define INT_COMP_PATTERN(ori, ctm)			printf("\nOriginal \n\t[%d]\nCustom   \n\t[%d]\n%s", ori, ctm, COMP_SEPARATOR);
#define SZT_COMP_PATTERN(ori, ctm)			printf("\nOriginal \n\t[%ld]\nCustom   \n\t[%ld]\n%s", ori, ctm, COMP_SEPARATOR);
#define DBL_COMP_PATTERN(ori, ctm)			printf("\nOriginal \n\t[%lf]\nCustom   \n\t[%lf]\n%s", ori, ctm, COMP_SEPARATOR);
#define STR_COMP_PATTERN(ori, ctm)			printf("\nOriginal \n\t[%s]\nCustom   \n\t[%s]\n%s", ori, ctm, COMP_SEPARATOR);

#define INT_RESULT_CMP(ori, ctm)			printf("\nValue State: [%s]\n%d|%d\n", (ori == ctm) ? "\033[32mOK\033[0m" : "\033[31mFail\033[0m", ori, ctm);
#define STR_RESULT_CMP(ori, ctm)			printf("\nString State: [%s]\n", (!strcmp(ori, ctm)) ? "\033[32mOK\033[0m" : "\033[31mFail\033[0m");
#define SZT_RESULT_CMP(ori, ctm)			printf("\nSize State: [%s]\n%ld|%ld\n", (ori == ctm) ? "\033[32mOK\033[0m" : "\033[31mFail\033[0m", ori, ctm);
#define DBL_RESULT_CMP(ori, ctm)			printf("\nSize State: [%s]\n%lf|%lf\n", (ori == ctm) ? "\033[32mOK\033[0m" : "\033[31mFail\033[0m", ori, ctm);
#define TEST_SUCCESSFULL					printf("\n\033[32mTest success :-) \033[0m\n");
#define TEST_FAILURE						printf("\n\033[31mTest failure :-( )\033[0m\n");

/* -------------------------------------------------------- */

int				main(int argc, char *argv[])
{
	(void)argv;
	(void)CAT_UNIT(argv);

	PUTS_UNIT
	BZERO_UNIT
	ISTHING_UNIT
	STRLEN_UNIT
	PUTSTR_UNIT
	PUTENDL_UNIT
	ABS_UNIT
	MEMALLOC_UNIT
	MEMDEL_UNIT
	MEMCPY_UNIT
	MEMSET_UNIT
	STRCAT_UNIT
	STRNCAT_UNIT
	STRDUP_UNIT
	TOLOWER_UNIT
	TOUPPER_UNIT

	return (0);
}

int				unit_bzero(void)
{
	int			res1;
	int			res2;
	char		*memory1;
	char		*memory2;

	/* FT_BZERO */

	SEPARATOR(BZERO);

	INT_DEMO_PATTERN(TEST_BZERO_1);

	memory1 = NULL;
	memory2 = NULL;

	if (!(memory1 = (char *)malloc(sizeof(TEST_BZERO_1))))
	{
		printf("unit_bzero() - Allocation error\n");
		return (1);
	}
	if (!(memory2 = (char *)malloc(sizeof(TEST_BZERO_1))))
	{
		printf("unit_bzero() - Allocation error\n");
		return (1);
	}

	ft_bzero(memory1, TEST_BZERO_1);
	bzero(memory2, TEST_BZERO_1);

	res1 = 0;
	for (int i = 0; i < TEST_BZERO_1; i++)
	{
		if (memory1[i] != 0)
			break ;
		res1 = i + 1;
	}
	res2 = 0;
	for (int i = 0; i < TEST_BZERO_1; i++)
	{
		if (memory2[i] != 0)
			break ;
		res2 = i + 1;
	}

	INT_RESULT_CMP(res2, res1)
	INT_COMP_PATTERN(res2, res1)
	MEM_DBL_FREE(memory1, memory2)

	/* ----------------------------------------------- */

	INT_DEMO_PATTERN(TEST_BZERO_2);

	memory1 = NULL;
	memory2 = NULL;

	if (!(memory1 = (char *)malloc(sizeof(TEST_BZERO_2))))
		printf("unit_bzero() - Allocation error\n");
	if (!(memory2 = (char *)malloc(sizeof(TEST_BZERO_2))))
		printf("unit_bzero() - Allocation error\n");

	ft_bzero(memory1, TEST_BZERO_2);
	bzero(memory2, TEST_BZERO_2);

	res1 = 0;
	for (int i = 0; i < TEST_BZERO_2; i++)
	{
		if (memory1[i] != 0)
			break ;
		res1 = i + 1;
	}
	res2 = 0;
	for (int i = 0; i < TEST_BZERO_2; i++)
	{
		if (memory2[i] != 0)
			break ;
		res2 = i + 1;
	}

	INT_RESULT_CMP(res2, res1)
	INT_COMP_PATTERN(res2, res1)
	MEM_DBL_FREE(memory1, memory2)

	return (0);
}

int				unit_isthing(void)
{
	SEPARATOR(ISTHING);

	/* FT_ISALPHA */
	SEPARATOR("isalpha");

	CHR_DEMO_PATTERN(TEST_ISALPHA_1);
	INT_RESULT_CMP(isalpha(TEST_ISALPHA_1), ft_isalpha(TEST_ISALPHA_1));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISALPHA_2);
	INT_RESULT_CMP(isalpha(TEST_ISALPHA_2), ft_isalpha(TEST_ISALPHA_2));

	/*--------------------------------------------------------------------*/

	/* FT_ISDIGIT */
	SEPARATOR("isdigit");

	CHR_DEMO_PATTERN(TEST_ISDIGIT_1);
	INT_RESULT_CMP(isdigit(TEST_ISDIGIT_1), ft_isdigit(TEST_ISDIGIT_1));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISDIGIT_2);
	INT_RESULT_CMP(isdigit(TEST_ISDIGIT_2), ft_isdigit(TEST_ISDIGIT_2));

	/*--------------------------------------------------------------------*/

	/* FT_ISALNUM */
	SEPARATOR("isalnum");

	CHR_DEMO_PATTERN(TEST_ISALNUM_1);
	INT_RESULT_CMP(isalnum(TEST_ISALNUM_1), ft_isalnum(TEST_ISALNUM_1));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISALNUM_2);
	INT_RESULT_CMP(isalnum(TEST_ISALNUM_2), ft_isalnum(TEST_ISALNUM_2));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISALNUM_3);
	INT_RESULT_CMP(isalnum(TEST_ISALNUM_3), ft_isalnum(TEST_ISALNUM_3));

	/*--------------------------------------------------------------------*/

	/* FT_ISASCII */
	SEPARATOR("isascii");

	CHR_DEMO_PATTERN(TEST_ISASCII_1);
	INT_RESULT_CMP(isascii(TEST_ISASCII_1), ft_isascii(TEST_ISASCII_1));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISASCII_2);
	INT_RESULT_CMP(isascii(TEST_ISASCII_2), ft_isascii(TEST_ISASCII_2));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISASCII_3);
	INT_RESULT_CMP(isascii(TEST_ISASCII_3), ft_isascii(TEST_ISASCII_3));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISASCII_4);
	INT_RESULT_CMP(isascii(TEST_ISASCII_4), ft_isascii(TEST_ISASCII_4));

	/*--------------------------------------------------------------------*/

	/* FT_ISPRINT */
	SEPARATOR("isprint");

	CHR_DEMO_PATTERN(TEST_ISPRINT_1);
	INT_RESULT_CMP(isprint(TEST_ISPRINT_1), ft_isprint(TEST_ISPRINT_1));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISPRINT_2);
	INT_RESULT_CMP(isprint(TEST_ISPRINT_2), ft_isprint(TEST_ISPRINT_2));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISPRINT_3);
	INT_RESULT_CMP(isprint(TEST_ISPRINT_3), ft_isprint(TEST_ISPRINT_3));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_ISPRINT_4);
	INT_RESULT_CMP(isprint(TEST_ISPRINT_4), ft_isprint(TEST_ISPRINT_4));

	return (0);
}

/* -------------------------------------------------------- */

int				unit_memset(void)
{
	int			res1;
	int			res2;
	char		*memory1;
	char		*memory2;

	/* FT_BZERO */

	SEPARATOR(MEMSET);

	INT_DEMO_PATTERN(TEST_BZERO_1);

	memory1 = NULL;
	memory2 = NULL;

	if (!(memory1 = (char *)malloc(sizeof(TEST_MEMSET_1))))
	{
		printf("unit_bzero() - Allocation error\n");
		return (1);
	}
	if (!(memory2 = (char *)malloc(sizeof(TEST_MEMSET_1))))
	{
		printf("unit_bzero() - Allocation error\n");
		return (1);
	}

	ft_memset(memory1, 'X', TEST_MEMSET_1);
	memset(memory2, 'X', TEST_MEMSET_1);

	res1 = 0;
	for (int i = 0; i < TEST_MEMSET_1; i++)
	{
		if (memory1[i] != 'X')
			break ;
		res1 = i + 1;
	}
	res2 = 0;
	for (int i = 0; i < TEST_MEMSET_1; i++)
	{
		if (memory2[i] != 'X')
			break ;
		res2 = i + 1;
	}

	INT_RESULT_CMP(res2, res1)
	INT_COMP_PATTERN(res2, res1)
	MEM_DBL_FREE(memory1, memory2)

	return (0);
}

int 			unit_memdel(void)
{
	void 		*memory;

	SEPARATOR(MEMDEL);

	/* FT_MEMDEL */

	MEM_MALLOC_INIT(memory, strlen(TEST_MEMDEL_1));

	STR_DEMO_PATTERN(TEST_MEMDEL_1);
	ft_memdel(&memory);

	if (memory == NULL)
		TEST_SUCCESSFULL
	else
		TEST_FAILURE

	/* ----------------------------------------------- */

	MEM_MALLOC_INIT(memory, strlen(TEST_MEMDEL_2));

	STR_DEMO_PATTERN(TEST_MEMDEL_2);
	ft_memdel(&memory);

	if (memory == NULL)
		TEST_SUCCESSFULL
	else
		TEST_FAILURE

	/* ----------------------------------------------- */

	return (0);
}

int 			unit_memcpy(void)
{
	char 		*memory1;
	char 		*memory2;

	SEPARATOR(MEMCPY);

	/* FT_MEMCPY */

	MEM_MALLOC_INIT(memory1, strlen(TEST_MEMCPY_1));
	MEM_MALLOC_INIT(memory2, strlen(TEST_MEMCPY_1));

	STR_DEMO_PATTERN(TEST_MEMCPY_1);
	STR_COMP_PATTERN(memcpy(memory1, TEST_MEMCPY_1, strlen(TEST_MEMCPY_1)), ft_memcpy(memory2, TEST_MEMCPY_1, strlen(TEST_MEMCPY_1)));
	STR_RESULT_CMP(memory1, memory2);

	/* ----------------------------------------------- */

	MEM_INIT(memory1);
	MEM_INIT(memory2);

	STR_DEMO_PATTERN(TEST_MEMCPY_2);
	STR_COMP_PATTERN(memcpy(memory1, TEST_MEMCPY_2, strlen(TEST_MEMCPY_2)), ft_memcpy(memory2, TEST_MEMCPY_2, strlen(TEST_MEMCPY_2)));
	STR_RESULT_CMP(memory1, memory2);

	/* ----------------------------------------------- */

	MEM_DBL_FREE(memory1, memory2);

	return (0);
}

int				unit_strcat(void)
{
	char 		*memory1;
	char 		*memory2;
	char 		memory3[9];
	char 		memory4[9];

	SEPARATOR(STRCAT);

	/* FT_STRCAT */

	MEM_MALLOC_INIT(memory1, strlen(TEST_STRCAT_1A) + strlen(TEST_STRCAT_1B) + TEST_STRCAT_DSTSIZE);
	MEM_MALLOC_INIT(memory2, strlen(TEST_STRCAT_1A) + strlen(TEST_STRCAT_1B) + TEST_STRCAT_DSTSIZE);

	strcpy(memory1, TEST_STRCAT_1A);
	strcpy(memory2, TEST_STRCAT_1A);

	STR_DBL_DEMO_PATTERN(TEST_STRCAT_1A, TEST_STRCAT_1B);
	STR_RESULT_CMP(memory1, memory2);
	STR_COMP_PATTERN(strcat(memory1, TEST_STRCAT_1B), ft_strcat(memory2, TEST_STRCAT_1B));

	/* ----------------------------------------------- */

	MEM_INIT(memory1);
	MEM_INIT(memory2);

	strcpy(memory1, TEST_STRCAT_1A);
	strcpy(memory2, TEST_STRCAT_1A);

	STR_DBL_DEMO_PATTERN(TEST_STRCAT_1A, TEST_STRCAT_1B);
	STR_RESULT_CMP(memory1, memory2);
	STR_COMP_PATTERN(strcat(memory1, TEST_STRCAT_1B), ft_strcat(memory2, TEST_STRCAT_1B));

	/* ----------------------------------------------- */

	MEM_INIT(memory1);
	MEM_INIT(memory2);

	strcpy(memory1, TEST_STRCAT_1A);
	strcpy(memory2, TEST_STRCAT_1A);

	STR_DBL_DEMO_PATTERN(TEST_STRCAT_1A, TEST_STRCAT_1B);
	STR_RESULT_CMP(memory1, memory2);
	STR_COMP_PATTERN(strcat(memory1, TEST_STRCAT_1B), ft_strcat(memory2, TEST_STRCAT_1B));

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN("");
	strcat(memory3, "") ; ft_strcat(memory4, "") ;
	STR_RESULT_CMP(memory3, memory4);
	STR_COMP_PATTERN(memory3, memory4);

	STR_DEMO_PATTERN("Bon");
	strcat(memory3, "Bon") ; ft_strcat(memory4, "Bon") ;
	STR_RESULT_CMP(memory3, memory4);
	STR_COMP_PATTERN(memory3, memory4);

	STR_DEMO_PATTERN("jour.");
	strcat(memory3, "jour.") ; ft_strcat(memory4, "jour.") ;
	STR_RESULT_CMP(memory3, memory4);
	STR_COMP_PATTERN(memory3, memory4);

	STR_DEMO_PATTERN("");
	strcat(memory3, "") ; ft_strcat(memory4, "") ;
	STR_RESULT_CMP(memory3, memory4);
	STR_COMP_PATTERN(memory3, memory4);

	STR_COMP_PATTERN(memory3, memory4);
	STR_RESULT_CMP(memory3, memory4);

	MEM_DBL_FREE(memory1, memory2);

	return (0);
}

int				unit_strncat(void)
{
	char 		*memory1;
	char 		*memory2;
	char 		memory3[9];
	char 		memory4[9];

	SEPARATOR(STRNCAT);

	/* FT_STRCAT */

	MEM_MALLOC_INIT(memory1, strlen(TEST_STRCAT_1A) + strlen(TEST_STRCAT_1B) + TEST_STRCAT_DSTSIZE);
	MEM_MALLOC_INIT(memory2, strlen(TEST_STRCAT_1A) + strlen(TEST_STRCAT_1B) + TEST_STRCAT_DSTSIZE);

	strcpy(memory1, TEST_STRCAT_1A);
	strcpy(memory2, TEST_STRCAT_1A);

	STR_DBL_DEMO_PATTERN(TEST_STRCAT_1A, TEST_STRCAT_1B);
	STR_RESULT_CMP(memory1, memory2);
	STR_COMP_PATTERN(strncat(memory1, TEST_STRCAT_1B, 4), ft_strncat(memory2, TEST_STRCAT_1B, 4));

	/* ----------------------------------------------- */

	MEM_INIT(memory1);
	MEM_INIT(memory2);

	strcpy(memory1, TEST_STRCAT_1A);
	strcpy(memory2, TEST_STRCAT_1A);

	STR_DBL_DEMO_PATTERN(TEST_STRCAT_1A, TEST_STRCAT_1B);
	STR_RESULT_CMP(memory1, memory2);
	STR_COMP_PATTERN(strncat(memory1, TEST_STRCAT_1B, 2), ft_strncat(memory2, TEST_STRCAT_1B, 2));

	/* ----------------------------------------------- */

	MEM_INIT(memory1);
	MEM_INIT(memory2);

	strcpy(memory1, TEST_STRCAT_1A);
	strcpy(memory2, TEST_STRCAT_1A);

	STR_DBL_DEMO_PATTERN(TEST_STRCAT_1A, TEST_STRCAT_1B);
	STR_RESULT_CMP(memory1, memory2);
	STR_COMP_PATTERN(strncat(memory1, TEST_STRCAT_1B, 3), ft_strncat(memory2, TEST_STRCAT_1B, 3));

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN("");
	memory3[0] = (char)0;
	memory4[0] = (char)0;
	strncat(memory3, "", 0) ; ft_strncat(memory4, "", 0) ;
	STR_RESULT_CMP(memory3, memory4);
	STR_COMP_PATTERN(memory3, memory4);

	STR_DEMO_PATTERN("Bon");
	memory3[0] = (char)0;
	memory4[0] = (char)0;
	strncat(memory3, "Bon", 3) ; ft_strncat(memory4, "Bon", 3) ;
	STR_RESULT_CMP(memory3, memory4);
	STR_COMP_PATTERN(memory3, memory4);

	STR_DEMO_PATTERN("jour.");
	memory3[0] = (char)0;
	memory4[0] = (char)0;
	strncat(memory3, "jour.", 2) ; ft_strncat(memory4, "jour.", 2) ;
	STR_RESULT_CMP(memory3, memory4);
	STR_COMP_PATTERN(memory3, memory4);

	STR_DEMO_PATTERN("");
	memory3[0] = (char)0;
	memory4[0] = (char)0;
	strncat(memory3, "", 0) ; ft_strncat(memory4, "", 0) ;
	STR_RESULT_CMP(memory3, memory4);
	STR_COMP_PATTERN(memory3, memory4);

	STR_COMP_PATTERN(memory3, memory4);
	STR_RESULT_CMP(memory3, memory4);

	MEM_DBL_FREE(memory1, memory2);

	return (0);
}

int 			unit_puts(void)
{
	SEPARATOR(PUTS);


	ft_puts("lasdk;lsa;dk ;asdk; k;asdk ;ksa;k d;asjd ;sajd; jas;dk ;laskd ;laskd; ;ajsd jas;dk ;aks;d ;asdj ;lasj;ld j;asjd ;jasd;l jasdj ;laskd l;askd ;kas;d ;asjd; j;sadj ;lsajd; jasdj; ajd;lj as;ldj als;jd;l jas;ldj lasjdl; s;ladj ;lasd ;j;sad;jsa; jdsa;j ;lsajd; jas;ldj ;asjd;l ajs;ld js;aldj ;lasdj l;asjd;l jas;ldj ljsad;l jsa'd l;sd;j as;das'jd jsad;'sajd;l as;'d js;aldjs ;'dks a;'dka;'skd'kas';dk ;sadk ;'sad 'ksa';k sad';dk ;'skad;ásd;'ksa;'dk ;'sadkas;'dk lasd klaslj \n");
	ft_puts(TEST_PUTS_1);
	ft_puts(TEST_PUTSTR_2);
	puts(TEST_PUTSTR_2);

	return (0);
}

int				unit_strlen(void)
{
	SEPARATOR(STRLEN);

	/* FT_STRLEN */

	STR_DEMO_PATTERN(TEST_STRLEN_1);
	SZT_RESULT_CMP(strlen(TEST_STRLEN_1), ft_strlen(TEST_STRLEN_1));
	SZT_COMP_PATTERN(strlen(TEST_STRLEN_1), ft_strlen(TEST_STRLEN_1));

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN(TEST_STRLEN_2);
	SZT_RESULT_CMP(strlen(TEST_STRLEN_2), ft_strlen(TEST_STRLEN_2));
	SZT_COMP_PATTERN(strlen(TEST_STRLEN_2), ft_strlen(TEST_STRLEN_2));

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN(TEST_STRLEN_3);
	printf("(Original) -> Segfault\n");
	// SZT_RESULT_CMP(strlen(TEST_STRLEN_3), ft_strlen(TEST_STRLEN_3));
	// SZT_COMP_PATTERN(strlen(TEST_STRLEN_3), ft_strlen(TEST_STRLEN_3));

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN(TEST_STRCAT_1A);
	SZT_RESULT_CMP(strlen(TEST_STRCAT_1A), ft_strlen(TEST_STRCAT_1A));
	SZT_COMP_PATTERN(strlen(TEST_STRCAT_1A), ft_strlen(TEST_STRCAT_1A));

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN(TEST_STRCAT_1B);
	SZT_RESULT_CMP(strlen(TEST_STRCAT_1B), ft_strlen(TEST_STRCAT_1B));
	SZT_COMP_PATTERN(strlen(TEST_STRCAT_1B), ft_strlen(TEST_STRCAT_1B));

	/* ----------------------------------------------- */

	return (0);
}

int				unit_strdup(void)
{
	char		*memory1;
	char		*memory2;

	memory1 = strdup(TEST_STRDUP_1);
	memory2 = ft_strdup(memory1);

	SEPARATOR(STRDUP);

	/* FT_STRDUP */

	STR_DEMO_PATTERN(TEST_STRDUP_1);
	STR_RESULT_CMP(strdup(TEST_STRDUP_1), ft_strdup(TEST_STRDUP_1));
	STR_COMP_PATTERN(strdup(TEST_STRDUP_1), ft_strdup(TEST_STRDUP_1));

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN(TEST_STRDUP_2);
	STR_RESULT_CMP(strdup(TEST_STRDUP_2), ft_strdup(TEST_STRDUP_2));
	STR_COMP_PATTERN(strdup(TEST_STRDUP_2), ft_strdup(TEST_STRDUP_2));

	return (0);
}

int				unit_tolower(void)
{
	SEPARATOR(TOLOWER);

	/* FT_TOLOWER */

	CHR_DEMO_PATTERN(TEST_TOLOWER_1);
	INT_RESULT_CMP(tolower(TEST_TOLOWER_1), ft_tolower(TEST_TOLOWER_1));
	CHR_COMP_PATTERN(tolower(TEST_TOLOWER_1), ft_tolower(TEST_TOLOWER_1));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_TOLOWER_2);
	INT_RESULT_CMP(tolower(TEST_TOLOWER_2), ft_tolower(TEST_TOLOWER_2));
	CHR_COMP_PATTERN(tolower(TEST_TOLOWER_2), ft_tolower(TEST_TOLOWER_2));

	return (0);
}

int				unit_toupper(void)
{
	SEPARATOR(TOUPPER);

	/* FT_TOUPPER */

	CHR_DEMO_PATTERN(TEST_TOUPPER_1);
	INT_RESULT_CMP(toupper(TEST_TOUPPER_1), ft_toupper(TEST_TOUPPER_1));
	CHR_COMP_PATTERN(toupper(TEST_TOUPPER_1), ft_toupper(TEST_TOUPPER_1));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_TOUPPER_2);
	INT_RESULT_CMP(toupper(TEST_TOUPPER_2), ft_toupper(TEST_TOUPPER_2));
	CHR_COMP_PATTERN(toupper(TEST_TOUPPER_2), ft_toupper(TEST_TOUPPER_2));

	/* ----------------------------------------------- */

	CHR_DEMO_PATTERN(TEST_TOUPPER_3 + 1);
	INT_RESULT_CMP(toupper(TEST_TOUPPER_3 + 1), ft_toupper(TEST_TOUPPER_3 + 1));
	INT_COMP_PATTERN(toupper(TEST_TOUPPER_3 + 1), ft_toupper(TEST_TOUPPER_3 + 1));

	return (0);
}

int 				unit_cat(char **argv)
{
	// ft_cat(0);
	ft_cat(open(__FILE__, O_RDONLY));
	ft_cat(open(argv[0], O_RDONLY));
	ft_cat(-42);
	// ft_cat(open("/dev/random", O_RDONLY));

	return (0);
}

int 				unit_abs(void)
{
	SEPARATOR(FTABS);

	/* FT_TOLOWER */

	INT_DEMO_PATTERN(TEST_FTABS_1);
	INT_RESULT_CMP(abs(TEST_FTABS_1), (int)ft_abs(TEST_FTABS_1));
	INT_COMP_PATTERN(abs(TEST_FTABS_1), (int)ft_abs(TEST_FTABS_1));

	/* ----------------------------------------------- */

	INT_DEMO_PATTERN(TEST_FTABS_2);
	INT_RESULT_CMP(abs(TEST_FTABS_2), (int)ft_abs(TEST_FTABS_2));
	INT_COMP_PATTERN(abs(TEST_FTABS_2), (int)ft_abs(TEST_FTABS_2));

	return (0);
}

int						unit_memalloc(void)
{
	char		*memory1;
	int			res;

	SEPARATOR(MEMALLOC);

	res = 0;
	memory1 = ft_memalloc(TEST_MEMALLOC);

	if (!memory1)
		printf("Allocation error\n");

	for (int i = 0; i < TEST_MEMALLOC; i++)
	{
		if (memory1[i] != 0)
			break ;
		res = i + 1;
	}

	INT_DEMO_PATTERN(TEST_MEMALLOC);
	INT_RESULT_CMP(TEST_MEMALLOC, res);
	INT_COMP_PATTERN(TEST_MEMALLOC, res);

	if (res != TEST_MEMALLOC)
	{
		printf("%d bytes required\n", TEST_MEMALLOC);
		printf("%d bytes properly allocated\n", res);
	}

	return (0);
}

int							unit_putstr(void)
{
	char					*ptr = "Un autre test";

	SEPARATOR(PUTSTR);

	/* FT_PUTSTR */

	STR_DEMO_PATTERN(TEST_PUTSTR_1);
	ft_putstr("[");
	ft_putstr(TEST_PUTSTR_1);
	ft_putstr("]\n");

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN(TEST_PUTSTR_2);
	ft_putstr("[");
	ft_putstr(NULL);
	ft_putstr("]\n");

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN(ptr);
	ft_putstr("[");
	ft_putstr(ptr);
	ft_putstr("]\n");

	return (0);
}

int							unit_putendl(void)
{
	SEPARATOR(PUTENDL);

	/* FT_PUTENDL */

	STR_DEMO_PATTERN(TEST_PUTENDL_1);
	ft_putstr("[");
	ft_putendl(TEST_PUTENDL_1);
	ft_putstr("]\n");

	/* ----------------------------------------------- */

	STR_DEMO_PATTERN(TEST_PUTENDL_2);
	ft_putstr("[");
	ft_putendl(TEST_PUTENDL_2);
	ft_putstr("]\n");

	return (0);
}
