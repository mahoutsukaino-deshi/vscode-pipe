import os
import sys

lines = sys.stdin.readlines()

for line in list(dict.fromkeys(lines)):
    line = line.rstrip()
    print(os.path.basename(line))
