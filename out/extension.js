"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
function activate(context) {
    // Check on startup
    ensureBuffer();
    // Register our smart close command
    context.subscriptions.push(vscode.commands.registerCommand('alwaysNew.closeEditor', async () => {
        const tabs = vscode.window.tabGroups.all.flatMap(g => g.tabs);
        if (tabs.length <= 1) {
            // Last tab - create new file first, then close
            await vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
        }
        await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
    }));
    // Fallback listener in case something else closes tabs
    context.subscriptions.push(vscode.window.tabGroups.onDidChangeTabs(() => {
        ensureBuffer();
    }));
}
function ensureBuffer() {
    setTimeout(() => {
        const tabs = vscode.window.tabGroups.all.flatMap(g => g.tabs);
        if (tabs.length === 0) {
            vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
        }
    }, 50);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map