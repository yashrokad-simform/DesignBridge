# Radio Button & Radio Tile

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

# Part A — Radio Button

## Overview

Single-selection control. Always used inside a `RadioGroup`. Supports enabled, hover, selected, and disabled states. Never uses browser-default radio rendering.

### Props

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | required |
| `label` | `string` | `undefined` |
| `checked` | `boolean` | inferred from `RadioGroup` |
| `disabled` | `boolean` | inferred from `RadioGroup` |
| `onChange` | `(value: string) => void` | inferred from `RadioGroup` |
| `name` | `string` | inferred from `RadioGroup` |
| `className` | `string` | `undefined` |

---

## RadioGroup Props

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | `undefined` (controlled) |
| `defaultValue` | `string` | `undefined` (uncontrolled) |
| `onChange` | `(value: string) => void` | `undefined` |
| `name` | `string` | auto-generated via `useId()` |
| `disabled` | `boolean` | `false` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` |
| `children` | `ReactNode` | required |
| `aria-label` | `string` | `undefined` |

Implement `RadioGroup` using React context to share `name`, `value`, `onChange`, and `disabled` to all child `RadioButton` instances. Support both controlled (`value`) and uncontrolled (`defaultValue`) usage.

---

## Wrapper Layout

```
inline-flex flex-row items-start gap-1 cursor-pointer select-none group
```

> `gap-1` = 4px · `items-start` = top-aligned for multiline labels

Disabled: add `cursor-not-allowed pointer-events-none`.

---

## CVA Structure

Apply CVA to the **control circle** only.

### Base Classes

```
size-[18px] rounded-full flex items-center justify-center flex-shrink-0 border transition-colors
```

> `size-[18px]` = 18×18px (no clean Tailwind multiple — use arbitrary) · `rounded-full` = 9999px

### `state` Variant

| State | Classes |
|---|---|
| `enabled` | `bg-bg-primary border-border-gray-dark group-hover:border-border-brand-secondary` |
| `selected` | `bg-bg-brand-secondary border-0` |
| `disabledSelected` | `bg-bg-primary border-input-border-disabled` |

> Hover is CSS-only via `group-hover:` — no JS hover state needed. Only applies when state is `enabled`.

### Default Variant

```
state: 'enabled'
```

---

## Selected Inner Dot

When `checked` and not `disabled`, render a centered white dot inside the control circle:

For `disabledSelected`, render the same centered dot but use the disabled border color token:

```
size-2 rounded-full bg-bg-primary
```

```
size-2 rounded-full bg-input-border-disabled
```

> `size-2` = 8px · Do not use an image asset for the selected state — implement purely with CSS.

---

## Typography

Label classes:

```
text-sm font-medium leading-4.5 whitespace-nowrap
```

| State | Text class |
|---|---|
| Enabled / Selected | `text-text-primary` |
| Disabled | `text-input-text-disabled` |

Remove label from DOM entirely when not provided.

---

## Native Input

Use a visually hidden `<input type="radio">` (`sr-only peer`) for all ARIA semantics and keyboard behavior. The custom control circle is `aria-hidden="true"`.

### Focus-Visible Ring

```
peer-focus-visible:outline peer-focus-visible:outline-2
peer-focus-visible:outline-border-brand-secondary peer-focus-visible:outline-offset-2
```

Applied on the control circle via the `peer` from the hidden input.

---

## State Color Map

| State | Circle bg | Circle border | Inner dot | Label |
|---|---|---|---|---|
| Enabled | `bg-bg-primary` | `border-border-gray-dark` | — | `text-text-primary` |
| Hover | `bg-bg-primary` | `border-border-brand-secondary` | — | `text-text-primary` |
| Selected | `bg-bg-brand-secondary` | none | `bg-bg-primary size-2` | `text-text-primary` |
| Disabled | `bg-input-bg-disabled` | `border-input-border-disabled` | — | `text-input-text-disabled` |
| Disabled Selected | `bg-input-bg-disabled` | `border-input-border-disabled` | `bg-input-border-disabled size-2` | `text-input-text-disabled` |

---

# Part B — Radio Tile

## Overview

Card-style radio control. Embeds the radio circle alongside a title and optional caption. The entire tile is the click target. Always used inside a `RadioGroup`.

### Props

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | required |
| `title` | `string` | required |
| `caption` | `string` | `undefined` |
| `icon` | `ReactNode` | `undefined` |
| `checked` | `boolean` | inferred from `RadioGroup` |
| `disabled` | `boolean` | inferred from `RadioGroup` |
| `onChange` | `(value: string) => void` | inferred from `RadioGroup` |
| `name` | `string` | inferred from `RadioGroup` |
| `className` | `string` | `undefined` |

---

## CVA Structure

Apply CVA to the **tile container**.

### Base Classes

```
flex flex-row items-start w-full rounded-xl border p-3 gap-2
transition-colors select-none cursor-pointer
```

> `p-3` = 12px · `gap-2` = 8px · `rounded-xl` = 12px

### `state` Variant

| State | Classes |
|---|---|
| `enabled` | `bg-bg-primary border-input-border-enabled hover:border-border-brand-secondary` |
| `selected` | `bg-bg-brand-secondary-light border-border-brand-secondary` |
| `disabled` | `bg-input-bg-disabled border-input-border-disabled cursor-not-allowed pointer-events-none` |
| `disabledSelected` | `bg-input-bg-disabled border-input-border-disabled cursor-not-allowed pointer-events-none` |

---

## Radio Control Inside Tile

Use the same CVA `state` variant as Part A. Sync tile hover with radio control hover — drive both from the tile container's `group-hover:` so they change together.

---

## Content Area

```
flex flex-col gap-1 flex-1 min-w-0
```

> `gap-1` = 4px between title and caption

### Title

```
text-sm font-medium leading-4.5 w-full
```

| State | Color |
|---|---|
| Enabled / Selected | `text-text-primary` |
| Disabled | `text-input-text-disabled` |

### Caption

```
text-xs font-medium leading-4 w-full
```

| State | Color |
|---|---|
| Enabled / Selected | `text-text-secondary` |
| Disabled | `text-input-text-disabled` |

Remove caption from DOM entirely when not provided — never render empty element.

---

## Icon Slot

Optional `icon` prop renders between the radio control and text content:

```
flex-shrink-0 flex items-center
```

- Import icons from `src/assets/icons/`. Do not create inline SVG.
- `aria-hidden="true"` on the icon element.

---

## Tile State Color Map

| State | Tile bg | Tile border | Radio control | Title | Caption |
|---|---|---|---|---|---|
| Enabled | `bg-bg-primary` | `border-input-border-enabled` | Enabled state | `text-text-primary` | `text-text-secondary` |
| Hover | `bg-bg-primary` | `border-border-brand-secondary` | Hover state | `text-text-primary` | `text-text-secondary` |
| Selected | `bg-bg-brand-secondary-light` | `border-border-brand-secondary` | Selected state | `text-text-primary` | `text-text-secondary` |
| Disabled | `bg-input-bg-disabled` | `border-input-border-disabled` | Disabled state | `text-input-text-disabled` | `text-input-text-disabled` |
| Disabled Selected | `bg-input-bg-disabled` | `border-input-border-disabled` | Disabled selected state | `text-input-text-disabled` | `text-input-text-disabled` |

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-primary` | `bg-bg-primary` | Circle + tile bg (enabled/hover) |
| `--color-bg-brand-secondary` | `bg-bg-brand-secondary` | Circle bg (selected) |
| `--color-bg-brand-secondary-light` | `bg-bg-brand-secondary-light` | Tile bg (selected) |
| `--color-input-bg-disabled` | `bg-input-bg-disabled` | Circle + tile bg (disabled) |
| `--color-border-gray-dark` | `border-border-gray-dark` | Circle border (enabled) |
| `--color-border-brand-secondary` | `border-border-brand-secondary` | Circle + tile border (hover + selected) |
| `--color-input-border-enabled` | `border-input-border-enabled` | Tile border (enabled) |
| `--color-input-border-disabled` | `border-input-border-disabled` | Circle + tile border (disabled) |
| `--color-text-primary` | `text-text-primary` | Label + title (active states) |
| `--color-text-secondary` | `text-text-secondary` | Caption (active states) |
| `--color-input-text-disabled` | `text-input-text-disabled` | Label + title + caption (disabled) |
| `--color-bg-primary` | `bg-bg-primary` | Inner selected dot |