import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Check on startup
    ensureBuffer();

    // Register our smart close command
    context.subscriptions.push(
        vscode.commands.registerCommand('alwaysNew.closeEditor', async () => {
            const tabs = vscode.window.tabGroups.all.flatMap(g => g.tabs);

            if (tabs.length <= 1) {
                // Last tab - create new file first, then close
                await vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
            }
            await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
        })
    );

    // Fallback listener in case something else closes tabs
    context.subscriptions.push(
        vscode.window.tabGroups.onDidChangeTabs(() => {
            ensureBuffer();
        })
    );

    // Close empty untitled buffers when a real file is opened
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (editor && !editor.document.isUntitled) {
                closeEmptyUntitled();
            }
        })
    );
}

async function closeEmptyUntitled() {
    const tabs = vscode.window.tabGroups.all.flatMap(g => g.tabs);
    for (const tab of tabs) {
        if (tab.input instanceof vscode.TabInputText) {
            const uri = tab.input.uri;
            if (uri.scheme === 'untitled') {
                const doc = vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString());
                if (doc && doc.getText() === '') {
                    await vscode.window.tabGroups.close(tab);
                }
            }
        }
    }
}

function ensureBuffer() {
    setTimeout(() => {
        const tabs = vscode.window.tabGroups.all.flatMap(g => g.tabs);
        if (tabs.length === 0) {
            vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
        }
    }, 50);
}

export function deactivate() {}
