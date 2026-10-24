import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav } from '../../content/lab'
import { ThemeToggle } from './ThemeToggle'

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const { pathname } = useLocation()
  const progressRef = useRef<HTMLSpanElement>(null)
  const scrolledRef = useRef(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }

      const nextScrolled = window.scrollY > 8
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
      }
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link className="brand" to="/" aria-label="Xylvanthrex Labs — home">
          <span className="brand__name">Xylvanthrex Labs</span>
          <span className="brand__tag">Independent research lab</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              className="nav__link"
              to={item.href}
              aria-current={isActive(pathname, item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="btn btn--soft site-header__cta" to="/contact">
            Contact
          </Link>
          <ThemeToggle />
        </div>

        <span className="site-header__progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
      </div>
    </header>
  )
}
