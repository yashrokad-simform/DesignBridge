# Theme Mapping Reference

Project-specific mappings from arbitrary values to theme-backed utilities based on the project's Tailwind v4 theme system.

## Project Theme Overview

This project uses **Tailwind CSS v4** with:
- `:root` CSS variables in `src/styles/theme.css`
- `@theme inline` directive for Tailwind utility generation
- `tailwind.config.ts` for v3 compatibility layer

---

## Width & Height Mappings

### Modal Widths

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `w-[300px]` | `w-modal-sm` | `tailwind.config.ts` |
| `max-w-[300px]` | `max-w-modal-sm` | `tailwind.config.ts` |
| `w-[400px]` | `w-modal-md` | `tailwind.config.ts` |
| `max-w-[400px]` | `max-w-modal-md` | `tailwind.config.ts` |
| `w-[500px]` | `w-modal-lg` | `tailwind.config.ts` |
| `max-w-[500px]` | `max-w-modal-lg` | `tailwind.config.ts` |
| `w-[600px]` | `w-modal-xl` | `tailwind.config.ts` |
| `max-w-[600px]` | `max-w-modal-xl` | `tailwind.config.ts` |
| `w-[400px]` | `w-modal-form` | `tailwind.config.ts` |

**Usage:**
```tsx
// ❌ Before
<Dialog className="w-[400px] max-w-[400px]">

// ✅ After
<Dialog className="w-modal-md max-w-modal-md">
```

### Sidebar Widths

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `w-[200px]` | `w-sidebar-sm` | `tailwind.config.ts` |
| `w-[250px]` | `w-sidebar-md` | `tailwind.config.ts` |
| `w-[300px]` | `w-sidebar-lg` | `tailwind.config.ts` |

### Column Widths

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `w-[150px]` | `w-col-sm` | `tailwind.config.ts` |
| `w-[160px]` | `w-col-md` | `tailwind.config.ts` |
| `w-[180px]` | `w-col-lg` | `tailwind.config.ts` |

### Special Widths

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `w-[185px]`, `max-w-[185px]` | `max-w-logo` | `tailwind.config.ts` |
| `w-[480px]`, `max-w-[480px]` | `max-w-content` | `tailwind.config.ts` |

### Input/Icon Heights

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `w-[40px]` | `w-input-icon` | `:root` → `--input-height: 40px` |
| `h-[40px]` | `h-input-icon` | `:root` → `--input-height: 40px` |
| `w-[40px] h-[40px]` | `w-input-icon h-input-icon` | Combined |

**Usage:**
```tsx
// ❌ Before
<button className="w-[40px] h-[40px]">
  <IconComponent />
</button>

// ✅ After
<button className="w-input-icon h-input-icon">
  <IconComponent />
</button>
```

---

## Spacing Mappings

### Padding/Margin

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `p-[4px]` | `p-spacing-xs` | `:root` → `--spacing-xs: 4px` |
| `p-[8px]` | `p-spacing-sm` | `:root` → `--spacing-sm: 8px` |
| `p-[16px]` | `p-spacing-md` | `:root` → `--spacing-md: 16px` |
| `p-[20px]` | `p-spacing-lg` | `:root` → `--spacing-lg: 20px` |
| `p-[32px]` | `p-spacing-xl` | `:root` → `--spacing-xl: 32px` |
| `p-[48px]` | `p-2xl` | `tailwind.config.ts` → `spacing.2xl: 48px` |

**Note:** Replace `p-` prefix with `px-`, `py-`, `pt-`, `pb-`, `pl-`, `pr-`, `m-`, `mx-`, `my-`, etc.

### Gap Spacing

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `gap-[4px]` | `gap-spacing-xs` | Same as above |
| `gap-[8px]` | `gap-spacing-sm` | Same as above |
| `gap-[16px]` | `gap-spacing-md` | Same as above |
| `gap-[20px]` | `gap-spacing-lg` | Same as above |
| `gap-[32px]` | `gap-spacing-xl` | Same as above |

### Space Between

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `space-y-[4px]` | `space-y-spacing-xs` | Same as above |
| `space-y-[8px]` | `space-y-spacing-sm` | Same as above |
| `space-y-[16px]` | `space-y-spacing-md` | Same as above |

**Usage:**
```tsx
// ❌ Before
<div className="p-[16px] gap-[8px]">

// ✅ After  
<div className="p-spacing-md gap-spacing-sm">
```

---

## Color Mappings

### Brand Colors

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `bg-[rgba(12,43,64,1)]` | `bg-brand-dark` | `:root` → `--brand-dark` |
| `text-[rgba(12,43,64,1)]` | `text-brand-dark` | Same |
| `border-[rgba(12,43,64,1)]` | `border-brand-dark` | Same |
| `bg-[rgba(77,127,250,1)]` | `bg-brand-accent` | `:root` → `--brand-accent` |
| `text-[rgba(77,127,250,1)]` | `text-brand-accent` | Same |
| `bg-[rgba(228,248,255,1)]` | `bg-brand-light` | `:root` → `--brand-light` |
| `bg-[rgba(17,180,234,1)]` | `bg-primary` | `:root` → `--primary` |
| `text-[rgba(17,180,234,1)]` | `text-primary` | Same |

**Usage:**
```tsx
// ❌ Before
<div className="bg-[rgba(12,43,64,1)] text-[rgba(228,248,255,1)]">
  Brand Section
</div>

// ✅ After
<div className="bg-brand-dark text-brand-light">
  Brand Section
</div>
```

### Semantic Colors

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `bg-[rgba(245,245,245,1)]` | `bg-muted` | `@theme` → `--color-muted` |
| `text-[rgba(115,115,115,1)]` | `text-muted-foreground` | `@theme` → `--color-muted-foreground` |
| `border-[rgba(229,229,229,1)]` | `border-border` | `@theme` → `--color-border` |
| `bg-[white]`, `bg-[#ffffff]` | `bg-background` | `@theme` → `--color-background` |
| `text-[black]`, `text-[#000000]` | `text-foreground` | `@theme` → `--color-foreground` |

### Status Colors

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `bg-[rgba(16,185,129,1)]` | `bg-success` | `:root` → `--success` |
| `text-[rgba(16,185,129,1)]` | `text-success` | Same |
| `bg-[rgba(245,158,11,1)]` | `bg-warning` | `:root` → `--warning` |
| `text-[rgba(245,158,11,1)]` | `text-warning` | Same |
| `bg-[...destructive...]` | `bg-destructive` | `@theme` → `--color-destructive` |

### Chart Colors

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `bg-[...chart-1...]` | `bg-chart-1` | `@theme` → `--color-chart-1` |
| `bg-[...chart-2...]` | `bg-chart-2` | `@theme` → `--color-chart-2` |
| `bg-[...chart-3...]` | `bg-chart-3` | `@theme` → `--color-chart-3` |
| `bg-[...chart-4...]` | `bg-chart-4` | `@theme` → `--color-chart-4` |
| `bg-[...chart-5...]` | `bg-chart-5` | `@theme` → `--color-chart-5` |

---

## Border Radius Mappings

| Arbitrary Value | Theme Utility | Token Source | CSS Value |
|----------------|---------------|--------------|-----------|
| `rounded-[4px]` | `rounded-sm` | `@theme` → `--radius-sm` | `calc(var(--radius) - 4px)` |
| `rounded-[6px]` | `rounded-md` | `@theme` → `--radius-md` | `calc(var(--radius) - 2px)` |
| `rounded-[8px]` | `rounded-lg` | `@theme` → `--radius-lg` | `var(--radius)` (8px) |
| `rounded-[12px]` | `rounded-xl` | `@theme` → `--radius-xl` | `calc(var(--radius) + 4px)` |
| `rounded-[10px]` | `rounded-card` | `@theme` → `--radius-card` | `var(--radius-card)` (10px) |

**Usage:**
```tsx
// ❌ Before
<Card className="rounded-[10px]">

// ✅ After
<Card className="rounded-card">
```

---

## Shadow Mappings

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]` | `shadow-elevation-sm` | `@theme` → `--shadow-elevation-sm` |
| `shadow-[0px_4px_12px...]` | `shadow-elevation-md` | `@theme` → `--shadow-elevation-md` |
| `shadow-[0px_8px_24px...]` | `shadow-elevation-lg` | `@theme` → `--shadow-elevation-lg` |

**Usage:**
```tsx
// ❌ Before
<Card className="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">

// ✅ After
<Card className="shadow-elevation-sm">
```

---

## Typography Mappings

### Font Sizes

| Arbitrary Value | Theme Utility | Token Source | CSS Value |
|----------------|---------------|--------------|-----------|
| `text-[12px]` | `text-xs` | Standard Tailwind | 12px |
| `text-[14px]` | `text-sm` | Standard Tailwind | 14px |
| `text-[16px]` | `text-base` | Standard Tailwind | 16px |
| `text-[18px]` | `text-lg` | `:root` → `--text-lg: 18px` | 18px |
| `text-[20px]` | `text-heading-lg` | `tailwind.config.ts` | 20px |
| `text-[24px]` | `text-display` | `tailwind.config.ts` | 24px |
| `text-[48px]` | `text-5xl` | `:root` → `--text-5xl: 48px` | 48px |

### Font Weights

| Arbitrary Value | Theme Utility | Token Source | CSS Value |
|----------------|---------------|--------------|-----------|
| `font-[400]` | `font-normal` | `:root` → `--font-weight-normal` | 400 |
| `font-[500]` | `font-medium` | `:root` → `--font-weight-medium` | 500 |
| `font-[600]` | `font-semibold` | `:root` → `--font-weight-semibold` | 600 |
| `font-[700]` | `font-bold` | `:root` → `--font-weight-bold` | 700 |
| `font-[800]` | `font-extrabold` | `:root` → `--font-weight-extrabold` | 800 |

**Usage:**
```tsx
// ❌ Before
<h2 className="text-[20px] font-[600]">

// ✅ After
<h2 className="text-heading-lg font-semibold">
```

---

## Font Family Mappings

| Arbitrary Value | Theme Utility | Token Source |
|----------------|---------------|--------------|
| `font-['Geist',...]` | `font-sans` | `@theme` → `--font-sans` |
| `font-['Inter',...]` | `font-body` | `@theme` → `--font-body` |

---

## Quick Lookup Table

### Most Common Replacements

```
Width:
w-[300px] → w-modal-sm
w-[400px] → w-modal-md
w-[40px] → w-input-icon

Height:
h-[40px] → h-input-icon

Spacing:
p-[16px] → p-spacing-md
gap-[8px] → gap-spacing-sm
m-[32px] → m-spacing-xl

Colors:
bg-[rgba(12,43,64,1)] → bg-brand-dark
text-[rgba(115,115,115,1)] → text-muted-foreground
border-[rgba(229,229,229,1)] → border-border

Border Radius:
rounded-[8px] → rounded-lg
rounded-[10px] → rounded-card
rounded-[12px] → rounded-xl

Shadows:
shadow-[0px_1px_2px...] → shadow-elevation-sm

Typography:
text-[14px] → text-sm
text-[20px] → text-heading-lg
font-[600] → font-semibold
```

---

## Adding New Tokens

If a value appears 3+ times and has no theme mapping, add it to the theme:

### Add to @theme inline (Recommended for v4)

**Location:** `src/styles/theme.css`

```css
@theme inline {
  /* Add new token here */
  --width-panel: 280px; /* Example: Generates w-panel */
}
```

### Add to tailwind.config.ts (v3 compatibility)

**Location:** `tailwind.config.ts`

```typescript
export default {
  theme: {
    extend: {
      width: {
        'panel': '280px', // Example: Generates w-panel
      }
    }
  }
}
```

---

## Token Naming Guidelines

Follow these naming conventions for consistency:

**Colors:** `--color-{category}-{variant}`
- `--color-brand-dark`, `--color-brand-light`, `--color-brand-accent`
- `--color-status-success`, `--color-status-warning`, `--color-status-error`

**Spacing:** `--spacing-{size}`
- `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`, `--spacing-xxl`

**Widths:** `--width-{component}-{size}` or `--width-{purpose}`
- `--width-modal-sm`, `--width-sidebar-md`, `--width-panel`

**Radius:** `--radius-{component}` or `--radius-{size}`
- `--radius-card`, `--radius-button`, `--radius-sm`

**Shadows:** `--shadow-{type}-{size}`
- `--shadow-elevation-sm`, `--shadow-elevation-md`, `--shadow-elevation-lg`

**Typography:** `--text-{size}` or `--font-weight-{weight}`
- `--text-xs`, `--text-display`, `--font-weight-semibold`

---

## Verification Checklist

When replacing arbitrary values:

- [ ] Check this mapping reference first
- [ ] Verify token value exactly matches arbitrary value
- [ ] Test visual appearance after replacement
- [ ] Ensure responsive behavior unchanged
- [ ] Confirm build succeeds
- [ ] Update this reference if adding new tokens

---

## Related References

- [Tailwind v4 Patterns](./tailwind-v4-patterns.md) - Standard utility mappings and @theme syntax
- `src/styles/theme.css` - View full project theme
- `tailwind.config.ts` - View extended config
