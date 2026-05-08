---
description: 'TypeScript best practices for code reviews. Use when: reviewing TypeScript code, checking type safety, validating type assertions, reviewing interfaces and types, checking generic constraints, validating return types, or auditing TypeScript patterns.'
applyTo: '**/*.ts, **/*.tsx, src/**'
---

# TypeScript Review

## DO:
- Use `unknown` for unknown types (requires type narrowing), not `any`
- Use generics for reusable type-safe functions
- Use `satisfies` operator to validate types without widening
- Justify `as` assertions with comments, prefer type guards
- Define explicit `interface` or `type` for component props
- Use `type` for unions/intersections/primitives, `interface` for object shapes
- Use `as const` objects or union literals instead of `enum`
- Document WHY when using `@ts-expect-error` (prefer over `@ts-ignore`)
- Add constraints to generics: `<T extends object>`
- Explicitly declare return types on exported functions/hooks
- Use optional chaining `user?.name` and nullish coalescing `value ?? default`

## DON'T:
- Use `any` to bypass type checking or leave implicit `any`
- Use unsafe assertions without validation: `data as User`
- Nest multiple assertions: `data as string as unknown as User`
- Use implicit typing on props: `function Card({ title })`
- Use `enum` (runtime overhead, namespace pollution)
- Use `@ts-ignore` or `@ts-nocheck` without documented reason
- Use unconstrained generics when T has requirements
- Rely on inference for public API functions
- Use non-null assertion `!` without justification
- Access potentially nullable values directly

## Review Checklist

- [ ] No `any` types (use `unknown`, generics, unions)
- [ ] Type assertions justified with comments
- [ ] All props typed with `interface` or `type`
- [ ] `satisfies` used over `as` where appropriate
- [ ] `type` for unions/intersections, `interface` for objects
- [ ] No `enum` (use `as const` or union literals)
- [ ] No `ts-ignore`/`ts-nocheck` without documented reason
- [ ] Generic constraints used correctly (`<T extends object>`)
- [ ] Return types declared on exported functions
- [ ] `strictNullChecks` respected (use `?.` and `??`)

## Flag Levels

🔴 **Critical:** `any` usage, unsafe assertions, missing prop types, `ts-ignore` without explanation
⚠️ **High Priority:** Using `enum`, missing return types on exports, unconstrained generics, unjustified `!`
💡 **Suggestions:** Extract repeated types, use utility types (`Partial<T>`, `Pick<T, K>`, `Omit<T, K>`), discriminated unions, `readonly`
