# Table

## Overview

| Property | Value |
|---|---|
| System Name | Table |
| Components | `_base Table header cell` · `_base Table cell` · `_base Pagination` · `Pagination` |
| Node — `_base Table header cell` | `8113:14973` |
| Node — `_base Table cell` | `8113:14939` |
| Node — `_base Pagination` | `8113:14982` |
| Node — `Pagination` | `8113:19404` |

A four-component table system covering column headers, data row cells (7 content types), pagination controls, and the complete pagination bar.

---

## ⚠️ Critical Rule — Always Use Existing Components

> **Never recreate sub-components from scratch.** Every interactive element inside a table cell or pagination bar must be an instance of an already-built component from this design system. Building new versions breaks design consistency and doubles maintenance.

| Sub-component | Configuration |
|---|---|
| Checkbox | Label=false (disable label property on every instance — never show label text) |
| Button (icon actions) | Size=Small · Type=Icon Secondary |
| Button (text actions) | Size=Small · Type=Bordered |
| Badge (status) | Type=Filled · Color=Primary |
| Input Field (edit cell) | State=Enabled · Show Label=false · Show Hint=false · Show Prefix=false · Show Suffix=false |
| Toggle |  · State=Active |
| Tooltip | Info Icon Tooltip · Direction=bottom-right |
| Avatar | Avatar Image · radius-full |

---

## Component Hierarchy & Build Order

```
Level 1a — _base Table header cell  [COMPONENT — single, no variants]
Level 1b — _base Table cell         [COMPONENT_SET — 7 type variants]
Level 2a — _base Pagination         [COMPONENT_SET — 6 state variants]
Level 2b — Pagination               [COMPONENT — single, full bar]
```

**Build order:** `_base Table header cell` + `_base Table cell` (parallel) → `_base Pagination` → `Pagination`

---

## 1. `_base Table header cell`

### Node
`8113:14973` — single **COMPONENT** (no variants, no variant property)

### Component Properties

| Property | Type | Default | Controls |
|---|---|---|---|
| `Sort#193:0` | BOOLEAN | `true` | Sort icon visibility |
| `Show Checkbox#637:0` | BOOLEAN | `true` | Checkbox instance visibility |

### Structure

```
_base Table header cell            [COMPONENT · FIXED(131px) × HUG · Horizontal AL · Center VA]
  Padding L/R: spacing-4xl (20px)
  Padding T/B: spacing-lg (10px)
  Gap:         spacing-md (8px) — use local variable (replace external)
  Fill:        Background/bg-secondary
  Stroke:      Border/border-primary · 1px inside
  │
  ├── Checkbox                     [INSTANCE · Checkbox component]
  │     Checked: Enabled · Label: false
  │     Visible: Show Checkbox boolean
  │     (Use existing Checkbox component — do not recreate)
  │
  └── Title                        [FRAME · FILL × FIXED(20px) · Horizontal AL · Center VA · layoutGrow=1]
        Gap: spacing-xs (4px)
        ├── Table header           [FRAME · HUG × HUG · Horizontal AL · Center VA · gap spacing-xs]
        │     └── Text             [TEXT · HUG × HUG]
        │           Style: Label sm/Medium
        │           Font:  Inter · Medium 500 · 12px · 16px LH
        │           Fill:  Text/text-secondary
        │           Content: "Email" (default — replace per column)
        └── Icon                   [INSTANCE · Icon · Size=14px · Sort icon]
              Color: override VECTOR stroke → Icon/icon-primary
              Visible: Sort boolean
              Default icon: sort / up-down arrows
```

### Variable Attachment — `_base Table header cell`

| Target | Property | Variable |
|---|---|---|
| Outer frame | Fill | `Background/bg-secondary` |
| Outer frame | Stroke | `Border/border-primary` |
| Outer frame | Stroke weight | 1px (hardcoded) |
| Outer frame | Padding L/R | `spacing-4xl` |
| Outer frame | Padding T/B | `spacing-lg` |
| Outer frame | Gap | `spacing-md` |
| `Title` | Gap | `spacing-xs` |
| `Table header` | Gap | `spacing-xs` |
| `Text` | Text Style | `Label sm/Medium` |
| `Text` | Fill | `Text/text-secondary` |
| Sort `Icon` VECTOR | Stroke | `Icon/icon-primary` |

---

## 2. `_base Table cell`

### Node
`8113:14939` — **COMPONENT_SET** with 7 type variants

### Variant Properties

| Property | Type | Options |
|---|---|---|
| `Type` | VARIANT | `Two line` · `Edit Cell` · `Action` · `Status` · `Tooltip` · `Default` · `Toggle` |
| `Edit#8113:0` | BOOLEAN | `true` | Edit icon button |
| `Button 1#8113:10` | BOOLEAN | `true` | First action button |
| `Button 2#8113:20` | BOOLEAN | `true` | Second action button |
| `Delete#8113:30` | BOOLEAN | `true` | Delete icon button |
| `More#8113:40` | BOOLEAN | `true` | More icon button |
| `Avatar#8113:50` | BOOLEAN | `true` | Avatar image |
| `Checkbox#8113:57` | BOOLEAN | `true` | Checkbox |

### Common Properties (all 7 variants)

| Property | Value |
|---|---|
| Width | FIXED 340px |
| Height | FIXED 60px |
| Layout | Horizontal AL · Center VA |
| Fill | `Background/bg-primary` |
| Stroke | `Border/border-primary` · 1px · **bottom side only** — never apply border to all four sides |
| Padding L/R | `spacing-4xl` (20px) |
| Padding T/B | `spacing-none` (0px) |

### Structure Per Type

#### `Type=Two line`

```
Type=Two line                      [Vertical AL · Center main axis]
  Gap: 2px (external library variable — use spacing-xxs locally)
  │
  ├── Text                         [FILL × HUG · Body sm/Medium · Text/text-primary]
  │     Truncation: ENDING · maxLines: 1
  │
  └── Text                         [FILL × HUG · Label sm/Medium · Text/text-secondary]
        Truncation: ENDING · maxLines: 1
```

#### `Type=Status`

```
Type=Status                        [Horizontal AL · Center VA]
  Gap: external library variable
  │
  └── Frame 164584                 [HUG × FIXED(28px) · Horizontal AL · Center · gap spacing-xs]
        (up to 4 Badge instances — 5th hidden)
        ├── Badge [INSTANCE · Type=Filled · Color=Primary]  ← Use existing Badge component
        ├── Badge [INSTANCE · Type=Filled · Color=Primary]
        ├── Badge [INSTANCE · Type=Filled · Color=Primary]
        └── Badge [INSTANCE · Type=Filled · Color=Primary]
```

#### `Type=Action`

```
Type=Action                        [Horizontal AL · Center VA]
  Gap: external library variable
  │
  ├── Button (Edit)    [INSTANCE · Size=Small · Type=Icon Secondary · Visible: Edit boolean]
  │     Icon: Icon > 16px > edit  (override the button's inner icon instance to the Edit icon)
  ├── Button (Btn 1)   [INSTANCE · Size=Small · Type=Bordered · Text="Button" · Visible: Button 1 boolean]
  ├── Button (Btn 2)   [INSTANCE · Size=Small · Type=Bordered · Text="Button" · Visible: Button 2 boolean]
  ├── Button (Delete)  [INSTANCE · Size=Small · Type=Icon Secondary · Visible: Delete boolean]
  │     Icon: Icon > 16px > trash  (override the button's inner icon instance to the Trash icon)
  └── Button (More)    [INSTANCE · Size=Small · Type=Icon Secondary · Visible: More boolean]
        Icon: Icon > 16px > dots-vertical  (override the button's inner icon instance to the Dots Vertical icon)
  (All use existing Button component — do not recreate)
```

#### `Type=Edit Cell`

```
Type=Edit Cell                     [Horizontal AL · Center VA]
  │
  └── Input Field                  [INSTANCE · State=Enabled · layoutGrow=1]
        Show Label: false  ← must be disabled; never show label text
        Show Hint:  false  ← must be disabled; never show hint/helper text
        Show Prefix: false
        Show Suffix: false  ← no icon on either side; plain text input only
        (Use existing Input Field component — do not recreate)
```

#### `Type=Tooltip`

```
Type=Tooltip                       [Horizontal AL · Center VA]
  Gap: external library variable
  │
  ├── Text                         [FILL × FIXED(44px) · Horizontal AL · Center VA · layoutGrow=1]
  │     └── Text                   [FILL × HUG · Body sm/Medium · Text/text-primary]
  │           Truncation: ENDING · maxLines: 2
  │
  └── Info Icon Tooltip            [INSTANCE · Direction=bottom-right · Tooltip=false]
        Icon: Icon > 20px > info  (the trigger icon must be the Info icon at 20px — do not substitute)
        (Use existing Tooltip component — do not recreate)
```

#### `Type=Toggle`

```
Type=Toggle                        [Horizontal AL · Center VA]
  │
  └── _base Toggle Switch          [INSTANCE · State=Active]
        Track fill: Background/bg-brand_secondary (orange)
        (Use existing Toggle component — do not recreate)
```

#### `Type=Default`

```
Type=Default                       [Horizontal AL · Center VA]
  Gap: external library variable
  │
  ├── Checkbox                     [INSTANCE · Checked=Enabled · Label=false · Visible: Checkbox boolean]
  │     (Use existing Checkbox component — do not recreate)
  │
  ├── Avatar Image                 [INSTANCE · 36×36px · radius-full · Visible: Avatar boolean]
  │     (Use existing Avatar Image component — do not recreate)
  │
  └── Text                         [FILL × FIXED(44px) · Horizontal AL · Center VA · layoutGrow=1]
        └── Text                   [FILL × HUG · Body sm/Medium · Text/text-primary]
              Truncation: ENDING · maxLines: 2
```

### Variable Attachment — `_base Table cell`

| Target | Property | Variable |
|---|---|---|
| All variants | Fill | `Background/bg-primary` |
| All variants | Stroke | `Border/border-primary` · 1px inside |
| All variants | Padding L/R | `spacing-4xl` |
| All variants | Padding T/B | `spacing-none` |
| All variants gap | Gap | `spacing-md` (replace external variable) |
| Two line gap | Inner gap | `spacing-xxs` (replace external variable) |
| Status `Frame 164584` | Gap | `spacing-xs` |
| Primary `Text` | Text Style | `Body sm/Medium` |
| Primary `Text` | Fill | `Text/text-primary` |
| Secondary `Text` | Text Style | `Label sm/Medium` |
| Secondary `Text` | Fill | `Text/text-secondary` |

---

## 3. `_base Pagination`

### Node
`8113:14982` — **COMPONENT_SET** with 6 state variants

### Variant Properties

| Property | Type | Options |
|---|---|---|
| `Property 1` | VARIANT | `Default` · `Hover` · `active` · `Page` · `Previous` · `Next` |

### Structure (all variants)

All variants: **34×34px FIXED · radius-full (circle)** · contains inner `Content` frame (34×34px · Center both)

```
_base Pagination                   [COMPONENT · 34×34px FIXED · radius-full]
  Clips content: true
  │
  └── Content                      [FRAME · 34×34px FIXED · Horizontal AL · Center both]
        Corner radius: radius-md (8px) — replace external variable locally
```

### Color Per Variant

| Variant | Fill | Stroke | Inner Content |
|---|---|---|---|
| `Default` | `Background/bg-primary` | None | `Number` text · `Body sm/Medium` · `Text/text-primary` |
| `Hover` | `Background/bg-brand_light` | None | `Number` text · `Body sm/Medium` · `Text/text-primary` |
| `active` | `Background/bg-brand` | None | `Number` text · `Body sm/Medium` · **`Text/text-white`** |
| `Page` | `Background/bg-primary` | None | 3× dot ELLIPSEs (3.6px · fill = `Icon/icon-primary`) |
| `Previous` | `Background/bg-primary` | `Border/border-primary` · 1px **inside** | Icon 20px · left arrow |
| `Next` | `Background/bg-primary` | `Border/border-primary` · 1px **inside** | Icon 20px · right arrow |

### Structure Per Variant

#### `Default` / `Hover`

```
Content                            [34×34 · Center both]
  └── Number                       [TEXT · HUG × HUG · CENTER align]
        Style: Body sm/Medium · 14px · 500 · 18px LH
        Fill:  Text/text-primary
        Content: page number ("1", "2", etc.)
```

#### `active`

```
Content                            [34×34 · Center both]
  └── Number                       [TEXT · HUG × HUG · CENTER align]
        Style: Body sm/Medium · 14px · 500 · 18px LH
        Fill:  Text/text-white
```

#### `Page` (ellipsis)

```
Content                            [34×34 · Center both]
  └── Frame 163591                 [HUG × HUG · Horizontal AL · Center · gap 3.6px]
        ├── Ellipse 299            [3.6×3.6px · Fill: Icon/icon-primary]
        ├── Ellipse 300            [3.6×3.6px · Fill: Icon/icon-primary]
        └── Ellipse 301            [3.6×3.6px · Fill: Icon/icon-primary]
```

#### `Previous` / `Next`

```
Content                            [34×34 · Center both]
  └── Icon                         [INSTANCE · Icon · Size=20px]
        Previous: Icon > 20px > chevron-left  — always use chevron-left; do not substitute
        Next:     Icon > 20px > chevron-right — always use chevron-right; do not substitute
        Color:    override VECTOR stroke → Icon/icon-primary
```

### Variable Attachment — `_base Pagination`

| Target | Property | Variable |
|---|---|---|
| Outer frame (all) | Corner radius (all 4) | `radius-full` |
| `Default` fill | Fill | `Background/bg-primary` |
| `Hover` fill | Fill | `Background/bg-brand_light` |
| `active` fill | Fill | `Background/bg-brand` |
| `Previous` / `Next` fill | Fill | `Background/bg-primary` |
| `Previous` / `Next` stroke | Stroke | `Border/border-primary` · **1px inside** |
| `Number` (Default/Hover) | Fill | `Text/text-primary` |
| `Number` (active) | Fill | `Text/text-white` |
| `Number` | Text Style | `Body sm/Medium` |
| Dot ELLIPSEs (Page) | Fill | `Icon/icon-primary` |
| `Content` corner radius | `radius-md` (8px) | Replace external variable locally |

---

## 4. `Pagination`

### Node
`8113:19404` — single **COMPONENT** (no variants)

### Structure

```
Pagination                         [COMPONENT · FIXED(1280px) × HUG · Horizontal AL · Center both]
  Padding L/R: spacing-4xl (20px)
  Padding T/B: spacing-xl (12px)
  Gap:         spacing-5xl (24px)
  Fill:        Background/bg-primary
  Stroke:      Border/border-primary · 1px **inside**
  │
  ├── Frame 2087325205             [FILL × HUG · Horizontal AL · Center VA · gap spacing-xs · layoutGrow=1]
  │     ├── Total Rows:            [TEXT · HUG × HUG]
  │     │     Style: Body sm/Medium · Fill: Text/text-primary
  │     │     Content: "Total Rows:"
  │     └── 340                    [TEXT · HUG × HUG]
  │           Style: Body sm/Semi Bold · Fill: Text/text-primary
  │           Content: "340" (row count — dynamic)
  │
  ├── No. Rows                     [FRAME · HUG × HUG · Horizontal AL · Center VA · gap spacing-md]
  │     ├── Text                   [HUG × HUG · Body sm/Medium · Text/text-primary · "No. of Rows"]
  │     └── Input                  [FRAME · FIXED(80px) × HUG · Horizontal AL · Center VA]
  │           Padding L/R: spacing-xl (12px) · Padding T/B: spacing-md (8px)
  │           Fill:   Background/bg-primary
  │           Stroke: Border/border-primary · 1px inside
  │           Radius: radius-md (8px) — replace external variable locally
  │           Shadow: DROP_SHADOW · offset(0,1) · radius 2 · rgba(6%,9%,15%,5%)
  │           ├── Text "10"        [FILL × HUG · Body sm/Medium · Text/text-primary]
  │           └── Icon             [INSTANCE · 20px · chevron/dropdown icon]
  │
  └── Pagination numbers           [FRAME · HUG × HUG · Horizontal AL · gap spacing-md]
        ├── _base Pagination       [Property 1=Previous]
        ├── _base Pagination       [Property 1=active]   — currently active page
        ├── _base Pagination       [Property 1=Default]  — page 2
        ├── _base Pagination       [Property 1=Default]  — page 3
        ├── _base Pagination       [Property 1=Page]     — ellipsis (...)
        ├── _base Pagination       [Property 1=Default]  — page 8
        ├── _base Pagination       [Property 1=Default]  — page 9
        ├── _base Pagination       [Property 1=Default]  — page 10
        └── _base Pagination       [Property 1=Next]
```

### Variable Attachment — `Pagination`

| Target | Property | Variable |
|---|---|---|
| Outer frame | Fill | `Background/bg-primary` |
| Outer frame | Stroke | `Border/border-primary` · **1px inside** |
| Outer frame | Padding L/R | `spacing-4xl` |
| Outer frame | Padding T/B | `spacing-xl` |
| Outer frame | Gap | `spacing-5xl` |
| `Frame 2087325205` | Gap | `spacing-xs` |
| "Total Rows:" | Text Style | `Body sm/Medium` |
| "Total Rows:" | Fill | `Text/text-primary` |
| Row count ("340") | Text Style | `Body sm/Semi Bold` |
| Row count ("340") | Fill | `Text/text-primary` |
| `No. Rows` | Gap | `spacing-md` |
| "No. of Rows" | Text Style | `Body sm/Medium` |
| "No. of Rows" | Fill | `Text/text-primary` |
| `Input` | Fill | `Background/bg-primary` |
| `Input` | Stroke | `Border/border-primary` · 1px inside |
| `Input` | Padding L/R | `spacing-xl` |
| `Input` | Padding T/B | `spacing-md` |
| `Input` | Corner radius | `radius-md` (replace external variable) |
| Input "10" text | Text Style | `Body sm/Medium` |
| Input "10" text | Fill | `Text/text-primary` |
| `Pagination numbers` | Gap | `spacing-md` |

---

## Typography Summary

All text styles confirmed from Figma style IDs:

| Layer | Style ID | Style Name | Size | Weight |
|---|---|---|---|---|
| Header `Text` | `8077:7073` | `Label sm/Medium` | 12px | 500 |
| Cell primary text | `4:288` | `Body sm/Medium` | 14px | 500 |
| Cell secondary text | `8077:7073` | `Label sm/Medium` | 12px | 500 |
| Pagination `Number` | `4:288` | `Body sm/Medium` | 14px | 500 |
| Pagination row count | `2008:51662` | `Body sm/Semi Bold` | 14px | 600 |
| Pagination "Total Rows:" | `4:288` | `Body sm/Medium` | 14px | 500 |
| Pagination "No. of Rows" | `4:288` | `Body sm/Medium` | 14px | 500 |

---

## Figma Construction Guide

### Step 1 — Build `_base Table header cell`

1. Create a **Frame**. Name it `_base Table header cell`.
2. **Horizontal AL · FIXED(131px) × HUG · Center VA**.
3. Bind padding L/R → `spacing-4xl`. Bind padding T/B → `spacing-lg`. Bind gap → `spacing-md`.
4. Bind fill → `Background/bg-secondary`. Add stroke 1px inside → `Border/border-primary`.
5. Convert to **Component**.
6. Create Boolean `Show Checkbox` (default: `true`). Create Boolean `Sort` (default: `true`).

> ⚠️ This is a **single COMPONENT — not a Component Set**. Do not add variant properties.

#### Checkbox
1. Place an instance of the **existing Checkbox component** inside. Set `Label=false`, `Checked=Enabled`.
2. Link visibility to `Show Checkbox` Boolean.

#### Title frame
1. Add a **Frame**. Name it `Title`. **Horizontal AL · FILL × FIXED(20px) · Center VA · layoutGrow=1**. Bind gap → `spacing-xs`.
2. Inside Title, add a **Frame** named `Table header`. **Horizontal AL · HUG × HUG · Center VA**. Bind gap → `spacing-xs`.
3. Inside `Table header`, add a `Text` layer: style `Label sm/Medium` · fill `Text/text-secondary` · HUG × HUG.
4. Inside `Title`, add an **Icon component** instance (Size=14px) as the sort indicator. Override VECTOR stroke → `Icon/icon-primary`. Link visibility to `Sort` Boolean.

### Step 2 — Build `_base Table cell` — `Type=Two line`

1. Create a **Frame**. Name it `Type=Two line`. **Vertical AL · FIXED(340) × FIXED(60px) · Center main axis**.
2. Bind padding L/R → `spacing-4xl`. Bind padding T/B → `spacing-none`. Bind gap → `spacing-xxs`.
3. Bind fill → `Background/bg-primary`. Add stroke 1px inside → `Border/border-primary`.
4. Add primary `Text` layer: style `Body sm/Medium` · fill `Text/text-primary` · FILL × HUG · truncation ENDING · maxLines=1.
5. Add secondary `Text` layer: style `Label sm/Medium` · fill `Text/text-secondary` · FILL × HUG · truncation ENDING · maxLines=1.
6. Convert to **Component**.

### Step 3 — Build Remaining `_base Table cell` Variants

#### `Type=Status`
1. Create FIXED(340) × FIXED(60px) frame, Horizontal AL, Center VA, same fill/stroke/padding.
2. Bind gap → `spacing-md`.
3. Add `Frame 164584` (HUG × FIXED(28px) · Horizontal AL · Center · gap spacing-xs).
4. Inside, place **Badge component** instances (Type=Filled, Color=Primary). Default: 4 visible badges.

#### `Type=Action`
1. Same base frame, Horizontal AL, Center VA, gap `spacing-md`.
2. Place 5 **Button component** instances:
   - Edit: Size=Small · Type=Icon Secondary · Icon > 16px > edit · link visibility to `Edit` Boolean
   - Button 1: Size=Small · Type=Bordered · Text="Button" · link visibility to `Button 1` Boolean
   - Button 2: Size=Small · Type=Bordered · Text="Button" · link visibility to `Button 2` Boolean
   - Delete: Size=Small · Type=Icon Secondary · Icon > 16px > trash · link visibility to `Delete` Boolean
   - More: Size=Small · Type=Icon Secondary · Icon > 16px > dots-vertical · link visibility to `More` Boolean

#### `Type=Edit Cell`
1. Same base frame, Horizontal AL, Center VA.
2. Place **Input Field component** instance (State=Enabled · Show Label=false · Show Hint=false · Show Prefix=false · Show Suffix=false · no icons on either side). Set layoutGrow=1.

#### `Type=Tooltip`
1. Same base frame, Horizontal AL, Center VA, gap `spacing-md`.
2. Add `Text` frame (FILL × FIXED(44px) · Horizontal AL · Center VA · layoutGrow=1). Inside: `Text` layer Body sm/Medium · Text/text-primary · truncation ENDING · maxLines=2.
3. Place **Info Icon Tooltip** component instance (Direction=bottom-right · Tooltip=false by default). Set trigger icon to Icon > 20px > info.

#### `Type=Toggle`
1. Same base frame, Horizontal AL, Center VA, gap `spacing-md`.
2. Place **`_base Toggle Switch`** component instance (State=Active).

#### `Type=Default`
1. Same base frame, Horizontal AL, Center VA, gap `spacing-md`.
2. Place **Checkbox** component (Label=false · Checked=Enabled). Link visibility to `Checkbox` Boolean.
3. Place **Avatar Image** component (36×36px, radius-full). Link visibility to `Avatar` Boolean.
4. Add `Text` frame (FILL × FIXED(44px) · Horizontal AL · Center VA · layoutGrow=1). Inside: `Text` layer Body sm/Medium · Text/text-primary · truncation ENDING · maxLines=2.

### Step 4 — Combine into `_base Table cell` Component Set

1. Select all 7 type variants. Combine into **Component Set**. Name it `_base Table cell`.
2. Add property `Type` → `Two line`, `Edit Cell`, `Action`, `Status`, `Tooltip`, `Default`, `Toggle`.
3. Add Boolean properties: `Edit`, `Button 1`, `Button 2`, `Delete`, `More`, `Avatar`, `Checkbox` (all default: `true`).

### Step 5 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all variants.

### Step 6 — Build `_base Pagination` Variants

**`Default` variant:**
1. Create a **Frame** (34×34px FIXED). Bind corner radius all 4 → `radius-full`. Bind fill → `Background/bg-primary`. No stroke. Set clips content = true.
2. Add `Content` frame inside (34×34px · Horizontal AL · Center both). Corner radius = `radius-md` (8px).
3. Inside Content, add `Number` TEXT: style `Body sm/Medium` · fill `Text/text-primary` · HUG × HUG · CENTER align.
4. Convert to Component.

**`Hover`:** Duplicate Default. Change fill → `Background/bg-brand_light`.

**`active`:** Duplicate Default. Change fill → `Background/bg-brand`. Change Number fill → `Text/text-white`.

**`Page` (ellipsis):**
1. Duplicate Default. Remove `Number` text.
2. Add `Frame 163591` inside Content (HUG × HUG · Horizontal AL · Center · gap 3.6px).
3. Inside, add 3 ELLIPSEs (3.6×3.6px each). Bind each fill → `Icon/icon-primary`.

**`Previous`:**
1. Duplicate Default. Add stroke 1px **inside** → `Border/border-primary`. Remove Number text.
2. Place **Icon component** (Size=20px · Icon > 20px > chevron-left) inside Content. Override VECTOR stroke → `Icon/icon-primary`.

**`Next`:** Duplicate Previous. Change icon to Icon > 20px > chevron-right.

### Step 7 — Combine into `_base Pagination` Component Set

1. Select all 6 variants. Combine into **Component Set**. Name it `_base Pagination`.
2. Add property `Property 1` → `Default`, `Hover`, `active`, `Page`, `Previous`, `Next`.

### Step 8 — Build `Pagination`

1. Create a **Frame**. Name it `Pagination`. **Horizontal AL · FIXED(1280px) × HUG · Center both**.
2. Bind padding L/R → `spacing-4xl`. Bind padding T/B → `spacing-xl`. Bind gap → `spacing-5xl`.
3. Bind fill → `Background/bg-primary`. Add stroke 1px **inside** → `Border/border-primary`.
4. Convert to **Component**.

#### Frame 2087325205 (left — row count display)
1. Frame (FILL × HUG · Horizontal AL · Center VA · gap spacing-xs · layoutGrow=1).
2. Add "Total Rows:" TEXT: style `Body sm/Medium` · fill `Text/text-primary`.
3. Add "340" TEXT: style `Body sm/Semi Bold` · fill `Text/text-primary`.

#### No. Rows (row size picker)
1. Frame (HUG × HUG · Horizontal AL · Center VA · gap spacing-md).
2. Add "No. of Rows" TEXT: style `Body sm/Medium` · fill `Text/text-primary`.
3. Add `Input` frame (FIXED 80px × HUG · Horizontal AL · Center VA):
   - Bind padding L/R → `spacing-xl`. Bind padding T/B → `spacing-md`.
   - Bind fill → `Background/bg-primary`. Add stroke 1px inside → `Border/border-primary`.
   - Bind corner radius all 4 → `radius-md` (8px).
   - Add DROP_SHADOW: offset(0,1) · radius 2 · rgba(6%,9%,15%,5%).
   - Add "10" TEXT: style `Body sm/Medium` · fill `Text/text-primary` · FILL × HUG · layoutGrow=1.
   - Add Icon component (Size=20px · Icon > 20px > chevron-down — always use chevron-down; do not substitute).

#### Pagination numbers
1. Frame (HUG × HUG · Horizontal AL · gap spacing-md).
2. Place 9 `_base Pagination` instances in this exact order:
   - Previous → active (page 1) → Default (2) → Default (3) → Page (dots) → Default (8) → Default (9) → Default (10) → Next

---

## Mandatory Rules

- **ALWAYS use existing components** — never recreate Checkbox, Button, Badge, Input, Toggle, Tooltip, or Avatar inline. Place instances only.
- **`_base Table header cell` is a single COMPONENT** — no variants, no `Property 1` variant property.
- **Checkbox Label must always be disabled** — set `Label=false` on every Checkbox instance throughout the system. Never show label text next to a checkbox in any table context.
- **Border is bottom-only on all table row cells and the Pagination bar** — apply `Border/border-primary · 1px` to the bottom side only. Never apply stroke to all four sides.
- **Action variant icon assignments are fixed** — always override the inner icon on each button instance as follows: Edit button → `Icon > 16px > edit`; Delete button → `Icon > 16px > trash`; More button → `Icon > 16px > dots-vertical`. Do not use any other icons for these buttons.
- **Edit Cell Input must have no label, no hint text, and no prefix/suffix icons** — set `Show Label=false`, `Show Hint=false`, `Show Prefix=false`, `Show Suffix=false`. Plain text input only.
- **Info Icon Tooltip trigger icon is fixed** — always use `Icon > 20px > info`. Do not substitute with any other icon.
- **Pagination Previous/Next icons are fixed** — Previous must use `Icon > 20px > chevron-left`; Next must use `Icon > 20px > chevron-right`. Do not use arrow or other directional icons.
- **Pagination Input dropdown icon is fixed** — always use `Icon > 20px > chevron-down`. Do not substitute.
- **Pagination stroke is `1px inside`** — strokeAlign = INSIDE, same as all other components in the system.
- **"Total Rows:" and "340" fill = `Text/text-primary`** — never hardcoded #000000.
- **`Page` variant dots fill = `Icon/icon-primary`** — 3 ellipses, each 3.6×3.6px.
- **Sort icon VECTOR stroke = `Icon/icon-primary`** in the header cell.
- **Text style only — no individual font variable bindings.**
- **Expose nested properties** on all `_base Table cell` variants.
- **Replace external library variables** with local equivalents: `spacing-md` for gaps, `radius-md` for Content/Input radii, `spacing-xxs` for Two line inner gap.
- **Pagination `active` uses `Background/bg-brand`** (blue, not orange) — this is the brand primary color.

---

## Flags

### ⚠️ External library variables to replace
Multiple frames use external library variable IDs for gap and corner radius. When rebuilding, use these local variables:

| Original use | Local replacement |
|---|---|
| `_base Table cell` gap | `spacing-md` (8px) |
| `_base Table cell` Two line gap | `spacing-xxs` (2px) |
| `_base Table header cell` gap | `spacing-md` (8px) |
| `_base Pagination` Content corner radius | `radius-md` (8px) |
| `Pagination` No. Rows gap | `spacing-md` (8px) |
| `Pagination` Input corner radius | `radius-md` (8px) |

---

## Figma Component Page — Arrangement

```
┌──────────────────────────────────────────────────────────────┐
│  TABLE COMPONENT SYSTEM            ← small caps label        │
│  Table                             ← large bold title        │
│  _base Table header cell · _base Table cell (7 types)        │
│  _base Pagination (6 states) · Pagination bar                │
│  ──────────────────────────────────  ← divider               │
│                                                               │
│  ▌ _base Table header cell                                   │
│    Single component · Sort · Show Checkbox                    │
│    [ actual _base Table header cell COMPONENT ]               │
│                                                               │
│  ▌ _base Table cell — 7 Types                                │
│    Two line · Edit Cell · Action · Status · Tooltip           │
│    Default · Toggle                                           │
│    [ actual _base Table cell COMPONENT_SET ]                  │
│                                                               │
│  ▌ _base Pagination — 6 Variants                             │
│    Default · Hover · active · Page · Previous · Next          │
│    [ actual _base Pagination COMPONENT_SET ]                  │
│                                                               │
│  ▌ Pagination — Full Bar                                     │
│    1280px · Total Rows · No. of Rows input · Page numbers     │
│    [ actual Pagination COMPONENT ]                            │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```