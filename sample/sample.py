import sys

lines = sys.stdin.readlines()

for line in lines:
    line = line.rstrip()
    print(f"---{line}---")
