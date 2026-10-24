import type { ReactNode } from 'react'
import type { Status as StatusValue } from '../../content/lab'

export function Status({ status }: { status: StatusValue }) {
  return (
    <span className={`status status--${status.toLowerCase()}`}>
      <span className="status__dot" aria-hidden="true" />
      {status}
    </span>
  )
}

export function PageHead({
  kicker,
  title,
  lede,
  display = false,
  aside,
  children,
}: {
  kicker: string
  title: string
  lede?: string
  display?: boolean
  aside?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className={`page-head${aside ? ' page-head--split' : ''}`}>
      <div className="page-head__copy">
        <p className="kicker">{kicker}</p>
        <h1 className={display ? 'display' : 'page-title'}>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
        {children}
      </div>
      {aside ? <div className="page-head__aside">{aside}</div> : null}
    </header>
  )
}
