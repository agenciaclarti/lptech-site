import { Badge, PanelsTopLeft, ScanLine } from 'lucide-react'

export const solutions = [
  {
    title: 'Placas NFC e QR Code',
    description:
      'Placas físicas para aproximar o smartphone ou escanear um QR Code e acessar o conteúdo certo.',
    examples: 'Avaliações, WhatsApp, redes sociais, pagamentos e links configurados.',
    icon: ScanLine,
    visual: 'qr',
  },
  {
    title: 'Displays inteligentes',
    description:
      'Displays para balcões, recepções e ambientes comerciais que tornam o próximo passo mais simples.',
    examples: 'Cardápios digitais, sites, redes sociais e páginas escolhidas pelo seu negócio.',
    icon: PanelsTopLeft,
    visual: 'display',
  },
  {
    title: 'Crachás inteligentes',
    description:
      'Crachás personalizados para compartilhar informações, contatos e perfis profissionais com praticidade.',
    examples: 'Uma apresentação direta, profissional e pronta para ser aproximada.',
    icon: Badge,
    visual: 'badge',
  },
] as const

export const steps = [
  ['01', 'Escolha sua solução', 'Selecione o produto ideal para o momento e o espaço do seu estabelecimento.'],
  ['02', 'Personalize seu destino', 'Defina para onde cada interação deve levar: um link, contato ou conteúdo digital.'],
  ['03', 'Conecte seus clientes', 'Disponibilize o acesso por aproximação NFC ou leitura de QR Code.'],
] as const

export const benefits = [
  'Acesso rápido às informações.',
  'Uma experiência mais prática para seus clientes.',
  'Integração do estabelecimento com canais digitais.',
  'Menos etapas no atendimento.',
  'Mais facilidade para compartilhar serviços e informações.',
] as const
