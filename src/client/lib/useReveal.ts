import { useLayoutEffect } from 'react'

const SELECTOR = '[data-reveal], .page-head, .block, .unit, .founder, .contact-form'

/**
 * Adds a small entrance to content that is not in view yet.
 * The class is added before paint so content is never shown, then hidden.
 */
export function useReveal(key: string) {
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
    if (elements.length === 0) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    elements.forEach((element) => element.classList.add('reveal'))

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    )

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        window.requestAnimationFrame(() => element.classList.add('is-visible'))
      } else {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [key])
}
