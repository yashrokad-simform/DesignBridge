# File Picker System

## Overview

| Property | Value |
|---|---|
| System Name | File Picker |
| Components | `File Type Icon` · `_base File Picker` · `File Picker` · `Document Tile` |
| Node — File Type Icon | `8124:39758` |
| Node — `_base File Picker` | `19280:211647` |
| Node — File Picker | `19280:213120` |
| Node — Document Tile | `8124:39789` |
| File Type Icon Variants | 6 (`File type`) |
| File Picker Variants | 3 (`Property 1`) |
| Document Tile Variants | 3 (`State`) |

A four-component system for file upload interactions. `File Type Icon` renders a format badge. `_base File Picker` is the base upload zone. `File Picker` wraps it with state overrides. `Document Tile` displays an uploaded file with metadata and action buttons.

---

## Component Hierarchy & Build Order

```
Level 1 — File Type Icon          [COMPONENT_SET]
  (standalone — no sub-components)

Level 1 — _base File Picker       [COMPONENT]
  (single base — not a Component Set)

Level 2 — File Picker             [COMPONENT_SET]
  (wraps _base File Picker instances — follows same wrapper pattern as Badge/Button)

Level 2 — Document Tile           [COMPONENT_SET]
  (uses File Type Icon + Button instances)
```

**Build order:** `File Type Icon` → `_base File Picker` → `File Picker` + `Document Tile` (parallel)

---

## 1. File Type Icon

### Node
`8124:39758`

### Variants — `File type` (6 options)

| Variant | Page Color | Hardcoded Fill | Notes |
|---|---|---|---|
| `IMG` | Rose/red | `#E11B54` | Hardcoded — intentional |
| `JPG` | Indigo/purple | `#7839EE` | Hardcoded — intentional |
| `PNG` | Teal | `#0E937D` | Hardcoded — intentional |
| `PDF` | Red | `#D92E20` | Hardcoded — intentional |
| `DOC` | Blue | `#155EEF` | Hardcoded — intentional |
| `CSV` | Green | `#039855` | Hardcoded — intentional |

> **All page background colors are hardcoded.** This is intentional — file type icons use fixed brand colors that do not change with the design system theme. Do not bind these to semantic variables.

### Layer Structure

```
File type=[X]                      [COMPONENT · 40×40px fixed]
  ├── Page                         [FRAME · 32×40px]
  │   ├── Page background          [VECTOR · 32×40px]
  │   │     Fill: hardcoded color per type (see table above)
  │   └── Earmark                  [VECTOR · 12×12px · top-right fold]
  │         Fill: white at 30% opacity (Background/bg-primary · opacity 0.30)
  └── File type                    [VECTOR · label text shape]
        Fill: Status/text-white
```

> **`File type` VECTOR** (the text label shape like "PDF", "DOC" etc.) always uses `Status/text-white` as its fill. This applies to all 6 variants.

> ⚠️ **Icon path rule (applies to ALL icons in this system):**
> All icons from the design system follow this path: `Icon [INSTANCE] → [size]px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`
> Color must always be overridden on the **stroke** of the innermost `Icon [VECTOR]` layer. Never apply color on any outer frame.

> **`Earmark`** — the triangular fold at the top-right corner of the page shape uses `Background/bg-primary` (white) at 30% opacity across PDF, DOC, CSV. For IMG, JPG, PNG, the earmark fill is a computed tint without a variable.

### Component Properties

| Property | Type | Options |
|---|---|---|
| `File type` | VARIANT | `IMG` · `JPG` · `PNG` · `PDF` · `DOC` · `CSV` |

### Variable Attachment — File Type Icon

| Layer | Property | Value |
|---|---|---|
| `Page background` | Fill | Hardcoded color (see table) |
| `Earmark` (PDF/DOC/CSV) | Fill | `Background/bg-primary` at 30% opacity |
| `File type` VECTOR | Fill | `Status/text-white` |

---

## 2. `_base File Picker`

### Node
`19280:211647` — single **COMPONENT** (not a Component Set)

This is the foundation of the File Picker. It contains the upload zone structure in its default (Enabled) appearance. All three `File Picker` variants point to instances of this component and override fill/stroke per state.

### Structure

```
_base File Picker                  [COMPONENT · FIXED(512px) × HUG]
  Auto Layout:   Vertical · Center (cross-axis)
  Padding:       spacing-xl (12px) all sides
  Gap:           No direct gap (children via Content)
  Fill:          Component/Input Field/input-bg-primary
  Stroke:        Component/Input Field/input-border-enabled · 1px inside
  Radius:        radius-xl (all corners)
  │
  └── Content                      [FRAME · FILL × HUG · Vertical AL · Center · gap spacing-xl]
        │
        ├── Featured icon          [FRAME · 24×24px · FIXED · radius-full]
        │     Fill:   Background/bg-brand_light
        │     Stroke: Border/border-brand · 1px center
        │     └── Icon             [INSTANCE · Icon component · Size=12px]
        │           Default: upload-cloud icon (swappable)
        │           Stroke: Icon/icon-secondary (on inner VECTOR)
        │
        └── Text and supporting text  [FRAME · FILL × HUG · Vertical AL · Center · gap spacing-xs]
              ├── Action           [FRAME · FILL × HUG · Horizontal AL · Center · gap spacing-xs]
              │     ├── Button     [INSTANCE · Button component · Size=Small · Type=Text · State=Enabled]
              │     │     Text: "Click to Upload" · Show Prefix=false · Show Suffix=false
              │     │     _base Button sizing: HUG × HUG · Button instance sizing: HUG × HUG
              │     └── Text       [TEXT · "or drag and drop" · Label sm/Regular]
              │           Fill: Text/text-secondary
              └── Supporting text  [TEXT · FILL × HUG · Center · Label sm/Regular]
                    Fill: Text/text-secondary
                    Content: "PDF, DOC, XLS or PPT (max. 20MB)"
```

### Variable Attachment — `_base File Picker`

| Target | Property | Variable |
|---|---|---|
| Outer frame | Fill | `Component/Input Field/input-bg-primary` |
| Outer frame | Stroke color | `Component/Input Field/input-border-enabled` |
| Outer frame | Stroke weight | 1px (hardcoded) |
| Outer frame | Padding all sides | `spacing-xl` |
| Outer frame | Corner radius (all 4) | `radius-xl` |
| `Content` | Gap | `spacing-xl` |
| `Featured icon` | Fill | `Background/bg-brand_light` |
| `Featured icon` | Stroke | `Border/border-brand` |
| `Featured icon` | Corner radius (all 4) | `radius-full` |
| `Text and supporting text` | Gap | `spacing-xs` |
| `Action` | Gap | `spacing-xs` |
| `Text` ("or drag and drop") | Fill | `Text/text-secondary` |
| `Text` ("or drag and drop") | Text Style | `Label sm/Regular` |
| `Supporting text` | Fill | `Text/text-secondary` |
| `Supporting text` | Text Style | `Label sm/Regular` |

---

## 3. File Picker

### Node
`19280:213120` — **COMPONENT_SET** wrapping `_base File Picker` instances

Follows the **same wrapper pattern as Badge and Button**: each variant is a COMPONENT frame containing exactly one `_base File Picker` INSTANCE. Only the fill, stroke color, and stroke weight change between variants.

### Variants — `Property 1` (3 options)

| Variant | Fill | Stroke | Stroke Weight | Featured Icon Fill | Featured Icon Stroke |
|---|---|---|---|---|---|
| `Enabled` | `input-bg-primary` | `input-border-enabled` | 1px | `Background/bg-brand_light` | `Border/border-brand` |
| `Drag File` | `input-bg-primary` | `input-border-selected` | **2px** | `Background/bg-brand_light` | `Border/border-brand` |
| `Disabled` | `input-bg-disabled` | `input-border-disabled` | 1px | `Background/bg-secondary` | `Border/border-primary` |

> **Drag File uses 2px stroke** — the only state with a heavier border weight. This visually signals an active drag interaction.

### Layer Structure

```
File Picker                        [COMPONENT_SET]
  │
  ├── Property 1=Enabled           [COMPONENT — wrapper frame]
  │     └── _base File Picker      [INSTANCE — override fill/stroke per state]
  │
  ├── Property 1=Drag File         [COMPONENT — wrapper frame]
  │     └── _base File Picker      [INSTANCE — stroke = input-border-selected · 2px]
  │
  └── Property 1=Disabled          [COMPONENT — wrapper frame]
        └── _base File Picker      [INSTANCE — fill = input-bg-disabled]
              └── Featured icon overrides:
                    Fill:   Background/bg-secondary
                    Stroke: Border/border-primary
```

### Component Properties

| Property | Type | Options |
|---|---|---|
| `Property 1` | VARIANT | `Enabled` · `Drag File` · `Disabled` |

> ⚠️ **Rename `Property 1` → `State`** in Figma for consistency with other components in the system.

### Per-Variant Overrides on `_base File Picker` instance

| State | Override property | Value |
|---|---|---|
| `Enabled` | Fill | `Component/Input Field/input-bg-primary` |
| `Enabled` | Stroke | `Component/Input Field/input-border-enabled` · 1px |
| `Drag File` | Fill | `Component/Input Field/input-bg-primary` |
| `Drag File` | Stroke | `Component/Input Field/input-border-selected` · **2px** |
| `Disabled` | Fill | `Component/Input Field/input-bg-disabled` |
| `Disabled` | Stroke | `Component/Input Field/input-border-disabled` · 1px |
| `Disabled` | Featured icon fill | `Background/bg-secondary` |
| `Disabled` | Featured icon stroke | `Border/border-primary` |

---

## 4. Document Tile

### Node
`8124:39789` — **COMPONENT_SET**

### Variants

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `View` · `Uploading` · `Uploaded` |
| `Show Date#8124:64` | BOOLEAN | `true` (default) |

### Structure — `State=View` and `State=Uploaded`

Both states share identical structure. Only the action button configuration may differ contextually.

```
State=View / State=Uploaded        [COMPONENT · FILL × FIXED(64px) · Horizontal AL · Center VA]
  Padding:  spacing-xl (12px) all sides
  Gap:      spacing-xl (12px)
  Fill:     Background/bg-primary
  Stroke:   Border/border-primary · 1px inside
  Radius:   radius-xl (all corners)
  │
  ├── File Type Icon                [INSTANCE · File type=PDF · 40×40px]
  │     (uses existing File Type Icon component — set File type per context)
  │
  ├── Text and supporting text      [FRAME · FILL × HUG · Vertical AL · gap spacing-xxs · layoutGrow=1]
  │     ├── Text                    [TEXT · FILL × HUG · Body sm/Medium · 1 line truncated]
  │     │     Fill: Text/text-primary
  │     │     Content: "Tech requirements.pdf"
  │     │     Truncation: ENDING · maxLines: 1
  │     └── Frame 2087325206        [FRAME · FILL × HUG · Horizontal AL · Center VA · gap spacing-md]
  │           ├── Supporting text   [TEXT · HUG × HUG · Label sm/Medium]
  │           │     Fill: Text/text-secondary · "720 KB"
  │           ├── Ellipse 302       [ELLIPSE · 4×4px]
  │           │     Fill: Text/text-secondary
  │           │     Visible: Show Date boolean
  │           └── Supporting text   [TEXT · HUG × HUG · Label sm/Medium]
  │                 Fill: Text/text-secondary · "Uploaded on 2/15/2024"
  │                 Visible: Show Date boolean
  │
  └── Frame 2                       [FRAME · HUG × HUG · Horizontal AL · Center VA · gap spacing-md]
        ├── Button "View"           [INSTANCE · Button · Size=Small · Type=Bordered · State=Enabled]
        │     Text: "View" · Show Prefix=false · Show Suffix=false
        │     (no icons — label only)
        └── Button "Download"       [INSTANCE · Button · Size=Small · Type=Icon Secondary · State=Enabled]
              Icon Only type · download icon
              Path: Left Icon [INSTANCE] → 16px [COMPONENT] → download [COMPONENT] → Icon [VECTOR]
              Override Icon VECTOR stroke → btn-icon-bordered
```

> The `eye` instance present in the Figma file has `visible: false` and is never displayed. Do not recreate it.

### Structure — `State=Uploading`

```
State=Uploading                    [COMPONENT · FILL × HUG · Horizontal AL]
  Same fill/stroke/radius/padding/gap as View/Uploaded
  │
  ├── File Type Icon                [INSTANCE · File type=PDF · 40×40px]
  │
  └── Frame 3                       [FRAME · FILL × HUG · Vertical AL · gap spacing-md · layoutGrow=1]
        ├── Frame 1                 [FRAME · FILL × HUG · Horizontal AL · Center VA · gap spacing-3xl]
        │     ├── Text and supporting text  [FILL × HUG · Vertical AL · gap spacing-xxs · layoutGrow=1]
        │     │     ├── Text        [Body sm/Medium · Text/text-primary · truncated 1 line]
        │     │     └── Supporting text [Label sm/Medium · Text/text-secondary · file size]
        │     └── Button (cancel)   [INSTANCE · Button · Size=Small · Type=Icon Secondary]
        │
        └── Progress bar            [FRAME · FILL × HUG · Horizontal AL · Center VA · gap spacing-md]
              ├── Progress bar track [FRAME · FILL × FIXED(8px) · layoutGrow=1 · relative positioning]
              │     Fill:         Background/bg-secondary
              │     Corner radius: radius-full (all 4 corners)
              │     └── Progress fill [FRAME · FIXED width(%) × FILL height · ABSOLUTE positioned]
              │           Fill:         Background/bg-brand
              │           Corner radius: radius-full (all 4 corners)
              │           Width:        represents upload percentage (e.g. 10% of track width)
              └── Percentage        [TEXT · HUG × HUG · Label sm/Medium]
                    Fill: Text/text-primary
                    Content: "10%"
```

### Variable Attachment — Document Tile

| Target | Property | Variable |
|---|---|---|
| Tile frame | Fill | `Background/bg-primary` |
| Tile frame | Stroke color | `Border/border-primary` |
| Tile frame | Stroke weight | 1px (hardcoded) |
| Tile frame | Padding all sides | `spacing-xl` |
| Tile frame | Gap | `spacing-xl` |
| Tile frame | Corner radius (all 4) | `radius-xl` |
| `Text and supporting text` | Gap | `spacing-xxs` |
| `Text` (filename) | Fill | `Text/text-primary` |
| `Text` (filename) | Text Style | `Body sm/Medium` |
| `Frame 2087325206` | Gap | `spacing-md` |
| `Supporting text` (file size) | Fill | `Text/text-secondary` |
| `Supporting text` (file size) | Text Style | `Label sm/Medium` |
| `Ellipse 302` (dot) | Fill | `Text/text-secondary` |
| `Supporting text` (date) | Fill | `Text/text-secondary` |
| `Supporting text` (date) | Text Style | `Label sm/Medium` |
| `Frame 2` (actions) | Gap | `spacing-md` |
| View "View" Button | Show Prefix | `false` |
| View "View" Button | Show Suffix | `false` |
| View "Download" Button | Type | `Icon Secondary` |
| View "Download" Button | Icon VECTOR stroke | `Component/Button/btn-icon-bordered` |
| Uploaded "View" Button | Show Prefix | `false` |
| Uploaded "View" Button | Show Suffix | `false` |
| Uploaded "Trash" Button | Type | `Icon Secondary` |
| Uploaded "Trash" Button | Icon VECTOR stroke | `Component/Button/btn-icon-bordered` |
| Uploading "Trash" Button | Type | `Icon Secondary` |
| Uploading "Trash" Button | Icon VECTOR stroke | `Component/Button/btn-icon-bordered` |
| `Frame 3` (upload info) | Gap | `spacing-md` |
| `Frame 1` (upload row) | Gap | `spacing-3xl` |
| Progress bar `Frame` | Gap | `spacing-md` |
| Progress bar track | Fill | `Background/bg-secondary` |
| Progress bar track | Corner radius (all 4) | `radius-full` |
| Progress fill (ABSOLUTE) | Fill | `Background/bg-brand` |
| Progress fill (ABSOLUTE) | Corner radius (all 4) | `radius-full` |
| Progress fill (ABSOLUTE) | Width | Percentage value (FIXED · e.g. 10% of track) |
| Progress fill (ABSOLUTE) | Height | FILL |
| `Percentage` text | Fill | `Text/text-primary` |
| `Percentage` text | Text Style | `Label sm/Medium` |

---

## Nested Components

### File Type Icon (in `Document Tile`)

The `Document Tile` uses `File Type Icon` instances for the leading file format badge.

| Property | Value |
|---|---|
| Component | `File Type Icon` (node `8124:39758`) |
| Default `File type` | `PDF` — set to match actual file type |
| Size | 40×40px (fixed by component) |
| Placement | Leading (first child of tile) |

### Button (in `Document Tile` and `_base File Picker`)

| Location | Button config |
|---|---|
| Document Tile "View" action | Size=Small · Type=Bordered · State=Enabled · Text="View" · no prefix/suffix |
| Document Tile delete/cancel | Size=Small · Type=Icon Secondary · State=Enabled |
| `_base File Picker` Action frame | Size=Small · Type=Text · State=Enabled · Text="Click to upload" |

### Icon (in `_base File Picker`)

| Property | Value |
|---|---|
| Component | Icon component |
| Size | 12px |
| Default | upload-cloud icon |
| Color | Override VECTOR stroke → `Icon/icon-secondary` |

---

## Typography

| Layer | Text Style | Font |
|---|---|---|
| Document Tile filename (`Text`) | `Body sm/Medium` | Inter · Medium 500 · 14px · 18px LH · truncated 1 line |
| Document Tile file size/date (`Supporting text`) | `Label sm/Medium` | Inter · Medium 500 · 12px · 16px LH |
| Document Tile progress `Percentage` | `Label sm/Medium` | Inter · Medium 500 · 12px · 16px LH |
| File Picker `Action` → `Text` ("or drag and drop") | `Label sm/Regular` | Inter · Regular 400 · 12px · 16px LH |
| File Picker `Supporting text` (formats hint) | `Label sm/Regular` | Inter · Regular 400 · 12px · 16px LH |

> Apply text styles directly. Do not bind individual font variables.

---

## Figma Construction Guide

### Step 1 — Build `File Type Icon`

**For each of the 6 variants (`IMG`, `JPG`, `PNG`, `PDF`, `DOC`, `CSV`):**

1. Create a new **Frame**. Name it `File type=[X]`. Set size to **40×40px fixed**.
2. No Auto Layout — children are positioned manually via constraints.
3. No fill, no stroke on the outer frame.

#### Page frame
1. Add a child **Frame** inside. Name it `Page`.
2. Size: **32×40px**. No Auto Layout.
3. No fill, no stroke on Page frame.

#### Page background
1. Draw a **VECTOR** (page shape with folded top-right corner) inside `Page`. Name it `Page background`.
2. Size: **32×40px** (fills Page frame).
3. Bind fill → **hardcoded color** per type. Do NOT use variables:
   - IMG → `#E11B54` · JPG → `#7839EE` · PNG → `#0E937D`
   - PDF → `#D92E20` · DOC → `#155EEF` · CSV → `#039855`

#### Earmark
1. Draw a **VECTOR** (triangular fold shape) inside `Page`. Name it `Earmark`.
2. Size: **12×12px**. Position: top-right corner of `Page background`.
3. Bind fill → `Background/bg-primary` at **30% opacity** (for PDF, DOC, CSV).
4. For IMG, JPG, PNG: use a lighter tint of the page color (computed, no variable).

#### File type label
1. Draw a **VECTOR** (text label shape for "PDF", "DOC", etc.) below `Page`, inside the outer frame.
2. Name it `File type`.
3. Bind fill → `Status/text-white`.
4. Position: centered horizontally, lower third of the icon.

5. Convert the outer 40×40 frame to a **Component**.

**Repeat for all 6 types. Combine into a Component Set named `File Type Icon` with variant property `File type`.**

### Step 2 — Build `_base File Picker`

1. Create a new **Frame**. Name it `_base File Picker`.
2. Apply **Vertical Auto Layout**. Set sizing to **FIXED width (512px) × HUG height**.
3. Set **cross-axis alignment to Center**.
4. Bind padding all sides → `spacing-xl`.
5. Bind fill → `Component/Input Field/input-bg-primary`.
6. Add stroke → 1px inside. Bind stroke → `Component/Input Field/input-border-enabled`.
7. Bind corner radius all 4 → `radius-xl`.
8. Convert to a **Component**.

#### Content frame
1. Add a **Frame** inside. Name it `Content`.
2. Set to **Vertical Auto Layout · FILL × HUG · Center cross-axis**.
3. Bind gap → `spacing-xl`.

#### Featured icon
1. Add a **Frame** inside `Content`. Name it `Featured icon`.
2. Set to **Horizontal Auto Layout · 24×24px fixed · Center both axes**.
3. Bind fill → `Background/bg-brand_light`.
4. Add stroke → 1px center. Bind stroke → `Border/border-brand`.
5. Bind corner radius all 4 → `radius-full`.
6. Place an **Icon component** instance (Size=12px) inside. Default = upload-cloud icon.
7. Override Icon VECTOR **stroke** → `Icon/icon-secondary`.

#### Text and supporting text frame
1. Add a **Frame** inside `Content`. Name it `Text and supporting text`.
2. Set to **Vertical Auto Layout · FILL × HUG · Center cross-axis**.
3. Bind gap → `spacing-xs`.

#### Action frame
1. Add a **Frame** inside `Text and supporting text`. Name it `Action`.
2. Set to **Horizontal Auto Layout · FILL × HUG · Center cross-axis**.
3. Bind gap → `spacing-xs`.
4. Add a **Button component** instance with these exact settings:
   - `Size` = `Small`
   - `Type` = `Text`
   - `State` = `Enabled`
   - `Text` = `"Click to Upload"` (exact casing)
   - `Show Prefix` = `false` — no leading icon
   - `Show Suffix` = `false` — no trailing icon
   - `_base Button` inner frame sizing: **HUG width × HUG height**
   - `Button` component instance sizing: **HUG width × HUG height**

   > ⚠️ Both the `_base Button` frame and the `Button` component instance must be set to **HUG** on both axes. Do not use FILL or FIXED sizing on this button.

5. Add a **Text** layer next to it. Content: "or drag and drop". Apply text style `Label sm/Regular`. Bind fill → `Text/text-secondary`.

#### Supporting text
1. Add a **Text** layer inside `Text and supporting text`. Name it `Supporting text`.
2. Content: "PDF, DOC, XLS or PPT (max. 20MB)". Apply text style `Label sm/Regular`.
3. Set sizing: **FILL × HUG**. Text align: **Center**.
4. Bind fill → `Text/text-secondary`.

### Step 3 — Build `File Picker` Variants

> ⚠️ **Wrapper pattern — same as Badge and Button.** Each variant is a wrapper COMPONENT containing exactly one `_base File Picker` instance.

**For each of the 3 states:**

1. Create an empty **Frame**. Name it `Property 1=Enabled` (adjust per state).
2. Place an instance of `_base File Picker` inside.
3. Resize outer frame to HUG.
4. Convert to **Component**.

**Per-variant overrides on the `_base File Picker` instance:**

| State | Fill override | Stroke override | Stroke weight | Featured icon fill | Featured icon stroke |
|---|---|---|---|---|---|
| `Enabled` | `input-bg-primary` | `input-border-enabled` | 1px | `bg-brand_light` | `border-brand` |
| `Drag File` | `input-bg-primary` | `input-border-selected` | **2px** | `bg-brand_light` | `border-brand` |
| `Disabled` | `input-bg-disabled` | `input-border-disabled` | 1px | `Background/bg-secondary` | `Border/border-primary` |

5. Combine all 3 into a **Component Set** named `File Picker`.
6. Add variant property `Property 1` → options: `Enabled`, `Drag File`, `Disabled`.
   > Rename `Property 1` → `State` for consistency.

### Step 4 — Expose Nested Properties

> ⚠️ **CRITICAL — Mandatory.**

1. Select each `File Picker` variant frame.
2. Properties panel → **"Expose properties from Nested instances"**.

### Step 5 — Build `Document Tile` Variants

**For `State=View` and `State=Uploaded`:**

1. Create a **Frame**. Apply **Horizontal Auto Layout · FILL × FIXED(64px) · Center VA**.
2. Bind padding all sides → `spacing-xl`. Bind gap → `spacing-xl`.
3. Bind fill → `Background/bg-primary`. Add stroke 1px inside → `Border/border-primary`.
4. Bind corner radius all 4 → `radius-xl`. Convert to **Component**.

**Add children:**

- **File Type Icon** instance (File type=PDF · 40×40px)
- **Text and supporting text** frame (FILL × HUG · Vertical AL · gap spacing-xxs · layoutGrow=1):
  - `Text` layer: Body sm/Medium · Text/text-primary · FILL × HUG · truncation ENDING · maxLines=1
  - `Frame 2087325206` (FILL × HUG · Horizontal AL · Center VA · gap spacing-md):
    - `Supporting text` (file size): Label sm/Medium · Text/text-secondary · HUG
    - `Ellipse 302` (4×4px): fill `Text/text-secondary` — link visibility to `Show Date` Boolean
    - `Supporting text` (date): Label sm/Medium · Text/text-secondary · HUG — link visibility to `Show Date` Boolean
- **Frame 2** (HUG × HUG · Horizontal AL · Center VA · gap spacing-md):
  - **Button "View"**: Size=Small · Type=Bordered · State=Enabled · Text="View" · Show Prefix=false · Show Suffix=false (label only — no icons)
  - **Button "Download"** (View state) or **Button "Trash"** (Uploaded state): Size=Small · Type=Icon Secondary · State=Enabled
    - Enter `Left Icon [INSTANCE] → 16px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`
    - Override Icon VECTOR **stroke** → `Component/Button/btn-icon-bordered`
    - View state: icon = `download` · Uploaded state: icon = `trash`

Add **Boolean component property**: `Show Date` (default: `true`). Link to `Ellipse 302` and date `Supporting text` visibility.

**For `State=Uploading`:**

1. Duplicate `State=View`. Change layout to **HUG height** (not fixed).
2. Replace `Text and supporting text` + `Frame 2` children with:
   - **Frame 3** (FILL × HUG · Vertical AL · gap spacing-md · layoutGrow=1):
     - **Frame 1** (FILL × HUG · Horizontal AL · Center VA · gap spacing-3xl):
       - Text and supporting text (filename + size — no date)
       - **Button "Trash"** (Size=Small · Type=Icon Secondary · cancel upload):
         - Enter `Left Icon [INSTANCE] → 16px [COMPONENT] → trash [COMPONENT] → Icon [VECTOR]`
         - Override Icon VECTOR **stroke** → `Component/Button/btn-icon-bordered`
     - **Progress bar frame** (FILL × HUG · Horizontal AL · Center VA · gap spacing-md):
       - **Progress bar track** (FILL × FIXED(8px) · layoutGrow=1 · set to **relative positioning**):
         - Bind fill → `Background/bg-secondary`
         - Bind corner radius all 4 → `radius-full`
         - Add a child **Frame** inside named `Progress fill`:
           - Set positioning to **ABSOLUTE**
           - Sizing: **FIXED width × FILL height** (width = current upload % × track width, e.g. 10%)
           - Bind fill → `Background/bg-brand`
           - Bind corner radius all 4 → `radius-full`
       - `Percentage` TEXT (Label sm/Medium · Text/text-primary · HUG · content "10%")

### Step 6 — Combine `Document Tile` Component Set

1. Select all 3 state components.
2. Combine into **Component Set** named `Document Tile`.
3. Add variant property `State` → options: `View`, `Uploading`, `Uploaded`.
4. Add Boolean property `Show Date` (default: `true`).

### Step 7 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — Mandatory on `Document Tile`.**

1. Select each `Document Tile` variant COMPONENT frame.
2. Properties panel → **"Expose properties from Nested instances"**.

---

## Mandatory Rules

- **File Type Icon page fills are hardcoded.** All 6 variants use fixed hex values. Do not bind to semantic variables.
- **`File type` VECTOR uses `Status/text-white`** as fill on all variants.
- **`Earmark` fill is `Background/bg-primary` at 30% opacity** for PDF, DOC, CSV.
- **Text style only — no font variable bindings.**
- **File Picker follows the wrapper pattern** — same as Badge and Button. Each variant wraps a `_base File Picker` instance.
- **Drag File stroke is 2px** — the only state with a heavier stroke weight. All others are 1px.
- **Progress bar track fill = `Background/bg-secondary`** and corner radius = `radius-full` on all 4 corners.
- **Dot separator in Document Tile uses `Text/text-secondary`** — same as file size and date text.
- **`Show Date` Boolean** controls both the `Ellipse 302` dot and the date `Supporting text` simultaneously.
- **`eye` instance in Document Tile is never shown** — do not recreate.
- **File Picker variant property should be renamed** from `Property 1` to `State` for consistency.
- **Expose nested properties** on both `File Picker` and `Document Tile`.
- **"Click to Upload" button** must be Type=Text · Show Prefix=false · Show Suffix=false · both `_base Button` and `Button` instance sized to **HUG × HUG**.
- **Document Tile action buttons**: View variant = "View" (Bordered, no icons) + "Download" (Icon Secondary). Uploaded variant = "View" (Bordered, no icons) + "Trash" (Icon Secondary). Uploading variant = "Trash" (Icon Secondary) only.
- **All icon overrides** must target the `Icon [VECTOR]` at path `[Icon instance] → [size]px → [icon-name] → Icon [VECTOR]`. Override the **stroke** variable. Never apply color on outer frames.
- **Progress bar has two layers**: `Progress bar track` (fill=`Background/bg-secondary`) as the background, and `Progress fill` (fill=`Background/bg-brand`, ABSOLUTE positioned) as the filled indicator. Both use `radius-full`.

---

## Figma Component Page — Arrangement

```
┌──────────────────────────────────────────────────────────────┐
│  FILE PICKER SYSTEM                ← small caps label        │
│  File Picker & Document Tile       ← large bold title        │
│  File Type Icon · _base File Picker · File Picker (3 states) │
│  · Document Tile (3 states)         ← summary                │
│  ──────────────────────────────────  ← divider               │
│                                                               │
│  ▌ File Type Icon — 6 Variants                               │
│    IMG · JPG · PNG · PDF · DOC · CSV · hardcoded fills        │
│    [ actual File Type Icon COMPONENT_SET ]                    │
│                                                               │
│  ▌ _base File Picker — Base Component                        │
│    Upload zone · Featured icon · Action · Supporting text     │
│    [ actual _base File Picker COMPONENT ]                     │
│                                                               │
│  ▌ File Picker — 3 States                                    │
│    Enabled · Drag File · Disabled                             │
│    [ actual File Picker COMPONENT_SET ]                       │
│                                                               │
│  ▌ Document Tile — 3 States                                  │
│    View · Uploading · Uploaded · Show Date toggle             │
│    [ actual Document Tile COMPONENT_SET ]                     │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```
