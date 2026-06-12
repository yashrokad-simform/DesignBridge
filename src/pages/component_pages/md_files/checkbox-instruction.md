# Checkbox & Checkbox Tile

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
- `text-md` → `leading-5.5`
- `text-lg` → `leading-6.5`
- `text-xl` → `leading-7`
- `text-2xl` → `leading-8`
- `text-3xl` → `leading-9`
- `text-4xl` → `leading-12`

---

# Part A — Checkbox

## Overview

Binary selection control with enabled, hover, selected, indeterminate, and disabled states. Supports an optional text label. Never uses browser-default checkbox rendering.

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | `undefined` |
| `checked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `onChange` | `(checked: boolean) => void` | `undefined` |

---

## CVA Structure

Apply CVA to the **control box** element only.

### Base Classes

```
size-[18px] rounded-4 flex items-center justify-center flex-shrink-0
box-border relative overflow-hidden transition-colors
```

> `size-[18px]` = 18×18px (no standard Tailwind class — arbitrary) · `rounded-4` → `--radius-4: 4px`

### `state` Variant

| State | Classes |
|---|---|
| `enabled` | `bg-bg-primary border border-border-gray-dark` |
| `hover` | `bg-bg-primary border border-border-warning` |
| `selected` | `bg-bg-brand-secondary border-0` |
| `indeterminate` | `border-0` |
| `disabled` | `bg-input-bg-disabled border border-input-border-disabled` |
| `disabled-selected` | `bg-input-bg-disabled border border-input-border-disabled` |

> Hover is driven by the wrapper's `group` class — use `group-hover:` on the control box when state is `enabled`. Do not manage hover state in JS.

### Default Variant

```
state: 'enabled'
```

---

## Wrapper Layout

```
inline-flex flex-row items-start gap-1 cursor-pointer group
```

> `gap-1` = 4px · `items-start` = top-aligned — intentional for multiline labels.

Disabled wrapper: add `cursor-not-allowed pointer-events-none`.

---

## Typography

Label classes:

```
text-sm font-medium leading-4.5 whitespace-nowrap
```

| State | Text Class |
|---|---|
| Enabled / Hover / Selected / Indeterminate | `text-text-primary` |
| Disabled / Disabled Selected | `text-input-text-disabled` |

> `text-sm` = 14px · `leading-4.5` = 18px · `font-medium` = 500

Remove label from DOM entirely when not provided — never render an empty element.

---

## Icon Assets

All icons live in `src/assets/icons/`. Do not create a subfolder for checkbox icons.

| File | Used For | Placement |
|---|---|---|
| `CheckIcon.tsx` | Selected state | `absolute inset-[2.25px]` inside control box · `text-icon-white` |
| `IndeterminateIcon.tsx` | Indeterminate state | `absolute inset-0` fills full control box · self-contained (includes own bg + dash) |

Import directly from `@/assets/icons/`. Never inline SVG markup inside the Checkbox component.

---

## State Color Map

| State | Control Box bg | Control Box border | Icon | Label |
|---|---|---|---|---|
| Enabled | `bg-bg-primary` | `border-border-gray-dark` | — | `text-text-primary` |
| Hover | `bg-bg-primary` | `border-border-warning` | — | `text-text-primary` |
| Selected | `bg-bg-brand-secondary` | none | `CheckIcon` (`text-icon-white`) | `text-text-primary` |
| Indeterminate | — | none | `IndeterminateIcon` (self-contained) | `text-text-primary` |
| Disabled | `bg-input-bg-disabled` | `border-input-border-disabled` | `CheckIcon` if checked (muted) | `text-input-text-disabled` |
| Disabled Selected | `bg-input-bg-disabled` | `border-input-border-disabled` | `CheckIcon` (`text-bg-gray-dark`) | `text-input-text-disabled` |

> **Disabled + Selected:** Render `CheckIcon` with `text-icon-white opacity-60` over the disabled background. Do not swap to a separate asset.
> **Disabled Selected variant:** Use `state='disabled-selected'` when `disabled={true}` and `checked={true}`. Same background as disabled (`bg-input-bg-disabled`). Renders `CheckIcon` with `text-bg-gray-dark` instead of white. Pointer events and cursor match the standard disabled state.

---

## Indeterminate Behavior

- Set via JavaScript only: `inputRef.current.indeterminate = true` — not via HTML attribute.
- Used exclusively for parent-child tree selection — never triggered by direct user click.

**State transition on click:**

| Current state | After click |
|---|---|
| Indeterminate | → Selected (all children selected) |
| Selected | → Enabled (all children deselected) |
| Enabled | → Selected |

- `aria-checked="mixed"` when indeterminate.
- `aria-checked="true"` when selected.
- `aria-checked="false"` when enabled.

---

## Focus-Visible Ring

Applied to the control box via the hidden native `<input>`:

```
peer/input [&+.control-box]:peer-focus-visible/input:outline
[&+.control-box]:peer-focus-visible/input:outline-2
[&+.control-box]:peer-focus-visible/input:outline-border-warning
[&+.control-box]:peer-focus-visible/input:outline-offset-2
```

Alternatively: forward focus-visible state via JS and add `outline-2 outline-border-warning outline-offset-2` to the control box conditionally.

> `outline-border-warning` → `--color-border-warning`. Focus ring must only appear on keyboard navigation — never on mouse click.

---

# Part B — Checkbox Tile

## Overview

Card-style selection control. Embeds a Checkbox component (no label) alongside a title and optional caption. Entire tile is the click target.

### Props

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | required |
| `caption` | `string` | `undefined` |
| `checked` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `onChange` | `(checked: boolean) => void` | `undefined` |

---

## CVA Structure

Apply CVA to the **tile container** element.

### Base Classes

```
flex flex-row items-start w-full rounded-xl border p-3 gap-2
cursor-pointer transition-colors
```

> `p-3` = 12px all sides · `gap-2` = 8px · `rounded-xl` = 12px

### `state` Variant

| State | Classes |
|---|---|
| `enabled` | `bg-bg-primary border-input-border-enabled` |
| `hover` | `bg-bg-primary border-border-warning` |
| `selected` | `bg-bg-brand-secondary-light border-border-warning` |
| `disabled` | `bg-bg-primary border-input-border-disabled cursor-not-allowed pointer-events-none` |
| `disabled-selected` | `bg-bg-primary border-input-border-disabled cursor-not-allowed pointer-events-none` |

> Hover driven by CSS `:hover` on the tile — use `hover:border-border-warning` in the enabled base and conditionally apply `selected` via `checked` prop.

> **Disabled & Disabled Selected tile:** Both share identical container styling. No opacity — colors are handled by tokens. Only the embedded checkbox differs: `disabled` for unchecked, `disabled-selected` for checked.

---

## Content Area

```
flex flex-col gap-1 flex-1 min-w-0
```

> `gap-1` = 4px between title and caption

### Title

```
text-sm font-medium leading-4.5 text-text-primary w-full
```

Disabled: `text-input-text-disabled`

### Caption

```
text-xs font-medium leading-4 text-text-secondary w-full
```

Disabled: `text-input-text-disabled`

- Remove from DOM entirely when not provided — never render empty element.
- Wraps naturally — no truncation.

---

## Checkbox Inside Tile

- Embed `<Checkbox>` with no `label` prop.
- Tile hover must synchronize with embedded checkbox hover state — pass `isHovered` from tile's hover state down to the checkbox, or drive both from the tile container's `group-hover:` classes.
- Tile `checked` state maps directly to checkbox `checked` prop.

---

## Tile State Color Map

| State | Tile bg | Tile border | Title & Caption | Embedded checkbox |
|---|---|---|---|---|
| Enabled | `bg-bg-primary` | `border-input-border-enabled` | `text-text-primary` / `text-text-secondary` | Enabled state |
| Hover | `bg-bg-primary` | `border-border-warning` | `text-text-primary` / `text-text-secondary` | Hover state (synchronized) |
| Selected | `bg-bg-brand-secondary-light` | `border-border-warning` | `text-text-primary` / `text-text-secondary` | Selected state |
| Disabled | `bg-bg-primary` | `border-input-border-disabled` | `text-input-text-disabled` / `text-input-text-disabled` | Disabled state |
| Disabled Selected | `bg-bg-primary` | `border-input-border-disabled` | `text-input-text-disabled` / `text-input-text-disabled` | Disabled Selected state |

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-primary` | `bg-bg-primary` | Control box + tile bg (enabled/hover) |
| `--color-bg-brand-secondary` | `bg-bg-brand-secondary` | Control box bg (selected) |
| `--color-bg-brand-secondary-light` | `bg-bg-brand-secondary-light` | Tile bg (selected) |
| `--color-bg-gray-dark` | `text-bg-gray-dark` | CheckIcon color (disabled-selected) |
| `--color-input-bg-disabled` | `bg-input-bg-disabled` | Control box bg (disabled) |
| `--color-border-gray-dark` | `border-border-gray-dark` | Control box border (enabled) |
| `--color-border-warning` | `border-border-warning` | Control box + tile border (hover + selected) |
| `--color-input-border-enabled` | `border-input-border-enabled` | Tile border (enabled) |
| `--color-input-border-disabled` | `border-input-border-disabled` | Control box border (disabled + disabled-selected) · Tile border (disabled + disabled-selected) |
| `--color-text-primary` | `text-text-primary` | Title (all active states) |
| `--color-text-secondary` | `text-text-secondary` | Caption (all active states) |
| `--color-input-text-disabled` | `text-input-text-disabled` | Label (disabled + disabled-selected) · Title + Caption (disabled + disabled-selected) |
| `--color-text-white` | `text-text-white` | CheckIcon stroke color |
