# Input Field

## Overview

| Property | Value |
|---|---|
| Component Name | Input Field |
| Base Component | `_base Input Field` |
| Component Set | `Input Field` |
| Node — Base | `411:2404` |
| Node — Component Set | `517:11428` |
| Total Variants | 5 (`State`) |
| Has States | Yes — Enabled · Focused · Filled · Disabled · Error |

> ### ⚠️ Critical Requirement — Expose Nested Instance Properties
>
> The main **`Input Field`** component (every variant) **MUST** have **all** properties from its nested **`_base Input Field`** instance exposed onto it. In Figma: select the main component/variant → **Properties** panel → **"Expose properties from → Nested instances"**. Without this, the `_base Input Field` properties stay buried inside the nested instance and designers cannot access them from the main component. This applies to **every** variant — see the dedicated "Expose Nested Instance Properties" step below for details.

A single-line text input with optional label, mandatory marker, prefix icon, suffix icon, and hint text. Follows the same wrapper pattern as Badge, Button, and File Picker.

---

## Component Hierarchy

```
Level 1 — _base Input Field        [COMPONENT — single base, not a Component Set]
Level 2 — Input Field              [COMPONENT_SET — wraps _base Input Field instances]
```

> ⚠️ `_base Input Field` is a **single COMPONENT** (not a Component Set). It holds the fixed structure and all Boolean properties. Each `Input Field` variant wraps exactly one `_base Input Field` instance and overrides only the `Input` frame stroke/fill and `Hint text` fill per state.

---

## Variant Properties

### Input Field

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Enabled` · `Focused` · `Filled` · `Disabled` · `Error` |

### `_base Input Field` Component Properties

| Property | Type | Default | Controls |
|---|---|---|---|
| `Show Label#411:8` | BOOLEAN | `true` | `Label` frame visibility |
| `Mandatory#509:0` | BOOLEAN | `true` | `*` asterisk visibility |
| `Show Prefix#411:3` | BOOLEAN | `true` | Leading `Icon` instance visibility |
| `Show Suffix#411:4` | BOOLEAN | `true` | Trailing `Icon` instance visibility |
| `Show Hint#411:91` | BOOLEAN | `true` | `Hint text` layer visibility |

---

## Component Structure

### Level 1 — `_base Input Field`

```
_base Input Field                  [COMPONENT · FIXED(320px) × HUG · Vertical AL]
  Gap:    spacing-xs (4px)         ← between Label · Input · Hint text
  Fill:   None
  │
  ├── Label                        [FRAME · FILL × HUG · Horizontal AL]
  │     Visible: Show Label boolean
  │     ├── Label                  [TEXT · HUG × HUG · Label sm/Medium]
  │     │     Fill: Component/Input Field/input-text-label
  │     │     Content: "Label"
  │     └── Label (*)              [TEXT · HUG × HUG · Label sm/Medium]
  │           Fill: Component/Input Field/input-text-critical
  │           Content: "*"
  │           Visible: Mandatory boolean
  │
  ├── Input                        [FRAME · FILL × FIXED(44px) · Horizontal AL · Center VA]
  │     Padding:  spacing-xl (12px) Left/Right only — no Top/Bottom padding
  │     Gap:      spacing-md (8px)
  │     Fill:     Component/Input Field/input-bg-primary
  │     Stroke:   Component/Input Field/input-border-enabled · 1px inside
  │     Radius:   radius-xl (all 4 corners)
  │     Clips content: true
  │     │
  │     ├── Icon (prefix)          [INSTANCE · Icon component · Size=16px]
  │     │     Visible: Show Prefix boolean
  │     │     Default icon: help-circle (swappable)
  │     │     Color: Icon VECTOR stroke → Icon/icon-secondary
  │     │
  │     ├── Content                [FRAME · FILL × HUG · Horizontal AL · Center VA · layoutGrow=1]
  │     │     Gap: spacing-md (8px)
  │     │     └── Text             [TEXT · FILL × HUG · Body sm/Medium · 1 line truncated]
  │     │           Fill: Component/Input Field/input-text-placeholder (Enabled/Focused)
  │     │                 Component/Input Field/input-text-enable (Filled state)
  │     │           Content: "Text" (placeholder) or actual value
  │     │
  │     └── Icon (suffix)          [INSTANCE · Icon component · Size=16px]
  │           Visible: Show Suffix boolean
  │           Default icon: help-circle (swappable)
  │           Color: Icon VECTOR stroke → Icon/icon-secondary
  │
  └── Hint text                    [TEXT · FILL × HUG · Label sm/Medium]
        Fill: Component/Input Field/input-text-helper (default)
              Component/Input Field/input-text-critical (Error state)
        Visible: Show Hint boolean
        Content: "This is a hint text to help user."
```

> ⚠️ **Input frame sizing:** The `Input` frame height is **FIXED at 44px** with **Center cross-axis alignment**. There is **no top/bottom padding** — the content is vertically centered by the Fixed height + CENTER alignment alone. Only `padding-left` and `padding-right` are set.

### Level 2 — `Input Field` Variant Structure

```
Input Field                        [COMPONENT_SET]
  │
  ├── State=Enabled                [COMPONENT — wrapper frame]
  │     └── _base Input Field      [INSTANCE — override Input stroke/fill per state]
  │
  ├── State=Focused                [COMPONENT — wrapper frame]
  │     └── _base Input Field      [INSTANCE — Input stroke = input-border-selected]
  │
  ├── State=Filled                 [COMPONENT — wrapper frame]
  │     └── _base Input Field      [INSTANCE — Text fill = input-text-enable]
  │
  ├── State=Disabled               [COMPONENT — wrapper frame]
  │     └── _base Input Field      [INSTANCE — Input fill = input-bg-disabled]
  │
  └── State=Error                  [COMPONENT — wrapper frame]
        └── _base Input Field      [INSTANCE — Input stroke = input-border-critical · Hint = critical]
```

### Layer Descriptions

| Layer | Type | Parent | Notes |
|---|---|---|---|
| `Label` (frame) | FRAME | `_base Input Field` | Horizontal AL · FILL × HUG · no gap · visibility = Show Label |
| `Label` (text) | TEXT | `Label` frame | HUG × HUG · `Label sm/Medium` |
| `*` (asterisk) | TEXT | `Label` frame | HUG × HUG · `Label sm/Medium` · visibility = Mandatory |
| `Input` | FRAME | `_base Input Field` | FILL × FIXED(44px) · Horizontal AL · Center VA · clips content |
| `Icon` (prefix) | INSTANCE | `Input` | Icon component · Size=16px · visibility = Show Prefix |
| `Content` | FRAME | `Input` | FILL × HUG · Horizontal AL · Center VA · layoutGrow=1 |
| `Text` | TEXT | `Content` | FILL × HUG · `Body sm/Medium` · truncated · 1 line max |
| `Icon` (suffix) | INSTANCE | `Input` | Icon component · Size=16px · visibility = Show Suffix |
| `Hint text` | TEXT | `_base Input Field` | FILL × HUG · `Label sm/Medium` · visibility = Show Hint |

---

## Attached Variables

### Spacing

| Property | Variable | Value | Target |
|---|---|---|---|
| Outer frame gap | `spacing-xs` | 4px | `_base Input Field` — gap between Label · Input · Hint text |
| Input padding Left | `spacing-xl` | 12px | `Input` frame |
| Input padding Right | `spacing-xl` | 12px | `Input` frame |
| Input padding Top | None | 0px | Height is FIXED 44px with CENTER alignment — no top padding |
| Input padding Bottom | None | 0px | Height is FIXED 44px with CENTER alignment — no bottom padding |
| Input gap | `spacing-md` | 8px | `Input` frame — gap between icon · content · icon |
| Content gap | `spacing-md` | 8px | `Content` frame |

> ⚠️ **Content frame gap flag:** The original Figma file uses an external library variable (`VariableID:1b216fc863b50e13587c77686509126da3c4feab/6425:51`) for the `Content` frame gap. When rebuilding, use the local `spacing-md` variable instead.

### Radius

| Property | Variable | Value |
|---|---|---|
| `Input` corner radius (all 4) | `radius-xl` | 12px |

### Typography

| Layer | Text Style | Font |
|---|---|---|
| `Label` (text) | `Label sm/Medium` | Inter · Medium 500 · 12px · 16px LH |
| `*` (asterisk) | `Label sm/Medium` | Inter · Medium 500 · 12px · 16px LH |
| `Text` (input value/placeholder) | `Body sm/Medium` | Inter · Medium 500 · 14px · 18px LH · truncated |
| `Hint text` | `Label sm/Medium` | Inter · Medium 500 · 12px · 16px LH |

> Apply text styles directly. Do not bind individual font variables.

### Colors — Per State

| State | `Input` Fill | `Input` Stroke | `Text` Fill | `Hint text` Fill |
|---|---|---|---|---|
| `Enabled` | `input-bg-primary` | `input-border-enabled` | `input-text-placeholder` | `input-text-helper` |
| `Focused` | `input-bg-primary` | `input-border-selected` | `input-text-enable` | `input-text-helper` |
| `Filled` | `input-bg-primary` | `input-border-enabled` | `input-text-enable` | `input-text-helper` |
| `Disabled` | `input-bg-disabled` | `input-border-disabled` | `input-text-disabled` | `input-text-helper` |
| `Error` | `input-bg-primary` | `input-border-critical` | `input-text-enable` | `input-text-critical` |

All variables are in the `Component/Input Field/` namespace inside the `Color Style` collection.

### Fixed Color Variables (same across all states)

| Layer | Variable | Usage |
|---|---|---|
| `Label` text | `Component/Input Field/input-text-label` | Label above the input |
| `*` asterisk | `Component/Input Field/input-text-critical` | Mandatory marker |
| `Icon` (prefix) VECTOR stroke | `Icon/icon-secondary` | Prefix icon color |
| `Icon` (suffix) VECTOR stroke | `Icon/icon-secondary` | Suffix icon color |

### Icon Color Override

> Both `Icon` (prefix) and `Icon` (suffix) use the Icon component at Size=16px. The color must be overridden on the **stroke** of the innermost `Icon [VECTOR]` layer.
>
> **Path:** `Icon [INSTANCE] → 16px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`
>
> Override the **Stroke** variable on the `Icon [VECTOR]` → `Icon/icon-secondary`
> Do NOT touch the fill. Do NOT apply color on any outer frame.

---

## States

### State Details

| State | Input stroke | Input fill | Text | Hint | Description |
|---|---|---|---|---|---|
| `Enabled` | `input-border-enabled` | `input-bg-primary` | `input-text-placeholder` | `input-text-helper` | Default resting state |
| `Focused` | `input-border-selected` (brand blue) | `input-bg-primary` | `input-text-enable` | `input-text-helper` | Active cursor / keyboard focus |
| `Filled` | `input-border-enabled` | `input-bg-primary` | `input-text-enable` | `input-text-helper` | User has typed a value |
| `Disabled` | `input-border-disabled` | `input-bg-disabled` | `input-text-disabled` | `input-text-helper` | Non-interactive |
| `Error` | `input-border-critical` (red) | `input-bg-primary` | `input-text-enable` | `input-text-critical` | Validation failed |

### What Changes Between States

| Property | Enabled | Focused | Filled | Disabled | Error |
|---|---|---|---|---|---|
| `Input` fill | `input-bg-primary` | `input-bg-primary` | `input-bg-primary` | `input-bg-disabled` | `input-bg-primary` |
| `Input` stroke | `input-border-enabled` | `input-border-selected` | `input-border-enabled` | `input-border-disabled` | `input-border-critical` |
| `Text` fill | `input-text-placeholder` | `input-text-enable` | `input-text-enable` | `input-text-disabled` | `input-text-enable` |
| `Hint text` fill | `input-text-helper` | `input-text-helper` | `input-text-helper` | `input-text-helper` | `input-text-critical` |

---

## Figma Construction Guide

### Step 1 — Build `_base Input Field`

1. Create a new **Frame**. Name it `_base Input Field`.
2. Apply **Vertical Auto Layout**. Set sizing to **FIXED width (320px) × HUG height**.
3. Bind gap → `spacing-xs` (4px).
4. No fill, no stroke on the outer frame.
5. Convert to a **Component**.

#### Label frame
1. Add a **Frame** inside. Name it `Label`.
2. Set to **Horizontal Auto Layout · FILL × HUG**.
3. No padding, no gap.
4. Add a **Text** layer inside. Name it `Label`. Content: "Label". Apply text style `Label sm/Medium`. Bind fill → `Component/Input Field/input-text-label`. Sizing: HUG × HUG.
5. Add a second **Text** layer. Name it `Label` (or `*`). Content: `*`. Apply text style `Label sm/Medium`. Bind fill → `Component/Input Field/input-text-critical`. Sizing: HUG × HUG.
6. Create **Boolean property**: `Mandatory` (default: `true`). Link to `*` layer visibility.
7. Create **Boolean property**: `Show Label` (default: `true`). Link to `Label` frame visibility.

#### Input frame
1. Add a **Frame** inside. Name it `Input`.
2. Set sizing to **FILL × FIXED (44px)**.
3. Apply **Horizontal Auto Layout**.
4. Set **cross-axis alignment to Center**.
5. Bind padding Left → `spacing-xl`. Bind padding Right → `spacing-xl`. **No top/bottom padding.**
6. Bind gap → `spacing-md`.
7. Bind fill → `Component/Input Field/input-bg-primary`.
8. Add stroke → 1px inside. Bind stroke → `Component/Input Field/input-border-enabled`.
9. Bind corner radius all 4 corners → `radius-xl`.
10. Set **Clips content = true**.

> ⚠️ **No top/bottom padding on the Input frame.** The 44px fixed height combined with CENTER cross-axis alignment centers the content vertically. Adding top/bottom padding will break the intended layout.

#### Icon (prefix)
1. Place an **Icon component** instance inside `Input`. Name it `Icon` (first child — leading).
2. Set `Size` property → `16px`.
3. Default icon: `help-circle` (swappable).
4. Enter `Icon [INSTANCE] → 16px [COMPONENT] → help-circle [COMPONENT] → Icon [VECTOR]`.
5. Override VECTOR **stroke** → `Icon/icon-secondary`.
6. Create **Instance Swap property**: `Prefix Icon`. Link to this instance.
7. Create **Boolean property**: `Show Prefix` (default: `true`). Link to instance visibility.

#### Content frame
1. Add a **Frame** inside `Input`. Name it `Content`.
2. Set to **Horizontal Auto Layout · FILL × HUG · Center cross-axis · layoutGrow=1**.
3. Bind gap → `spacing-md`.
4. No fill, no stroke.

#### Text (placeholder/value)
1. Add a **Text** layer inside `Content`. Name it `Text`.
2. Content: "Text". Apply text style `Body sm/Medium`.
3. Set sizing: **FILL × HUG**. Set text truncation: **ENDING**. Set maxLines: **1**.
4. Bind fill → `Component/Input Field/input-text-placeholder` (default — Enabled/Focused state).
5. `layoutGrow = 1`.

#### Icon (suffix)
1. Place an **Icon component** instance inside `Input`. Name it `Icon` (last child — trailing).
2. Set `Size` property → `16px`. Default icon: `help-circle` (swappable).
3. Enter the VECTOR path. Override VECTOR **stroke** → `Icon/icon-secondary`.
4. Create **Instance Swap property**: `Suffix Icon`. Link to this instance.
5. Create **Boolean property**: `Show Suffix` (default: `true`). Link to instance visibility.

#### Hint text
1. Add a **Text** layer at the bottom of the outer frame. Name it `Hint text`.
2. Content: "This is a hint text to help user." Apply text style `Label sm/Medium`.
3. Sizing: **FILL × HUG**.
4. Bind fill → `Component/Input Field/input-text-helper`.
5. Create **Boolean property**: `Show Hint` (default: `true`). Link to layer visibility.

### Step 2 — Build `Input Field` Variants

> ⚠️ **Wrapper pattern — same as Badge and Button.** Each variant is a wrapper COMPONENT containing exactly one `_base Input Field` instance.

**For each of the 5 states:**

1. Create an empty **Frame**. Name it `State=Enabled` (adjust per state).
2. Place an instance of `_base Input Field` inside. Set to **FILL × HUG**.
3. Convert to a **Component**.

**Per-variant overrides on the `_base Input Field` instance:**

| State | `Input` stroke override | `Input` fill override | `Text` fill override | `Hint text` fill override |
|---|---|---|---|---|
| `Enabled` | `input-border-enabled` | `input-bg-primary` | `input-text-placeholder` | `input-text-helper` |
| `Focused` | `input-border-selected` | `input-bg-primary` | **`input-text-enable`** | `input-text-helper` |
| `Filled` | `input-border-enabled` | `input-bg-primary` | **`input-text-enable`** | `input-text-helper` |
| `Disabled` | `input-border-disabled` | **`input-bg-disabled`** | **`input-text-disabled`** | `input-text-helper` |
| `Error` | **`input-border-critical`** | `input-bg-primary` | **`input-text-enable`** | **`input-text-critical`** |

> **Filled, Focused, Error states:** Override the `Text` layer fill to `Component/Input Field/input-text-enable` — these states show active/entered text color.
> **Disabled state:** Override the `Text` layer fill to `Component/Input Field/input-text-disabled`.
> **Enabled state only:** Use `input-text-placeholder` for the grey placeholder appearance.

4. Select all 5 variant components. Combine into a **Component Set** named `Input Field`.
5. Add variant property `State` → options: `Enabled`, `Focused`, `Filled`, `Disabled`, `Error`.

### Step 3 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — Mandatory.**

1. Select each `Input Field` variant COMPONENT frame.
2. Properties panel → **"Expose properties from Nested instances"**.
3. Properties that surface: `Show Label`, `Mandatory`, `Show Prefix`, `Show Suffix`, `Show Hint`, `Prefix Icon`, `Suffix Icon`.

### Step 4 — Variable Attachment Locations

| Target | Property | Variable |
|---|---|---|
| `_base Input Field` outer frame | Gap | `spacing-xs` |
| `Input` frame | Fill | `Component/Input Field/input-bg-primary` (default) |
| `Input` frame | Stroke color | `Component/Input Field/input-border-enabled` (default) |
| `Input` frame | Stroke weight | 1px (hardcoded) |
| `Input` frame | Padding Left/Right | `spacing-xl` |
| `Input` frame | Gap | `spacing-md` |
| `Input` frame | Corner radius (all 4) | `radius-xl` |
| `Content` frame | Gap | `spacing-md` |
| `Label` (text layer) | Fill | `Component/Input Field/input-text-label` |
| `Label` (text layer) | Text Style | `Label sm/Medium` |
| `*` (asterisk) | Fill | `Component/Input Field/input-text-critical` |
| `*` (asterisk) | Text Style | `Label sm/Medium` |
| `Text` (placeholder/value) | Fill | `input-text-placeholder` (Enabled) · `input-text-enable` (Focused · Filled · Error) · `input-text-disabled` (Disabled) |
| `Text` (placeholder/value) | Text Style | `Body sm/Medium` |
| `Hint text` | Fill | `input-text-helper` (default) · `input-text-critical` (Error) |
| `Hint text` | Text Style | `Label sm/Medium` |
| `Icon` (prefix) VECTOR | Stroke | `Icon/icon-secondary` |
| `Icon` (suffix) VECTOR | Stroke | `Icon/icon-secondary` |

### Step 5 — Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Base component | `_base Input Field` | `_base Input Field` |
| Component Set | `Input Field` | `Input Field` |
| Variant | `State=[State]` | `State=Enabled` |
| Label wrapper frame | `Label` | `Label` |
| Label text layer | `Label` | `Label` |
| Mandatory marker | `*` or `Label` (asterisk) | `*` |
| Input frame | `Input` | `Input` |
| Content frame | `Content` | `Content` |
| Text layer | `Text` | `Text` |
| Prefix icon | `Icon` (first child of Input) | `Icon` |
| Suffix icon | `Icon` (last child of Input) | `Icon` |
| Hint text | `Hint text` | `Hint text` |

---

## Mandatory Rules

- **Never use `_Primitives` variables directly.** All colors must come from `Component/Input Field/` namespace in the `Color Style` collection.
- **No top/bottom padding on the `Input` frame.** Height is FIXED 44px. Cross-axis alignment is CENTER. Do not add padding top/bottom — it will shift the content.
- **`_base Input Field` is a single COMPONENT, not a Component Set.** Do not create a Component Set from the base.
- **Wrapper pattern applies.** Each `Input Field` variant wraps one `_base Input Field` instance. Do not modify the base structure per variant — only override the relevant fill/stroke/color variables.
- **`Text` layer fill per state:** `Enabled` = `input-text-placeholder` · `Focused/Filled/Error` = `input-text-enable` · `Disabled` = `input-text-disabled`.
- **`Error` state changes two things:** Input stroke → `input-border-critical` AND Hint text fill → `input-text-critical`.
- **Icon color = STROKE on the `Icon [VECTOR]`**, not fill. Path: `Icon [INSTANCE] → 16px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`.
- **Text style only — no individual font variable bindings.**
- **Expose nested properties** on all `Input Field` variant wrapper frames.
- **`Content` frame gap uses `spacing-md`** locally. Do not bind to external library variables.

---

## Flags

### ⚠️ 1 — Content frame gap uses external library variable
The original `Content` frame gap is bound to `VariableID:1b216fc863b50e13587c77686509126da3c4feab/6425:51` — an external library variable. When rebuilding, use `spacing-md` (8px) as the local equivalent.

---

## Figma Component Page — Arrangement

```
┌────────────────────────────────────────────────────────────┐
│  INPUT FIELD COMPONENT SYSTEM      ← small caps label      │
│  Input Field                       ← large bold title      │
│  5 states · Enabled · Focused · Filled · Disabled · Error  │
│  Label · Mandatory · Prefix · Suffix · Hint                │
│  ─────────────────────────────────  ← divider              │
│                                                             │
│  ▌ _base Input Field — Base Component                      │
│    All 5 Boolean properties · 320px fixed                  │
│                                                             │
│    [ actual _base Input Field COMPONENT ]                  │
│                                                             │
│  ▌ Input Field — All 5 States                              │
│    State property · All Component/Input Field variables     │
│                                                             │
│    [ actual Input Field COMPONENT_SET ]                    │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Header Block

| Element | Content |
|---|---|
| System label | `INPUT FIELD COMPONENT SYSTEM` |
| Title | `Input Field` |
| Summary tagline | `5 states · Enabled · Focused · Filled · Disabled · Error · Label · Mandatory · Prefix Icon · Suffix Icon · Hint Text` |

### Section 1 — Base Component

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar |
| Section title | `_base Input Field — Base Component` |
| Subtitle | `5 Boolean properties · FIXED 320px · 44px Input · spacing-xl padding · radius-xl` |
| Content | Place actual `_base Input Field` COMPONENT directly |

### Section 2 — All Variants

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar |
| Section title | `Input Field — All 5 States` |
| Subtitle | `State property · Enabled · Focused · Filled · Disabled · Error · Component/Input Field variables` |
| Content | Place actual `Input Field` COMPONENT_SET directly |