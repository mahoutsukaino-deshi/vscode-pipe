import sys

lines = sys.stdin.readlines()

for line in lines:
    line = line.rstrip()
    if len(line) > 0:
        print(line)
