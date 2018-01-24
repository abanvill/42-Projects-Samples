# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: abanvill <abanvill@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2015/01/28 19:26:04 by abanvill          #+#    #+#              #
#    Updated: 2018/01/24 20:59:52 by abanvill         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

CC				 = nasm

CFLAGS			 	 = -f macho64
IFLAGS				 = $(INCLUDES_LIBS) $(INCLUDES_SRCS)

INCLUDES_SRCS	 		 = -I includes
INCLUDES_LIBS			 = $(addprefix -I , $(LIBS_LST))

SRCS_DIR			 = srcs/
SRCS 				+= $(SRCS_DIR)ft_abs.s
SRCS 				+= $(SRCS_DIR)ft_bzero.s
SRCS				+= $(SRCS_DIR)ft_cat.s
SRCS 				+= $(SRCS_DIR)ft_isalnum.s
SRCS 				+= $(SRCS_DIR)ft_isalpha.s
SRCS 				+= $(SRCS_DIR)ft_isascii.s
SRCS 				+= $(SRCS_DIR)ft_isdigit.s
SRCS 				+= $(SRCS_DIR)ft_islower.s
SRCS 				+= $(SRCS_DIR)ft_isprint.s
SRCS 				+= $(SRCS_DIR)ft_isupper.s
SRCS 				+= $(SRCS_DIR)ft_memalloc.s
SRCS 				+= $(SRCS_DIR)ft_memcpy.s
SRCS 				+= $(SRCS_DIR)ft_memdel.s
SRCS 				+= $(SRCS_DIR)ft_memset.s
SRCS 				+= $(SRCS_DIR)ft_putendl.s
SRCS 				+= $(SRCS_DIR)ft_puts.s
SRCS 				+= $(SRCS_DIR)ft_putstr.s
SRCS 				+= $(SRCS_DIR)ft_strcat.s
SRCS 				+= $(SRCS_DIR)ft_strdup.s
SRCS 				+= $(SRCS_DIR)ft_strcmp.s
SRCS 				+= $(SRCS_DIR)ft_strdel.s
SRCS 				+= $(SRCS_DIR)ft_strdup.s
SRCS 				+= $(SRCS_DIR)ft_strlen.s
SRCS 				+= $(SRCS_DIR)ft_strncat.s
SRCS 				+= $(SRCS_DIR)ft_tolower.s
SRCS 				+= $(SRCS_DIR)ft_toupper.s

OBJS_DIR			 = objs/
OBJS				 = $(patsubst $(SRCS_DIR)%, $(OBJS_DIR)%, $(SRCS:.s=.o))

NAME 				 = libfts.a
LINK 				 = libfts.o

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

$(OBJS_DIR)%.o: $(SRCS_DIR)%.s
	@mkdir -p objs
	@printf $(PROGRESS_CHAR)
	@$(CC) $(CFLAGS) $(IFLAGS) $< -o $@

.PHONY: all clean fclean re optimize
