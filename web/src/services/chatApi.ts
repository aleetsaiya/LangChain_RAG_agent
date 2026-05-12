import type { ChatResponse } from '../types/chat'

export const sendChatQuestion = async (
  question: string,
): Promise<ChatResponse> => {
  const apiResponse = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })
  const payload = await apiResponse.json()

  if (!apiResponse.ok) {
    throw new Error(payload.message ?? `API returned ${apiResponse.status}`)
  }

  return payload as ChatResponse
}
