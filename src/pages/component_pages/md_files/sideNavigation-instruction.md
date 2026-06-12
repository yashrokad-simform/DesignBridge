# Side Navigation

## Shared Instructions

Use shared instructions:
- `shadcn-implementation.instructions.md`
- `tailwind-implementation.instructions.md`
- `react-implementation.instructions.md`
- `code-review.instructions.md`

---

### Typography Rule

**Do NOT use `leading-snug`.** Use explicit line-height classes matched to font size:
- `text-2xs` → `leading-3`
- `text-xs` → `leading-4`
- `text-sm` → `leading-4.5`
- `text-base` → `leading-5.5`
- `text-lg` → `leading-6.5`
- `text-xl` → `leading-7`
- `text-2xl` → `leading-8`
- `text-3xl` → `leading-9`
- `text-4xl` → `leading-12`

---

## Overview

A vertical sidebar navigation component supporting Expanded (240px) and Collapsed (96px) states. Composed of three vertical sections: Logo Header, Nav Items (scrollable), and Profile Card (optional). A toggle button sits on the sidebar edge to switch between states.

---

## Component Hierarchy

```
SideNav
├── SideNavHeader       ← logo slot
├── SideNavContent      ← scrollable nav items, flex-1
│   └── NavItem[]       ← repeated for each route
└── SideNavProfile      ← optional bottom card (boolean)

SideNavToggle           ← absolutely positioned on sidebar edge
```

---

## Component Props

### `SideNav`

| Prop | Type | Default |
|---|---|---|
| `collapsed` | `boolean` | `false` |
| `onToggle` | `() => void` | required |
| `logo` | `ReactNode` | required |
| `items` | `NavItemData[]` | required |
| `showProfile` | `boolean` | `true` |
| `profile` | `NavProfileData` | `undefined` |
| `className` | `string` | `undefined` |

```ts
interface NavItemData {
  label: string
  icon: ReactNode
  href: string
  selected?: boolean
}

interface NavProfileData {
  name: string
  role: string
  avatar: string
  href?: string
}
```

---

## Container

### Outer Wrapper

```
relative bg-bg-primary flex items-center h-full
```

### Sidebar Panel

```
bg-nav-bg flex flex-col h-full items-start overflow-hidden
transition-[width] duration-200
```

| State | Width |
|---|---|
| Expanded | `w-60` |
| Collapsed | `w-24` |

> `w-24` = 96px — standard Tailwind · `w-60` = 240px · `bg-nav-bg` = `--color-nav-bg` = `#051325` (near-black dark bg)

---

## SideNavHeader

Fixed-height logo slot. Never hardcodes a logo asset.

### Container Classes

```
flex items-center h-19 p-5 shrink-0 w-full overflow-hidden
```

> `p-5` = 20px · `h-19` = Figma-confirmed header height

| State | Alignment |
|---|---|
| Expanded | `justify-start` |
| Collapsed | `justify-center` |

### Logo Slot

The `logo` prop accepts any `ReactNode`. It is rendered inside a responsive wrapper:

```
flex items-center justify-center max-h-16 overflow-hidden
```

> `max-h-16` = 64px maximum logo height · Logo maintains its natural aspect ratio — never stretch or crop.

| State | Width behavior |
|---|---|
| Expanded | `max-w-full` — fills available header width minus 40px padding |
| Collapsed | Logo shrinks to fit 96px - 40px padding = 56px available width |

- Use `object-contain` on `<img>` logo elements.
- Do not hardcode any logo asset. The logo is always injected via the `logo` prop.

---

## SideNavContent

Scrollable nav items area. Grows to fill all available height between header and profile.

### Container Classes

```
flex-1 flex flex-col min-h-0 w-full overflow-y-auto overflow-x-hidden
```

| State | Padding + Gap |
|---|---|
| Expanded | `p-5 gap-1` — `20px` padding · `4px` gap |
| Collapsed | `px-1 py-2 gap-3 items-center` — `4px` h-padding · `8px` v-padding · `12px` gap |

> `p-5` = 20px · `gap-1` = 4px · `px-1` = 4px · `py-2` = 8px · `gap-3` = 12px

---

## NavItem

The single reusable navigation tile. Repeated for every item in `items[]`. Supports 4 variants from the combination of `collapsed` (boolean) and `selected` (boolean).

### Props

| Prop | Type | Default |
|---|---|---|
| `label` | `string` | required |
| `icon` | `ReactNode` | required |
| `href` | `string` | required |
| `selected` | `boolean` | `false` |
| `collapsed` | `boolean` | `false` |

### CVA Structure — NavItem

Apply CVA to the **item container**.

#### Base Classes

```
flex items-center overflow-hidden shrink-0 w-full cursor-pointer transition-colors
```

#### `variant` Variant (collapsed × selected)

| Variant | Container Classes |
|---|---|
| `expanded-selected` | `h-11 px-3 py-2 rounded-lg bg-nav-tile-bg-primary gap-2` |
| `expanded-default` | `h-11 px-3 py-2 rounded-lg gap-2 hover:bg-nav-bg-hover` |
| `collapsed-selected` | `justify-center p-0` |
| `collapsed-default` | `justify-center p-0 rounded-lg hover:bg-nav-bg-hover` |

> Hover applies only to **default (non-selected)** variants. Selected items already carry their active background and do not change on hover.  
> `hover:bg-nav-bg-hover` = `--color-nav-bg-hover` = `#19283c` (gray-800), which contrasts against the sidebar panel bg `#131e2e` (gray-900).

> `h-11` = 44px · `px-3` = 12px · `py-2` = 8px · `rounded-lg` = 8px (`--radius-8`) · `gap-2` = 8px

---

### NavItem Internal Layout — Expanded

```
flex items-center gap-3 flex-1 min-w-0
```

> `gap-2` = 8px between icon and label

**Icon slot:**
```
flex items-start shrink-0
```
Icon element: `size-5` (20×20px) · `aria-hidden="true"` · import from `src/assets/icons/`.

| State | Icon color |
|---|---|
| Selected | `text-nav-icon-primary` |
| Default | `text-nav-icon-secondary` |

**Label:**

| State | Classes |
|---|---|
| Selected | `text-sm font-semibold leading-4.5 text-nav-text-primary flex-1 min-w-0` |
| Default | `text-sm font-medium leading-4.5 text-nav-text-secondary flex-1 min-w-0` |

> `text-sm` = 14px · `leading-4.5` ≈ 18px · `font-semibold` = 600 (selected) · `font-medium` = 500 (default)

---

### NavItem Internal Layout — Collapsed

Vertical stack: icon tile above label text.

```
flex flex-col items-center gap-1 flex-1 min-w-0
```

> `gap-1` = 4px between icon tile and label

**Icon tile:**

| State | Classes |
|---|---|
| Selected | `flex items-center justify-center p-3 rounded-lg bg-nav-tile-bg-primary shrink-0` |
| Default | `flex items-center justify-center p-3 rounded-lg bg-nav-tile-bg-secondary shrink-0` |

> `p-3` = 12px · `rounded-lg` = 8px

Icon inside tile: `size-5` (20×20px) · `aria-hidden="true"`.

| State | Icon color |
|---|---|
| Selected | `text-nav-icon-primary` |
| Default | `text-nav-icon-secondary` |

**Label (collapsed):**

```
text-xs font-medium leading-4 text-center w-full
```

| State | Color |
|---|---|
| Selected | `text-nav-text-primary-collapse` (white) |
| Default | `text-nav-text-secondary` (muted gray) |

> `text-xs` = 12px · `leading-4` = 16px · Long labels wrap to two lines — this is expected and supported.

---

## SideNavProfile

Optional bottom section. Removed from DOM entirely when `showProfile={false}`.

### Container Classes

```
shrink-0 w-full p-5
```

> `p-5` = 20px

### Card Classes

```
flex items-center gap-2 p-3 rounded-xl overflow-hidden bg-nav-tile-bg-secondary
```

> `gap-2` = 8px · `p-3` = 12px · `rounded-xl` = 12px

---

### Profile — Expanded Layout

```
flex items-center gap-2 flex-1 min-w-0
```

**Avatar:**
```
size-9 rounded-full overflow-hidden shrink-0 object-cover
```
> `size-9` = 36×36px

**Text block:**
```
flex flex-col gap-0.5 flex-1 min-w-0 whitespace-nowrap
```
> `gap-0.5` = 2px

| Text | Classes |
|---|---|
| Name | `text-sm font-medium leading-4.5 text-nav-text-primary-collapse` |
| Role | `text-xs font-medium leading-4 text-nav-text-secondary` |

**Chevron icon:**
```
size-6 shrink-0 overflow-hidden
```
Import `ChevronRightIcon` from `src/assets/icons/`. `aria-hidden="true"`.

---

### Profile — Collapsed Layout

Card shows avatar only — name and chevron are hidden.

```
flex items-center justify-center
```

**Avatar:** same `size-9 rounded-full overflow-hidden object-cover` as expanded.

---

## SideNavToggle

Absolutely positioned button sitting on the right edge of the sidebar panel.

### Position Classes

```
absolute top-[63px] bg-bg-black border border-border-white rounded-[160px]
flex items-center p-1
```

| State | `left` offset |
|---|---|
| Expanded | `left-[228px]` |
| Collapsed | `left-[84px]` |

> `left-[228px]` = 240px sidebar - 12px button inset · `left-[84px]` = 96px sidebar - 12px button inset · `rounded-[160px]` = Figma-confirmed pill radius

### Toggle Icon

| State | Icon |
|---|---|
| Expanded | `ArrowLeftIcon` from `src/assets/icons/` |
| Collapsed | `ArrowRightIcon` from `src/assets/icons/` |

Icon size: `size-4` (16×16px) · `aria-hidden="true"`.

Button: `<button type="button" aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}>`.

---

## State Behavior

- `collapsed` is controlled externally via the `onToggle` callback + parent state.
- On toggle: sidebar width transitions smoothly — add `transition-[width] duration-200` on the sidebar panel.
- The toggle button position also transitions — add `transition-[left] duration-200`.
- Respect `prefers-reduced-motion`: wrap transitions in the Tailwind `motion-safe:` modifier.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-nav-bg` | `bg-nav-bg` | Sidebar panel background |
| `--color-nav-bg-hover` | `hover:bg-nav-bg-hover` | Default nav item hover background |
| `--color-nav-tile-bg-primary` | `bg-nav-tile-bg-primary` | Selected nav item bg (expanded) + selected icon tile |
| `--color-nav-tile-bg-secondary` | `bg-nav-tile-bg-secondary` | Default icon tile (collapsed) + profile card |
| `--color-nav-text-primary` | `text-nav-text-primary` | Selected label (expanded) |
| `--color-nav-text-primary-dark` | `text-nav-text-primary-collapse` | White text: selected label (collapsed) + profile name |
| `--color-nav-text-secondary` | `text-nav-text-secondary` | Default label + profile role + default collapsed label |
| `--color-nav-icon-primary` | `text-nav-icon-primary` | Selected nav item icon |
| `--color-nav-icon-secondary` | `text-nav-icon-secondary` | Default (non-selected) nav item icon |
| `--color-bg-black` | `bg-bg-black` | Toggle button background |
| `--color-border-white` | `border-border-white` | Toggle button border |
