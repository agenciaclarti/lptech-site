import { siteConfig } from '../config/site'

type BrandProps = { compact?: boolean }

export function Brand({ compact = false }: BrandProps) {
  if (siteConfig.logoPath) {
    const logoPath = siteConfig.logoPath.replace(/^\/+/, '')
    return <img className="brand-image" src={`${import.meta.env.BASE_URL}${logoPath}`} alt={siteConfig.name} />
  }

  return (
    <span className={`brand-wordmark ${compact ? 'brand-wordmark--compact' : ''}`} aria-label={siteConfig.name}>
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span><b>LP</b> TECH</span>
    </span>
  )
}
