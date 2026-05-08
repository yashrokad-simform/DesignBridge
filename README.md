# React Shadcn Boilerplate

A production-ready **boilerplate** for React applications with TypeScript, Vite, Tailwind CSS v4, and shadcn/ui — organized using a Shared + Feature-Based architecture.

> **This is a starter template.** When you use it in a new project, follow the [Customization Checklist](#-customization-checklist) below to replace boilerplate defaults with your project-specific details.

## ✨ Features

- ⚡️ **Vite** — Lightning-fast build tool (using `rolldown-vite` override)
- ⚛️ **React 19** — Latest React with concurrent features
- 🔷 **TypeScript** — Strict mode with path aliases (`@/*` → `src/*`)
- 🎨 **Tailwind CSS v4** — Utility-first CSS with `@theme inline` and `oklch` colors
- 🧩 **shadcn/ui** — Beautiful, accessible components (New York style, Lucide icons)
- 🌓 **Dark Mode** — Built-in theme switching via `ThemeProvider` + `useTheme` hook
- 🔀 **React Router v7** — Lazy-loaded routes with public/private layout shells
- 🎯 **ESLint + Prettier** — Code quality and consistent formatting
- 🐕 **Husky + lint-staged** — Pre-commit hooks for auto-fix
- 🤖 **AI-ready** — Copilot instructions, agents, skills, and prompts included

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/            # shadcn-generated primitives (button.tsx, card.tsx)
│   ├── shared/        # Custom reusable (PageLoader, PageNotFound, ErrorBoundary, Header)
│   └── forms/         # Domain-specific forms (scaffold — add forms here)
├── features/
│   ├── auth/          # LoginForm.tsx + barrel index.ts
│   └── dashboard/     # DashboardOverview, RecentActivity, StatsCard + barrel
├── hooks/             # All custom hooks (useTheme.ts) — NOT inside features
├── lib/               # theme-provider.tsx, utils.ts (cn helper)
├── pages/
│   ├── public/        # authLayout.tsx → Outlet for /auth/* routes
│   │   └── login/     # index.tsx (default export)
│   └── private/       # privateLayout.tsx → Header + Outlet, auth guard
│       └── dashboard/ # index.tsx (default export)
└── routes/
    └── index.tsx      # All route definitions + lazyLoad() helper
```

### AI Copilot configuration (`.github/`)

```
.github/
├── copilot-instructions.md          # Main AI coding agent instructions
├── agents/                          # 13 specialized review agents
│   ├── code-review.agent.md         #   Master code reviewer
│   ├── accessibility-reviewer.agent.md
│   ├── performance-reviewer.agent.md
│   └── ...
├── instructions/                    # 27 instruction files for implementation & review
│   ├── react-implementation.instructions.md
│   ├── tailwind-implementation.instructions.md
│   └── ...
├── prompts/                         # Reusable prompt templates
│   ├── readme-generator.prompt.md
│   ├── lighthouse-report.prompt.md
│   └── ...
└── skills/                          # Agent skills for automated tasks
    ├── cleanup-unused/
    ├── react-component-refactor/
    ├── sonarqube-fixer/
    └── tailwind-arbitrary-cleanup/
```

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 🛠️ Available Scripts

| Command                              | Description                        |
| ------------------------------------ | ---------------------------------- |
| `pnpm dev`                           | Start Vite dev server              |
| `pnpm run build`                     | `tsc -b && vite build`             |
| `pnpm run preview`                   | Preview production build           |
| `pnpm run lint`                      | Check for linting errors           |
| `pnpm lint:fix`                      | Auto-fix linting errors            |
| `pnpm format`                        | Format all files with Prettier     |
| `pnpm run format:check`              | Check formatting                   |
| `pnpm run type-check`                | TypeScript type checking           |
| `pnpm run type-check:watch`          | Type checking in watch mode        |
| `pnpm dlx shadcn@latest add <name>`  | Add a shadcn/ui component          |

## 📦 Import Patterns

```tsx
// UI primitives via top-level barrel
import { Button } from "@/components";

// Feature components via feature barrel
import { DashboardOverview } from "@/features/dashboard";

// Hooks (all hooks live in src/hooks/)
import { useTheme } from "@/hooks";

// Utilities
import { cn } from "@/lib/utils";
```

## 🎨 Theming

The project uses Tailwind CSS v4 with `oklch` CSS custom properties:

```tsx
import { useTheme } from "@/hooks";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
```

- Theme colors are defined in `src/index.css` using `@theme inline` + `:root` / `.dark` blocks.
- Always use semantic Tailwind classes (`bg-background`, `text-muted-foreground`) — no arbitrary values.

## 🔀 Routing

Two layout shells in `src/routes/index.tsx`:

- **`AuthLayout`** (public) — centered card layout for `/auth/*` routes
- **`PrivateLayout`** (protected) — Header + content area with auth guard for `/` routes

Every route is lazy-loaded via `lazyLoad(Component)` → `<Suspense fallback={<PageLoader />}>`.

Page components use **default exports** (required by `lazy()`). Feature components use **named exports** from barrels.

## 📝 Code Quality

- **ESLint** — React, TypeScript, hooks, accessibility, and import plugins
- **Prettier** — Auto-formatting on save and pre-commit
- **Husky + lint-staged** — Pre-commit runs `eslint --fix` + `prettier --write` on staged `*.{ts,tsx}` files
- **Quality gate** before PRs:
  1. `pnpm run type-check` — must pass
  2. `pnpm lint:fix && pnpm format`
  3. `pnpm dev` — smoke-test `/auth/login` and `/dashboard`

## 🔧 Key Configuration Files

| File               | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| `vite.config.ts`   | Vite + Tailwind plugin, `@/` alias, chunk splitting        |
| `tsconfig.app.json`| Strict TS config with `@/*` path alias                     |
| `components.json`  | shadcn/ui: `new-york` style, `lucide` icons, `rsc: false`  |
| `eslint.config.js` | Flat ESLint config for TS/TSX                              |
| `src/index.css`    | Tailwind v4 `@theme inline` with `oklch` design tokens     |

## ⚠️ Gotchas

- `vite` is overridden to `rolldown-vite@7.1.14` via `pnpm.overrides` in `package.json`.
- `src/index.css` uses `oklch` colors — do not convert to hex.
- `components/ui/index.ts` barrel re-exports from subfolder paths (`./Button/Button`) — verify paths match actual files when adding new shadcn components.
- `PrivateLayout` has a demo `useAuth()` hook returning `true` — replace with real authentication.

---

## 🔄 Customization Checklist

When using this boilerplate for a new project, update the following:

### 1. Project identity

- [ ] **`package.json`** — Change `"name"` from `react-shadcn-boilerplate` to your project name
- [ ] **`index.html`** — Update `<title>` and `<meta name="description">` to match your project
- [ ] **`.env.example`** — Update `VITE_APP_NAME` to your project name

### 2. AI agent configuration (`.github/`)

- [ ] **`.github/copilot-instructions.md`** — Rewrite to describe YOUR project's architecture, data flows, API integrations, and domain-specific patterns. The boilerplate version documents generic scaffolding; replace it with project-specific knowledge that helps AI agents be productive in your codebase.

- [ ] **`.github/agents/`** — Review the 13 included agents. Remove agents for areas you don't need (e.g., `figma-to-code.agent.md` if not using Figma). Add project-specific agents (e.g., `api-integration.agent.md`).

- [ ] **`.github/instructions/`** — Review the 27 instruction files. These cover React, Tailwind, TypeScript, accessibility, security, and build patterns. Keep what applies, remove what doesn't (e.g., remove `shadcn-implementation.instructions.md` if you switch to a different component library). Add project-specific instructions for your domain.

- [ ] **`.github/prompts/`** — Review prompt templates. Add project-specific prompts for common tasks in your domain.

- [ ] **`.github/skills/`** — Review the 4 included skills (`cleanup-unused`, `react-component-refactor`, `sonarqube-fixer`, `tailwind-arbitrary-cleanup`). Remove skills you won't use, add project-specific skills.

### 3. Authentication

- [ ] **`src/pages/private/privateLayout.tsx`** — Replace the demo `useAuth()` stub with your real authentication logic (context, token validation, etc.)

### 4. Features & routes

- [ ] Remove or replace the demo `auth/` and `dashboard/` features with your actual features
- [ ] Update `src/routes/index.tsx` with your project's route structure

## 📚 Documentation

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router v7](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 📄 License

MIT
