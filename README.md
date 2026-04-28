<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <br />
  <strong style="font-size: 1.35em; letter-spacing: -0.03em;">Adaptive Caret</strong><br />
  <span><sup>by Square²</sup> · <a href="https://square2.pt"><strong>square2.pt</strong></a></span>
  <br /><br />
  <a href="https://www.npmjs.com/package/@square2-inc/adaptive-caret" title="Versão npm"><img src="https://img.shields.io/npm/v/@square2-inc/adaptive-caret?style=flat-square&label=npm&color=1e293b&labelColor=0f172a" alt="npm version" /></a>
  &nbsp;
  <a href="https://github.com/Square2-Inc/AdaptiveCaret/blob/main/LICENSE" title="Licença"><img src="https://img.shields.io/npm/l/@square2-inc/adaptive-caret?style=flat-square&color=1e293b&labelColor=0f172a" alt="License MIT" /></a>
  <br /><br />
  <a href="https://square2.pt">Website</a>
  &nbsp;·&nbsp;
  <a href="https://github.com/Square2-Inc/AdaptiveCaret">GitHub</a>
  &nbsp;·&nbsp;
  <a href="https://www.npmjs.com/package/@square2-inc/adaptive-caret">npm</a>
  <br /><br />
</p>

Biblioteca JavaScript (TypeScript) da **[Square²](https://square2.pt)** que substitui o cursor nativo por um círculo que **muda para um “caret” vertical** sobre texto (altura alinhada à linha) e **amplia sobre botões e links**. Tamanhos, cores, transições e estilo de seleção de texto são configuráveis.

**Browser apenas** — chama `createAdaptiveCaret()` numa página com `document` (não suporta SSR sem guard).

---

## Instalação (npm)

```bash
npm install @square2-inc/adaptive-caret
```

## Utilização rápida

```ts
import {
  createAdaptiveCaret,
  PACKAGE_BRAND,
} from "@square2-inc/adaptive-caret";

// Metadados da marca (website, repo, nome do pacote) — opcional p.ex. para créditos
console.log(PACKAGE_BRAND.displayName); // "Adaptive Caret by Square²"
console.log(PACKAGE_BRAND.websiteUrl); // https://square2.pt

const caret = createAdaptiveCaret({
  cursorSize: 28,
  interactiveSize: 42,
  caretColor: "#2563eb",
  selectionBackground: "rgba(37, 99, 235, 0.25)",
});

// caret.destroy();
```

Marcar texto que deve usar o modo caret com o seletor por defeito (`[data-adaptive-caret-text], .text-hover`), por exemplo:

```html
<p class="text-hover">Hover para caret adaptativo</p>
```

Botões e âncoras (`button`, `a`, `[role="button"]` por defeito) ativam o modo “interativo” (círculo maior).

## API

### `createAdaptiveCaret(options?)`

Devolve `{ element, destroy }`:

| Membro | Descrição |
|--------|-----------|
| `element` | Nó DOM do cursor (`HTMLElement`). |
| `destroy()` | Remove o cursor, estilos de seleção desta instância, listeners e repõe `cursor` nativo onde foi aplicado `cursor: none`. |

### `PACKAGE_BRAND`

Objeto constante com identidade do pacote: `displayName`, `packageName`, `websiteUrl`, `repositoryUrl`, `organization`.

### Opções

| Opção | Tipo | Default | Descrição |
|-------|------|---------|-----------|
| `container` | `HTMLElement` | `document.body` | Onde o elemento do cursor é anexado. |
| `hideNativeCursor` | `boolean \| HTMLElement` | `true` (`<html>`) | `false` não esconde o cursor do sistema; ou passa um elemento para aplicar `cursor: none`. |
| `cursorSize` | `number \| string` | `28` | Diâmetro do círculo (px se número). |
| `interactiveSize` | `number \| string` | `42` | Diâmetro sobre alvos interativos. |
| `caretWidth` | `number \| string` | `4` | Largura da pill do caret. |
| `caretMinHeight` | `number` | `22` | Altura mínima do caret (px). |
| `caretMaxHeight` | `number` | `64` | Altura máxima do caret (px). |
| `transitionDuration` | `string \| number` | `"0.28s"` | Duração da transição de forma (string CSS ou ms). |
| `transitionEasing` | `string` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Easing do morph largura/altura/raio. |
| `transformTransition` | `string` | `"0.2s ease-out"` | Transição do `transform` (suavização do movimento). |
| `cursorColor` | `string` | `#0f0f0f` | Cor do círculo default / modo interativo. |
| `caretColor` | `string` | `#2563eb` | Cor do caret. |
| `cursorShadow` | `string` | (sombra default) | `box-shadow` do círculo. |
| `caretShadow` | `string` | (sombra default) | `box-shadow` no modo caret. |
| `interactiveShadow` | `string` | (sombra default) | `box-shadow` no modo interativo. |
| `selectionBackground` | `string` | — | Cor de fundo de `::selection` (injeta CSS global). |
| `selectionColor` | `string` | — | Cor do texto em `::selection`. |
| `textSelector` | `string` | `[data-adaptive-caret-text], .text-hover` | Seletor válido para `Element.closest()` — blocos de texto com caret. |
| `interactiveSelector` | `string` | `button, a, [role="button"]` | Seletor para modo círculo maior (prioridade sobre texto). |
| `zIndex` | `number \| string` | `99999` | `z-index` do cursor. |

Constantes por defeito estão também em `DEFAULT_ADAPTIVE_CARET` (export nomeado).

### Exportes avançados

- `resolveOptions`, `applyCursorVariables`, `sizeToCss`, `durationToCss` — úteis para temas ou testes.

## Demo local

Com dependências instaladas e `npm run build` executado:

```bash
npx serve .
```

Abre `http://localhost:3000/examples/` (porta pode variar) e carrega [`examples/index.html`](examples/index.html), que importa [`dist/index.js`](dist/index.js).

## Build do pacote

```bash
npm install
npm run build
```

Gera `dist/` (ESM, CJS e `.d.ts`).

## Publicar no npm (mantenedores)

1. Conta npm com permissão no scope `@square2-inc` e login: `npm login`
2. Na raiz do repo: `npm publish --access public` (executa `prepublishOnly` → build)

Se o scope `@square2-inc` ainda não existir na npm, cria a organização em [npmjs.com/org/create](https://www.npmjs.com/org/create) ou publica com utilizador autorizado no scope.

## Acessibilidade

Esconder o cursor nativo pode prejudicar utilizadores que dependem do ponteiro visível ou de tecnologias assistivas. Avalia `hideNativeCursor: false` durante testes ou oferece alternativa (por exemplo, respeitar `prefers-reduced-motion` numa versão futura).

Os estilos `::selection` são **globais ao documento**; podem interagir com CSS existente no site.

## Licença

MIT — ver [LICENSE](LICENSE).

## Ligação ao GitHub

```bash
git remote add origin https://github.com/Square2-Inc/AdaptiveCaret.git
git branch -M main
git push -u origin main
```
