---
name: Code Review - Build & Vite Safety
description: Enforce Vite build compatibility, ESM standards, environment variable patterns, asset imports, and bundle optimization
applyTo: '**/*.ts, **/*.tsx, src/**, vite.config.ts, **/.env*'
---

Ensure all code is compatible with Vite build, TypeScript compilation, and ESM standards. Prevent build failures and bundle bloat.

## 🏗️ Build Success & Type Safety

**DO:** Code must pass `tsc -b` and `pnpm run build`. All props explicitly typed, no implicit any.

**DON'T:** Write code with type errors (implicit any, typos) that block build.

## 🔄 Import Patterns (TS vs TSX)

**DO:** Keep .ts files JSX-free. .ts → .tsx imports OK. .tsx → .ts imports OK. Never .tsx → .ts when .ts needs JSX.

**DON'T:** Import .tsx from .ts context or write JSX in .ts files. Breaks Vite HMR and build.

## ⚡ Dynamic Imports & Code Splitting

**DO:** Use `React.lazy(() => import('@/pages/Page'))` wrapped in `<Suspense>` for route code splitting.

**DON'T:** Raw dynamic imports for components. Pattern `const Page = () => import(...)` is wrong.

## 📦 ESM Only (No CommonJS)

**DO:** Use `import`/`export` exclusively. ESM is the standard.

**DON'T:** Use `require()`, `module.exports`, or `exports.x =`. CommonJS breaks Vite.

## 🌍 Environment Variables

**DO:** Use `import.meta.env.VITE_API_URL` for client-exposed vars. Built-in: `import.meta.env.DEV`, `import.meta.env.PROD`.
```tsx
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  isDev: import.meta.env.DEV
};
```

**DON'T:** Use `process.env` (doesn't work client-side). Don't expose secrets without `VITE_` prefix.

## 🔒 Client vs Server Code Separation

**DO:** Keep Node.js code (crypto, fs, path) server-side only. Never import in `src/`.

**DON'T:** Import Node.js builtins in client code. Bundles will fail or bloat.

## 🖼️ Asset Imports

**DO:** SVG as component: `import Logo from '@/assets/logo.svg?react'`. SVG as URL: `import logoUrl from '@/assets/logo.svg'`. Images: `import img from '@/assets/hero.png'`.

**DON'T:** String paths like `"/src/assets/logo.svg"` (breaks in build). Missing `?react` suffix for SVG components.

## 📊 Bundle Optimization

**DO:** Lazy load heavy libs (recharts, moment). Use `React.lazy()` + `<Suspense>` for chart components.

**DON'T:** Synchronous imports of heavy libraries at top level. Avoid `import * as lodash` (use tree-shakeable imports). Replace moment (67KB) with date-fns or native Intl.

## 📤 Barrel Export Patterns

**DO:** Selective exports in barrel files.
```tsx
// index.ts
export { Button } from './button';
export { Input } from './input';
```

**DON'T:** Use `export * from './module'`. Forces bundler to include entire module tree, breaks tree-shaking.

---

## ✅ CHECKLIST

- [ ] `pnpm run build` succeeds — no type errors blocking `tsc -b`
- [ ] No `.tsx` imports from `.ts` context (breaks Vite HMR)
- [ ] Dynamic imports use `React.lazy(() => import(...))`
- [ ] No CommonJS `require()` — ESM only
- [ ] Environment variables via `import.meta.env`, not `process.env`
- [ ] `import.meta.env` variables have `VITE_` prefix for client
- [ ] No Node.js builtins (crypto, fs) in client code
- [ ] Assets imported correctly (SVG with `?react` or as URL)
- [ ] Heavy libs lazy loaded, not synchronous top-level imports
- [ ] Barrel files use selective exports, not `export *`

---

## 🚩 FLAG LEVELS

**🔴 Critical:** Type errors blocking build, CommonJS in code, `process.env` usage, Node.js imports in client, secrets without VITE_ prefix

**🟠 High Priority:** .tsx in .ts imports (breaks HMR), raw dynamic imports, string asset paths, heavy synchronous imports, `export *` barrels

**🟡 Suggestions:** Additional code splitting, bundle optimization, selective exports, asset optimization
