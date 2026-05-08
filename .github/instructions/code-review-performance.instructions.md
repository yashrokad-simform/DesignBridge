---
name: Code Review - Performance Optimization
description: Enforce React performance best practices including memoization, re-render prevention, code splitting, and memory leak prevention
applyTo: '**/*.tsx, **/*.jsx, src/components/**, src/pages/**, src/hooks/**, src/routes/**'
---

Optimize React performance by preventing unnecessary re-renders, using memoization correctly, and avoiding memory leaks.

## 🎯 Prevent Unnecessary Re-renders

**DO:** Isolate state to lowest needed component. Use `React.memo()` for pure components receiving stable props. Colocate state near usage.

**DON'T:** Lift state unnecessarily. Parent state changes trigger all children re-renders unless memoized.

## 💾 Memoize Heavy Computations

**DO:** Wrap expensive calculations (filtering, sorting, transforming large arrays) in `useMemo()` with correct dependencies.

**DON'T:** Compute expensive values on every render. Profile before memoizing—premature optimization wastes memory.

## 🔄 Stabilize Event Handlers

**DO:** Use `useCallback()` for handlers passed as props to memoized children. Prevents breaking memo optimization.

**DON'T:** Create new function references inline in map/render. Each render creates new function, breaking child memoization.

## 🔑 Stable List Keys

**DO:** Use stable unique IDs (`user.id`, `item.uuid`) as keys. Composite keys when needed: `${userId}-${timestamp}`.

**DON'T:** Use array index (breaks on reorder/filter) or `Math.random()` (forces re-mount every render).

## 🖼️ Prevent Layout Shift (CLS)

**DO:** Specify `width` and `height` attributes on images. Use aspect ratio containers (`aspect-video`, `aspect-square`) with Tailwind.

**DON'T:** Omit image dimensions. Layout shifts when images load, hurts Core Web Vitals score.

## 🚀 Route-Level Code Splitting

**DO:** Use `React.lazy(() => import('@/pages/Page'))` wrapped in `<Suspense>` for all routes in `routes/index.tsx`.

**DON'T:** Synchronous route imports. Loads entire app upfront, bloats initial bundle, slows first load.

## 📡 Data Fetching Patterns

**DO:** Use React Query/TanStack Query for data fetching. Custom hooks with `useEffect` must include all dependencies and cancellation logic.

**DON'T:** `useEffect` with empty deps fetching data. Missing dependencies cause stale closures, wrong data displayed.

## 🧹 Memory Leak Prevention

**DO:** Return cleanup function from `useEffect` for timers (`clearInterval`, `clearTimeout`), event listeners (`removeEventListener`), subscriptions (`unsubscribe`).

**DON'T:** Forget cleanup. Timers keep running after unmount, event listeners accumulate, memory leaks grow.

## 🧊 Memoize Pure Components

**DO:** Wrap presentational components in `React.memo()` when they receive stable props and render frequently.

**DON'T:** Skip memoization on expensive pure components. Unnecessary re-renders hurt performance.

---

## ✅ CHECKLIST

- [ ] No unnecessary re-renders — parent state doesn't repaint unrelated children
- [ ] Heavy computations wrapped in `useMemo` with correct dependencies
- [ ] Event handlers stable with `useCallback` when passed to memoized children
- [ ] Lists use stable, unique `key` props (never `Math.random()` or index)
- [ ] Images have explicit `width`/`height` to prevent layout shift
- [ ] Route-level code splitting via `React.lazy` in `routes/index.tsx`
- [ ] No `useEffect` with empty deps fetching data — use proper pattern
- [ ] No memory leaks — timers, listeners, subscriptions cleaned up
- [ ] `React.memo` considered for pure presentational components

---

## 🚩 FLAG LEVELS

**🔴 Critical:** Memory leaks (missing cleanup), useEffect empty deps fetching data (stale closures), index as key in dynamic lists

**🟠 High Priority:** Heavy computations not memoized, missing route code splitting, images without dimensions (CLS)

**🟡 Suggestions:** Event handlers not memoized, pure components not wrapped in memo, additional code splitting
