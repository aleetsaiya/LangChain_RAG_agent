import { ChevronDown, Info } from 'lucide-react'

import type { ChatResponse } from '../types/chat'
import { compactContent } from '../utils/text'
import { ChartPreview } from './ChartPreview'

type AssistantResponseProps = {
  response: ChatResponse
}

export function AssistantResponse({ response }: AssistantResponseProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white/95 p-5 shadow-lg shadow-slate-900/5">
      <div className="text-xs font-bold uppercase text-teal-700">
        Assistant answer
      </div>
      <p className="mt-4 whitespace-pre-wrap text-[17px] leading-7 text-slate-800">
        {response.answer}
      </p>

      {response.chartData && <ChartPreview chartData={response.chartData} />}

      {response.sources.length > 0 && (
        <details className="group mt-6 rounded-lg border border-slate-200 bg-slate-50/80 p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-800">
            <span>View retrieved sources</span>
            <ChevronDown
              className="transition group-open:rotate-180"
              size={18}
              aria-hidden="true"
            />
          </summary>

          <p className="mt-3 flex gap-2 text-sm leading-6 text-slate-600">
            <Info
              className="mt-0.5 shrink-0 text-teal-700"
              size={16}
              aria-hidden="true"
            />
            <span>
              This project is for learning purposes, so retrieved source
              snippets are available here for transparency.
            </span>
          </p>

          <div className="mt-4 grid gap-3">
            {response.sources.map((source, index) => (
              <article
                className="rounded-lg border border-slate-200 bg-white p-3"
                key={`${source.section}-${index}`}
              >
                <h3 className="text-sm font-bold text-slate-950">
                  {source.section}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {compactContent(source.content)}
                </p>
                <span className="mt-2 inline-block text-xs font-bold text-slate-400">
                  {source.source}
                </span>
              </article>
            ))}
          </div>
        </details>
      )}
    </article>
  )
}
