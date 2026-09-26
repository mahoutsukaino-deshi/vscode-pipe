import re
import sys


def camel_to_kebab(s):
    s = re.sub("([A-Z]+)", r" \1", s)
    s = re.sub("([A-Z]+)([A-Z])", r"\1 \2", s)
    s = s.lower()
    words = re.split(r"\s", s)
    s = "-".join(words)
    return s


lines = sys.stdin.readlines()

for line in lines:
    print(camel_to_kebab(line.rstrip()))
