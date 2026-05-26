# Button

## Shared Instructions

Use shared instructions:
- `shadcn-implementation.instructions.md`
- `tailwind-implementation.instructions.md`
- `react-implementation.instructions.md`
- `code-review-shadcn.instructions.md`
- `code-review-structure.instructions.md`

---

### Typography Rule

**Do NOT use `leading-snug`.** Use explicit line-height classes matched to font size:
- `text-2xs` → `leading-3`
- `text-xs` → `leading-4`
- `text-sm` → `leading-4.5`
- `text-md` → `leading-5.5`
- `text-lg` → `leading-6.5`
- `text-xl` → `leading-7`
- `text-2xl` → `leading-8`
- `text-3xl` → `leading-9`
- `text-4xl` → `leading-12`

---

## Overview

Primary interactive element for triggering actions. Use `cva` (class-variance-authority) for all variant and size composition. Use `cn()` from `@/lib/utils` for merging.

### Props

| Prop | Type | Default |
|---|---|---|
| `variant` | `ButtonVariant` | `'primary'` |
| `size` | `'lg' \| 'sm'` | `'lg'` |
| `leftIcon` | `ReactNode` | `undefined` |
| `rightIcon` | `ReactNode` | `undefined` |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `asChild` | `boolean` | `false` |

**ButtonVariant:** `primary` `bordered` `text` `link` `critical` `critical-bordered` `critical-text` `icon-filled` `icon-secondary` `icon-only`

---

## CVA Structure

Build using two `variants`: `variant` and `size`. Use `compoundVariants` to override dimensions for text-style and icon-style variants.

### Base Classes

```
inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors
disabled:pointer-events-none
```

### `variant` Classes

| Variant | Classes |
|---|---|
| `primary` | `rounded-xl bg-btn-bg-primary text-btn-text-primary hover:bg-btn-bg-primary-focused disabled:bg-btn-bg-primary-disabled disabled:text-btn-text-disabled` |
| `bordered` | `rounded-xl border border-btn-border-primary bg-btn-bg-bordered text-btn-text-bordered hover:border-btn-border-focused disabled:border-btn-border-disabled disabled:text-btn-text-disabled` |
| `text` | `text-btn-text-secondary hover:text-btn-text-secondary-focused disabled:text-btn-text-secondary-disabled` |
| `link` | `underline text-btn-text-secondary hover:text-btn-text-secondary-focused disabled:text-btn-text-secondary-disabled` |
| `critical` | `rounded-xl bg-btn-bg-critical text-btn-text-primary disabled:bg-btn-bg-primary-disabled disabled:text-btn-text-disabled` |
| `critical-bordered` | `rounded-xl border border-btn-border-critical bg-btn-bg-bordered text-btn-text-critical disabled:border-btn-border-disabled disabled:text-btn-text-disabled` |
| `critical-text` | `text-btn-text-critical disabled:text-btn-text-disabled` |
| `icon-filled` | `rounded-xl bg-btn-bg-primary text-btn-icon-primary hover:bg-btn-bg-primary-focused disabled:bg-btn-bg-primary-disabled disabled:text-btn-icon-disabled` |
| `icon-secondary` | `rounded-xl border border-btn-border-primary bg-btn-bg-bordered text-btn-icon-bordered hover:border-btn-border-focused disabled:border-btn-border-disabled disabled:text-btn-icon-disabled` |
| `icon-only` | `text-btn-text-secondary hover:text-btn-text-secondary-focused disabled:text-btn-text-secondary-disabled` |

### `size` Classes

| Size | Classes |
|---|---|
| `lg` | `h-11 px-5 gap-2 text-sm leading-4.5` |
| `sm` | `h-9 px-4 gap-1 text-xs leading-4` |

### `compoundVariants`

| Variant | Size | Override Classes |
|---|---|---|
| `text`, `link`, `critical-text` | `lg` | `h-5 px-0` |
| `text`, `link`, `critical-text` | `sm` | `h-4 px-0` |
| `icon-filled`, `icon-secondary` | `lg` | `size-11 p-0` |
| `icon-filled`, `icon-secondary` | `sm` | `size-9 p-0` |
| `icon-only` | `lg` | `size-5 p-0` |
| `icon-only` | `sm` | `size-4 p-0` |

---

## Dimensions Reference

> **Tailwind scale (1 unit = 4px):**
> `h-11` = 44px · `h-9` = 36px · `h-5` = 20px · `h-4` = 16px
> `px-5` = 20px · `px-4` = 16px · `gap-2` = 8px · `gap-1` = 4px
> `size-11` = 44×44px · `size-9` = 36×36px · `size-5` = 20×20px · `size-4` = 16×16px
> `rounded-xl` = 12px · `text-sm` = 14px · `text-xs` = 12px

---

## Icon Slots

- All icons must be imported from `src/assets/icons/`. Do not create inline SVG.
- Apply `aria-hidden="true"` on every icon element.
- Color is inherited via `currentColor` — no separate color prop needed.
- `leftIcon` and `rightIcon` are optional and independent.
- Icon size: `size-5 flex-shrink-0` for `lg` · `size-4 flex-shrink-0` for `sm`.
- `icon-filled`, `icon-secondary`, `icon-only` variants render a single centered icon with no label.
- `icon-only` requires `aria-label` on the button element.

---

## Loading State

- Apply `disabled` and render a spinner icon from `src/assets/icons/` in the `leftIcon` slot.
- Spinner size matches the icon size for the active `size` variant.
- Button width must not change — label text stays visible alongside the spinner.

---

## Color Token Map

### Background

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-btn-bg-primary` | `bg-btn-bg-primary` | primary, icon-filled (enabled) |
| `--color-btn-bg-primary-focused` | `bg-btn-bg-primary-focused` | primary, icon-filled (hover) |
| `--color-btn-bg-primary-disabled` | `bg-btn-bg-primary-disabled` | primary, critical, icon-filled (disabled) |
| `--color-btn-bg-bordered` | `bg-btn-bg-bordered` | bordered, critical-bordered, icon-secondary |
| `--color-btn-bg-critical` | `bg-btn-bg-critical` | critical (enabled + hover) |

### Border

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-btn-border-primary` | `border-btn-border-primary` | bordered, icon-secondary (enabled) |
| `--color-btn-border-focused` | `border-btn-border-focused` | bordered, icon-secondary (hover) |
| `--color-btn-border-disabled` | `border-btn-border-disabled` | bordered, critical-bordered, icon-secondary (disabled) |
| `--color-btn-border-critical` | `border-btn-border-critical` | critical-bordered (all active states) |

### Text

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-btn-text-primary` | `text-btn-text-primary` | primary, critical label |
| `--color-btn-text-bordered` | `text-btn-text-bordered` | bordered label |
| `--color-btn-text-secondary` | `text-btn-text-secondary` | text, link, icon-only (enabled) |
| `--color-btn-text-secondary-focused` | `text-btn-text-secondary-focused` | text, link, icon-only (hover) |
| `--color-btn-text-secondary-disabled` | `text-btn-text-secondary-disabled` | text, link, icon-only (disabled) |
| `--color-btn-text-critical` | `text-btn-text-critical` | critical-bordered, critical-text |
| `--color-btn-text-disabled` | `text-btn-text-disabled` | primary, bordered, critical variants (disabled) |

### Icon

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-btn-icon-primary` | `text-btn-icon-primary` | icon-filled |
| `--color-btn-icon-bordered` | `text-btn-icon-bordered` | icon-secondary |
| `--color-btn-icon-secondary` | `text-btn-icon-secondary` | text, link, icon-only (enabled) |
| `--color-btn-icon-secondary-focused` | `text-btn-icon-secondary-focused` | text, link, icon-only (hover) |
| `--color-btn-icon-secondary-disabled` | `text-btn-icon-secondary-disabled` | text, link, icon-only (disabled) |
| `--color-btn-icon-disabled` | `text-btn-icon-disabled` | primary, bordered, critical variants (disabled) |
| `--color-btn-icon-critical` | `text-btn-icon-critical` | critical-bordered, critical-text |
