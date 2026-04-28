# Demo ao vivo (GitHub Pages)

O repositório inclui **`docs/index.html`**, uma página estática que carrega **`@square2-inc/adaptive-caret`** a partir do [jsDelivr](https://www.jsdelivr.com/) (CDN do npm). Assim o visitante vê o cursor a funcionar sem clonar o repo.

## Ativar no GitHub (uma vez)

1. No repositório: **Settings** → **Pages** (menu lateral).
2. Em **Build and deployment** → **Source**: escolhe **Deploy from a branch**.
3. **Branch**: `main` (ou a branch por defeito).
4. **Folder**: **`/docs`** (pasta `docs`, não root).
5. **Save**.

Em cerca de um minuto, o site fica disponível em:

**https://square2-inc.github.io/AdaptiveCaret/**

(O URL segue o formato `https://<organização-em-minúsculas>.github.io/<nome-do-repo>/`.)

## Requisitos

- O pacote tem de estar **publicado no npm** com o mesmo nome e versão referenciada em `docs/index.html` (linha do `import` com `@0.1.0` ou atualiza para a versão actual).

## Actualizar a versão na demo

Quando publicares uma nova versão no npm, edita em **`docs/index.html`** a URL do jsDelivr para corresponder (ex.: `@0.1.1`).
