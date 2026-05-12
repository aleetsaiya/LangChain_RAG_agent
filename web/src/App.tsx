import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import { AssistantResponse } from './components/AssistantResponse'
import { ChatComposer } from './components/ChatComposer'
import { ErrorMessage } from './components/ErrorMessage'
import { LoadingCard } from './components/LoadingCard'
import { sendChatQuestion } from './services/chatApi'
import type { ChatResponse } from './types/chat'

function App() {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState<ChatResponse | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  const hasResult = Boolean(response || error || isPending)
  const canSubmit = question.trim().length > 0 && !isPending

  const statusText = useMemo(() => {
    if (isPending) {
      return 'Thinking with company context...'
    }

    if (response) {
      return 'Answer grounded in WorkNest context'
    }

    return 'Ask about products, policies, support, or public metrics'
  }, [isPending, response])

  const sendQuestion = async (nextQuestion: string) => {
    const trimmedQuestion = nextQuestion.trim()

    if (!trimmedQuestion || isPending) {
      return
    }

    setQuestion(trimmedQuestion)
    setResponse(null)
    setError('')
    setIsPending(true)

    try {
      const chatResponse = await sendChatQuestion(trimmedQuestion)
      setResponse(chatResponse)
    } catch (apiError) {
      setError(
        apiError instanceof Error
          ? apiError.message
          : 'Unable to reach the RAG API.',
      )
    } finally {
      setIsPending(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendQuestion(question)
  }

  return (
    <main className="min-h-svh bg-[linear-gradient(135deg,rgba(36,104,133,0.10),transparent_42%),linear-gradient(315deg,rgba(80,137,108,0.10),transparent_38%),#f7f8fb] px-4 py-6 text-slate-900 sm:px-8">
      <div
        className={`mx-auto grid w-full max-w-3xl gap-5 transition-all duration-500 ease-out ${
          hasResult ? 'pt-3 sm:pt-8' : 'min-h-[calc(100svh-3rem)] content-center'
        }`}
      >
        <ChatComposer
          question={question}
          statusText={statusText}
          isPending={isPending}
          canSubmit={canSubmit}
          onQuestionChange={setQuestion}
          onSubmit={handleSubmit}
          onSuggestedQuestionClick={(suggestedQuestion) =>
            void sendQuestion(suggestedQuestion)
          }
        />

        {hasResult && (
          <section
            className="grid gap-4 transition-all duration-500"
            aria-live="polite"
          >
            {isPending && <LoadingCard />}
            {error && <ErrorMessage message={error} />}
            {response && <AssistantResponse response={response} />}
          </section>
        )}
      </div>
    </main>
  )
}

export default App
