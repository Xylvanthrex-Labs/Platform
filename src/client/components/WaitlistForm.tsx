import { useId, useState, type FormEvent } from 'react'
import { ventures } from '../../content/lab'
import { ApiError, submitWaitlist } from '../lib/api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function WaitlistForm({
  defaultVenture = 'any',
  source = 'lab',
}: {
  defaultVenture?: string
  source?: string
}) {
  const known = new Set(ventures.map((venture) => venture.slug))
  const initialVenture = known.has(defaultVenture) ? defaultVenture : 'any'

  const emailId = useId()
  const emailHintId = useId()
  const emailErrorId = useId()
  const ventureId = useId()
  const ventureHintId = useId()
  const ventureErrorId = useId()
  const trapId = useId()

  const [email, setEmail] = useState('')
  const [venture, setVenture] = useState(initialVenture)
  const [trap, setTrap] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const cleanEmail = email.trim()
    const nextErrors: Record<string, string> = {}

    if (!cleanEmail) nextErrors.email = 'An email address is required.'
    else if (!EMAIL_RE.test(cleanEmail)) nextErrors.email = 'That does not look like an email address.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setState('idle')
      document.getElementById(emailId)?.focus()
      return
    }

    setErrors({})
    setState('submitting')

    try {
      const response = await submitWaitlist({
        email: cleanEmail,
        venture,
        note: '',
        company_website: trap,
        source,
      })
      setState('success')
      setMessage(response.message ?? 'Saved.')
      setEmail('')
    } catch (error) {
      setState('error')
      if (error instanceof ApiError && error.errors) {
        setErrors(error.errors)
        setFormError('Check the highlighted field and submit again.')
      } else {
        setFormError(
          error instanceof Error ? error.message : 'The entry could not be saved. Try again.',
        )
      }
    }
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="field">
        <label className="field__label" htmlFor={emailId}>
          Email
        </label>
        <input
          id={emailId}
          className="field__control"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@domain.com"
          maxLength={254}
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={`${emailHintId}${errors.email ? ` ${emailErrorId}` : ''}`}
        />
        <p className="field__hint" id={emailHintId}>
          Stored on this server. Used only for the unit you choose.
        </p>
        {errors.email ? (
          <p className="field__error" id={emailErrorId}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label className="field__label" htmlFor={ventureId}>
          Unit <span className="optional">Optional</span>
        </label>
        <select
          id={ventureId}
          className="field__control field__control--select"
          name="venture"
          value={venture}
          onChange={(event) => setVenture(event.target.value)}
          aria-invalid={errors.venture ? true : undefined}
          aria-describedby={`${ventureHintId}${errors.venture ? ` ${ventureErrorId}` : ''}`}
        >
          <option value="any">Any unit / not sure</option>
          {ventures.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name} — {item.status}
            </option>
          ))}
        </select>
        <p className="field__hint" id={ventureHintId}>
          Planned units have no dates. This is a list for updates, not a launch schedule.
        </p>
        {errors.venture ? (
          <p className="field__error" id={ventureErrorId}>
            {errors.venture}
          </p>
        ) : null}
      </div>

      <div className="field field--trap" aria-hidden="true">
        <label htmlFor={trapId}>Company website (leave this field empty)</label>
        <input
          id={trapId}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(event) => setTrap(event.target.value)}
        />
      </div>

      <div className="form__live" role="status" aria-live="polite">
        {state === 'success' ? <p className="form__status">{message}</p> : null}
        {formError ? <p className="form__status form__status--error">{formError}</p> : null}
      </div>

      <button className="btn" type="submit" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Adding…' : 'Register interest'}
      </button>

      <p className="form__note">
        One person reads this. We write only when there is something real to share. No
        third-party tools, no analytics.
      </p>
    </form>
  )
}
