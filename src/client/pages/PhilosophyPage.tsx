import { lab, pageDescriptions, principles, refusals } from '../../content/lab'
import { PageHead } from '../components/Status'
import { usePageMeta } from '../lib/hooks'

export function PhilosophyPage() {
  usePageMeta('Philosophy', pageDescriptions['/philosophy'])
  const rules = String(principles.length).padStart(2, '0')
  const refusalsCount = String(refusals.length).padStart(2, '0')

  return (
    <div className="page">
      <div className="container">
        <div className="page__inner page__inner--wide">
          <PageHead
            kicker="Philosophy"
            title="How the lab works."
            lede="Three rules for what gets written, one model for what the lab produces, and the claims it refuses to make."
            aside={
              <aside className="index-panel" aria-label="Philosophy index">
                <div className="index-panel__bar">
                  <span>Operating rules</span>
                  <span>{rules} + {refusalsCount}</span>
                </div>
                <div className="index-panel__stats">
                  <div className="index-panel__stat">
                    <span className="index-panel__value">{rules}</span>
                    <span className="index-panel__label">Rules</span>
                  </div>
                  <div className="index-panel__stat">
                    <span className="index-panel__value">01</span>
                    <span className="index-panel__label">Model</span>
                  </div>
                  <div className="index-panel__stat">
                    <span className="index-panel__value">{refusalsCount}</span>
                    <span className="index-panel__label">Refusals</span>
                  </div>
                </div>
                <p className="index-panel__note">No unearned claims.</p>
                <div className="index-panel__foot">
                  <span>{lab.modelLine}</span>
                  <span>Karachi</span>
                </div>
              </aside>
            }
          />

          <section className="block" aria-labelledby="rules-title">
            <div className="section-head section-head--compact">
              <div>
                <p className="kicker">Rules / 01—03</p>
                <h2 className="section-title section-title--small" id="rules-title">
                  Three rules for what gets written.
                </h2>
              </div>
              <p className="section-head__note">Applied to every unit.</p>
            </div>

            <div className="rule-grid">
              {principles.map((principle) => (
                <article className="rule-card" key={principle.index}>
                  <span className="rule-card__index">{principle.index}</span>
                  <h3 className="rule-card__title">{principle.title}</h3>
                  <p className="rule-card__body">{principle.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="producer-section" aria-labelledby="producer-title" data-reveal>
            <div className="statement-panel statement-panel--dark">
              <p className="kicker" id="producer-title">
                The producer
              </p>
              <p className="statement-panel__text">{lab.aboutNote}</p>
              <div className="statement-panel__foot">
                <span className="mono">One lab. One model.</span>
                <span className="mono">{lab.modelLine}</span>
              </div>
            </div>
          </section>

          <section className="block" aria-labelledby="refusals-title">
            <div className="section-head section-head--compact">
              <div>
                <p className="kicker">What we refuse</p>
                <h2 className="section-title section-title--small" id="refusals-title">
                  The claims we do not make.
                </h2>
              </div>
              <p className="section-head__note">{refusalsCount} refusals.</p>
            </div>

            <ul className="refusal-grid">
              {refusals.map((refusal) => (
                <li className="refusal-card" key={refusal}>
                  <span className="refusal-card__mark" aria-hidden="true">
                    —
                  </span>
                  <span>{refusal}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
