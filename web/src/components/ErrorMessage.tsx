type ErrorMessageProps = {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800 shadow-lg shadow-slate-900/5">
      <div className="text-xs font-bold uppercase">API error</div>
      <p className="mt-2">{message}</p>
    </div>
  )
}
