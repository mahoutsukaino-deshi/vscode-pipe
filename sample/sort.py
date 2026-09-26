import sys

lines = sys.stdin.readlines()

for line in sorted(lines):
    line = line.rstrip()
    print(line)
