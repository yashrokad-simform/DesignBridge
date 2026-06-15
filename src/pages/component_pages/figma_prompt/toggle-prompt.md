# Toggle, Toggle & Toggle Button Tile

## Overview

| Property | Value |
|---|---|
| Component Name | _base Toggle Switch · Toggle · Toggle Button Tile |
| Base Component | `_base Toggle Switch` (COMPONENT_SET — the foundational unit) |
| Component Sets | `_base Toggle Switch` · `Toggle Button Tile` |
| Single Component | `Toggle` (not a set — one COMPONENT with a Label boolean) |
| Node — _base Toggle Switch | `257:1767` |
| Node — Toggle | `94:585` |
| Node — Toggle Button Tile | `8091:69841` |
| _base Toggle Switch Variants | 4 |
| Toggle Variants | 1 (single component) |
| Toggle Button Tile Variants | 4 |
| Has States | Yes — on `_base Toggle Switch` and `Toggle Button Tile` |

`_base Toggle Switch` is the foundational on/off switch (track + knob). `Toggle` is the base switch plus an inline text label. `Toggle Button Tile` is a larger selection row that embeds a `_base Toggle Switch` instance alongside a title and caption. Both `Toggle` and `Toggle Button Tile` consume the `_base Toggle Switch` directly.

> ### ⚠️ Critical Requirement — Expose Nested Instance Properties
>
> The **`Toggle`** component and every **`Toggle Button Tile`** variant **MUST** have the `State` property from their nested **`_base Toggle Switch`** instance exposed onto them. In Figma: select the main component/variant → **Properties** panel → **"Expose properties from → Nested instances"**. Without this, the switch `State` stays buried inside the nested instance and designers cannot drive on/off/disabled from the outside. This applies to **every** variant — see the dedicated "Expose Nested Instance Properties" steps below.

---

## Component Hierarchy

```
Level 1 — _base Toggle Switch        [COMPONENT_SET]
  ├── State=Enabled                  [COMPONENT — off, light brand track]
  ├── State=Active                   [COMPONENT — on, orange track]
  ├── State=Disable                  [COMPONENT — off, muted]
  └── State=Active Disabled          [COMPONENT — on, muted]

Level 2 — Toggle                     [COMPONENT — contains _base Toggle Switch INSTANCE]
  └── (single component, Label Boolean toggles the inline text)

Level 2 — Toggle Button Tile         [COMPONENT_SET]
  ├── State=Enabled                  [COMPONENT — contains _base Toggle Switch INSTANCE]
  ├── State=Active                   [COMPONENT — contains _base Toggle Switch INSTANCE]
  ├── State=Disabled                 [COMPONENT — contains _base Toggle Switch INSTANCE]
  └── State=Active Disabled          [COMPONENT — contains _base Toggle Switch INSTANCE]
```

> ⚠️ **Architecture note:**
> `_base Toggle Switch` IS the base — there is no lower-level wrapper. `Toggle` and `Toggle Button Tile` each embed a `_base Toggle Switch` instance and set its `State` per variant.
>
> ⚠️ **State name mapping** — the Tile's `Disabled` variant drives the base switch's `Disable` state (note the spelling difference). The Tile's `Active Disabled` drives the base switch's `Active Disabled`.

---

## Variant Properties

### _base Toggle Switch

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Enabled` · `Active` · `Disable` · `Active Disabled` |

### Toggle

| Property | Type | Options |
|---|---|---|
| `Label` (`Label#495:1`) | BOOLEAN | `true` (text visible) · `false` (text hidden) |
| `State` (exposed from nested switch) | VARIANT | `Enabled` · `Active` · `Disable` · `Active Disabled` |

### Toggle Button Tile

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Enabled` · `Active` · `Disabled` · `Active Disabled` |

---

## Component Structure

### _base Toggle Switch — Layer Hierarchy

```
_base Toggle Switch                    [COMPONENT_SET]
  │   (each variant: 40×22px · layout = NONE / absolute positioning ⚠️)
  │
  ├── State=Enabled                    [COMPONENT · 40×22px]
  │     ├── Rectangle 4354             [RECTANGLE · 40×22px — the track]
  │     │     Fill:   Background/bg-brand_light
  │     │     Radius: radius-full (all corners)
  │     │     Stroke: None
  │     └── Ellipse 201                [ELLIPSE · 18×18px — the knob]
  │           Fill:   Background/bg-primary (white)
  │           Position: left (off) — manual offset, ~2px inset ⚠️
  │
  ├── State=Active                     [COMPONENT · 40×22px]
  │     ├── Rectangle 4354
  │     │     Fill:   Background/bg-brand_secondary (orange)
  │     │     Radius: radius-full
  │     └── Ellipse 201
  │           Fill:   Background/bg-primary (white)
  │           Position: right (on) — manual offset ⚠️
  │
  ├── State=Disable                    [COMPONENT · 40×22px]
  │     ├── Rectangle 4354
  │     │     Fill:   Background/bg-secondary (light grey)
  │     │     Radius: radius-full
  │     └── Ellipse 201
  │           Fill:   Background/bg-gray_dark (grey)
  │           Position: left (off)
  │
  └── State=Active Disabled            [COMPONENT · 40×22px]
        ├── Rectangle 4354
        │     Fill:   Background/bg-secondary (light grey)
        │     Radius: radius-full
        └── Ellipse 201
              Fill:   Background/bg-gray_dark (grey)
              Position: right (on)
```

### Toggle — Layer Hierarchy

```
Toggle                                 [COMPONENT]
      Auto Layout:  Horizontal · HUG × HUG
      Alignment:    Center (cross-axis)
      Gap:          spacing-md (8px)
      │
      ├── _base Toggle Switch          [INSTANCE · 40×22px · State=Enabled default]
      │
      └── Brand                        [TEXT · HUG × HUG]
            Default content: "Brand"
            Style:  Body sm/Medium
            Fill:   Text/text-primary
            Visible: Controlled by Label boolean property
```

### Toggle Button Tile — Layer Hierarchy

```
Toggle Button Tile                     [COMPONENT_SET]
  │
  └── State=Enabled (all states follow same structure)
        Auto Layout:   Horizontal · FIXED width × HUG height
        Alignment:     **Top** (cross-axis) — NOT center
        Padding:       None ⚠️ (no padding on the tile frame)
        Gap:           spacing-md (8px)
        Corner Radius: radius-xl (12px, all corners)
        Fill:          None ⚠️ (transparent — no tile background)
        Stroke:        None ⚠️ (no tile border)
        │
        ├── _base Toggle Switch        [INSTANCE · 40×22px · State=matching]
        │     (State property set per tile state — see mapping)
        │
        └── Content                    [FRAME · FILL × HUG · Horizontal AL]
              Alignment: Center (cross-axis)
              Gap:       (external library variable — see flags · 12px)
              │
              └── Text and supporting text  [FRAME · FILL × HUG · Vertical AL]
                    Gap: spacing-xs (4px)
                    │
                    ├── Text           [TEXT · FILL × FIXED · 18px height]
                    │     Default: "Help! Have a Fulfillment Emergency!"
                    │     Style: Body sm/Medium
                    │     Fill:  Text/text-primary (active) · input-text-disabled (disabled)
                    │
                    └── Supporting text [TEXT · FILL × HUG]
                          Default: "Caption"
                          Style:   Label sm/Medium
                          Fill:    Text/text-secondary (active) · input-text-disabled (disabled)
```

### Layer Descriptions

**_base Toggle Switch:**

| Layer | Type | Notes |
|---|---|---|
| `Rectangle 4354` | RECTANGLE | The track. 40×22px fixed. `radius-full`. Fill varies per state. No stroke |
| `Ellipse 201` | ELLIPSE | The knob. 18×18px fixed. Fill varies per state. Positioned manually (left = off, right = on) |

**Toggle:**

| Layer | Type | Notes |
|---|---|---|
| `_base Toggle Switch` | INSTANCE | Embedded switch. `State` set per use. Default `Enabled` |
| `Brand` | TEXT | Inline label. `Body sm/Medium`. Toggleable via `Label` boolean |

**Toggle Button Tile:**

| Layer | Type | Notes |
|---|---|---|
| `_base Toggle Switch` | INSTANCE | Embedded switch. `State` set per tile state |
| `Content` | FRAME | FILL × HUG. Horizontal AL. Holds the text stack |
| `Text and supporting text` | FRAME | Vertical AL. Title + caption |
| `Text` | TEXT | Title. `Body sm/Medium`. FILL × FIXED (18px) |
| `Supporting text` | TEXT | Caption. `Label sm/Medium`. FILL × HUG |

### Component Properties

**_base Toggle Switch:**

| Property | Type | Default | Purpose |
|---|---|---|---|
| `State` | VARIANT | `Enabled` | Switches between the 4 switch states |

**Toggle:**

| Property | Type | Default | Purpose |
|---|---|---|---|
| `Label#495:1` | BOOLEAN | `true` | Show/hide the `Brand` text layer |
| `State` (exposed) | VARIANT | `Enabled` | Drives the nested switch state |

**Toggle Button Tile:**

| Property | Type | Default | Purpose |
|---|---|---|---|
| `State` | VARIANT | `Enabled` | Switches between the 4 tile states |

---

## Attached Variables

### Spacing — Toggle

| Property | Variable | Value |
|---|---|---|
| Gap (Switch ↔ Brand label) | `spacing-md` | 8px |

### Spacing — Toggle Button Tile

| Property | Variable | Value |
|---|---|---|
| Padding (all sides) | — | None (0px) ⚠️ |
| Gap (Switch ↔ Content) | `spacing-md` | 8px |
| Gap (Text ↔ Supporting text) | `spacing-xs` | 4px |

### Radius

| Component | Property | Variable | Value |
|---|---|---|---|
| _base Toggle Switch | `Rectangle 4354` track radius (all 4) | `radius-full` | 9999px (pill) |
| Toggle Button Tile | Tile corner radius (all 4) | `radius-xl` | 12px |

> The knob `Ellipse 201` is a true ellipse (circle) — no radius variable needed.

### Sizing (hardcoded — no variables)

| Element | Size |
|---|---|
| Track (`Rectangle 4354`) | 40×22px fixed |
| Knob (`Ellipse 201`) | 18×18px fixed |

### Typography

| Component | Layer | Text Style | Font |
|---|---|---|---|
| Toggle | `Brand` | `Body sm/Medium` | Inter · Medium (500) · 14px · 18px LH |
| Toggle Button Tile | `Text` | `Body sm/Medium` | Inter · Medium (500) · 14px · 18px LH |
| Toggle Button Tile | `Supporting text` | `Label sm/Medium` | Inter · Medium (500) · 12px · 16px LH |

> Apply text styles directly on the text layers. Do not bind individual font variables.

### Colors — _base Toggle Switch (per state)

| State | Track (`Rectangle 4354`) Fill | Knob (`Ellipse 201`) Fill | Knob Position |
|---|---|---|---|
| `Enabled` | `Background/bg-brand_light` | `Background/bg-primary` (white) | Left (off) |
| `Active` | `Background/bg-brand_secondary` (orange) | `Background/bg-primary` (white) | Right (on) |
| `Disable` | `Background/bg-secondary` (light grey) | `Background/bg-gray_dark` (grey) | Left (off) |
| `Active Disabled` | `Background/bg-secondary` (light grey) | `Background/bg-gray_dark` (grey) | Right (on) |

### Colors — Toggle Button Tile (per state)

| State | Embedded Switch State | `Text` Fill | `Supporting text` Fill |
|---|---|---|---|
| `Enabled` | `Enabled` | `Text/text-primary` | `Text/text-secondary` |
| `Active` | `Active` | `Text/text-primary` | `Text/text-secondary` |
| `Disabled` | `Disable` | `Component/Input Field/input-text-disabled` | `Component/Input Field/input-text-disabled` |
| `Active Disabled` | `Active Disabled` | `Component/Input Field/input-text-disabled` | `Component/Input Field/input-text-disabled` |

> The tile frame itself has **no fill and no stroke** in any state — it is a transparent layout container. All visual state change comes from the embedded switch and the text colors.

---

## States

### _base Toggle Switch States

| State | Visual | Track Fill | Knob Fill | Knob |
|---|---|---|---|---|
| `Enabled` | Off · light brand track | `bg-brand_light` | `bg-primary` (white) | Left |
| `Active` | On · orange track | `bg-brand_secondary` (orange) | `bg-primary` (white) | Right |
| `Disable` | Off · muted grey | `bg-secondary` (grey) | `bg-gray_dark` (grey) | Left |
| `Active Disabled` | On · muted grey | `bg-secondary` (grey) | `bg-gray_dark` (grey) | Right |

### Toggle Button Tile States

| State | Embedded Switch | Text / Caption color |
|---|---|---|
| `Enabled` | `State=Enabled` (off) | Primary / secondary |
| `Active` | `State=Active` (on) | Primary / secondary |
| `Disabled` | `State=Disable` (off, muted) | `input-text-disabled` |
| `Active Disabled` | `State=Active Disabled` (on, muted) | `input-text-disabled` |

**What changes between Toggle Button Tile states:**

| Property | Enabled → Active | Active → Active Disabled | Enabled → Disabled |
|---|---|---|---|
| Switch state | `Enabled` → `Active` | `Active` → `Active Disabled` | `Enabled` → `Disable` |
| Track fill | `bg-brand_light` → `bg-brand_secondary` | → `bg-secondary` | → `bg-secondary` |
| Knob fill | white (no change) | white → `bg-gray_dark` | white → `bg-gray_dark` |
| Text fill | No change | → `input-text-disabled` | → `input-text-disabled` |
| Caption fill | No change | → `input-text-disabled` | → `input-text-disabled` |
| Tile fill / stroke | None (no change) | None | None |

---

## Figma Construction Guide

### Step 1 — Build `_base Toggle Switch` — `State=Enabled`

1. Create a new **Frame**. Name it `State=Enabled`.
2. Set sizing to **40×22px fixed**. Layout = **None** (absolute positioning — the knob is placed manually, not via Auto Layout).
3. No fill, no stroke, no padding on the component frame itself.
4. Convert to a **Component**.

#### Rectangle 4354 (track)
1. Draw a **Rectangle** inside the frame. Name it `Rectangle 4354`.
2. Set size to **40×22px** (fills the frame).
3. Bind **Fill** → `Background/bg-brand_light`.
4. Bind **corner radius** on all 4 corners → `radius-full`.
5. No stroke.

#### Ellipse 201 (knob)
1. Draw an **Ellipse** inside the frame. Name it `Ellipse 201`.
2. Set size to **18×18px fixed**.
3. Bind **Fill** → `Background/bg-primary` (white).
4. Position it on the **left** (off position) — roughly 2px inset from the left and vertically centered (≈ x:2, y:2).

### Step 2 — Build Remaining Switch States

#### `State=Active`
1. Duplicate `State=Enabled`. Rename to `State=Active`.
2. `Rectangle 4354` fill → `Background/bg-brand_secondary` (orange).
3. Move `Ellipse 201` to the **right** (on position) — ≈ x:20, y:2 (40 − 18 − 2). Knob fill stays `Background/bg-primary`.

#### `State=Disable`
1. Duplicate `State=Enabled`. Rename to `State=Disable`.
2. `Rectangle 4354` fill → `Background/bg-secondary` (light grey).
3. `Ellipse 201` fill → `Background/bg-gray_dark` (grey). Keep knob on the **left**.

#### `State=Active Disabled`
1. Duplicate `State=Active`. Rename to `State=Active Disabled`.
2. `Rectangle 4354` fill → `Background/bg-secondary` (light grey).
3. `Ellipse 201` fill → `Background/bg-gray_dark` (grey). Keep knob on the **right**.

### Step 3 — Combine into `_base Toggle Switch` Component Set

1. Select all 4 state components.
2. Combine into a **Component Set**. Name it `_base Toggle Switch`.
3. Add variant property `State` → options: `Enabled`, `Active`, `Disable`, `Active Disabled`.

### Step 4 — Build `Toggle`

1. Create a new **Frame**. Name it `Toggle`.
2. Apply **Horizontal Auto Layout**. Set sizing to **HUG × HUG**.
3. Set cross-axis alignment to **Center**.
4. Bind **Gap** → `spacing-md` (8px). No fill, no stroke, no padding.
5. Convert to a **Component**.

#### _base Toggle Switch instance
1. Place an instance of **`_base Toggle Switch`** as the first child.
2. Leave `State` at `Enabled` (default).

#### Brand (label)
1. Add a **Text** layer. Name it `Brand`. Default content: `Brand`.
2. Apply text style **`Body sm/Medium`**.
3. Bind fill → `Text/text-primary`.
4. Set sizing to **HUG** on both axes.
5. Create a **Boolean component property**: `Label` (default: `true`). Link to the `Brand` layer visibility.

### Step 5 — Expose Nested Instance Properties (Toggle)

> ⚠️ **CRITICAL — mandatory.**

1. Select the `Toggle` component.
2. Properties panel → click **"Expose properties from Nested instances"**.
3. The `State` property from the nested `_base Toggle Switch` surfaces on the `Toggle` component.

### Step 6 — Build `Toggle Button Tile` Variants

**For each of the 4 states:**

1. Create a new **Frame**. Name it `State=Enabled` (adjust per state).
2. Apply **Horizontal Auto Layout**. Set sizing to **FIXED width × HUG height**.
3. Set **cross-axis alignment to Top** — keeps the switch aligned to the top when the caption wraps. Do NOT use Center.
4. **No padding** on the tile frame.
5. Bind gap → `spacing-md` (8px).
6. Bind corner radius all 4 corners → `radius-xl` (12px).
7. **No fill, no stroke** on the tile frame (transparent container).
8. Convert to a **Component**.

#### _base Toggle Switch instance
1. Place an instance of **`_base Toggle Switch`** as the first child.
2. Set `State` per the mapping:
   - Tile `Enabled` → switch `Enabled`
   - Tile `Active` → switch `Active`
   - Tile `Disabled` → switch `Disable`
   - Tile `Active Disabled` → switch `Active Disabled`

#### Content frame
1. Create a **Frame** inside the tile. Name it `Content`.
2. Set to **Horizontal Auto Layout**, sizing **FILL × HUG**, `layoutGrow=1`.
3. Set cross-axis alignment to **Center**.
4. Bind gap → local spacing variable (12px — see Flags re: external library variable).

#### Text and supporting text frame (inside Content)
1. Create a **Frame** inside Content. Name it `Text and supporting text`.
2. Set to **Vertical Auto Layout**, sizing **FILL × HUG**, `layoutGrow=1`.
3. Bind gap → `spacing-xs` (4px).

#### Text layer
1. Add a **Text** layer. Name it `Text`.
2. Default content: `Help! Have a Fulfillment Emergency!`.
3. Apply text style **`Body sm/Medium`**.
4. Bind fill → `Text/text-primary` (active states) · `Component/Input Field/input-text-disabled` (disabled states).
5. Set sizing to **FILL × FIXED** (18px height).

#### Supporting text layer
1. Add a **Text** layer. Name it `Supporting text`.
2. Default content: `Caption`.
3. Apply text style **`Label sm/Medium`**.
4. Bind fill → `Text/text-secondary` (active states) · `Component/Input Field/input-text-disabled` (disabled states).
5. Set sizing to **FILL × HUG**.

### Step 7 — Combine into `Toggle Button Tile` Component Set

1. Select all 4 state components.
2. Combine into a **Component Set**. Name it `Toggle Button Tile`.
3. Add variant property `State` → options: `Enabled`, `Active`, `Disabled`, `Active Disabled`.

### Step 8 — Expose Nested Instance Properties (Tile)

> ⚠️ **CRITICAL — mandatory** on every `Toggle Button Tile` variant.

1. Select each `State` variant COMPONENT frame.
2. Properties panel → click **"Expose properties from Nested instances"**.
3. The `State` property from the nested `_base Toggle Switch` surfaces on each tile variant.

### Step 9 — Variable Attachment Locations

**_base Toggle Switch:**

| Target | Property | Variable |
|---|---|---|
| `Rectangle 4354` | Fill | See color table per state |
| `Rectangle 4354` | Corner radius (all 4) | `radius-full` |
| `Ellipse 201` | Fill | See color table per state |
| Track size | 40×22px | Hardcoded (no variable) |
| Knob size | 18×18px | Hardcoded (no variable) |
| Knob position | x/y offset | Manual (no variable) |

**Toggle:**

| Target | Property | Variable |
|---|---|---|
| Toggle frame | Gap | `spacing-md` |
| `Brand` | Fill | `Text/text-primary` |
| `Brand` | Text Style | `Body sm/Medium` |

**Toggle Button Tile:**

| Target | Property | Variable |
|---|---|---|
| Tile frame | Gap | `spacing-md` |
| Tile frame | Corner radius (all 4) | `radius-xl` |
| Tile frame | Padding | None |
| Tile frame | Fill / Stroke | None |
| `Content` frame | Gap | external library variable (12px) — rebind to local |
| `Text and supporting text` frame | Gap | `spacing-xs` |
| `Text` | Fill | See color table per state |
| `Text` | Text Style | `Body sm/Medium` |
| `Supporting text` | Fill | See color table per state |
| `Supporting text` | Text Style | `Label sm/Medium` |

### Step 10 — Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Base switch Component Set | `_base Toggle Switch` | `_base Toggle Switch` |
| Base switch variant | `State=[State]` | `State=Enabled` |
| Track layer | `Rectangle 4354` | `Rectangle 4354` |
| Knob layer | `Ellipse 201` | `Ellipse 201` |
| Toggle component | `Toggle` | `Toggle` |
| Toggle label | `Brand` | `Brand` |
| Tile Component Set | `Toggle Button Tile` | `Toggle Button Tile` |
| Tile variant | `State=[State]` | `State=Active` |
| Tile content wrapper | `Content` | `Content` |
| Tile text stack | `Text and supporting text` | `Text and supporting text` |
| Tile title | `Text` | `Text` |
| Tile caption | `Supporting text` | `Supporting text` |

---

## Mandatory Rules

- **Never use `_Primitives` variables directly.** All color variables must come from the `Color Style` collection.
- **Track size is 40×22px and knob is 18×18px — both hardcoded.** No sizing variable exists for either.
- **Track corner radius must be variable-bound** to `radius-full` — do not hardcode 9999.
- **The track has no stroke** in any state. Color comes from the fill only.
- **The knob is positioned manually** (absolute), not via Auto Layout. Off = left, On = right. There is no layout/variable driving knob position.
- **Text style only — no font variable bindings.** Apply text styles directly.
- **`Toggle Button Tile` has no padding, no fill, and no stroke** on the tile frame. It is a transparent layout container — unlike the Checkbox Tile.
- **State name mismatch:** the Tile `Disabled` variant uses the base switch `Disable` state (spelling differs). Keep both names exact.
- **Expose nested `State`** on both `Toggle` and `Toggle Button Tile` so the switch can be driven from the outside.

---

## Known Issues & Flags

### ⚠️ 1 — Switch uses absolute positioning instead of Auto Layout
The `_base Toggle Switch` variants have layout = NONE; the knob (`Ellipse 201`) is positioned by hand inside the 40×22 track. The "on/off" knob shift between states is a manual coordinate change, not an Auto Layout alignment. This works at the fixed 40×22 size but will not adapt if the track is resized. Documented as-is to match the existing Figma file.

### ⚠️ 2 — Track and knob sizes have no sizing variables
The 40×22px track and 18×18px knob are hardcoded. No spacing/sizing variable is attached. Consistent with the current design but limits scalability.

### ⚠️ 3 — Reused Input Field variable for disabled text
Disabled and Active Disabled tile states use `Component/Input Field/input-text-disabled` for both title and caption. This variable semantically belongs to the Input Field namespace. For a cleaner architecture, dedicated `Component/Toggle/` disabled variables could be created. Documented as-is.

### ⚠️ 4 — Content frame gap uses external library variable
The `Content` frame inside `Toggle Button Tile` has its gap bound to an external library variable (`VariableID:c5a2568ce222f398a0ded878a366b21f7de70f00/6425:50`, resolving to 12px). This is not a local spacing variable. When recreating, bind the Content frame gap to the appropriate local spacing variable.

### ⚠️ 5 — `Disable` vs `Active Disabled` base states are visually identical except knob position
Both muted states share track `bg-secondary` and knob `bg-gray_dark`; only the knob position (left vs right) differs. Be careful not to merge them.

---

## Figma Component Page — Arrangement

### Page Frame Structure

```
┌────────────────────────────────────────────────────────────┐
│  TOGGLE COMPONENT SYSTEM            ← small caps label      │
│  Toggle Switch, Toggle & Toggle Button Tile  ← large title  │
│  Switch: 4 states · Toggle: Label toggle                    │
│  Tile: 4 states                     ← summary               │
│  ─────────────────────────────────  ← divider              │
│                                                             │
│  ▌ _base Toggle Switch — All 4 States                       │
│    State property · 40×22 track · 18×18 knob                │
│                                                             │
│    [ actual _base Toggle Switch COMPONENT_SET placed here ] │
│                                                             │
│  ▌ Toggle — Switch + Label                                  │
│    Label Boolean · spacing-md gap                           │
│                                                             │
│    [ actual Toggle COMPONENT placed here ]                  │
│                                                             │
│  ▌ Toggle Button Tile — All 4 States                        │
│    State property · embeds switch · radius-xl tile          │
│                                                             │
│    [ actual Toggle Button Tile COMPONENT_SET placed here ]  │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Header Block

| Element | Content |
|---|---|
| System label | `TOGGLE COMPONENT SYSTEM` |
| Title | `Toggle Switch, Toggle & Toggle Button Tile` |
| Summary tagline | `Switch: 4 states · Enabled · Active · Disable · Active Disabled · Toggle: Label toggle · Tile: 4 states` |
| Divider | Full-width horizontal rule below summary |

### Section 1 — _base Toggle Switch

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `_base Toggle Switch — All 4 States` |
| Subtitle | `State property · 40×22 track · 18×18 knob · radius-full` |
| Content | Place the **actual `_base Toggle Switch` COMPONENT_SET** directly on the page |

### Section 2 — Toggle

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Toggle — Switch + Label` |
| Subtitle | `Label Boolean · spacing-md gap · Body sm/Medium label` |
| Content | Place the **actual `Toggle` COMPONENT** directly on the page |

### Section 3 — Toggle Button Tile

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Toggle Button Tile — All 4 States` |
| Subtitle | `State property · Embeds switch instance · spacing-md gap · radius-xl tile · no padding/fill` |
| Content | Place the **actual `Toggle Button Tile` COMPONENT_SET** directly on the page |

### Arrangement Rules

- Use **Auto Layout (Vertical)** for the main presentation frame with consistent gap between sections.
- The **blue accent bar** is a `3–4px wide rectangle` with the brand primary fill, full height of the section title block.
- **Do not create new instances or duplicate components** — place actual component sets directly.
- `_base Toggle Switch` default display: show all 4 states.
- `Toggle` default display: `Label=true`.
- `Toggle Button Tile` default display: show all 4 states.