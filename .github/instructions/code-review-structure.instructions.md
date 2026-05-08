---
name: Code Review - Architecture & File Structure
description: Enforce consistent file naming conventions, folder structure, barrel exports, and separation of concerns across the codebase
applyTo: 'src/**, **/*.ts, **/*.tsx, src/routes/**, src/hooks/**, src/services/**'
---

Maintain consistent file naming, folder structure, and architectural patterns for scalable, maintainable code organization.

## 📁 Folder & File Naming

**DO:** Folders: kebab-case (`user-profile/`). Components: PascalCase `.tsx` (`UserCard.tsx`). Hooks: camelCase + `use` prefix `.ts` (`useAuth.ts`). Services: camelCase + `Service` suffix `.ts` (`authService.ts`). Types: camelCase + `Types` suffix `.ts` (`authTypes.ts`). Context: PascalCase + `Context` suffix `.tsx` (`AuthContext.tsx`).

**DON'T:** PascalCase folders. kebab-case components. Missing prefixes/suffixes on hooks/services/types/contexts.

## 📦 Barrel Exports

**DO:** Export all feature modules through `index.ts`. Import from barrel: `import { UserCard } from '@/components/user-profile'`

**DON'T:** Direct deep imports: `import { UserCard } from '@/components/user-profile/UserCard'`. Missing barrel exports.

## 📄 Page Components (Default Exports)

**DO:** Pages use default exports (required for React.lazy): `export default function UserProfilePage() {...}`

**DON'T:** Named exports on pages: `export function UserProfilePage()` (breaks React.lazy).

## 🪝 Hook Organization

**DO:** Place all hooks in `src/hooks/` directory. Centralized location for feature-specific hooks.

**DON'T:** Nest hooks inside feature folders (`features/auth/hooks/`). Creates scattered hook organization.

## 🚫 No Cross-Feature Direct Imports

**DO:** Import through barrel exports and public APIs. Feature exports via `features/user/index.ts`.

**DON'T:** Direct imports from feature internals: `@/features/user/services/userService`. Bypasses public API.

## 🗺️ Route File Structure

**DO:** Use `src/routes/index.tsx` (TSX extension for JSX content). Import lazy with Suspense wrapper.

**DON'T:** Use `.ts` extension for routes file containing JSX. Missing Suspense wrapper for lazy routes.

## 🧠 Separation of Concerns

**DO:** Business logic in hooks/services. Pages are presentation only. Use custom hooks to encapsulate data fetching and state management.

**DON'T:** API calls directly in page components. Business logic scattered in pages. Fetch calls in component body.

## 🏗️ Service Layer Pattern

**DO:** Centralize all API calls in service layer (`services/userService.ts`). Export service objects with async methods.

**DON'T:** Scatter fetch/API calls throughout components. Duplicate API logic across files.

---

## ✅ CHECKLIST

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

---

## 🚩 FLAG LEVELS

**🔴 Critical:** Pages with named exports (breaks React.lazy), JSX in .ts files (should be .tsx), cross-feature direct imports bypassing public APIs, business logic in page components

**🟠 High Priority:** Inconsistent file naming, missing barrel exports, hooks nested in features, API calls not in service layer

**🟡 Suggestions:** Folder naming improvements (PascalCase → kebab-case), better separation of concerns, consistent file suffix patterns
