import { Loader2 } from 'lucide-react'

export function LoadingCard() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white/95 p-5 shadow-lg shadow-slate-900/5">
      <Loader2
        className="shrink-0 animate-spin text-teal-700"
        size={20}
        aria-hidden="true"
      />
      <div>
        <h2 className="text-lg font-semibold text-slate-950">
          Reading WorkNest context
        </h2>
        <p className="text-slate-600">
          Retrieving source snippets and preparing the answer.
        </p>
      </div>
    </div>
  )
}
