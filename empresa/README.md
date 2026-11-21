# Sistema de catálogos digitais

Cada diretório dentro de `empresa/` é um catálogo estático, com URL permanente e arquivo `index.html` próprio. Não há roteamento SPA, banco de dados, autenticação ou etapa de build.

```text
empresa/
├── shared/                 # Motor e estilos comuns — não duplicar
├── template/               # Base para novos catálogos
├── lptech/                 # /empresa/lptech/
└── cremousse/              # /empresa/cremousse/
```

## Cadastrar uma empresa

1. Duplique `empresa/template/` para `empresa/<slug>/`, usando letras minúsculas, números e hífens no slug.
2. Mantenha o `index.html` do modelo. Ele usa caminhos relativos para `../shared/` e `./config.json`.
3. Edite `config.json`: substitua o nome, a descrição, a paleta e os dados reais da empresa.
4. Adicione logo, capa e fotos em `empresa/<slug>/assets/`; referencie-os com caminhos como `./assets/logo.png`.
5. Ative cada canal apenas quando seu destino for real, usando `"visible": true`. Remova ou mantenha como `false` qualquer informação ausente.
6. Acesse `/<base-do-site>/empresa/<slug>/` por HTTP e valide antes de gravar essa URL em uma placa NFC ou QR Code.

Não é preciso criar regras de redirecionamento: `index.html` permite acesso direto à URL da empresa em GitHub Pages e Cloudflare Pages.

## Configuração

`company.theme` controla a identidade visual com variáveis CSS: `primary`, `secondary`, `background`, `surface`, `text`, `muted`, `font` (`manrope`, `inter` ou `dmSans`), `radius` (`compact`, `standard`, `rounded` ou `pill`) e `buttonStyle` (`solid`, `soft`, `outline` ou `glass`).

`contacts` comporta WhatsApp, website, localização, horário, nota Google e Pix. `socials` aceita Instagram, Facebook e TikTok. Para links e botões, use `title`, `description`, `icon`, `url`, `visible` e `order`. A seção opcional `products` aceita `image`, `title`, `description`, `price`, `visible`, `order` e `contact`; `share` habilita o compartilhamento nativo ou a cópia do link como fallback.

O modelo usa exemplos sem canais comerciais ativos. Nunca publique uma chave Pix, telefone, avaliação, preço, horário ou rede social fictícios.

## Segurança, acessibilidade e operação

- O motor cria textos com APIs DOM, sem inserir HTML vindo do JSON.
- URLs de ações são limitadas a `https`, `http`, `mailto` e `tel`; dados com `javascript:` são descartados.
- Cores de texto com contraste insuficiente voltam para valores seguros.
- Imagens têm `alt`, controles exibem foco visível e animações respeitam `prefers-reduced-motion`.
- Campos e seções não configurados não são renderizados. JSON ausente, inválido ou com versão incorreta apresenta uma mensagem amigável.
- Os catálogos usam somente HTML, CSS, JavaScript e JSON. As únicas fontes remotas são opcionais e possuem fallback de sistema.

O diretório `empresa/` já está incluído no artefato do GitHub Pages. Para Cloudflare Pages, publique a raiz do repositório sem comando de build. Não altere `shared/` para personalizações de uma empresa: coloque-as em seu `config.json` e `assets/`.
