import { lab, pageDescriptions } from '../../content/lab'
import { PageHead } from '../components/Status'
import { WaitlistForm } from '../components/WaitlistForm'
import { usePageMeta } from '../lib/hooks'

export function ContactPage() {
  usePageMeta('Contact', pageDescriptions['/contact'])

  return (
    <div className="page">
      <div className="container">
        <div className="page__inner page__inner--wide">
          <PageHead
            kicker="Contact"
            title="Write to the lab."
            lede="One list. Five units. No newsletter, no dates, no invented response times."
          />

          <div className="contact-layout" data-reveal>
            <aside className="contact-panel" aria-label="Contact notes">
              <div className="contact-panel__bar">
                <span>Direct</span>
                <span>One list</span>
              </div>

              <p className="contact-panel__value">
                One list.
                <br />
                Five units.
              </p>
              <p className="contact-panel__text">
                No newsletter, no dates, no invented response times.
              </p>

              <ul className="contact-panel__list">
                <li>One person reads this.</li>
                <li>No third-party tools, no analytics.</li>
                <li>Planned units have no dates.</li>
              </ul>

              <div className="index-panel__foot">
                <span>{lab.location}</span>
                <span>{lab.modelLine}</span>
              </div>
            </aside>

            <div className="contact-card">
              <div className="contact-card__bar">
                <span>Register interest</span>
                <span>No newsletter</span>
              </div>
              <WaitlistForm source="contact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
