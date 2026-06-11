# Tabs & Capsule Tabs

## Overview

| Property | Value |
|---|---|
| System Name | Tabs & Capsule Tabs |
<!-- STD_S -->
| Node — `_base Tab` | `11:4654` |
| Node — `Tabs` | `40:2735` |
| `_base Tab` Variants | 4 (Active × Disabled) |
| `Tabs` Variants | 5 (Tabs count) |
<!-- STD_E -->
<!-- CAPS_S -->
| Node — `_base Capsule Tabs` | `324:6244` |
| Node — `Capsule Tabs` | `9676:210586` |
| `_base Capsule Tabs` Variants | 2 (Active) |
| `Capsule Tabs` Variants | 5 (Tabs count) |
<!-- CAPS_E -->

---

## Component Page Inputs → Figma Properties

| Input | Control Type | Options | Figma Target |
|---|---|---|---|
| `Standard` | Toggle | On / Off | Show/hide the `Tabs` Component Set on the page |
| `Capsule` | Toggle | On / Off | Show/hide the `Capsule Tabs` Component Set on the page |
<!-- COUNT_S -->
| `Count Badge` | Toggle | On / Off | `Count` Boolean on `_base Tab` instances — `true` shows badge · `false` hides it |
<!-- COUNT_E -->
<!-- STD_S -->
| `Standard — Text Size` | Select | `12px` · `14px` · `16px` | Text style on `Tab 1` layer in `_base Tab` |
<!-- STD_E -->
<!-- CAPS_S -->
| `Capsule — Text Size` | Select | `12px` · `14px` · `16px` | Text style on `All` layer in `_base Capsule Tabs` |
<!-- CAPS_E -->

---

## Text Size → Figma Text Style Map

<!-- STD_S -->
### Standard Tabs (`_base Tab`)

| Text Size | Active=No Style | Active=No Font | Active=Yes Style | Active=Yes Font |
|---|---|---|---|---|
| `12px` | `Label sm/Medium` | Inter · 500 · 12px · 16px LH | `Label sm/Semi Bold` | Inter · 600 · 12px · 16px LH |
| `14px` *(default)* | `Body sm/Medium` | Inter · 500 · 14px · 18px LH | `Body sm/Semi Bold` | Inter · 600 · 14px · 18px LH |
| `16px` | `Body md/Medium` | Inter · 500 · 16px · 22px LH | `Body md/Semi Bold` | Inter · 600 · 16px · 22px LH |

<!-- STD_E -->
<!-- CAPS_S -->
### Capsule Tabs (`_base Capsule Tabs`)

Both Active=Yes and Active=No always use Medium weight — text color never changes, only the container.

| Text Size | Style (both states) | Font |
|---|---|---|
| `12px` | `Label sm/Medium` | Inter · Medium 500 · 12px · 16px LH |
| `14px` *(default)* | `Body sm/Medium` | Inter · Medium 500 · 14px · 18px LH |
| `16px` | `Body md/Medium` | Inter · Medium 500 · 16px · 22px LH |

<!-- CAPS_E -->

---

## Component Hierarchy & Build Order

```
<!-- STD_S -->
System A — Underline Tabs
  Level 1 — _base Tab            [COMPONENT_SET]
  Level 2 — Tabs                 [COMPONENT_SET]
<!-- STD_E -->
<!-- CAPS_S -->
System B — Capsule Tabs
  Level 1 — _base Capsule Tabs   [COMPONENT_SET]
  Level 2 — Capsule Tabs         [COMPONENT_SET]
<!-- CAPS_E -->
```

<!-- STD_S -->
**Build order (Standard):** `_base Tab` → `Tabs`
<!-- STD_E -->
<!-- CAPS_S -->
**Build order (Capsule):** `_base Capsule Tabs` → `Capsule Tabs`
<!-- CAPS_E -->

---

<!-- STD_S -->
## System A — Underline Tabs

### 1. `_base Tab`

#### Variant Properties

| Property | Type | Options |
|---|---|---|
| `Active` | VARIANT | `No` · `Yes` |
| `Disabled` | VARIANT | `false` · `true` |
<!-- COUNT_S -->
| `Count#8087:1` | BOOLEAN | `true` (default) |
<!-- COUNT_E -->

#### Structure

```
Active=No, Disabled=false          [COMPONENT · Vertical AL · HUG × HUG · Center cross-axis]
  │
  ├── Text+Count                   [FRAME · HUG × HUG · Horizontal AL · Center both]
  │     Padding: spacing-xl (12px) all sides
  │     Gap:     spacing-xs (4px)
  │     │
  │     ├── Tab 1                  [TEXT · HUG × HUG]
  │     │     Style: Body sm/Medium
  │     │     Font:  Inter · Medium 500 · 14px · 18px LH
  │     │     Fill:  Text/text-primary
  │     │     Align: CENTER
<!-- COUNT_S -->
  │     │
  │     └── Count                  [FRAME · 18×18px FIXED · Center both]
  │           Fill:   Status/bg-critical
  │           Radius: radius-full (all 4 corners)
  │           Visible: Count boolean
  │           └── 2                [TEXT · FILL × HUG · CENTER align]
  │                 Style: Caption (style ID: 19308:22120)
  │                 Font:  Inter · Regular 400 · 10px · 12px LH
  │                 Fill:  Text/text-white
<!-- COUNT_E -->
  │
  └── Active Tab 1                 [RECTANGLE · FILL × FIXED(2px)]
        Fill: None — inactive has no indicator

Active=Yes, Disabled=false         [COMPONENT · Vertical AL · HUG × HUG]
  Gap: spacing-none (0px)
  │
  ├── Frame 1                      [FRAME · HUG × HUG · Horizontal AL · Center both]
  │     Padding: spacing-xl (12px) all sides · Gap: spacing-xs (4px)
  │     │
  │     ├── Tab 1                  [TEXT · HUG × HUG]
  │     │     Style: Body sm/Semi Bold
  │     │     Font:  Inter · Semi Bold 600 · 14px · 18px LH
  │     │     Fill:  Text/text-brand_secondary (orange)
  │     │     Align: CENTER
<!-- COUNT_S -->
  │     │
  │     └── Count                  [FRAME · 18×18px FIXED · same as Active=No]
<!-- COUNT_E -->
  │
  └── Active Tab 1                 [RECTANGLE · FILL × FIXED(2px)]
        Fill: Border/border-secondary (orange) — active underline indicator

Active=No / Active=Yes, Disabled=true
  Identical structure to the matching Disabled=false variant
  Opacity: 40% on the outer COMPONENT frame — only change for disabled
```

> ⚠️ **Active indicator:** `Active Tab 1` is a 2px RECTANGLE. Active=No fill = None. Active=Yes fill = `Border/border-secondary`.
> ⚠️ **Disabled = opacity 40% only.** No fill, stroke, or text variable changes.

#### Color Variables — `_base Tab`

| Layer | State | Variable |
|---|---|---|
| `Tab 1` text | Active=No | `Text/text-primary` |
| `Tab 1` text | Active=Yes | `Text/text-brand_secondary` |
<!-- COUNT_S -->
| `Count` frame | Both | `Status/bg-critical` |
| `2` text | Both | `Text/text-white` |
<!-- COUNT_E -->
| `Active Tab 1` | Active=No | None |
| `Active Tab 1` | Active=Yes | `Border/border-secondary` |

#### Variable Attachment — `_base Tab`

| Target | Property | Variable |
|---|---|---|
| `Text+Count` / `Frame 1` | Padding all sides | `spacing-xl` |
| `Text+Count` / `Frame 1` | Gap | `spacing-xs` |
| `Active=Yes` outer frame | Gap | `spacing-none` |
<!-- COUNT_S -->
| `Count` frame | Fill | `Status/bg-critical` |
| `Count` frame | Corner radius (all 4) | `radius-full` |
<!-- COUNT_E -->
| `Tab 1` (Active=No) | Text Style | `Body sm/Medium` |
| `Tab 1` (Active=No) | Fill | `Text/text-primary` |
| `Tab 1` (Active=Yes) | Text Style | `Body sm/Semi Bold` |
| `Tab 1` (Active=Yes) | Fill | `Text/text-brand_secondary` |
<!-- COUNT_S -->
| `2` (count number) | Text Style | `Caption` |
| `2` (count number) | Fill | `Text/text-white` |
<!-- COUNT_E -->
| `Active Tab 1` (Active=Yes) | Fill | `Border/border-secondary` |

---

### 2. `Tabs`

#### Variant Properties

| Property | Type | Options |
|---|---|---|
| `Tabs` | VARIANT | `2` · `3` · `4` · `5` · `6` |

#### Structure

```
Tabs=6                             [COMPONENT · HUG × HUG · Horizontal AL]
  └── Tabs                         [FRAME · HUG × HUG · Horizontal AL]
        Gap:    spacing-none (0px)
        Stroke: Border/border-primary · 1px · bottom side only
        │
        ├── Tab 01                 [INSTANCE · Active=Yes · Disabled=false]
        ├── Tab 02                 [INSTANCE · Active=No  · Disabled=false]
        ├── Tab 03                 [INSTANCE · Active=No  · Disabled=false]
        ├── Tab 04                 [INSTANCE · Active=No  · Disabled=false]
        ├── Tab 05                 [INSTANCE · Active=No  · Disabled=false]
        └── Tab 06                 [INSTANCE · Active=No  · Disabled=true ]
```

| Variant | Visible tabs | Hidden (visible=false) |
|---|---|---|
| `Tabs=2` | Tab 01–02 | Tab 03–06 |
| `Tabs=3` | Tab 01–03 | Tab 04–06 |
| `Tabs=4` | Tab 01–04 | Tab 05–06 |
| `Tabs=5` | Tab 01–05 | Tab 06 |
| `Tabs=6` | Tab 01–06 | None |

> ⚠️ All 6 instances exist in every variant — extra tabs use `visible=false` not deletion.
> ⚠️ **Bottom-only border:** Top=0 · Left=0 · Right=0 · Bottom=1px · color = `Border/border-primary`.

#### Variable Attachment — `Tabs`

| Target | Property | Variable |
|---|---|---|
| `Tabs` frame | Gap | `spacing-none` |
| `Tabs` frame | Stroke color | `Border/border-primary` |
| `Tabs` frame | Stroke side | Bottom only |
| `Tabs` frame | Stroke weight | 1px (hardcoded) |

<!-- STD_E -->

<!-- CAPS_S -->
## System B — Capsule Tabs

### 3. `_base Capsule Tabs`

#### Variant Properties

| Property | Type | Options |
|---|---|---|
| `Active` | VARIANT | `Yes` · `No` |

#### Structure

```
Active=Yes                         [COMPONENT · HUG × HUG · Horizontal AL · Center both]
  Padding L/R: spacing-4xl (20px)
  Padding T/B: spacing-md (8px)
  Fill:        Background/bg-primary (white)
  Radius:      radius-md (all 4 corners) — 8px
  Shadow:      DROP_SHADOW · offset(0,1) · radius 24 · rgba(76%,76%,76%,22%)
  └── All                          [TEXT · HUG × HUG]
        Style: Body sm/Medium
        Font:  Inter · Medium 500 · 14px · 18px LH
        Fill:  Text/text-primary
        Align: CENTER

Active=No                          [COMPONENT · HUG × HUG · Horizontal AL · Center both]
  Padding L/R: spacing-4xl (20px)
  Padding T/B: spacing-md (8px)
  Fill:        None — transparent
  Radius:      radius-xl (all 4 corners) — 12px
  No shadow
  └── All                          [TEXT · HUG × HUG]
        Style: Body sm/Medium
        Font:  Inter · Medium 500 · 14px · 18px LH
        Fill:  Text/text-primary
        Align: CENTER
```

> **Text color does NOT change between states.** Both use `Text/text-primary`.
> **Radius differs:** Active=Yes = `radius-md` (8px) · Active=No = `radius-xl` (12px).

#### Color Variables — `_base Capsule Tabs`

| State | Frame fill | Text fill | Shadow |
|---|---|---|---|
| `Active=Yes` | `Background/bg-primary` | `Text/text-primary` | DROP_SHADOW style `8093:144681` |
| `Active=No` | None | `Text/text-primary` | None |

#### Variable Attachment — `_base Capsule Tabs`

| Target | Property | Variable |
|---|---|---|
| Frame (both states) | Padding L/R | `spacing-4xl` |
| Frame (both states) | Padding T/B | `spacing-md` |
| Frame (Active=Yes) | Fill | `Background/bg-primary` |
| Frame (Active=Yes) | Corner radius (all 4) | `radius-md` |
| Frame (Active=No) | Fill | None |
| Frame (Active=No) | Corner radius (all 4) | `radius-xl` |
| `All` text (both states) | Text Style | `Body sm/Medium` |
| `All` text (both states) | Fill | `Text/text-primary` |

---

### 4. `Capsule Tabs`

#### Variant Properties

| Property | Type | Options |
|---|---|---|
| `Tabs` | VARIANT | `2` · `3` · `4` · `5` · `6` |

#### Structure

```
Tabs=2                             [COMPONENT · HUG × HUG · Horizontal AL]
  Padding: spacing-xs (4px) all sides
  Fill:    Background/bg-secondary
  Radius:  radius-xl (all corners) — 12px
  │
  ├── _base Capsule Tabs           [INSTANCE · Active=Yes]
  └── _base Capsule Tabs           [INSTANCE · Active=No]
```

Extra instances beyond the count use `visible=false`.

#### Variable Attachment — `Capsule Tabs`

| Target | Property | Variable |
|---|---|---|
| Outer frame | Padding all sides | `spacing-xs` |
| Outer frame | Fill | `Background/bg-secondary` |
| Outer frame | Corner radius (all 4) | `radius-xl` |

<!-- CAPS_E -->

---

## Typography

<!-- STD_S -->
### Standard Tabs

| Layer | Style | Font | Size | Weight | LH |
|---|---|---|---|---|---|
| `Tab 1` (Active=No) | `Body sm/Medium` | Inter | 14px | 500 | 18px |
| `Tab 1` (Active=Yes) | `Body sm/Semi Bold` | Inter | 14px | 600 | 18px |
<!-- COUNT_S -->
| `2` (Count badge) | `Caption` | Inter | 10px | 400 | 12px |
<!-- COUNT_E -->

<!-- STD_E -->
<!-- CAPS_S -->
### Capsule Tabs

| Layer | Style | Font | Size | Weight | LH |
|---|---|---|---|---|---|
| `All` (both states) | `Body sm/Medium` | Inter | 14px | 500 | 18px |

<!-- CAPS_E -->

> Apply text styles directly. Never bind individual font variables.

---

## Figma Construction Guide

<!-- STD_S -->
### Step 1 — `_base Tab` · Active=No, Disabled=false

1. Create a **Frame** → name `Active=No, Disabled=false` · Vertical AL · HUG × HUG · Center cross-axis · no fill.
2. Convert to **Component**.

**Text+Count frame:** Add inner Frame `Text+Count` · Horizontal AL · HUG × HUG · Center both. Bind padding all sides → `spacing-xl`. Bind gap → `spacing-xs`.

**Tab 1 text:** Add Text `Tab 1` · content "Tab 1" · apply style `Body sm/Medium` · bind fill → `Text/text-primary` · HUG × HUG · text align CENTER.

<!-- COUNT_S -->
**Count badge:** Add Frame `Count` · 18×18px FIXED · Center both · bind fill → `Status/bg-critical` · bind corner radius all 4 → `radius-full` · Boolean property `Count` (default `true`) linked to frame visibility. Inside: Text `2` · content "2" · apply style `Caption` · bind fill → `Text/text-white` · FILL × HUG.

<!-- COUNT_E -->
**Active Tab 1 indicator:** Add Rectangle `Active Tab 1` below `Text+Count` · FILL × FIXED(2px) · **Fill = None** (inactive).

### Step 2 — `_base Tab` · Active=Yes, Disabled=false

1. Duplicate `Active=No, Disabled=false` → rename `Active=Yes, Disabled=false`.
2. Outer frame: bind gap → `spacing-none`.
3. Rename inner frame `Text+Count` → `Frame 1`.
4. `Tab 1` text: change style → `Body sm/Semi Bold` · change fill → `Text/text-brand_secondary`.
5. `Active Tab 1`: bind fill → `Border/border-secondary`.

### Step 3 — Disabled Variants

1. Duplicate `Active=No, Disabled=false` → rename `Active=No, Disabled=true` · set **Opacity = 40%**.
2. Duplicate `Active=Yes, Disabled=false` → rename `Active=Yes, Disabled=true` · set **Opacity = 40%**.

### Step 4 — Combine into `_base Tab` Component Set

1. Select all 4 variants → Combine → name `_base Tab`.
2. Add property `Active` → `No`, `Yes`.
3. Add property `Disabled` → `false`, `true`.
<!-- COUNT_S -->
4. Add Boolean property `Count` (default `true`) → link to `Count` frame visibility in all variants.
<!-- COUNT_E -->
5. **Expose properties from Nested instances** on all variants. ⚠️ CRITICAL.

### Step 5 — Build `Tabs` Variants (×5)

For each of `Tabs=2` through `Tabs=6`:

1. Create Frame → Horizontal AL · HUG × HUG → convert to Component → name `Tabs=N`.
2. Add inner Frame `Tabs` · bind gap → `spacing-none`.
3. Stroke: **Bottom only** · 1px · bind → `Border/border-primary`. (Top=0 · Left=0 · Right=0 · Bottom=1px)
4. Add 6 instances of `_base Tab` (Tab 01–06): Tab 01 `Active=Yes` · Tab 02–05 `Active=No` · Tab 06 `Disabled=true`.
5. Hide extra tabs with `visible=false` per count.
<!-- COUNT_S -->
6. Tab 01 `Count=true` (value "3") · Tab 02 `Count=true` (value "12") · rest `Count=false`.
<!-- COUNT_E -->

### Step 6 — Combine into `Tabs` Component Set

1. Select all 5 variants → Combine → name `Tabs` → add property `Tabs` → `2`, `3`, `4`, `5`, `6`.
2. **Expose properties from Nested instances** on all 5. ⚠️ CRITICAL.

<!-- STD_E -->

<!-- CAPS_S -->
### Step 7 — `_base Capsule Tabs` · Active=Yes

1. Create Frame `Active=Yes` · Horizontal AL · HUG × HUG · Center both.
2. Bind padding L/R → `spacing-4xl` · padding T/B → `spacing-md`.
3. Bind fill → `Background/bg-primary` · corner radius all 4 → `radius-md`.
4. Add DROP_SHADOW (style `8093:144681`): offset(0,1) · radius 24 · rgba(76%,76%,76%,22%).
5. Add Text `All` · apply style `Body sm/Medium` · bind fill → `Text/text-primary` · HUG × HUG · CENTER.
6. Convert to **Component**.

### Step 8 — `_base Capsule Tabs` · Active=No

1. Duplicate `Active=Yes` → rename `Active=No`.
2. Remove fill. Change corner radius all 4 → `radius-xl`. Remove DROP_SHADOW.

### Step 9 — Combine into `_base Capsule Tabs` Component Set

1. Select both → Combine → name `_base Capsule Tabs` → property `Active` → `Yes`, `No`.
2. **Expose properties from Nested instances**. ⚠️ CRITICAL.

### Step 10 — Build `Capsule Tabs` Variants (×5)

For each of `Tabs=2` through `Tabs=6`:

1. Create Frame · bind padding → `spacing-xs` · fill → `Background/bg-secondary` · radius → `radius-xl` · convert to Component.
2. Add N instances: first `Active=Yes`, rest `Active=No`. Hide extras with `visible=false`.

### Step 11 — Combine into `Capsule Tabs` Component Set

1. Select all 5 → Combine → name `Capsule Tabs` → property `Tabs` → `2`, `3`, `4`, `5`, `6`.
2. **Expose properties from Nested instances** on all 5. ⚠️ CRITICAL.

<!-- CAPS_E -->

---

## Input-Driven Design Changes

<!-- STD_S -->
### Standard Text Size

| Input | `Tab 1` Active=No | `Tab 1` Active=Yes | Font inactive | Font active |
|---|---|---|---|---|
| `12px` | `Label sm/Medium` | `Label sm/Semi Bold` | Inter · 500 · 12px · 16px LH | Inter · 600 · 12px · 16px LH |
| `14px` | `Body sm/Medium` | `Body sm/Semi Bold` | Inter · 500 · 14px · 18px LH | Inter · 600 · 14px · 18px LH |
| `16px` | `Body md/Medium` | `Body md/Semi Bold` | Inter · 500 · 16px · 22px LH | Inter · 600 · 16px · 22px LH |

<!-- COUNT_S -->
### Count Badge

| Toggle | Figma action |
|---|---|
| ON | Tab 01 `Count=true` value "3" · Tab 02 `Count=true` value "12" · rest `Count=false` |
| OFF | All tab instances `Count=false` — badge hidden |

<!-- COUNT_E -->
<!-- STD_E -->
<!-- CAPS_S -->
### Capsule Text Size

| Input | `All` style (both states) | Font |
|---|---|---|
| `12px` | `Label sm/Medium` | Inter · Medium 500 · 12px · 16px LH |
| `14px` | `Body sm/Medium` | Inter · Medium 500 · 14px · 18px LH |
| `16px` | `Body md/Medium` | Inter · Medium 500 · 16px · 22px LH |

<!-- CAPS_E -->

---

## Mandatory Rules

<!-- STD_S -->
**Standard:**
- `Active Tab 1` rectangle: Active=No fill = None · Active=Yes fill = `Border/border-secondary`. Fill-based, not a stroke.
- `Tabs` frame border is **bottom-only** (Top=0 · Left=0 · Right=0 · Bottom=1px · `Border/border-primary`).
- Tab 01 always `Active=Yes`. Tab 06 always `Disabled=true` (opacity 40% only).
- All 6 `_base Tab` instances exist in every variant — extras use `visible=false`.
<!-- COUNT_S -->
- Count badge fill = `Status/bg-critical` · radius = `radius-full` · text = `Caption` — never changes with Text Size.
<!-- COUNT_E -->

<!-- STD_E -->
<!-- CAPS_S -->
**Capsule:**
- Text color always `Text/text-primary` in both states — never changes.
- Active=Yes radius = `radius-md` (8px) · Active=No radius = `radius-xl` (12px). Must differ.
- Container fill = `Background/bg-secondary` · padding = `spacing-xs` · radius = `radius-xl`.

<!-- CAPS_E -->
**Shared:**
- Text style only — never bind individual font variables.
- Text Size input changes text style name only. Spacing, radius, and fill variables are unaffected.
- Expose nested properties on all component levels. ⚠️ CRITICAL on every component set.

---

## Figma Component Page — Arrangement

```
┌──────────────────────────────────────────────────────────────┐
│  TABS COMPONENT SYSTEM                                        │
│  ──────────────────────────────────────────────────────────  │
│                                                               │
<!-- STD_S -->
│  ▌ _base Tab — 4 Variants                                    │
│    Active=No/Yes · Disabled=false/true                        │
│    [ actual _base Tab COMPONENT_SET ]                         │
│                                                               │
│  ▌ Tabs — 5 Count Variants                                   │
│    Tabs=2/3/4/5/6 · bottom-only border · Tab 01 Active=Yes   │
│    [ actual Tabs COMPONENT_SET ]                              │
│                                                               │
<!-- STD_E -->
<!-- CAPS_S -->
│  ▌ _base Capsule Tabs — 2 Variants                           │
│    Active=Yes (bg-primary · radius-md · shadow)               │
│    [ actual _base Capsule Tabs COMPONENT_SET ]                │
│                                                               │
│  ▌ Capsule Tabs — 5 Count Variants                           │
│    Tabs=2/3/4/5/6 · spacing-xs · bg-secondary                │
│    [ actual Capsule Tabs COMPONENT_SET ]                      │
│                                                               │
<!-- CAPS_E -->
└──────────────────────────────────────────────────────────────┘
```
