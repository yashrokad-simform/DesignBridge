---
name: Code Review - shadcn/ui Components
description: Enforce shadcn/ui component patterns including imports, CVA variants, asChild usage, Radix accessibility, component composition, and form validation
applyTo: 'src/components/**/*.tsx, src/app/**/*.tsx, src/pages/**/*.tsx'
---

Enforce shadcn/ui patterns for consistent, accessible component usage.

## Component Imports (Critical)

**DO:** Import from `@/components/ui/` barrel exports. Use named imports: `import { Button } from "@/components/ui/button"`

**DON'T:** Direct file imports: `"components/ui/button"` or default imports for shadcn components.

## CVA Variant Patterns

**DO:** Follow CVA (class-variance-authority) patterns. Define variants with `cva()`. Extend existing variants, don't duplicate.

**DON'T:** Create ad-hoc styling duplicating variants. Override variant styles with inline classes. Mix CVA + manual conditional classes.

## asChild Prop Usage

**DO:** Use `asChild` when wrapping with `Link` or custom elements. Import `Slot` from `@radix-ui/react-slot`. Understand asChild delegates props to child.

**DON'T:** Wrap Link without asChild (creates nested buttons/links). Pass conflicting props to child.

## Radix Accessibility Props

**DO:** Preserve `aria-*`, `role`, `data-state` attributes from Radix primitives. Maintain all accessibility props.

**DON'T:** Remove accessibility props "to clean up code". Override `role` without understanding. Strip `data-*` attributes for state styling.

## Component Composition

**DO:** Follow compound patterns: `Card > CardHeader > CardTitle > CardDescription`. Respect semantic structure and proper nesting order.

**DON'T:** Mix nesting order: `Card > CardTitle` (missing CardHeader). Skip intermediate components. Create flat structure when compound pattern exists.

## data-slot Attributes

**DO:** Preserve `data-slot` when wrapping shadcn primitives. Pass through data attributes to maintain styling.

**DON'T:** Remove `data-slot` attributes. Forget to forward data props in wrappers.

## Custom vs UI Components

**DO:** Keep shadcn components in `components/ui/`. Put custom in `components/shared/` or `components/common/`. Never modify shadcn files directly—extend instead.

**DON'T:** Mix custom components into `components/ui/`. Modify shadcn component files (breaks updates). Put business logic in UI components.

## Forms with react-hook-form + zod

**DO:** Use shadcn Form components with `react-hook-form`. Define schema with `zod`. Use `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` structure.

**DON'T:** Build forms without validation schema. Skip FormField wrapper (breaks errors). Use raw inputs without FormControl.

## Button Variants

**DO:** Use defined variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Check definitions before custom styles.

**DON'T:** Apply custom classes duplicating variant behavior. Create one-off button styles with className.

---

## ✅ CHECKLIST

- [ ] Imports from `@/components/ui/` barrel (not direct paths)
- [ ] CVA variant patterns followed for extensions
- [ ] `data-slot` attributes preserved in wrappers
- [ ] `asChild` prop used correctly with Link/custom elements
- [ ] Radix `aria-*`, `role`, `data-state` props not removed
- [ ] Compound patterns followed (Card > CardHeader > CardTitle)
- [ ] Custom components in `components/shared/`, not `components/ui/`
- [ ] Forms use `react-hook-form` + `zod` validation
- [ ] Button variants used (not ad-hoc styling)

---

## 🚩 FLAG LEVELS

**🔴 Critical:** Direct component file imports (breaks barrel exports), removing Radix accessibility props, modifying shadcn files directly, forms without react-hook-form + zod

**🟠 High Priority:** Ad-hoc button styling duplicating variants, missing asChild on Button wrapping Link, wrong compound nesting, custom components in `components/ui/`

**🟡 Suggestions:** Extract repeated form patterns, create custom variant if used 3+ times, document extensions, compose primitives for complex cases
