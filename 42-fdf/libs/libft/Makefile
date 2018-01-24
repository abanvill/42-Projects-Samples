# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2015/01/28 19:26:04 by abanvill          #+#    #+#              #
#    Updated: 2017/02/07 16:25:12 by abanvill         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

CC				 = gcc

CFLAGS			 	 = -Wall -Werror -Wextra -pedantic -pedantic-errors
IFLAGS				 = $(INCLUDES_LIBS) $(INCLUDES_SRCS)

INCLUDES_SRCS	 		 = -I includes
INCLUDES_LIBS			 = $(addprefix -I , $(LIBS_LST))

SRCS_DIR			 = srcs/
SRCS 				+= $(SRCS_DIR)ft_atoi.c
SRCS 				+= $(SRCS_DIR)ft_bzero.c
SRCS 				+= $(SRCS_DIR)ft_charnbr.c
SRCS 				+= $(SRCS_DIR)ft_isalnum.c
SRCS 				+= $(SRCS_DIR)ft_isalpha.c
SRCS 				+= $(SRCS_DIR)ft_isascii.c
SRCS 				+= $(SRCS_DIR)ft_isdigit.c
SRCS 				+= $(SRCS_DIR)ft_islower.c
SRCS 				+= $(SRCS_DIR)ft_isprint.c
SRCS 				+= $(SRCS_DIR)ft_isupper.c
SRCS 				+= $(SRCS_DIR)ft_itoa.c
SRCS 				+= $(SRCS_DIR)ft_lstadd.c
SRCS 				+= $(SRCS_DIR)ft_lstdel.c
SRCS 				+= $(SRCS_DIR)ft_lstdelone.c
SRCS 				+= $(SRCS_DIR)ft_lstiter.c
SRCS 				+= $(SRCS_DIR)ft_lstmap.c
SRCS 				+= $(SRCS_DIR)ft_lstnew.c
SRCS 				+= $(SRCS_DIR)ft_lstpush.c
SRCS 				+= $(SRCS_DIR)ft_memalloc.c
SRCS 				+= $(SRCS_DIR)ft_memccpy.c
SRCS 				+= $(SRCS_DIR)ft_memchr.c
SRCS 				+= $(SRCS_DIR)ft_memcmp.c
SRCS 				+= $(SRCS_DIR)ft_memcpy.c
SRCS 				+= $(SRCS_DIR)ft_memdel.c
SRCS 				+= $(SRCS_DIR)ft_memmove.c
SRCS 				+= $(SRCS_DIR)ft_memset.c
SRCS 				+= $(SRCS_DIR)ft_putchar.c
SRCS 				+= $(SRCS_DIR)ft_putchar_fd.c
SRCS 				+= $(SRCS_DIR)ft_putendl.c
SRCS 				+= $(SRCS_DIR)ft_putendl_fd.c
SRCS 				+= $(SRCS_DIR)ft_putnbr.c
SRCS 				+= $(SRCS_DIR)ft_putnbr_fd.c
SRCS 				+= $(SRCS_DIR)ft_putstr.c
SRCS 				+= $(SRCS_DIR)ft_putstr_fd.c
SRCS 				+= $(SRCS_DIR)ft_readline.c
SRCS 				+= $(SRCS_DIR)ft_strcat.c
SRCS 				+= $(SRCS_DIR)ft_strchr.c
SRCS 				+= $(SRCS_DIR)ft_strclr.c
SRCS 				+= $(SRCS_DIR)ft_strcmp.c
SRCS 				+= $(SRCS_DIR)ft_strcpy.c
SRCS 				+= $(SRCS_DIR)ft_strdel.c
SRCS 				+= $(SRCS_DIR)ft_strdup.c
SRCS 				+= $(SRCS_DIR)ft_strequ.c
SRCS 				+= $(SRCS_DIR)ft_striter.c
SRCS 				+= $(SRCS_DIR)ft_striteri.c
SRCS 				+= $(SRCS_DIR)ft_strjoin.c
SRCS 				+= $(SRCS_DIR)ft_strlcat.c
SRCS 				+= $(SRCS_DIR)ft_strlen.c
SRCS 				+= $(SRCS_DIR)ft_strmap.c
SRCS 				+= $(SRCS_DIR)ft_strmapi.c
SRCS 				+= $(SRCS_DIR)ft_strncat.c
SRCS 				+= $(SRCS_DIR)ft_strncmp.c
SRCS 				+= $(SRCS_DIR)ft_strncpy.c
SRCS 				+= $(SRCS_DIR)ft_strnequ.c
SRCS 				+= $(SRCS_DIR)ft_strnew.c
SRCS 				+= $(SRCS_DIR)ft_strnstr.c
SRCS 				+= $(SRCS_DIR)ft_strrchr.c
SRCS 				+= $(SRCS_DIR)ft_strsplit.c
SRCS 				+= $(SRCS_DIR)ft_strstr.c
SRCS 				+= $(SRCS_DIR)ft_strsub.c
SRCS 				+= $(SRCS_DIR)ft_strtrim.c
SRCS 				+= $(SRCS_DIR)ft_tablen.c
SRCS 				+= $(SRCS_DIR)ft_tolower.c
SRCS 				+= $(SRCS_DIR)ft_toupper.c

OBJS_DIR			 = objs/
OBJS				 = $(patsubst $(SRCS_DIR)%, $(OBJS_DIR)%, $(SRCS:.c=.o))

NAME 				 = libft.a
LINK 				 = libft.o

COLUMNS 			?= $(shell tput cols)
NUMBER				 = $(words $(SRCS))

PRINT_INLINE	 		 = @echo -n
PRINT	 			 = @echo

COLOR_DEFAULT	 		 = \033[0m
COLOR_BG		 	 = \033[42m
COLOR_GREEN		 	 = \033[32m
COLOR_RED		 	 = \033[31m

PROGRESS_CHAR	 		 = "$(COLOR_BG)$(shell python -c "print '\x20' * ($(COLUMNS) / $(NUMBER))")$(COLOR_DEFAULT)"

DONE_FILES		 	 = $(SRCS)
DONE_FILES			:= "$(patsubst $(SRCS_DIR)%, $(COLOR_GREEN)✓$(COLOR_DEFAULT) $(SRCS_DIR)%\n,$(DONE_FILES))"
DONE_STRING		 	 = "$(COLOR_GREEN)✓$(COLOR_DEFAULT) Compilation $(COLOR_GREEN)success$(COLOR_DEFAULT)\n"

CLEAN_FILES		 	 = $(OBJS)
CLEAN_FILES			:= "$(patsubst $(OBJS_DIR)%, $(COLOR_RED)❌$(COLOR_DEFAULT) $(OBJS_DIR)%\n,$(CLEAN_FILES))"
CLEAN_STRING	 		 = "$(COLOR_GREEN)✓$(COLOR_DEFAULT) Cleaning $(COLOR_GREEN)success$(COLOR_DEFAULT)\n"

FCLEAN_FILES			:= "$(COLOR_RED)❌$(COLOR_DEFAULT) $(NAME)\n"
FCLEAN_STRING	 		 = "$(COLOR_GREEN)✓$(COLOR_DEFAULT) Deep cleaning $(COLOR_GREEN)success$(COLOR_DEFAULT)\n"

all: $(NAME)

$(LINK): $(OBJS)
	ld -r -o $@ $^

$(NAME): $(OBJS)
	@ar rc $@ $^
	@ar -s $@
	$(PRINT) "\n"
	$(PRINT) $(DONE_STRING) $(DONE_FILES)

clean:
	@/bin/rm -rf $(OBJS_DIR)
	$(PRINT) $(CLEAN_STRING) $(CLEAN_FILES)

fclean: clean
	@/bin/rm -f $(NAME)
	@/bin/rm -f $(LINK)
	$(PRINT) $(FCLEAN_STRING) $(FCLEAN_FILES)

re: fclean all

optimize: $(LINK)
	ar rc $(NAME) $^
	ar -s $(NAME)

$(OBJS_DIR)%.o: $(SRCS_DIR)%.c
	@mkdir -p objs
	@printf $(PROGRESS_CHAR)
	@$(CC) $(CFLAGS) $(IFLAGS) -c $< -o $@

.PHONY: all clean fclean re optimize
