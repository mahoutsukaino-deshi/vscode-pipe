import * as vscode from "vscode";
import { exec } from "child_process";

type Menu = {
  label: string;
  description: string;
};

const INPUT_COMMAND_LABEL = "Run Command:";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "vscodePipe.convert",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const document = editor.document;
      const selection = editor.selection;
      const text = document.getText(selection);

      const config = vscode.workspace.getConfiguration("vscodePipe");
      const menus = config.get<Menu[]>("menus");
      if (!menus) {
        vscode.window.showWarningMessage(
          "Menu is not defined. Please define in settings.json."
        );
        return;
      }
      console.log("menus=" + menus?.toString());

      const maxBuffer = config.get<number>("maxBuffer");
      console.log("maxBuffer=" + maxBuffer);

      let items: vscode.QuickPickItem[] = [];
      for (let menu of menus) {
        items.push({ label: menu.label, description: menu.description });
      }
      items.push({ label: "", kind: vscode.QuickPickItemKind.Separator });
      items.push({ label: INPUT_COMMAND_LABEL });

      function execAsync(
        command: string,
        input: string
      ): Promise<[string, string]> {
        return new Promise((resolve, reject) => {
          const process = exec(
            command,
            { maxBuffer: maxBuffer },
            (error, stdout, stderr) => {
              if (error) {
                reject(error);
              } else {
                resolve([stdout, stderr]);
              }
            }
          );
          process.stdin?.write(input);
          process.stdin?.end();
        });
      }

      async function getCommand(items: vscode.QuickPickItem[]) {
        let selectedMenu = await vscode.window.showQuickPick(items);
        if (!selectedMenu) {
          return;
        }

        let command: string | undefined;
        if (selectedMenu.label === INPUT_COMMAND_LABEL) {
          command = await vscode.window.showInputBox();
        } else {
          command = selectedMenu.description;
        }
        console.log("command=" + command);
        if (!command) {
          return;
        }

        return command;
      }

      getCommand(items)
        .then((command) => {
          if (command) {
            return execAsync(command, text);
          }
        })
        .then((output) => {
          editor.edit((editBuilder) => {
            if (output) {
              if (output[0]) {
                editBuilder.replace(selection, output[0]);
              }
              if (output[1]) {
                vscode.window.showInformationMessage(output[1]);
              }
            }
          });
        })
        .catch((error) => {
          vscode.window.showErrorMessage(error.message);
        });
    }
  );

  context.subscriptions.push(disposable);
}
