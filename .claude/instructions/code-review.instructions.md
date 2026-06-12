---
name: Code Review - Architecture, Structure & shadcn/ui
description: Enforce consistent file naming, folder structure, barrel exports, separation of concerns, and shadcn/ui component patterns including imports, CVA variants, asChild usage, Radix accessibility, component composition, and form validation
applyTo: 'src/**, **/*.ts, **/*.tsx, src/routes/**, src/hooks/**, src/services/**, src/components/**/*.tsx, src/app/**/*.tsx, src/pages/**/*.tsx'
---

## 📁 Folder & File Naming

**DO:** Folders: kebab-case (`user-profile/`). Components: PascalCase `.tsx` (`UserCard.tsx`). Hooks: camelCase + `use` prefix `.ts` (`useAuth.ts`). Services: camelCase + `Service` suffix `.ts` (`authService.ts`). Types: camelCase + `Types` suffix `.ts` (`authTypes.ts`). Context: PascalCase + `Context` suffix `.tsx` (`AuthContext.tsx`).

**DON'T:** PascalCase folders. kebab-case components. Missing prefixes/suffixes on hooks/services/types/contexts.

---

## 📦 Barrel Exports & Imports

**DO:** Export all feature modules through `index.ts`. Import from barrel: `import { UserCard } from '@/components/user-profile'`. Import shadcn components from `@/components/ui/` barrel using named imports: `import { Button } from "@/components/ui/button"`.

**DON'T:** Direct deep imports: `import { UserCard } from '@/components/user-profile/UserCard'`. Direct shadcn file imports: `"components/ui/button"` or default imports for shadcn components. Missing barrel exports.

---

## 📄 Page Components

**DO:** Pages use default exports (required for `React.lazy`): `export default function UserProfilePage() {...}`

**DON'T:** Named exports on pages (breaks `React.lazy`).

---

## 🪝 Hook Organization

**DO:** Place all hooks in `src/hooks/` — centralized, not nested inside feature folders.

**DON'T:** Scatter hooks inside feature folders (`features/auth/hooks/`).

---

## 🗺️ Route File Structure

**DO:** Use `src/routes/index.tsx` (`.tsx` extension for JSX). Import lazy with Suspense wrapper.

**DON'T:** `.ts` extension for route files containing JSX. Missing Suspense wrapper on lazy routes.

---

## 🧠 Separation of Concerns & Service Layer

**DO:** Business logic in hooks/services. Pages are presentation only. Centralize all API calls in service layer (`services/userService.ts`). Export service objects with async methods.

**DON'T:** API calls directly in page components or component body. Business logic scattered in pages. Duplicate API logic across files.

---

## 🚫 No Cross-Feature Direct Imports

**DO:** Import through barrel exports and public APIs (`features/user/index.ts`).

**DON'T:** Import from feature internals directly (`@/features/user/services/userService`).

---

## 🧩 shadcn/ui Component Patterns

### CVA Variants
**DO:** Follow CVA patterns — define variants with `cva()`. Extend existing variants, don't duplicate. Use defined button variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`.

**DON'T:** Ad-hoc styling duplicating variants. Override variant styles with inline classes. Mix CVA + manual conditional classes. Apply custom classes that duplicate existing variant behavior.

### asChild Prop
**DO:** Use `asChild` when wrapping with `Link` or custom elements. Import `Slot` from `@radix-ui/react-slot`. Understand that `asChild` delegates props to the child.

**DON'T:** Wrap `Link` inside `Button` without `asChild` (creates nested interactive elements). Pass conflicting props to the child.

### Component Composition
**DO:** Follow compound patterns: `Card > CardHeader > CardTitle > CardDescription`. Respect semantic structure and proper nesting order.

**DON'T:** Skip intermediate components (`Card > CardTitle` skips `CardHeader`). Create flat structures when a compound pattern exists.

### Radix Accessibility & Data Attributes
**DO:** Preserve `aria-*`, `role`, `data-state`, and `data-slot` attributes from Radix primitives. Pass through data attributes in wrappers to maintain styling hooks.

**DON'T:** Remove accessibility props to "clean up code". Override `role` without understanding its semantics. Strip `data-*` or `data-slot` attributes.

### Custom vs UI Components
**DO:** Keep shadcn components in `components/ui/`. Custom components go in `components/shared/` or `components/common/`. Extend shadcn components — never modify the source files directly.

**DON'T:** Mix custom logic into `components/ui/`. Modify shadcn source files (breaks updates). Put business logic in UI components.

---

## 📋 Forms

**DO:** Use shadcn Form components with `react-hook-form`. Define schema with `zod`. Structure: `FormField > FormItem > FormLabel > FormControl > FormMessage`.

**DON'T:** Build forms without a validation schema. Skip `FormField` wrapper (breaks error propagation). Use raw `<input>` elements without `FormControl`.

---

## ✅ CHECKLIST

**Structure**
- [ ] Folder naming: kebab-case (`user-profile/`, not `UserProfile/`)
- [ ] Component files: PascalCase `.tsx` (`UserCard.tsx`)
- [ ] Hooks: camelCase prefixed `use` `.ts` (`useAuth.ts`)
- [ ] Context: PascalCase + `Context` suffix `.tsx` (`AuthContext.tsx`)
- [ ] Services: camelCase + `Service` suffix `.ts` (`authService.ts`)
- [ ] Types files: camelCase + `Types` suffix `.ts` (`authTypes.ts`)
- [ ] All feature/component folders export via `index.ts` barrel
- [ ] Pages use default exports (required for `React.lazy`)
- [ ] Feature-specific hooks in `src/hooks/` — not nested inside features
- [ ] No cross-feature direct imports — go through barrel exports
- [ ] Route file is `src/routes/index.tsx` (`.tsx` for JSX, not `.ts`)
- [ ] No business logic inside page components — delegate to hooks/services

**shadcn/ui**
- [ ] Imports from `@/components/ui/` barrel (not direct paths)
- [ ] CVA variant patterns followed — no ad-hoc style duplication
- [ ] `data-slot` attributes preserved in wrappers
- [ ] `asChild` prop used correctly with Link/custom elements
- [ ] Radix `aria-*`, `role`, `data-state` props not removed
- [ ] Compound patterns followed (`Card > CardHeader > CardTitle`)
- [ ] Custom components in `components/shared/`, not `components/ui/`
- [ ] Forms use `react-hook-form` + `zod` validation
- [ ] Button variants used (not ad-hoc styling)

---

## 🚩 FLAG LEVELS

**🔴 Critical**
- Pages with named exports (breaks `React.lazy`)
- JSX in `.ts` files (must be `.tsx`)
- Cross-feature direct imports bypassing public APIs
- Business logic in page components
- Direct shadcn component file imports (breaks barrel exports)
- Removing Radix accessibility props
- Modifying shadcn source files directly
- Forms without `react-hook-form` + `zod`

**🟠 High Priority**
- Inconsistent file naming conventions
- Missing barrel exports
- Hooks nested in feature folders instead of `src/hooks/`
- API calls not in service layer
- Ad-hoc button styling duplicating existing variants
- Missing `asChild` on Button wrapping Link
- Wrong compound component nesting
- Custom components placed in `components/ui/`

**🟡 Suggestions**
- Folder naming improvements (PascalCase → kebab-case)
- Better separation of concerns
- Consistent file suffix patterns
- Extract repeated form patterns into shared components
- Promote to a custom CVA variant if a one-off style appears 3+ times
- Document component extensions
- Compose primitives for complex compound cases
