import { Link } from 'react-router-dom'
import { lab, nav, ventures } from '../../content/lab'
import { ArrowUpRight } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()
  const active = ventures.filter((venture) => venture.status === 'ACTIVE').length
  const planned = ventures.filter((venture) => venture.status === 'PLANNED').length
  const researching = ventures.filter((venture) => venture.status === 'RESEARCHING').length
  const units = String(ventures.length).padStart(2, '0')

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__status">
          <span>{units} units</span>
          <span>
            {active} active · {planned} planned · {researching} researching
          </span>
          <span>{lab.modelLine}</span>
        </div>

        <div className="site-footer__top">
          <div className="site-footer__intro">
            <p className="site-footer__brand">Xylvanthrex Labs</p>
            <p className="site-footer__line">
              An independent research lab. One person. Five units.
            </p>
          </div>

          <div className="site-footer__side">
            <Link className="btn btn--light" to="/contact">
              Register interest
              <ArrowUpRight />
            </Link>

            <nav className="site-footer__nav" aria-label="Footer">
              {nav.map((item) => (
                <Link key={item.href} className="site-footer__link" to={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="site-footer__base">
          <span>© {year} Xylvanthrex Labs</span>
          <span>Karachi, Pakistan</span>
          <span>Every unit carries a status.</span>
        </div>
      </div>
    </footer>
  )
}
