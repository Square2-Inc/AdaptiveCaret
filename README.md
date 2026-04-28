# adaptive-caret

Biblioteca JavaScript (TypeScript) que substitui o cursor nativo por um círculo que **muda para um “caret” vertical** sobre texto (altura alinhada à linha) e **amplia sobre botões e links**. Tamanhos, cores, transições e estilo de seleção de texto são configuráveis.

**Browser apenas** — chama `createAdaptiveCaret()` numa página com `document` (não suporta SSR sem guard).

Repositório: [Square2-Inc/AdaptiveCaret](https://github.com/Square2-Inc/AdaptiveCaret)

## Instalação

```bash
npm install adaptive-caret
```

## Utilização rápida

```ts
import { createAdaptiveCaret } from "adaptive-caret";

const caret = createAdaptiveCaret({
  cursorSize: 28,
  interactiveSize: 42,
  caretColor: "#2563eb",
  selectionBackground: "rgba(37, 99, 235, 0.25)",
});

// Para remover listeners e o elemento injetado:
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

## Publicar no npm

1. Conta npm e login: `npm login`
2. Verificar conteúdo: `npm pack --dry-run`
3. Publicar: `npm publish` (executa `prepublishOnly` → build)

Ajusta o campo `"name"` em [`package.json`](package.json) se precisares de um scope (`@org/adaptive-caret`).

## Acessibilidade

Esconder o cursor nativo pode prejudicar utilizadores que dependem do ponteiro visível ou de tecnologias assistivas. Avalia `hideNativeCursor: false` durante testes ou oferece alternativa (por exemplo, respeitar `prefers-reduced-motion` numa versão futura).

Os estilos `::selection` são **globais ao documento**; podem interagir com CSS existente no site.

## Licença

MIT — ver [LICENSE](LICENSE).

## Ligação ao GitHub

Se o projeto ainda não estiver versionado:

```bash
git init
git add .
git commit -m "feat: initial adaptive-caret library"
git branch -M main
git remote add origin https://github.com/Square2-Inc/AdaptiveCaret.git
git push -u origin main
```

Substitui a URL por SSH (`git@github.com:Square2-Inc/AdaptiveCaret.git`) se preferires.
