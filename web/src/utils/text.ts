export const compactContent = (content: string) =>
  content.length > 320 ? `${content.slice(0, 320).trim()}...` : content
