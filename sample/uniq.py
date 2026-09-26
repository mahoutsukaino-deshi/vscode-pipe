import sys

lines = sys.stdin.readlines()

for line in list(dict.fromkeys(lines)):
    line = line.rstrip()
    print(line)
