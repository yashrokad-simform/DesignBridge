---
name: Code Review - Consolidated Checklist
description: Master code review instructions consolidating all review guidelines. Refer to linked files for detailed patterns and examples.
applyTo: 'src/**, **/*.ts, **/*.tsx, **/*.jsx, **/*.css'
---

## 📋 REVIEW FILE REFERENCES (Priority Order)

Before reviewing, consult these detailed guides in order of priority:

1. **[Tailwind](./code-review-tailwind.instructions.md)** - CSS utilities, tokens, dark mode
2. **[shadcn/ui](./code-review-shadcn.instructions.md)** - Component patterns, CVA, Radix
3. **[Accessibility](./code-review-accessibility.instructions.md)** - WCAG AA, ARIA, keyboard nav
4. **[React](./code-review-react.instructions.md)** - Hooks, patterns, component purity
5. **[TypeScript](./code-review-typescript.instructions.md)** - Type safety, generics, assertions
6. **[Lint](./code-review-lint.instructions.md)** - ESLint rules, formatting, imports
7. **[Structure](./code-review-structure.instructions.md)** - File naming, architecture
8. **[Performance](./code-review-performance.instructions.md)** - Re-renders, memoization, splitting
9. **[Security](./code-review-security.instructions.md)** - XSS, secrets, sanitization
10. **[Build](./code-review-build.instructions.md)** - Vite, ESM, environment vars

---

## ⚡ CRITICAL VIOLATIONS (🔴 Block Merge)

### Tailwind
- Arbitrary values: `bg-[#fff]`, `w-[372px]`, hardcoded colors, `!important`

### shadcn/ui
- Direct file imports (not barrel), removing Radix `aria-*` props, modifying shadcn files

### Accessibility
- Non-keyboard accessible interactions, icon buttons without labels, removed focus styles, unlabeled inputs, `tabIndex > 0`

### React
- Conditional hooks, missing cleanup (memory leaks), async in useEffect callback, anonymous components

### TypeScript
- `any` usage, unsafe assertions, missing prop types, `ts-ignore` without explanation

### Lint
- ESLint errors, exhaustive-deps violations, `any` type, circular dependencies

### Structure
- Pages with named exports (breaks React.lazy), JSX in .ts files, cross-feature direct imports

### Performance
- Memory leaks (no cleanup), useEffect empty deps fetching data, index as dynamic list key

### Security
- Hardcoded secrets, `eval()`, `dangerouslySetInnerHTML` unsanitized, sensitive data in localStorage

### Build
- Type errors blocking build, CommonJS `require()`, `process.env` usage, Node.js in client

---

## ✅ CONSOLIDATED CHECKLIST

**Styling & UI**
- [ ] Semantic tokens (`bg-background`), no arbitrary values
- [ ] Dark mode `dark:` variants with semantic colors
- [ ] shadcn imports from `@/components/ui/` barrel
- [ ] CVA variants followed, `asChild` with Link
- [ ] `cn()` for conditional classes (no template literals)

**Accessibility**
- [ ] Keyboard accessible (Tab, Enter, Space, Escape)
- [ ] `aria-label` on icon buttons, form labels via `htmlFor`
- [ ] WCAG AA contrast (4.5:1 text, 3:1 large)
- [ ] Focus-visible styles (no bare `outline-none`)
- [ ] Images have meaningful `alt` or empty for decorative

**React & Hooks**
- [ ] Components pure, side effects in useEffect
- [ ] Complete dependencies in hooks (exhaustive-deps)
- [ ] useEffect cleanup for timers/listeners/subscriptions
- [ ] Stable keys (not index for dynamic lists)
- [ ] React.lazy + Suspense for routes

**TypeScript**
- [ ] No `any` (use `unknown`, generics, unions)
- [ ] Props typed with `interface` or `type`
- [ ] Type assertions justified with comments
- [ ] Return types on exported functions

**Code Quality**
- [ ] No ESLint errors/warnings
- [ ] No unused imports/variables/commented code
- [ ] No `console.log` (use logger utility)
- [ ] Import order: external → `@/` → relative → types
- [ ] Prettier formatted (2 spaces, single quotes)

**Architecture**
- [ ] Folders kebab-case, components PascalCase.tsx
- [ ] Hooks `use` prefix, services `Service` suffix
- [ ] Pages use default exports
- [ ] No business logic in pages (delegate to hooks/services)
- [ ] Barrel exports via `index.ts`

**Performance**
- [ ] Heavy computations in `useMemo` with correct deps
- [ ] Event handlers in `useCallback` when passed to memoized children
- [ ] No synchronous heavy lib imports (lazy load)
- [ ] Images have width/height (prevent CLS)

**Security**
- [ ] No secrets in source code (use `.env`)
- [ ] User input validated/sanitized (zod schemas)
- [ ] No `eval()` or `new Function()`
- [ ] URLs validated before use (prevent XSS/redirect)
- [ ] External links have `rel="noopener noreferrer"`

**Build**
- [ ] `pnpm run build` succeeds (no type errors)
- [ ] ESM only (no `require()`, use `import`)
- [ ] `import.meta.env.VITE_*` for client env vars
- [ ] Assets imported correctly (SVG `?react` suffix)
- [ ] No Node.js builtins in client code

---

## 🚩 FLAG PRIORITY

🔴 **Critical** → Block merge, fix immediately
🟠 **High Priority** → Fix before merge
🟡 **Suggestions** → Improvements, can defer

Refer to detailed instruction files for examples, patterns, and complete rationale.
