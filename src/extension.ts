import * as vscode from "vscode";
import { exec } from "child_process";

type Menu = {
  label: string;
  description: string;
};

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "vscodePipe.convert",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        const text = document.getText(selection);

        const config = vscode.workspace.getConfiguration("vscodePipe");
        const menus = config.get<Menu[]>("menus");
        if (!menus) {
          vscode.window.showWarningMessage("Menu is not defined.");
          return;
        }
        console.log("menus=" + menus?.toString());

        const maxBuffer = config.get<number>("maxBuffer");
        console.log("maxBuffer=" + maxBuffer);

        let items: vscode.QuickPickItem[] = [];
        for (let menu of menus) {
          items.push({ label: menu.label, description: menu.description });
        }

        const execAsync = (command: string, input: string): Promise<string> => {
          return new Promise((resolve, reject) => {
            const process = exec(
              command,
              { maxBuffer: maxBuffer },
              (error, stdout, stderr) => {
                if (error) {
                  reject(error);
                } else {
                  if (stderr) {
                    vscode.window.showInformationMessage(stderr);
                  }
                  if (stdout) {
                    resolve(stdout);
                  }
                }
              }
            );
            process.stdin?.write(input);
            process.stdin?.end();
          });
        };

        vscode.window.showQuickPick(items).then((selectedMenu) => {
          if (!selectedMenu) {
            return;
          }

          (async function () {
            const command = selectedMenu.description;
            console.log("command=" + command);
            if (!command) {
              return;
            }
            const result = await execAsync(command, text)
              .then((output) => {
                editor.edit((editBuilder) => {
                  editBuilder.replace(selection, output);
                });
              })
              .catch((error) => {
                vscode.window.showWarningMessage(error.message);
              });
            console.log(result);
          })();
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
