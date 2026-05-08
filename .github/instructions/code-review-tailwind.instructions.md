---
description: 'Tailwind CSS best practices for code reviews. Use when: reviewing Tailwind classes, checking CSS utility usage, validating design tokens, reviewing dark mode implementation, checking responsive patterns, validating cn() utility usage, or auditing Tailwind patterns.'
applyTo: '**/*.tsx, **/*.jsx, **/*.css, src/components/**'
---

# Tailwind CSS Review

## DO:
- Use semantic tokens: `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`, `bg-primary`, `text-accent`
- Reference `@theme` values from CSS variables
- Use `dark:` variants with semantic colors
- Test both light and dark modes
- Use Tailwind utilities for all styling, avoid inline `style={{}}`
- Follow mobile-first order: `base → sm: → md: → lg: → xl:`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Order classes: layout → spacing → typography → colors → effects
- Fix specificity via CSS restructuring, not `!important`
- Use `@apply` only for complex repeated patterns in dedicated stylesheets

## DON'T:
- Use arbitrary values: `bg-[#fff]`, `w-[372px]`, `text-[14px]`
- Hardcode colors: `bg-white`, `text-gray-500`, `dark:bg-[#1a1a1a]`
- Skip dark mode variants on colored elements
- Mix inline styles with Tailwind classes
- Mix responsive order: `lg:text-xl sm:text-sm`
- Use template literals for classes: `` `p-4 ${class}` ``
- Have conflicting classes: `p-4 p-6`
- Add `!important` to force overrides
- Use `@apply` for single utilities

## Review Checklist

- [ ] Semantic tokens only (`bg-background`, `text-foreground`, not `bg-white` or `bg-[#fff]`)
- [ ] No arbitrary values (`bg-[#fff]`, `w-[372px]`, `text-[14px]`)
- [ ] No hardcoded colors (use design tokens from `@theme`)
- [ ] Dark mode via `dark:` variants with semantic colors
- [ ] No inline `style={{}}` for Tailwind-achievable values
- [ ] No duplicate/conflicting classes (`p-4 p-6`)
- [ ] Responsive classes in mobile-first order (`base → sm: → md: → lg: → xl:`)
- [ ] `cn()` utility used for conditional merging (not template literals)
- [ ] No `!important` overrides
- [ ] `@apply` only for complex repeated patterns

## Flag Levels

🔴 **Critical:** Arbitrary colors `bg-[#fff]`, hardcoded dark mode `dark:bg-[#1a1a1a]`, template literals for classes, `!important` usage
⚠️ **High Priority:** Missing dark mode variants, wrong responsive order, conflicting utilities, inline styles mixing
💡 **Suggestions:** Extract repeated patterns, use spacing scale consistently, group utilities for readability
