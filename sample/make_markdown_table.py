import io
import sys

import pandas as pd

mode = sys.argv[1] if len(sys.argv) == 2 else "csv"

input = sys.stdin.read()
if mode == "csv":
    df = pd.read_csv(io.StringIO(input))
elif mode == "tsv":
    df = pd.read_csv(io.StringIO(input), sep="\t")
else:
    print(f"サポートされていない形式です({mode})")
    sys.exit(0)

df.fillna("", inplace=True)
output = df.to_markdown(index=False)
print(output)
