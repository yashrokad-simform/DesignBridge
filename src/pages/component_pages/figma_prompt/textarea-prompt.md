# Text Area Field

## Overview

| Property | Value |
|---|---|
| Component Name | Text Area Field |
| Base Component | `_base Textarea Field` |
| Component Set | `Text Area Field` |
| Node — Base | `411:5489` |
| Node — Component Set | `8090:65082` |
| Total Variants | 5 (`State`) |

> ### ⚠️ Critical Requirement — Expose Nested Instance Properties
>
> The main **`Text Area Field`** component (every variant) **MUST** have **all** properties from its nested **`_base Textarea Field`** instance exposed onto it. In Figma: select the main component/variant → **Properties** panel → **"Expose properties from → Nested instances"**. Without this, the `_base Textarea Field` properties stay buried inside the nested instance and designers cannot access them from the main component. This applies to **every** variant — see the dedicated "Expose Nested Instance Properties" step below for details.

A multi-line text input with optional label, mandatory marker, resizable text area, and hint text. Follows the same wrapper pattern as Input Field with three key structural differences: FIXED height Input frame (93px), all-sides padding on the Input frame, and no prefix/suffix icon slots.

---

## Component Hierarchy

```
Level 1 — _base Textarea Field     [COMPONENT — single base, not a Component Set]
Level 2 — Text Area Field          [COMPONENT_SET — wraps _base Textarea Field instances]
```

---

## Comparison with Input Field

| Property | Input Field | Text Area Field |
|---|---|---|
| `Input` frame height | FIXED 44px | FIXED 93px |
| `Input` padding | L/R only (`spacing-xl`) · No T/B | **All sides** (`spacing-xl`) |
| Has prefix icon slot | ✅ Yes | ❌ No |
| Has suffix icon slot | ✅ Yes | ❌ No |
| Text resize mode | WIDTH_AND_HEIGHT | **HEIGHT** (wraps vertically) |
| Resize handle icon | ✅ ABSOLUTE bottom-right | ✅ ABSOLUTE bottom-right |

---

## Variant Properties

### `Text Area Field`

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Enabled` · `Focused` · `Filled` · `Disabled` · `Error` |

### `_base Textarea Field` Component Properties

| Property | Type | Default | Controls |
|---|---|---|---|
| `Show Label#411:10` | BOOLEAN | `true` | `Label` frame visibility |
| `Mandatory#588:0` | BOOLEAN | `true` | `*` asterisk visibility |
| `Show Hint#536:4` | BOOLEAN | `true` | `Hint text` visibility |
| `Label#411:9` | TEXT | `"Label"` | Label text content |
| `Input#411:11` | TEXT | `"Text"` | Content text value |
| `Hint#411:12` | TEXT | `"This is a hint text to help user."` | Hint text content |

---

## Component Structure

### `_base Textarea Field`

```
_base Textarea Field               [COMPONENT · FIXED(320px) × HUG · Vertical AL]
  Gap: spacing-xs (4px)
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
  │     │     │     Content: linked to Label property
  │     │     │
  │     │     └── *                [TEXT · HUG × HUG]
  │     │           Style: Label sm/Medium
  │     │           Font:  Inter · Medium 500 · 12px · 16px LH
  │     │           Fill:  Component/Input Field/input-text-critical
  │     │           Visible: Mandatory boolean
  │     │
  │     └── Input                  [FRAME · FILL × FIXED(93px) · Horizontal AL]
  │           Padding: spacing-xl (12px) ALL FOUR SIDES
  │           Gap:     external library variable (use spacing-md locally)
  │           Fill:    Component/Input Field/input-bg-primary
  │           Stroke:  Component/Input Field/input-border-enabled · 1px inside
  │           Radius:  radius-xl (all 4 corners)
  │           Clips content: true
  │           │
  │           ├── Content          [FRAME · FILL × FILL · Horizontal AL · layoutGrow=1]
  │           │     Gap: external library variable (use spacing-md locally)
  │           │     └── Text       [TEXT · FILL × HUG · layoutGrow=1]
  │           │           Style: Body sm/Medium
  │           │           Font:  Inter · Medium 500 · 14px · 18px LH
  │           │           Fill:  Component/Input Field/input-text-placeholder
  │           │           Resize: HEIGHT auto (wraps vertically)
  │           │           Content: linked to Input property
  │           │
  │           └── Icon             [INSTANCE · 16px · ABSOLUTE · bottom-right]
  │                 Position: bottom-right corner of Input frame
  │                 layoutPositioning: ABSOLUTE
  │                 Constraints: bottom + right
  │                 Padding Bottom: spacing-xs · Padding Right: spacing-xs
  │                 (resize handle icon)
  │
  └── Hint text                    [TEXT · FILL × HUG]
        Style: Label sm/Medium
        Font:  Inter · Medium 500 · 12px · 16px LH
        Fill:  Component/Input Field/input-text-helper
        Resize: HEIGHT auto
        Visible: Show Hint boolean
        Content: linked to Hint property
```

> ⚠️ **Input frame padding is `spacing-xl` on ALL FOUR SIDES** — unlike Input Field which has L/R padding only. T/B padding IS set here (12px top, 12px bottom).

> ⚠️ **`Text` resize mode is `HEIGHT`** — the text layer grows vertically when content wraps. It does NOT resize horizontally (FILL × HUG with HEIGHT auto-resize).

### `Text Area Field` Variant Structure

```
Text Area Field                    [COMPONENT_SET]
  │
  ├── State=Enabled                [COMPONENT · FIXED(320) × FIXED(133px)]
  │     └── _base Textarea Field   [INSTANCE — override Input fill/stroke per state]
  │
  ├── State=Focused                [COMPONENT · FIXED(320) × FIXED(133px)]
  │     └── _base Textarea Field   [INSTANCE — Input stroke = input-border-selected]
  │
  ├── State=Filled                 [COMPONENT · FIXED(320) × FIXED(133px)]
  │     └── _base Textarea Field   [INSTANCE — Text fill = input-text-enable]
  │
  ├── State=Disabled               [COMPONENT · FIXED(320) × FIXED(133px)]
  │     └── _base Textarea Field   [INSTANCE — Input fill = input-bg-disabled]
  │
  └── State=Error                  [COMPONENT · FIXED(320) × FIXED(133px)]
        └── _base Textarea Field   [INSTANCE — Input stroke = input-border-critical · Hint = critical]
```

> The wrapper variant is **FIXED width × FIXED height (133px)**. This is different from Input Field variants which use FILL sizing. The height is fixed at 133px to match the base component's natural height.

---

## Attached Variables

### Spacing

| Target | Property | Variable | Value |
|---|---|---|---|
| Outer frame | Gap | `spacing-xs` | 4px |
| `Input with label` | Gap | `spacing-xs` | 4px |
| `Input` frame | Padding Top | `spacing-xl` | 12px |
| `Input` frame | Padding Bottom | `spacing-xl` | 12px |
| `Input` frame | Padding Left | `spacing-xl` | 12px |
| `Input` frame | Padding Right | `spacing-xl` | 12px |
| `Input` frame | Gap | `spacing-md` (8px) — use locally | Replace external variable |
| `Content` frame | Gap | `spacing-md` (8px) — use locally | Replace external variable |

### Radius

| Layer | Variable | Value |
|---|---|---|
| `Input` frame (all 4 corners) | `radius-xl` | 12px |

### Typography

All text styles confirmed from Figma style IDs:

| Layer | Style ID | Style Name | Font | Size | Weight | LH |
|---|---|---|---|---|---|---|
| `Label` text | `8077:7073` | `Label sm/Medium` | Inter | 12px | 500 | 16px |
| `*` asterisk | `8077:7073` | `Label sm/Medium` | Inter | 12px | 500 | 16px |
| `Text` (content) | `4:288` | `Body sm/Medium` | Inter | 14px | 500 | 18px |
| `Hint text` | `8077:7073` | `Label sm/Medium` | Inter | 12px | 500 | 16px |

> Apply text styles directly. Do not bind individual font variables.

### Colors — Per State

| State | `Input` Fill | `Input` Stroke | `Text` Fill | `Hint text` Fill |
|---|---|---|---|---|
| `Enabled` | `input-bg-primary` | `input-border-enabled` | `input-text-placeholder` | `input-text-helper` |
| `Focused` | `input-bg-primary` | `input-border-selected` | `input-text-placeholder` | `input-text-helper` |
| `Filled` | `input-bg-primary` | `input-border-enabled` | `input-text-enable` | `input-text-helper` |
| `Disabled` | `input-bg-disabled` | `input-border-disabled` | `input-text-placeholder` | `input-text-helper` |
| `Error` | `input-bg-primary` | `input-border-critical` | `input-text-enable` | `input-text-critical` |

All variables use the `Component/Input Field/` namespace.

### Fixed Color Variables

| Layer | Variable |
|---|---|
| `Label` text | `Component/Input Field/input-text-label` |
| `*` asterisk | `Component/Input Field/input-text-critical` |

---

## States

### State Details

| State | Input stroke | Input fill | Text fill | Hint fill | Description |
|---|---|---|---|---|---|
| `Enabled` | `input-border-enabled` | `input-bg-primary` | `input-text-placeholder` | `input-text-helper` | Default empty state |
| `Focused` | `input-border-selected` (brand blue) | `input-bg-primary` | `input-text-placeholder` | `input-text-helper` | Active typing |
| `Filled` | `input-border-enabled` | `input-bg-primary` | `input-text-enable` | `input-text-helper` | Has content |
| `Disabled` | `input-border-disabled` | `input-bg-disabled` | `input-text-placeholder` | `input-text-helper` | Non-interactive |
| `Error` | `input-border-critical` (red) | `input-bg-primary` | `input-text-enable` | `input-text-critical` | Validation failed |

---

## Figma Construction Guide

### Step 1 — Build `_base Textarea Field`

1. Create a **Frame**. Name it `_base Textarea Field`.
2. **Vertical AL · FIXED width (320px) × HUG height**.
3. Bind gap → `spacing-xs`. No fill. No stroke.
4. Convert to **Component**.
5. Create component properties:
   - Boolean `Show Label` (default: `true`)
   - Boolean `Mandatory` (default: `true`)
   - Boolean `Show Hint` (default: `true`)
   - Text `Label` (default: `"Label"`)
   - Text `Input` (default: `"Text"`)
   - Text `Hint` (default: `"This is a hint text to help user."`)

#### Input with label frame
1. Add a **Frame** inside. Name it `Input with label`. **Vertical AL · FILL × HUG**. Bind gap → `spacing-xs`. No fill.

#### Label frame
1. Inside `Input with label`, add a **Frame**. Name it `Label`. **Horizontal AL · HUG × HUG**. No padding, no gap.
2. Link visibility to `Show Label` Boolean.
3. Add `Label` TEXT: style `Label sm/Medium` · fill `input-text-label` · HUG × HUG · link content to `Label` property.
4. Add `*` TEXT: style `Label sm/Medium` · fill `input-text-critical` · HUG × HUG · link visibility to `Mandatory` Boolean.

#### Input frame
1. Inside `Input with label`, add a **Frame**. Name it `Input`.
2. **Horizontal AL · FILL × FIXED(93px)**.
3. Bind padding **all four sides** → `spacing-xl` (12px each).
4. Bind gap → `spacing-md`.

> ⚠️ **All four padding sides get `spacing-xl`.** This is unlike Input Field which only had L/R padding.

5. Bind fill → `input-bg-primary`. Add stroke 1px inside → `input-border-enabled`.
6. Bind corner radius all 4 → `radius-xl`.
7. Set `clipsContent = true`.
8. Set cross-axis alignment to **Top** (not Center — content aligns to top of the area).

#### Content frame
1. Inside `Input`, add a **Frame**. Name it `Content`.
2. **Horizontal AL · FILL × FILL · layoutGrow=1**.
3. Bind gap → `spacing-md`. No fill.

#### Text layer (inside Content)
1. Add a **Text** layer inside `Content`. Name it `Text`.
2. Apply style **`Body sm/Medium`** — Inter · Medium 500 · 14px · 18px LH.
3. Bind fill → `input-text-placeholder`.
4. Sizing: **FILL × HUG**. Set resize mode: **HEIGHT** (grows downward).
5. Text align: left.
6. Set `layoutGrow=1`.
7. Link content to `Input` text property.

#### Icon (resize handle)
1. Place an **Icon component** instance (Size=16px) inside `Input`. Name it `Icon`.
2. Set **layoutPositioning = ABSOLUTE**. The icon must remain ABSOLUTE — do not set to auto layout.
3. Position at the **bottom-right corner** of the `Input` frame.
4. Set constraints: **bottom + right**.
5. Bind **Padding Bottom → `spacing-xs`** and **Padding Right → `spacing-xs`**.

#### Hint text
1. Add a **Text** layer at the bottom of `_base Textarea Field`. Name it `Hint text`.
2. Apply style **`Label sm/Medium`** — Inter · Medium 500 · 12px · 16px LH.
3. Bind fill → `input-text-helper`.
4. Sizing: **FILL × HUG**. Resize mode: HEIGHT.
5. Link visibility to `Show Hint` Boolean. Link content to `Hint` property.

### Step 2 — Build `Text Area Field` Variants

> ⚠️ **Wrapper pattern — same as Input Field.** Each variant is a wrapper COMPONENT containing exactly one `_base Textarea Field` instance.

**For each of the 5 states:**

1. Create an empty **Frame**. Name it `State=Enabled` (adjust per state).
2. Set sizing to **FIXED(320) × FIXED(133px)**.
3. Place an instance of `_base Textarea Field` inside. Set to **FILL × FILL** (layoutAlign=STRETCH, layoutGrow=1).
4. Convert to **Component**.

**Per-variant overrides on the `_base Textarea Field` instance:**

| State | `Input` stroke override | `Input` fill override | `Text` fill override | `Hint text` fill override |
|---|---|---|---|---|
| `Enabled` | `input-border-enabled` | `input-bg-primary` | `input-text-placeholder` | `input-text-helper` |
| `Focused` | `input-border-selected` | `input-bg-primary` | `input-text-placeholder` | `input-text-helper` |
| `Filled` | `input-border-enabled` | `input-bg-primary` | **`input-text-enable`** | `input-text-helper` |
| `Disabled` | `input-border-disabled` | **`input-bg-disabled`** | `input-text-placeholder` | `input-text-helper` |
| `Error` | **`input-border-critical`** | `input-bg-primary` | **`input-text-enable`** | **`input-text-critical`** |

5. Select all 5. Combine into **Component Set** named `Text Area Field`.
6. Add property `State` → `Enabled`, `Focused`, `Filled`, `Disabled`, `Error`.

### Step 3 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all 5 variants. Properties that surface: `Show Label`, `Mandatory`, `Show Hint`, `Label`, `Input`, `Hint`.

### Step 4 — Variable Attachment Locations

| Target | Property | Variable |
|---|---|---|
| Outer frame | Gap | `spacing-xs` |
| `Input with label` | Gap | `spacing-xs` |
| `Input` frame | Fill | `Component/Input Field/input-bg-primary` (default) |
| `Input` frame | Stroke color | `Component/Input Field/input-border-enabled` (default) |
| `Input` frame | Stroke weight | 1px (hardcoded) |
| `Input` frame | Padding Top | `spacing-xl` |
| `Input` frame | Padding Bottom | `spacing-xl` |
| `Input` frame | Padding Left | `spacing-xl` |
| `Input` frame | Padding Right | `spacing-xl` |
| `Input` frame | Gap | `spacing-md` |
| `Input` frame | Corner radius (all 4) | `radius-xl` |
| `Content` frame | Gap | `spacing-md` |
| `Label` text | Fill | `Component/Input Field/input-text-label` |
| `Label` text | Text Style | `Label sm/Medium` |
| `*` asterisk | Fill | `Component/Input Field/input-text-critical` |
| `*` asterisk | Text Style | `Label sm/Medium` |
| `Text` (content) | Fill | `input-text-placeholder` (default) · `input-text-enable` (Filled/Error) · `input-text-placeholder` (Disabled) |
| `Text` (content) | Text Style | `Body sm/Medium` |
| `Hint text` | Fill | `input-text-helper` (default) · `input-text-critical` (Error) |
| `Hint text` | Text Style | `Label sm/Medium` |

---

## Mandatory Rules

- **`_base Textarea Field` is a single COMPONENT, not a Component Set.** Same pattern as Input Field base.
- **`Input` frame padding is `spacing-xl` on ALL FOUR SIDES.** T/B padding is 12px — unlike Input Field which has no top/bottom padding.
- **`Input` frame height is FIXED 93px.** Do not use HUG — the text area has a fixed default height.
- **`Input` frame cross-axis alignment is Top,** not Center. Text aligns to the top of the area.
- **`Text` resize mode is HEIGHT** — text grows downward. Do not set to WIDTH_AND_HEIGHT.
- **No prefix or suffix icon slots.** Text Area Field has no `Show Prefix` / `Show Suffix` properties. Only the resize handle Icon is present (ABSOLUTE).
- **Resize handle `Icon` is ABSOLUTE** — set `layoutPositioning = ABSOLUTE`. Constraints: bottom + right. Bind **Padding Bottom → `spacing-xs`** and **Padding Right → `spacing-xs`**.
- **Wrapper variants are FIXED(320) × FIXED(133px)** — not HUG like Input Field variants.
- **`Filled` and `Error` states** use `input-text-enable` for `Text` fill. `Enabled`, `Focused`, `Disabled` use `input-text-placeholder`.
- **`Error` state changes two properties:** Input stroke → `input-border-critical` AND Hint fill → `input-text-critical`.
- **Text style only — no individual font variable bindings.**
- **Expose nested properties** on all `Text Area Field` wrapper variants.
- **`Input` frame gap and `Content` gap use `spacing-md` locally.** The original file uses an external library variable — replace with `spacing-md` when rebuilding.

---

## Flags

### ⚠️ External library variable on Input/Content gap
The `Input` and `Content` frame gaps are bound to `VariableID:1b216fc863b50e13587c77686509126da3c4feab/6425:51` — an external library variable. Use `spacing-md` (8px) as the local equivalent when rebuilding.

---

## Figma Component Page — Arrangement

```
┌────────────────────────────────────────────────────────────┐
│  TEXT AREA FIELD COMPONENT SYSTEM  ← small caps label      │
│  Text Area Field                   ← large bold title      │
│  5 states · Enabled · Focused · Filled · Disabled · Error  │
│  Label · Mandatory · Hint · Resize handle                  │
│  ─────────────────────────────────  ← divider              │
│                                                             │
│  ▌ _base Textarea Field — Base Component                   │
│    6 Boolean/Text properties · Body sm/Medium · 93px area   │
│    [ actual _base Textarea Field COMPONENT ]               │
│                                                             │
│  ▌ Text Area Field — All 5 States                          │
│    State property · All Component/Input Field variables     │
│    [ actual Text Area Field COMPONENT_SET ]                │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

| Section | Subtitle | Content |
|---|---|---|
| `_base Textarea Field — Base Component` | `FIXED 320px · Input FIXED 93px · All-sides spacing-xl padding · Label sm/Medium · Body sm/Medium content · resize handle` | Actual `_base Textarea Field` COMPONENT |
| `Text Area Field — All 5 States` | `State property · Enabled · Focused · Filled · Disabled · Error · Component/Input Field variables` | Actual `Text Area Field` COMPONENT_SET |
