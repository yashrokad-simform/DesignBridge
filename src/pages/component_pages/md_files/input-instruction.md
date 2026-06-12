# Input Field

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

Standard text-entry field with optional label, leading/trailing icon slots, and helper/error text. Use `cva` for container state composition.

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | `undefined` |
| `required` | `boolean` | `false` |
| `placeholder` | `string` | `undefined` |
| `helperText` | `string` | `undefined` |
| `errorText` | `string` | `undefined` |
| `disabled` | `boolean` | `false` |
| `leadingIcon` | `ReactNode` | `undefined` |
| `trailingIcon` | `ReactNode` | `undefined` |

---

## Layout Structure

Three stacked layers, all inside a `flex flex-col gap-1` field wrapper:

```
[Label Row]           ← optional
[Input Container]     ← always
[Helper / Error Text] ← optional
```

> `gap-1` = 4px between each layer. Remove any layer from DOM entirely when absent — never render empty elements.

---

## CVA Structure

Apply CVA to the **input container** element only.

### Base Classes

```
flex items-center h-11 w-full rounded-xl border px-3 gap-2
bg-input-bg-primary transition-colors
```

> `h-11` = 44px · `px-3` = 12px · `gap-2` = 8px · `rounded-xl` = 12px

### `state` Variant

| State | Classes |
|---|---|
| `default` | `border-input-border-enabled focus-within:border-input-border-selected` |
| `error` | `border-input-border-critical` |
| `disabled` | `border-input-border-disabled bg-input-bg-disabled pointer-events-none` |

### Default Variant

```
state: 'default'
```

---

## Typography

| Element | Classes |
|---|---|
| Label | `text-xs font-medium leading-4 text-input-text-label` |
| Value | `text-sm font-medium leading-4.5 text-input-text-enabled` |
| Placeholder | `text-sm font-medium leading-4.5 text-input-text-placeholder` |
| Helper text | `text-xs font-medium leading-4 text-input-text-helper` |
| Error text | `text-xs font-medium leading-4 text-input-text-critical` |

> `text-xs` = 12px · `text-sm` = 14px · `leading-4` = 16px · `leading-4.5` ≈ 18px

---

## Label Row

- Remove from DOM when `label` is not provided.
- Required asterisk: render `*` as a separate `<span>` with `text-input-text-critical` when `required={true}`.
- Label text color: always `text-input-text-label` — never changes across states.

---

## Icon Slots

- All icons imported from `src/assets/icons/`. Do not create inline SVG.
- Apply `aria-hidden="true"` on every icon element.
- Icon size: `size-4 flex-shrink-0` (16×16px).
- Color via `currentColor` — set by icon token on the container.
- Leading and trailing slots are optional and independent.

| State | Icon Token | Tailwind Class |
|---|---|---|
| Default / Focused / Filled | `--color-input-icon-enabled` | `text-input-icon-enabled` |
| Disabled | `--color-input-icon-disabled` | `text-input-icon-disabled` |
| Error | `--color-input-icon-critical` | `text-input-icon-critical` |

---

## Native Input Element

Inside the content area (flex-1) within the container:

```
w-full bg-transparent border-none outline-none
text-sm font-medium leading-4.5
text-input-text-enabled placeholder:text-input-text-placeholder
disabled:text-input-text-disabled disabled:cursor-not-allowed
```

- Never use `padding` on the native `<input>` — padding lives on the container.
- Suppress native browser validation UI: add `noValidate` on the parent `<form>`.

---

## Helper / Error Text

- Remove from DOM when neither `helperText` nor `errorText` is provided.
- When `errorText` is set → render error text with `text-input-text-critical`. Replaces helper text.
- When only `helperText` → render with `text-input-text-helper`.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-input-text-label` | `text-input-text-label` | Label (all states) |
| `--color-input-text-enabled` | `text-input-text-enabled` | Input value |
| `--color-input-text-placeholder` | `text-input-text-placeholder` | Placeholder |
| `--color-input-text-disabled` | `text-input-text-disabled` | Value + placeholder (disabled) |
| `--color-input-text-helper` | `text-input-text-helper` | Helper text |
| `--color-input-text-critical` | `text-input-text-critical` | Error text + required asterisk |
| `--color-input-bg-primary` | `bg-input-bg-primary` | Container bg (default + error) |
| `--color-input-bg-disabled` | `bg-input-bg-disabled` | Container bg (disabled) |
| `--color-input-border-enabled` | `border-input-border-enabled` | Container border (default) |
| `--color-input-border-selected` | `border-input-border-selected` | Container border (focused) |
| `--color-input-border-critical` | `border-input-border-critical` | Container border (error) |
| `--color-input-border-disabled` | `border-input-border-disabled` | Container border (disabled) |
| `--color-input-icon-enabled` | `text-input-icon-enabled` | Icons (default + focused) |
| `--color-input-icon-disabled` | `text-input-icon-disabled` | Icons (disabled) |
| `--color-input-icon-critical` | `text-input-icon-critical` | Icons (error) |
