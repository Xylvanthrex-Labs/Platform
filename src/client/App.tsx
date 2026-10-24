import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PhilosophyPage } from './pages/PhilosophyPage'
import { ResearchPage } from './pages/ResearchPage'
import { VenturesPage } from './pages/VenturesPage'
import { useReveal } from './lib/useReveal'

export function App() {
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const initial = useRef(true)

  useReveal(pathname)

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const target = document.getElementById(id)
      if (target) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
        })
        return
      }
    }

    window.scrollTo(0, 0)
    if (!initial.current) mainRef.current?.focus({ preventScroll: true })
    initial.current = false
  }, [pathname, hash])

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main" ref={mainRef} tabIndex={-1}>
        <div className="route" key={pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ventures" element={<VenturesPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  )
}
