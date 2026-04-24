import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { readStorage, writeStorage } from "@/lib/storage"
import type { Shortcut, StorageSchema } from "@/lib/types"
import { QUERY_KEYS } from "@/lib/types"

// ---------------------------------------------------------------------------
// Query
// ---------------------------------------------------------------------------

export function useShortcuts() {
  return useQuery({
    queryKey: QUERY_KEYS.shortcuts,
    queryFn: () => readStorage().shortcuts,
  })
}

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------

export function useCreateShortcut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (shortcut: Shortcut) => {
      const schema = readStorage()
      writeStorage({ ...schema, shortcuts: [...schema.shortcuts, shortcut] })
      return shortcut
    },
    onMutate: async (shortcut) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.shortcuts })
      const previous = queryClient.getQueryData<Shortcut[]>(QUERY_KEYS.shortcuts)
      queryClient.setQueryData<Shortcut[]>(QUERY_KEYS.shortcuts, (old = []) => [
        ...old,
        shortcut,
      ])
      return { previous }
    },
    onError: (_err, _shortcut, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(QUERY_KEYS.shortcuts, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shortcuts })
    },
  })
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

export function useUpdateShortcut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (shortcut: Shortcut) => {
      const schema = readStorage()
      writeStorage({
        ...schema,
        shortcuts: schema.shortcuts.map((s) =>
          s.id === shortcut.id ? shortcut : s
        ),
      })
      return shortcut
    },
    onMutate: async (shortcut) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.shortcuts })
      const previous = queryClient.getQueryData<Shortcut[]>(QUERY_KEYS.shortcuts)
      queryClient.setQueryData<Shortcut[]>(QUERY_KEYS.shortcuts, (old = []) =>
        old.map((s) => (s.id === shortcut.id ? shortcut : s))
      )
      return { previous }
    },
    onError: (_err, _shortcut, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(QUERY_KEYS.shortcuts, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shortcuts })
    },
  })
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export function useDeleteShortcut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const schema = readStorage()
      const deleted = schema.shortcuts.find((s) => s.id === id)
      writeStorage({
        ...schema,
        shortcuts: schema.shortcuts.filter((s) => s.id !== id),
      })
      return deleted
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.shortcuts })
      const previous = queryClient.getQueryData<Shortcut[]>(QUERY_KEYS.shortcuts)
      const deleted = previous?.find((s) => s.id === id)
      queryClient.setQueryData<Shortcut[]>(QUERY_KEYS.shortcuts, (old = []) =>
        old.filter((s) => s.id !== id)
      )
      return { previous, deleted }
    },
    onError: (_err, _id, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(QUERY_KEYS.shortcuts, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shortcuts })
    },
  })
}

// ---------------------------------------------------------------------------
// Undo delete (re-insert from onMutate snapshot)
// ---------------------------------------------------------------------------

export function useReInsertShortcut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (shortcut: Shortcut) => {
      const schema = readStorage()
      // Insert back in chronological order by createdAt
      const shortcuts = [...schema.shortcuts, shortcut].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      writeStorage({ ...schema, shortcuts } as StorageSchema)
      return shortcut
    },
    onMutate: async (shortcut) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.shortcuts })
      const previous = queryClient.getQueryData<Shortcut[]>(QUERY_KEYS.shortcuts)
      queryClient.setQueryData<Shortcut[]>(QUERY_KEYS.shortcuts, (old = []) =>
        [...old, shortcut].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      )
      return { previous }
    },
    onError: (_err, _shortcut, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(QUERY_KEYS.shortcuts, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shortcuts })
    },
  })
}

// ---------------------------------------------------------------------------
// Update lastUsedAt
// ---------------------------------------------------------------------------

export function useUpdateLastUsed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const schema = readStorage()
      const now = new Date().toISOString()
      writeStorage({
        ...schema,
        shortcuts: schema.shortcuts.map((s) =>
          s.id === id ? { ...s, lastUsedAt: now } : s
        ),
      })
      return id
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.shortcuts })
      const previous = queryClient.getQueryData<Shortcut[]>(QUERY_KEYS.shortcuts)
      const now = new Date().toISOString()
      queryClient.setQueryData<Shortcut[]>(QUERY_KEYS.shortcuts, (old = []) =>
        old.map((s) => (s.id === id ? { ...s, lastUsedAt: now } : s))
      )
      return { previous }
    },
    onError: (_err, _id, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(QUERY_KEYS.shortcuts, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.shortcuts })
    },
  })
}
