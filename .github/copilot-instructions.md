# GitHub Copilot Instructions for React Shadcn Boilerplate

React 19 + TypeScript + Vite app with Tailwind CSS v4, shadcn/ui, and React Router v7. Path alias `@/*` → `src/*`.

## Architecture

### Directory layout (actual)

```
src/
├── components/
│   ├── ui/            # shadcn-generated primitives (button.tsx, card.tsx)
│   ├── shared/        # Custom reusable (PageLoader, PageNotFound, ErrorBoundary, Header)
│   └── forms/         # Domain-specific forms (empty scaffold — add LoginForm, etc. here)
├── features/
│   ├── auth/          # LoginForm.tsx + barrel index.ts
│   └── dashboard/     # DashboardOverview, RecentActivity, StatsCard + barrel
├── hooks/             # All custom hooks live here (useTheme.ts) — NOT inside features
├── lib/               # theme-provider.tsx, utils.ts (cn helper)
├── pages/
│   ├── public/        # authLayout.tsx → Outlet for /auth/* routes
│   │   └── login/     # index.tsx (default export, imports LoginForm from feature)
│   └── private/       # privateLayout.tsx → Header + Outlet, auth guard
│       └── dashboard/ # index.tsx (default export, imports DashboardOverview)
└── routes/
    └── index.tsx      # All route definitions + lazyLoad() helper
```

### Routing (`src/routes/index.tsx`)

- **Two layout shells**: `AuthLayout` (public, centered) and `PrivateLayout` (protected, with Header).
- **Lazy loading**: every route uses `lazyLoad(Component)` which wraps in `<Suspense fallback={<PageLoader />}>`.
- **Auth guard**: `PrivateLayout` has an inline `useAuth()` hook — demo returns `true`; replace with real auth.
- Routes: `/auth/login` → public | `/` → private dashboard | `*` → `<PageNotFound />`.

### Theme system

- `ThemeProvider` in `src/lib/theme-provider.tsx` — wraps app, toggles `light`/`dark` class on `<html>`.
- State via `useTheme` hook (`src/hooks/useTheme.ts`), persisted to `localStorage` key `vite-ui-theme`.
- Header has a theme toggle button.

### Data flow (current)

Provider tree: `ErrorBoundary` → `ThemeProvider` → `RouterProvider` (see `src/App.tsx`).
No external API integration yet — demo data only.

## Conventions (strictly enforced)

| Type       | Convention              | Example              | Extension   |
| ---------- | ----------------------- | -------------------- | ----------- |
| Folders    | kebab-case              | `user-profile/`      | —           |
| Components | PascalCase              | `StatsCard.tsx`      | `.tsx`      |
| Hooks      | camelCase + `use`       | `useAuth.ts`         | `.ts`       |
| Context    | PascalCase + `Context`  | `AuthContext.tsx`     | `.tsx`      |
| Services   | camelCase + `Service`   | `authService.ts`     | `.ts`       |
| Utils      | camelCase               | `dateFormatter.ts`   | `.ts`       |
| Types      | camelCase + `Types`     | `authTypes.ts`       | `.ts`       |
| Tests      | co-located              | `StatsCard.test.tsx`  | `.test.tsx` |

### Critical rules

- **JSX → `.tsx`** always. Routes file MUST be `src/routes/index.tsx`.
- **Barrel exports**: every folder has `index.ts`. Import via barrels: `import { LoginForm } from "@/features/auth"`.
- **Page components use default exports** (required by `lazy()`). Feature components use **named exports** re-exported from barrels.
- **`@/` alias only** — never relative `../../` for anything in `src/`.
- **No CSS Modules** — Tailwind v4 semantic classes only (`bg-background`, `text-muted-foreground`). No arbitrary values (`bg-[#fff]`).
- **Hooks go in `src/hooks/`**, not inside feature folders.
- **shadcn/ui components** land in `src/components/ui/` via `pnpm dlx shadcn@latest add <component>` and must be wired into `ui/index.ts` barrel.

### shadcn/ui pattern

Components use CVA variants + Radix `Slot` for `asChild`. The `cn()` helper (`src/lib/utils.ts`) merges Tailwind classes:

```tsx
import { cn } from "@/lib/utils";
<div className={cn("base-classes", conditional && "extra")} />
```

## Import patterns

```tsx
// UI primitives via top-level barrel
import { Button } from "@/components";

// Feature components via feature barrel
import { DashboardOverview } from "@/features/dashboard";

// Hooks
import { useTheme } from "@/hooks";

// Utilities
import { cn } from "@/lib/utils";
```

## Developer workflow

```bash
pnpm dev              # Vite dev server
pnpm run build        # tsc -b && vite build
pnpm run type-check   # tsc --noEmit (must pass before commit)
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier
```

Husky + lint-staged run `eslint --fix` + `prettier --write` on staged `*.{ts,tsx}` files automatically.

### Quality gate (run before PRs)

1. `pnpm run type-check` — must pass
2. `pnpm lint:fix && pnpm format`
3. `pnpm dev` — smoke-test `/auth/login` and `/dashboard`

## Gotchas

- `vite` is overridden to `rolldown-vite@7.1.14` via `pnpm.overrides` in `package.json`.
- `components.json` sets shadcn style to `new-york`, icons to `lucide`, `rsc: false`.
- `src/index.css` uses Tailwind v4 `@theme inline` block with `oklch` colors and CSS custom properties — do not convert to hex.
- Build splits chunks: `react-vendor` (react/react-dom) and `vendor` (other node_modules) via `manualChunks` in `vite.config.ts`.
- The `components/ui/index.ts` barrel currently re-exports from `./Button/Button` and `./Card/Card` (subfolder pattern) but actual files are `button.tsx` and `card.tsx` — verify paths match when adding new shadcn components.
