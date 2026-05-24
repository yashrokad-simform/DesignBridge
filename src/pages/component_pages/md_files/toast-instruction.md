# Toast

## Shared Instructions

Use shared instructions:
- `shadcn-implementation.instructions.md`
- `tailwind-implementation.instructions.md`
- `react-implementation.instructions.md`
- `code-review-shadcn.instructions.md`
- `code-review-structure.instructions.md`

---

## Overview

Transient notification component displayed as a floating overlay. Supports four semantic variants: `success`, `warning`, `critical`, `info`. All four share the same dark container — the visual difference per variant is the status icon.

### Props

| Prop | Type | Default |
|---|---|---|
| `variant` | `'success' \| 'warning' \| 'critical' \| 'info'` | `'info'` |
| `title` | `string` | required |
| `description` | `string` | `undefined` |
| `onClose` | `() => void` | `undefined` |
| `className` | `string` | `undefined` |

---

## Layout Structure

```
[Toast Container]
  ├── [Status Icon]          ← absent for info variant
  ├── [Text Content]         ← flex-1
  └── [Close Button]         ← trailing slot
```

Container: `flex flex-row items-start`

---

## CVA Structure

Apply CVA to the **toast container**.

### Base Classes

```
relative flex flex-row items-start gap-3 p-3 rounded-xl
bg-bg-black w-[343px]
shadow-[0px_3px_30px_0px_rgba(140,140,140,0.12)]
```

> `gap-3` = 12px · `p-3` = 12px · `rounded-xl` = 12px · `w-[343px]` is the Figma reference width — use `max-w-[343px] w-full` for responsive behavior · Shadow has no token — use the exact arbitrary value.

### `variant` Variant

The variant drives only which **status icon** to render. The container classes do not change per variant.

| Variant | Status Icon |
|---|---|
| `success` | `TickCircleIcon` (`size-5`) |
| `warning` | `WarningIcon` (`size-5`) |
| `critical` | `CloseCircleIcon` (`size-5`) |
| `info` | `InfoCircleIcon` (`size-5`) |

## Status Icon

Shown for `success`, `warning`, `critical`, and `info`.

### Icon Slot Classes

```
flex items-start flex-shrink-0
```

### Icon Size

```
size-5
```

> `size-5` = 20×20px

### Icon Files

Import from `src/assets/icons/`. Do not create inline SVG.

| Variant | File |
|---|---|
| `success` | `TickCircleIcon.tsx` |
| `warning` | `WarningIcon.tsx` |
| `critical` | `CloseCircleIcon.tsx` |
| `info` | `InfoCircleIcon.tsx` |

### Icon Color

The `info` variant icon uses `text-icon-white` (`--color-icon-white`). All other variants use their own inherent colors.

- `aria-hidden="true"` on all icon elements.
- All four variants render a status icon — none are absent from the DOM.

---

## Text Content

```
flex flex-col gap-0.5 flex-1 min-w-0
```

> `gap-0.5` = 2px between title and description · `flex-1 min-w-0` fills available width and prevents overflow

### Title

```
text-sm font-medium leading-[22px] text-text-white w-full
```

> `text-sm` = 14px · `leading-[22px]` = paragraph line-height (Figma: `Font 14px/Font-height para` = 22px) — no standard Tailwind leading class, use arbitrary.

### Description

```
text-xs font-normal leading-4 text-text-gray-light w-full
```

> `text-xs` = 12px · `leading-4` = 16px · `text-text-brand-light` = `--color-text-brand-light` = `#b0cbe9` (light blue — readable on dark background)

- Remove description from DOM when not provided — never render empty element.

---

## Close Button

Trailing slot. Renders only when `onClose` is provided.

### Wrapper Classes

```
flex items-center py-[2px] flex-shrink-0
```

> `py-[2px]` = 2px vertical padding on wrapper — vertically aligns the close icon with the title baseline. No token equivalent — use arbitrary.

### Close Icon

```
size-4 cursor-pointer text-icon-gray-light
```

> `size-4` = 16×16px

- Import `CloseIcon.tsx` from `src/assets/icons/`. Do not create inline SVG.
- `aria-label="Close notification"` on the button element.
- Wrap in `<button type="button">` for keyboard accessibility.
- Button base classes: `flex items-center justify-center bg-transparent border-0 p-0`

---

## Toast Manager / Usage Pattern

Toast notifications are triggered programmatically, not rendered inline. Implement a toast manager pattern:

- Maintain a list of active toasts in state (context or Zustand/Jotai store).
- Render a fixed portal container at the bottom of the viewport.
- Each toast auto-dismisses after a timeout (recommended: 4000ms).
- `onClose` removes the toast from the list immediately.

### Portal Container Classes

```
fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50
```

> `bottom-4` = 16px from bottom · `gap-2` = 8px between stacked toasts.

---

## Animation

Optional — add enter/exit animation respecting `prefers-reduced-motion`:

```
@media (prefers-reduced-motion: no-preference) {
  /* Enter: slide up + fade in */
  /* Exit: fade out */
}
```

Use `tw-animate-css` utilities already available in the project for enter/exit transitions.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-black` | `bg-bg-black` | Toast container background |
| `--color-text-white` | `text-text-white` | Title text |
| `--color-text-gray-light` | `text-text-gray-light` | Description text |
| `--color-icon-gray-light` | `text-icon-gray-light` | Close icon |