# VSCode Pipe サンプル

このディレクトリには、VSCode Pipe から実行する Python スクリプトのサンプルが含まれています。
エディタでテキストを選択し、VSCode Pipe のメニューからコマンドを実行すると、選択範囲がそのコマンドの標準入力に渡され、標準出力の内容で置き換えられます。

## インストール

### 前提

- Python 3
- VSCode Pipe がインストールされていること

`make_markdown_table.py` を使う場合は、`pandas` も必要です。

### Python コードを配置する

このディレクトリにある Python ファイルを `~/vscode-pipe/` にコピーします。

```sh
mkdir -p ~/vscode-pipe
cp *.py ~/vscode-pipe/
```

上のコマンドは `sample` ディレクトリで実行してください。リポジトリのルートから実行する場合は、次のようにします。

```sh
mkdir -p ~/vscode-pipe
cp sample/*.py ~/vscode-pipe/
```

### 依存パッケージをインストールする

`settings.json` のコマンドは `python` を使用するため、同じ `python` で `requirements.txt` をインストールします。

```sh
python -m pip install -r requirements.txt
```

リポジトリのルートから実行する場合は、次のコマンドを使用します。

```sh
python -m pip install -r sample/requirements.txt
```

環境によって `python` コマンドが `python3` の場合は、上記の `python` を `python3` に置き換えてください。また、その場合は `settings.json` 内のコマンドも `python3 ~/vscode-pipe/...` に変更してください。

### VS Code の設定に追加する

`settings.json` は VS Code の設定サンプルです。内容を VS Code のユーザー設定またはワークスペース設定の `settings.json` に追加してください。

1. コマンドパレットで `Preferences: Open User Settings (JSON)` または `Preferences: Open Workspace Settings (JSON)` を選択します。
2. `sample/settings.json` の `vscodePipe.menus` プロパティを設定に追加します。
3. 既存の設定がある場合は、ファイル全体を置き換えずにプロパティをマージします。

設定内のコマンドは、Python ファイルが次の場所にあることを前提にしています。

```text
~/vscode-pipe/
```

設定後、エディタでテキストを選択して VSCode Pipe を実行すると、サンプルコマンドを選択できます。

## サンプル一覧

| ファイル | 説明 |
| --- | --- |
| `sample.py` | 各行を `---行---` の形式で囲みます。パイプ処理を作る時のベースになります。 |
| `sort.py` | 行を辞書順に並べ替えます。 |
| `uniq.py` | 重複する行を削除します。最初に出現した順番は維持します。 |
| `basename.py` | パスごとのファイル名部分を取り出します。入力行の重複は削除します。 |
| `to_lower.py` | 各行を小文字に変換します。 |
| `to_upper.py` | 各行を大文字に変換します。 |
| `delete_empty_line.py` | 空行を削除します。 |
| `camel_to_kebab.py` | CamelCase を kebab-case に変換します。 |
| `camel_to_snake.py` | CamelCase を snake_case に変換します。 |
| `kebab_to_camel.py` | kebab-case を camelCase に変換します。 |
| `snake_to_camel.py` | snake_case を camelCase に変換します。 |
| `make_markdown_table.py` | CSV または TSV を Markdown の表に変換します。 |

## `make_markdown_table.py` の使い方

引数を指定しない場合は CSV として読み込みます。

```sh
python ~/vscode-pipe/make_markdown_table.py < input.csv
```

TSV を変換する場合は `tsv` を指定します。

```sh
python ~/vscode-pipe/make_markdown_table.py tsv < input.tsv
```

`settings.json` のメニューから実行した場合は CSV として処理されます。TSV を使う場合は、VS Code の設定に次のメニューを追加してください。

```json
{
  "label": "Make Markdown Table (TSV)",
  "description": "python ~/vscode-pipe/make_markdown_table.py tsv"
}
```
