# Guia: conta npm, login e publicar o pacote

Este projeto publica-se como **`@square2-inc/adaptive-caret`**. Segue os passos por ordem.

---

## O que vais precisar

- Conta em [npmjs.com](https://www.npmjs.com/signup) (já tens).
- Permissão para publicar no **scope** `@square2-inc` (organização na npm com esse nome **ou** a tua conta adicionada como membro dessa org).
- Terminal (PowerShell ou CMD) no Windows.

---

## Passo 1 — Organização `@square2-inc` na npm

Pacotes com nome `@algo/...` pertencem a uma **organização** (ou ao teu utilizador, se usares `@oteuuser/...`).

Para **`@square2-inc/adaptive-caret`**:

1. Abre [npmjs.com/org/create](https://www.npmjs.com/org/create).
2. Cria a organização **`square2-inc`** (nome livre na npm; tem de coincidir com o prefixo do `package.json`).
3. Convida os membros da equipa se for preciso.

**Se a organização já existir** e não fores o dono: pede a um administrador para te adicionar à org `square2-inc` com permissão de **publish**.

---

## Passo 2 — Login no npm pelo terminal

No PowerShell:

```powershell
npm login
```

O comando pede:

1. **Username** — o teu nome de utilizador npm (não é o email).
2. **Password** — a palavra-passe da conta npm.
3. **Email** — email da conta (mostrado como “Public”).
4. **OTP** — só se tiveres **2FA** ativo: abre a app de autenticação e cola o código de 6 dígitos.

Mensagem de sucesso típica: `Logged in as <username> on https://registry.npmjs.org/`.

Verifica:

```powershell
npm whoami
```

Deve imprimir o teu username.

---

## Passo 3 — Ir à pasta do projeto e construir

```powershell
cd "C:\Users\iunic\Desktop\Projetos\AdaptiveCaret"
npm install
npm run build
```

Tem de concluir sem erros e criar a pasta `dist/`.

---

## Passo 4 — Publicar

```powershell
npm publish --access public
```

- **`--access public`** é obrigatório para pacotes **scoped** (`@square2-inc/...`) serem visíveis para toda a gente.

O npm corre automaticamente `prepublishOnly`, que volta a fazer `npm run build`.

---

## Passo 5 — Confirmar no browser

Abre:

**https://www.npmjs.com/package/@square2-inc/adaptive-caret**

Se aparecer a página do pacote com a versão (ex.: `0.1.0`), está feito.

Instalar noutro projeto:

```powershell
npm install @square2-inc/adaptive-caret
```

---

## Problemas frequentes

### `ENEEDAUTH` ou “need auth”

Não estás com sessão iniciada. Corre outra vez `npm login` e depois `npm whoami`.

### `403 Forbidden` ou “You do not have permission to publish”

- A conta não pertence à organização **`square2-inc`** na npm, ou não tem role que permita publicar.
- Solução: entrar na org em [npmjs.com/org/square2-inc](https://www.npmjs.com/org/square2-inc) (ajusta o URL se o nome for outro) e pedir **owner**/**admin** para te dar permissão, ou publicar com uma conta que já tenha essa permissão.

### OTP / 2FA

Se ativaste dois fatores na npm, cada `npm login` e por vezes cada `npm publish` pode pedir código da app de autenticação.

### Nome do pacote já existe com essa versão

Para republicar o mesmo número de versão não é permitido. No `package.json`, aumenta **`version`** (ex.: `0.1.1`) e volta a `npm publish`.

---

## GitHub: não confundir com npm

- **`npm login`** → registo de pacotes JavaScript (npmjs.com).
- **`git push`** → código no GitHub.

São contas diferentes (npm vs GitHub), embora possas usar o mesmo email.
