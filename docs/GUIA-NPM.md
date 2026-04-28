# Guia: conta npm, login e publicar o pacote

Este projeto publica-se como **`@square2-inc/adaptive-caret`**. Segue os passos por ordem.

---

## O que vais precisar

- Conta em [npmjs.com](https://www.npmjs.com/signup) (já tens).
- Permissão para publicar no **scope** `@square2-inc` (organização na npm com esse nome **ou** a tua conta adicionada como membro dessa org).
- Terminal (PowerShell ou CMD) no Windows.
- **Autenticação de dois fatores (2FA)** ativa na conta npm — a npm **exige 2FA para publicar** pacotes (mensagem de erro típica abaixo). Sem isto, `npm publish` devolve **403**.

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

Antes do primeiro `publish`, confirma que a **2FA está ligada** na conta: [npmjs.com](https://www.npmjs.com) → avatar → **Account** → **Two-factor authentication** → **Enable** (recomendado: **Authenticator app**).

```powershell
npm publish --access public
```

- **`--access public`** é obrigatório para pacotes **scoped** (`@square2-inc/...`) serem visíveis para toda a gente.
- Durante o publish, o npm pode pedir um **código OTP** (6 dígitos da app de autenticação).

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

### `403` — “Two-factor authentication … is required to publish packages”

Isto é **política da npm**: para **publicar** tens de cumprir **uma** destas condições:

1. **Ter 2FA ativo na conta npm** (recomendado para utilizadores humanos).
   - [npmjs.com](https://www.npmjs.com) → avatar → **Account** (ou **Profile**) → **Two-factor authentication** → **Enable**.
   - Preferência: **Authenticator app** (Google Authenticator, Bitwarden, 1Password, etc.).
   - Guarda os **códigos de recuperação** num sítio seguro.
   - Depois: `npm logout`, `npm login` (cola o **OTP** quando pedir), e volta a `npm publish --access public` (pode pedir **OTP** outra vez).

2. **Token granular** com permissões explícitas para publicação (mais comum em CI ou políticas de empresa). Na npm: **Access Tokens** → **Generate New Token** → **Granular Access Token**, com permissão de escrita/publicação no pacote ou na organização. A própria npm indica quando um token pode **contornar** requisitos de 2FA para automatização — segue a documentação actual ao criares o token.
   - **Nunca** commits o token para o Git. Usa variável de ambiente ou `~/.npmrc` só na tua máquina.

Se já tens 2FA e continua o 403, verifica também a secção seguinte (permissões na org).

### `403 Forbidden` — “You do not have permission to publish” (outros casos)

- A conta não pertence à organização **`square2-inc`** na npm, ou não tem role que permita publicar.
- Solução: entrar na org em [npmjs.com/org/square2-inc](https://www.npmjs.com/org/square2-inc) (ajusta o URL se o nome for outro) e pedir **owner**/**admin** para te dar permissão, ou publicar com uma conta que já tenha essa permissão.

### OTP / 2FA

Com **2FA** ativo, `npm login` e `npm publish` podem pedir o código de **6 dígitos** da app de autenticação em cada operação sensível.

### Nome do pacote já existe com essa versão

Para republicar o mesmo número de versão não é permitido. No `package.json`, aumenta **`version`** (ex.: `0.1.1`) e volta a `npm publish`.

---

## GitHub: não confundir com npm

- **`npm login`** → registo de pacotes JavaScript (npmjs.com).
- **`git push`** → código no GitHub.

São contas diferentes (npm vs GitHub), embora possas usar o mesmo email.
