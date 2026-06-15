# Navigation

## Overview

| Property | Value |
|---|---|
| Component Name | Navigation |
| Base Component | `_Nav item base` |
| Component Set | `Navigation` |
| Node — `_Nav item base` | `8093:141122` |
| Node — `Navigation` | `8093:141325` |
| `_Nav item base` Variants | 4 (Active × Type) |
| `Navigation` Variants | 2 (State) |

> ### ⚠️ Critical Requirement — Expose Nested Instance Properties
>
> The main **`Navigation`** component (every variant) **MUST** have **all** properties from its nested **`_Nav item base`** instance exposed onto it. In Figma: select the main component/variant → **Properties** panel → **"Expose properties from → Nested instances"**. Without this, the `_Nav item base` properties stay buried inside the nested instance and designers cannot access them from the main component. This applies to **every** variant — see the dedicated "Expose Nested Properties" step below for details.

A sidebar navigation system with collapsible state. `_Nav item base` defines individual nav items in Horizontal and Vertical layouts. `Navigation` assembles the full sidebar with a Header area, scrollable nav item list, optional Profile section at the bottom, and an Expand/Collapse toggle button.

---

## Component Hierarchy

```
Level 1 — _Nav item base          [COMPONENT_SET]
  ├── Active=No,  Type=Horizontal
  ├── Active=Yes, Type=Horizontal
  ├── Active=No,  Type=Vertical
  └── Active=Yes, Type=Vertical

Level 2 — Navigation              [COMPONENT_SET]
  ├── State=Expanded              (240px sidebar · Horizontal nav items · full profile)
  └── State=Collapsed             (96px sidebar · Vertical nav items · avatar only)
```

---

## Variant Properties

### `_Nav item base`

| Property | Type | Options |
|---|---|---|
| `Active` | VARIANT | `No` · `Yes` |
| `Type` | VARIANT | `Horizontal` · `Vertical` |

### `Navigation`

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Expanded` · `Collapsed` |
| `Show Profile#19139:10` | BOOLEAN | `true` (default) |

---

## Component Structure

### Level 1 — `_Nav item base`

<!-- IF_EXPANDED -->
#### `Active=No, Type=Horizontal`

```
Active=No, Type=Horizontal         [COMPONENT · FILL × FIXED(44px) · Horizontal AL · Center VA]
  Padding:  T/B = spacing-md (8px) · L/R = spacing-xl (12px)
  Gap:      spacing-md (8px)
  Fill:     None — transparent
  Radius:   radius-md (all 4 corners)
  Clips:    true
  │
  └── Content                      [FRAME · FILL × HUG · Horizontal AL · Center VA · layoutGrow=1]
        Gap: spacing-xl (12px)
        ├── Icon                   [INSTANCE · Icon component · Size=20px · swappable]
        │     Color: override Icon VECTOR stroke → Navigation/nav-icon-inactive
        └── Text                   [TEXT · FILL × HUG · Body sm/Medium]
              Fill: Navigation/nav-text-inactive
```

<!-- /IF_EXPANDED -->
<!-- IF_EXPANDED -->
#### `Active=Yes, Type=Horizontal`

```
Active=Yes, Type=Horizontal        [COMPONENT · same sizing]
  Fill:   Navigation/nav-item-active-bg (white)
  Radius: radius-md (all 4 corners)
  │
  └── Content
        ├── Icon                   [Size=20px · VECTOR stroke → Navigation/nav-icon-active]
        └── Text                   [FILL × HUG · Body sm/Semi Bold]
              Fill: Navigation/nav-text-active
```

<!-- /IF_EXPANDED -->
<!-- IF_COLLAPSED -->
#### `Active=No, Type=Vertical`

```
Active=No, Type=Vertical           [COMPONENT · FIXED(44px) × HUG · Horizontal AL · Center both]
  Padding:  spacing-none (0px) all sides
  Gap:      spacing-xs (4px)
  Fill:     None
  │
  └── Content                      [FRAME · FILL × HUG · Vertical AL · Center both]
        Gap: spacing-xs (4px)
        ├── Container              [FRAME · HUG × HUG · Horizontal AL · Center both]
        │     Padding: spacing-xl (12px) all sides
        │     Radius:  radius-md (all 4 corners)
        │     Fill:    Navigation/nav-icon-bg (#192840)
        │     └── Icon             [INSTANCE · Icon · Size=20px · swappable]
        │           Color: override Icon VECTOR stroke → Navigation/nav-icon-inactive
        └── Text                   [TEXT · FILL × HUG · Center align · Label sm/Medium]
              Fill: Navigation/nav-text-inactive
```

<!-- /IF_COLLAPSED -->
<!-- IF_COLLAPSED -->
#### `Active=Yes, Type=Vertical`

```
Active=Yes, Type=Vertical          [same structure as Active=No]
  Container fill: Navigation/nav-item-active-bg (white)
  Text fill:      Navigation/nav-text-active-vertical (white)
  Icon VECTOR:    stroke → Navigation/nav-icon-active
```

<!-- /IF_COLLAPSED -->

---

### Level 2 — `Navigation`

<!-- IF_EXPANDED -->
#### `State=Expanded`

```
State=Expanded                     [COMPONENT · HUG × FIXED(1024px) · Horizontal AL · Center VA]
  Fill: Background/bg-primary
  │
  ├── Sidebar navigation           [FRAME · FIXED(240px) × FILL · Vertical AL]
  │     Fill:  Navigation/nav-bg (#051325 dark navy)
  │     Clips content: true
  │     No corner radius
  │     │
  │     ├── Navigation             [FRAME · FILL × FILL · Vertical AL · layoutGrow=1]
  │     │     │
  │     │     ├── Header           [FRAME · FILL × FIXED(76px) · Horizontal AL · Center VA]
  │     │     │     Padding: spacing-4xl (20px) all sides · Gap: spacing-3xl (16px)
  │     │     │     (Logo/brand area — empty, content added by consumer)
  │     │     │
  │     │     └── Frame 1261153134 [FRAME · FILL × FILL · Vertical AL · layoutGrow=1]
  │     │           Padding: spacing-4xl (20px) all sides · Gap: spacing-xs (4px)
  │     │           (_Nav item base instances · Type=Horizontal placed here)
  │     │
  │     └── Profile_Container       [FRAME · FILL × HUG]
  │           Padding: spacing-4xl (20px) all sides
  │           Radius: radius-xl (all corners)
  │           Fill: Navigation/nav-icon-bg
  │           Visible: Show Profile boolean
  │           │
  │           └── Profile          [FRAME · FILL × HUG · Horizontal AL · Center VA]
  │                 Gap: spacing-md (8px)
  │                 │
  │                 ├── Avatar Image    [INSTANCE · 48×48px · FIXED · radius-full]
  │                 │     Fill: IMAGE (user photo)
  │                 │
  │                 ├── Contenet        [FRAME · FILL × HUG · Vertical AL · layoutGrow=1]
  │                 │     Gap: spacing-xxs (2px)  ← "Contenet" = exact Figma layer name (typo preserved)
  │                 │     ├── Text      [FILL × HUG · Body sm/Semi Bold]
  │                 │     │     Fill: Navigation/nav-text-active-vertical — name
  │                 │     └── Text      [FILL × HUG · Label sm/Medium]
  │                 │           Fill: Navigation/nav-text-inactive — role
  │                 │
  │                 └── chevron-right   [INSTANCE · Icon · Size=16px]
  │                       Color: VECTOR stroke → Navigation/nav-icon-inactive
  │
  └── Container                    [FRAME · 24×24px · ABSOLUTE positioned]
        Expand/Collapse toggle button — positioned at right edge of sidebar, vertically aligned with Header
        Fill:   Navigation/nav-bg
        Stroke: Navigation/nav-border · 1px inside
        Radius: radius-full
        Padding: spacing-xs (4px) all sides
        │
        └── Icon                   [INSTANCE · Icon · Size=16px]
              ⚠️ Expanded state MUST use: chevron-left icon
              (pointing left — indicates clicking will collapse the sidebar)
              Color: override Icon VECTOR stroke → Navigation/nav-icon-inactive
```

<!-- /IF_EXPANDED -->
<!-- IF_COLLAPSED -->
#### `State=Collapsed`

```
State=Collapsed                    [COMPONENT · 96px × FIXED(1024px)]
  Same structure as Expanded with the following differences:
  │
  ├── Sidebar navigation: FIXED(96px) × FILL
  │     │
  │     ├── Frame 1261153134:
  │     │     Padding L/R: spacing-xs (4px) · Padding T/B: spacing-md (8px)
  │     │     Gap: spacing-xl (12px)
  │     │     (_Nav item base instances · Type=Vertical placed here)
  │     │
  │     └── Profile_Container (Collapsed):
  │           Padding: spacing-4xl (20px) all sides
  │           Radius: radius-xl
  │           Fill: Navigation/nav-icon-bg
  │           Visible: Show Profile boolean
  │           └── Profile          [FRAME · HUG × HUG · Center both axes]
  │                 (Contenet and chevron-right hidden · Avatar Image only visible)
  │                 └── Avatar Image  [INSTANCE · 48×48px · radius-full · IMAGE fill]
  │
  └── Container (toggle):
        ⚠️ Collapsed state MUST use: chevron-right icon
        (pointing right — indicates clicking will expand the sidebar)
        All other toggle properties identical to Expanded
```

<!-- /IF_COLLAPSED -->

---

## Toggle Icon — Explicit Rules

> ⚠️ **This is the most commonly missed detail.** The toggle icon MUST be swapped manually between the two states.

| Navigation State | Toggle Icon | Icon name | Why |
|---|---|---|---|
| `State=Expanded` | **chevron-left** | `chevron-left` | Points left — clicking collapses the sidebar |
| `State=Collapsed` | **chevron-right** | `chevron-right` | Points right — clicking expands the sidebar |

<!-- IF_EXPANDED -->
**Steps to set the toggle icon for State=Expanded:**
1. Select the `State=Expanded` variant
2. Enter the `Container` toggle button
3. Select the `Icon` instance inside
4. In Properties panel → Icon swap property → set to `chevron-left`

<!-- /IF_EXPANDED -->
<!-- IF_COLLAPSED -->
**Steps to set the toggle icon for State=Collapsed:**
1. Select the `State=Collapsed` variant
2. Enter the `Container` toggle button
3. Select the `Icon` instance inside
4. In Properties panel → Icon swap property → set to `chevron-right`

<!-- /IF_COLLAPSED -->

The toggle is ABSOLUTE positioned and sits at the right edge of the sidebar, vertically centred with the Header frame.

---

<!-- IF_PROFILE -->
## Profile Section — Structure Detail

`Profile_Container` is the outer wrapper frame at the bottom of `Sidebar navigation`. Its visibility is controlled by the `Show Profile` Boolean property. Inside it sits the `Profile` frame which holds the actual content.

> ⚠️ **Layer name note:** The text content frame is named `Contenet` in the Figma file (typo preserved intentionally). Use this exact name when building.

<!-- IF_EXPANDED -->
### Expanded state — Full profile

```
Profile_Container                  [FRAME · FILL × HUG]
  Padding:  spacing-4xl (20px) all sides
  Radius:   radius-xl (all 4 corners)
  Fill:     Navigation/nav-icon-bg
  Visible:  Show Profile boolean
  │
  └── Profile                      [FRAME · FILL × HUG · Horizontal AL · Center VA]
        Gap: spacing-md (8px)
        │
        ├── Avatar Image           [INSTANCE · 48×48px · FIXED · radius-full]
        │     Fill: IMAGE (user profile photo)
        │
        ├── Contenet               [FRAME · FILL × HUG · Vertical AL · layoutGrow=1]
        │     Gap: spacing-xxs (2px)
        │     ├── Text             [TEXT · FILL × HUG · Body sm/Semi Bold]
        │     │     Fill: Navigation/nav-text-active-vertical (white) — user name
        │     └── Text             [TEXT · FILL × HUG · Label sm/Medium]
        │           Fill: Navigation/nav-text-inactive (muted grey) — user role
        │
        └── chevron-right          [INSTANCE · Icon · Size=16px]
              Color: override Icon VECTOR stroke → Navigation/nav-icon-inactive
```

<!-- /IF_EXPANDED -->
<!-- IF_COLLAPSED -->
### Collapsed state — Avatar only

```
Profile_Container                  [FRAME · FILL × HUG]
  Padding:  spacing-4xl (20px) all sides
  Radius:   radius-xl (all 4 corners)
  Fill:     Navigation/nav-icon-bg
  Visible:  Show Profile boolean
  │
  └── Profile                      [FRAME · HUG × HUG · Center both axes]
        Contenet: hidden
        chevron-right: hidden
        │
        └── Avatar Image           [INSTANCE · 48×48px · FIXED · radius-full · IMAGE fill]
```

<!-- /IF_COLLAPSED -->

---

<!-- /IF_PROFILE -->
## Layer Descriptions

### `_Nav item base`

| Layer | Type | Notes |
|---|---|---|
| Outer frame | COMPONENT | FILL × FIXED(44px) (H) · FIXED(44px) × HUG (V) |
| `Content` | FRAME | FILL × HUG · Horizontal AL (H) · Vertical AL (V) · layoutGrow=1 |
| `Container` | FRAME | Icon container for Vertical type only · HUG × HUG · spacing-xl padding · radius-md |
| `Icon` | INSTANCE | Icon component Size=20px · swappable |
| `Text` | TEXT | FILL × HUG · Body sm/Medium (inactive H) · Body sm/Semi Bold (active H) · Label sm/Medium (V) |

### `Navigation`

| Layer | Type | Notes |
|---|---|---|
| `Sidebar navigation` | FRAME | FIXED(240 or 96px) × FILL · dark fill · no radius |
| `Navigation` (inner) | FRAME | FILL × FILL · layoutGrow=1 · contains Header + items |
| `Header` | FRAME | FILL × FIXED(76px) · empty — consumer adds logo |
| `Frame 1261153134` | FRAME | FILL × FILL · layoutGrow=1 · nav items container · plain frame |
| `Profile_Container` | FRAME | FILL × HUG · padding spacing-4xl · radius-xl · fill nav-icon-bg · visibility = Show Profile boolean |
| `Profile` | FRAME | FILL × HUG (Expanded) · HUG × HUG center (Collapsed) · Horizontal AL · gap spacing-md |
| `Avatar Image` | INSTANCE | 48×48px FIXED · radius-full · IMAGE fill |
| `Contenet` | FRAME | FILL × HUG · Vertical AL · layoutGrow=1 · gap spacing-xxs ⚠️ Typo in Figma — use exact name |
| `Container` (toggle) | FRAME | 24×24px · **ABSOLUTE** · radius-full · toggle button |

---

## Attached Variables

### Spacing — `_Nav item base`

| Type | Property | Variable | Value |
|---|---|---|---|
| Horizontal | Padding T/B | `spacing-md` | 8px |
| Horizontal | Padding L/R | `spacing-xl` | 12px |
| Horizontal | Outer gap | `spacing-md` | 8px |
| Horizontal | Content gap | `spacing-xl` | 12px |
| Vertical | Padding all | `spacing-none` | 0px |
| Vertical | Outer gap | `spacing-xs` | 4px |
| Vertical | Content gap | `spacing-xs` | 4px |
| Vertical | Container padding all | `spacing-xl` | 12px |

### Radius — `_Nav item base`

| Layer | Variable | Value |
|---|---|---|
| Outer item frame (both types) | `radius-md` | 8px |
| `Container` (V icon container) | `radius-md` | 8px |

### Spacing — `Navigation`

| Location | Property | Variable | Value |
|---|---|---|---|
| `Header` | Padding all | `spacing-4xl` | 20px |
| `Frame 1261153134` (Expanded) | Padding all | `spacing-4xl` | 20px |
| `Frame 1261153134` (Expanded) | Gap | `spacing-xs` | 4px |
| `Frame 1261153134` (Collapsed) | Padding L/R | `spacing-xs` | 4px |
| `Frame 1261153134` (Collapsed) | Padding T/B | `spacing-md` | 8px |
| `Frame 1261153134` (Collapsed) | Gap | `spacing-xl` | 12px |
| `Profile_Container` (both states) | Padding all sides | `spacing-4xl` | 20px |
| `Profile` (Expanded) | Gap | `spacing-md` | 8px |
| `Contenet` | Gap | `spacing-xxs` | 2px |
| `Container` (toggle) | Padding all | `spacing-xs` | 4px |

### Radius — `Navigation`

| Layer | Variable | Value |
|---|---|---|
| `Profile_Container` | `radius-xl` | 12px |
| `Avatar Image` | `radius-full` | 9999 (circle) |
| `Container` toggle | `radius-full` | 9999 (circle) |

### Typography

| Context | Text Style | Font |
|---|---|---|
| Horizontal inactive text | `Body sm/Medium` | Inter · Medium 500 |
| Horizontal active text | `Body sm/Semi Bold` | Inter · Semi Bold 600 |
| Vertical text (both states) | `Label sm/Medium` | Inter · Medium 500 · 12px |
| `Contenet` → Name `Text` | `Body sm/Semi Bold` | Inter · Semi Bold 600 |
| `Contenet` → Role `Text` | `Label sm/Medium` | Inter · Medium 500 · 12px |

> Apply text styles directly. Do not bind individual font variables.

### Colors

#### Navigation Variables (dedicated collection)

| Variable | Resolved | Used on |
|---|---|---|
| `Navigation/nav-bg` | `#051325` (dark navy) | Sidebar fill · toggle button fill |
| `Navigation/nav-item-active-bg` | `#FFFFFF` (white) | Active item fill (H & V) |
| `Navigation/nav-icon-bg` | `#192840` (dark teal) | Inactive V icon container · Profile tile fill |
| `Navigation/nav-text-inactive` | `#AEBABC` (muted grey) | Inactive text · Profile role text · toggle icon |
| `Navigation/nav-text-active` | `#051325` (dark navy) | Active horizontal item text |
| `Navigation/nav-text-active-vertical` | `#FFFFFF` (white) | Active vertical text · Profile name text |
| `Navigation/nav-border` | `#AEBABC` (muted grey) | Toggle button stroke |
| `Navigation/nav-icon-inactive` | `#AEBABC` (muted grey) | Inactive icon VECTOR stroke |
| `Navigation/nav-icon-active` | `#051325` (dark navy) | Active icon VECTOR stroke |

> ⚠️ Names derived from color values. Confirm exact names from Figma variable panel.

#### Color Per Variant

**`_Nav item base`:**

| State | Outer fill | Container fill (V) | Icon VECTOR stroke | Text fill |
|---|---|---|---|---|
| Active=No | None | `nav-icon-bg` | `nav-icon-inactive` | `nav-text-inactive` |
| Active=Yes | `nav-item-active-bg` | `nav-item-active-bg` | `nav-icon-active` | `nav-text-active` (H) · `nav-text-active-vertical` (V) |

**`Navigation` Sidebar:**

| Layer | Variable |
|---|---|
| `Sidebar navigation` fill | `Navigation/nav-bg` |
| `Profile_Container` fill | `Navigation/nav-icon-bg` |
| `Contenet` → Name `Text` fill | `Navigation/nav-text-active-vertical` |
| `Contenet` → Role `Text` fill | `Navigation/nav-text-inactive` |
| `chevron-right` VECTOR stroke | `Navigation/nav-icon-inactive` |
| `Container` toggle fill | `Navigation/nav-bg` |
| `Container` toggle stroke | `Navigation/nav-border` |
| `Container` toggle icon VECTOR stroke | `Navigation/nav-icon-inactive` |
| Outer wrapper fill | `Background/bg-primary` |

---

## Icon Color Override

All icons use the Icon component. Override the **stroke** of the innermost `Icon [VECTOR]`.

**Path for Size=20px:** `Icon [INSTANCE] → 20px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`
**Path for Size=16px:** `Icon [INSTANCE] → 16px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`

Override the **Stroke** variable — never the fill.

---

## Figma Construction Guide

<!-- IF_EXPANDED -->
### Step 1 — Build `Active=No, Type=Horizontal`

1. Create a **Frame**. Name it `Active=No, Type=Horizontal`.
2. **Horizontal Auto Layout · FILL × FIXED(44px) · Center cross-axis**.
3. Bind padding T/B → `spacing-md`. Bind padding L/R → `spacing-xl`. Bind gap → `spacing-md`.
4. No fill. Bind corner radius all 4 → `radius-md`. Set clips content = true.
5. Convert to **Component**.
6. Add `Content` frame inside: **Horizontal AL · FILL × HUG · Center VA · layoutGrow=1 · gap spacing-xl**.
7. Place **Icon component** (Size=20px) as first child of Content. Override VECTOR stroke → `Navigation/nav-icon-inactive`. Create Instance Swap property: `Nav Icon`.
8. Add `Text` layer: content "Text" · style `Body sm/Medium` · fill `Navigation/nav-text-inactive` · FILL × HUG · layoutGrow=1.

<!-- /IF_EXPANDED -->
<!-- IF_EXPANDED -->
### Step 2 — Build `Active=Yes, Type=Horizontal`

1. Duplicate `Active=No, Type=Horizontal`. Rename to `Active=Yes, Type=Horizontal`.
2. Add fill → `Navigation/nav-item-active-bg`.
3. On `Text`: change style → `Body sm/Semi Bold` · change fill → `Navigation/nav-text-active`.
4. On `Icon` VECTOR: change stroke → `Navigation/nav-icon-active`.

<!-- /IF_EXPANDED -->
<!-- IF_COLLAPSED -->
### Step 3 — Build `Active=No, Type=Vertical`

1. Create a **Frame**. Name it `Active=No, Type=Vertical`.
2. **Horizontal Auto Layout · FIXED(44px) × HUG · Center both axes**.
3. Bind padding all → `spacing-none`. Bind gap → `spacing-xs`. No fill.
4. Convert to **Component**.
5. Add `Content` frame: **Vertical AL · FILL × HUG · Center both · gap spacing-xs**.
6. Inside Content, add `Container` frame: **Horizontal AL · HUG × HUG · Center both · padding spacing-xl · radius-md · fill Navigation/nav-icon-bg**.
7. Place **Icon** (Size=20px) inside Container. Override VECTOR stroke → `Navigation/nav-icon-inactive`.
8. Add `Text` below Container: style `Label sm/Medium` · fill `Navigation/nav-text-inactive` · FILL × HUG · Center text align.

<!-- /IF_COLLAPSED -->
<!-- IF_COLLAPSED -->
### Step 4 — Build `Active=Yes, Type=Vertical`

1. Duplicate `Active=No, Type=Vertical`. Rename to `Active=Yes, Type=Vertical`.
2. On `Container`: change fill → `Navigation/nav-item-active-bg`.
3. On `Text`: change fill → `Navigation/nav-text-active-vertical`.
4. On `Icon` VECTOR: change stroke → `Navigation/nav-icon-active`.

<!-- /IF_COLLAPSED -->
### Step 5 — Combine into `_Nav item base` Component Set

1. Select all 4. Combine into **Component Set**. Name it `_Nav item base`.
2. Properties: `Active` → `No`, `Yes`. `Type` → `Horizontal`, `Vertical`.

### Step 6 — Expose Nested Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all 4 variants.

<!-- IF_EXPANDED -->
### Step 7 — Build `Navigation` — `State=Expanded`

1. Create a **Frame**. Name it `State=Expanded`. **Horizontal AL · HUG × FIXED(1024px) · Center VA**. Fill `Background/bg-primary`. Convert to **Component**.

#### Sidebar navigation
1. Frame inside. Name `Sidebar navigation`. **Vertical AL · FIXED(240px) × FILL**. Fill `Navigation/nav-bg`. Clips content = true. No corner radius.

#### Navigation inner frame
1. Frame inside Sidebar navigation. Name `Navigation`. **Vertical AL · FILL × FILL · layoutGrow=1**.

#### Header
1. Frame inside Navigation. Name `Header`. **Horizontal AL · FILL × FIXED(76px) · Center VA**. Bind padding all → `spacing-4xl`. Bind gap → `spacing-3xl`. *(Empty — logo added by consumer.)*

#### Frame 1261153134
1. Frame inside Navigation. Name `Frame 1261153134`. **Vertical AL · FILL × FILL · layoutGrow=1**. Bind padding all → `spacing-4xl`. Bind gap → `spacing-xs`.
2. Place `_Nav item base` instances (Type=Horizontal) inside for preview.

<!-- IF_PROFILE -->
#### Profile_Container
1. Frame inside `Sidebar navigation` (below `Navigation` inner frame, not inside it). Name `Profile_Container`.
2. Set sizing to **FILL × HUG**. No Auto Layout on the container itself.
3. Bind padding all sides → `spacing-4xl`.
4. Bind corner radius all 4 → `radius-xl`. Bind fill → `Navigation/nav-icon-bg`.
5. Create **Boolean property** `Show Profile` (default: `true`). Link to `Profile_Container` visibility.

#### Profile (inner frame — Expanded)
1. Add a **Frame** inside `Profile_Container`. Name it `Profile`.
2. **Horizontal AL · FILL × HUG · Center VA**. Bind gap → `spacing-md`. No padding on Profile itself.

Inside `Profile` (Expanded):
- **Avatar Image**: Place an instance of the avatar/image component (or a 48×48px frame). Name `Avatar Image`. Bind corner radius → `radius-full`. Fill = IMAGE.
- **Contenet frame**: **Vertical AL · FILL × HUG · layoutGrow=1 · gap spacing-xxs**. Name exactly `Contenet` (preserve Figma typo).
  - First `Text` layer: style `Body sm/Semi Bold` · fill `Navigation/nav-text-active-vertical` (user name).
  - Second `Text` layer: style `Label sm/Medium` · fill `Navigation/nav-text-inactive` (user role).
- **chevron-right**: Icon instance (Size=16px). Name `chevron-right`. Override VECTOR stroke → `Navigation/nav-icon-inactive`.

<!-- /IF_PROFILE -->
#### Container (Toggle button)
1. Frame inside the outer `State=Expanded` wrapper. Name `Container`.
2. Set **layoutPositioning = ABSOLUTE**.
3. Size: **24×24px fixed**. **Horizontal AL · Center both**. Bind padding all → `spacing-xs`.
4. Bind fill → `Navigation/nav-bg`. Add stroke 1px inside → `Navigation/nav-border`.
5. Bind corner radius all 4 → `radius-full`.
6. Place **Icon component** (Size=16px) inside.

> ⚠️ **CRITICAL — Toggle icon for Expanded state:**
> Set the Icon instance swap property to **`chevron-left`**.
> This icon points LEFT — it signals that clicking will collapse (close) the sidebar to the left.
> Path to override: `Icon [INSTANCE] → 16px [COMPONENT] → chevron-left [COMPONENT] → Icon [VECTOR]`
> Override VECTOR stroke → `Navigation/nav-icon-inactive`

7. Position toggle at the **right edge of the sidebar** (x = sidebar right edge), **vertically centred with the Header frame**.

<!-- /IF_EXPANDED -->
<!-- IF_COLLAPSED -->
### Step 8 — Build `Navigation` — `State=Collapsed`

1. Duplicate `State=Expanded`. Rename to `State=Collapsed`.
2. Change `Sidebar navigation` width → **96px**.
3. On `Frame 1261153134`: padding L/R → `spacing-xs` · padding T/B → `spacing-md` · gap → `spacing-xl`.
4. Replace `_Nav item base` instances with **Type=Vertical** variants.
<!-- IF_PROFILE -->
5. Update Profile_Container for collapsed state:
   - `Profile_Container` keeps identical padding and fill (no change).
   - Inside `Profile`: change layout to **Center both axes · HUG × HUG**.
   - Hide `Contenet` frame — it is not shown in collapsed state.
   - Hide `chevron-right` instance — not shown in collapsed state.
   - Only `Avatar Image` remains visible and centered.
<!-- /IF_PROFILE -->
6. On the toggle `Container`:

> ⚠️ **CRITICAL — Toggle icon for Collapsed state:**
> Set the Icon instance swap property to **`chevron-right`**.
> This icon points RIGHT — it signals that clicking will expand (open) the sidebar to the right.
> Path to override: `Icon [INSTANCE] → 16px [COMPONENT] → chevron-right [COMPONENT] → Icon [VECTOR]`
> Override VECTOR stroke → `Navigation/nav-icon-inactive`

<!-- /IF_COLLAPSED -->
### Step 9 — Combine into `Navigation` Component Set

1. Select both. Combine into **Component Set** named `Navigation`.
2. Property `State` → `Expanded`, `Collapsed`.
3. Boolean `Show Profile` (default: `true`) → link to `Profile` visibility in both variants.

### Step 10 — Expose Nested Properties

> ⚠️ CRITICAL. Properties panel → **"Expose properties from Nested instances"** on both variants.

### Step 11 — Variable Attachment Locations

**`_Nav item base`:**

| Target | Property | Variable |
|---|---|---|
| Outer frame (H) | Padding T/B | `spacing-md` |
| Outer frame (H) | Padding L/R | `spacing-xl` |
| Outer frame (H) | Gap | `spacing-md` |
| Outer frame (H) | Corner radius | `radius-md` |
| Outer frame (V) | Padding all | `spacing-none` |
| Outer frame (V) | Gap | `spacing-xs` |
| Outer frame (V) | Corner radius | `radius-md` |
| `Content` (H) | Gap | `spacing-xl` |
| `Content` (V) | Gap | `spacing-xs` |
| `Container` (V) | Padding all | `spacing-xl` |
| `Container` (V) | Corner radius | `radius-md` |
| `Container` Active=No | Fill | `Navigation/nav-icon-bg` |
| `Container` Active=Yes | Fill | `Navigation/nav-item-active-bg` |
| Outer frame Active=Yes | Fill | `Navigation/nav-item-active-bg` |
| `Icon` VECTOR | Stroke | per state (inactive/active) |
| `Text` H inactive | Text Style | `Body sm/Medium` |
| `Text` H active | Text Style | `Body sm/Semi Bold` |
| `Text` V | Text Style | `Label sm/Medium` |
| `Text` inactive | Fill | `Navigation/nav-text-inactive` |
| `Text` H active | Fill | `Navigation/nav-text-active` |
| `Text` V active | Fill | `Navigation/nav-text-active-vertical` |

**`Navigation`:**

| Target | Property | Variable |
|---|---|---|
| `Sidebar navigation` | Fill | `Navigation/nav-bg` |
| `Header` | Padding all | `spacing-4xl` |
| `Frame 1261153134` (Expanded) | Padding all | `spacing-4xl` |
| `Frame 1261153134` (Expanded) | Gap | `spacing-xs` |
| `Frame 1261153134` (Collapsed) | Padding L/R | `spacing-xs` |
| `Frame 1261153134` (Collapsed) | Padding T/B | `spacing-md` |
| `Frame 1261153134` (Collapsed) | Gap | `spacing-xl` |
| `Profile_Container` | Padding all sides | `spacing-4xl` |
| `Profile_Container` | Corner radius (all 4) | `radius-xl` |
| `Profile_Container` | Fill | `Navigation/nav-icon-bg` |
| `Profile` (Expanded) | Gap | `spacing-md` |
| `Avatar Image` | Corner radius (all 4) | `radius-full` |
| `Contenet` | Gap | `spacing-xxs` |
| `Contenet` → Name `Text` | Text Style | `Body sm/Semi Bold` |
| `Contenet` → Name `Text` | Fill | `Navigation/nav-text-active-vertical` |
| `Contenet` → Role `Text` | Text Style | `Label sm/Medium` |
| `Contenet` → Role `Text` | Fill | `Navigation/nav-text-inactive` |
| `chevron-right` VECTOR | Stroke | `Navigation/nav-icon-inactive` |
| `Container` toggle | Fill | `Navigation/nav-bg` |
| `Container` toggle | Stroke | `Navigation/nav-border` |
| `Container` toggle | Corner radius | `radius-full` |
| `Container` toggle | Padding all | `spacing-xs` |
| `Container` toggle | Position | ABSOLUTE |
| Toggle `Icon` (Expanded) | Instance swap | `chevron-left` |
| Toggle `Icon` (Collapsed) | Instance swap | `chevron-right` |
| Toggle `Icon` VECTOR | Stroke | `Navigation/nav-icon-inactive` |
| Outer wrapper | Fill | `Background/bg-primary` |

---

## Mandatory Rules

- **Toggle icon is NOT optional — it must be different per state.** Expanded = `chevron-left`. Collapsed = `chevron-right`. Swap via Instance Swap property, not by rotating the icon.
- **`Profile_Container` wraps the `Profile` frame.** `Profile_Container` holds all the padding (spacing-4xl), radius, fill, and Boolean visibility. `Profile` inside it holds the Horizontal AL layout with Avatar Image, Contenet, and chevron-right.
- **Layer name `Contenet` is a typo in the Figma file** — preserve it exactly. Do not rename to "Content".
- **Profile in collapsed state:** hide `Contenet` and `chevron-right`. Keep `Avatar Image` visible. Change `Profile` layout to Center both axes (HUG × HUG). `Profile_Container` padding stays spacing-4xl.
- **Toggle is ABSOLUTE positioned** — `layoutPositioning = ABSOLUTE`, not part of Auto Layout flow.
- **Toggle corner radius = `radius-full`.**
- **Never use `_Primitives` variables.** All colors from `Navigation/` namespace or `Color Style` semantic variables.
- **Icon color = STROKE on the innermost `Icon [VECTOR]`**, not fill.
- **`Frame 1261153134` is a plain container** — no component logic.
- **`Profile` is a plain frame with Boolean toggle** — no separate component.
- **`Header` is empty** — consumer adds logo content.
- **Text style only** — no individual font variable bindings.
- **Expose nested properties** on all variants.

---

## Figma Component Page — Arrangement

```
┌──────────────────────────────────────────────────────────────┐
│  NAVIGATION COMPONENT SYSTEM       ← small caps label        │
│  Navigation                        ← large bold title        │
│  _Nav item base: 4 variants · Active × Type                  │
│  Navigation: 2 states · Expanded (240px) · Collapsed (96px)  │
│  ──────────────────────────────────  ← divider               │
│                                                               │
│  ▌ _Nav item base — 4 Variants                               │
│    Active=No/Yes · Type=Horizontal/Vertical                   │
│    [ actual _Nav item base COMPONENT_SET ]                    │
│                                                               │
│  ▌ Navigation — 2 States                                     │
│    Expanded 240px · Collapsed 96px                            │
│    Dark sidebar · Profile_Container (spacing-4xl) → Profile   │
│    Toggle: chevron-left (Expanded) · chevron-right (Collapsed)│
│    [ actual Navigation COMPONENT_SET ]                        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

| Section | Subtitle | Content |
|---|---|---|
| `_Nav item base — 4 Variants` | `Active=No · Active=Yes · Horizontal (44px) · Vertical (icon + label)` | Actual `_Nav item base` COMPONENT_SET |
| `Navigation — 2 States` | `Expanded 240px · Collapsed 96px · Profile_Container (spacing-4xl) · Contenet + Avatar Image + chevron-right · Toggle chevron-left/right` | Actual `Navigation` COMPONENT_SET |
