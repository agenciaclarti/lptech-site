/* Motor de catálogos LP Tech: renderização estática, sem dependências. */
(function () {
  'use strict';

  const root = document.querySelector('[data-catalogo]');
  const ALLOWED_PROTOCOLS = ['https:', 'http:', 'mailto:', 'tel:'];
  const COLORS = { primary: '#0d7e6b', secondary: '#8ad4c5', background: '#edf4f1', surface: '#ffffff', text: '#14201d', muted: '#52625c' };
  const FONTS = { manrope: 'Manrope, ui-sans-serif, system-ui, sans-serif', inter: 'Inter, ui-sans-serif, system-ui, sans-serif', dmSans: 'DM Sans, ui-sans-serif, system-ui, sans-serif' };
  const RADII = { compact: '.65rem', standard: '1.15rem', rounded: '1.7rem', pill: '2.2rem' };
  const BUTTON_STYLES = new Set(['solid', 'soft', 'outline', 'glass']);
  const ICONS = {
    link: '<path d="M10 14 21 3M15 3h6v6M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/>',
    whatsapp: '<path fill-rule="evenodd" d="M16.001 3.092c-7.077 0-12.815 5.735-12.815 12.812 0 2.258.589 4.459 1.706 6.4L3 29l6.888-1.8a12.78 12.78 0 0 0 6.113 1.555h.005c7.075 0 12.812-5.737 12.812-12.815S23.076 3.092 16.001 3.092Zm7.52 18.105c-.317.893-1.849 1.705-2.54 1.808-.65.098-1.499.139-2.419-.163-.557-.182-1.272-.419-2.192-.815-3.858-1.665-6.375-5.558-6.569-5.816-.19-.258-1.571-2.09-1.571-3.986 0-1.895.994-2.826 1.347-3.211.352-.385.77-.481 1.026-.481.256 0 .513.003.737.014.237.011.555-.09.868.662.318.766 1.084 2.645 1.18 2.836.096.192.16.416.032.672-.128.257-.192.416-.385.64-.19.224-.4.5-.57.672-.19.19-.389.397-.166.78.223.385.992 1.635 2.13 2.65 1.465 1.307 2.7 1.711 3.084 1.903.385.192.609.16.833-.096.224-.257.962-1.12 1.218-1.504.256-.385.512-.32.866-.192.353.128 2.24 1.057 2.624 1.249.384.192.64.288.736.448.097.159.097.925-.22 1.818Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M14 21v-8h3l.5-3H14V8.5C14 7.6 14.3 7 15.7 7H18V4.3c-.4-.1-1.4-.3-2.7-.3-2.7 0-4.6 1.7-4.6 4.7V10H8v3h2.7v8"/>',
    tiktok: '<path d="M14 4v10.2a3.5 3.5 0 1 1-3-3.5"/><path d="M14 4c.7 2.8 2.2 4.4 5 4.8"/>',
    map: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    pix: '<path d="m7.6 4.5 2.2 2.2a3.1 3.1 0 0 0 4.4 0l2.2-2.2a2.2 2.2 0 0 1 3.1 0l2 2a2.2 2.2 0 0 1 0 3.1l-2.2 2.2a3.1 3.1 0 0 0 0 4.4l2.2 2.2a2.2 2.2 0 0 1 0 3.1l-2 2a2.2 2.2 0 0 1-3.1 0l-2.2-2.2a3.1 3.1 0 0 0-4.4 0l-2.2 2.2a2.2 2.2 0 0 1-3.1 0l-2-2a2.2 2.2 0 0 1 0-3.1l2.2-2.2a3.1 3.1 0 0 0 0-4.4L4.5 9.6a2.2 2.2 0 0 1 0-3.1l2-2a2.2 2.2 0 0 1 3.1 0Z"/>',
    phone: '<path d="M6.5 3.5 9 6.7 7.5 9c1 2.1 2.4 3.5 4.5 4.5l2.3-1.5 3.2 2.5-1.4 3.2c-.3.8-1.2 1.2-2 1-6.1-1.4-10.7-6-12.1-12.1-.2-.8.2-1.7 1-2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    share: '<circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 11 8-5M8 13l8 5"/>'
  };
  const LIMIT = { name: 80, slogan: 120, description: 360, mark: 6, title: 90, linkDescription: 160, label: 80, value: 140, pix: 180 };
  const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
  const string = (value, max) => typeof value === 'string' && value.trim() && value.trim().length <= max ? value.trim() : null;
  const hex = (value, fallback) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value.trim()) ? value.trim() : fallback;
  const visible = (value) => value !== false;
  const order = (value, fallback) => Number.isFinite(value) ? value : fallback;
  function url(value) { if (typeof value !== 'string' || !value.trim()) return null; try { const parsed = new URL(value.trim(), window.location.href); return ALLOWED_PROTOCOLS.includes(parsed.protocol) ? parsed.href : null; } catch (_) { return null; } }
  function media(value) { if (typeof value !== 'string' || !value.trim()) return null; try { const parsed = new URL(value.trim(), window.location.href); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : null; } catch (_) { return null; } }
  function colorValue(value) { const hexValue = value.replace('#', ''); return [0, 2, 4].map((index) => parseInt(hexValue.slice(index, index + 2), 16) / 255).map((item) => item <= .03928 ? item / 12.92 : ((item + .055) / 1.055) ** 2.4); }
  function contrast(a, b) { const luminance = (value) => { const rgb = colorValue(value); return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722; }; const [x, y] = [luminance(a), luminance(b)].sort((left, right) => right - left); return (x + .05) / (y + .05); }
  function readable(background) { return contrast(background, '#ffffff') >= 4.5 ? '#ffffff' : '#14201d'; }
  function element(tag, className, content) { const node = document.createElement(tag); if (className) node.className = className; if (content) node.textContent = content; return node; }
  function icon(name) { const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', name === 'whatsapp' ? '0 0 32 32' : '0 0 24 24'); svg.setAttribute('aria-hidden', 'true'); svg.innerHTML = ICONS[name] || ICONS.link; return svg; }
  function iconWrap(className, name) { const wrap = element('span', className); wrap.dataset.icon = name; wrap.append(icon(name)); return wrap; }
  function action(input, fallbackOrder) { const destination = url(input.url); const title = string(input.title, LIMIT.title); if (!visible(input.visible) || !title || !destination) return null; return { title, description: string(input.description, LIMIT.linkDescription) || '', icon: Object.prototype.hasOwnProperty.call(ICONS, input.icon) ? input.icon : 'link', url: destination, order: order(input.order, fallbackOrder) }; }

  function validate(config) {
    const issues = [];
    if (!isObject(config)) return { issues: ['O arquivo não contém um objeto JSON.'] };
    if (config.version !== 2) issues.push('A versão do catálogo deve ser 2.');
    const company = isObject(config.company) ? config.company : null;
    if (!company) issues.push('O bloco company é obrigatório.');
    const name = company && string(company.name, LIMIT.name);
    if (!name) issues.push('Informe company.name.');
    if (issues.length) return { issues };

    const themeInput = isObject(company.theme) ? company.theme : {};
    const theme = {};
    Object.keys(COLORS).forEach((key) => { theme[key] = hex(themeInput[key], COLORS[key]); });
    if (contrast(theme.text, theme.background) < 4.5) { console.warn('Cor de texto sem contraste suficiente; usando a cor padrão.'); theme.text = COLORS.text; }
    if (contrast(theme.muted, theme.background) < 3) theme.muted = COLORS.muted;
    const font = Object.prototype.hasOwnProperty.call(FONTS, themeInput.font) ? themeInput.font : 'manrope';
    const radius = Object.prototype.hasOwnProperty.call(RADII, themeInput.radius) ? themeInput.radius : 'standard';
    const radiusSmall = { compact: '.5rem', standard: '.8rem', rounded: '1.2rem', pill: '1.6rem' }[radius];

    const contacts = isObject(config.contacts) ? config.contacts : {};
    const buttons = [];
    const whatsapp = isObject(contacts.whatsapp) ? contacts.whatsapp : null;
    let whatsappDestination = null;
    if (whatsapp && visible(whatsapp.visible)) {
      const number = typeof whatsapp.number === 'string' ? whatsapp.number.replace(/\D/g, '') : '';
      whatsappDestination = url(whatsapp.url) || (number ? `https://wa.me/${number}${whatsapp.message ? `?text=${encodeURIComponent(whatsapp.message)}` : ''}` : null);
      if (whatsappDestination) buttons.push(action({ title: whatsapp.title || 'Falar no WhatsApp', description: whatsapp.description || '', url: whatsappDestination, icon: whatsapp.icon || 'whatsapp', visible: true, order: whatsapp.order }, 10));
    }
    const website = isObject(contacts.website) ? contacts.website : null;
    if (website) buttons.push(action({ ...website, title: website.title || 'Visitar website', icon: website.icon || 'globe' }, 20));
    const pix = isObject(contacts.pix) ? contacts.pix : null;
    if (pix && visible(pix.visible)) {
      if (url(pix.url)) buttons.push(action({ ...pix, title: pix.title || 'Pagar com Pix', icon: pix.icon || 'pix' }, 30));
      else if (string(pix.key, LIMIT.pix)) buttons.push({ title: string(pix.title, LIMIT.title) || 'Copiar chave Pix', description: string(pix.description, LIMIT.linkDescription) || 'Toque para copiar a chave Pix', icon: pix.icon || 'pix', copy: string(pix.key, LIMIT.pix), order: order(pix.order, 30) });
    }
    (Array.isArray(config.links) ? config.links : []).slice(0, 16).forEach((item, index) => { if (isObject(item)) buttons.push(action(item, 100 + index)); });
    const share = isObject(config.share) ? config.share : null;
    if (share && visible(share.visible)) buttons.push({ title: string(share.title, LIMIT.title) || 'Compartilhar catálogo', description: string(share.description, LIMIT.linkDescription) || '', icon: 'share', share: true, order: order(share.order, 900) });
    const actions = buttons.filter(Boolean).sort((left, right) => left.order - right.order);

    const socialInput = isObject(config.socials) ? config.socials : {};
    const socials = ['instagram', 'facebook', 'tiktok'].map((network) => {
      const item = socialInput[network];
      const destination = isObject(item) ? url(item.url) : typeof item === 'string' ? url(item) : null;
      return destination && (!isObject(item) || visible(item.visible)) ? { network, url: destination, label: isObject(item) ? string(item.label, LIMIT.label) || network : network } : null;
    }).filter(Boolean);

    const details = [];
    const location = isObject(contacts.location) ? contacts.location : null;
    if (location && visible(location.visible) && string(location.label, LIMIT.label)) details.push({ icon: 'map', label: 'Localização', value: string(location.label, LIMIT.label), url: url(location.url) });
    const hours = isObject(contacts.hours) ? contacts.hours : null;
    if (hours && visible(hours.visible) && string(hours.label, LIMIT.value)) details.push({ icon: 'clock', label: 'Horário', value: string(hours.label, LIMIT.value) });
    const google = isObject(contacts.google) ? contacts.google : null;
    if (google && visible(google.visible) && string(google.rating, 8)) details.push({ icon: 'star', label: 'Google', value: `${string(google.rating, 8)}${string(google.reviewCount, 30) ? ` · ${string(google.reviewCount, 30)}` : ''}`, url: url(google.url) });

    const productSection = isObject(config.productsSection) ? config.productsSection : {};
    const products = (Array.isArray(config.products) ? config.products : []).slice(0, 12).map((item, index) => {
      if (!isObject(item) || !visible(item.visible)) return null;
      const title = string(item.title, LIMIT.title); const description = string(item.description, LIMIT.description);
      if (!title || !description) return null;
      const contact = isObject(item.contact) ? item.contact : null;
      const contactUrl = contact && (url(contact.url) || (contact.type === 'whatsapp' ? whatsappDestination : null));
      return { title, description, image: media(item.image), price: string(item.price, 50), contact: contactUrl && visible(contact.visible) ? { title: string(contact.title, LIMIT.title) || 'Solicitar orçamento', url: contactUrl, icon: Object.prototype.hasOwnProperty.call(ICONS, contact.icon) ? contact.icon : 'whatsapp' } : null, order: order(item.order, index) };
    }).filter(Boolean).sort((left, right) => left.order - right.order);

    return { value: { company: { name, mark: string(company.mark, LIMIT.mark) || name.split(/\s+/).map((part) => part[0]).join('').slice(0, 3).toUpperCase(), slogan: string(company.slogan, LIMIT.slogan) || '', description: string(company.description, LIMIT.description) || '', logo: media(company.logo), cover: media(company.cover), theme: { ...theme, font: FONTS[font], radius: RADII[radius], radiusSmall, buttonStyle: BUTTON_STYLES.has(themeInput.buttonStyle) ? themeInput.buttonStyle : 'solid' } }, details, actions, socials, products, productsSection: { title: string(productSection.title, LIMIT.title) || 'Produtos e serviços', description: string(productSection.description, LIMIT.description) || '' } } };
  }

  function applyTheme(theme) {
    const values = { primary: theme.primary, secondary: theme.secondary, background: theme.background, surface: theme.surface, text: theme.text, muted: theme.muted, font: theme.font, radius: theme.radius, radiusSm: theme.radiusSmall, buttonText: readable(theme.primary) };
    Object.entries(values).forEach(([key, value]) => root.style.setProperty(`--catalogo-${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}`, value));
  }
  function renderButton(item) {
    const isCopy = Boolean(item.copy); const isShare = Boolean(item.share); const button = document.createElement(isCopy || isShare ? 'button' : 'a'); button.className = 'catalogo-button';
    if (isCopy) { button.type = 'button'; button.dataset.copy = item.copy; button.setAttribute('aria-label', `${item.title}: copiar chave Pix`); } else if (isShare) { button.type = 'button'; button.dataset.share = 'true'; } else { button.href = item.url; if (/^https?:/i.test(item.url)) { button.target = '_blank'; button.rel = 'noopener noreferrer'; } }
    const copy = element('span', 'catalogo-button__content'); copy.append(element('span', 'catalogo-button__title', item.title)); if (item.description) copy.append(element('span', 'catalogo-button__description', item.description)); button.append(iconWrap('catalogo-button__icon', item.icon), copy, element('span', 'catalogo-button__arrow', '›')); return button;
  }
  function renderDetail(item) {
    const node = document.createElement(item.url ? 'a' : 'div'); node.className = 'catalogo-info__item'; if (item.url) { node.href = item.url; if (/^https?:/i.test(item.url)) { node.target = '_blank'; node.rel = 'noopener noreferrer'; } }
    const copy = element('span', 'catalogo-info__copy'); copy.append(element('span', 'catalogo-info__label', item.label), element('span', 'catalogo-info__value', item.value)); node.append(iconWrap('catalogo-info__icon', item.icon), copy); return node;
  }
  function notice(message) { const old = document.querySelector('.catalogo-notice'); if (old) old.remove(); const node = element('div', 'catalogo-notice', message); node.setAttribute('role', 'status'); document.body.append(node); window.setTimeout(() => node.remove(), 2600); }
  function renderProduct(item) {
    const card = element('article', 'catalogo-product');
    if (item.image) { const image = document.createElement('img'); image.className = 'catalogo-product__image'; image.src = item.image; image.alt = item.title; image.loading = 'lazy'; card.append(image); }
    const body = element('div', 'catalogo-product__body'); const heading = element('h3', '', item.title); body.append(heading); if (item.price) body.append(element('p', 'catalogo-product__price', item.price)); body.append(element('p', 'catalogo-product__description', item.description));
    if (item.contact) { const contact = element('a', 'catalogo-product__contact', item.contact.title); contact.href = item.contact.url; if (/^https?:/i.test(item.contact.url)) { contact.target = '_blank'; contact.rel = 'noopener noreferrer'; } contact.prepend(iconWrap('catalogo-product__contact-icon', item.contact.icon)); body.append(contact); }
    card.append(body); return card;
  }

  function render(catalog) {
    const { company, details, actions, socials, products, productsSection } = catalog;
    applyTheme(company.theme); document.title = `${company.name} | Catálogo digital`;
    const meta = document.querySelector('meta[name="description"]'); if (meta) meta.content = company.description || `Links e informações de ${company.name}.`;
    root.replaceChildren(); const shell = element('main', 'catalogo-shell'); const card = element('article', 'catalogo-card'); card.dataset.buttonStyle = company.theme.buttonStyle;
    const hero = element('header', `catalogo-hero${company.cover ? ' catalogo-hero--cover' : ''}`);
    if (company.cover) { const cover = document.createElement('img'); cover.className = 'catalogo-hero__cover'; cover.src = company.cover; cover.alt = ''; hero.append(cover, element('div', 'catalogo-hero__veil')); }
    const profile = element('div', 'catalogo-profile'); const logo = element('div', 'catalogo-logo');
    if (company.logo) { const image = document.createElement('img'); image.src = company.logo; image.alt = `Logo ${company.name}`; logo.append(image); } else logo.textContent = company.mark;
    const heading = document.createElement('div'); heading.append(element('p', 'catalogo-hero__eyebrow', 'Catálogo digital'), element('h1', '', company.name)); profile.append(logo, heading); hero.append(profile); card.append(hero);
    if (company.slogan || company.description) { const intro = element('section', 'catalogo-intro'); if (company.slogan) intro.append(element('p', 'catalogo-slogan', company.slogan)); if (company.description) intro.append(element('p', 'catalogo-description', company.description)); card.append(intro); }
    if (details.length) { const info = element('section', 'catalogo-info'); info.setAttribute('aria-label', 'Informações da empresa'); details.forEach((item) => info.append(renderDetail(item))); card.append(info); }
    if (actions.length) { const actionList = element('nav', 'catalogo-actions'); actionList.setAttribute('aria-label', `Ações de ${company.name}`); actions.forEach((item) => actionList.append(renderButton(item))); card.append(actionList); }
    if (products.length) { const section = element('section', 'catalogo-products'); const heading = element('div', 'catalogo-products__heading'); heading.append(element('p', 'catalogo-section-label', 'Soluções LP Tech'), element('h2', '', productsSection.title)); if (productsSection.description) heading.append(element('p', '', productsSection.description)); section.append(heading); const grid = element('div', 'catalogo-products__grid'); products.forEach((item) => grid.append(renderProduct(item))); section.append(grid); card.append(section); }
    if (socials.length) { const socialList = element('nav', 'catalogo-socials'); socialList.setAttribute('aria-label', 'Redes sociais'); socials.forEach((item) => { const link = element('a', 'catalogo-social'); link.href = item.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.append(iconWrap('catalogo-social__icon', item.network), document.createTextNode(item.label)); socialList.append(link); }); card.append(socialList); }
    const footer = element('footer', 'catalogo-signature'); footer.append(document.createTextNode('Catálogo digital por ')); const lpTech = element('a', '', 'LP Tech'); lpTech.href = '../../'; footer.append(lpTech); card.append(footer); shell.append(card); root.append(shell);
    root.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(button.dataset.copy); notice('Chave Pix copiada.'); } catch (_) { notice('Não foi possível copiar automaticamente.'); } }));
    root.querySelectorAll('[data-share]').forEach((button) => button.addEventListener('click', async () => { const shareData = { title: document.title, text: company.description, url: window.location.href }; try { if (navigator.share) { await navigator.share(shareData); } else { await navigator.clipboard.writeText(window.location.href); notice('Link do catálogo copiado.'); } } catch (error) { if (error.name !== 'AbortError') notice('Não foi possível compartilhar agora.'); } }));
  }
  function renderError() { document.title = 'Catálogo em configuração'; root.replaceChildren(); const shell = element('main', 'catalogo-shell'); const card = element('section', 'catalogo-card catalogo-error'); card.setAttribute('role', 'status'); const link = element('a', '', 'Voltar para a LP Tech'); link.href = '../../'; card.append(element('div', 'catalogo-error__icon', '…'), element('h1', '', 'Este catálogo está sendo preparado'), element('p', '', 'Em breve você encontrará aqui os links e informações desta empresa.'), link); shell.append(card); root.append(shell); }
  async function start() { if (!root) return; try { const response = await fetch(root.dataset.catalogoConfig || './config.json', { cache: 'no-store' }); if (!response.ok) throw new Error(`Configuração indisponível (${response.status}).`); const result = validate(await response.json()); if (!result.value) { console.warn('Configuração de catálogo inválida:', result.issues); renderError(); return; } render(result.value); } catch (error) { console.warn('Não foi possível carregar o catálogo:', error); renderError(); } }
  start();
}());
