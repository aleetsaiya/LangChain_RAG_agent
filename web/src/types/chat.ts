export type SourceSnippet = {
  source: string
  section: string
  content: string
}

export type ChartData = {
  type: 'line' | 'pie'
  title: string
  labels: string[]
  values: number[]
}

export type ChatResponse = {
  answer: string
  sources: SourceSnippet[]
  chartData?: ChartData
}
