# Toggle Button & Toggle Button Tile

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

Two components sharing a single `ToggleSwitch` sub-component. `ToggleButton` pairs the switch with an inline label. `ToggleButtonTile` pairs the switch with a stacked title + caption layout. Both share the same 4 states.

### States

| State | Switch position | Track bg | Thumb asset |
|---|---|---|---|
| `enabled` | Off (left) | `bg-bg-brand-light` | White circle |
| `active` | On (right) | `bg-bg-brand-secondary` | White circle |
| `disabled` | Off (left) | `bg-bg-secondary` | Gray circle |
| `active-disabled` | On (right) | `bg-bg-secondary` | Gray circle |

> **Disabled text rule:** All text in disabled states uses `text-input-text-disabled`. Do NOT use opacity to create the disabled appearance.

---

# Part A — ToggleSwitch (sub-component)

Shared building block used by both `ToggleButton` and `ToggleButtonTile`. Build as its own reusable component.

**File:** `src/components/ui/toggle-switch/ToggleSwitch.tsx`

### Props

| Prop | Type | Default |
|---|---|---|
| `state` | `'enabled' \| 'active' \| 'disabled' \| 'active-disabled'` | `'enabled'` |

---

## CVA Structure — ToggleSwitch

### Track

```
relative w-10 h-[22px] rounded-full flex-shrink-0 transition-colors
```

> `w-10` = 40px · `h-[22px]` = 22px (no standard Tailwind class — arbitrary) · `rounded-full` = 9999px

### `state` Variant on Track

| State | Track bg |
|---|---|
| `enabled` | `bg-bg-brand-light` |
| `active` | `bg-bg-brand-secondary` |
| `disabled` | `bg-bg-secondary` |
| `active-disabled` | `bg-bg-secondary` |

---

## Thumb

A circular asset absolutely positioned inside the track. Import from `src/assets/icons/`. Do not create inline SVG.

| Asset file | Used for |
|---|---|
| `ToggleThumbWhite.tsx` (or `.svg`) | `enabled` and `active` states |
| `ToggleThumbGray.tsx` (or `.svg`) | `disabled` and `active-disabled` states |

### Thumb Size

```
size-[18px]
```

> `size-[18px]` = 18×18px — no clean Tailwind multiple, use arbitrary.

### Thumb Position by State

| State | Position Classes |
|---|---|
| `enabled` (off) | `absolute inset-y-[2px] left-[2px] w-[18px]` |
| `active` (on) | `absolute top-1/2 -translate-y-1/2 right-[2px] size-[18px]` |
| `disabled` (off) | `absolute inset-y-[2px] left-[2px] w-[18px]` |
| `active-disabled` (on) | `absolute inset-y-[2px] right-[2px] w-[18px]` |

> `inset-y-[2px]` = top and bottom 2px · The thumb fills exactly the track height minus 2px padding on each vertical side (22px - 4px = 18px thumb height). Horizontal positioning moves it left (off) or right (on).

- `aria-hidden="true"` on the thumb.

---

# Part B — ToggleButton

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | `undefined` |
| `checked` | `boolean` | `false` (controlled) |
| `defaultChecked` | `boolean` | `false` (uncontrolled) |
| `disabled` | `boolean` | `false` |
| `onChange` | `(checked: boolean) => void` | `undefined` |
| `className` | `string` | `undefined` |

---

## Layout

```
inline-flex flex-row items-center gap-2 cursor-pointer select-none
```

> `gap-2` = 8px

Disabled: add `cursor-not-allowed pointer-events-none`.

---

## State Mapping

| `checked` | `disabled` | Switch state |
|---|---|---|
| `false` | `false` | `enabled` |
| `true` | `false` | `active` |
| `false` | `true` | `disabled` |
| `true` | `true` | `active-disabled` |

---

## Label Typography

```
text-sm font-medium leading-4.5 whitespace-nowrap
```

| State | Color |
|---|---|
| Enabled / Active | `text-text-primary` |
| Disabled / Active-Disabled | `text-input-text-disabled` |

> `text-sm` = 14px · `leading-4.5` = 18px · Remove label from DOM when not provided.

---

## Native Input

Use a visually hidden `<input type="checkbox">` (`sr-only`) for toggle behavior. Drive `checked` from its state.

> `role="switch"` on the input and `aria-checked={checked}` for screen readers.

---

# Part C — ToggleButtonTile

### Props

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | required |
| `caption` | `string` | `undefined` |
| `checked` | `boolean` | `false` |
| `defaultChecked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `onChange` | `(checked: boolean) => void` | `undefined` |
| `className` | `string` | `undefined` |

---

## Layout

```
flex flex-row items-start gap-2 rounded-xl w-full cursor-pointer select-none
```

> `gap-2` = 8px · `rounded-xl` = 12px · **No border or background** — the tile is a layout-only wrapper (unlike CheckboxTile and RadioTile which have bordered cards). Disabled: add `cursor-not-allowed pointer-events-none`.

> Slot order is fixed: `[ToggleSwitch] → [Content Area (title + caption)]` — switch always on the left, text on the right.

---

## State Mapping

Identical to ToggleButton — `checked` + `disabled` → switch state.

---

## Content Area

```
flex flex-col gap-1 flex-1 min-w-0
```

> `gap-1` = 4px between title and caption · `flex-1 min-w-0` fills remaining width

### Title

```
text-sm font-medium leading-4.5 w-full
```

| State | Color |
|---|---|
| Enabled / Active | `text-text-primary` |
| Disabled / Active-Disabled | `text-input-text-disabled` |

### Caption

```
text-xs font-medium leading-4 w-full
```

| State | Color |
|---|---|
| Enabled / Active | `text-text-secondary` |
| Disabled / Active-Disabled | `text-input-text-disabled` |

> `text-xs` = 12px · `leading-4` = 16px · Remove caption from DOM when not provided.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-brand-light` | `bg-bg-brand-light` | Track bg (enabled) |
| `--color-bg-brand-secondary` | `bg-bg-brand-secondary` | Track bg (active) |
| `--color-bg-secondary` | `bg-bg-secondary` | Track bg (disabled + active-disabled) |
| `--color-text-primary` | `text-text-primary` | Label / title (enabled + active) |
| `--color-text-secondary` | `text-text-secondary` | Caption (enabled + active) |
| `--color-input-text-disabled` | `text-input-text-disabled` | All text (disabled + active-disabled) |
