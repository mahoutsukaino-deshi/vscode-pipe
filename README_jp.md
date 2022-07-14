# VSCode Pipe README

VSCode Pipe は、Visual Studio Code でパイプライン処理を実現します。エディタ上で選択した部分を標準入力としてコマンドを実行し、実行結果の標準出力で置き換えます。標準エラー出力に出力された内容は情報メッセージとして表示します。
コマンドを入力することで好きなコマンドを実行することができます。毎回同じコマンドを入力するのは面倒なので、あらかじめコマンドを登録しておきメニューから選択することもできます。もちろん、Python や Ruby など自分の好きな言語で作成したプログラムを実行することも可能です。

## 機能

下記キャプチャではこんなことを実行しています。

1. メニューに登録されている ls コマンドを実行。
2. ls コマンドの結果を wc コマンドを使って行数カウント。
3. アンドゥで元に戻した後、grep コマンドで Map を含む行だけを抽出。

![](screen.gif)

## 拡張機能の設定

setting.json に下記の設定を追加できます。

![](settings.json.png)

- 最大バッファサイズ
- メニュー

  label にコマンドの名前を指定します。description に実行するコマンドを記述します。

  ```json
  "vscodePipe.menus": [
    {
      "label": "Upper Case",
      "description": "tr '[:lower:]' '[:upper:]' "
    },
    {
      "label": "ls",
      "description": "ls -l"
    },
    {
      "label": "hostname",
      "description": "hostname"
    }
  ]
  ```

## リリースノート

### 1.0.0

初回リリース。
