# Table — Header, Row & Pagination

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

A complete table system composed of three independent, composable components: `TableHeaderCell`, `TableCell` (with 7 variants), and `Pagination`. Each component is individually reusable. Do not create separate fixed-column table layouts — all components adapt to dynamic data and column counts.

### Reused Components

These existing project components are consumed as-is:
- `Checkbox` — from `checkbox.md`
- `Badge` — from `badge.md`
- `ToggleSwitch` — from `toggle.md`
- `Tooltip` — from `tooltip.md`
- `Button` — (bordered small variant) from `button.md`

---

# Part A — TableHeaderCell

## Overview

A single reusable header cell. The full table header is built by repeating `TableHeaderCell` instances inside a flex row. Do NOT create multi-column header components.

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | required |
| `showCheckbox` | `boolean` | `false` |
| `sort` | `boolean` | `false` |
| `sortDirection` | `'asc' \| 'desc' \| null` | `null` |
| `className` | `string` | `undefined` |

---

## Layout

```txt
flex items-center gap-3 px-5 py-2.5
bg-bg-gray-light border-b border-border-gray-light
```

- Remove `Checkbox` from DOM when `showCheckbox={false}`.
- Remove sort icon from DOM when `sort={false}`.

---

## Checkbox Slot

When `showCheckbox={true}`:
- Render `<Checkbox label={false} />` — label-less variant from the Checkbox component.
- `flex-shrink-0`.

---

## Title Row

```txt
flex flex-1 items-center gap-1 h-5 min-w-0
```

### Column Label

```txt
text-xs font-medium leading-4 text-text-secondary whitespace-nowrap
```

### Sort Icon

When `sort={true}`:
- Import `ArrowDownIcon` from `src/assets/icons/`. Do not inline SVG.
- Size: `size-3.5`.
- `aria-hidden="true"`.
- Rotate icon based on `sortDirection`: `sortDirection='asc'` → `rotate-180` (arrow points up) · `sortDirection='desc'` or `null` → no rotation (arrow points down).

### Sort Cycle Behavior

Clicking a sortable header cycles through three states in order:

1. First click → `sortDirection='asc'` (ascending)
2. Second click → `sortDirection='desc'` (descending)
3. Third click → `sortDirection=null` (clears sorting)

---

## Typography

| Element | Classes |
|---|---|
| Column label | `text-xs font-medium leading-4 text-text-secondary` |

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-gray-light` | `bg-bg-gray-light` | Header cell background |
| `--color-border-gray-light` | `border-border-gray-light` | Bottom border |
| `--color-text-secondary` | `text-text-secondary` | Column label text |

---

# Part B — TableCell

## Overview

A single reusable row cell supporting 7 variants via a `type` prop. One component handles all 7 types — no separate disconnected components per type.

### Props

| Prop | Type | Default |
|---|---|---|
| `type` | `TableCellType` | `'default'` |
| `avatar` | `boolean` | `true` — Default variant only |
| `checkbox` | `boolean` | `true` — Default variant only |
| `edit` | `boolean` | `true` — Action variant only |
| `button1` | `boolean` | `true` — Action variant only |
| `button2` | `boolean` | `true` — Action variant only |
| `delete` | `boolean` | `true` — Action variant only |
| `more` | `boolean` | `true` — Action variant only |
| `badges` | `BadgeProps[]` | `[]` — Status variant only |
| `primaryText` | `string` | `undefined` |
| `secondaryText` | `string` | `undefined` — Two Line only |
| `showTooltip` | `boolean` | `false` — Tooltip variant only |
| `className` | `string` | `undefined` |

**TableCellType:** `'two-line' | 'edit-cell' | 'action' | 'status' | 'tooltip' | 'default' | 'toggle'`

---

## Cell Container — Base Classes

```txt
flex h-15 px-5 py-0
bg-bg-white border-b border-border-gray-light
```

### Layout variations by type

| Type | Additional container classes |
|---|---|
| `two-line` | `flex-col items-start justify-center gap-0.5 whitespace-nowrap` |
| `edit-cell` | `items-center gap-3` |
| `action` | `items-center gap-3` |
| `status` | `items-center gap-3` |
| `tooltip` | `items-center gap-3` |
| `default` | `items-center gap-3` |
| `toggle` | `items-center gap-3` |

---

## Variant Specifications

### `two-line`

Two stacked lines of text inside the cell.

**Primary text:**
```txt
text-sm font-medium leading-4.5 text-text-primary truncate w-full
```

**Secondary text:**
```txt
text-xs font-medium leading-4 text-text-secondary truncate w-full
```

---

### `default`

Optional checkbox + optional avatar + primary text.

- Render `<Checkbox label={false} />` when `checkbox={true}`.
- Avatar: `size-9 rounded-full overflow-hidden object-cover flex-shrink-0` (36×36px). Use `<img>` with provided avatar src. Remove from DOM when `avatar={false}`.
- Primary text: `flex-1 min-w-0 text-sm font-medium leading-4.5 text-text-primary truncate`.
- Absent slots must be removed from DOM — no phantom gaps.

---

### `action`

Row of optional icon and text buttons.

Each button uses the **Bordered Small** Button variant from `button.md`.

| Slot | Prop | Button content |
|---|---|---|
| Edit | `edit` | `EditIcon` from assets — icon-only |
| Button 1 | `button1` | Text: `"Button"` |
| Button 2 | `button2` | Text: `"Button"` |
| Delete | `delete` | `TrashIcon` from assets — icon-only |
| More | `more` | `DotsVerticalIcon` from assets — icon-only |

**Bordered Small Button spec (from button.md):**
```txt
flex items-center justify-center h-9 px-2.5
bg-btn-bg-bordered border border-btn-border-primary rounded-xl
```

All icons: `size-4` (16×16px) · `aria-hidden="true"` · imported from `src/assets/icons/`.

Render each slot only when its boolean prop is `true`. Remove from DOM when `false`.

---

### `status`

Horizontal row of Badge components.

```txt
flex items-center gap-1 h-7
```

Render `badges` array using the **Badge component** from `badge.md`. Each badge receives its own variant/color props from the data. The Figma shows `Badge filled primary` as the default — defer color/variant to the data layer.

---

### `edit-cell`

Inline input field that fills the cell content area.

Render the `InputField` component from `input.md`:
- No label, no helper text.
- Placeholder: `"Text"`.
- `flex-1 min-w-0` on the input wrapper.

---

### `tooltip`

Text with an inline info icon that triggers a tooltip.

```txt
flex items-center gap-3
```

**Text area:**
```txt
flex-1 min-w-0 h-11 flex items-center
text-sm font-medium leading-4.5 text-text-primary truncate
```

**Info icon + Tooltip:**
- Render `<InfoIconTooltip />` — see tooltip.md.
- Icon: `InfoCircleIcon` from `src/assets/icons/`, `size-4` (16×16px).
- `showTooltip` prop controls tooltip visibility.
- Tooltip placement: `bottom-end`.

---

### `toggle`

Renders a `ToggleSwitch` component from `toggle.md`.

- Active state confirmed from Figma.
- No label alongside the toggle inside the cell.

---

## Typography

| Scale | Line height class | Value |
|---|---|---|
| `text-sm` (14px) | `leading-4.5` | 18px |
| `text-xs` (12px) | `leading-4` | 16px |

All cell text: `font-medium` (500). Truncation via `truncate` on text elements.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-white` | `bg-bg-white` | Cell background |
| `--color-border-gray-light` | `border-border-gray-light` | Cell bottom border |
| `--color-text-primary` | `text-text-primary` | Primary text |
| `--color-text-secondary` | `text-text-secondary` | Secondary / two-line label |
| `--color-btn-bg-bordered` | `bg-btn-bg-bordered` | Action button background |
| `--color-btn-border-primary` | `border-btn-border-primary` | Action button border |
| `--color-btn-text-bordered` | `text-btn-text-bordered` | Action button text |
| `--color-input-bg-primary` | `bg-input-bg-primary` | Edit cell input background |
| `--color-input-border-enabled` | `border-input-border-enabled` | Edit cell input border |

---

# Part C — Pagination

## Overview

A full-width bar placed below the table. Contains: total rows count (left), rows-per-page selector (center-left), page navigation (right).

### Props

| Prop | Type | Default |
|---|---|---|
| `total` | `number` | required |
| `page` | `number` | `1` |
| `pageSize` | `number` | `10` |
| `onPageChange` | `(page: number) => void` | required |
| `onPageSizeChange` | `(size: number) => void` | `undefined` |
| `className` | `string` | `undefined` |

---

## Container

```txt
flex items-center justify-center gap-6 px-5 py-3
bg-bg-white border-t border-border-gray-light w-full
```

---

## Total Rows (left section)

```txt
flex flex-1 items-center gap-1 min-w-0 whitespace-nowrap
text-sm leading-4.5
```

| Text | Classes |
|---|---|
| `"Total Rows:"` | `font-medium text-text-primary` |
| Count value | `font-semibold text-text-primary` |

---

## Rows Per Page Selector (center section)

```txt
flex items-center gap-2 flex-shrink-0
```

**Label:**
```txt
text-sm font-medium leading-4.5 text-text-primary whitespace-nowrap
```

**Input dropdown:**
```txt
flex items-center gap-2 px-3 py-2 w-20
bg-bg-white border border-border-gray-light rounded-lg
overflow-hidden
shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]
```

**Input text:**
```txt
flex-1 text-sm font-medium leading-4.5 text-text-primary min-w-0
```

**Dropdown icon:**
Import `ArrowDownIcon` from `src/assets/icons/`. `size-5` (20×20px) · `aria-hidden="true"` · `flex-shrink-0`.

Clicking the input or chevron should open a dropdown (implement via `<select>` native or the Dropdown component from `dropdown.md`).

---

## Page Navigation (right section)

```txt
flex items-center gap-2 flex-shrink-0
```

Each navigation element is a `PaginationButton` sub-component.

### `PaginationButton` Sub-Component

| Prop | Type | Default |
|---|---|---|
| `variant` | `'page' \| 'active' \| 'ellipsis' \| 'prev' \| 'next'` | `'page'` |
| `label` | `string \| number` | required |
| `onClick` | `() => void` | `undefined` |
| `disabled` | `boolean` | `false` |

### Button Container (all variants)

```txt
size-8.5 rounded-full overflow-hidden flex-shrink-0
flex items-center justify-center
```

### Per-Variant Styling

| Variant | Classes |
|---|---|
| `page` (default) | `bg-bg-white` |
| `active` (current page) | `bg-bg-brand` |
| `ellipsis` | `bg-bg-white` |
| `prev` | `bg-bg-white border border-border-gray-light` |
| `next` | `bg-bg-white border border-border-gray-light` |

### Label / Icon Content

**`page` + `active`:**
```txt
text-sm font-medium leading-4.5 text-center whitespace-nowrap
```

Color: `text-text-primary` for `page` · `text-text-white` for `active`.

**`ellipsis`:**
- Import `DotsHorizontalIcon` or similar from `src/assets/icons/`. `aria-hidden="true"`.

**`prev`:**
- Import `ArrowLeftIcon` from `src/assets/icons/`. `size-5`. `aria-hidden="true"`.
- `aria-label="Previous page"` on the button.
- Apply `disabled` (pointer-events-none + reduced opacity) when on page 1.

**`next`:**
- Import `ArrowRightIcon` from `src/assets/icons/`. `size-5`. `aria-hidden="true"`.
- `aria-label="Next page"` on the button.
- Apply `disabled` when on last page.

### Page Number Calculation

The Pagination component generates the visible page sequence dynamically:

- Always show first page and last page.
- Always show prev/next buttons.
- Show current page and 1–2 adjacent pages.
- Insert `ellipsis` when page groups are non-contiguous.
- Dynamic — never hardcode a page count.

---

## Accessibility

- Wrap pagination nav in `<nav aria-label="Pagination">`.
- Active page button: `aria-current="page"`.
- All icon-only buttons have `aria-label`.
- `tabIndex={0}` on all interactive buttons.

---

## Typography Summary (all table components)

| Token | Classes | Values |
|---|---|---|
| `text-xs` (12px) | `text-xs font-medium leading-4` | 12px / 500 / 16px |
| `text-sm` (14px) | `text-sm font-medium leading-4.5` | 14px / 500 / 18px |
| `text-sm` semibold | `text-sm font-semibold leading-4.5` | 14px / 600 / 18px |

---

## Pagination Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-white` | `bg-bg-white` | Pagination bar bg + default/prev/next button