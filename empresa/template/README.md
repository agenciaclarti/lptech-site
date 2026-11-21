# Modelo para nova empresa

Copie todo este diretório e renomeie-o para o slug da empresa, por exemplo `empresa/minha-empresa/`. O modelo já contém `index.html`, `config.json` e `assets/`.

Depois, altere somente `config.json` e adicione imagens em `assets/`. Para logo e capa, inclua os campos abaixo dentro de `company` quando os arquivos existirem:

```json
"logo": "./assets/logo.png",
"cover": "./assets/capa.jpg"
```

Nenhum contato do modelo está ativo. Antes de ligar um botão ou canal, substitua os valores de exemplo e altere `visible` para `true`.

Leia [`../README.md`](../README.md) para a referência completa de campos, segurança, publicação e validação.
