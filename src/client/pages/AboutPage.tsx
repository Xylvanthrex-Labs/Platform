import { Link } from 'react-router-dom'
import { founder, lab, pageDescriptions, ventures } from '../../content/lab'
import { ArrowUpRight } from '../components/Icons'
import { PageHead } from '../components/Status'
import { usePageMeta } from '../lib/hooks'

export function AboutPage() {
  usePageMeta('About', pageDescriptions['/about'])
  const units = String(ventures.length).padStart(2, '0')
  const active = String(ventures.filter((venture) => venture.status === 'ACTIVE').length).padStart(
    2,
    '0',
  )

  return (
    <div className="page">
      <div className="container">
        <div className="page__inner page__inner--wide">
          <PageHead
            kicker="About"
            title="A lab, not a company."
            lede={lab.about}
            aside={
              <aside className="index-panel" aria-label="Lab record">
                <div className="index-panel__bar">
                  <span>Lab record</span>
                  <span>Independent</span>
                </div>
                <div className="index-panel__stats">
                  <div className="index-panel__stat">
                    <span className="index-panel__value">{units}</span>
                    <span className="index-panel__label">Units</span>
                  </div>
                  <div className="index-panel__stat">
                    <span className="index-panel__value">01</span>
                    <span className="index-panel__label">Person</span>
                  </div>
                  <div className="index-panel__stat">
                    <span className="index-panel__value">{active}</span>
                    <span className="index-panel__label">Active</span>
                  </div>
                </div>
                <p className="index-panel__note">{lab.location}</p>
                <div className="index-panel__foot">
                  <span>{lab.modelLine}</span>
                  <span>One lab.</span>
                </div>
              </aside>
            }
          />

          <section className="producer-section" aria-labelledby="model-title" data-reveal>
            <div className="statement-panel statement-panel--dark">
              <p className="kicker" id="model-title">
                The model
              </p>
              <p className="statement-panel__text">{lab.aboutNote}</p>
              <div className="statement-panel__foot">
                <span className="mono">Research / Ventures / Products</span>
                <span className="mono">One lab.</span>
              </div>
            </div>
          </section>

          <section className="founder-card" aria-labelledby="founder-title" data-reveal>
            <div className="founder-card__number">
              <span className="founder-card__value">01</span>
              <span className="founder-card__label">Person</span>
            </div>

            <div className="founder-card__body">
              <p className="kicker">Founder</p>
              <h2 className="founder-card__name" id="founder-title">
                {founder.handle}
              </h2>
              <p className="founder-card__role">{founder.role}</p>
              <p className="founder-card__bio">{founder.bio}</p>
              <p className="founder-card__note">{founder.note}</p>
            </div>
          </section>

          <div className="page-action">
            <Link className="btn btn--soft" to="/contact">
              Write to the lab
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
