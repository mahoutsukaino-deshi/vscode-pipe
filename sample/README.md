# VSCode Pipe Samples

This directory contains sample Python scripts that can be executed from VSCode Pipe.
Select text in the editor and run a command from the VSCode Pipe menu. The selected text is passed to the command through standard input and is replaced with the command's standard output.

## Installation

### Requirements

- Python 3
- VSCode Pipe installed in Visual Studio Code

The `make_markdown_table.py` script also requires `pandas`.

### Copy the Python scripts

Copy the Python files in this directory to `~/vscode-pipe/`.

```sh
mkdir -p ~/vscode-pipe
cp *.py ~/vscode-pipe/
```

Run the command above from the `sample` directory. From the repository root, use:

```sh
mkdir -p ~/vscode-pipe
cp sample/*.py ~/vscode-pipe/
```

### Install dependencies

The commands in `settings.json` use `python`, so install `requirements.txt` with the same Python command.

```sh
python -m pip install -r requirements.txt
```

From the repository root, use:

```sh
python -m pip install -r sample/requirements.txt
```

On systems where the command is `python3`, replace `python` with `python3` in the commands above. Also change the commands in `settings.json` to use `python3 ~/vscode-pipe/...`.

### Add the VS Code settings

`settings.json` is a sample VS Code configuration. Add its contents to the VS Code user or workspace `settings.json`.

1. Open the Command Palette and select `Preferences: Open User Settings (JSON)` or `Preferences: Open Workspace Settings (JSON)`.
2. Add the `vscodePipe.menus` property from `sample/settings.json`.
3. If the settings file already contains other settings, merge this property instead of replacing the entire file.

The commands in the sample settings expect the Python files to be located at:

```text
~/vscode-pipe/
```

After configuring the settings, select text in the editor and run VSCode Pipe to choose one of the sample commands.

## Samples

| File | Description |
| --- | --- |
| `sample.py` | Wraps each line in `---line---`. It can be used as a starting point for building a pipe-processing script. |
| `sort.py` | Sorts lines in lexicographical order. |
| `uniq.py` | Removes duplicate lines while preserving the order of their first occurrences. |
| `basename.py` | Extracts the filename part from each path and removes duplicate input lines. |
| `to_lower.py` | Converts each line to lowercase. |
| `to_upper.py` | Converts each line to uppercase. |
| `delete_empty_line.py` | Removes empty lines. |
| `camel_to_kebab.py` | Converts CamelCase to kebab-case. |
| `camel_to_snake.py` | Converts CamelCase to snake_case. |
| `kebab_to_camel.py` | Converts kebab-case to camelCase. |
| `snake_to_camel.py` | Converts snake_case to camelCase. |
| `make_markdown_table.py` | Converts CSV or TSV input to a Markdown table. |

## Using `make_markdown_table.py`

Without an argument, the script reads the input as CSV.

```sh
python ~/vscode-pipe/make_markdown_table.py < input.csv
```

To convert TSV input, pass `tsv` as the argument.

```sh
python ~/vscode-pipe/make_markdown_table.py tsv < input.tsv
```

The command in the sample `settings.json` processes input as CSV. To add a TSV command, add the following menu item to the VS Code settings:

```json
{
  "label": "Make Markdown Table (TSV)",
  "description": "python ~/vscode-pipe/make_markdown_table.py tsv"
}
```
