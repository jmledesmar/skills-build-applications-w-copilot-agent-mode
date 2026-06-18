export const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiEndpoint(path: string) {
  const clean = String(path).replace(/^\/+|\/+$/g, '')
  return `${apiHost}/api/${clean}/`
}

export function normalizeArrayResponse<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const objectPayload = payload as Record<string, unknown>

  if (Array.isArray(objectPayload.items)) {
    return objectPayload.items as T[]
  }

  if (Array.isArray(objectPayload.data)) {
    return objectPayload.data as T[]
  }

  const arrayValues = Object.values(objectPayload).filter(Array.isArray)
  if (arrayValues.length === 1) {
    return arrayValues[0] as T[]
  }

  return []
}
