---
name: Code Review - Security
description: Enforce security best practices including secret management, XSS prevention, input sanitization, secure storage, and dependency security
applyTo: '**/*.ts, **/*.tsx, **/*.js, **/*.jsx, src/**, **/.env*, .gitignore'
---

Prevent common security vulnerabilities including XSS, injection attacks, secret exposure, and insecure data storage.

## 🔐 Secret Management

**DO:** Use environment variables in `.env` (gitignored). Client vars need `VITE_` prefix. Server secrets have no prefix (not exposed to client).

**DON'T:** Hardcode API keys, tokens, passwords in source code. Never commit secrets to git. Don't expose server secrets in client bundle.

## 🛡️ XSS Prevention

**DO:** React escapes automatically—use it. For HTML rendering, sanitize with DOMPurify before `dangerouslySetInnerHTML`. Whitelist allowed tags/attributes.

**DON'T:** Use `dangerouslySetInnerHTML` without sanitization. Never trust user-generated HTML. Direct injection of user input into innerHTML is XSS vulnerability.

## 🧹 Input Sanitization

**DO:** Validate all user input with schema validation (zod, yup). Sanitize before API calls: trim, limit length, encode. Use `encodeURIComponent` for URLs, `maxLength` on inputs.

**DON'T:** Trust user input directly. No validation = injection risk. Don't build URLs/queries with unsanitized user data.

## 🚫 No eval() or Function Constructor

**DO:** Use `JSON.parse()` for data. Object lookup for dynamic property access: `handlers[action]()`

**DON'T:** Use `eval()`, `new Function()`, or indirect eval (`window['eval']`). All enable arbitrary code execution.

## 🔗 URL Validation (Open Redirect/XSS Prevention)

**DO:** Validate URLs before use: check protocol is `http:` or `https:`. Use `new URL()` to parse safely. Always add `rel="noopener noreferrer"` on external links.

**DON'T:** Use unvalidated URLs in `href`, `window.location.href`, or `redirect()`. Beware `javascript:` protocol XSS.

## 📦 Dependency Security

**DO:** Run `pnpm audit` regularly. Fix vulnerabilities with `pnpm audit --fix`. Keep dependencies updated with `pnpm update`.

**DON'T:** Ignore security warnings. Using packages with known high/critical vulnerabilities is security debt.

## 💾 Secure Data Storage

**DO:** Store only non-sensitive data in localStorage (theme, language, preferences). Use httpOnly cookies for auth tokens (server-side). Encrypt sensitive data if localStorage necessary.

**DON'T:** Store tokens, API keys, passwords, PII, credit cards in localStorage/sessionStorage. XSS can read all localStorage.

## 🌐 CORS & Auth Headers

**DO:** Handle auth server-side with httpOnly cookies. Use `credentials: 'include'` in fetch. Server adds auth headers, not client.

**DON'T:** Expose auth tokens in client code. Don't hardcode Bearer tokens. CORS configured server-side only.

---

## ✅ CHECKLIST

- [ ] No secrets, API keys, tokens in source code or committed `.env` files
- [ ] `dangerouslySetInnerHTML` absent or sanitized with DOMPurify
- [ ] User inputs validated/sanitized before rendering or API calls
- [ ] No `eval()` or `new Function()` usage
- [ ] External URLs validated before use (prevent open redirect/XSS)
- [ ] Dependencies checked with `pnpm audit` — no known vulnerabilities
- [ ] No sensitive data in `localStorage` unencrypted
- [ ] CORS and auth headers handled server-side, not in client code

---

## 🚩 FLAG LEVELS

**🔴 Critical:** Hardcoded secrets, eval() usage, dangerouslySetInnerHTML without sanitization, sensitive data in localStorage, auth tokens in client

**🟠 High Priority:** Unvalidated URLs (open redirect), unsanitized user input, known vulnerable dependencies (high severity), missing rel="noopener noreferrer"

**🟡 Suggestions:** Update moderate vulnerabilities, add input validation, implement CSP, use SRI for CDN resources
