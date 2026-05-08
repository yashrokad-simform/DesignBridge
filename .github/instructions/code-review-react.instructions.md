---
name: Code Review - React Patterns & Hooks
description: Enforce React best practices including component purity, hooks dependencies, performance optimization, state management, and proper lifecycle patterns
applyTo: '**/*.tsx, **/*.jsx, src/components/**, src/pages/**, src/hooks/**'
---

Enforce React patterns and hooks best practices for maintainable, performant components.

## Component Purity & Side Effects

**DO:** Keep components pure (same props → same output). Isolate side effects in `useEffect`. Write predictable, testable components.

**DON'T:** Put API calls, timers, subscriptions in component body. Mutate props/external state during render. Perform side effects outside useEffect.

## Hooks Dependencies

**DO:** Include ALL values from component scope in useEffect/useCallback/useMemo deps. Use ESLint `exhaustive-deps` rule. Extract stable values outside component if they never change.

**DON'T:** Ignore dependency warnings. Use empty deps `[]` when effect uses props/state. Create stale closures by omitting dependencies.

## Performance Optimization

**DO:** Profile BEFORE optimizing with useCallback/useMemo. Use React DevTools Profiler. Optimize only frequently re-rendering components with expensive operations.

**DON'T:** Wrap every function in useCallback by default. Use useMemo for cheap calculations. Optimize without measuring impact.

## DOM Manipulation

**DO:** Let React manage DOM declaratively. Use refs only for: focus management, scroll position, measuring elements, third-party library integration.

**DON'T:** Use `document.querySelector` for React elements. Manually manipulate DOM with `element.style`/`classList`. Store DOM nodes in state.

## State Management

**DO:** Colocate state at lowest needed level. Lift only when multiple components need it. Use composition to avoid prop drilling beyond 2 levels. Context for global state (theme, auth, i18n).

**DON'T:** Store everything in top-level state. Prop drill beyond 2 levels (use Context/composition). Use Context for frequently changing state (causes re-renders). Separate Context for each value—batch related values.

## Keys in Lists

**DO:** Use stable, unique IDs: `key={item.id}`. Generate IDs on data creation (backend/client). Use index ONLY for static lists that never reorder.

**DON'T:** Use array index for dynamic lists: `key={index}` (breaks on reorder). Non-unique keys: `key={item.type}`. Random values: `key={Math.random()}`.

## Controlled vs Uncontrolled Inputs

**DO:** Be consistent: pick controlled OR uncontrolled per form. Controlled: `value` + `onChange` for React-managed state. Uncontrolled: refs + native DOM for simple forms.

**DON'T:** Mix controlled/uncontrolled in same form. Start uncontrolled then switch to controlled ("component is changing..." warning). Forget `onChange` when setting `value` (read-only).

## useEffect Cleanup

**DO:** Return cleanup function for subscriptions, timers, event listeners. Clean up on unmount AND before next effect run.

**DON'T:** Forget cleanup for `setInterval`, `setTimeout`, `addEventListener`. Leave dangling subscriptions (memory leaks).

## Async in useEffect

**DO:** Define async function inside effect, then call it. Use `AbortController` to cancel requests on cleanup. Handle race conditions with boolean flag.

**DON'T:** Make useEffect callback itself async: `useEffect(async () => {})`. Forget cleanup for async operations.

## Code Splitting

**DO:** Lazy load routes: `React.lazy(() => import('./Page'))`. Wrap in `<Suspense>` with fallback. Split on route boundaries.

**DON'T:** Load all routes eagerly in main bundle. Use lazy() without Suspense (crashes). Over-split (too many chunks hurts performance).

## Component Definition

**DO:** Define components at module level (top-level). Use named function declarations for better DevTools/stack traces. PascalCase for component names.

**DON'T:** Define components inside other components (breaks Fast Refresh). Anonymous arrow functions: `() => <div />` (no DevTools name). Define components conditionally.

---

## ✅ CHECKLIST

- [ ] Components pure and side-effect-free
- [ ] Dependencies in useEffect/useCallback/useMemo complete
- [ ] useCallback/useMemo used only where needed (with evidence)
- [ ] No direct DOM manipulation outside refs
- [ ] State colocated at lowest level (no prop drilling > 2 levels)
- [ ] Context not overused for frequently changing state
- [ ] Keys are stable identifiers (not index for dynamic lists)
- [ ] Controlled vs uncontrolled inputs handled consistently
- [ ] useEffect cleanup functions present for subscriptions/timers
- [ ] No async functions directly in useEffect callback
- [ ] React.lazy + Suspense used for route code splitting
- [ ] No anonymous components (named functions at top level)

---

## 🚩 FLAG LEVELS

**🔴 Critical:** Conditional hooks (Rules of Hooks), missing cleanup (memory leaks), async function as useEffect callback, anonymous components (breaks Fast Refresh)

**🟠 High Priority:** Missing dependencies in hooks, index as key for dynamic lists, direct DOM manipulation, prop drilling beyond 2 levels

**🟡 Suggestions:** Extract repeated logic to custom hooks, consider memoization (with profiling), simplify complex useEffect by splitting
