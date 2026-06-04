# Checkbox & Checkbox Tile

## Overview

| Property | Value |
|---|---|
| Component Name | Checkbox · Checkbox Tile |
| Base Component | `Checkbox` (acts as its own base) |
| Component Sets | `Checkbox` · `Checkbox Tile` |
| Node — Checkbox | `8091:74483` |
| Node — Checkbox Tile | `525:634` |
| Checkbox Variants | 6 |
| Checkbox Tile Variants | 5 |
| Has States | Yes — on both components |

`Checkbox` is a standalone boolean form control. `Checkbox Tile` is a larger selection card that embeds a `Checkbox` instance alongside a title and optional caption. Unlike previous components, **there is no separate `_base` component** — `Checkbox` is the foundational unit and `Checkbox Tile` consumes it directly.

---

## Component Hierarchy

```
Level 1 — Checkbox                 [COMPONENT_SET]
  ├── Checked=Enabled              [COMPONENT]
  ├── Checked=Hover                [COMPONENT]
  ├── Checked=Selected             [COMPONENT]
  ├── Checked=Partially            [COMPONENT]
  ├── Checked=Disabled             [COMPONENT]
  └── Checked=Disabled Checked     [COMPONENT]

Level 2 — Checkbox Tile            [COMPONENT_SET]
  ├── Type=Enabled                 [COMPONENT — contains Checkbox INSTANCE]
  ├── Type=Hover                   [COMPONENT — contains Checkbox INSTANCE]
  ├── Type=Selected                [COMPONENT — contains Checkbox INSTANCE]
  ├── Type=Disabled                [COMPONENT — contains Checkbox INSTANCE]
  └── Type=Disabled Checked        [COMPONENT — contains Checkbox INSTANCE]
```

> ⚠️ **Architecture note:**
> `Checkbox` has no separate `_base` component. The Component Set itself IS the base. Each `Checkbox Tile` variant contains a `Checkbox` instance (with `Label=false`) plus a `Content` frame — it does not have its own wrapper+base pattern.

---

## Variant Properties

### Checkbox

| Property | Type | Options |
|---|---|---|
| `Checked` | VARIANT | `Enabled` · `Hover` · `Selected` · `Partially` · `Disabled` · `Disabled Checked` |
| `Label` | BOOLEAN | `true` (visible) · `false` (hidden) |

### Checkbox Tile

| Property | Type | Options |
|---|---|---|
| `Type` | VARIANT | `Enabled` · `Hover` · `Selected` · `Disabled` · `Disabled Checked` |
| `Show Caption` | BOOLEAN | `true` (visible) · `false` (hidden) |

---

## Component Structure

### Checkbox — Layer Hierarchy

```
Checkbox                               [COMPONENT_SET]
  │
  ├── Checked=Enabled                  [COMPONENT]
  │     Auto Layout:  Horizontal · HUG × HUG
  │     Gap:          spacing-xs (4px)
  │     Fill:         None
  │     │
  │     ├── Rectangle 1                [RECTANGLE · 18×18px fixed]
  │     │     Fill:   Background/bg-primary
  │     │     Stroke: Border/border-gray_dark · 1px inside
  │     │     Radius: radius-xs (all corners)
  │     │
  │     └── text                       [TEXT · HUG × HUG]
  │           Style:  Body md/Medium
  │           Fill:   Text/text-primary
  │           Visible: Controlled by Label boolean property
  │
  ├── Checked=Hover                    [COMPONENT]
  │     Same structure as Enabled.
  │     ├── Rectangle 1
  │     │     Fill:   Background/bg-primary
  │     │     Stroke: Border/border-secondary · 1px inside
  │     └── text      Fill: Text/text-primary
  │
  ├── Checked=Selected                 [COMPONENT]
  │     Auto Layout:  Horizontal · HUG × HUG
  │     Gap:          spacing-xs (4px)
  │     │
  │     ├── Group 1                    [GROUP — not Auto Layout ⚠️]
  │     │     ├── Rectangle 1          [RECTANGLE · 18×18px]
  │     │     │     Fill:   Background/bg-brand_secondary
  │     │     │     Stroke: None
  │     │     │     Radius: radius-xs (all corners)
  │     │     │
  │     │     └── Arrow/linear/Check   [INSTANCE · 13.5×13.5px]
  │     │           Stroke: 1.5px · color = white (see icon note)
  │     │           Fill:   Hidden
  │     │
  │     └── text      Fill: Text/text-primary
  │
  ├── Checked=Partially               [COMPONENT]
  │     Auto Layout:  Horizontal · HUG × HUG
  │     Gap:          spacing-xs (4px)
  │     │
  │     ├── Group 1                   [GROUP — not Auto Layout ⚠️]
  │     │     ├── Rectangle 1         [RECTANGLE · 18×18px]
  │     │     │     Fill:   Background/bg-brand_secondary
  │     │     │     Stroke: None
  │     │     │     Radius: radius-xs (all corners)
  │     │     │
  │     │     └── Line 1 (Stroke)     [VECTOR · dash indicator · 10.8×1.8px]
  │     │           Fill:   Icon/icon-white
  │     │           Stroke: None
  │     │
  │     └── text      Fill: Text/text-primary
  │
  ├── Checked=Disabled                [COMPONENT]
  │     ├── Rectangle 1
  │     │     Fill:   Component/Input Field/input-bg-disabled
  │     │     Stroke: Component/Input Field/input-border-disabled · 1px inside
  │     │     Radius: radius-xs (all corners)
  │     └── text      Fill: Component/Input Field/input-text-disabled
  │
  └── Checked=Disabled Checked        [COMPONENT]
        ├── Group 1                   [GROUP — not Auto Layout ⚠️]
        │     ├── Rectangle 1
        │     │     Fill:   Component/Input Field/input-bg-disabled
        │     │     Stroke: Component/Input Field/input-border-disabled · 1px inside
        │     │     Radius: radius-xs (all corners)
        │     └── Arrow/linear/Check  [INSTANCE · 13.5×13.5px]
        │           Stroke: 1.5px · color = Background/bg-gray_dark
        │           Fill:   Hidden
        └── text      Fill: Component/Input Field/input-text-disabled
```

### Checkbox Tile — Layer Hierarchy

```
Checkbox Tile                          [COMPONENT_SET]
  │
  └── Type=Enabled (all types follow same structure)
        Auto Layout:   Horizontal · FIXED width × HUG height
        Alignment:     **Top** (cross-axis) — NOT center
        Padding:       spacing-xl (12px) all sides
        Gap:           spacing-md (8px)
        Corner Radius: radius-xl (all corners)
        Fill:          Background/bg-primary (Enabled/Hover)
        Stroke:        1px inside · color per type
        │
        ├── Checkbox                   [INSTANCE · Checked=matching state · Label=false]
        │     (18×18px, Label hidden, Checked property set per type)
        │
        └── Content                    [FRAME · FILL × HUG · Horizontal AL]
              Alignment: Top (cross-axis)
              Gap: (external library variable — see flags)
              │
              └── Text and supporting text  [FRAME · FILL × HUG · Vertical AL]
                    Gap: spacing-xs (4px)
                    │
                    ├── Text           [TEXT · FILL × FIXED · 18px height]
                    │     Style: Body md/Medium
                    │     Fill:  Text/text-primary (active) · input-text-disabled (disabled)
                    │
                    └── Supporting text [TEXT · FILL × HUG]
                          Style:   Label sm/Medium
                          Fill:    Text/text-secondary (active) · input-text-disabled (disabled)
                          Visible: Controlled by Show Caption boolean property
```

### Layer Descriptions

**Checkbox:**

| Layer | Type | Notes |
|---|---|---|
| `Rectangle 1` | RECTANGLE | 18×18px fixed. Fill, stroke, and radius all variable-bound |
| `Group 1` | GROUP | Contains Rectangle + check/dash in Selected/Partially/Disabled Checked states. Not Auto Layout |
| `Arrow/linear/Check` | INSTANCE | Check icon. Stroke-based (1.5px), fill hidden |
| `Line 1 (Stroke)` | VECTOR | Dash indicator for Partially state. Color = `Icon/icon-white` on fill |
| `text` | TEXT | Label text. Toggleable via `Label` Boolean property |

**Checkbox Tile:**

| Layer | Type | Notes |
|---|---|---|
| `Checkbox` | INSTANCE | Checkbox component instance. `Label=false` always. `Checked` set per type |
| `Content` | FRAME | FILL × HUG. Contains Text and supporting text |
| `Text and supporting text` | FRAME | Vertical Auto Layout. Contains title and caption |
| `Text` | TEXT | Title. `Body md/Medium`. FILL × FIXED (18px) |
| `Supporting text` | TEXT | Caption. `Label sm/Medium`. Toggleable via `Show Caption` |

### Component Properties

**Checkbox:**

| Property | Type | Default | Purpose |
|---|---|---|---|
| `Checked` | VARIANT | `Enabled` | Switches between the 6 check states |
| `Label#882:0` | BOOLEAN | `true` | Show/hide the label text layer |

**Checkbox Tile:**

| Property | Type | Default | Purpose |
|---|---|---|---|
| `Type` | VARIANT | `Enabled` | Switches between the 5 tile types |
| `Show Caption#527:0` | BOOLEAN | `true` | Show/hide the Supporting text layer |

---

## Attached Variables

### Spacing — Checkbox

| Property | Variable | Value |
|---|---|---|
| Gap (Rectangle ↔ label) | `spacing-xs` | 4px |

### Spacing — Checkbox Tile

| Property | Variable | Value |
|---|---|---|
| Padding Top | `spacing-xl` | 12px |
| Padding Bottom | `spacing-xl` | 12px |
| Padding Left | `spacing-xl` | 12px |
| Padding Right | `spacing-xl` | 12px |
| Gap (Checkbox ↔ Content) | `spacing-md` | 8px |
| Gap (Text ↔ Supporting text) | `spacing-xs` | 4px |

### Radius

| Component | Property | Variable | Value |
|---|---|---|---|
| Checkbox | `Rectangle 1` corner radius (all 4) | `radius-xs` | 4px |
| Checkbox Tile | Tile corner radius (all 4) | `radius-xl` | 12px |

### Typography

| Component | Layer | Text Style | Font |
|---|---|---|---|
| Checkbox | `text` | `Body md/Medium` | Inter · Medium (500) · 14px · 18px LH |
| Checkbox Tile | `Text` | `Body md/Medium` | Inter · Medium (500) · 14px · 18px LH |
| Checkbox Tile | `Supporting text` | `Label sm/Medium` | Inter · Medium (500) · 12px · 16px LH |

> Apply text styles directly on the text layers. Do not bind individual font variables.

### Colors — Checkbox (per state)

| State | `Rectangle 1` Fill | `Rectangle 1` Stroke | `text` Fill |
|---|---|---|---|
| `Enabled` | `Background/bg-primary` | `Border/border-gray_dark` | `Text/text-primary` |
| `Hover` | `Background/bg-primary` | `Border/border-secondary` | `Text/text-primary` |
| `Selected` | `Background/bg-brand_secondary` | None | `Text/text-primary` |
| `Partially` | `Background/bg-brand_secondary` | None | `Text/text-primary` |
| `Disabled` | `Component/Input Field/input-bg-disabled` | `Component/Input Field/input-border-disabled` | `Component/Input Field/input-text-disabled` |
| `Disabled Checked` | `Component/Input Field/input-bg-disabled` | `Component/Input Field/input-border-disabled` | `Component/Input Field/input-text-disabled` |

### Colors — Checkbox Tile (per type)

| Type | Tile Fill | Tile Stroke | `Text` Fill | `Supporting text` Fill |
|---|---|---|---|---|
| `Enabled` | `Background/bg-primary` | `Component/Input Field/input-border-enabled` | `Text/text-primary` | `Text/text-secondary` |
| `Hover` | `Background/bg-primary` | `Border/border-secondary` | `Text/text-primary` | `Text/text-secondary` |
| `Selected` | `Background/bg-brand_secondary_light` | `Border/border-secondary` | `Text/text-primary` | `Text/text-secondary` |
| `Disabled` | `Component/Input Field/input-bg-disabled` | `Component/Input Field/input-border-disabled` | `Component/Input Field/input-text-disabled` | `Component/Input Field/input-text-disabled` |
| `Disabled Checked` | `Component/Input Field/input-bg-disabled` | `Component/Input Field/input-border-disabled` | `Component/Input Field/input-text-disabled` | `Component/Input Field/input-text-disabled` |

### Check Icon — `Arrow/linear/Check`

This is a **dedicated check icon component**, separate from the vuesax icon library. It is used in `Selected` and `Disabled Checked` states.

| Property | Value |
|---|---|
| Component | `Arrow/linear/Check` (ID: `141:16632`) |
| Inner component | `check` (ID: `133:8730`) |
| Size | 13.5×13.5px |
| Color property | **STROKE** — stroke weight 1.5px, fill is hidden |
| Default stroke color | White — inherits from parent context |
| Placement | Inside `Group 1`, positioned over `Rectangle 1` |

> ⚠️ **Check icon color is on the STROKE, not the fill.** The fill layer is explicitly set to `visible: false`. The checkmark is rendered via the stroke path. Do not apply fill color.
>
> **Stroke color differs by state:**
> - `Selected` → white stroke (no variable binding confirmed in file)
> - `Disabled Checked` → `Background/bg-gray_dark` stroke
>
> **Path to the check VECTOR stroke:**
> `Arrow/linear/Check [INSTANCE] → check [INSTANCE] → [Vector path]`
> Override the stroke variable on the innermost Vector to change color.

### Partially State — Dash Indicator

| Property | Value |
|---|---|
| Layer | `Line 1 (Stroke)` — VECTOR |
| Size | 10.8×1.8px |
| Color | Fill = `Icon/icon-white` |
| Corner radius | 100px (pill-shaped ends) |

> The dash indicator uses **fill**, not stroke, for its color. This is different from the check icon and the vuesax icons. Bind the fill variable to `Icon/icon-white`.

---

## States

### Checkbox States

| State | Visual | Box Fill | Box Border | Label | Icon/Indicator |
|---|---|---|---|---|---|
| `Enabled` | Empty box | `bg-primary` (white) | `border-gray_dark` (grey) | `text-primary` | None |
| `Hover` | Empty box + orange border | `bg-primary` | `border-secondary` (orange) | `text-primary` | None |
| `Selected` | Filled box + checkmark | `bg-brand_secondary` (orange) | None | `text-primary` | Check icon (white stroke) |
| `Partially` | Filled box + dash | `bg-brand_secondary` (orange) | None | `text-primary` | Dash VECTOR (white fill) |
| `Disabled` | Muted empty box | `input-bg-disabled` (grey) | `input-border-disabled` (light grey) | `input-text-disabled` (grey) | None |
| `Disabled Checked` | Muted filled box + checkmark | `input-bg-disabled` | `input-border-disabled` | `input-text-disabled` | Check icon (`Background/bg-gray_dark` stroke) |

### Checkbox Tile States

| Type | Tile Fill | Tile Border | Embedded Checkbox State |
|---|---|---|---|
| `Enabled` | White | Light grey (enabled border) | `Checked=Enabled` |
| `Hover` | White | Orange | `Checked=Hover` |
| `Selected` | Light orange tint | Orange | `Checked=Selected` |
| `Disabled` | Light grey | Light grey (disabled border) | `Checked=Disabled` |
| `Disabled Checked` | Light grey | Light grey (disabled border) | `Checked=Disabled Checked` |

**What changes between Checkbox Tile types:**

| Property | Enabled → Hover | Hover → Selected | Active → Disabled |
|---|---|---|---|
| Tile fill | No change | `bg-primary` → `bg-brand_secondary_light` | → `input-bg-disabled` |
| Tile stroke | `input-border-enabled` → `border-secondary` | Stays `border-secondary` | → `input-border-disabled` |
| Checkbox state | Enabled → Hover | Hover → Selected | → Disabled / Disabled Checked |
| Text fill | No change | No change | → `input-text-disabled` |
| Caption fill | No change | No change | → `input-text-disabled` |

---

## Figma Construction Guide

### Step 1 — Build `Checkbox` — `Checked=Enabled`

1. Create a new **Frame**. Name it `Checked=Enabled`.
2. Apply **Horizontal Auto Layout**. Set sizing to **HUG × HUG**.
3. Set cross-axis alignment to **Center**.
4. Bind **Gap** → `spacing-xs` (4px).
5. No fill, no stroke, no padding on the frame.
6. Convert to a **Component**.

#### Rectangle 1 (Checkbox box)
1. Draw a **Rectangle** inside the frame. Name it `Rectangle 1`.
2. Set size to **18×18px fixed** (not HUG — fixed dimensions).
3. Bind **Fill** → `Background/bg-primary`.
4. Add **Stroke** → 1px inside. Bind stroke color → `Border/border-gray_dark`.
5. Bind **corner radius** on all 4 corners → `radius-xs`.

#### text (Label)
1. Add a **Text** layer. Name it `text`.
2. Set default content to `Checkbox`.
3. Apply text style **`Body md/Medium`**.
4. Bind fill → `Text/text-primary`.
5. Set sizing to **HUG** on both axes.
6. Create a **Boolean component property**: `Label` (default: `true`). Link to layer visibility.

### Step 2 — Build Remaining Checkbox States

#### `Checked=Hover`
1. Duplicate `Checked=Enabled`. Rename to `Checked=Hover`.
2. On `Rectangle 1`: change stroke variable → `Border/border-secondary`.
3. All other properties unchanged.

#### `Checked=Selected`
1. Duplicate `Checked=Enabled`. Rename to `Checked=Selected`.
2. **Remove** `Rectangle 1` from Auto Layout and wrap it in a Group:
   - Select `Rectangle 1`
   - Group it (Cmd+G). Name the group `Group 1`.
3. On `Rectangle 1` inside the group:
   - Change fill variable → `Background/bg-brand_secondary`
   - Remove the stroke entirely
4. Place an instance of **`Arrow/linear/Check`** inside `Group 1`, on top of `Rectangle 1`.
   - Size: 13.5×13.5px
   - Position: centered over `Rectangle 1` (offset 2.25px from top-left)
   - The checkmark color is on the **stroke** of the inner Vector path. Override stroke → white
5. `Group 1` should now be positioned as the first child in the Auto Layout frame (same position as `Rectangle 1` was).

> ⚠️ `Group 1` is NOT Auto Layout — it is a plain Group. The Rectangle and check icon are positioned manually inside it at exact coordinates.

#### `Checked=Partially`
1. Duplicate `Checked=Selected`. Rename to `Checked=Partially`.
2. Inside `Group 1`, replace `Arrow/linear/Check` with a **VECTOR** layer:
   - Name it `Line 1 (Stroke)`
   - Size: 10.8×1.8px
   - Position: horizontally centered inside `Rectangle 1`
   - Bind **Fill** → `Icon/icon-white`
   - Set corner radius → 100px (pill-shaped ends)
   - No stroke on this VECTOR layer

#### `Checked=Disabled`
1. Duplicate `Checked=Enabled`. Rename to `Checked=Disabled`.
2. On `Rectangle 1`:
   - Change fill → `Component/Input Field/input-bg-disabled`
   - Change stroke → `Component/Input Field/input-border-disabled`
3. On `text`:
   - Change fill → `Component/Input Field/input-text-disabled`

#### `Checked=Disabled Checked`
1. Duplicate `Checked=Selected`. Rename to `Checked=Disabled Checked`.
2. On `Rectangle 1` inside `Group 1`:
   - Change fill → `Component/Input Field/input-bg-disabled`
   - Add stroke → `Component/Input Field/input-border-disabled` · 1px inside
3. On `text`:
   - Change fill → `Component/Input Field/input-text-disabled`
4. The `Arrow/linear/Check` icon remains. Override its inner Vector stroke → `Background/bg-gray_dark`. Do NOT use white — the Disabled Checked state uses a grey checkmark to match the muted disabled appearance.

### Step 3 — Combine into `Checkbox` Component Set

1. Select all 6 state components.
2. Combine into a **Component Set**. Name it `Checkbox`.
3. Add variant property `Checked` → options: `Enabled`, `Hover`, `Selected`, `Partially`, `Disabled`, `Disabled Checked`.

### Step 4 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — This step is mandatory.**

1. Select each variant COMPONENT frame.
2. Properties panel → click **"Expose properties from Nested instances"**.
3. The `Label` Boolean property surfaces on each Checkbox variant.

### Step 5 — Build `Checkbox Tile` Variants

**For each of the 5 types:**

1. Create a new **Frame**. Name it `Type=Enabled` (adjust per type).
2. Apply **Horizontal Auto Layout**. Set sizing to **FIXED width × HUG height**.
3. Set **cross-axis alignment to Top** — this ensures the Checkbox aligns to the top of the tile when the caption is long or multi-line. Do NOT use Center.
4. Bind padding all sides → `spacing-xl`.
5. Bind gap → `spacing-md`.
6. Bind corner radius all 4 corners → `radius-xl`.
7. Apply fill and stroke per the color table above.
8. Convert to a **Component**.

#### Checkbox Instance
1. Place an instance of **`Checkbox`** inside the tile frame as the first child.
2. Set `Label` property → `false` (hide the label text).
3. Set `Checked` property → matching state for this type:
   - Enabled → `Enabled`, Hover → `Hover`, Selected → `Selected`, Disabled → `Disabled`, Disabled Checked → `Disabled Checked`

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
3. Apply text style **`Body md/Medium`**.
4. Bind fill → `Text/text-primary` (active types) · `Component/Input Field/input-text-disabled` (disabled types).
5. Set sizing to **FILL × FIXED** (18px height).

#### Supporting text layer
1. Add a **Text** layer. Name it `Supporting text`.
2. Set default content to `Caption`.
3. Apply text style **`Label sm/Medium`**.
4. Bind fill → `Text/text-secondary` (active types) · `Component/Input Field/input-text-disabled` (disabled types).
5. Set sizing to **FILL × HUG**.
6. Create a **Boolean component property**: `Show Caption` (default: `true`). Link to layer visibility.

### Step 6 — Combine into `Checkbox Tile` Component Set

1. Select all 5 type components.
2. Combine into a **Component Set**. Name it `Checkbox Tile`.
3. Add variant property `Type` → options: `Enabled`, `Hover`, `Selected`, `Disabled`, `Disabled Checked`.

### Step 7 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — This step is mandatory** on `Checkbox Tile` variants.

1. Select each `Type` variant COMPONENT frame.
2. Properties panel → click **"Expose properties from Nested instances"**.
3. The `Checked` and `Label` properties from the nested `Checkbox` instance surface on each tile variant.

### Step 8 — Variable Attachment Locations

**Checkbox:**

| Target | Property | Variable |
|---|---|---|
| Checkbox frame | Gap | `spacing-xs` |
| `Rectangle 1` | Fill | See color table per state |
| `Rectangle 1` | Stroke color | See color table per state |
| `Rectangle 1` | Stroke weight | 1px (hardcoded) |
| `Rectangle 1` | Corner radius (all 4) | `radius-xs` |
| `text` | Fill | See color table per state |
| `text` | Text Style | `Body md/Medium` |
| `Line 1 (Stroke)` VECTOR | Fill | `Icon/icon-white` |
| `Arrow/linear/Check` → inner Vector (Selected) | **Stroke** | White (no variable binding confirmed in file) |
| `Arrow/linear/Check` → inner Vector (Disabled Checked) | **Stroke** | `Background/bg-gray_dark` |

**Checkbox Tile:**

| Target | Property | Variable |
|---|---|---|
| Tile frame | Fill | See color table per type |
| Tile frame | Stroke color | See color table per type |
| Tile frame | Stroke weight | 1px (hardcoded) |
| Tile frame | Padding (all 4) | `spacing-xl` |
| Tile frame | Gap | `spacing-md` |
| Tile frame | Corner radius (all 4) | `radius-xl` |
| `Text and supporting text` frame | Gap | `spacing-xs` |
| `Text` | Fill | See color table per type |
| `Text` | Text Style | `Body md/Medium` |
| `Supporting text` | Fill | See color table per type |
| `Supporting text` | Text Style | `Label sm/Medium` |

### Step 9 — Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Checkbox Component Set | `Checkbox` | `Checkbox` |
| Checkbox variant | `Checked=[State]` | `Checked=Enabled` |
| Checkbox Tile Component Set | `Checkbox Tile` | `Checkbox Tile` |
| Checkbox Tile variant | `Type=[Type]` | `Type=Enabled` |
| Rectangle box layer | `Rectangle 1` | `Rectangle 1` |
| Group container | `Group 1` | `Group 1` |
| Check icon layer | `Arrow/linear/Check` | `Arrow/linear/Check` |
| Dash indicator | `Line 1 (Stroke)` | `Line 1 (Stroke)` |
| Label text | `text` | `text` |
| Tile title | `Text` | `Text` |
| Tile caption | `Supporting text` | `Supporting text` |
| Tile content wrapper | `Content` | `Content` |
| Tile text stack | `Text and supporting text` | `Text and supporting text` |

---

## Mandatory Rules

- **Never use `_Primitives` variables directly.** All color variables must come from the `Color Style` collection.
- **Checkbox box size is 18×18px fixed.** Do not use HUG or FILL sizing on the Rectangle.
- **Rectangle 1 corner radius must be variable-bound** to `radius-xs` — do not hardcode 4px.
- **Text style only — no font variable bindings.** Apply text styles directly; do not bind individual font variables.
- **Check icon (`Arrow/linear/Check`) uses stroke for color.** The fill is hidden. Override the stroke on the inner Vector path. Do not apply fill.
- **Dash indicator (`Line 1 (Stroke)`) uses fill for color.** Bind fill → `Icon/icon-white`. This is the opposite of the check icon.
- **`Checkbox Tile` always sets `Label=false`** on its embedded Checkbox instance. The title text is the `Text` layer in the Content frame — not the Checkbox label.
- **Expose nested properties** on both `Checkbox` and `Checkbox Tile` variants so all boolean and state properties are accessible from the outside.
- **Stroke weight (1px) is hardcoded** on both Checkbox box and Checkbox Tile tile frame. No spacing variable for stroke weight exists.

---

## Known Issues & Flags

### ⚠️ 1 — Group instead of Auto Layout in Selected/Partially/Disabled Checked
The `Group 1` container (holding `Rectangle 1` + check icon/dash) is a plain GROUP, not a Frame with Auto Layout. The children are positioned manually at exact coordinates. This works for the current fixed 18×18px size but will not scale if the box size ever changes. No fix applied — documented as-is to match the existing Figma file.

### ⚠️ 2 — Reused Input Field variables for Checkbox disabled states
Checkbox and Checkbox Tile disabled states use `Component/Input Field/input-bg-disabled`, `Component/Input Field/input-border-disabled`, and `Component/Input Field/input-text-disabled`. These variables semantically belong to the Input Field component namespace. For a more correct architecture, dedicated `Component/Checkbox/` variables should be created for the disabled state. Documented as-is to match the existing Figma file.

### ⚠️ 3 — Checkbox box size has no sizing variable
The 18×18px fixed size of `Rectangle 1` has no spacing or sizing variable attached. It is hardcoded. This is consistent with the current design but limits scalability.

### ⚠️ 4 — Content frame gap uses external library variable
The `Content` frame inside `Checkbox Tile` has its gap bound to an external library variable (`VariableID:c5a2568ce222f398a0ded878a366b21f7de70f00/6425:50`). This is not a local spacing variable. When recreating this component, bind the Content frame gap to the appropriate local spacing variable.

---

## Figma Component Page — Arrangement

### Page Frame Structure

```
┌────────────────────────────────────────────────────────────┐
│  CHECKBOX COMPONENT SYSTEM         ← small caps label      │
│  Checkbox & Checkbox Tile          ← large bold title      │
│  Checkbox: 6 states · Label toggle                         │
│  Checkbox Tile: 5 types · Caption toggle ← summary         │
│  ─────────────────────────────────  ← divider              │
│                                                             │
│  ▌ Checkbox — All 6 States                                  │
│    Checked property · Label Boolean · 18×18px box           │
│                                                             │
│    [ actual Checkbox COMPONENT_SET placed here ]            │
│                                                             │
│  ▌ Checkbox Tile — All 5 Types                              │
│    Type property · Show Caption Boolean                     │
│    Embeds Checkbox instance · spacing-xl padding            │
│                                                             │
│    [ actual Checkbox Tile COMPONENT_SET placed here ]       │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Header Block

| Element | Content |
|---|---|
| System label | `CHECKBOX COMPONENT SYSTEM` |
| Title | `Checkbox & Checkbox Tile` |
| Summary tagline | `Checkbox: 6 states · Enabled · Hover · Selected · Partially · Disabled · Disabled Checked · Checkbox Tile: 5 types · Show Caption toggle` |
| Divider | Full-width horizontal rule below summary |

### Section 1 — Checkbox

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Checkbox — All 6 States` |
| Subtitle | `Checked property · Label Boolean · radius-xs box · Body md/Medium` |
| Content | Place the **actual `Checkbox` COMPONENT_SET** directly on the page |

### Section 2 — Checkbox Tile

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Checkbox Tile — All 5 Types` |
| Subtitle | `Type property · Show Caption Boolean · Embeds Checkbox instance · spacing-xl padding · radius-xl tile` |
| Content | Place the **actual `Checkbox Tile` COMPONENT_SET** directly on the page |

### Arrangement Rules

- Use **Auto Layout (Vertical)** for the main presentation frame with consistent gap between sections.
- The **blue accent bar** is a `3–4px wide rectangle` with the brand primary fill, full height of the section title block.
- **Do not create new instances or duplicate components** — place actual component sets directly.
- `Checkbox` default display: `Label=true`, show all 6 states.
- `Checkbox Tile` default display: `Show Caption=true`, show all 5 types.