# Radio Button & Radio Button Tile

## Overview

| Property | Value |
|---|---|
| Component Name | Radio Button · Radio Button Tile |
| Base Component | `Radio Button` (acts as its own base) |
| Component Sets | `Radio Button` · `Radio Button Tile` |
| Node — Radio Button | `472:10875` |
| Node — Radio Button Tile | `391:568` |
| Radio Button Variants | 5 |
| Radio Button Tile Variants | 5 |
| Has States | Yes — on both components |

`Radio Button` is a single-select form control. `Radio Button Tile` is a larger selection card that embeds a `Radio Button` instance alongside a title and optional caption. Architecture mirrors `Checkbox` and `Checkbox Tile` with key structural differences.

> ### ⚠️ Critical Requirement — Expose Nested Instance Properties
>
> The main **`Radio Button Tile`** component (every variant) **MUST** have **all** properties from its nested **`Radio Button`** instance exposed onto it. In Figma: select the main component/variant → **Properties** panel → **"Expose properties from → Nested instances"**. Without this, the `Radio Button` properties stay buried inside the nested instance and designers cannot access them from the main component. This applies to **every** variant — see the dedicated "Expose Nested Instance Properties" step below for details.

---

## Component Hierarchy

```
Level 1 — Radio Button             [COMPONENT_SET]
  ├── State=Enabled                [COMPONENT]
  ├── State=Hover                  [COMPONENT]
  ├── State=Selected               [COMPONENT]
  ├── State=Disabled               [COMPONENT]
  └── State=Disabled Selected      [COMPONENT]

Level 2 — Radio Button Tile        [COMPONENT_SET]
  ├── State=Enabled                [COMPONENT — contains Radio Button INSTANCE]
  ├── State=Hover                  [COMPONENT — contains Radio Button INSTANCE]
  ├── State=Selected               [COMPONENT — contains Radio Button INSTANCE]
  ├── State=Disabled               [COMPONENT — contains Radio Button INSTANCE]
  └── State=Disabled Selected      [COMPONENT — contains Radio Button INSTANCE]
```

> ⚠️ **Figma file flag — rename required:**
> In the Figma file, Radio Button Tile's disabled states are currently named `Variant4` and `Variant5`. These must be renamed:
> - `State=Variant4` → `State=Disabled`
> - `State=Variant5` → `State=Disabled Selected`
>
> All documentation below uses the correct names.

> ⚠️ **Architecture note:**
> `Radio Button` has no separate `_base` component. The Component Set IS the base. `Radio Button Tile` consumes `Radio Button` instances directly with `Label=false`.

---

## Variant Properties

### Radio Button

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Enabled` · `Hover` · `Selected` · `Disabled` · `Disabled Selected` |
| `Label` | BOOLEAN | `true` (visible) · `false` (hidden) |

### Radio Button Tile

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Enabled` · `Hover` · `Selected` · `Disabled` · `Disabled Selected` |
| `Show Caption` | BOOLEAN | `true` (visible) · `false` (hidden) |

---

## Key Differences vs Checkbox

| Property | Checkbox | Radio Button |
|---|---|---|
| Shape | Rectangle · `radius-xs` (4px) | Rectangle · `radius-full` (9999) — full circle |
| Indicator | `Arrow/linear/Check` icon or dash VECTOR | `Ellipse 1` — 8×8px centered dot |
| Indicator container | `Group 1` (plain GROUP — not Auto Layout) | `Checked` FRAME (proper frame — better architecture) |
| Enabled/Hover fill | `Background/bg-primary` (white fill) | **None** — stroke only, no fill |
| Selected fill | `Background/bg-brand_secondary` | `Background/bg-brand_secondary` (same) |
| Selected indicator | White check via stroke | White dot via fill |
| Partially state | ✅ Exists (dash indicator) | ❌ Does not exist |

---

## Component Structure

### Radio Button — Layer Hierarchy

```
Radio Button                           [COMPONENT_SET]
  │
  ├── State=Enabled                    [COMPONENT]
  │     Auto Layout:  Horizontal · HUG × HUG
  │     Gap:          spacing-xs (4px)
  │     Fill:         None
  │     │
  │     ├── Checked                    [FRAME · 18×18px fixed]
  │     │     Fill:   None (hidden white fill — do not use)
  │     │     └── radio               [RECTANGLE · 18×18px]
  │     │           Fill:   None
  │     │           Stroke: Border/border-gray_dark · 1px inside
  │     │           Radius: radius-full (all corners)
  │     │
  │     └── text                       [TEXT · HUG × HUG]
  │           Style:  Body sm/Medium
  │           Fill:   Text/text-primary
  │           Visible: Controlled by Label boolean property
  │
  ├── State=Hover                      [COMPONENT]
  │     Same structure as Enabled.
  │     └── Checked → radio
  │           Fill:   None
  │           Stroke: Border/border-secondary · 1px inside
  │     └── text   Fill: Text/text-primary
  │
  ├── State=Selected                   [COMPONENT]
  │     Auto Layout:  Horizontal · HUG × HUG
  │     Gap:          spacing-xs (4px)
  │     │
  │     ├── Checked                    [FRAME · 18×18px fixed]
  │     │     ├── radio               [RECTANGLE · 18×18px]
  │     │     │     Fill:   Background/bg-brand_secondary
  │     │     │     Stroke: None
  │     │     │     Radius: radius-full (all corners)
  │     │     │
  │     │     └── Ellipse 1           [ELLIPSE · 8×8px]
  │     │           Fill:   Component/Button/btn-bg-bordered ⚠️
  │     │           Position: Centered over radio (constraint: CENTER/CENTER)
  │     │
  │     └── text   Fill: Text/text-primary
  │
  ├── State=Disabled                   [COMPONENT]
  │     ├── Checked → radio
  │     │     Fill:   Component/Input Field/input-bg-disabled
  │     │     Stroke: Component/Input Field/input-border-disabled · 1px inside
  │     │     Radius: radius-full (all corners)
  │     └── text   Fill: Component/Input Field/input-text-disabled
  │
  └── State=Disabled Selected          [COMPONENT]
        ├── Checked
        │     ├── radio
        │     │     Fill:   Component/Input Field/input-bg-disabled
        │     │     Stroke: Component/Input Field/input-border-disabled · 1px inside
        │     │     Radius: radius-full (all corners)
        │     └── Ellipse 1           [ELLIPSE · 8×8px]
        │           Fill:   VariableID:65:15005 ⚠️ (gray 300-based — see flags)
        │           Position: Centered over radio
        └── text   Fill: Component/Input Field/input-text-disabled
```

### Radio Button Tile — Layer Hierarchy

```
Radio Button Tile                      [COMPONENT_SET]
  │
  └── State=Enabled (all states follow same structure)
        Auto Layout:   Horizontal · FIXED width × HUG height
        Alignment:     **Top** (cross-axis) — NOT center
        Padding:       spacing-xl (12px) all sides
        Gap:           spacing-sm (8px)
        Corner Radius: radius-xl (all corners)
        Fill:          per state (see color table)
        Stroke:        1px inside · color per state
        │
        ├── Radio Button               [INSTANCE · State=matching · Label=false]
        │
        └── Content                    [FRAME · FILL × HUG · Horizontal AL]
              Alignment: Top (cross-axis)
              Gap:       (external library variable — see flags)
              │
              └── Text and supporting text  [FRAME · FILL × HUG · Vertical AL]
                    Gap: spacing-xs (4px)
                    │
                    ├── Text           [TEXT · FILL × FIXED · 18px height]
                    │     Style: Body sm/Medium
                    │     Fill:  Text/text-primary (active) · input-text-disabled (disabled)
                    │
                    └── Supporting text [TEXT · FILL × HUG]
                          Style:   Label sm/Medium
                          Fill:    Text/text-secondary (active) · input-text-disabled (disabled)
                          Visible: Controlled by Show Caption boolean property
```

### Layer Descriptions

**Radio Button:**

| Layer | Type | Notes |
|---|---|---|
| `Checked` | FRAME | 18×18px fixed. Container for `radio` + `Ellipse 1`. NOT a Group — proper FRAME |
| `radio` | RECTANGLE | 18×18px fixed. All four corners bound to `radius-full`. Stroke-only in Enabled/Hover |
| `Ellipse 1` | ELLIPSE | 8×8px. Only present in Selected and Disabled Selected. Centered via constraints |
| `text` | TEXT | Label text. Toggleable via `Label` Boolean property |

**Radio Button Tile:**

| Layer | Type | Notes |
|---|---|---|
| `Radio Button` | INSTANCE | Radio Button instance. `Label=false` always. `State` set per tile state |
| `Content` | FRAME | FILL × HUG. Contains Text and supporting text. Cross-axis: Top |
| `Text and supporting text` | FRAME | Vertical Auto Layout. Contains title and caption |
| `Text` | TEXT | Title. `Body sm/Medium`. FILL × FIXED (18px) |
| `Supporting text` | TEXT | Caption. `Label sm/Medium`. Toggleable via `Show Caption` |

### Component Properties

**Radio Button:**

| Property | Type | Default | Purpose |
|---|---|---|---|
| `State` | VARIANT | `Enabled` | Switches between the 5 states |
| `Label#883:4` | BOOLEAN | `true` | Show/hide the label text layer |

**Radio Button Tile:**

| Property | Type | Default | Purpose |
|---|---|---|---|
| `State` | VARIANT | `Enabled` | Switches between the 5 tile states |
| `Show Caption#527:0` | BOOLEAN | `true` | Show/hide the Supporting text layer |

---

## Attached Variables

### Spacing — Radio Button

| Property | Variable | Value |
|---|---|---|
| Gap (radio ↔ label) | `spacing-xs` | 4px |

### Spacing — Radio Button Tile

| Property | Variable | Value |
|---|---|---|
| Padding Top | `spacing-xl` | 12px |
| Padding Bottom | `spacing-xl` | 12px |
| Padding Left | `spacing-xl` | 12px |
| Padding Right | `spacing-xl` | 12px |
| Gap (Radio Button ↔ Content) | `spacing-sm` | 8px |
| Gap (Text ↔ Supporting text) | `spacing-xs` | 4px |

### Radius

| Component | Layer | Variable | Value |
|---|---|---|---|
| Radio Button | `radio` corner radius (all 4) | `radius-full` | 9999 — full circle |
| Radio Button Tile | Tile corner radius (all 4) | `radius-xl` | 12px |

### Typography

| Component | Layer | Text Style | Font |
|---|---|---|---|
| Radio Button | `text` | `Body sm/Medium` | Inter · Medium (500) · 14px · 18px LH |
| Radio Button Tile | `Text` | `Body sm/Medium` | Inter · Medium (500) · 14px · 18px LH |
| Radio Button Tile | `Supporting text` | `Label sm/Medium` | Inter · Medium (500) · 12px · 16px LH |

> Apply text styles directly on the text layers. Do not bind individual font variables.

### Colors — Radio Button (per state)

| State | `radio` Fill | `radio` Stroke | `Ellipse 1` Fill | `text` Fill |
|---|---|---|---|---|
| `Enabled` | None | `Border/border-gray_dark` | — | `Text/text-primary` |
| `Hover` | None | `Border/border-secondary` | — | `Text/text-primary` |
| `Selected` | `Background/bg-brand_secondary` | None | `Component/Button/btn-bg-bordered` ⚠️ | `Text/text-primary` |
| `Disabled` | `Component/Input Field/input-bg-disabled` | `Component/Input Field/input-border-disabled` | — | `Component/Input Field/input-text-disabled` |
| `Disabled Selected` | `Component/Input Field/input-bg-disabled` | `Component/Input Field/input-border-disabled` | `VariableID:65:15005` ⚠️ | `Component/Input Field/input-text-disabled` |

> The `Checked` FRAME has a white fill that is set to `visible: false`. Do not enable or use this fill — it is a Figma artifact. The `radio` RECTANGLE inside controls all visible color.

### Colors — Radio Button Tile (per state)

| State | Tile Fill | Tile Stroke | `Text` Fill | `Supporting text` Fill |
|---|---|---|---|---|
| `Enabled` | `Background/bg-primary` | `Component/Input Field/input-border-enabled` | `Text/text-primary` | `Text/text-secondary` |
| `Hover` | `Background/bg-primary` | `Border/border-secondary` | `Text/text-primary` | `Text/text-secondary` |
| `Selected` | `Background/bg-brand_secondary_light` | `Border/border-secondary` | `Text/text-primary` | `Text/text-secondary` |
| `Disabled` | `Component/Input Field/input-bg-disabled` | `Component/Input Field/input-border-disabled` | `Component/Input Field/input-text-disabled` | `Component/Input Field/input-text-disabled` |
| `Disabled Selected` | `Component/Input Field/input-bg-disabled` | `Component/Input Field/input-border-disabled` | `Component/Input Field/input-text-disabled` | `Component/Input Field/input-text-disabled` |

### Radio Button State — Embedded in Tile

| Tile State | Embedded Radio Button State |
|---|---|
| `Enabled` | `State=Enabled` |
| `Hover` | `State=Hover` |
| `Selected` | `State=Selected` |
| `Disabled` | `State=Disabled` |
| `Disabled Selected` | `State=Disabled Selected` |

---

## States

### Radio Button States

| State | Visual | Circle Fill | Circle Border | Dot | Label |
|---|---|---|---|---|---|
| `Enabled` | Empty circle | None | `border-gray_dark` (grey) | None | `text-primary` |
| `Hover` | Empty circle + orange border | None | `border-secondary` (orange) | None | `text-primary` |
| `Selected` | Filled circle + white dot | `bg-brand_secondary` (orange) | None | White fill | `text-primary` |
| `Disabled` | Muted empty circle | `input-bg-disabled` | `input-border-disabled` | None | `input-text-disabled` |
| `Disabled Selected` | Muted filled circle + grey dot | `input-bg-disabled` | `input-border-disabled` | Gray fill | `input-text-disabled` |

### What changes between states

| Property | Enabled | Hover | Selected | Disabled | Disabled Selected |
|---|---|---|---|---|---|
| `radio` fill | None | None | `bg-brand_secondary` | `input-bg-disabled` | `input-bg-disabled` |
| `radio` stroke | `border-gray_dark` | `border-secondary` | None | `input-border-disabled` | `input-border-disabled` |
| `Ellipse 1` | Hidden | Hidden | White fill ⚠️ | Hidden | Gray fill ⚠️ |
| `text` fill | `text-primary` | `text-primary` | `text-primary` | `input-text-disabled` | `input-text-disabled` |

---

## Figma Construction Guide

### Step 1 — Build `Radio Button` — `State=Enabled`

1. Create a new **Frame**. Name it `State=Enabled`.
2. Apply **Horizontal Auto Layout**. Set sizing to **HUG × HUG**.
3. Set cross-axis alignment to **Center**.
4. Bind **Gap** → `spacing-xs` (4px).
5. No fill, no stroke, no padding on the outer frame.
6. Convert to a **Component**.

#### Checked Frame
1. Create a new **Frame** inside the component. Name it `Checked`.
2. Set size to **18×18px fixed** (not HUG — fixed dimensions).
3. Set the frame fill to **white** but toggle it **hidden** (visible: false). This fill must remain hidden.
4. No Auto Layout needed on `Checked` — children are positioned manually inside it.
5. No stroke on the `Checked` frame.

#### radio Rectangle
1. Draw a **Rectangle** inside `Checked`. Name it `radio`.
2. Set size to **18×18px** (fill the `Checked` frame exactly).
3. Set **Fill** to **None** (no fill for Enabled).
4. Add **Stroke** → 1px inside. Bind stroke color → `Border/border-gray_dark`.
5. Bind **corner radius** on all 4 corners → `radius-full` (9999).

#### text (Label)
1. Add a **Text** layer to the outer component frame (sibling of `Checked`, not inside it).
2. Name it `text`. Set default content to `Radio`.
3. Apply text style **`Body sm/Medium`**.
4. Bind fill → `Text/text-primary`.
5. Set sizing to **HUG** on both axes.
6. Create a **Boolean component property**: `Label` (default: `true`). Link to layer visibility.

### Step 2 — Build Remaining Radio Button States

#### `State=Hover`
1. Duplicate `State=Enabled`. Rename to `State=Hover`.
2. Inside `Checked → radio`: change stroke → `Border/border-secondary`.
3. All other properties unchanged.

#### `State=Selected`
1. Duplicate `State=Enabled`. Rename to `State=Selected`.
2. Inside `Checked → radio`:
   - Add fill → `Background/bg-brand_secondary`
   - Remove the stroke entirely
3. Add an **Ellipse** inside `Checked`, on top of `radio`. Name it `Ellipse 1`.
   - Size: **8×8px**
   - Set constraints: **Center horizontal · Center vertical** (so it always stays centered over the circle)
   - Bind fill → `Component/Button/btn-bg-bordered` ⚠️ (white in light mode — see flags for recommended fix)
   - No stroke
4. Layer order inside `Checked`: `radio` (bottom) → `Ellipse 1` (top).

#### `State=Disabled`
1. Duplicate `State=Enabled`. Rename to `State=Disabled`.
2. Inside `Checked → radio`:
   - Add fill → `Component/Input Field/input-bg-disabled`
   - Change stroke → `Component/Input Field/input-border-disabled`
3. On `text`: change fill → `Component/Input Field/input-text-disabled`.

#### `State=Disabled Selected`
1. Duplicate `State=Selected`. Rename to `State=Disabled Selected`.
2. Inside `Checked → radio`:
   - Change fill → `Component/Input Field/input-bg-disabled`
   - Add stroke → `Component/Input Field/input-border-disabled` · 1px inside
3. On `Ellipse 1`: change fill → `VariableID:65:15005` ⚠️ (gray dot — see flags).
4. On `text`: change fill → `Component/Input Field/input-text-disabled`.

### Step 3 — Combine into `Radio Button` Component Set

1. Select all 5 state components.
2. Combine into a **Component Set**. Name it `Radio Button`.
3. Add variant property `State` → options: `Enabled`, `Hover`, `Selected`, `Disabled`, `Disabled Selected`.

### Step 4 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — This step is mandatory.**

1. Select each variant COMPONENT frame.
2. Properties panel → click **"Expose properties from Nested instances"**.
3. The `Label` Boolean property surfaces on each Radio Button variant.

### Step 5 — Build `Radio Button Tile` Variants

**For each of the 5 states:**

1. Create a new **Frame**. Name it `State=Enabled` (adjust per state).
2. Apply **Horizontal Auto Layout**. Set sizing to **FIXED width × HUG height**.
3. Set **cross-axis alignment to Top** — not Center. This ensures the Radio Button aligns to the top when the caption is long or multi-line.
4. Bind padding all sides → `spacing-xl`.
5. Bind gap → `spacing-sm`.
6. Bind corner radius all 4 corners → `radius-xl`.
7. Apply fill and stroke per the color table above.
8. Convert to a **Component**.

#### Radio Button Instance
1. Place an instance of **`Radio Button`** inside the tile frame as the first child.
2. Set `Label` property → `false` (hide the label text).
3. Set `State` property → matching state:
   - Enabled → `Enabled` · Hover → `Hover` · Selected → `Selected` · Disabled → `Disabled` · Disabled Selected → `Disabled Selected`

#### Content Frame
1. Create a **Frame** inside the tile. Name it `Content`.
2. Set to **Horizontal Auto Layout**, sizing **FILL × HUG**, `layoutGrow=1`.
3. Set cross-axis alignment to **Top**.

#### Text and supporting text Frame (inside Content)
1. Create a **Frame** inside Content. Name it `Text and supporting text`.
2. Set to **Vertical Auto Layout**, sizing **FILL × HUG**, `layoutGrow=1`.
3. Bind gap → `spacing-xs`.

#### Text layer
1. Add a **Text** layer. Name it `Text`.
2. Set default content to `Help! Have a Fulfillment Emergency!`.
3. Apply text style **`Body sm/Medium`**.
4. Bind fill → `Text/text-primary` (active states) · `Component/Input Field/input-text-disabled` (disabled states).
5. Set sizing to **FILL × FIXED** (18px height).

#### Supporting text layer
1. Add a **Text** layer. Name it `Supporting text`.
2. Set default content to `Caption`.
3. Apply text style **`Label sm/Medium`**.
4. Bind fill → `Text/text-secondary` (active states) · `Component/Input Field/input-text-disabled` (disabled states).
5. Set sizing to **FILL × HUG**.
6. Create a **Boolean component property**: `Show Caption` (default: `true`). Link to layer visibility.

### Step 6 — Combine into `Radio Button Tile` Component Set

1. Select all 5 type components.
2. Combine into a **Component Set**. Name it `Radio Button Tile`.
3. Add variant property `State` → options: `Enabled`, `Hover`, `Selected`, `Disabled`, `Disabled Selected`.

### Step 7 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — This step is mandatory.**

1. Select each `State` variant COMPONENT frame.
2. Properties panel → click **"Expose properties from Nested instances"**.
3. The `State` and `Label` properties from the nested `Radio Button` instance surface on each tile variant.

### Step 8 — Variable Attachment Locations

**Radio Button:**

| Target | Property | Variable |
|---|---|---|
| Radio Button frame | Gap | `spacing-xs` |
| `radio` | Fill | See color table per state |
| `radio` | Stroke color | See color table per state |
| `radio` | Stroke weight | 1px (hardcoded) |
| `radio` | Corner radius (all 4) | `radius-full` |
| `Ellipse 1` | Fill | `Component/Button/btn-bg-bordered` (Selected) · `VariableID:65:15005` (Disabled Selected) |
| `text` | Fill | See color table per state |
| `text` | Text Style | `Body sm/Medium` |

**Radio Button Tile:**

| Target | Property | Variable |
|---|---|---|
| Tile frame | Fill | See color table per state |
| Tile frame | Stroke color | See color table per state |
| Tile frame | Stroke weight | 1px (hardcoded) |
| Tile frame | Padding (all 4) | `spacing-xl` |
| Tile frame | Gap | `spacing-sm` |
| Tile frame | Corner radius (all 4) | `radius-xl` |
| `Text and supporting text` frame | Gap | `spacing-xs` |
| `Text` | Fill | See color table per state |
| `Text` | Text Style | `Body sm/Medium` |
| `Supporting text` | Fill | See color table per state |
| `Supporting text` | Text Style | `Label sm/Medium` |

### Step 9 — Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Radio Button Component Set | `Radio Button` | `Radio Button` |
| Radio Button variant | `State=[State]` | `State=Enabled` |
| Radio Button Tile Component Set | `Radio Button Tile` | `Radio Button Tile` |
| Radio Button Tile variant | `State=[State]` | `State=Enabled` |
| Checked container | `Checked` | `Checked` |
| Circle layer | `radio` | `radio` |
| Inner dot | `Ellipse 1` | `Ellipse 1` |
| Label text | `text` | `text` |
| Tile title | `Text` | `Text` |
| Tile caption | `Supporting text` | `Supporting text` |
| Tile content wrapper | `Content` | `Content` |
| Tile text stack | `Text and supporting text` | `Text and supporting text` |

---

## Mandatory Rules

- **Never use `_Primitives` variables directly.** All color variables must come from the `Color Style` collection.
- **`radio` size is 18×18px fixed.** Do not use HUG or FILL sizing.
- **`radio` corner radius must be bound to `radius-full`** (9999). Do not hardcode. This creates the circular shape.
- **Enabled and Hover states have NO fill on `radio`.** Stroke only. Do not add a background fill.
- **`Checked` FRAME fill is always hidden.** The white fill on `Checked` must remain `visible: false`. Never enable it.
- **`Ellipse 1` uses fill for color** (not stroke). Bind the fill variable directly. Ellipse is always centered via CENTER/CENTER constraints over `radio`.
- **`Ellipse 1` is only present in Selected and Disabled Selected.** Do not add it to Enabled, Hover, or Disabled states.
- **`Radio Button Tile` always sets `Label=false`** on its embedded Radio Button instance. The title comes from the `Text` layer in Content.
- **Cross-axis alignment must be Top** on both the Tile frame and the Content frame — not Center. This prevents misalignment when the caption wraps to multiple lines.
- **Expose nested properties** on both `Radio Button` and `Radio Button Tile` variants.
- **Rename `Variant4` → `Disabled` and `Variant5` → `Disabled Selected`** in the Figma file before publishing.
- **Stroke weight (1px) is hardcoded** — no spacing variable for stroke weight exists.
- **Text style only — no font variable bindings.**

---

## Known Issues & Flags

### ⚠️ 1 — Variant4 / Variant5 naming in Radio Button Tile
The Figma file uses placeholder variant names `Variant4` and `Variant5` for the disabled states of `Radio Button Tile`. These must be renamed to `Disabled` and `Disabled Selected` respectively before the component is published or used.

### ⚠️ 2 — Wrong variable on Selected dot (`Ellipse 1`)
The `Ellipse 1` in `State=Selected` uses `Component/Button/btn-bg-bordered` for the white dot fill. This is a Button background variable semantically unrelated to Radio Button. It resolves to `#FFFFFF` (white) in Light Theme and `#131F2E` in Dark Theme.

**Issue:** In Dark Theme, the dot will be near-black (`#131F2E`) instead of white, making the selected state visually broken in dark mode.

**Recommended fix:** Replace `Component/Button/btn-bg-bordered` with `Icon/icon-white` or `Border/border-white` — both resolve to `#FFFFFF` in both themes.

### ⚠️ 3 — Unresolved variable on Disabled Selected dot (`VariableID:65:15005`)
The `Ellipse 1` in `State=Disabled Selected` uses `VariableID:65:15005` which could not be resolved to a named variable. It resolves to `#89929D` (Neutrals/gray 300) in Light Theme — visually the same as `Component/Input Field/input-text-disabled`. The exact semantic name of this variable needs confirmation in the Figma file.

### ⚠️ 4 — Content frame gap uses external library variable
The `Content` frame inside `Radio Button Tile` has its gap bound to `VariableID:c5a2568ce222f398a0ded878a366b21f7de70f00/6425:50` — an external library variable, not a local spacing variable. When recreating, bind to the appropriate local spacing variable.

### ⚠️ 5 — Reused Input Field variables for disabled states
Same flag as Checkbox: disabled states use `Component/Input Field/input-bg-disabled`, `input-border-disabled`, and `input-text-disabled`. These semantically belong to Input Field. Dedicated `Component/RadioButton/` disabled variables would be architecturally cleaner.

---

## Figma Component Page — Arrangement

```
┌────────────────────────────────────────────────────────────┐
│  RADIO BUTTON COMPONENT SYSTEM     ← small caps label      │
│  Radio Button & Radio Button Tile  ← large bold title      │
│  Radio Button: 5 states · Label toggle                     │
│  Radio Button Tile: 5 states · Caption toggle ← summary    │
│  ─────────────────────────────────  ← divider              │
│                                                             │
│  ▌ Radio Button — All 5 States                              │
│    State property · Label Boolean · 18×18px circle          │
│                                                             │
│    [ actual Radio Button COMPONENT_SET placed here ]        │
│                                                             │
│  ▌ Radio Button Tile — All 5 States                         │
│    State property · Show Caption Boolean                    │
│    Embeds Radio Button instance · spacing-xl padding        │
│                                                             │
│    [ actual Radio Button Tile COMPONENT_SET placed here ]   │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Header Block

| Element | Content |
|---|---|
| System label | `RADIO BUTTON COMPONENT SYSTEM` |
| Title | `Radio Button & Radio Button Tile` |
| Summary tagline | `Radio Button: 5 states · Enabled · Hover · Selected · Disabled · Disabled Selected · Radio Button Tile: 5 states · Show Caption toggle` |
| Divider | Full-width horizontal rule below summary |

### Section 1 — Radio Button

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Radio Button — All 5 States` |
| Subtitle | `State property · Label Boolean · radius-full circle · Body sm/Medium` |
| Content | Place the **actual `Radio Button` COMPONENT_SET** directly on the page |

### Section 2 — Radio Button Tile

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Radio Button Tile — All 5 States` |
| Subtitle | `State property · Show Caption Boolean · Embeds Radio Button instance · spacing-xl padding · radius-xl tile · Top-aligned` |
| Content | Place the **actual `Radio Button Tile` COMPONENT_SET** directly on the page |

### Arrangement Rules

- Use **Auto Layout (Vertical)** for the main presentation frame.
- The **blue accent bar** is a `3–4px wide rectangle` with the brand primary fill.
- **Do not create new instances** — place actual component sets directly.
- `Radio Button` default display: `Label=true`, all 5 states visible.
- `Radio Button Tile` default display: `Show Caption=true`, all 5 states visible.
