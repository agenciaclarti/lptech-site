# LP Tech — Site institucional

Landing page inteiramente estática, feita com HTML, CSS e JavaScript puro. Não requer Node.js, Vite, React ou qualquer etapa de build para funcionar no GitHub Pages.

## Executar localmente

Abra `index.html` no navegador. Para testar links e carregamento de arquivos em um servidor local, qualquer servidor HTTP simples funciona.

## Publicar no GitHub Pages

O arquivo [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica os arquivos estáticos ao receber um push na branch `main`, sem instalar dependências.

No GitHub, abra **Settings → Pages** e selecione **GitHub Actions** como fonte de publicação.

## Configuração

- Para ativar os botões de contato, preencha `WHATSAPP_NUMBER` em [`script.js`](script.js) somente com dígitos e DDI — por exemplo, `5581999999999`.
- A mensagem inicial do WhatsApp fica na constante `WHATSAPP_MESSAGE` no mesmo arquivo.
- Os estilos ficam em [`src/styles.css`](src/styles.css), e as imagens em `assets/images/`.
