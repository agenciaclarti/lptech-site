import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Menu, MessageCircle, MoveUpRight, X } from 'lucide-react'
import { Brand } from './components/Brand'
import { ContactLink } from './components/ContactLink'
import { benefits, solutions, steps } from './data/solutions'
import { hasWhatsApp, siteConfig } from './config/site'
import './styles.css'

const navigation = [
  ['Início', '#inicio'],
  ['Soluções', '#solucoes'],
  ['Sobre nós', '#sobre'],
  ['Contato', '#contato'],
] as const

function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="art-halo" />
      <div className="art-card art-card--front">
        <span className="art-card-label">LP TECH</span>
        <span className="art-card-wave"><i /><i /><i /></span>
        <span className="art-card-dot" />
      </div>
      <div className="art-card art-card--back"><span className="art-card-line" /><span className="art-card-line" /></div>
      <div className="art-orbit" /><div className="art-orbit art-orbit--small" />
      <span className="art-chip">NFC</span><span className="art-spark art-spark--one" /><span className="art-spark art-spark--two" />
    </div>
  )
}

function SolutionVisual({ type }: { type: string }) {
  return <div className={`solution-visual solution-visual--${type}`} aria-hidden="true"><div className="visual-device"><span /><span /><span /><span /></div><div className="visual-signal"><i /><i /><i /></div></div>
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', open)
    return () => document.body.classList.remove('menu-is-open')
  }, [open])

  useEffect(() => {
    if (!open) return

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', closeWithEscape)
    return () => window.removeEventListener('keydown', closeWithEscape)
  }, [open])

  const closeMenu = () => setOpen(false)
  const showNotice = () => setNotice(true)

  return (
    <>
      <header className="site-header">
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <nav className="nav shell" aria-label="Navegação principal">
          <a href="#inicio" className="brand-link" onClick={closeMenu}><Brand /></a>
          <button className="menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-controls="site-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          <div className={`nav-links ${open ? 'nav-links--open' : ''}`} id="site-navigation">
            {navigation.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
            <ContactLink className="nav-contact" onUnavailable={showNotice}><MessageCircle size={16} /> Falar com a LP Tech</ContactLink>
          </div>
        </nav>
      </header>

      <main id="conteudo">
        <section className="hero section" id="inicio">
          <div className="shell hero-grid">
            <div className="hero-copy reveal">
              <p className="eyebrow"><span /> Tecnologia que aproxima</p>
              <h1>O próximo passo do seu negócio começa com <em>um toque.</em></h1>
              <p className="hero-lead">Modernize seu estabelecimento com soluções NFC e QR Code. Mais praticidade para o seu negócio, mais facilidade para seus clientes.</p>
              <div className="hero-actions">
                <a className="button button--primary" href="#solucoes">Conheça nossas soluções <ArrowDownRight size={18} /></a>
                <ContactLink className="button button--ghost" onUnavailable={showNotice}>Entre em contato <ArrowUpRight size={18} /></ContactLink>
              </div>
              <p className="hero-place"><span /> Tecnologia feita no Agreste para negócios que avançam.</p>
            </div>
            <HeroArt />
          </div>
          <div className="hero-rule shell"><span>RIACHO DAS ALMAS</span><span>CARUARU & REGIÃO</span><span>PE · BRASIL</span></div>
        </section>

        <section className="section solutions" id="solucoes">
          <div className="shell">
            <div className="section-heading reveal"><p className="eyebrow"><span /> Nossas soluções</p><div><h2>Interações simples.<br /><em>Presenças marcantes.</em></h2><p>Produtos físicos, destinos digitais e uma experiência mais fluida para quem atende e para quem chega.</p></div></div>
            <div className="solution-grid">
              {solutions.map((solution, index) => {
                const Icon = solution.icon
                return <article className="solution-card reveal" style={{ '--delay': `${index * 100}ms` } as CSSProperties} key={solution.title}>
                  <SolutionVisual type={solution.visual} />
                  <div className="solution-icon"><Icon size={20} /></div><span className="card-index">0{index + 1}</span>
                  <h3>{solution.title}</h3><p>{solution.description}</p><small>{solution.examples}</small>
                </article>
              })}
            </div>
          </div>
        </section>

        <section className="section process" aria-labelledby="processo-titulo">
          <div className="shell"><div className="process-intro"><p className="eyebrow eyebrow--light"><span /> Como funciona</p><h2 id="processo-titulo">Da ideia ao toque,<br /><em>sem complicação.</em></h2></div>
            <ol className="process-list">{steps.map(([number, title, text]) => <li key={number} className="reveal"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><ChevronRight /></li>)}</ol>
          </div>
        </section>

        <section className="section benefits"><div className="shell benefits-grid">
          <div className="benefit-statement reveal"><p className="eyebrow"><span /> Por que modernizar?</p><h2>O digital funciona melhor quando parece <em>natural.</em></h2><p>Uma solução bem posicionada deixa a informação mais perto do cliente e reduz o esforço até a próxima ação.</p></div>
          <ul className="benefit-list">{benefits.map((benefit, index) => <li className="reveal" style={{ '--delay': `${index * 70}ms` } as CSSProperties} key={benefit}><span><Check size={16} /></span>{benefit}</li>)}</ul>
        </div></section>

        <section className="section about" id="sobre"><div className="shell about-grid">
          <div className="about-stamp reveal"><div><Brand compact /><span>DESDE O AGRESTE<br />PARA O DIGITAL</span></div></div>
          <div className="about-copy reveal"><p className="eyebrow"><span /> Sobre a LP Tech</p><h2>Tecnologia próxima de quem faz o comércio acontecer.</h2><p>A LP Tech nasceu em Riacho das Almas, Pernambuco, com o propósito de levar inovação prática aos comércios do Agreste pernambucano.</p><p>Atendemos pequenos e médios negócios de Riacho das Almas, Caruaru e região, ajudando cada estabelecimento a trocar processos tradicionais por experiências digitais mais simples, acessíveis e úteis.</p><a className="text-link" href="#contato">Vamos conversar sobre seu negócio <MoveUpRight size={17} /></a></div>
        </div></section>

        <section className="section contact" id="contato"><div className="shell contact-panel reveal">
          <div><p className="eyebrow eyebrow--light"><span /> Contato</p><h2>Seu negócio está pronto para dar o próximo passo?</h2><p>Conheça as soluções da LP Tech e converse com a gente sobre o que faz sentido para o seu estabelecimento.</p></div>
          <div className="contact-action"><ContactLink className="button button--light" onUnavailable={showNotice}>Falar com a LP Tech <ArrowUpRight size={18} /></ContactLink><small>{hasWhatsApp ? 'Atendimento comercial via WhatsApp' : 'Canal de atendimento em configuração'}</small></div>
        </div></section>
      </main>

      <footer className="footer"><div className="shell footer-main"><div><a href="#inicio" className="brand-link"><Brand /></a><p>Soluções NFC e QR Code para aproximar estabelecimentos e clientes.</p></div><div className="footer-links"><span>Navegação</span>{navigation.map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><div className="footer-local"><span>Onde estamos</span><p>{siteConfig.location}</p><p>Atendimento em {siteConfig.serviceArea}.</p></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} LP Tech. Todos os direitos reservados.</span><span>Inovação com propósito.</span></div></footer>

      {notice && <div className="notice" role="status" aria-atomic="true"><p>O contato via WhatsApp será disponibilizado em breve.</p><button type="button" aria-label="Fechar aviso" onClick={() => setNotice(false)}><X size={17} /></button></div>}
    </>
  )
}
