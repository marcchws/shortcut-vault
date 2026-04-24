import { readStorage, writeStorage } from "./storage"
import type { Shortcut, Tag } from "./types"

// Tags
const T_VSCODE:   Tag = { label: "VS Code",   color: "oklch(0.55 0.18 255)" }
const T_BROWSER:  Tag = { label: "Browser",   color: "oklch(0.52 0.16 145)" }
const T_TERMINAL: Tag = { label: "Terminal",  color: "oklch(0.48 0.14 30)"  }
const T_MACOS:    Tag = { label: "macOS",     color: "oklch(0.50 0.13 310)" }
const T_NAV:      Tag = { label: "Navigate",  color: "oklch(0.52 0.17 200)" }
const T_EDIT:     Tag = { label: "Edit",      color: "oklch(0.56 0.18 55)"  }
const T_WINDOW:   Tag = { label: "Window",    color: "oklch(0.50 0.16 340)" }
const T_DEBUG:    Tag = { label: "Debug",     color: "oklch(0.48 0.15 15)"  }
const T_GIT:      Tag = { label: "Git",       color: "oklch(0.46 0.12 25)"  }
const T_SEARCH:   Tag = { label: "Search",    color: "oklch(0.54 0.16 270)" }

function s(
  id: string,
  name: string,
  key: string,
  description: string,
  tags: Tag[],
  createdAt: string,
  lastUsedAt: string | null = null,
): Shortcut {
  return { id, name, key, description, tags, createdAt, lastUsedAt }
}

const SEED_SHORTCUTS: Shortcut[] = [
  // VS Code — editing
  s("1",  "Duplicate line down",        "Alt+Shift+ArrowDown", "Duplicates the current line or selection below. Faster than copy-paste for repeating patterns.", [T_VSCODE, T_EDIT], "2024-11-01T09:00:00Z", "2025-04-20T14:30:00Z"),
  s("2",  "Move line up",               "Alt+ArrowUp",         "Moves the current line (or selection) up without clipboard. Pairs with Alt+ArrowDown.", [T_VSCODE, T_EDIT], "2024-11-02T09:00:00Z", "2025-04-19T11:00:00Z"),
  s("3",  "Rename symbol",              "F2",                  "Renames a variable/function across all references in the project. Smarter than find-replace.", [T_VSCODE, T_EDIT], "2024-11-03T09:00:00Z", "2025-04-18T16:00:00Z"),
  s("4",  "Multi-cursor on selection",  "Meta+Shift+L",        "Places a cursor at every occurrence of the selected text simultaneously. Batch editing power.", [T_VSCODE, T_EDIT], "2024-11-04T09:00:00Z", "2025-04-17T10:00:00Z"),
  s("5",  "Format document",            "Shift+Alt+F",         "Runs the active formatter (Prettier, ESLint, etc.) on the whole file.", [T_VSCODE, T_EDIT], "2024-11-05T09:00:00Z", "2025-04-16T09:00:00Z"),
  s("6",  "Toggle line comment",        "Meta+Slash",          "Comments or uncomments the current line. Works with any language's comment syntax.", [T_VSCODE, T_EDIT], "2024-11-06T09:00:00Z", "2025-04-15T15:00:00Z"),
  s("7",  "Expand selection",           "Meta+Shift+ArrowRight","Expands the selection to the next semantic boundary (word → string → line → block).", [T_VSCODE, T_EDIT], "2024-11-07T09:00:00Z", null),

  // VS Code — navigation
  s("8",  "Go to definition",           "F12",                 "Jumps to where a symbol is defined. Essential for exploring unfamiliar codebases.", [T_VSCODE, T_NAV], "2024-11-08T09:00:00Z", "2025-04-22T08:00:00Z"),
  s("9",  "Go back",                    "Ctrl+Alt+Minus",      "Returns to the previous cursor location. Like browser Back but for editor history.", [T_VSCODE, T_NAV], "2024-11-09T09:00:00Z", "2025-04-21T17:00:00Z"),
  s("10", "Quick open file",            "Meta+P",              "Fuzzy-search and open any file in the workspace instantly.", [T_VSCODE, T_NAV], "2024-11-10T09:00:00Z", "2025-04-23T09:00:00Z"),
  s("11", "Go to symbol in file",       "Meta+Shift+O",        "Lists all functions, classes, and variables in the current file. Jump directly to any.", [T_VSCODE, T_NAV], "2024-11-11T09:00:00Z", "2025-04-22T11:00:00Z"),
  s("12", "Toggle sidebar",             "Meta+B",              "Shows or hides the file explorer sidebar. Reclaim horizontal space when not browsing files.", [T_VSCODE], "2024-11-12T09:00:00Z", "2025-04-20T10:00:00Z"),
  s("13", "Command palette",            "Meta+Shift+P",        "Opens VS Code's command palette. Access any command without leaving the keyboard.", [T_VSCODE, T_NAV], "2024-11-13T09:00:00Z", "2025-04-23T08:30:00Z"),

  // VS Code — debug
  s("14", "Toggle breakpoint",          "F9",                  "Adds or removes a breakpoint on the current line. Faster than clicking the gutter.", [T_VSCODE, T_DEBUG], "2024-12-01T09:00:00Z", "2025-04-10T14:00:00Z"),
  s("15", "Step over",                  "F10",                 "Executes the next line without entering function calls during a debug session.", [T_VSCODE, T_DEBUG], "2024-12-02T09:00:00Z", "2025-04-10T14:05:00Z"),
  s("16", "Step into",                  "F11",                 "Steps into the function call on the current line during debugging.", [T_VSCODE, T_DEBUG], "2024-12-03T09:00:00Z", "2025-04-10T14:10:00Z"),

  // Browser
  s("17", "Focus address bar",          "Meta+L",              "Jumps focus to the URL bar. Faster than reaching for the mouse to navigate.", [T_BROWSER, T_NAV], "2025-01-05T09:00:00Z", "2025-04-23T10:00:00Z"),
  s("18", "Reopen closed tab",          "Meta+Shift+T",        "Reopens the most recently closed browser tab. Lifesaver after an accidental close.", [T_BROWSER], "2025-01-06T09:00:00Z", "2025-04-22T16:00:00Z"),
  s("19", "Hard reload (no cache)",     "Meta+Shift+R",        "Forces a full page reload, bypassing the cache. Essential for frontend debugging.", [T_BROWSER, T_DEBUG], "2025-01-07T09:00:00Z", "2025-04-21T12:00:00Z"),
  s("20", "Open DevTools",             "Meta+Alt+I",           "Opens Chrome/Firefox DevTools on the last used panel.", [T_BROWSER, T_DEBUG], "2025-01-08T09:00:00Z", "2025-04-20T13:00:00Z"),
  s("21", "Focus next tab",            "Ctrl+Tab",             "Cycles to the next open browser tab. Faster than clicking for keyboard-first navigation.", [T_BROWSER, T_NAV], "2025-01-09T09:00:00Z", "2025-04-19T09:00:00Z"),

  // Terminal
  s("22", "Clear terminal",            "Meta+K",               "Clears the terminal screen. Equivalent to `clear` but instant.", [T_TERMINAL], "2025-01-15T09:00:00Z", "2025-04-23T09:30:00Z"),
  s("23", "Interrupt process",         "Ctrl+C",               "Sends SIGINT to the running process. Stops servers, build watchers, and runaway scripts.", [T_TERMINAL], "2025-01-16T09:00:00Z", "2025-04-22T18:00:00Z"),
  s("24", "Previous command",          "ArrowUp",              "Navigates to the previous command in shell history. Hold to scroll further back.", [T_TERMINAL, T_NAV], "2025-01-17T09:00:00Z", "2025-04-23T09:45:00Z"),
  s("25", "Reverse history search",    "Ctrl+R",               "Interactive fuzzy search through shell history (bash/zsh). Type a fragment to find old commands.", [T_TERMINAL, T_SEARCH], "2025-01-18T09:00:00Z", "2025-04-21T10:00:00Z"),
  s("26", "Jump to beginning of line", "Ctrl+A",               "Moves the cursor to the start of the current command line. Faster than Home on some keyboards.", [T_TERMINAL, T_EDIT], "2025-01-19T09:00:00Z", null),

  // macOS
  s("27", "Spotlight search",          "Meta+Space",           "Opens macOS Spotlight. Launch apps, search files, convert units, do math.", [T_MACOS, T_SEARCH], "2025-02-01T09:00:00Z", "2025-04-23T08:00:00Z"),
  s("28", "Screenshot selection",      "Meta+Shift+4",         "Drag to select a region and save a screenshot to the Desktop.", [T_MACOS], "2025-02-02T09:00:00Z", "2025-04-18T15:00:00Z"),
  s("29", "Lock screen",               "Ctrl+Meta+Q",          "Immediately locks the screen. Useful when stepping away from the machine.", [T_MACOS], "2025-02-03T09:00:00Z", "2025-04-20T17:30:00Z"),
  s("30", "Force quit app",            "Meta+Alt+Escape",      "Opens the Force Quit dialog. Use when an app is frozen and Cmd+Q doesn't respond.", [T_MACOS], "2025-02-04T09:00:00Z", "2025-04-12T11:00:00Z"),

  // Window management
  s("31", "Mission Control",           "Ctrl+ArrowUp",         "Shows all open windows and spaces. Get an overview without losing context.", [T_MACOS, T_WINDOW], "2025-02-10T09:00:00Z", "2025-04-19T14:00:00Z"),
  s("32", "Switch app",                "Meta+Tab",             "Opens the app switcher. Hold Meta and press Tab to cycle; release to switch.", [T_MACOS, T_WINDOW], "2025-02-11T09:00:00Z", "2025-04-23T07:55:00Z"),
  s("33", "Switch window (same app)",  "Meta+Backtick",        "Cycles between windows of the same application. Essential with multiple editor windows.", [T_MACOS, T_WINDOW], "2025-02-12T09:00:00Z", "2025-04-22T13:00:00Z"),

  // Search
  s("34", "Find in files (VS Code)",   "Meta+Shift+F",         "Opens the global search panel in VS Code. Searches across all files in the workspace.", [T_VSCODE, T_SEARCH], "2025-03-01T09:00:00Z", "2025-04-23T09:00:00Z"),
  s("35", "Find next occurrence",      "Meta+G",               "Jumps to the next match after a find operation (Cmd+F). Faster than clicking the arrow.", [T_VSCODE, T_SEARCH], "2025-03-02T09:00:00Z", "2025-04-21T16:00:00Z"),

  // Git (VS Code source control)
  s("36", "Open source control panel", "Ctrl+Shift+G",         "Shows the Git source control panel in VS Code. Review staged changes and write commits.", [T_VSCODE, T_GIT], "2025-03-10T09:00:00Z", "2025-04-22T09:00:00Z"),
]

export function seedIfEmpty(): void {
  const storage = readStorage()
  if (storage.shortcuts.length > 0) return
  writeStorage({ version: "1", shortcuts: SEED_SHORTCUTS })
}
