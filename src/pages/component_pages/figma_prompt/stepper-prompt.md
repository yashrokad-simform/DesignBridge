# Stepper

## Overview

| Property | Value |
|---|---|
| System Name | Stepper |
| Components | `_base Step Icon` · `_base Step` · `Stepper` |
| Node — `_base Step Icon` | `411:8684` |
| Node — `_base Step` | `411:8794` |
| Node — `Stepper` | `411:9559` |
| `_base Step Icon` Variants | 6 (State × Size) |
| `_base Step` Variants | 6 (Size × State) |
| `Stepper` Variants | 2 (Size) |

> ### ⚠️ Critical Requirement — Expose Nested Instance Properties
>
> The main **`Stepper`** component (every variant) **MUST** have **all** properties from its nested **`_base Step`** instance exposed onto it. In Figma: select the main component/variant → **Properties** panel → **"Expose properties from → Nested instances"**. Without this, the `_base Step` properties stay buried inside the nested instance and designers cannot access them from the main component. This applies to **every** variant — see the dedicated "Expose Nested Instance Properties" step below for details.
>
> Likewise, the **`_base Step`** component (every variant) **MUST** expose **all** properties from its nested **`_base Step Icon`** instance, so the full chain (`_base Step Icon` → `_base Step` → `Stepper`) remains accessible from the top.

A three-level vertical step progress indicator. `_base Step Icon` renders the state circle. `_base Step` composes the icon with label text and a connector line. `Stepper` assembles a complete 5-step sequence.

---

## Component Hierarchy & Build Order

```
Level 1 — _base Step Icon          [COMPONENT_SET]
  ├── State=Incomplete, Size=Regular
  ├── State=Incomplete, Size=Large
  ├── State=Current,    Size=Regular
  ├── State=Current,    Size=Large
  ├── State=Completed,  Size=Regular
  └── State=Completed,  Size=Large

Level 2 — _base Step               [COMPONENT_SET]
  ├── Size=Regular, State=Incomplete
  ├── Size=Regular, State=Current
  ├── Size=Regular, State=Completed
  ├── Size=Large,   State=Incomplete
  ├── Size=Large,   State=Current
  └── Size=Large,   State=Completed

Level 3 — Stepper                  [COMPONENT_SET]
  ├── Size=Regular
  └── Size=Large
```

> **Build order is mandatory.** `_base Step Icon` must exist before `_base Step`. `_base Step` must exist before `Stepper`.

---

## 1. `_base Step Icon`

### Variant Properties

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Incomplete` · `Current` · `Completed` |
| `Size` | VARIANT | `Regular` · `Large` |

### Sizes

| Property | Regular | Large |
|---|---|---|
| Outer frame | 24×24px (FIXED) | 32×32px (FIXED) |
| Corner radius | `radius-full` | `radius-full` |
| Auto Layout | Horizontal · Center both | Horizontal · Center both |
| Dot (Incomplete) | 8×8px ELLIPSE | 12×12px ELLIPSE |
| Loading SVG (Current) | 12×12px | 16×16px |
| Check icon (Completed) | Size=16px | Size=20px |

### Structure Per State

#### `State=Incomplete`

```
State=Incomplete, Size=Regular     [COMPONENT · 24×24px · Horizontal AL · Center both]
  Fill:   Background/bg-primary (white)
  Stroke: Border/border-primary · 1.5px inside
  Radius: radius-full (all corners)
  └── Dot                          [ELLIPSE · 8×8px (R) / 12×12px (L)]
        Fill: Background/bg-brand_light (light blue)
        No stroke
```

#### `State=Current`

```
State=Current, Size=Regular        [COMPONENT · 24×24px · Horizontal AL · Center both]
  Fill:   Background/bg-brand_secondary_light (light orange)
  Stroke: Border/border-secondary · 1px inside
  Radius: radius-full (all corners)
  └── Loading indicator            [SVG · 12×12px (R) / 16×16px (L)]
        Inline SVG — a circular loading/spinner ring
        Not a component instance — placed as a flattened SVG shape
        Color: matches the Current stroke color (Border/border-secondary orange)
```

> The loading indicator for the Current state is an **inline SVG** — a partial circular ring that visually indicates the active/in-progress state. It is not an Icon component instance and has no vuesax/linear path. Place it as a static SVG vector inside the icon frame, centered, at the sizes above.

#### `State=Completed`

```
State=Completed, Size=Regular      [COMPONENT · 24×24px · Horizontal AL · Center both]
  Fill:   Status/success-bg (green)
  Stroke: None
  Radius: radius-full (all corners)
  └── Icon                         [INSTANCE · Icon component · Size=16px (R) / 20px (L)]
        Default icon: check (Arrow/linear/Check)
        Color: override Icon VECTOR stroke → Status/text-white (white)
```

> The check icon (`Arrow/linear/Check`) uses the same Icon component as the rest of the design system. Override the VECTOR **stroke** → `Status/text-white`. The fill is hidden. Path: `Icon [INSTANCE] → 16px [COMPONENT] → check [COMPONENT] → Icon [VECTOR]`.

### Color Variables Per State

| State | Fill | Stroke | Stroke weight | Child color |
|---|---|---|---|---|
| `Incomplete` | `Background/bg-primary` | `Border/border-primary` | 1.5px inside | `Dot` fill = `Background/bg-brand_light` |
| `Current` | `Background/bg-brand_secondary_light` | `Border/border-secondary` | 1px inside | Loading SVG = `Border/border-secondary` |
| `Completed` | `Status/success-bg` | None | — | Check VECTOR stroke = `Status/text-white` |

### Variable Attachment

| Layer | Property | Variable |
|---|---|---|
| Outer frame (all states) | Corner radius (all 4) | `radius-full` |
| Incomplete frame | Fill | `Background/bg-primary` |
| Incomplete frame | Stroke | `Border/border-primary` |
| Incomplete `Dot` | Fill | `Background/bg-brand_light` |
| Current frame | Fill | `Background/bg-brand_secondary_light` |
| Current frame | Stroke | `Border/border-secondary` |
| Completed frame | Fill | `Status/success-bg` |
| Check `Icon` VECTOR | Stroke | `Status/text-white` |

---

## 2. `_base Step`

### Variant Properties

| Property | Type | Default | Purpose |
|---|---|---|---|
| `Size` | VARIANT | `Regular` | Switches between Regular and Large sizing |
| `State` | VARIANT | `Incomplete` | Incomplete · Current · Completed |
| `Show Connecter#411:80` | BOOLEAN | `true` | Shows/hides the vertical connector line below the icon |
<!-- IF_CAPTION -->
| `Show Caption#8173:0` | BOOLEAN | `true` | Shows/hides the `Supporting text` caption |
<!-- /IF_CAPTION -->

### Sizes

| Property | Regular | Large |
|---|---|---|
| Width | FIXED 344px | FIXED 344px |
| Height | HUG | HUG |
| Outer gap (icon ↔ text) | `spacing-md` (8px) | `spacing-xl` (12px) |
| Text stack paddingTop | `spacing-xxs` (2px) | `spacing-xs` (4px) |
| Text stack paddingBottom | `spacing-4xl` | `spacing-5xl` |
| Text stack gap (title ↔ caption) | `spacing-xs` (4px) | `spacing-xxs` (2px) |
| Connector line height | 28px (FIXED) | 64px (FIXED) |

### Structure

```
_base Step                         [COMPONENT · Horizontal AL · FIXED(344px) × HUG]
  Gap: spacing-md (Regular) · spacing-xl (Large)
  No fill · No stroke
  │
  ├── Connector wrap               [FRAME · HUG × FILL (R) · HUG × HUG (L) · Vertical AL · Center]
  │     No fill
  │     Gap: local spacing variable (replace external library variable)
  │     Padding Bottom: same local spacing variable
  │     │
  │     ├── _base Step Icon        [INSTANCE]
  │     │     Size: Regular (24px) or Large (32px)
  │     │     State: matches parent variant state
  │     │
  │     └── Connector              [FRAME · FIXED(2px) × FIXED(28px R / 64px L)]
  │           No fill · No stroke
  │           Visible: Show Connecter boolean
  │           └── Connector        [RECTANGLE · 2px wide × full height]
  │                 Fill:   see color table per state
  │                 Radius: radius-full (all corners)
  │
  └── Text and supporting text     [FRAME · FILL × HUG · Vertical AL · layoutGrow=1]
        Padding Top:    spacing-xxs (R) · spacing-xs (L)
        Padding Bottom: spacing-4xl (R) · spacing-5xl (L)
        Gap:            spacing-xs (R) · spacing-xxs (L)
        No fill
        │
        ├── Text                   [TEXT · FILL × HUG]
        │     Style and fill: vary per state and size (see tables below)
        │
<!-- IF_CAPTION -->
        └── Supporting text        [TEXT · FILL × HUG]
              Style:   Label sm/Medium (Regular) · Body md/Medium (Large)
              Fill:    Text/text-secondary
              Visible: Show Caption boolean
<!-- /IF_CAPTION -->
```

### Connector Line Color Per State

| State | Connector RECTANGLE fill |
|---|---|
| `Incomplete` | `Border/border-primary` (light grey) |
| `Current` | `Border/border-primary` (light grey) |
| `Completed` | `Border/border-success` (green) |

### Text Styles Per State and Size

**Title (`Text` layer):**

| State | Fill | Regular Style | Large Style |
|---|---|---|---|
| `Incomplete` | `Text/text-primary` | `Body sm/Medium` | `Body md/Medium` |
| `Current` | `Text/text-brand_secondary` (orange) | `Body sm/Semi Bold` | `Body md/Semi Bold` |
| `Completed` | `Text/text-success` (green) | `Body sm/Medium` | `Body md/Medium` |

<!-- IF_CAPTION -->
**Caption (`Supporting text` layer):**

| Size | Style | Fill |
|---|---|---|
| Regular | `Label sm/Medium` | `Text/text-secondary` |
| Large | `Body sm/Medium` | `Text/text-secondary` |
<!-- /IF_CAPTION -->

### Variable Attachment — `_base Step`

| Target | Property | Variable |
|---|---|---|
| Outer frame (Regular) | Gap | `spacing-md` |
| Outer frame (Large) | Gap | `spacing-xl` |
| `Connector wrap` | Gap | local spacing variable (see flags) |
| `Connector wrap` | Padding Bottom | local spacing variable (see flags) |
| `Connector` RECTANGLE | Fill | see connector color table per state |
| `Connector` RECTANGLE | Corner radius (all 4) | `radius-full` |
| `Text and supporting text` (R) | Padding Top | `spacing-xxs` |
| `Text and supporting text` (R) | Padding Bottom | `spacing-4xl` |
| `Text and supporting text` (R) | Gap | `spacing-xs` |
| `Text and supporting text` (L) | Padding Top | `spacing-xs` |
| `Text and supporting text` (L) | Padding Bottom | `spacing-5xl` |
| `Text and supporting text` (L) | Gap | `spacing-xxs` |
| `Text` (Incomplete) | Fill | `Text/text-primary` |
| `Text` (Current) | Fill | `Text/text-brand_secondary` |
| `Text` (Completed) | Fill | `Text/text-success` |
| `Text` (Regular — Incomplete/Completed) | Text Style | `Body sm/Medium` |
| `Text` (Regular — Current) | Text Style | `Body sm/Semi Bold` |
| `Text` (Large — Incomplete/Completed) | Text Style | `Body md/Medium` |
| `Text` (Large — Current) | Text Style | `Body md/Semi Bold` |
<!-- IF_CAPTION -->
| `Supporting text` (Regular) | Text Style | `Label sm/Medium` |
| `Supporting text` (Large) | Text Style | `Body sm/Medium` |
| `Supporting text` | Fill | `Text/text-secondary` |
<!-- /IF_CAPTION -->

---

## 3. `Stepper`

### Variant Properties

| Property | Type | Options |
|---|---|---|
| `Size` | VARIANT | `Regular` · `Large` |

### Structure

```
Stepper                            [COMPONENT_SET]
  │
  ├── Size=Regular                 [COMPONENT · Vertical AL · HUG × HUG]
  │     Gap: spacing-md (8px) between steps
  │     │
  │     ├── _base Step [1]         [INSTANCE · Size=Regular · State=Incomplete · Show Connecter=true]
  │     ├── _base Step [2]         [INSTANCE · Size=Regular · State=Incomplete · Show Connecter=true]
  │     ├── _base Step [3]         [INSTANCE · Size=Regular · State=Incomplete · Show Connecter=true]
  │     ├── _base Step [4]         [INSTANCE · Size=Regular · State=Incomplete · Show Connecter=true]
  │     └── _base Step [5]         [INSTANCE · Size=Regular · State=Incomplete · Show Connecter=false]
  │           (last step — no connector below)
  │
  └── Size=Large                   [COMPONENT · Vertical AL · HUG × HUG]
        Gap: spacing-md (8px)
        └── 5× _base Step [INSTANCE · Size=Large · steps 1–4 Show Connecter=true · step 5 false]
```

> ⚠️ **Critical — last step has `Show Connecter=false`.** The last `_base Step` instance (step 5) must have `Show Connecter` set to `false`. All preceding steps (1–4) must have `Show Connecter=true`. This hides the connector line below the final step.

> In actual use, each step's `State` property is overridden to reflect the user's progress: `Completed` for past steps, `Current` for the active step, `Incomplete` for future steps. The Stepper defaults all steps to `Incomplete`.

---

## Typography Summary

| Layer | Style | Font | Used on |
|---|---|---|---|
| `Text` (Regular — Incomplete/Completed) | `Body sm/Medium` | 14px · Medium 500 | Regular inactive/done steps |
| `Text` (Regular — Current) | `Body sm/Semi Bold` | 14px · Semi Bold 600 | Regular active step |
| `Text` (Large — Incomplete/Completed) | `Body md/Medium` | 16px · Medium 500 | Large inactive/done steps |
| `Text` (Large — Current) | `Body md/Semi Bold` | 16px · Semi Bold 600 | Large active step |
<!-- IF_CAPTION -->
| `Supporting text` (Regular) | `Label sm/Medium` | 12px · Medium 500 | Regular caption |
| `Supporting text` (Large) | `Body sm/Medium` | 14px · Medium 500 | Large caption |
<!-- /IF_CAPTION -->

> Apply text styles directly. Do not bind individual font variables.

---

## Figma Construction Guide

### Step 1 — Build `_base Step Icon` — `State=Incomplete`

**Size=Regular:**
1. Create a **Frame**. Name it `State=Incomplete, Size=Regular`.
2. **Horizontal AL · 24×24px FIXED · Center both axes**.
3. Bind fill → `Background/bg-primary`. Add stroke → 1.5px inside. Bind stroke → `Border/border-primary`.
4. Bind corner radius all 4 → `radius-full`. Set clips content = true.
5. Add an **ELLIPSE** inside. Name it `Dot`. Size: **8×8px FIXED**.
6. Bind `Dot` fill → `Background/bg-brand_light`. No stroke.
7. Convert to **Component**.

**Size=Large:**
Duplicate and change:
- Frame size → 32×32px. `Dot` size → 12×12px. All other variables the same.

### Step 2 — Build `_base Step Icon` — `State=Current`

**Size=Regular:**
1. Duplicate `State=Incomplete, Size=Regular`. Rename to `State=Current, Size=Regular`.
2. Change frame fill → `Background/bg-brand_secondary_light`.
3. Change frame stroke → `Border/border-secondary` · 1px.
4. Remove the `Dot` ELLIPSE.
5. Add a **loading indicator SVG** centered inside the frame. Size: **12×12px**.
   - The SVG is a partial circular ring (arc) representing an in-progress/loading state.
   - It is a flat SVG vector — not an Icon component instance.
   - Set the SVG fill or stroke color to match `Border/border-secondary` (orange).

> The loading indicator is a standalone SVG shape. Paste it as a flattened vector directly into the frame. It should visually look like a partial circle arc indicating active progress.

**Size=Large:**
Duplicate and change frame to 32×32px, loading SVG to 16×16px.

### Step 3 — Build `_base Step Icon` — `State=Completed`

**Size=Regular:**
1. Duplicate `State=Incomplete, Size=Regular`. Rename to `State=Completed, Size=Regular`.
2. Change frame fill → `Status/success-bg`.
3. Remove the stroke entirely.
4. Remove the `Dot` ELLIPSE.
5. Place an **Icon component** instance inside. Set `Size` → `16px`. Set icon swap → `check` (`Arrow/linear/Check`).
6. Enter `Icon [INSTANCE] → 16px [COMPONENT] → check [COMPONENT] → Icon [VECTOR]`.
7. Override the VECTOR **stroke** → `Status/text-white`. Do NOT touch the fill.

**Size=Large:**
Duplicate and change frame to 32×32px, Icon size property → `20px`.

### Step 4 — Combine `_base Step Icon` Component Set

1. Select all 6 variants. Combine into **Component Set**. Name it `_base Step Icon`.
2. Properties: `State` → `Incomplete`, `Current`, `Completed`. `Size` → `Regular`, `Large`.

### Step 5 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all 6 variants.

<!-- IF_REGULAR -->
### Step 6 — Build `_base Step` — `Size=Regular, State=Incomplete`

1. Create a **Frame**. Name it `Size=Regular, State=Incomplete`.
2. **Horizontal AL · FIXED(344px) × HUG · Top cross-axis alignment**. No fill.
3. Bind gap → `spacing-md`. Convert to **Component**.

#### Connector wrap
1. Add a **Frame** inside. Name it `Connector wrap`. **Vertical AL · HUG × FILL · Center cross-axis**. No fill.
2. Gap = local spacing variable (4px equivalent — see flags). PaddingBottom = same.
3. Place `_base Step Icon` instance inside: Size=Regular, State=Incomplete.
4. Add a **Frame** below the icon. Name it `Connector`. **FIXED(2px) × FIXED(28px)**.
5. Inside `Connector`, add a **RECTANGLE** named `Connector`. 2×28px.
   - Bind fill → `Border/border-primary` (Incomplete state).
   - Bind corner radius all 4 → `radius-full`.
6. Create **Boolean property**: `Show Connecter` (default: `true`). Link to the `Connector` FRAME visibility.
   - Set the `Connector` FRAME to **absolute position** inside `Connector wrap` so it takes up no space when hidden.

#### Text and supporting text
1. Add a **Frame** inside outer frame. Name it `Text and supporting text`.
2. **Vertical AL · FILL × HUG · layoutGrow=1**.
3. Bind paddingTop → `spacing-xxs`. Bind paddingBottom → `spacing-4xl`. Bind gap → `spacing-xs`.
4. Add `Text` TEXT layer: content "Your details" · style `Body sm/Medium` · fill `Text/text-primary` · FILL × HUG.
<!-- IF_CAPTION -->
5. Add `Supporting text` TEXT layer: content "Please provide your name and email" · style `Label sm/Medium` (Regular) · fill `Text/text-secondary` · FILL × HUG.
6. Create **Boolean property**: `Show Caption` (default: `true`). Link to `Supporting text` visibility.
   - Set `Supporting text` to **absolute position** inside `Text and supporting text` so it takes up no space when hidden.
<!-- /IF_CAPTION -->
<!-- /IF_REGULAR -->

<!-- IF_REGULAR -->
### Step 7 — Build Remaining `_base Step` Regular Variants

#### `Size=Regular, State=Current`
1. Duplicate `Incomplete`. Rename.
2. On `_base Step Icon` instance: change `State` → `Current`.
3. On `Connector` RECTANGLE: fill stays `Border/border-primary`.
4. On `Text`: change fill → `Text/text-brand_secondary`. Change text style → `Body sm/Semi Bold`.

#### `Size=Regular, State=Completed`
1. Duplicate `Incomplete`. Rename.
2. On `_base Step Icon` instance: change `State` → `Completed`.
3. On `Connector` RECTANGLE: change fill → `Border/border-success`.
4. On `Text`: change fill → `Text/text-success`. Text style stays `Body sm/Medium`.
<!-- /IF_REGULAR -->

<!-- IF_LARGE -->
### Step 8 — Build `_base Step` Large Variants

Duplicate each Regular variant and apply:
- Outer frame gap → `spacing-xl`.
- `_base Step Icon` instance `Size` → `Large`.
- `Connector` RECTANGLE height → **64px**.
- `Text and supporting text` paddingTop → `spacing-xs`. paddingBottom → `spacing-5xl`. gap → `spacing-xxs`.
- `Text` style: `Body md/Medium` (Incomplete/Completed) · `Body md/Semi Bold` (Current).
<!-- IF_CAPTION -->
- `Supporting text` style: `Body sm/Medium`.
<!-- /IF_CAPTION -->
<!-- /IF_LARGE -->

### Step 9 — Combine `_base Step` Component Set

1. Select all 6 variants. Combine into **Component Set**. Name it `_base Step`.
2. Properties: `Size` → `Regular`, `Large`. `State` → `Incomplete`, `Current`, `Completed`.
3. Boolean `Show Connecter` (default: `true`).
<!-- IF_CAPTION -->
4. Boolean `Show Caption` (default: `true`).
<!-- /IF_CAPTION -->

### Step 10 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all 6 variants.

### Step 11 — Build `Stepper` Variants

**`Size=Regular`:**
1. Create a **Frame**. Name it `Size=Regular`. **Vertical AL · HUG × HUG**.
2. Bind gap → `spacing-md`.
3. Place **5 instances of `_base Step`** (all Size=Regular, State=Incomplete):
   - Steps 1–4: `Show Connecter = true`
   - Step 5: `Show Connecter = false` ← no connector below last step
4. Convert to **Component**.

**`Size=Large`:**
Duplicate. Change all `_base Step` instances to Size=Large.

### Step 12 — Combine `Stepper` Component Set

1. Select both size variants. Combine into **Component Set**. Name it `Stepper`.
2. Property `Size` → `Regular`, `Large`.

### Step 13 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on both Stepper variants.

---

## Mandatory Rules

- **Build order is mandatory.** `_base Step Icon` → `_base Step` → `Stepper`.
- **`_base Step Icon` corner radius = `radius-full` on all 4 corners** for all 6 variants.
- **Incomplete stroke weight = 1.5px.** Completed has NO stroke. Current stroke = 1px.
- **Current state uses a loading indicator SVG** — not a Group or Icon component instance. It is a flat SVG arc vector placed inside the icon frame.
- **Check icon (Completed) color is on the STROKE** of the innermost `Icon [VECTOR]`, not the fill.
- **`Connector wrap` has NO fill.** Remove any hidden white fill — do not document or bind it.
- **Connector color changes on Completed** — use `Border/border-success` (green). Incomplete and Current both use `Border/border-primary`.
- **Text style changes on Current state** — `Body sm/Semi Bold` (Regular) or `Body md/Semi Bold` (Large). Incomplete and Completed use Medium weight.
- **`Text` fill colors:** Incomplete = `Text/text-primary` · Current = `Text/text-brand_secondary` · Completed = `Text/text-success`.
- **Last step must have `Show Connecter=false`** in the Stepper. Steps 1–4 must have `Show Connecter=true`.
- **`Connector` FRAME must use absolute position** — set it to absolute position inside `Connector wrap` so toggling `Show Connecter` off leaves zero residual space.
<!-- IF_CAPTION -->
- **`Supporting text` must use absolute position** — set it to absolute position inside `Text and supporting text` so toggling `Show Caption` off leaves zero residual space.
<!-- /IF_CAPTION -->
- **Text style only — no individual font variable bindings.**
- **Expose nested properties** on all levels.
- **`spacing-4xl`** for Regular `Text and supporting text` paddingBottom. **`spacing-5xl`** for Large.

---

## Flags

### ⚠️ `Connector wrap` external library variable
The `Connector wrap` gap and paddingBottom are bound to `VariableID:88e90f6ce2400e8268c85903ec63a695a100755c/6425:53` — an external library variable. When rebuilding, use a local spacing variable (4px equivalent).

---

## Figma Component Page — Arrangement

```
┌──────────────────────────────────────────────────────────────┐
│  STEPPER COMPONENT SYSTEM          ← small caps label        │
│  Stepper                           ← large bold title        │
│  3-level system · _base Step Icon · _base Step · Stepper     │
│  ──────────────────────────────────  ← divider               │
│                                                               │
│  ▌ _base Step Icon — 6 Variants                              │
│    State × Size · Incomplete · Current · Completed            │
│    [ actual _base Step Icon COMPONENT_SET ]                   │
│                                                               │
│  ▌ _base Step — 6 Variants                                   │
│    Size × State · Connector · Text · Supporting text          │
│    [ actual _base Step COMPONENT_SET ]                        │
│                                                               │
│  ▌ Stepper — 2 Sizes                                         │
│    Regular · Large · 5 steps · Show Connecter rule            │
│    [ actual Stepper COMPONENT_SET ]                           │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

| Section | Subtitle | Content |
|---|---|---|
| `_base Step Icon — 6 Variants` | `Incomplete · Current (loading SVG) · Completed (check) · Regular 24px · Large 32px` | Actual `_base Step Icon` COMPONENT_SET |
| `_base Step — 6 Variants` | `Size × State · Regular: Body sm · Large: Body md · Connector · spacing-4xl / spacing-5xl padding` | Actual `_base Step` COMPONENT_SET |
| `Stepper — 2 Sizes` | `Regular · Large · 5 _base Step instances · last step Show Connecter=false` | Actual `Stepper` COMPONENT_SET |