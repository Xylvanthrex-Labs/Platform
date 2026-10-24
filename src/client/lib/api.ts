export class ApiError extends Error {
  status: number
  errors?: Record<string, string>

  constructor(message: string, status: number, errors?: Record<string, string>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(init.body ? { 'Content-Type': 'application/json' } : {}),
  }

  const response = await fetch(path, { ...init, headers })
  const data = (await response.json().catch(() => null)) as
    | { error?: string; errors?: Record<string, string> }
    | null

  if (!response.ok) {
    throw new ApiError(
      data?.error ?? 'The request failed.',
      response.status,
      data?.errors,
    )
  }

  return data as T
}

export interface WaitlistPayload {
  email: string
  venture: string
  note: string
  company_website: string
  source: string
}

export interface WaitlistResponse {
  ok: boolean
  id?: number
  message?: string
}

export function submitWaitlist(payload: WaitlistPayload): Promise<WaitlistResponse> {
  return request<WaitlistResponse>('/api/waitlist', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
