export type AppSearch = { q: string; tags: string[] }

export type Tag = {
  label: string
  /** Stored as `oklch(L C H)` string */
  color: string
}

export type Shortcut = {
  id: string
  name: string
  description: string
  /** Canonical string: `"Modifier+Modifier+Key"` e.g. `"Meta+Shift+K"` */
  key: string
  tags: Tag[]
  createdAt: string
  lastUsedAt: string | null
}

export type StorageSchema = {
  version: "1"
  shortcuts: Shortcut[]
}

export const QUERY_KEYS = {
  shortcuts: ["shortcuts"] as const,
  shortcut: (id: string) => ["shortcuts", id] as const,
} as const
