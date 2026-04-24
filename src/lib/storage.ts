import type { StorageSchema } from "./types"

const STORAGE_KEY = "shortcut-vault-v1"

const EMPTY_SCHEMA: StorageSchema = {
  version: "1",
  shortcuts: [],
}

/**
 * Returns true if localStorage contains data in an unreadable/old format.
 * Triggers the StorageMigrationWall gate.
 */
export function isMigrationRequired(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return false
    const parsed = JSON.parse(raw) as unknown
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      (parsed as Record<string, unknown>).version !== "1"
    ) {
      return true
    }
    return false
  } catch {
    return false
  }
}

export function readStorage(): StorageSchema {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return { ...EMPTY_SCHEMA, shortcuts: [] }
    const parsed = JSON.parse(raw) as StorageSchema
    if (parsed.version !== "1") {
      return { ...EMPTY_SCHEMA, shortcuts: [] }
    }
    return parsed
  } catch {
    throw new Error("Failed to read from localStorage")
  }
}

export function writeStorage(schema: StorageSchema): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schema))
  } catch {
    throw new Error("Failed to write to localStorage")
  }
}
