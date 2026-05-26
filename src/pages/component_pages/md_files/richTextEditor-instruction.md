# Rich Text Editor

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

Fully functional rich text editor with a WYSIWYG toolbar. Visually identical to the Text Area Field with `showWysiwyg={true}`, but the content area is a live editable region powered by **TipTap**. Each toolbar button applies real formatting to the editor content.

### Library

Use **TipTap** (`@tiptap/react`). It is headless, TypeScript-first, and requires no default styling — all visual styling is applied via Tailwind classes.

> Do not use `react-quill`, `draft-js`, or any library that ships default CSS.

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | `undefined` |
| `required` | `boolean` | `false` |
| `placeholder` | `string` | `undefined` |
| `helperText` | `string` | `undefined` |
| `errorText` | `string` | `undefined` |
| `disabled` | `boolean` | `false` |
| `value` | `string` | `undefined` |
| `onChange` | `(html: string) => void` | `undefined` |

> `value` and `onChange` use HTML string format (`editor.getHTML()` / `editor.commands.setContent()`).

---

## TipTap Extensions

Install and register exactly these extensions — no more, no less:

| Toolbar Action | Extension Package |
|---|---|
| Bold | `@tiptap/extension-bold` |
| Italic | `@tiptap/extension-italic` |
| H1 | `@tiptap/extension-heading` (levels: [1, 2]) |
| H2 | `@tiptap/extension-heading` (levels: [1, 2]) |
| Quote | `@tiptap/extension-blockquote` |
| Link | `@tiptap/extension-link` |
| List Bullet | `@tiptap/extension-bullet-list` + `@tiptap/extension-list-item` |
| List Numbers | `@tiptap/extension-ordered-list` + `@tiptap/extension-list-item` |

Also include: `@tiptap/extension-document` · `@tiptap/extension-paragraph` · `@tiptap/extension-text` · `@tiptap/extension-placeholder`

---

## Layout Structure

Three stacked layers inside a `flex flex-col gap-1` field wrapper:

```
[Label Row]           ← optional
[Editor Container]    ← always
[Helper / Error Text] ← optional
```

> `gap-1` = 4px. Remove absent layers from DOM entirely.

The editor container has **no fixed height** — it grows with content.

---

## CVA Structure

Apply CVA to the **editor container** element only.

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

> Derive `focused` state from `editor.isFocused`. Derive `disabled` from the `disabled` prop — also set `editor.setEditable(false)` when disabled. `filled` maps to `default`.

---

## Typography

| Element | Classes |
|---|---|
| Label | `text-xs font-medium leading-4 text-input-text-label` |
| Editor content | `text-sm font-medium leading-4.5 text-input-text-enabled` |
| Placeholder | `text-sm font-medium leading-4.5 text-input-text-placeholder` |
| Helper text | `text-xs font-medium leading-4 text-input-text-helper` |
| Error text | `text-xs font-medium leading-4 text-input-text-critical` |

> `text-xs` = 12px · `text-sm` = 14px · `leading-4` = 16px · `leading-4.5` = 18px

Apply editor content typography on the TipTap `<EditorContent>` wrapper element. TipTap renders a `div[contenteditable]` inside — style it via:

```
[&_.ProseMirror]:text-sm
[&_.ProseMirror]:font-medium
[&_.ProseMirror]:leading-4.5
[&_.ProseMirror]:text-input-text-enabled
[&_.ProseMirror]:outline-none
[&_.ProseMirror]:min-h-[80px]
[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-input-text-placeholder
[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]
[&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none
[&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left
[&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0
```

---

## Label Row

- Remove from DOM when `label` is not provided.
- Required asterisk: separate `<span>` with `text-input-text-critical` when `required={true}`.
- Label color: always `text-input-text-label` across all states.

---

## WYSIWYG Toolbar

Always rendered — it is not optional in this component (unlike Text Area Field). Disabled when `disabled={true}`.

### Toolbar Container

```
flex items-center px-2 py-1 gap-1 w-full shrink-0
border-b border-input-border-enabled
```

> `px-2` = 8px · `py-1` = 4px · `gap-1` = 4px

### Toolbar Buttons

8 buttons in fixed order: **Bold · Italic · H1 · H2 · Quote · Link · List Bullet · List Numbers**

- Import each icon from `src/assets/icons/`. Do not create inline SVG.
- Each button: `size-6 rounded-[4.5px] flex items-center justify-center shrink-0 transition-colors`

  > `size-6` = 24×24px · `rounded-[4.5px]` = Figma-confirmed value

- **Active state** (formatting is active at cursor): `bg-bg-primary`
- **Inactive state**: no background
- **Disabled** (`disabled={true}`): `opacity-50 pointer-events-none`

#### Active State Detection

| Button | TipTap `isActive` check |
|---|---|
| Bold | `editor.isActive('bold')` |
| Italic | `editor.isActive('italic')` |
| H1 | `editor.isActive('heading', { level: 1 })` |
| H2 | `editor.isActive('heading', { level: 2 })` |
| Quote | `editor.isActive('blockquote')` |
| Link | `editor.isActive('link')` |
| List Bullet | `editor.isActive('bulletList')` |
| List Numbers | `editor.isActive('orderedList')` |

#### Toolbar Button Actions

| Button | TipTap command |
|---|---|
| Bold | `editor.chain().focus().toggleBold().run()` |
| Italic | `editor.chain().focus().toggleItalic().run()` |
| H1 | `editor.chain().focus().toggleHeading({ level: 1 }).run()` |
| H2 | `editor.chain().focus().toggleHeading({ level: 2 }).run()` |
| Quote | `editor.chain().focus().toggleBlockquote().run()` |
| Link | Prompt for URL → `editor.chain().focus().setLink({ href: url }).run()` · Unset if active: `editor.chain().focus().unsetLink().run()` |
| List Bullet | `editor.chain().focus().toggleBulletList().run()` |
| List Numbers | `editor.chain().focus().toggleOrderedList().run()` |

Each button: `type="button"` · `aria-label="Bold"` etc. · `aria-pressed={isActive}`.

---

## Content Area

Wraps the TipTap `<EditorContent>` component.

```
flex-1 min-h-0 px-3 py-2 relative
```

> `px-3` = 12px · `py-2` = 8px

Place `<EditorContent editor={editor} />` inside with the typography classes above applied to the wrapper.

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

## Drag-to-Resize Handle

### Position & Icon

```
absolute bottom-[3px] right-[3px] size-4 cursor-se-resize
```

> `size-4` = 16×16px · `cursor-se-resize` = south-east diagonal resize cursor

Disabled state: apply `opacity-40` to the icon. Do not swap to a different asset.

### Drag Behavior — Full Implementation

Implement drag resize on the editor container using a `useRef` for the container and a custom hook `useResizeDrag`.

**File:** `src/hooks/useResizeDrag.ts`

#### Hook Contract

| Input | Type | Purpose |
|---|---|---|
| `containerRef` | `RefObject<HTMLElement>` | The element being resized |
| `minHeight` | `number` | Minimum height in px (default: 120) |
| `disabled` | `boolean` | Prevents drag when true |

Returns: `{ isDragging: boolean, handleMouseDown, handleTouchStart }`

#### Mouse Drag — Full Requirements

- `handleMouseDown(e: MouseEvent)` — attached to the resize handle's `onMouseDown`.
- On `mousedown`: record `startY = e.clientY` and `startHeight = container.offsetHeight`. Set `isDragging = true`.
- Add `mousemove` and `mouseup` to `document` (not the element).
- On `mousemove`: `newHeight = Math.max(minHeight, startHeight + (e.clientY - startY))`. Apply via `container.style.height = newHeight + 'px'`.
- On `mouseup`: set `isDragging = false`. Remove both `document` listeners.
- Call `e.preventDefault()` on `mousedown` to prevent text selection during drag.
- Apply `select-none` (`user-select: none`) to `<body>` during drag. Remove on `mouseup`.

#### Touch Drag — Full Requirements

- `handleTouchStart(e: TouchEvent)` — attached to the resize handle's `onTouchStart`.
- Use `e.touches[0]` for the primary touch point.
- Record `startY = touch.clientY` and `startHeight = container.offsetHeight`.
- Add `touchmove` and `touchend` to `document`.
- On `touchmove`: use `e.touches[0].clientY`. Apply `Math.max(minHeight, startHeight + delta)`.
- On `touchend` / `touchcancel`: clean up listeners and reset state.
- Call `e.preventDefault()` on `touchstart` to prevent scroll interference during resize.

#### Cleanup — Critical

- `useEffect` cleanup must always remove all document-level event listeners on unmount.
- Listeners must use the same function reference (capture in `useRef` or via closure) so `removeEventListener` correctly unregisters them.

#### Cursor Behavior

| Condition | Cursor |
|---|---|
| Handle at rest | `cursor-se-resize` (via Tailwind on the handle element) |
| During drag | Add `cursor-se-resize` to `document.body` · Remove on drag end |
| Disabled | `cursor-default` on handle |

#### State Class During Drag

While `isDragging`, add `ring-1 ring-input-border-selected` to the editor container so the border reflects the active interaction.


---

## Helper / Error Text

- Remove from DOM when neither `helperText` nor `errorText` is provided.
- When `errorText` is set → render with `text-input-text-critical`. Replaces helper text.
- When only `helperText` → render with `text-input-text-helper`.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-input-text-label` | `text-input-text-label` | Label |
| `--color-input-text-enabled` | `text-input-text-enabled` | Editor content |
| `--color-input-text-placeholder` | `text-input-text-placeholder` | Placeholder (via ProseMirror pseudo) |
| `--color-input-text-disabled` | `text-input-text-disabled` | Content (disabled) |
| `--color-input-text-helper` | `text-input-text-helper` | Helper text |
| `--color-input-text-critical` | `text-input-text-critical` | Error text + required asterisk |
| `--color-input-bg-primary` | `bg-input-bg-primary` | Container bg (default, focused, error) |
| `--color-input-bg-disabled` | `bg-input-bg-disabled` | Container bg (disabled) |
| `--color-input-border-enabled` | `border-input-border-enabled` | Border (default, filled) + toolbar divider |
| `--color-input-border-selected` | `border-input-border-selected` | Border (focused) |
| `--color-input-border-critical` | `border-input-border-critical` | Border (error) |
| `--color-input-border-disabled` | `border-input-border-disabled` | Border (disabled) |
| `--color-bg-primary` | `bg-bg-primary` | Toolbar button active background |
