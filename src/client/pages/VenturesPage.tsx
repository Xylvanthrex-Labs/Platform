import { Link } from 'react-router-dom'
import { lab, pageDescriptions, statuses, ventures } from '../../content/lab'
import { UnitFigure } from '../components/Figures'
import { ArrowUpRight } from '../components/Icons'
import { PageHead, Status } from '../components/Status'
import { usePageMeta } from '../lib/hooks'

export function VenturesPage() {
  usePageMeta('Ventures', pageDescriptions['/ventures'])
  const units = String(ventures.length).padStart(2, '0')

  return (
    <div className="page">
      <div className="container">
        <div className="page__inner page__inner--wide">
          <PageHead
            kicker="Ventures"
            title="Five units. One lab."
            lede="Four ventures and one research division. One is active. The rest are labeled for the stage they are actually at."
            aside={
              <aside className="index-panel" aria-label="Portfolio index">
                <div className="index-panel__bar">
                  <span>Portfolio index</span>
                  <span>{units} units</span>
                </div>
                <div className="index-panel__rows">
                  {ventures.map((venture) => (
                    <Link
                      className="index-panel__row"
                      to={`#${venture.slug}`}
                      key={venture.slug}
                    >
                      <span className="index-panel__index">{venture.index}</span>
                      <span className="index-panel__name">{venture.name}</span>
                      <Status status={venture.status} />
                    </Link>
                  ))}
                </div>
                <div className="index-panel__foot">
                  <span>{lab.modelLine}</span>
                  <span>Karachi</span>
                </div>
              </aside>
            }
          />

          <section className="block status-key" aria-labelledby="status-key-title">
            <div className="section-head section-head--compact">
              <div>
                <p className="kicker">Status key</p>
                <h2 className="section-title section-title--small" id="status-key-title">
                  Read the label first.
                </h2>
              </div>
              <p className="section-head__note">Every unit carries one.</p>
            </div>

            <div className="status-grid">
              {statuses.map((item) => (
                <div className="status-card" key={item.status}>
                  <Status status={item.status} />
                  <p className="status-card__meaning">{item.meaning}</p>
                  <p className="status-card__claim">{item.claim}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="units-list">
            {ventures.map((venture) => {
              const active = venture.status === 'ACTIVE'

              return (
                <article
                  className={`venture-card${active ? ' venture-card--active' : ''}`}
                  id={venture.slug}
                  key={venture.slug}
                  aria-labelledby={`${venture.slug}-title`}
                  data-reveal
                >
                  <div className="venture-card__bar">
                    <span>
                      {venture.index} / {venture.kind}
                    </span>
                    <Status status={venture.status} />
                  </div>

                  <div className="venture-card__main">
                    <div className="venture-card__copy">
                      <p className="kicker">
                        {venture.layer} · Build order {String(venture.buildOrder).padStart(2, '0')}
                      </p>
                      <h2 className="venture-card__name" id={`${venture.slug}-title`}>
                        {venture.name}
                      </h2>
                      <p className="venture-card__problem">{venture.problem}</p>
                      <p className="venture-card__direction">{venture.direction}</p>

                      <div className="venture-card__state">
                        <span className="mono">Current state</span>
                        <p>{venture.state}</p>
                      </div>

                      {venture.layer === 'Division' ? (
                        <Link className="action venture-card__action" to="/research">
                          Research agenda
                          <ArrowUpRight />
                        </Link>
                      ) : null}
                    </div>

                    <div className="venture-card__figure">
                      <UnitFigure slug={venture.slug} tone={active ? 'ink' : 'light'} />
                      <span className="venture-card__figure-index" aria-hidden="true">
                        {venture.index}
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <p className="mono units-note">No dates for units that are not active.</p>
        </div>
      </div>
    </div>
  )
}
