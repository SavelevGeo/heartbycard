"""
Train cards from Quizlett

print with 'small' layout and save as a .txt
"""

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

    for verb_first, verb_form in verbs_dict.items():
        print(verb_first)
        attempt = input()

        while attempt != verb_form:
            print(verb_form)
            attempt = input()

        print('rightig')

if __name__ == '__main__':
    import sys
    path_to_file = sys.argv[1]
    learn(path_to_file)
