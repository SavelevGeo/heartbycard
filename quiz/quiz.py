"""
Train cards from Quizlett

print with 'small' layout and save as a .txt
"""

with open(
    'quizlett_deutch/trennbare Verben 1.txt',
    encoding='utf-8'
) as verbs_file:
    verbs = verbs_file.read()

verbs_dict = {
    verb.rpartition(' ')[2]: verb.rpartition(' ')[0][:-1]
    for verb in verbs.splitlines()
}

for verb_first, verb_form in verbs_dict.items():
    print(verb_first)
    attempt = input()

    while attempt != verb_form:
        print(verb_form)
        attempt = input()

    print('rightig')
