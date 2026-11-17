import type { ReactNode } from 'react'
import { hasWhatsApp, whatsappUrl } from '../config/site'

type ContactLinkProps = {
  children: ReactNode
  className?: string
  onUnavailable?: () => void
}

export function ContactLink({ children, className, onUnavailable }: ContactLinkProps) {
  if (hasWhatsApp) {
    return <a className={className} href={whatsappUrl()} target="_blank" rel="noreferrer">{children}</a>
  }

  return (
    <button className={className} type="button" onClick={onUnavailable}>
      {children}
    </button>
  )
}
