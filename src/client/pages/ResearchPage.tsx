import { Link } from 'react-router-dom'
import { getVenture, lab, methods, pageDescriptions, researchAreas } from '../../content/lab'
import { UnitFigure } from '../components/Figures'
import { ArrowUpRight } from '../components/Icons'
import { PageHead, Status } from '../components/Status'
import { usePageMeta } from '../lib/hooks'

export function ResearchPage() {
  usePageMeta('Research', pageDescriptions['/research'])

  const quantum = getVenture('quantum-research')
  const gate = methods.find((method) => method.title === 'Spin out')?.body
  const areas = String(researchAreas.length).padStart(2, '0')

  return (
    <div className="page">
      <div className="container">
        <div className="page__inner page__inner--wide">
          <PageHead
            kicker="Research"
            title="The agenda."
            lede="The work starts below the product layer. Eight areas, one division, and one rule for when research becomes a company."
            aside={
              <aside className="index-panel" aria-label="Research index">
                <div className="index-panel__bar">
                  <span>Research index</span>
                  <span>{areas} areas</span>
                </div>
                <div className="index-panel__stats">
                  <div className="index-panel__stat">
                    <span className="index-panel__value">{areas}</span>
                    <span className="index-panel__label">Areas</span>
                  </div>
                  <div className="index-panel__stat">
                    <span className="index-panel__value">01</span>
                    <span className="index-panel__label">Division</span>
                  </div>
                  <div className="index-panel__stat">
                    <span className="index-panel__value">00</span>
                    <span className="index-panel__label">Papers</span>
                  </div>
                </div>
                <p className="index-panel__note">No papers, no findings, no dates.</p>
                <div className="index-panel__foot">
                  <span>{lab.modelLine}</span>
                  <span>Karachi</span>
                </div>
              </aside>
            }
          />

          <section className="block" aria-labelledby="areas-title">
            <div className="section-head section-head--compact">
              <div>
                <p className="kicker">Areas / 01—08</p>
                <h2 className="section-title section-title--small" id="areas-title">
                  Eight areas, one agenda.
                </h2>
              </div>
              <p className="section-head__note">Questions before products.</p>
            </div>

            <div className="area-grid">
              {researchAreas.map((area) => (
                <article className="area-card" key={area.index}>
                  <span className="area-card__index">{area.index}</span>
                  <h3 className="area-card__name">{area.name}</h3>
                  <p className="area-card__line">{area.line}</p>
                </article>
              ))}
            </div>
          </section>

          {quantum ? (
            <section className="division-panel" aria-labelledby="division-title" data-reveal>
              <div className="division-panel__copy">
                <div className="division-panel__bar">
                  <span>Division / {quantum.index}</span>
                  <Status status={quantum.status} />
                </div>
                <p className="kicker">Research division</p>
                <h2 className="division-panel__name" id="division-title">
                  {quantum.name}
                </h2>
                <p className="division-panel__text">{quantum.problem}</p>
                <p className="division-panel__text division-panel__text--soft">
                  {quantum.direction}
                </p>
                <Link className="action division-panel__action" to="/ventures#quantum-research">
                  Division introduction
                  <ArrowUpRight />
                </Link>
              </div>

              <div className="division-panel__figure">
                <UnitFigure slug={quantum.slug} tone="ink" />
              </div>
            </section>
          ) : null}

          {gate ? (
            <section className="gate-section" aria-labelledby="gate-title" data-reveal>
              <div className="statement-panel">
                <p className="kicker" id="gate-title">
                  The gate
                </p>
                <p className="statement-panel__text">{gate}</p>
                <div className="statement-panel__foot">
                  <span className="mono">One rule.</span>
                  <span className="mono">Research / Ventures / Products</span>
                </div>
              </div>
            </section>
          ) : null}

          <section className="open-questions" aria-labelledby="questions-title" data-reveal>
            <p className="kicker">Open questions</p>
            <h2 className="open-questions__title" id="questions-title">
              The first three questions are being written.
            </h2>
            <p className="open-questions__text">
              They will be published when they exist, not before.
            </p>
            <p className="mono open-questions__note">No papers, no findings, no dates.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
