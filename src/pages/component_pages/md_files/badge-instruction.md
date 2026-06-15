# Badge

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

Compact pill-shaped label for status, tags, and metadata. Non-interactive except for the optional suffix close button.

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | required |
| `variant` | `'filled' \| 'bordered' \| 'tertiary'` | `'filled'` |
| `color` | `BadgeColor` | `'primary'` |
| `showPrefix` | `boolean` | `true` |
| `showSuffix` | `boolean` | `false` |
| `onRemove` | `() => void` | `undefined` |

**BadgeColor:** `primary` `secondary` `success` `warning` `critical` `gray` `cyan` `indigo` `purple` `fuchsia` `rose` `teal`

---

## Current Configuration

```
<Badge
  label="Badge"
  variant="filled"
  color="primary"
  showPrefix=true
  showSuffix=false
/>
```

---

## Layout

Slot order is fixed: `[Prefix Dot?] → [Label] → [Suffix Icon?]`

### Container

```
inline-flex items-center box-border whitespace-nowrap flex-shrink-0
rounded-full px-2 py-1 gap-1.5
```

> **Tailwind scale (1 unit = 4px):**
> `px-2` = 8px · `py-1` = 4px · `gap-1.5` = 6px · `rounded-full` = 9999px

> **Variant exception:** `bordered` uses `py-0.75` (3px) instead of `py-1` to account for the 1px border.

Height is explicitly set. `filled` and `tertiary` use `h-6`. `bordered` uses a reduced height `h-[22px]` to account for its 1px border.


---

## Typography

```
text-xs font-medium leading-4
```

> `text-xs` = 12px · `leading-4` = 16px · `font-medium` = 500

---

## Prefix Dot

- Conditionally rendered — use `{showPrefix && ...}`. Remove from DOM when hidden.
- Classes: `block w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current`
  > `w-1.5 h-1.5` = 6×6px · `bg-current` inherits text color automatically.
- Always `aria-hidden="true"`.

---

## Suffix Icon

- Conditionally rendered — use `{showSuffix && ...}`. Remove from DOM when hidden.
- Use the close/remove icon from `src/assets/icons/`. Do not create inline SVG.
- Apply `aria-hidden="true"` on the icon element.
- Icon display size: `size-3` (12×12px).
- When `onRemove` provided → wrap in `<button type="button" aria-label="Remove {label}">`:
  ```
  inline-flex items-center justify-center bg-transparent border-0 p-0 cursor-pointer
  hover:opacity-70
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-current
  focus-visible:outline-offset-2 focus-visible:rounded-full
  ```
- When `onRemove` absent → `<span aria-hidden="true">`.

---

## Color Token Map

### Filled — `text-text-white` applies to text, dot, and icon for all 12 colors

| Color | Background |
|---|---|
| `primary` | `bg-bg-brand` |
| `secondary` | `bg-bg-brand-secondary` |
| `success` | `bg-bg-success` |
| `warning` | `bg-bg-warning` |
| `critical` | `bg-bg-critical` |
| `gray` | `bg-bg-gray-dark` |
| `cyan` | `bg-cyan-dark` |
| `indigo` | `bg-indigo-dark` |
| `purple` | `bg-purple-dark` |
| `fuchsia` | `bg-fuchsia-dark` |
| `rose` | `bg-rose-dark` |
| `teal` | `bg-teal-dark` |

### Bordered — light background + 1px colored border + colored text

| Color | Background | Border | Text |
|---|---|---|---|
| `primary` | `bg-bg-brand-light` | `border border-border-brand` | `text-text-brand` |
| `secondary` | `bg-bg-brand-secondary-light` | `border border-border-brand-secondary` | `text-text-brand-secondary` |
| `success` | `bg-bg-success-light` | `border border-border-success` | `text-text-success` |
| `warning` | `bg-bg-warning-light` | `border border-border-warning` | `text-text-warning` |
| `critical` | `bg-bg-critical-light` | `border border-border-critical` | `text-text-critical` |
| `gray` | `bg-bg-secondary` | `border border-border-gray-dark` | `text-text-secondary` |
| `cyan` | `bg-cyan-light` | `border border-cyan-dark` | `text-cyan-dark` |
| `indigo` | `bg-indigo-light` | `border border-indigo-dark` | `text-indigo-dark` |
| `purple` | `bg-purple-light` | `border border-purple-dark` | `text-purple-dark` |
| `fuchsia` | `bg-fuchsia-light` | `border border-fuchsia-dark` | `text-fuchsia-dark` |
| `rose` | `bg-rose-light` | `border border-rose-dark` | `text-rose-dark` |
| `teal` | `bg-teal-light` | `border border-teal-dark` | `text-teal-dark` |

### Tertiary — same as Bordered without the border class

| Color | Background | Text |
|---|---|---|
| `primary` | `bg-bg-brand-light` | `text-text-brand` |
| `secondary` | `bg-bg-brand-secondary-light` | `text-text-brand-secondary` |
| `success` | `bg-bg-success-light` | `text-text-success` |
| `warning` | `bg-bg-warning-light` | `text-text-warning` |
| `critical` | `bg-bg-critical-light` | `text-text-critical` |
| `gray` | `bg-bg-secondary` | `text-text-secondary` |
| `cyan` | `bg-cyan-light` | `text-cyan-dark` |
| `indigo` | `bg-indigo-light` | `text-indigo-dark` |
| `purple` | `bg-purple-light` | `text-purple-dark` |
| `fuchsia` | `bg-fuchsia-light` | `text-fuchsia-dark` |
| `rose` | `bg-rose-light` | `text-rose-dark` |
| `teal` | `bg-teal-light` | `text-teal-dark` |
