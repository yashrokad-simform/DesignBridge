---
name: Code Review - Linting & Code Quality
description: Enforce ESLint rules, Prettier formatting, import order, and code hygiene standards for TypeScript/JavaScript files
applyTo: '**/*.ts, **/*.tsx, **/*.js, **/*.jsx, src/**'
---

Enforce strict linting standards, code hygiene, and formatting consistency across all TypeScript and JavaScript files.

## 🎯 ESLint Rule Compliance

**DO:** Mentally run `pnpm lint:fix` before suggesting code. All ESLint rules must pass.

**DON'T:** Ignore or suppress ESLint warnings/errors. Fix the root cause.

## 🪝 React Hooks Rules

**DO:** Declare all dependencies in hook arrays (useMemo, useCallback, useEffect). Complete deps satisfy `react-hooks/exhaustive-deps`.

**DON'T:** Suppress exhaustive-deps with `eslint-disable-next-line`. Missing dependencies cause stale closures and bugs.

## 📦 File Export Patterns

**DO:** Component files export only components. Barrel `index.ts` files can mix exports (exception for `react-refresh/only-export-components`).

**DON'T:** Mix components with utilities/constants in same file. Breaks Fast Refresh. Move utilities to separate files.

## 🧹 Dead Code & Unused Variables

**DO:** Remove all unused imports, variables, and commented-out code blocks. Keep codebase clean.

**DON'T:** Leave unused imports (`@typescript-eslint/no-unused-vars` violations), dead variables, or `// old code` comments.

## 🚫 Console & Debugging

**DO:** Use proper logger utility (`import { logger } from '@/lib/logger'`) for production logs.

**DON'T:** Leave `console.log`, `console.warn`, or `console.error` in production code. Remove debug statements.

## 📐 Prettier Formatting

**DO:** Consistent indentation (2 spaces), quotes (single), trailing commas, semicolons. Auto-format on save.

**DON'T:** Mixed indentation, inconsistent quotes/semicolons, spacing issues. Run Prettier before commit.

## 📥 Import Order

**DO:** Group imports in order:
1. External libraries (react, react-router-dom, zod)
2. Internal `@/` aliases (components, hooks, services)
3. Relative imports (./Component, ../utils)
4. Types (`import type { ... }`)

**DON'T:** Random import order without grouping. Use ESLint import sorting plugin.

## 🔄 Circular Dependencies

**DO:** Use barrel exports and one-way dependencies. Module A imports B, not vice versa.

**DON'T:** Create circular import chains (A imports B, B imports A). Refactor shared logic to separate module.

---

## ✅ CHECKLIST

- [ ] No ESLint errors or warnings (mentally run `pnpm lint:fix`)
- [ ] `react-hooks/exhaustive-deps` — all hook dependencies declared
- [ ] `react-refresh/only-export-components` — components and non-components not mixed (except barrels)
- [ ] `@typescript-eslint/no-unused-vars` — no dead variables or imports
- [ ] `@typescript-eslint/no-explicit-any` — zero tolerance for `any` type
- [ ] No `console.log` left in production code (use logger utility)
- [ ] No commented-out code blocks committed
- [ ] Prettier formatting consistent — indentation, quotes, trailing commas, semicolons
- [ ] Import order: external libs → internal `@/` aliases → relative imports → types
- [ ] No circular dependencies between modules

---

## 🚩 FLAG LEVELS

**🔴 Critical:** ESLint errors blocking build, exhaustive-deps violations causing bugs, `any` type usage, circular dependencies

**🟠 High Priority:** Unused variables, mixed component/non-component exports, console statements, import order violations

**🟡 Suggestions:** Commented-out code cleanup, Prettier auto-fixes, import grouping improvements
