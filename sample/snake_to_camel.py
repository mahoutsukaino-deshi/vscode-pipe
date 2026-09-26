import sys


def snake_to_camel(s):
    if len(s) == 0:
        return s
    e = s.split("_")
    if len(e) == 0:
        return s
    if "" in e:
        e.remove("")
    e = [x[0].upper() + x[1:] for x in e]
    s = "".join(e)
    s = s[0].lower() + s[1:]
    return s


lines = sys.stdin.readlines()

for line in lines:
    print(snake_to_camel(line.rstrip()))
