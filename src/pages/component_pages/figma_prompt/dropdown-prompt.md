# Dropdown

## Overview

| Property | Value |
|---|---|
| Component Name | Dropdown |
| Components in System | `_base dropdown list` · `Dropdown list` · `_base Dropdown` · `Dropdown` |
| Node — `_base Dropdown` | `411:12284` |
| Node — `Dropdown` | `411:21235` |
| Node — `_base dropdown list` | `411:12534` |
| Node — `Dropdown list` | `411:15672` |
| Dropdown Variants | 6 (State) |
| Dropdown list Variants | 5 (Count) |
| `_base dropdown list` Variants | 4 (With checkbox) |

The Dropdown is a four-component system. Build order must be followed: `_base dropdown list` first, then `Dropdown list`, then `_base Dropdown`, then `Dropdown`.

---

## Component Hierarchy

```
Level 1a — _base dropdown list    [COMPONENT_SET]
  ├── With checkbox=Checkbox
  ├── With checkbox=Selected Checkbox
  ├── With checkbox=Single Selection
  └── With checkbox=Selected

Level 1b — _base Dropdown         [COMPONENT]
  (uses Dropdown list internally)

Level 2a — Dropdown list           [COMPONENT_SET]
  ├── Count=1
  ├── Count=2
  ├── Count=3
  ├── Count=4
  └── Count=6

Level 2b — Dropdown                [COMPONENT_SET]
  ├── State=Enabled
  ├── State=Selected
  ├── State=Selected Options
  ├── State=Open
  ├── State=Error
  └── State=Disabled
```

> ⚠️ **Build order is mandatory.** `_base dropdown list` must exist before `Dropdown list`. `Dropdown list` must exist before `_base Dropdown`. `_base Dropdown` must exist before `Dropdown`.

---

## Variant Properties

### `_base dropdown list` — `With checkbox` (4 options)

| Variant | Description |
|---|---|
| `Checkbox` | Unselected checkbox (from Checkbox component) on trailing edge |
| `Selected Checkbox` | Selected checkbox (from Checkbox component) on trailing edge |
| `Single Selection` | No checkbox — prefix icon + text only |
| `Selected` | Highlighted row with `Background/bg-brand_light` fill + trailing tick icon |

### `Dropdown list` — `Count` (5 options)

| Count | Height | Notes |
|---|---|---|
| `1` | 40px | Single item |
| `2` | 80px | Two items |
| `3` | 120px | Three items |
| `4` | 160px | Four items |
| `6` | 268px | Six items + search bar at top + scrollbar |

### `Dropdown` — `State` (6 options)

| State | Description |
|---|---|
| `Enabled` | Default empty state — placeholder text visible |
| `Selected` | A single value has been selected — value text shown in Input |
| `Selected Options` | Multi-select mode — selected Badge pills shown below Input |
| `Open` | Dropdown panel visible — Input border changes to brand blue · arrow flips up |
| `Error` | Validation error — red border · hint text turns red |
| `Disabled` | Non-interactive — muted fill and border |

---

## Component Structure

### Level 1a — `_base dropdown list`

Each list item row is 40px tall with a consistent horizontal layout.

```
_base dropdown list                    [COMPONENT_SET]
  │
  ├── With checkbox=Checkbox           [COMPONENT]
  │     Auto Layout:   Horizontal · FIXED width × FIXED height (40px)
  │     Padding L/R:   spacing-xl (12px)
  │     Gap:           spacing-md (8px)
  │     Fill:          Component/Input Field/input-bg-primary
  │     Stroke:        Component/Input Field/input-border-enabled · **bottom only** · 1px
  │     │
  │     ├── Icon                       [INSTANCE — Icon component · 16px · Show Prefix boolean]
  │     ├── Text                       [TEXT — FILL × HUG — Body md/Medium]
  │     │     Fill: Component/Input Field/input-text-enable
  │     └── Checkbox                   [INSTANCE — Checkbox component · Checked=Enabled · Label=false]
  │
  ├── With checkbox=Selected Checkbox  [COMPONENT]
  │     Same as Checkbox but:
  │     └── Checkbox                   [INSTANCE — Checkbox component · Checked=Selected · Label=false]
  │
  ├── With checkbox=Single Selection   [COMPONENT]
  │     Same structure — no Checkbox instance on trailing edge
  │     └── (no trailing element)
  │
  └── With checkbox=Selected           [COMPONENT]
        Fill:   Background/bg-brand_light  ← row is highlighted
        └── Icon                       [INSTANCE — Icon component · 20px · vuesax/bold/tick-circle]
              (trailing tick icon — indicates the currently selected row)
```

### Level 2a — `Dropdown list`

The floating dropdown panel. Contains N stacked `_base dropdown list` instances inside a wrapper frame.

```
Dropdown list                          [COMPONENT_SET]
  │
  ├── Count=1 / 2 / 3 / 4             [COMPONENT]
  │     Auto Layout:   Vertical · FIXED width × HUG height
  │     Fill:          Component/Input Field/input-bg-primary
  │     Stroke:        Component/Input Field/input-border-enabled · 1px inside
  │     Radius:        radius-xl (all corners)
  │     Shadow:        DROP_SHADOW · offset (0, 2) · radius 20 · rgba(62%, 61%, 61%, 8%)
  │     │
  │     └── Frame 3465903              [FRAME — FILL × HUG — Vertical AL — no padding]
  │           └── _base dropdown list  [INSTANCE × N — With checkbox=Single Selection]
  │
  └── Count=6                          [COMPONENT]
        Same container structure plus, inside Frame 3465903:
        ├── Input component             [INSTANCE — Input component · at top of list]
        │     Show Label:  false (no label above input)
        │     Show Hint:   false
        │     Show Prefix: true · Prefix icon = search icon
        │     Show Suffix: false
        │     Padding:     spacing-xl (12px) all sides
        │     (Reuses the existing Input/Dropdown input component)
        └── Scroll bar                  [INSTANCE — Scroll bar component · trailing edge]
              Length: 75% (default)
              Width:  HUG (14px)
              Height: FILL (stretches to full list height)
```

### Level 1b — `_base Dropdown`

The trigger input field with label, hint, badge pills, and embedded dropdown panel.

```
_base Dropdown                         [COMPONENT — Vertical AL · FIXED(320px) × HUG]
  Gap: spacing-xs (4px)
  Fill: None (transparent outer wrapper)
  │
  ├── Label                            [FRAME — Horizontal AL · FILL × HUG]
  │     Visible: Show Label boolean
  │     ├── Label                      [TEXT — "Label" — Label sm/Medium]
  │     │     Fill: Component/Input Field/input-text-label
  │     └── *                          [TEXT — "*" — Label sm/Medium]
  │           Fill: Component/Input Field/input-text-critical
  │           Visible: Mandatory boolean
  │
  ├── Input                            [FRAME — Horizontal AL · FILL × FIXED(44px)]
  │     Padding L/R: spacing-xl (12px)
  │     Gap:         spacing-md (8px)
  │     Fill:        Component/Input Field/input-bg-primary
  │     Stroke:      1px inside (color varies per state — see table)
  │     Radius:      radius-xl (all corners)
  │     │
  │     ├── Icon                       [INSTANCE — Icon component · 16px · Show Prefix boolean]
  │     ├── Content                    [FRAME — FILL × HUG · Horizontal AL · spacing-md gap]
  │     │     └── Text                 [TEXT — "Select" — Body md/Medium · FILL × HUG]
  │     │           Fill: `input-text-placeholder` (Enabled only)
  │     │                 `input-text-enabled` (Selected · Selected Options · Open · Error)
  │     │                 `input-text-disabled` (Disabled)
  │     └── Icon                       [INSTANCE — Icon component · 16px · Show Suffix boolean]
  │           Default: arrow-down · Open state: arrow-up
  │
  ├── Hint text                        [TEXT — FILL × HUG — Label sm/Medium]
  │     Fill: Component/Input Field/input-text-helper (default)
  │           Component/Input Field/input-text-critical (Error state)
  │     Visible: Show Hint boolean
  │
  ├── Selected Options                 [FRAME — WRAP AL · FILL × HUG]
  │     Gap and wrap gap: spacing-sm (6px)
  │     Visible: Selected Options state only
  │     └── Badge                      [INSTANCE — Badge component · Tertiary · Gray]
  │           Multiple Badge instances represent selected values in multi-select mode
  │           Uses existing Badge component (see Badge documentation)
  │
  └── Dropdown list                    [INSTANCE — ABSOLUTE positioned]
        Position: below Input · width matches Input
        Fill: Component/Input Field/input-bg-primary
        Stroke: Component/Input Field/input-border-enabled · 1px inside
        Radius: radius-xl
        Shadow: DROP_SHADOW · offset (0, 2) · radius 20 · rgba(62%, 61%, 61%, 8%)
        Visible: Open state only
        Count: 2 (default)
```

### Level 2b — `Dropdown` Variant Structure

Each `Dropdown` variant is a wrapper COMPONENT containing one `_base Dropdown` instance. Only the Input stroke color, Input fill, and hint text color change between variants.

```
Dropdown                               [COMPONENT_SET]
  │
  └── State=Enabled                    [COMPONENT — variant wrapper]
        └── _base Dropdown             [INSTANCE — override variables per state]
```

---

## Attached Variables

### Spacing

| Layer | Property | Variable | Value |
|---|---|---|---|
| `_base Dropdown` outer frame | Gap (Label ↔ Input ↔ Hint) | `spacing-xs` | 4px |
| `Input` frame | Padding Left | `spacing-xl` | 12px |
| `Input` frame | Padding Right | `spacing-xl` | 12px |
| `Input` frame | Gap (icon ↔ content ↔ icon) | `spacing-md` | 8px |
| `Content` frame | Gap | `spacing-md` | 8px |
| `Selected Options` frame | Gap (horizontal) | `spacing-sm` | 6px |
| `Selected Options` frame | Wrap gap (vertical) | `spacing-sm` | 6px |
| `_base dropdown list` | Padding Left | `spacing-xl` | 12px |
| `_base dropdown list` | Padding Right | `spacing-xl` | 12px |
| `_base dropdown list` | Gap (icon ↔ text ↔ checkbox) | `spacing-md` | 8px |
| `Count=6` search bar | Padding all sides | `spacing-xl` | 12px |

### Radius

| Layer | Variable | Value |
|---|---|---|
| `Input` frame (all 4 corners) | `radius-xl` | 12px |
| `Dropdown list` container (all 4 corners) | `radius-xl` | 12px |

### Typography

| Layer | Text Style | Font |
|---|---|---|
| `Label` text | `Label sm/Medium` | Inter · Medium (500) · 12px · 16px LH |
| `*` mandatory marker | `Label sm/Medium` | Inter · Medium (500) · 12px · 16px LH |
| `Text` (Input placeholder/value) | `Body md/Medium` | Inter · Medium (500) · 14px · 18px LH |
| `Hint text` | `Label sm/Medium` | Inter · Medium (500) · 12px · 16px LH |
| `_base dropdown list` → `Text` | `Body md/Medium` | Inter · Medium (500) · 14px · 18px LH |

> Apply text styles directly. Do not bind individual font variables.

### Colors — `Dropdown` per State

| State | Input Fill | Input Stroke | Hint Text Fill | Content `Text` Fill |
|---|---|---|---|---|
| `Enabled` | `input-bg-primary` | `input-border-enabled` | `input-text-helper` | `input-text-placeholder` |
| `Selected` | `input-bg-primary` | `input-border-enabled` | `input-text-helper` | `input-text-enabled` |
| `Selected Options` | `input-bg-primary` | `input-border-enabled` | `input-text-helper` | `input-text-enabled` |
| `Open` | `input-bg-primary` | `input-border-selected` | `input-text-helper` | `input-text-enabled` |
| `Error` | `input-bg-primary` | `input-border-critical` | `input-text-critical` | `input-text-enabled` |
| `Disabled` | `input-bg-disabled` | `input-border-disabled` | `input-text-helper` | `input-text-disabled` |

> All variables use the `Component/Input Field/` namespace prefix.

### Colors — `_base dropdown list` per Variant

| Variant | Row Fill | Row Stroke | Text Fill |
|---|---|---|---|
| `Checkbox` | `Component/Input Field/input-bg-primary` | `Component/Input Field/input-border-enabled` **(bottom only)** | `Component/Input Field/input-text-enable` |
| `Selected Checkbox` | `Component/Input Field/input-bg-primary` | `Component/Input Field/input-border-enabled` **(bottom only)** | `Component/Input Field/input-text-enable` |
| `Single Selection` | `Component/Input Field/input-bg-primary` | `Component/Input Field/input-border-enabled` **(bottom only)** | `Component/Input Field/input-text-enable` |
| `Selected` | `Background/bg-brand_light` | `Component/Input Field/input-border-enabled` **(bottom only)** | `Component/Input Field/input-text-enable` |

### Colors — Other Text Layers

| Layer | Variable |
|---|---|
| `Label` text | `Component/Input Field/input-text-label` |
| `*` mandatory asterisk | `Component/Input Field/input-text-critical` |
| `Text` (Enabled — placeholder) | `Component/Input Field/input-text-placeholder` |
| `Text` (Selected · Selected Options · Open · Error) | `Component/Input Field/input-text-enable` |
| `Text` (Disabled) | `Component/Input Field/input-text-disabled` |
| `Hint text` (default) | `Component/Input Field/input-text-helper` |
| `Hint text` (Error) | `Component/Input Field/input-text-critical` |

### Shadow

| Component | Effect | Value |
|---|---|---|
| `Dropdown list` container | DROP_SHADOW | Offset (0, 2) · Radius 20 · Color rgba(62%, 61%, 61%, 8%) · Behind node: false |

---

## Nested Components

This component system reuses two previously documented components. Do not recreate them — place instances.

### Badge (in `Selected Options`)

The `Selected Options` frame uses **Badge component** instances to display selected values in multi-select mode.

| Property | Value |
|---|---|
| Component | `Badge` (see Badge documentation) |
| Default Type | `Tertiary` |
| Default Color | `Gray` |
| Show Dot | `false` |
| Show Suffix | `true` (close/x icon to remove selection) |
| Layout | Wrapping horizontal — multiple badges flow left to right, wrap to next line |

### Checkbox (in `_base dropdown list`)

The `_base dropdown list` variants `Checkbox` and `Selected Checkbox` use the **Checkbox component**.

| Property | Value |
|---|---|
| Component | `Checkbox` (see Checkbox documentation) |
| `Label` property | `false` — label text hidden, checkbox box only |
| `Checked` (Checkbox variant) | `Enabled` (unselected row) |
| `Checked` (Selected Checkbox variant) | `Selected` (selected row) |
| Placement | Trailing (rightmost child in the row) |

### Scroll bar (in `Dropdown list` — `Count=6`)

The `Count=6` Dropdown list variant includes a **Scroll bar component** on its trailing edge to indicate scrollable content.

| Property | Value |
|---|---|
| Component | `Scroll bar` (node `42:15901`) |
| Variant property | `Length` → `25%` · `50%` · `75%` |
| Default | `Length=75%` |
| Width | 14px (HUG) |
| Height | FILL — stretches to match the full list height |
| Padding all sides | `spacing-xs` (4px) — `VariableID:411:5742` |
| Inner structure | `Scroll bar` FRAME (FILL × FILL) → `Bar` RECTANGLE |
| `Bar` fill | `Component/Input Field/input-bg-disabled` |
| `Bar` corner radius | `radius-full` (9999) |
| Placement | Trailing edge — rightmost child of the `Count=6` outer frame |

> The `Count=6` container must use **Horizontal Auto Layout** to place the item list (FILL × HUG) and the Scroll bar (HUG × FILL) side by side. All other Count variants use Vertical AL.

---

### Icon component (prefix and suffix)

Both icon slots use the **Icon component** at Size=16px.

| Slot | Default Icon | Toggleable |
|---|---|---|
| Prefix icon (`Icon` — leading) | Any — swappable | Yes — `Show Prefix` Boolean |
| Suffix icon (`Icon` — trailing) | `arrow-down` (closed) · `arrow-up` (open) | Yes — `Show Suffix` Boolean |

> The suffix icon **must be swapped manually** between states: `arrow-down` for all closed states, `arrow-up` for the Open state. This is a state override, not a Boolean toggle.

---

## States

### `Dropdown` State Details

| State | Input Stroke | Suffix Icon | Dropdown list | Content text |
|---|---|---|---|---|
| `Enabled` | `input-border-enabled` | arrow-down | Hidden | Placeholder |
| `Selected` | `input-border-enabled` | arrow-down | Hidden | Value text |
| `Selected Options` | `input-border-enabled` | arrow-down | Hidden | Placeholder · Badge pills below Input |
| `Open` | `input-border-selected` | arrow-up | **Visible** | Placeholder or value |
| `Error` | `input-border-critical` | arrow-down | Hidden | Placeholder or value |
| `Disabled` | `input-border-disabled` | arrow-down | Hidden | Placeholder |

### `_base dropdown list` — Checkbox state mapping

| `With checkbox` variant | Embedded Checkbox `Checked` property |
|---|---|
| `Checkbox` | `Enabled` |
| `Selected Checkbox` | `Selected` |
| `Single Selection` | No Checkbox instance |
| `Selected` | No Checkbox instance — tick Icon instead |

---

## Figma Construction Guide

### Step 1 — Build `_base dropdown list` — `With checkbox=Single Selection`

This is the foundational row. Build it first as all other list item variants extend from it.

1. Create a new **Frame**. Name it `With checkbox=Single Selection`.
2. Apply **Horizontal Auto Layout**. Set sizing to **FIXED width × FIXED height (40px)**.
3. Set cross-axis alignment to **Center**.
4. Bind padding Left/Right → `spacing-xl`.
5. Bind gap → `spacing-md`.
6. Bind fill → `Component/Input Field/input-bg-primary`.
7. Add stroke → **1px, bottom side only**. Bind stroke color → `Component/Input Field/input-border-enabled`.
   > ⚠️ Apply stroke on the **bottom edge only** (not all sides). In Figma, use individual stroke settings: Top=0, Left=0, Right=0, Bottom=1.
8. Convert to a **Component**.

#### Icon (prefix)
1. Place an instance of the **Icon component** (Size=16px). Name it `Icon`.
2. Position as the first child (leading).
3. Create an **Instance Swap component property**: `Prefix Icon`.
4. Create a **Boolean component property**: `Show Prefix` (default: `true`). Link to layer visibility.

#### Text
1. Add a **Text** layer. Name it `Text`. Set sizing to **FILL × HUG**.
2. Set default content to `Select`.
3. Apply text style **`Body md/Medium`**.
4. Bind fill → `Component/Input Field/input-text-enable`.

### Step 2 — Build Remaining `_base dropdown list` Variants

#### `With checkbox=Checkbox`
1. Duplicate `Single Selection`. Rename to `With checkbox=Checkbox`.
2. Add a **Checkbox component** instance as the last child (trailing).
3. Set Checkbox `Label` → `false`.
4. Set Checkbox `Checked` → `Enabled`.
5. Create an **Instance Swap component property**: `Checkbox Instance`. Link to this instance.

#### `With checkbox=Selected Checkbox`
1. Duplicate `With checkbox=Checkbox`. Rename to `With checkbox=Selected Checkbox`.
2. On the Checkbox instance: change `Checked` → `Selected`.

#### `With checkbox=Selected`
1. Duplicate `Single Selection`. Rename to `With checkbox=Selected`.
2. Change frame fill → `Background/bg-brand_light`.
3. Add an **Icon component** instance (Size=20px) as the last child (trailing).
4. Set icon instance → `vuesax/bold/tick-circle`.

### Step 3 — Combine into `_base dropdown list` Component Set

1. Select all 4 variants.
2. Combine into **Component Set**. Name it `_base dropdown list`.
3. Add variant property `With checkbox` → options: `Checkbox`, `Selected Checkbox`, `Single Selection`, `Selected`.
4. Add Boolean property `Show Prefix` (default: `true`).

### Step 4 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — Mandatory step.**

1. Select each variant COMPONENT frame.
2. Properties panel → **"Expose properties from Nested instances"**.
3. The `Checked`, `Label`, and `Prefix Icon` properties surface from nested instances.

### Step 5 — Build `Dropdown list` Variants

**For Count=1, 2, 3, 4:**

1. Create a new **Frame** for the container. Name it `Count=N`.
2. Apply **Vertical Auto Layout**. Set sizing to **FIXED width × HUG height**.
3. Bind fill → `Component/Input Field/input-bg-primary`.
4. Add stroke → 1px inside. Bind stroke → `Component/Input Field/input-border-enabled`.
5. Bind corner radius all 4 → `radius-xl`.
6. Add **DROP_SHADOW** effect: offset (0, 2), radius 20, color rgba(62%, 61%, 61%, 8%), show behind: false.
7. Set `clips content = true`.
8. Create an inner **Frame** inside. Name it `Frame 3465903`. Set to **Vertical AL · FILL × HUG**.
9. Place N instances of `_base dropdown list` (With checkbox=Single Selection) inside `Frame 3465903`.
10. Convert outer frame to **Component**.

**For Count=6:**
Same outer container as Count=4, plus inside `Frame 3465903`:

1. **Add an Input component instance at the top** (before the list items):
   - Use the existing **Input component** (from `_base Dropdown`/Input field design system)
   - Set `Show Label = false` — no label above the field
   - Set `Show Hint = false`
   - Set `Show Prefix = true` → set prefix icon to the **search icon**
   - Set `Show Suffix = false`
   - Set padding **`spacing-xl` on all four sides** (Top, Bottom, Left, Right)
   - This Input instance is the search/filter field at the top of the list

2. **Add a Scroll bar component instance on the trailing edge** of the `Count=6` outer frame:
   - Component: **`Scroll bar`** (node `42:15901`)
   - Set `Length` property → `75%` (default)
   - Sizing: **HUG width (14px) × FILL height** — it stretches to the full height of the list
   - Position: trailing (rightmost child of the outer horizontal frame)
   - The outer `Count=6` frame must be **Horizontal AL** to accommodate both the list column and the scrollbar side by side

### Step 6 — Combine into `Dropdown list` Component Set

1. Select all 5 Count variants.
2. Combine into **Component Set**. Name it `Dropdown list`.
3. Add variant property `Count` → options: `1`, `2`, `3`, `4`, `6`.

### Step 7 — Build `_base Dropdown`

1. Create a new **Frame**. Name it `_base Dropdown`.
2. Apply **Vertical Auto Layout**. Set sizing to **FIXED width (320px) × HUG height**.
3. Bind gap → `spacing-xs`.
4. No fill, no stroke on the outer frame.
5. Convert to a **Component**.

#### Label frame
1. Create a **Frame** inside. Name it `Label`. Set to **Horizontal AL · FILL × HUG**. No padding or gap.
2. Add a **Text** layer inside. Name it `Label`. Apply style `Label sm/Medium`. Bind fill → `Component/Input Field/input-text-label`. Set sizing to HUG.
3. Add a second **Text** layer. Name it `*`. Content = `*`. Apply style `Label sm/Medium`. Bind fill → `Component/Input Field/input-text-critical`.
4. Create Boolean property `Mandatory` (default: `true`). Link to `*` visibility.
5. Create Boolean property `Show Label` (default: `true`). Link to `Label` frame visibility.

#### Input frame
1. Create a **Frame** inside. Name it `Input`. Set sizing to **FILL × FIXED (44px)**.
2. Apply **Horizontal Auto Layout**. Center cross-axis alignment.
3. Bind padding Left/Right → `spacing-xl`. Bind gap → `spacing-md`.
4. Bind fill → `Component/Input Field/input-bg-primary`.
5. Add stroke → 1px inside. Bind stroke → `Component/Input Field/input-border-enabled` (default).
6. Bind corner radius all 4 → `radius-xl`.
7. Set `clips content = true`.

Inside `Input`:
- **Prefix Icon**: Icon component instance (Size=16px). Create Instance Swap `Prefix Icon`. Create Boolean `Show Prefix` (default: `true`).
- **Content frame**: FILL × HUG · Horizontal AL · `spacing-md` gap. Inside: `Text` layer (Body md/Medium · FILL × HUG · default fill = `input-text-placeholder`). Override per state: `input-text-enabled` for Selected/Selected Options/Open/Error · `input-text-disabled` for Disabled.
- **Suffix Icon**: Icon component instance (Size=16px) at trailing position. Default instance = `arrow-down`. Create Instance Swap `Suffix Icon`. Create Boolean `Show Suffix` (default: `true`).

#### Hint text
1. Add a **Text** layer. Name it `Hint text`. Apply style `Label sm/Medium`. Sizing: FILL × HUG.
2. Bind fill → `Component/Input Field/input-text-helper`.
3. Set default content to `This is a hint text to help user.`
4. Create Boolean property `Show Hint` (default: `true`). Link to layer visibility.

#### Selected Options frame
1. Create a **Frame** inside. Name it `Selected Options`.
2. Set to **Horizontal Wrap Auto Layout** (`layoutWrap: WRAP`). Sizing: FILL × HUG.
3. Bind gap (horizontal and wrap/vertical) → `spacing-sm`.
4. No fill, no stroke.
5. Add **Badge component** instances (from the Badge component set) with these overrides:
   - Type = `Tertiary` · Color = `Gray` · Show Dot = `false` · Show Suffix = `true`
6. This frame is hidden in all states except `Selected Options`.

#### Dropdown list instance
1. Place an instance of **`Dropdown list`** (Count=2) inside `_base Dropdown`.
2. Set its **positioning to ABSOLUTE** (not Auto Layout child).
3. Position it to appear directly below the `Input` frame.
4. Set sizing: **FILL width (stretch to match parent) × HUG height**.
5. This instance is hidden in all states except `Open`.

### Step 8 — Build `Dropdown` Variants

> ⚠️ **Do NOT duplicate `_base Dropdown` directly as a variant.** Create a wrapper frame, place an instance of `_base Dropdown` inside, then convert to a Component.

**For each of the 6 states:**

1. Create an empty **Frame**. Name it `State=Enabled` (adjust per state).
2. Place an instance of `_base Dropdown` inside. Set to **FILL × HUG**.
3. Convert to **Component**.
4. Combine all 6 into a **Component Set** named `Dropdown`.
5. Add variant property `State` → options: `Enabled`, `Selected`, `Selected Options`, `Open`, `Error`, `Disabled`.

**Per-variant overrides on the `_base Dropdown` instance:**

| State | Input stroke override | Input fill override | Hint fill override | Dropdown list | Suffix icon | Selected Options | Content `Text` fill |
|---|---|---|---|---|---|---|
| `Enabled` | `input-border-enabled` | `input-bg-primary` | `input-text-helper` | Hidden | arrow-down | Hidden | `input-text-placeholder` |
| `Selected` | `input-border-enabled` | `input-bg-primary` | `input-text-helper` | Hidden | arrow-down | Hidden | `input-text-enabled` |
| `Selected Options` | `input-border-enabled` | `input-bg-primary` | `input-text-helper` | Hidden | arrow-down | **Visible** | `input-text-enabled` |
| `Open` | `input-border-selected` | `input-bg-primary` | `input-text-helper` | **Visible** | **arrow-up** | Hidden | `input-text-enabled` |
| `Error` | `input-border-critical` | `input-bg-primary` | `input-text-critical` | Hidden | arrow-down | Hidden | `input-text-enabled` |
| `Disabled` | `input-border-disabled` | `input-bg-disabled` | `input-text-helper` | Hidden | arrow-down | Hidden | `input-text-disabled` |

### Step 9 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — Mandatory on both `_base Dropdown` and `Dropdown` variants.**

1. Select each `Dropdown` variant COMPONENT frame.
2. Properties panel → **"Expose properties from Nested instances"**.
3. Properties that surface: `Show Label`, `Show Hint`, `Show Prefix`, `Show Suffix`, `Mandatory`, `Prefix Icon`, `Suffix Icon`.

### Step 10 — Variable Attachment Locations

**`_base Dropdown`:**

| Target | Property | Variable |
|---|---|---|
| Outer frame | Gap | `spacing-xs` |
| `Input` frame | Fill | `Component/Input Field/input-bg-primary` (default) |
| `Input` frame | Stroke color | `Component/Input Field/input-border-enabled` (default) |
| `Input` frame | Stroke weight | 1px (hardcoded) |
| `Input` frame | Padding Left/Right | `spacing-xl` |
| `Input` frame | Gap | `spacing-md` |
| `Input` frame | Corner radius (all 4) | `radius-xl` |
| `Content` frame | Gap | `spacing-md` |
| `Label` (text) | Fill | `Component/Input Field/input-text-label` |
| `Label` (text) | Text Style | `Label sm/Medium` |
| `*` (asterisk) | Fill | `Component/Input Field/input-text-critical` |
| `*` (asterisk) | Text Style | `Label sm/Medium` |
| `Text` (placeholder) | Fill | `Component/Input Field/input-text-placeholder` |
| `Text` (placeholder) | Text Style | `Body md/Medium` |
| `Hint text` | Fill | `Component/Input Field/input-text-helper` |
| `Hint text` | Text Style | `Label sm/Medium` |
| `Selected Options` | Gap (H + Wrap) | `spacing-sm` |

**`_base dropdown list`:**

| Target | Property | Variable |
|---|---|---|
| Row frame | Fill | See color table per variant |
| Row frame | Stroke color | `Component/Input Field/input-border-enabled` |
| Row frame | Stroke side | **Bottom only** — no stroke on Top, Left, Right |
| Row frame | Stroke weight | 1px (hardcoded) |
| Row frame | Padding Left/Right | `spacing-xl` |
| Row frame | Gap | `spacing-md` |
| `Text` | Fill | `Component/Input Field/input-text-enable` |
| `Text` | Text Style | `Body md/Medium` |

**`Dropdown list`:**

| Target | Property | Variable |
|---|---|---|
| Container frame | Fill | `Component/Input Field/input-bg-primary` |
| Container frame | Stroke color | `Component/Input Field/input-border-enabled` |
| Container frame | Stroke side | **All 4 sides** |
| Container frame | Stroke weight | 1px (hardcoded) |
| Container frame | Corner radius (all 4) | `radius-xl` |
| `Count=6` Input instance | Show Label | `false` |
| `Count=6` Input instance | Show Prefix | `true` (search icon) |
| `Count=6` Input instance | Padding all sides | `spacing-xl` |
| `Count=6` Scroll bar | Length | `75%` (default) |
| `Count=6` Scroll bar | `Bar` fill | `Component/Input Field/input-bg-disabled` |
| `Count=6` Scroll bar | `Bar` corner radius | `radius-full` |
| `Count=6` Scroll bar | Padding all sides | `spacing-xs` |

### Step 11 — Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Base dropdown list | `_base dropdown list` | `_base dropdown list` |
| Base dropdown list variant | `With checkbox=[Value]` | `With checkbox=Single Selection` |
| Dropdown list | `Dropdown list` | `Dropdown list` |
| Dropdown list variant | `Count=[N]` | `Count=2` |
| Base Dropdown | `_base Dropdown` | `_base Dropdown` |
| Dropdown Component Set | `Dropdown` | `Dropdown` |
| Dropdown variant | `State=[State]` | `State=Enabled` |
| Label frame | `Label` | `Label` |
| Input frame | `Input` | `Input` |
| Content frame | `Content` | `Content` |
| Hint text | `Hint text` | `Hint text` |
| Selected Options | `Selected Options` | `Selected Options` |
| Dropdown panel instance | `Dropdown list` | `Dropdown list` |

---

## Mandatory Rules

- **Never use `_Primitives` variables directly.** All colors must come from `Component/Input Field/` or `Color Style` semantic variables.
- **Error state stroke must use `Component/Input Field/input-border-critical`** — never a Primitive variable directly.
- **`_base dropdown list` stroke is bottom-only.** Apply 1px stroke on the bottom edge only — not all sides. The outer `Dropdown list` container handles the all-sides border.
- **`Dropdown list` container stroke is all sides.** The combined container uses `input-border-enabled` on all 4 sides.
- **Text style only — no font variable bindings.** Apply text styles directly.
- **Expose nested properties** on all component levels.
- **Build order must be followed.** `_base dropdown list` → `Dropdown list` → `_base Dropdown` → `Dropdown`.
- **Dropdown list is ABSOLUTE positioned** inside `_base Dropdown`. It must NOT be part of the Auto Layout flow — set `layoutPositioning = ABSOLUTE` so it overlays below the Input without affecting the frame's height.
- **Badge instances in `Selected Options`** must use the existing **Badge component** (see Badge documentation) — do not recreate.
- **Checkbox instances in `_base dropdown list`** must use the existing **Checkbox component** (see Checkbox documentation) with `Label=false` and the correct `Checked` state.
- **`spacing-md` is the gap for both the Input frame and `_base dropdown list` rows.** Do not use external library variables.
- **Arrow icon must be manually swapped** between `arrow-down` (closed) and `arrow-up` (open) — this is a state override, not a Boolean property.

---

## Figma Component Page — Arrangement

```
┌──────────────────────────────────────────────────────────────┐
│  DROPDOWN COMPONENT SYSTEM          ← small caps label       │
│  Dropdown                           ← large bold title       │
│  4-component system · 6 states · Dropdown list (5 counts)    │
│  ────────────────────────────────── ← divider                │
│                                                               │
│  ▌ _base dropdown list — 4 Variants                          │
│    Checkbox · Selected Checkbox · Single Selection · Selected │
│                                                               │
│    [ actual _base dropdown list COMPONENT_SET ]              │
│                                                               │
│  ▌ Dropdown list — 5 Count Variants                          │
│    Count 1–4 · Count 6 with search + scrollbar               │
│                                                               │
│    [ actual Dropdown list COMPONENT_SET ]                    │
│                                                               │
│  ▌ _base Dropdown — Base Component                           │
│    All properties · Label · Input · Hint · Selected Options  │
│                                                               │
│    [ actual _base Dropdown COMPONENT ]                       │
│                                                               │
│  ▌ Dropdown — All 6 States                                   │
│    State property · Enabled · Selected · Open · Error · etc. │
│                                                               │
│    [ actual Dropdown COMPONENT_SET ]                         │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Header Block

| Element | Content |
|---|---|
| System label | `DROPDOWN COMPONENT SYSTEM` |
| Title | `Dropdown` |
| Summary tagline | `4-component system · _base dropdown list · Dropdown list · _base Dropdown · Dropdown · 6 states · Enabled · Selected · Selected Options · Open · Error · Disabled` |

### Sections

| Section | Subtitle | Content |
|---|---|---|
| `_base dropdown list — 4 Variants` | `Checkbox · Selected Checkbox · Single Selection · Selected · spacing-md gap · radius-xl` | Actual `_base dropdown list` COMPONENT_SET |
| `Dropdown list — 5 Count Variants` | `Count 1·2·3·4·6 · DROP_SHADOW · radius-xl · Count=6 includes search + scrollbar` | Actual `Dropdown list` COMPONENT_SET |
| `_base Dropdown — Base Component` | `320px fixed width · Input 44px · Label · Hint · Selected Options · Absolute Dropdown list` | Actual `_base Dropdown` COMPONENT |
| `Dropdown — All 6 States` | `State property · All Component/Input Field variables · Badge + Checkbox reuse` | Actual `Dropdown` COMPONENT_SET |

### Arrangement Rules

- Use **Auto Layout (Vertical)** for the main presentation frame.
- Blue accent bar (3–4px wide) on each section.
- **Do not create new instances** — place actual component sets and components directly.