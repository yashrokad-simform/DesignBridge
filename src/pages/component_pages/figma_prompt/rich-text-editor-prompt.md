# Rich Text Editor

## Overview

| Property | Value |
|---|---|
| System Name | Rich Text Editor |
| Components | `_WYSIWYG Editor Icons` · `_base Rich Text Editor` · `Rich Text Editor` |
| Node — `_WYSIWYG Editor Icons` | `9639:219237` |
| Node — `_base Rich Text Editor` | `9639:219329` |
| Node — `Rich Text Editor` | `9639:219146` |
| `_WYSIWYG Editor Icons` Variants | 16 (Active × Type) |
| `Rich Text Editor` Variants | 5 (State) |

A three-level system for multi-line formatted text input. `_WYSIWYG Editor Icons` provides individual formatting toolbar buttons. `_base Rich Text Editor` composes the label, toolbar, content area, resize handle, and hint text. `Rich Text Editor` wraps the base with 5 interactive states.

> ### ⚠️ Critical Requirement — Expose Nested Instance Properties
>
> The main **`Rich Text Editor`** component (every variant) **MUST** have **all** properties from its nested **`_base Rich Text Editor`** instance exposed onto it. In Figma: select the main component/variant → **Properties** panel → **"Expose properties from → Nested instances"**. Without this, the `_base Rich Text Editor` properties stay buried inside the nested instance and designers cannot access them from the main component. This applies to **every** variant — see the dedicated "Expose Nested Instance Properties" step below for details.

---

## Component Hierarchy & Build Order

```
Level 1 — _WYSIWYG Editor Icons    [COMPONENT_SET]
  ├── Active=False, Type=Bold
  ├── Active=False, Type=Italic
  ├── Active=False, Type=H1
  ├── Active=False, Type=H2
  ├── Active=False, Type=Quote
  ├── Active=False, Type=Link
  ├── Active=False, Type=List bullet
  ├── Active=False, Type=List numbers
  └── Active=True  × (same 8 types)

Level 2 — _base Rich Text Editor   [COMPONENT — single, not a set]

Level 3 — Rich Text Editor         [COMPONENT_SET]
  ├── State=Enabled
  ├── State=Focused
  ├── State=Filled
  ├── State=Disabled
  └── State=Error
```

> **Build order is mandatory.** `_WYSIWYG Editor Icons` must exist before `_base Rich Text Editor`. `_base Rich Text Editor` must exist before `Rich Text Editor`.

---

## 1. `_WYSIWYG Editor Icons`

### Variant Properties

| Property | Type | Options |
|---|---|---|
| `Active` | VARIANT | `False` · `True` |
| `Type` | VARIANT | `Bold` · `Italic` · `H1` · `H2` · `Quote` · `Link` · `List bullet` · `List numbers` |

### Structure

Each variant is a **24×24px FIXED** frame with a flat SVG vector icon inside.

```
Active=False, Type=Bold            [COMPONENT · 24×24px · FIXED × FIXED]
  Fill:         None (hidden white fill — do not use)
  Corner radius: radius-sm
  Clips content: true
  └── Icon                         [VECTOR — flat SVG shape]
        Fill: Icon/icon-secondary
        ⚠️ Color is on the FILL of this VECTOR — NOT a stroke

Active=True, Type=Bold             [COMPONENT · 24×24px · FIXED × FIXED]
  Fill:         Background/bg-secondary
  Corner radius: radius-sm
  Clips content: true
  └── Icon                         [VECTOR — flat SVG shape]
        Fill: Icon/icon-primary
```

> ⚠️ **These are flat custom SVG VECTOR shapes — not Icon component instances from the design system icon library.** The icon shape is drawn directly as a VECTOR with a fill color. Do not use the `Icon` component or look for a stroke path. Apply the color variable directly to the VECTOR's **fill**.

### Color Variables

| State | Frame Fill | Icon VECTOR Fill |
|---|---|---|
| `Active=False` | None | `Icon/icon-secondary` |
| `Active=True` | `Background/bg-secondary` | `Icon/icon-primary` |



### Variable Attachment — `_WYSIWYG Editor Icons`

| Layer | Property | Variable |
|---|---|---|
| Outer frame (Active=True) | Fill | `Background/bg-secondary` |
| Outer frame corner radius | `radius-sm` | Variable |
| `Icon` VECTOR (Active=False) | Fill | `Icon/icon-secondary` |
| `Icon` VECTOR (Active=True) | Fill | `Icon/icon-primary` |

---

## 2. `_base Rich Text Editor`

### Node
`9639:219329` — single **COMPONENT** (not a Component Set)

### Component Properties

| Property | Type | Default | Controls |
|---|---|---|---|
| `Show Label#9639:3` | BOOLEAN | `true` | `Label` frame visibility |
| `Mandatory#9639:1` | BOOLEAN | `true` | `*` asterisk visibility |
| `Show Hint#9639:2` | BOOLEAN | `true` | `Hint text` layer visibility |
| `Show WYSIWYG Bar#19113:0` | BOOLEAN | `true` | Toolbar frame visibility |
| `Label#9639:4` | TEXT | `"Label"` | Label text content |
| `Hint#9639:5` | TEXT | `"This is a hint text to help user."` | Hint text content |
| `Input#9639:6` | TEXT | `"Text"` | Content text value |

> ⚠️ **Property name note:** In the Figma file, `Show Label` is stored as `Show Lable#9639:3` (typo in the file). Use the correct spelling `Show Label` in all references outside Figma.

### Layer Structure

```
_base Rich Text Editor             [COMPONENT · FIXED(320px) × HUG · Vertical AL]
  Gap: spacing-xs (4px) — between Label frame · Input · Hint text
  No fill · No stroke on outer frame
  │
  ├── Input with label             [FRAME · FILL × HUG · Vertical AL]
  │     Gap: spacing-xs (4px)
  │     No fill · No stroke
  │     │
  │     ├── Label                  [FRAME · HUG × HUG · Horizontal AL]
  │     │     No padding · No gap
  │     │     Visible: Show Label boolean
  │     │     │
  │     │     ├── Label            [TEXT · HUG × HUG]
  │     │     │     Style: Label sm/Medium
  │     │     │     Font:  Inter · Medium 500 · 12px · 16px LH
  │     │     │     Fill:  Component/Input Field/input-text-label
  │     │     │     Content: linked to Label#9639:4 property
  │     │     │
  │     │     └── *                [TEXT · HUG × HUG]
  │     │           Style: Label sm/Medium
  │     │           Font:  Inter · Medium 500 · 12px · 16px LH
  │     │           Fill:  Component/Input Field/input-text-critical
  │     │           Visible: Mandatory boolean
  │     │
  │     └── Input                  [FRAME · FILL × FIXED(110px) · Vertical AL]
  │           Fill:    Component/Input Field/input-bg-primary
  │           Stroke:  Component/Input Field/input-border-enabled · 1px inside
  │           Radius:  radius-xl (all 4 corners)
  │           Padding: spacing-none (0px) all sides
  │           Gap:     spacing-none (0px)
  │           Clips content: true
  │           │
  │           ├── Frame 2147224872 [FRAME · FILL × HUG · Horizontal AL · Center VA]
  │           │     Padding L/R: spacing-md (8px)
  │           │     Padding T/B: spacing-xs (4px)
  │           │     Gap: spacing-xs (4px)
  │           │     Visible: Show WYSIWYG Bar boolean
  │           │     Contains: 8× _WYSIWYG editor icon instances
  │           │       Order: Bold · Italic · H1 · H2 · Quote · Link · List bullet · List numbers
  │           │       All default to Active=False
  │           │
  │           ├── Content          [FRAME · FILL × FILL · Horizontal AL · layoutGrow=1]
  │           │     Padding L/R: spacing-xl (12px)
  │           │     Padding T/B: spacing-xs (4px)
  │           │     Gap: spacing-md (8px)
  │           │     │
  │           │     └── Text       [TEXT · FILL × HUG · layoutGrow=1]
  │           │           Style: Body sm/Medium
  │           │           Font:  Inter · Medium 500 · 14px · 18px LH
  │           │           Fill:  Component/Input Field/input-text-placeholder
  │           │           Resize: HEIGHT auto
  │           │           Content: linked to Input#9639:6 property
  │           │
  │           └── Icon             [INSTANCE · 16px · ABSOLUTE · bottom-right corner]
  │                 Position: bottom-right of Input frame
  │                 layoutPositioning: ABSOLUTE
  │                 (resize handle icon)
  │
  └── Hint text                    [TEXT · FILL × HUG]
        Style: Label sm/Medium
        Font:  Inter · Medium 500 · 12px · 16px LH
        Fill:  Component/Input Field/input-text-helper
        Visible: Show Hint boolean
        Content: linked to Hint#9639:5 property
```

> ⚠️ **Input frame padding is spacing-none (0px) on ALL sides.** The padding for the toolbar and content area is handled by their own internal frames — NOT by the outer Input frame. Do not add padding to the Input frame itself.

### Layer Descriptions

| Layer | Type | Notes |
|---|---|---|
| `Input with label` | FRAME | FILL × HUG · Vertical AL · gap spacing-xs · no fill |
| `Label` (frame) | FRAME | HUG × HUG · Horizontal AL · visibility = Show Label |
| `Label` (text) | TEXT | HUG × HUG · `Label sm/Medium` · 12px |
| `*` (asterisk) | TEXT | HUG × HUG · `Label sm/Medium` · 12px · visibility = Mandatory |
| `Input` | FRAME | FILL × FIXED(110px) · Vertical AL · all padding = 0 · clips content |
| `Frame 2147224872` | FRAME | WYSIWYG toolbar · FILL × HUG · padding spacing-md L/R · spacing-xs T/B · visibility = Show WYSIWYG Bar |
| `Content` | FRAME | FILL × FILL · layoutGrow=1 · padding spacing-xl L/R · spacing-xs T/B · gap spacing-md |
| `Text` | TEXT | FILL × HUG · `Body sm/Medium` · 14px · layoutGrow=1 · HEIGHT auto resize |
| `Icon` | INSTANCE | 16px · ABSOLUTE · bottom-right · resize handle |
| `Hint text` | TEXT | FILL × HUG · `Label sm/Medium` · 12px · visibility = Show Hint |

---

## 3. `Rich Text Editor`

### Node
`9639:219146` — **COMPONENT_SET** wrapping `_base Rich Text Editor` instances

Follows the **same wrapper pattern** as Input Field, Badge, Button: each variant is a COMPONENT frame containing exactly one `_base Rich Text Editor` instance. Only the `Input` fill, `Input` stroke, `Text` fill, and `Hint text` fill change between variants.

### Variant Properties

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Enabled` · `Focused` · `Filled` · `Disabled` · `Error` |

### State Changes

| State | Input fill | Input stroke | `Text` fill | `Hint text` fill |
|---|---|---|---|---|
| `Enabled` | `input-bg-primary` | `input-border-enabled` | `input-text-placeholder` | `input-text-helper` |
| `Focused` | `input-bg-primary` | `input-border-selected` | `input-text-placeholder` | `input-text-helper` |
| `Filled` | `input-bg-primary` | `input-border-enabled` | `input-text-enable` | `input-text-helper` |
| `Disabled` | `input-bg-disabled` | `input-border-disabled` | `input-text-disabled` | `input-text-helper` |
| `Error` | `input-bg-primary` | `input-border-critical` | `input-text-enable` | `input-text-critical` |

All variables use the `Component/Input Field/` namespace.

---

## Attached Variables

### Spacing — `_base Rich Text Editor`

| Layer | Property | Variable | Value |
|---|---|---|---|
| Outer frame | Gap | `spacing-xs` | 4px |
| `Input with label` | Gap | `spacing-xs` | 4px |
| `Input` frame | Padding all sides | `spacing-none` | 0px |
| `Input` frame | Gap | `spacing-none` | 0px |
| `Frame 2147224872` | Padding L/R | `spacing-md` | 8px |
| `Frame 2147224872` | Padding T/B | `spacing-xs` | 4px |
| `Frame 2147224872` | Gap | `spacing-xs` | 4px |
| `Content` | Padding L/R | `spacing-xl` | 12px |
| `Content` | Padding T/B | `spacing-xs` | 4px |
| `Content` | Gap | `spacing-md` | 8px |

### Radius

| Layer | Variable | Value |
|---|---|---|
| `Input` frame (all 4 corners) | `radius-xl` | 12px |
| `_WYSIWYG Editor Icons` outer frame | `radius-sm` | Variable |

### Typography

All text styles read directly from Figma style IDs:

| Layer | Style ID | Style Name | Font | Size | Weight | LH |
|---|---|---|---|---|---|---|
| `Label` text | `8077:7073` | `Label sm/Medium` | Inter | 12px | 500 | 16px |
| `*` asterisk | `8077:7073` | `Label sm/Medium` | Inter | 12px | 500 | 16px |
| `Text` (content) | `4:288` | `Body sm/Medium` | Inter | 14px | 500 | 18px |
| `Hint text` | `8077:7073` | `Label sm/Medium` | Inter | 12px | 500 | 16px |

> Apply text styles directly. Do not bind individual font variables.

### Colors — `_base Rich Text Editor`

| Layer | Variable | Usage |
|---|---|---|
| `Label` text | `Component/Input Field/input-text-label` | Label above input |
| `*` asterisk | `Component/Input Field/input-text-critical` | Mandatory marker |
| `Input` fill (default) | `Component/Input Field/input-bg-primary` | Input background |
| `Input` stroke (default) | `Component/Input Field/input-border-enabled` | Input border |
| `Input` corner radius | `radius-xl` | 12px |
| `Text` fill (Enabled/Focused) | `Component/Input Field/input-text-placeholder` | Placeholder text |
| `Text` fill (Filled/Error) | `Component/Input Field/input-text-enable` | Entered value |
| `Text` fill (Disabled) | `Component/Input Field/input-text-disabled` | Disabled text |
| `Hint text` fill (default) | `Component/Input Field/input-text-helper` | Helper text |
| `Hint text` fill (Error) | `Component/Input Field/input-text-critical` | Error message |

---

## Figma Construction Guide

### Step 1 — Build `_WYSIWYG Editor Icons` — `Active=False`

For each of the 8 types (Bold, Italic, H1, H2, Quote, Link, List bullet, List numbers):

1. Create a **Frame**. Name it `Active=False, Type=Bold` (adjust per type).
2. Set size to **24×24px FIXED**. No Auto Layout needed (icon is centered via constraints).
3. Bind `cornerRadius` → **`radius-sm`**.
4. Set frame fill to **white but hidden** (`visible: false`).
5. Set `clipsContent = true`.
6. Draw the icon as a **VECTOR** shape inside. Name it `Icon`.
   - Draw the correct typographic symbol shape for the type (B for Bold, I for Italic, etc.)
   - Set VECTOR **fill** → `Icon/icon-secondary`.
   - No stroke on the VECTOR.
7. Position the VECTOR centered inside the 24×24 frame using CENTER/CENTER constraints.
8. Convert the frame to a **Component**.

### Step 2 — Build `Active=True` Variants

For each of the 8 types:

1. Duplicate the matching `Active=False` variant. Rename to `Active=True, Type=Bold` etc.
2. Change frame fill → `Background/bg-secondary` (now visible).
3. On the `Icon` VECTOR: change fill → `Icon/icon-primary`.

### Step 3 — Combine into `_WYSIWYG Editor Icons` Component Set

1. Select all 16 variants. Combine into **Component Set**. Name it `_WYSIWYG Editor Icons`.
2. Add property `Active` → `False`, `True`.
3. Add property `Type` → `Bold`, `Italic`, `H1`, `H2`, `Quote`, `Link`, `List bullet`, `List numbers`.

### Step 4 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all 16 variants.

### Step 5 — Build `_base Rich Text Editor`

1. Create a **Frame**. Name it `_base Rich Text Editor`.
2. **Vertical AL · FIXED(320px) × HUG**.
3. Bind gap → `spacing-xs`. No fill. No stroke.
4. Convert to **Component**.
5. Create component properties:
   - Boolean `Show Label` (default: `true`)
   - Boolean `Mandatory` (default: `true`)
   - Boolean `Show Hint` (default: `true`)
   - Boolean `Show WYSIWYG Bar` (default: `true`)
   - Text `Label` (default: `"Label"`)
   - Text `Hint` (default: `"This is a hint text to help user."`)
   - Text `Input` (default: `"Text"`)

#### Input with label frame
1. Add a **Frame**. Name it `Input with label`. **Vertical AL · FILL × HUG**. Bind gap → `spacing-xs`. No fill.

#### Label frame
1. Inside `Input with label`, add a **Frame**. Name it `Label`. **Horizontal AL · HUG × HUG**. No padding, no gap.
2. Link visibility to `Show Label` Boolean property.
3. Add `Label` TEXT: style `Label sm/Medium` · fill `input-text-label` · HUG × HUG · link content to `Label` text property.
4. Add `*` TEXT: style `Label sm/Medium` · fill `input-text-critical` · HUG × HUG · link visibility to `Mandatory` Boolean.

#### Input frame
1. Inside `Input with label`, add a **Frame**. Name it `Input`.
2. **Vertical AL · FILL × FIXED(110px)**.
3. Bind all 4 padding → `spacing-none` (0px).
4. Bind gap → `spacing-none` (0px).
5. Bind fill → `input-bg-primary`. Add stroke 1px inside → `input-border-enabled`.
6. Bind corner radius all 4 → `radius-xl`.
7. Set `clipsContent = true`.

#### Frame 2147224872 (WYSIWYG toolbar)
1. Inside `Input`, add a **Frame**. Name it `Frame 2147224872`.
2. **Horizontal AL · FILL × HUG · Center cross-axis**.
3. Bind padding L/R → `spacing-md`. Bind padding T/B → `spacing-xs`. Bind gap → `spacing-xs`.
4. Link visibility to `Show WYSIWYG Bar` Boolean property.
5. Place **8 instances of `_WYSIWYG Editor Icons`** in this exact order:
   - Bold · Italic · H1 · H2 · Quote · Link · List bullet · List numbers
   - All instances: `Active=False` by default (user interaction toggles them)

#### Content frame
1. Inside `Input`, add a **Frame**. Name it `Content`.
2. **Horizontal AL · FILL × FILL · layoutGrow=1**.
3. Bind padding L/R → `spacing-xl`. Bind padding T/B → `spacing-xs`. Bind gap → `spacing-md`.

#### Text layer (inside Content)
1. Add a **Text** layer inside `Content`. Name it `Text`.
2. Apply text style **`Body sm/Medium`**:
   - Inter · Medium 500 · **14px** · 18px LH
3. Bind fill → `input-text-placeholder`.
4. Set sizing: **FILL × HUG**. Set resize mode: **HEIGHT** auto.
5. Set `layoutGrow=1`.
6. Link content to `Input` text property.

#### Icon (resize handle)
1. Place an **Icon component** instance (Size=16px) inside `Input`. Name it `Icon`.
2. Set **layoutPositioning = ABSOLUTE**.
3. Position at the **bottom-right corner** of the `Input` frame.
4. Set constraints: bottom + right.

#### Hint text
1. Add a **Text** layer at the bottom of `_base Rich Text Editor`. Name it `Hint text`.
2. Apply text style **`Label sm/Medium`**:
   - Confirmed: Inter · Medium 500 · **12px** · 16px LH (style ID: `8077:7073`)
3. Bind fill → `input-text-helper`.
4. Set sizing: **FILL × HUG**.
5. Link visibility to `Show Hint` Boolean. Link content to `Hint` text property.

### Step 6 — Build `Rich Text Editor` Variants

> ⚠️ **Wrapper pattern — same as Input Field and Badge/Button.** Each variant is a wrapper COMPONENT containing exactly one `_base Rich Text Editor` instance.

**For each of the 5 states:**

1. Create an empty **Frame**. Name it `State=Enabled` (adjust per state).
2. Place an instance of `_base Rich Text Editor` inside. Set to **FILL × HUG**.
3. Convert to **Component**.

**Per-variant overrides on the `_base Rich Text Editor` instance:**

| State | `Input` fill | `Input` stroke | `Text` fill | `Hint text` fill |
|---|---|---|---|---|
| `Enabled` | `input-bg-primary` | `input-border-enabled` | `input-text-placeholder` | `input-text-helper` |
| `Focused` | `input-bg-primary` | `input-border-selected` | `input-text-placeholder` | `input-text-helper` |
| `Filled` | `input-bg-primary` | `input-border-enabled` | `input-text-enable` | `input-text-helper` |
| `Disabled` | `input-bg-disabled` | `input-border-disabled` | `input-text-disabled` | `input-text-helper` |
| `Error` | `input-bg-primary` | `input-border-critical` | `input-text-enable` | `input-text-critical` |

4. Select all 5. Combine into **Component Set** named `Rich Text Editor`.
5. Add property `State` → `Enabled`, `Focused`, `Filled`, `Disabled`, `Error`.

### Step 7 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all 5 variants. Properties that surface: `Show Label`, `Mandatory`, `Show Hint`, `Show WYSIWYG Bar`, `Label`, `Hint`, `Input`.

---

## Mandatory Rules

- **Build order is mandatory.** `_WYSIWYG Editor Icons` → `_base Rich Text Editor` → `Rich Text Editor`.
- **WYSIWYG icons are flat SVG VECTOR shapes.** Color is on the VECTOR **fill**, not stroke. Do not use the design system Icon component for these.
- **`Active=False` outer frame has no visible fill.** The white fill must be hidden (`visible: false`).
- **`Active=True` frame fill = `Background/bg-secondary`.**
- **WYSIWYG icon outer corner radius = `radius-sm`** — bind as a variable.
- **`Input` frame padding is `spacing-none` (0px) on all sides.** The toolbar and content frame manage their own internal padding.
- **`Content` frame gap = `spacing-md` (8px).**
- **`Text` content style = `Body sm/Medium` (14px · 500).**
- **`Label`, `*`, and `Hint text` style = `Label sm/Medium` (12px · 500).** Confirmed from style ID `8077:7073`.
- **Text style only — no individual font variable bindings.**
- **Resize `Icon` is ABSOLUTE positioned** at the bottom-right corner of the `Input` frame.
- **Expose nested properties** on all component levels.
- **`Show Label` property name** — Figma file stores this as `Show Lable` (typo). Documented here as `Show Label`.

---



---

## Figma Component Page — Arrangement

```
┌──────────────────────────────────────────────────────────────┐
│  RICH TEXT EDITOR COMPONENT SYSTEM ← small caps label        │
│  Rich Text Editor                  ← large bold title        │
│  3-level system · WYSIWYG toolbar · 5 states                 │
│  ──────────────────────────────────  ← divider               │
│                                                               │
│  ▌ _WYSIWYG Editor Icons — 16 Variants                       │
│    Active=False/True · 8 types · flat SVG VECTOR fill         │
│    [ actual _WYSIWYG Editor Icons COMPONENT_SET ]             │
│                                                               │
│  ▌ _base Rich Text Editor — Base Component                   │
│    7 Boolean/Text properties · Body sm/Medium content         │
│    Label sm/Medium label + hint · toolbar + content area      │
│    [ actual _base Rich Text Editor COMPONENT ]                │
│                                                               │
│  ▌ Rich Text Editor — All 5 States                           │
│    Enabled · Focused · Filled · Disabled · Error              │
│    [ actual Rich Text Editor COMPONENT_SET ]                  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

| Section | Subtitle | Content |
|---|---|---|
| `_WYSIWYG Editor Icons — 16 Variants` | `Active=False/True · Bold · Italic · H1 · H2 · Quote · Link · List bullet · List numbers · fill on VECTOR` | Actual `_WYSIWYG Editor Icons` COMPONENT_SET |
| `_base Rich Text Editor — Base Component` | `FIXED 320px · Input 110px · Label sm/Medium · Body sm/Medium content · spacing-md gap in Content` | Actual `_base Rich Text Editor` COMPONENT |
| `Rich Text Editor — All 5 States` | `State property · Enabled · Focused · Filled · Disabled · Error · Component/Input Field variables` | Actual `Rich Text Editor` COMPONENT_SET |