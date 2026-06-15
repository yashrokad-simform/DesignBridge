# Text Area Field

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

Multi-line text input. Shares the same label, helper/error text, and token system as the Input Field component. Use `cva` for container state composition.

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | `undefined` |
| `required` | `boolean` | `false` |
| `placeholder` | `string` | `undefined` |
| `helperText` | `string` | `undefined` |
| `errorText` | `string` | `undefined` |
| `disabled` | `boolean` | `false` |
| `minHeight` | `number` | `80` |

---

## Layout Structure

Three stacked layers inside a `flex flex-col gap-1` field wrapper:

```
[Label Row]           ← optional
[Textarea Container]  ← always
[Helper / Error Text] ← optional
```

> `gap-1` = 4px between each layer. Remove absent layers from DOM entirely.

The textarea container has **no fixed height** — it grows with content. Width fills the parent container.

---

## CVA Structure

Apply CVA to the **textarea container** element only.

### Base Classes

```
flex flex-col w-full rounded-xl border overflow-hidden relative
bg-input-bg-primary transition-colors
```

### `state` Variant

| State | Classes |
|---|---|
| `default` | `border-input-border-enabled` |
| `focused` | `border-input-border-selected` |
| `error` | `border-input-border-critical` |
| `disabled` | `border-input-border-disabled bg-input-bg-disabled pointer-events-none` |

> `filled` state is visually identical to `default` — use `state='default'` for filled. Only text color differs (handled on the `<textarea>` element).

### Default Variant

```
state: 'default'
```

---

## Typography

| Element | Classes |
|---|---|
| Label | `text-xs font-medium leading-4 text-input-text-label` |
| Textarea value | `text-sm font-medium leading-4.5 text-input-text-enabled` |
| Placeholder | `text-sm font-medium leading-4.5 text-input-text-placeholder` |
| Helper text | `text-xs font-medium leading-4 text-input-text-helper` |
| Error text | `text-xs font-medium leading-4 text-input-text-critical` |

> `text-xs` = 12px · `text-sm` = 14px · `leading-4` = 16px · `leading-4.5` ≈ 18px

---

## Label Row

- Remove from DOM when `label` is not provided.
- Required asterisk: separate `<span>` with `text-input-text-critical` when `required={true}`.
- Label color: always `text-input-text-label` across all states.

---

## Content Area

Sits at the top of the container.

```
flex flex-1 min-h-0 px-3 py-2 relative
```

> `px-3` = 12px · `py-2` = 8px

### Native `<textarea>` Element

```
w-full flex-1 min-h-0 resize-none bg-transparent border-none outline-none
text-sm font-medium leading-4.5
text-input-text-enabled placeholder:text-input-text-placeholder
disabled:text-input-text-disabled disabled:cursor-not-allowed
```

- `resize-none` — resizing is handled by the custom resize handle, not native browser resize.
- No padding on the `<textarea>` itself — padding is on the content area wrapper.

---

## Resize Handle

Absolute-positioned in the bottom-right corner of the textarea container.

```
absolute bottom-[3px] right-[3px] size-4 cursor-se-resize
```

> `size-4` = 16×16px · `cursor-se-resize` = south-east diagonal resize cursor

- Apply `opacity-40` to the icon when `disabled` — do not swap to a different asset.
- `aria-hidden="true"`.
- Attach `onMouseDown` and `onTouchStart` handlers from the `useResizeDrag` hook (see Drag Handler section below).

---

## Drag-to-Resize Handler

Use the shared `useResizeDrag` hook (`src/hooks/useResizeDrag.ts`). This hook is identical to the one used in the Rich Text Editor — do not duplicate it.

### Hook Usage

```
const { isDragging, handleMouseDown, handleTouchStart } = useResizeDrag({
  containerRef,   // ref attached to the textarea container element
  minHeight,      // minimum height in px — default 80
  disabled,       // prevents drag when true
})
```

Attach `handleMouseDown` to the resize handle's `onMouseDown` and `handleTouchStart` to its `onTouchStart`.

### Mouse Drag — Requirements

- `mousedown` on handle → record `startY = e.clientY` and `startHeight = container.offsetHeight`. Set `isDragging = true`.
- Add `mousemove` and `mouseup` listeners to `document` (not the element).
- `mousemove` → `newHeight = Math.max(minHeight, startHeight + (e.clientY - startY))` → apply via `container.style.height`.
- `mouseup` → set `isDragging = false` → remove both `document` listeners.
- Call `e.preventDefault()` on `mousedown` to prevent text selection during drag.
- Apply `user-select: none` to `document.body` during drag. Remove on `mouseup`.

### Touch Drag — Requirements

- `touchstart` → use `e.touches[0]` for the primary touch point.
- Record `startY = touch.clientY` and `startHeight = container.offsetHeight`.
- Add `touchmove`, `touchend`, and `touchcancel` to `document`.
- `touchmove` → use `e.touches[0].clientY` → apply `Math.max(minHeight, startHeight + delta)`.
- `touchend` / `touchcancel` → remove all listeners and reset state.
- Call `e.preventDefault()` on `touchstart` to prevent scroll interference.

### Cleanup — Critical

- `useEffect` cleanup must always remove all `document` event listeners on unmount.
- Store listener function references in `useRef` so `removeEventListener` correctly unregisters the same function.

### Cursor Behavior

| Condition | Cursor |
|---|---|
| Handle at rest | `cursor-se-resize` on the handle element |
| During drag | Add `cursor-se-resize` to `document.body` · Remove on drag end |
| Disabled | `cursor-default` on handle |

### Visual Feedback During Drag

While `isDragging`, add `ring-1 ring-input-border-selected` to the textarea container so the border reflects the active interaction.

---

## Helper / Error Text

- Remove from DOM when neither `helperText` nor `errorText` is provided.
- When `errorText` is set → render with `text-input-text-critical`. Replaces helper text.
- When only `helperText` → render with `text-input-text-helper`.

---

## Color Token Map

Identical token system to Input Field (`--color-input-*` namespace).

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-input-text-label` | `text-input-text-label` | Label (all states) |
| `--color-input-text-enabled` | `text-input-text-enabled` | Textarea value |
| `--color-input-text-placeholder` | `text-input-text-placeholder` | Placeholder |
| `--color-input-text-disabled` | `text-input-text-disabled` | Value + placeholder (disabled) |
| `--color-input-text-helper` | `text-input-text-helper` | Helper text |
| `--color-input-text-critical` | `text-input-text-critical` | Error text + required asterisk |
| `--color-input-bg-primary` | `bg-input-bg-primary` | Container bg (default, focused, error) |
| `--color-input-bg-disabled` | `bg-input-bg-disabled` | Container bg (disabled) |
| `--color-input-border-enabled` | `border-input-border-enabled` | Border (default, filled) |
| `--color-input-border-selected` | `border-input-border-selected` | Border (focused) + drag ring |
| `--color-input-border-critical` | `border-input-border-critical` | Border (error) |
| `--color-input-border-disabled` | `border-input-border-disabled` | Border (disabled) |
