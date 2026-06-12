# Dropdown

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

Selection field that reveals a positioned option panel. Trigger field shares Input Field token system. Use `cva` for trigger container state composition.

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | `undefined` |
| `required` | `boolean` | `false` |
| `placeholder` | `string` | `'Select'` |
| `options` | `DropdownOption[]` | required |
| `value` | `string \| string[]` | `undefined` |
| `onChange` | `(value) => void` | required |
| `multiple` | `boolean` | `false` |
| `searchable` | `boolean` | `false` |
| `helperText` | `string` | `undefined` |
| `errorText` | `string` | `undefined` |
| `disabled` | `boolean` | `false` |
| `leadingIcon` | `ReactNode` | `undefined` |

**DropdownOption:** `{ label: string; value: string; icon?: ReactNode }`

---

## Layout Structure

Three stacked layers inside a `flex flex-col gap-1 relative` field wrapper:

```
[Label Row]              ← optional
[Trigger Container]      ← always
[Helper / Error Text]    ← optional
[Selected Badges Row]    ← multi-select only
[Dropdown Panel]         ← conditionally rendered when open
```

> `gap-1` = 4px between layers · `relative` on wrapper for panel positioning.

---

## CVA Structure

Apply CVA to the **trigger container** element only.

### Base Classes

```
flex items-center h-11 w-full rounded-xl border px-3 gap-2
bg-input-bg-primary transition-colors cursor-pointer select-none
```

> `h-11` = 44px · `px-3` = 12px · `gap-2` = 8px · `rounded-xl` = 12px

### `state` Variant

| State | Classes |
|---|---|
| `default` | `border-input-border-enabled` |
| `open` | `border-input-border-selected` |
| `error` | `border-input-border-critical` |
| `disabled` | `border-input-border-disabled bg-input-bg-disabled pointer-events-none cursor-not-allowed` |

### Default Variant

```
state: 'default'
```

> On open → set `state='open'`. On error → `state='error'`. On disabled → `state='disabled'`. Selected with panel closed uses `state='default'`.

---

## Typography

| Element | Classes |
|---|---|
| Label | `text-xs font-medium leading-4 text-input-text-label` |
| Placeholder | `text-sm font-medium leading-4.5 text-input-text-placeholder` |
| Selected value | `text-sm font-medium leading-4.5 text-input-text-enabled` |
| Helper text | `text-xs font-medium leading-4 text-input-text-helper` |
| Error text | `text-xs font-medium leading-4 text-input-text-critical` |
| Option label | `text-sm font-medium leading-4.5 text-input-text-enabled` |

> `text-xs` = 12px · `text-sm` = 14px · `leading-4` = 16px · `leading-4.5` ≈ 18px

---

## Label Row

- Remove from DOM when `label` is not provided.
- Required asterisk: separate `<span>` with `text-input-text-critical` when `required={true}`.
- Label color: always `text-input-text-label` across all states.

---

## Trigger Slots

### Leading Icon (optional)
- Import from `src/assets/icons/`. Do not create inline SVG.
- Size: `size-4 flex-shrink-0` (16×16px) · `aria-hidden="true"`.
- Color: `text-input-icon-enabled` (default/open) · `text-input-icon-disabled` (disabled) · `text-input-icon-critical` (error).

### Chevron Icon (always present)
- Import chevron-down and chevron-up icons from `src/assets/icons/`. Do not create inline SVG.
- Render `chevron-down` when closed · `chevron-up` when open.
- Size: `size-4 flex-shrink-0` · `aria-hidden="true"` · `ml-auto`.
- Color inherits from container icon token (same as leading icon).

---

## Dropdown Panel

Positioned absolutely below the trigger. Rendered only when open.

### Panel Container

```
absolute left-0 right-0 top-full mt-1
rounded-xl border border-input-border-enabled bg-input-bg-primary
shadow-[0px_2px_20px_0px_rgba(98,96,96,0.08)]
overflow-hidden z-50
max-h-60 overflow-y-auto
```

> `max-h-60` = 240px (shows ~6 options) · `mt-1` = 4px gap below trigger · `rounded-xl` = 12px

### Search Field (when `searchable={true}`)

- Use the **Input Field component** with no label, no helper text, leading search icon from `src/assets/icons/`, and placeholder `"Search"`.
- Render inside a `p-3 border-b border-input-border-enabled` container at the top of the panel.
- Auto-focus the search input when panel opens.

### Option Row

```
flex items-center h-10 px-3 gap-2 cursor-pointer transition-colors
```

> `h-10` = 40px · `px-3` = 12px · `gap-2` = 8px

| Slot | Classes |
|---|---|
| Option icon | `size-4 flex-shrink-0 text-input-icon-enabled` · from `src/assets/icons/` |
| Option label | `flex-1 text-sm font-medium leading-4.5 text-input-text-enabled` |
| Check / Checkbox | trailing slot — see Option States |

#### Option States

| State | Background | Notes |
|---|---|---|
| Default | `bg-input-bg-primary` | — |
| Hover | `bg-bg-secondary` | — |
| Selected (single) | `bg-bg-brand-light` | Tick icon from `src/assets/icons/` in trailing slot · `size-5` |
| Selected (multi) | `bg-bg-brand-light` | `<Checkbox checked={true} />` in trailing slot — no `label` prop |
| Unselected (multi) | `bg-input-bg-primary` | `<Checkbox checked={false} />` in trailing slot — no `label` prop |

> For multi-select option rows, use the `<Checkbox>` component directly (no `label` prop). Do not import raw checkbox icons from `src/assets/icons/`. Pass `checked` and suppress `onChange` — selection is handled by the option row's `onClick`.

---

## Helper / Error Text

Identical behavior to Input Field — see Input Field spec.

---

## Multi-Select — Selected Badges Row

Rendered below the trigger when `multiple={true}` and at least one option is selected.

```
flex flex-wrap gap-1.5 w-full
```

> `gap-1.5` = 6px between badges

- Use **Badge component** — `variant="tertiary"` `color="black"` `showSuffix={true}`.
- Each badge `onRemove` deselects that option.
- Remove row from DOM entirely when no options are selected.

---

## Panel Behavior

- Opens on trigger click. Closes on: option select (single), Escape, click outside.
- Multi-select: panel stays open after selection.
- Search value clears on panel close.
- Panel flips upward when insufficient space below trigger (JS-detected).

---

## Color Token Map

All tokens shared with Input Field (`--color-input-*` namespace).

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-input-text-label` | `text-input-text-label` | Label |
| `--color-input-text-enabled` | `text-input-text-enabled` | Selected value, option labels |
| `--color-input-text-placeholder` | `text-input-text-placeholder` | Placeholder |
| `--color-input-text-disabled` | `text-input-text-disabled` | Disabled value |
| `--color-input-text-helper` | `text-input-text-helper` | Helper text |
| `--color-input-text-critical` | `text-input-text-critical` | Error text + required asterisk |
| `--color-input-bg-primary` | `bg-input-bg-primary` | Trigger + panel background |
| `--color-input-bg-disabled` | `bg-input-bg-disabled` | Trigger bg (disabled) |
| `--color-input-border-enabled` | `border-input-border-enabled` | Trigger (default) · Panel · Option dividers |
| `--color-input-border-selected` | `border-input-border-selected` | Trigger (open) |
| `--color-input-border-critical` | `border-input-border-critical` | Trigger (error) |
| `--color-input-border-disabled` | `border-input-border-disabled` | Trigger (disabled) |
| `--color-input-icon-enabled` | `text-input-icon-enabled` | Leading icon + chevron (default/open) |
| `--color-input-icon-disabled` | `text-input-icon-disabled` | Leading icon + chevron (disabled) |
| `--color-input-icon-critical` | `text-input-icon-critical` | Leading icon + chevron (error) |
| `--color-bg-brand-light` | `bg-bg-brand-light` | Selected option row background |
| `--color-bg-secondary` | `bg-bg-secondary` | Option row hover background |
