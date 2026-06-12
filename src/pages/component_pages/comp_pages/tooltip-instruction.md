# Tooltip

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

Floating informational overlay triggered by hover or focus. A single reusable component supports all 8 arrow placements — do NOT create separate components per direction. The directional examples in Figma are usage demonstrations only.

Use **`@floating-ui/react`** for runtime positioning. The `placement` prop drives both the `@floating-ui` position and the arrow orientation.

### Props

| Prop | Type | Default |
|---|---|---|
| `heading` | `string` | `undefined` |
| `caption` | `string` | `undefined` |
| `showClose` | `boolean` | `false` |
| `placement` | `TooltipPlacement` | `'top'` |
| `onClose` | `() => void` | `undefined` |
| `children` | `ReactNode` | required — the trigger element |
| `className` | `string` | `undefined` |

> **Heading + Caption rule:** At least one of `heading` or `caption` must always be provided. If both are `undefined`, the tooltip must not render. Enforce this with a runtime check or TypeScript discriminated union.

**TooltipPlacement:**
```
'top' | 'top-start' | 'top-end' |
'bottom' | 'bottom-start' | 'bottom-end' |
'left' | 'right'
```

> Map Figma naming to Floating UI naming: `top-left → top-start`, `top-right → top-end`, `bottom-left → bottom-start`, `bottom-right → bottom-end`.

---

## Layout Structure

```
[Trigger]               ← children, wrapped in a span/div
[Tooltip Floating Root] ← absolutely positioned by @floating-ui
  ├── [Arrow]           ← before or after body depending on placement
  └── [Body]
```

For `bottom*` placements: Arrow renders **before** Body (arrow appears above).
For `top*` placements: Arrow renders **after** Body (arrow appears below).
For `left`: Arrow renders **after** Body (arrow on right side).
For `right`: Arrow renders **before** Body (arrow on left side).

---

## Floating Root Container

```
flex drop-shadow-[0px_0px_10px_rgba(153,153,153,0.15)] w-[200px]
```

> Shadow has no token — use the exact arbitrary value.
> `w-[200px]` is the Figma reference width. Use `max-w-[200px]` for content-adaptive sizing.

Direction-based flex:
- `top*`, `bottom*` placements → `flex-col`
- `left`, `right` placements → `flex-row items-center`

---

## Body

```
bg-bg-black rounded-xl p-3 flex flex-col gap-0 items-start w-full
```

> `p-3` = 12px · `rounded-xl` = 12px · Body is always full-width of the floating root.

### Inner Row (heading/caption + close button)

```
flex flex-row gap-2 items-start w-full
```

> `gap-2` = 8px between text block and close button

### Text Block

```
flex flex-col gap-2 flex-1 min-w-0
```

> `gap-2` = 8px between heading and caption

---

## Typography

### Heading

```
text-sm font-medium leading-4.5 text-text-white w-full
```

> `text-sm` = 14px · `leading-4.5` = 18px · `font-medium` = 500

- Render only when `heading` prop is provided. Remove from DOM when absent.

### Caption

```
text-xs font-normal leading-5 text-text-white w-full
```

> `text-xs` = 12px · `leading-5` = 20px (paragraph line-height) · `font-normal` = 400

- Render only when `caption` prop is provided. Remove from DOM when absent.

---

## Close Button

Rendered only when `showClose={true}`. Remove from DOM when absent.

- Use `CloseIcon` from `src/assets/icons/CloseIcon.tsx` if it exists. Otherwise create it.
- Size: `size-4` (16×16px).
- Color: `text-icon-secondary` — apply to the icon element via `currentColor`.
- Wrap in `<button type="button" aria-label="Close tooltip">`.
- Button base classes: `flex items-start bg-transparent border-0 p-0 flex-shrink-0`.

---

## Arrow

A CSS-only directional beak. No image asset — purely constructed with Tailwind.

### How It Works

An `overflow-clip` container clips a rotated square into a triangle:

```
[overflow-hidden container h-[5px] or w-[5px]]
  └── [size-[11.314px] shrink-0 centering wrapper]      ← 8 × √2 ≈ 11.314
        └── [rotate-45 wrapper]
              └── [size-[8px] square bg-bg-black with one rounded corner]
```

> `size-[11.314px]` = 8px × √2, the diagonal of the 8px beak square. No Tailwind multiple — use arbitrary.
> The `overflow-clip` container is 5px tall (vertical) or 5px wide (horizontal), which clips the diamond into a visible triangle tip.

### Arrow Container Classes

**Vertical placements (top*, bottom*):**

```
flex h-[5px] w-full overflow-hidden shrink-0
```

**Horizontal placements (left, right):**

```
flex w-[5px] overflow-hidden shrink-0 self-stretch
```

### Arrow Alignment by Placement

| Placement | Container alignment classes |
|---|---|
| `top` | `items-end justify-center` |
| `top-start` | `items-end justify-start px-6` |
| `top-end` | `items-end justify-end px-6` |
| `bottom` | `items-start justify-center` |
| `bottom-start` | `items-start justify-start px-6` |
| `bottom-end` | `items-start justify-end px-6` |
| `left` | `items-center justify-end` |
| `right` | `items-center justify-start` |

> `px-6` = 24px horizontal offset for corner placements.

### Arrow Beak Classes

The `size-[8px]` square. Apply one rounded corner only based on placement group:

| Placement group | Beak class |
|---|---|
| `top*` (arrow points down) | `size-[8px] bg-bg-black rounded-br-[2px]` |
| `bottom*` (arrow points up) | `size-[8px] bg-bg-black rounded-tl-[2px]` |
| `left` (arrow points right) | `size-[8px] bg-bg-black rounded-tr-[2px]` |
| `right` (arrow points left) | `size-[8px] bg-bg-black rounded-bl-[2px]` |

---

## `@floating-ui/react` Integration

### Recommended hooks

```
useFloating({ placement, middleware: [offset(0), flip(), shift()] })
useInteractions([useHover(context), useFocus(context), useDismiss(context)])
useRole(context, { role: 'tooltip' })
```

### Arrow middleware

Use `arrow()` middleware from `@floating-ui/react` if programmatic arrow positioning is needed. For static CSS arrow, use the Tailwind approach above and set `offset(8)` to account for the 5px arrow + 3px gap.

---

## Accessibility

- Trigger element: `aria-describedby={tooltipId}`.
- Tooltip root: `role="tooltip"` · `id={tooltipId}`.
- Tooltip must be reachable via keyboard (focus on trigger shows tooltip).
- `useDismiss` closes on Escape key.
- Close button: `aria-label="Close tooltip"` + keyboard focusable.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-black` | `bg-bg-black` | Body + arrow beak background |
| `--color-text-white` | `text-text-white` | Heading + caption text |
| `--color-icon-secondary` | `text-icon-secondary` | Close icon color |
