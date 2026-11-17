# LP Tech — Site institucional

Landing page estática da LP Tech, construída com React, TypeScript e Vite. O resultado do build é uma pasta `dist/`, compatível com GitHub Pages.

## Executar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Publicar no GitHub Pages

O arquivo [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) faz o deploy ao receber um push na branch `main`.

No GitHub, abra **Settings → Pages** e selecione **GitHub Actions** como fonte de publicação. O workflow configura o caminho base automaticamente a partir do nome do repositório.

## Configurações pendentes

- Adicione o arquivo da logo e defina seu caminho em `src/config/site.ts`, no campo `logoPath`.
- Informe o número comercial com DDI no campo `whatsapp.number` do mesmo arquivo. Enquanto estiver vazio, os botões exibem um aviso e não levam a link externo.
- As imagens dos produtos ainda são placeholders abstratos intencionais. Podem ser substituídas nos componentes de mídia em `src/App.tsx`.
- Configure o domínio personalizado no GitHub Pages quando estiver disponível.

## Próximos passos de arquitetura

Hoje há apenas a landing page em `/`. Quando as funcionalidades estiverem definidas, uma solução de rotas poderá acrescentar `/pix/:slug` e `/links/:slug`, mantendo `src/config` para dados institucionais e `src/data` para o conteúdo dos produtos.
