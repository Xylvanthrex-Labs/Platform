import { Link } from 'react-router-dom'
import { ArrowUpRight } from '../components/Icons'

export function NotFoundPage() {
  return (
    <div className="page">
      <div className="container">
        <div className="page__inner page__inner--wide">
          <div className="notfound-panel" data-reveal>
            <span className="notfound-panel__ghost" aria-hidden="true">
              404
            </span>

            <div className="notfound-panel__copy">
              <p className="kicker">404 / Not found</p>
              <h1 className="page-title">This page does not exist.</h1>
              <p className="lede">
                The address may be wrong, or the page may not exist yet.
              </p>
              <Link className="btn btn--light notfound__action" to="/">
                Back to the lab
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
