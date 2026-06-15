# File Picker — Component System

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

A three-component system: `FilePicker` (drag-drop upload zone), `DocumentTile` (uploaded file display row), and `FileTypeIcon` (file type thumbnail). All three work independently and compose together in an upload workflow.

---

# Part A — FilePicker

## Overview

An upload zone component supporting three states: `enabled`, `drag-file`, and `disabled`. The zone accepts click-to-upload and drag-and-drop interactions.

### Props

| Prop | Type | Default |
|---|---|---|
| `state` | `'enabled' \| 'drag-file' \| 'disabled'` | `'enabled'` |
| `acceptedTypes` | `string` | `'PDF, DOC, XLS or PPT'` |
| `maxSize` | `string` | `'20MB'` |
| `onFileSelect` | `(files: FileList) => void` | `undefined` |
| `className` | `string` | `undefined` |

---

## CVA Structure

Apply CVA to the **outer container**.

### Base Classes

```
flex flex-col items-center p-3 rounded-xl w-full
```

> `p-3` = 12px · `rounded-xl` = 12px

### `state` Variant

| State | Background + Border classes |
|---|---|
| `enabled` | `bg-input-bg-primary border border-input-border-enabled` |
| `drag-file` | `bg-input-bg-primary border-2 border-input-border-selected` |
| `disabled` | `bg-input-bg-disabled border border-input-border-disabled pointer-events-none` |

> `border-input-border-disabled` = `--color-input-border-disabled` = `#dde3eb` · `border-input-border-selected` = `--color-input-border-selected` = `#0056b8` (2px on drag-file) · `bg-input-bg-disabled` = `--color-input-bg-disabled` = `#f4f5f7` · No opacity for disabled — token-driven only.

---

## Inner Content Layout

```
flex flex-col items-center gap-3 w-full
```

> `gap-3` = 12px

---

## Featured Icon (Upload Icon Circle)

```
flex items-center justify-center size-6 rounded-full border flex-shrink-0
```

> `size-6` = 24×24px

| State | Background + Border |
|---|---|
| `enabled` / `drag-file` | `bg-bg-brand-light border-border-brand` |
| `disabled` | `bg-bg-secondary border-border-primary` |

**Icon inside:**
- Import `DocumentUploadIcon` from `src/assets/icons/`. Do not inline SVG.
- Size: `size-3` (12×12px).
- Use separate `DocumentUploadDisabledIcon` for disabled state (muted asset — Figma confirms different visual).
- `aria-hidden="true"`.

---

## Text and Action Row

```
flex flex-col items-center gap-1 w-full
```

> `gap-1` = 4px

### Action Row (click link + drag text)

```
flex items-center justify-center gap-1 w-full
```

**"Click to Upload" link button:**

```
flex items-center justify-center h-4
text-xs font-medium leading-4 whitespace-nowrap
```

| State | Color |
|---|---|
| `enabled` | `text-btn-text-secondary` |
| `drag-file` | `text-btn-text-secondary-focused` |
| `disabled` | `text-btn-text-secondary-disabled` |

**"or drag and drop" text:**

```
text-xs font-normal leading-4 whitespace-nowrap
```

| State | Color |
|---|---|
| `enabled` / `drag-file` | `text-text-secondary` |
| `disabled` | `text-text-secondary` |

### Format hint line

```
text-xs font-normal leading-4 text-center w-full
```

| State | Color |
|---|---|
| `enabled` / `drag-file` | `text-text-secondary` |
| `disabled` | `text-text-secondary` |

Content: `"PDF, DOC, XLS or PPT (max. {maxSize})"` — dynamic from props.

---

## Drag-and-Drop Behavior

- Wrap the container in a `<div>` with `onDragOver`, `onDragEnter`, `onDragLeave`, `onDrop` handlers.
- On `dragenter`/`dragover` → set `state='drag-file'`.
- On `dragleave`/`drop` → return to `state='enabled'`.
- On `drop` → run validation (see File Validation below), then call `onFileSelect` with valid files only.
- Hidden `<input type="file">` triggered by clicking the "Click to Upload" link.
- `disabled` state: `pointer-events-none` prevents all interactions.

---

## File Validation

Validate every file — both on drop and on `<input>` change — **before** calling `onFileSelect`. Invalid files are silently dropped from the selection; a toast is shown for each violation.

### Size Validation

Parse `maxSize` prop (e.g. `'20MB'`, `'5MB'`, `'1GB'`) into bytes and compare against `file.size`.

```ts
function parseMaxSize(maxSize: string): number {
  const match = maxSize.match(/^(\d+(?:\.\d+)?)\s*(KB|MB|GB)$/i);
  if (!match) return Infinity;
  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();
  const multiplier = { KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 }[unit] ?? 1;
  return value * multiplier;
}
```

If `file.size > parseMaxSize(maxSize)`:

```
"{fileName}" is too large. Maximum file size is {maxSize}.
```

### Format Validation

Derive accepted MIME types and extensions from the `acceptedTypes` prop (e.g. `'PDF, DOC, XLS or PPT'`). Map the label tokens to known types:

| Label token | Extensions | MIME types |
|---|---|---|
| `PDF` | `.pdf` | `application/pdf` |
| `DOC` | `.doc`, `.docx` | `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| `XLS` | `.xls`, `.xlsx` | `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |
| `PPT` | `.ppt`, `.pptx` | `application/vnd.ms-powerpoint`, `application/vnd.openxmlformats-officedocument.presentationml.presentation` |
| `CSV` | `.csv` | `text/csv`, `application/csv` |

Check both `file.type` (MIME) and the file extension from `file.name` — MIME may be empty on some OS/browsers.

If a file does not match any accepted type:

```
"{fileName}" is not a supported format. Please upload {acceptedTypes}.
```

### Toast Implementation

- Use the project's existing `toast` / `useToast` from shadcn/ui (`sonner` or `@/components/ui/toast`) — whichever is already installed. Do **not** add a new toast library.
- Toast variant: **destructive** (red/error styling).
- One toast per invalid file. If two files fail for different reasons, show two separate toasts.
- Toasts fire after the drag state resets to `'enabled'` so the UI does not flash.

```ts
// Example (shadcn toast)
toast({
  variant: 'destructive',
  title: 'Upload failed',
  description: `"report.exe" is not a supported format. Please upload PDF, DOC, XLS or PPT.`,
});

// Example (sonner)
toast.error('Upload failed', {
  description: `"report.exe" is not a supported format. Please upload PDF, DOC, XLS or PPT.`,
});
```

---

## Accessibility

- Entire zone is wrapped in a `<label>` or has `role="button" tabIndex={0}` for keyboard access.
- `aria-disabled="true"` when `state === 'disabled'`.
- Hidden `<input type="file">` has `aria-label="Upload file"`.

---

## Color Token Map — FilePicker

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-input-bg-primary` | `bg-input-bg-primary` | Container background (enabled/drag) |
| `--color-input-bg-disabled` | `bg-input-bg-disabled` | Container background (disabled) |
| `--color-bg-brand-light` | `bg-bg-brand-light` | Featured icon bg (active states) |
| `--color-bg-secondary` | `bg-bg-secondary` | Featured icon bg (disabled) |
| `--color-input-border-enabled` | `border-input-border-enabled` | Container border (enabled) |
| `--color-input-border-selected` | `border-input-border-selected` | Container border (drag-file) |
| `--color-input-border-disabled` | `border-input-border-disabled` | Container border (disabled) |
| `--color-border-brand` | `border-border-brand` | Featured icon border (enabled/drag) |
| `--color-border-primary` | `border-border-primary` | Featured icon border (disabled) |
| `--color-btn-text-secondary` | `text-btn-text-secondary` | "Click to upload" (enabled) |
| `--color-btn-text-secondary-focused` | `text-btn-text-secondary-focused` | "Click to upload" (drag-file) |
| `--color-btn-text-secondary-disabled` | `text-btn-text-secondary-disabled` | "Click to upload" (disabled) |
| `--color-text-secondary` | `text-text-secondary` | Supporting text (active states) |
| `--color-text-secondary` | `text-text-secondary` | Supporting text (disabled) |

---

---

# Part B — DocumentTile

## Overview

A single reusable file row component used within the upload flow. Supports three states: `view`, `uploading`, `uploaded`.

### Props

| Prop | Type | Default |
|---|---|---|
| `state` | `'view' \| 'uploading' \| 'uploaded'` | `'view'` |
| `fileName` | `string` | required |
| `fileSize` | `string` | required |
| `fileType` | `FileTypeVariant` | `'pdf'` |
| `uploadDate` | `string` | `undefined` |
| `showDate` | `boolean` | `true` |
| `progress` | `number` | `0` — `uploading` state only |
| `onView` | `() => void` | `undefined` |
| `onDownload` | `() => void` | `undefined` |
| `onDelete` | `() => void` | `undefined` |
| `className` | `string` | `undefined` |

---

## Container

```
flex gap-3 p-3 rounded-xl w-full
bg-bg-primary border border-border-primary
```

> `gap-3` = 12px · `p-3` = 12px · `rounded-xl` = 12px

| State | Height | Alignment |
|---|---|---|
| `view` | `h-16` (64px) | `items-center` |
| `uploaded` | `h-16` (64px) | `items-center` |
| `uploading` | content-driven (no fixed height) | `items-start` |

---

## FileTypeIcon Slot

Always renders `<FileTypeIcon fileType={fileType} />` at `size-10` · `flex-shrink-0`.

See Part C for full `FileTypeIcon` spec.

---

## Text and Supporting Text Block

Visible in all three states. Layout differs between `view`/`uploaded` and `uploading`.

**For `view` and `uploaded`:**

```
flex flex-col gap-0.5 flex-1 min-w-0
```

> `gap-0.5` = 2px

**For `uploading`:** text block sits inside the uploading layout — see Uploading State below.

### File name

```
text-sm font-medium leading-4.5 text-text-primary truncate w-full
```

### Meta row (file size + optional date)

```
flex items-center gap-2 w-full flex-shrink-0
```

> `gap-2` = 8px

**File size:**
```
text-xs font-medium leading-4 text-text-secondary truncate
```

**Separator dot (conditional — visible only when `showDate={true}`):**
- `size-1` (4×4px) · `flex-shrink-0` · rendered as a small circle SVG or CSS `rounded-full bg-text-secondary` element.
- Remove from DOM when `showDate={false}`.

**Upload date (conditional):**
```
text-xs font-medium leading-4 text-text-secondary truncate
```
Remove from DOM entirely when `showDate={false}` or `uploadDate` is not provided.

---

## View State

Action row (right side):

```
flex items-center gap-2 flex-shrink-0
```

**"View" button** — Bordered Small Button (from `button.md`):
```
h-9 px-4 py-2.5 rounded-xl
bg-btn-bg-bordered border border-btn-border-primary
text-xs font-medium leading-4 text-btn-text-bordered
```
> `h-9` = 36px · `px-4` = 16px · `py-2.5` = 10px

**Download button** — Bordered Small icon-only (from `button.md`):
```
h-9 p-2.5 rounded-xl
bg-btn-bg-bordered border border-border-primary
```
Icon: `DocumentDownloadIcon` from `src/assets/icons/` · `size-4` (16×16px).

---

## Uploaded State

Identical layout to View state, except:
- Download button is replaced with a **Delete button**.
- Delete button icon: `TrashIcon` from `src/assets/icons/`.

---

## Uploading State

Full-width column layout for the action area:

```
flex flex-col gap-2 flex-1 min-w-0
```

> `gap-2` = 8px

### Top row (text + delete button)

```
flex items-center gap-4 w-full
```

> `gap-4` = 16px

- Text block (file name + meta row): `flex-1 min-w-0 flex flex-col gap-0.5`
- Delete button: same icon-only bordered small button as Uploaded state.

### Progress bar row

```
flex items-center gap-3 w-full
```

> `gap-3` = 12px

**Progress track:**
```
flex-1 min-w-0 h-2 relative rounded-full
```
> `h-2` = 8px · `rounded-full` = 9999px

**Track background:**
```
absolute inset-0 rounded-full bg-bg-brand-light
```
> `bg-bg-brand-light` = light blue track (`#e6eef8`)

**Progress fill:**
```
absolute left-0 top-0 h-full rounded-full bg-bg-brand
```
Width: `style={{ width: `${progress}%` }}` — driven by `progress` prop (0–100).
> `bg-bg-brand` = `#0056b8`

**Progress percentage label:**
```
text-xs font-medium leading-4 text-text-primary whitespace-nowrap flex-shrink-0
```

---

## Color Token Map — DocumentTile

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-primary` | `bg-bg-primary` | Tile background |
| `--color-border-primary` | `border-border-primary` | Tile border |
| `--color-text-primary` | `text-text-primary` | File name, progress % |
| `--color-text-secondary` | `text-text-secondary` | File size, date |
| `--color-btn-bg-bordered` | `bg-btn-bg-bordered` | Button background |
| `--color-btn-border-primary` | `border-btn-border-primary` | View button border |
| `--color-btn-text-bordered` | `text-btn-text-bordered` | View button text |
| `--color-bg-brand-light` | `bg-bg-brand-light` | Progress track |
| `--color-bg-brand` | `bg-bg-brand` | Progress fill |

---

---

# Part C — FileTypeIcon

## Overview

A 40×40px file type thumbnail. Seven variants sharing a consistent two-layer structure (page background + file type label badge). The `image-preview` variant uses a full-bleed image instead.

### Props

| Prop | Type | Default |
|---|---|---|
| `fileType` | `FileTypeVariant` | `'pdf'` |
| `src` | `string` | `undefined` — `image-preview` only |
| `className` | `string` | `undefined` |

**FileTypeVariant:** `'jpg' | 'png' | 'pdf' | 'doc' | 'csv' | 'image-preview'`

---

## Container

All variants:
```
relative size-10 flex-shrink-0
```

`image-preview` only — add:
```
border border-border-primary rounded-lg overflow-hidden
```

---

## Standard Variants (jpg, png, pdf, doc, csv)

Two absolutely-positioned layers inside the 40×40 container:

### Layer 1 — Page background asset

```
absolute inset-[0_10%]
```

> Left and right inset `10%` of 40px = 4px · Top and bottom = 0

Import the corresponding page asset from `src/assets/icons/file-type/`:

| Variant | Asset file |
|---|---|
| `jpg` | `PageJpg.svg` |
| `png` | `PagePng.svg` |
| `pdf` | `PagePdf.svg` |
| `doc` | `PageDoc.svg` |
| `csv` | `PageCsv.svg` |

### Layer 2 — File type label badge

Absolutely positioned badge in the bottom-center of the page. Inset values per variant (Figma-confirmed):

| Variant | Inset classes |
|---|---|
| `jpg` | `absolute inset-[63.41%_28.92%_19.78%_28.27%]` |
| `png` | `absolute inset-[63.41%_27.06%_19.78%_27.31%]` |
| `pdf` | `absolute inset-[63.64%_28.86%_20%_29.37%]` |
| `doc` | `absolute inset-[63.41%_25.61%_19.78%_25.98%]` |
| `csv` | `absolute inset-[63.41%_26.3%_19.77%_26.89%]` |

Import the corresponding label badge asset from `src/assets/icons/file-type/`:

| Variant | Asset file |
|---|---|
| `jpg` | `LabelJpg.svg` |
| `png` | `LabelPng.svg` |
| `pdf` | `LabelPdf.svg` |
| `doc` | `LabelDoc.svg` |
| `csv` | `LabelCsv.svg` |

All icon elements: `aria-hidden="true"` · `absolute block inset-0 max-w-none size-full` on the `<img>`.

---

## Image Preview Variant

Full-bleed image thumbnail with rounded corners and border.

```
<img
  src={src}
  alt=""
  className="absolute inset-0 max-w-none size-full object-cover rounded-lg pointer-events-none"
/>
```

> `rounded-lg` = 8px · `object-cover` — fills the 40×40 area maintaining aspect ratio, clips overflow.

---

## Asset Folder Structure

```
src/assets/icons/file-type/
├── PageImg.svg
├── PageJpg.svg
├── PagePng.svg
├── PagePdf.svg
├── PageDoc.svg
├── PageCsv.svg
├── LabelImg.svg
├── LabelJpg.svg
├── LabelPng.svg
├── LabelPdf.svg
├── LabelDoc.svg
└── LabelCsv.svg
```

Do not create inline SVG in the `FileTypeIcon` component. Import all assets from the above paths.

---

## FileTypeVariant Type

```ts
type FileTypeVariant = 'img' | 'jpg' | 'png' | 'pdf' | 'doc' | 'csv' | 'image-preview'
```

---

## Typography Summary

| Element | Classes | Values |
|---|---|---|
| File name | `text-sm font-medium leading-4.5` | 14px / 500 / 18px |
| File size / date | `text-xs font-medium leading-4` | 12px / 500 / 16px |
| Click to Upload | `text-xs font-medium leading-4` | 12px / 500 / 16px |
| "or drag and drop" | `text-xs font-normal leading-4` | 12px / 400 / 16px |
| Format hint | `text-xs font-normal leading-4` | 12px / 400 / 16px |
| Progress % | `text-xs font-medium leading-4` | 12px / 500 / 16px |
| Button label | `text-xs font-medium leading-4` | 12px / 500 / 16px |