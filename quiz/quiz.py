"""
Train cards from Quizlett

print with 'small' layout and save as a .txt
"""
import random

def get_input(*print_args, **print_kwargs):
    try:
        print(*print_args, **print_kwargs)
        return input()
    except UnicodeDecodeError:
        return get_input(*print_args, **print_kwargs)

def chardif(s1, s2):
     for pair in list(zip(s1,s2)):
            if not pair[0] == pair[1]:
                 yield pair

def learn(
        file_path: str,
        cards_from: int = None,
        cards_to: int = None,
        mode: str = 'rnd'
    ):
    """
    iterate over a file
    """
    with open(
        file_path,
        encoding='utf-8'
    ) as verbs_file:
        verbs = verbs_file.read()

    verbs_dict = {
        verb.rpartition(' ')[2]: verb.rpartition(' ')[0]
        for verb in verbs.splitlines()
    }

    cards = list(verbs_dict.items())

    if mode == 'rnd':
        random.shuffle(cards)

    cards = cards[

        int(cards_from)
        if cards_from is not None
        else None

        :

        int(cards_to)
        if cards_to is not None
        else None
    ]
    
    if mode == 'shuf':
        random.shuffle(cards)

    for idx, (verb_first, verb_form) in enumerate(cards):
        if 'no-hint' not in mode:
            first_word, _, the_rest_of_form = verb_form.partition(' ')
        else:
            the_rest_of_form = verb_form

        print(f'{idx + 1}/{len(cards)} {verb_first}', end='\n')
        if 'no-hint' not in mode:
            attempt = get_input(first_word, end=' ')
        else:
            attempt = get_input(end='')

        first_attempt = True
        while attempt != the_rest_of_form:
            print(list(chardif(attempt, the_rest_of_form)))
            if first_attempt:
                cards.append((verb_first, verb_form))
                first_attempt = False

            print(verb_form)
            if 'no-hint' not in mode:
                attempt = get_input(first_word, end='')
            else:
                attempt = get_input(end='')

        print('rightig', end='\n'*2)

if __name__ == '__main__':
    import sys
    path_to_file = sys.argv[1]
    cards_from = None
    cards_to = None
    mode = 'rnd'

    if len(sys.argv) == 3:
        cards_to = sys.argv[2]
    elif len(sys.argv) >= 4:
        cards_from = sys.argv[2]
        cards_to = sys.argv[3]

    if len(sys.argv) == 5:
        mode = sys.argv[4]
    
    learn(path_to_file, cards_from, cards_to, mode)

