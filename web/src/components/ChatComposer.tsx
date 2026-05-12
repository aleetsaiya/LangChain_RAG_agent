import type { FormEvent } from 'react'
import { Bot, Send, Sparkles } from 'lucide-react'

import { suggestedQuestions } from '../constants/chat'

type ChatComposerProps = {
  question: string
  statusText: string
  isPending: boolean
  canSubmit: boolean
  onQuestionChange: (question: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onSuggestedQuestionClick: (question: string) => void
}

export function ChatComposer({
  question,
  statusText,
  isPending,
  canSubmit,
  onQuestionChange,
  onSubmit,
  onSuggestedQuestionClick,
}: ChatComposerProps) {
  return (
    <section aria-label="WorkNest assistant" className="grid gap-4">
      <div className="inline-flex w-fit items-center gap-2 text-sm font-bold uppercase text-teal-700">
        <span className="grid size-8 place-items-center rounded-lg bg-teal-700 text-white">
          <Bot size={18} aria-hidden="true" />
        </span>
        WorkNest Assistant
      </div>

      <form
        className="grid gap-2 rounded-lg border border-slate-200 bg-white/95 p-2 shadow-xl shadow-slate-900/10 sm:grid-cols-[1fr_auto]"
        onSubmit={onSubmit}
      >
        <label className="sr-only" htmlFor="question">
          Ask a question
        </label>
        <input
          id="question"
          type="text"
          value={question}
          disabled={isPending}
          placeholder="Ask about WorkNest products or policies..."
          className="min-h-12 min-w-0 rounded-md bg-transparent px-3 text-base text-slate-950 outline-none placeholder:text-slate-400 disabled:cursor-wait"
          onChange={(event) => onQuestionChange(event.target.value)}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          aria-label="Send question"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 font-bold text-white transition hover:bg-teal-800 disabled:cursor-wait disabled:opacity-60"
        >
          <Send size={18} aria-hidden="true" />
          {isPending ? 'Sending' : 'Send'}
        </button>
      </form>

      <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
        {suggestedQuestions.map((suggestedQuestion) => (
          <button
            className="min-h-9 rounded-md border border-slate-200 bg-white/80 px-3 text-sm font-semibold text-slate-700 transition hover:border-teal-700 hover:bg-white hover:text-teal-800 disabled:cursor-wait disabled:opacity-60"
            type="button"
            key={suggestedQuestion}
            disabled={isPending}
            onClick={() => onSuggestedQuestionClick(suggestedQuestion)}
          >
            {suggestedQuestion}
          </button>
        ))}
      </div>

      <div
        className="inline-flex min-h-6 items-center gap-2 text-sm font-semibold text-slate-500"
        role={isPending ? 'status' : undefined}
      >
        <Sparkles size={15} aria-hidden="true" />
        {statusText}
      </div>
    </section>
  )
}
