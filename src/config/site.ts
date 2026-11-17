type SiteConfig = {
  name: string
  logoPath: string
  location: string
  serviceArea: string
  whatsapp: {
    number: string
    message: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'LP Tech',
  logoPath: '', // Ex.: 'logo-lp-tech.svg'. Mantenha vazio enquanto a marca não estiver no projeto.
  location: 'Riacho das Almas — PE',
  serviceArea: 'Caruaru e região',
  whatsapp: {
    number: '', // Apenas números com DDI. Ex.: 5581999999999
    message: 'Olá! Quero conhecer as soluções da LP Tech para o meu estabelecimento.',
  },
}

const whatsappNumber = siteConfig.whatsapp.number.replace(/\D/g, '')

export const hasWhatsApp = whatsappNumber.length > 0

export function whatsappUrl() {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsapp.message)}`
}
