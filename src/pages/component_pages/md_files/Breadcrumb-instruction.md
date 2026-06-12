# Breadcrumb

## Shared Instructions

Use shared instructions:
- `shadcn-implementation.instructions.md`
- `tailwind-implementation.instructions.md`
- `react-implementation.instructions.md`
- `code-review.instructions.md`

---

### Typography Rule

**Do NOT use `leading-snug`.** Use explicit line-height classes matched to font size:
- `text-2xs` → `leading-3`
- `text-xs` → `leading-4`
- `text-sm` → `leading-4.5`
- `text-base` → `leading-5.5`
- `text-lg` → `leading-6.5`
- `text-xl` → `leading-7`
- `text-2xl` → `leading-8`
- `text-3xl` → `leading-9`
- `text-4xl` → `leading-12`

---

## Overview

Navigation component that shows the user's current location within a hierarchy. Composed of a single reusable `BreadcrumbItem` repeated any number of times. The breadcrumb of any length is built by composing this one component — do NOT create separate components for "2 items", "3 items", etc.

### Components

| Component | Purpose |
|---|---|
| `Breadcrumb` | Wrapper — renders the `<nav>` + `<ol>` and handles the separator between items automatically |
| `BreadcrumbItem` | Single reusable item with 3 states: `default`, `current`, `hover` |

---

## `Breadcrumb` Wrapper

### Props

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | required |
| `aria-label` | `string` | `'Breadcrumb'` |
| `className` | `string` | `undefined` |

### Layout

```
inline-flex items-center {{{gapClass}}}
```

> `{{{gapClass}}}` = {{{gapPx}}} · Between every child pair the wrapper automatically injects an `ArrowRightIcon` separator.

### Separator Injection

The wrapper renders items and separators from `children`:

- Filter `children` to extract `BreadcrumbItem` instances.
- Between each pair, inject a separator icon (see Separator Icon section).
- The last item is automatically treated as `state='current'` — override by passing `state` explicitly on the item.
- Wrap in `<nav aria-label="Breadcrumb"><ol className="inline-flex items-center gap-0.5">` for semantics.
- Each `BreadcrumbItem` renders inside an `<li>`.

---

## `BreadcrumbItem`

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | required |
| `href` | `string` | `undefined` |
| `state` | `'default' \| 'current' \| 'hover'` | `'default'` |
| `onClick` | `() => void` | `undefined` |
| `className` | `string` | `undefined` |

> `state='current'` is set automatically by the wrapper on the last item. Override explicitly when needed.

---

## CVA Structure

Apply CVA to the **text element** inside `BreadcrumbItem`.

### Base Classes

```
{{{textSizeClass}}} {{{leadingClass}}} whitespace-nowrap transition-colors
```

> `{{{textSizeClass}}}` = {{{pxSize}}} · `{{{leadingClass}}}` = {{{pxLeading}}}

### `state` Variant

| State | Classes |
|---|---|
| `default` | `font-normal text-text-secondary` |
| `hover` | `font-normal text-text-brand underline` |
| `current` | `font-medium text-text-primary` |

### Default Variant

```
state: 'default'
```

---

## State Behavior

| State | When | Interactive |
|---|---|---|
| `default` | All non-final items at rest | Yes — renders as `<a href>` |
| `hover` | CSS `:hover` on a `default` item | Driven by `hover:` Tailwind utilities — no JS state |
| `current` | The last / active item | No — renders as `<span>`, no link |

> Hover is CSS-only. Apply `hover:text-text-brand hover:underline` directly alongside the `default` state classes — no JS hover state needed.

---

## HTML Element Rules

| State | Element | Notes |
|---|---|---|
| `default` | `<a href={href}>` | Navigable link |
| `current` | `<span aria-current="page">` | Not a link — current page |

Never use `<button>` for breadcrumb items. If `href` is absent for a `default` item, render as `<span>` with `onClick`.

---

## Separator Icon

Between every pair of breadcrumb items, render an `ArrowRightIcon`.

- Import from `src/assets/icons/`. Do not create inline SVG.
- Size: `{{{separatorClass}}}` ({{{separatorPx}}}).
- Color: `text-text-secondary` — always, regardless of adjacent item state.
- `aria-hidden="true"`.
- The separator is rendered by `Breadcrumb` wrapper — never inside `BreadcrumbItem`.

---

## Typography

| State | Classes |
|---|---|
| Default | `{{{textSizeClass}}} font-normal {{{leadingClass}}} text-text-secondary` |
| Hover | `{{{textSizeClass}}} font-normal {{{leadingClass}}} text-text-brand underline` |
| Current | `{{{textSizeClass}}} font-medium {{{leadingClass}}} text-text-primary` |

> `{{{textSizeClass}}}` = {{{pxSize}}} · `{{{leadingClass}}}` = {{{pxLeading}}} · `font-normal` = 400 · `font-medium` = 500

---

## Usage Pattern

A 4-item breadcrumb is built by composing one repeated `BreadcrumbItem`:

```
<Breadcrumb>
  <BreadcrumbItem label="Home"     href="/" />
  <BreadcrumbItem label="Products" href="/products" />
  <BreadcrumbItem label="Category" href="/products/category" />
  <BreadcrumbItem label="Item"     state="current" />
</Breadcrumb>
```

The wrapper injects separators automatically. Any number of items is supported without creating new components.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-text-secondary` | `text-text-secondary` | Default item text + separator icon |
| `--color-text-primary` | `text-text-primary` | Current item text |
| `--color-text-brand` | `text-text-brand` | Hover item text |
