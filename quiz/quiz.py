"""
Train cards from Quizlett

print with 'small' layout and save as a .txt
"""
import random

def learn(file_path: str):
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
    random.shuffle(cards)

    for idx, (verb_first, verb_form) in enumerate(cards):
        first_word, _, the_rest_of_form = verb_form.partition(' ')

        print(f'{idx + 1}/{len(cards)} {verb_first}\n{first_word}', end=' ')
        attempt = input()

        first_attempt = True
        while attempt != the_rest_of_form:
            if first_attempt:
                cards.append((verb_first, verb_form))
                first_attempt = False

            print(verb_form)
            print(f'{idx + 1}/{len(cards)} {first_word}', end=' ')
            attempt = input()

        print('rightig', end='\n'*2)

if __name__ == '__main__':
    import sys
    path_to_file = sys.argv[1]
    learn(path_to_file)
