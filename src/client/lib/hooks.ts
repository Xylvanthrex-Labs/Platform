import { useEffect } from 'react'

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title: string, description: string): void {
  useEffect(() => {
    document.title = title ? `${title} — Xylvanthrex Labs` : 'Xylvanthrex Labs'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title || 'Xylvanthrex Labs')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', description)
  }, [title, description])
}
