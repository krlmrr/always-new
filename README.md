# Always New

Ensures VS Code always has an editor buffer open.

## Why?

When using [vscode-neovim](https://github.com/vscode-neovim/vscode-neovim), Neovim only activates when there's an editor buffer. No buffer means no vim motions, no leader keys, no `/` search - nothing.

VS Code loves showing welcome pages and empty states. This extension fights back.

## What it does

- When all editor tabs are closed, it automatically opens a new untitled file
- Provides a `alwaysNew.closeEditor` command that creates a new buffer before closing the last tab (prevents race conditions when spamming close)

## Recommended keybinding

```json
{
    "key": "cmd+w",
    "command": "alwaysNew.closeEditor",
    "when": "editorFocus"
}
```

## Installation

```bash
# Build and install
npm run compile
npx @vscode/vsce package --no-dependencies
code --install-extension always-new-*.vsix
```

Reload VS Code.

---

*Always new. Always new. Always new.*
