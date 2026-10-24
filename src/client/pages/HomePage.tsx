import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { lab, pageDescriptions, researchAreas, ventures } from '../../content/lab'
import { UnitFigure } from '../components/Figures'
import { ArrowDown, ArrowUpRight } from '../components/Icons'
import { Status } from '../components/Status'
import { usePageMeta } from '../lib/hooks'

export function HomePage() {
  usePageMeta('Independent research lab', pageDescriptions['/'])

  const featured = ventures.find((venture) => venture.featured) ?? ventures[0]
  if (!featured) return null

  const others = ventures.filter((venture) => venture.slug !== featured.slug)
  const planned = others.filter((venture) => venture.status === 'PLANNED').length
  const researching = others.filter((venture) => venture.status === 'RESEARCHING').length

  const studio = featured.offerings?.find((offering) => offering.kind === 'Studio family')
  const chatbot = featured.offerings?.find((offering) => offering.kind === 'Product')

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__inner">
          <span className="hero__count" aria-hidden="true">
            05
          </span>

          <p className="kicker hero__kicker">
            <span className="hero__pulse" aria-hidden="true" />
            Independent research lab · Karachi, Pakistan
          </p>

          <h1 className="hero__title">
            We research what <em>doesn’t exist yet.</em>
          </h1>

          <div className="hero__row">
            <p className="hero__lede">
              Then we build the companies to ship it. One lab holds five units: four ventures
              and one research division.
            </p>

            <div className="hero__actions">
              <a className="btn" href="#units">
                The five units
                <ArrowDown />
              </a>
              <a className="btn btn--soft" href="#research">
                Research agenda
                <ArrowUpRight />
              </a>
              <p className="mono hero__model">{lab.modelLine}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section" id="units" aria-labelledby="feature-title">
        <div className="container">
          <div className="feature-panel" data-reveal>
            <div className="feature-panel__bar">
              <span className="feature-panel__live">
                <span className="live-dot" aria-hidden="true" />
                Unit {featured.index} · {featured.kind} · {featured.status}
              </span>
              <span className="feature-panel__meta">
                <span>Layer: {featured.layer}</span>
                <span>Build order: {String(featured.buildOrder).padStart(2, '0')}</span>
              </span>
            </div>

            <div className="feature-panel__main">
              <div className="feature-panel__copy">
                <p className="feature-panel__label">Primary venture / Unit {featured.index}</p>
                <h2 className="feature-panel__title" id="feature-title">
                  {featured.name}
                </h2>
                <p className="feature-panel__summary">{featured.summary}</p>
                <p className="feature-panel__state">{featured.state}</p>
                <Link className="feature-panel__link" to={`/ventures#${featured.slug}`}>
                  Read the introduction
                  <ArrowUpRight />
                </Link>
              </div>

              <div className="feature-panel__figure">
                <UnitFigure slug={featured.slug} tone="ink" />
              </div>
            </div>

            <div className="feature-panel__facts">
              <div className="fact">
                <span className="fact__value">Active</span>
                <span className="fact__label">Venture status</span>
                <p>The only active unit in the lab.</p>
              </div>
              <div className="fact">
                <span className="fact__value">Three</span>
                <span className="fact__label">Studio offers</span>
                <p>{studio?.note ?? 'Web Studio, App Studio and Software Studio.'}</p>
              </div>
              <div className="fact">
                <span className="fact__value">None</span>
                <span className="fact__label">Public demo</span>
                <p>{chatbot?.note ?? 'No public demo yet. Demonstrations are arranged on request.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section units-section" aria-labelledby="other-units-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <div className="section-head__intro">
              <p className="kicker">Portfolio / Units 02—05</p>
              <h2 className="section-title" id="other-units-title">
                Four units, at their real stage.
              </h2>
            </div>
            <p className="section-head__note">
              {planned} planned · {researching} researching
            </p>
          </div>

          <div className="unit-cards">
            {others.map((venture, index) => (
              <div
                className="unit-card-wrap"
                key={venture.slug}
                data-reveal
                style={{ '--reveal-delay': `${index * 70}ms` } as CSSProperties}
              >
                <Link className="unit-card" to={`/ventures#${venture.slug}`}>
                  <div className="unit-card__top">
                    <span className="kicker">
                      {venture.index} / {venture.kind}
                    </span>
                    <Status status={venture.status} />
                  </div>

                  <div className="unit-card__figure">
                    <UnitFigure slug={venture.slug} />
                    <span className="unit-card__go" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </div>

                  <h3 className="unit-card__name">{venture.name}</h3>
                  <p className="unit-card__summary">{venture.summary}</p>

                  <div className="unit-card__foot">
                    <span className="mono">Layer · {venture.layer}</span>
                    <span className="unit-card__link">
                      Read introduction
                      <ArrowUpRight />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section agenda-section" id="research" aria-labelledby="agenda-title">
        <div className="container agenda">
          <div className="agenda__lead" data-reveal>
            <p className="kicker">Research / Agenda</p>
            <h2 className="section-title" id="agenda-title">
              The work starts below the product layer.
            </h2>
            <p className="agenda__text">
              Eight areas, one division, and one rule for when research becomes a company.
            </p>
            <Link className="btn btn--soft" to="/research">
              Read the full agenda
              <ArrowUpRight />
            </Link>
          </div>

          <div className="agenda__list" data-reveal>
            {researchAreas.map((area) => (
              <Link className="agenda-row" key={area.index} to="/research">
                <span className="agenda-row__index">{area.index}</span>
                <span className="agenda-row__body">
                  <span className="agenda-row__name">{area.name}</span>
                  <span className="agenda-row__line">{area.line}</span>
                </span>
                <span className="agenda-row__arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section quote-section" aria-label="The model">
        <div className="container">
          <div className="lab-quote" data-reveal>
            <p className="kicker">The model</p>
            <blockquote className="lab-quote__text">“{lab.aboutNote}”</blockquote>
            <div className="lab-quote__foot">
              <span className="mono">One person · Five units</span>
              <Link className="action" to="/philosophy">
                Read the philosophy
                <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
