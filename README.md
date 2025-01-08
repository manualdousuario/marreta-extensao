# ![Ícone do Marreta](./icons/icon48.png "Ícone do Marreta") Extensão de Navegador do Marreta

Use facilmente o [Marreta](https://marreta.pcdomanual.com/).

Com o botão direito do mouse acesse o conteúdo da página atual ou de um link específico. Pela barra de ferramentas (após fixar a extensão), acesse diretamente o conteúdo da página clicando no ícone. A extensão abre uma nova aba para acesso de link.

## Firefox

![Firefox](./readme-assets/firefox.jpg "Firefox")

### Firefox Add-ons

[![Get the add-on](readme-assets/amo_badge.png 'Get the add-on')](https://addons.mozilla.org/en-US/firefox/addon/marreta/)

### Arquivo XPI

- Faça o download da última versão do arquivo [`marreta-firefox.xpi`](https://github.com/manualdousuario/marreta-extensao/releases).
- Abra o Firefox e navegue até `about:addons`.
- No ícone de engrenagem das configurações, clique em "Instalar de um arquivo..." (localizado no canto superior direito).
- Selecione o arquivo XPI da extensão.
- Fixar na barra de ferramentas.
- Na página de detalhes da extensão, pode ser necessário permitir a opção "Funcionamento em sites com restrições".

## Chromium

![Chromium](./readme-assets/chromium.jpg "Chromium")

Instalação em navegadores baseados no Chromium.

- Faça o download da última versão do arquivo [`marreta-chromium.zip`](https://github.com/manualdousuario/marreta-extensao/releases).
- Extraia o arquivo ZIP.
- Abra o navegador e vá para `chrome://extensions`.
- Ative o "Modo Desenvolvedor" (localizado no canto superior direito).
- Clique no botão "Carregar sem compactação" (localizado no canto superior esquerdo).
- Navegue até o diretório onde você extraiu o arquivo ZIP contendo a extensão.
- Selecione a pasta da extensão.
- Fixar na barra de ferramentas.

## Desenvolvimento

### Pré-requisitos

- Node.js 20+
- yarn 4.5+

### Instalação

```bash
git clone git@github.com:manualdousuario/marreta-extensao.git
```

```bash
cd marreta-extensao
```

```bash
yarn install
```

### Dev

Copiar os ícones para os diretórios de cada versão (Chromium e Firefox).

```bash
yarn dev
```

### Build

Compactar os arquivo.

```bash
yarn build
```

## Roadmap

- Página de configurações
    - Lista customizada para acesso automático
    - Target dos links e páginas (atualiza aba ou nova aba)
    - Suporte para o Firefox Android
