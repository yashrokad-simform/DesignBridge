# Tailwind v4 Patterns Reference

Standard Tailwind utility mappings and Tailwind v4 `@theme` directive patterns.

## Standard Tailwind Utilities

Always check if a standard Tailwind utility exists before adding custom tokens.

---

## Width Mappings

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `w-[4px]` | `w-1` | 0.25rem (4px) |
| `w-[8px]` | `w-2` | 0.5rem (8px) |
| `w-[12px]` | `w-3` | 0.75rem (12px) |
| `w-[16px]` | `w-4` | 1rem (16px) |
| `w-[20px]` | `w-5` | 1.25rem (20px) |
| `w-[24px]` | `w-6` | 1.5rem (24px) |
| `w-[32px]` | `w-8` | 2rem (32px) |
| `w-[40px]` | `w-10` | 2.5rem (40px) |
| `w-[48px]` | `w-12` | 3rem (48px) |
| `w-[64px]` | `w-16` | 4rem (64px) |
| `w-[96px]` | `w-24` | 6rem (96px) |
| `w-[128px]` | `w-32` | 8rem (128px) |
| `w-[256px]` | `w-64` | 16rem (256px) |
| `w-[384px]` | `w-96` | 24rem (384px) |

**Full Width:**
- `w-[100%]` → `w-full`
- `w-[100vw]` → `w-screen`
- `w-[auto]` → `w-auto`

**Fractional:**
- `w-[50%]` → `w-1/2`
- `w-[33.333%]` → `w-1/3`
- `w-[25%]` → `w-1/4`

---

## Height Mappings

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `h-[4px]` | `h-1` | 0.25rem (4px) |
| `h-[8px]` | `h-2` | 0.5rem (8px) |
| `h-[12px]` | `h-3` | 0.75rem (12px) |
| `h-[16px]` | `h-4` | 1rem (16px) |
| `h-[20px]` | `h-5` | 1.25rem (20px) |
| `h-[24px]` | `h-6` | 1.5rem (24px) |
| `h-[32px]` | `h-8` | 2rem (32px) |
| `h-[40px]` | `h-10` | 2.5rem (40px) |
| `h-[48px]` | `h-12` | 3rem (48px) |
| `h-[64px]` | `h-16` | 4rem (64px) |

**Full Height:**
- `h-[100%]` → `h-full`
- `h-[100vh]` → `h-screen`

---

## Spacing (Padding/Margin) Mappings

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `p-[0px]` | `p-0` | 0 |
| `p-[1px]` | `p-px` | 1px |
| `p-[4px]` | `p-1` | 0.25rem (4px) |
| `p-[8px]` | `p-2` | 0.5rem (8px) |
| `p-[12px]` | `p-3` | 0.75rem (12px) |
| `p-[16px]` | `p-4` | 1rem (16px) |
| `p-[20px]` | `p-5` | 1.25rem (20px) |
| `p-[24px]` | `p-6` | 1.5rem (24px) |
| `p-[32px]` | `p-8` | 2rem (32px) |
| `p-[40px]` | `p-10` | 2.5rem (40px) |
| `p-[48px]` | `p-12` | 3rem (48px) |
| `p-[64px]` | `p-16` | 4rem (64px) |
| `p-[96px]` | `p-24` | 6rem (96px) |
| `p-[128px]` | `p-32` | 8rem (128px) |

**Note:** Replace `p-` with `px-`, `py-`, `pt-`, `pb-`, `pl-`, `pr-`, `m-`, `mx-`, `my-`, `mt-`, `mb-`, `ml-`, `mr-`

---

## Gap Mappings

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `gap-[0px]` | `gap-0` | 0 |
| `gap-[1px]` | `gap-px` | 1px |
| `gap-[4px]` | `gap-1` | 0.25rem (4px) |
| `gap-[8px]` | `gap-2` | 0.5rem (8px) |
| `gap-[12px]` | `gap-3` | 0.75rem (12px) |
| `gap-[16px]` | `gap-4` | 1rem (16px) |
| `gap-[20px]` | `gap-5` | 1.25rem (20px) |
| `gap-[24px]` | `gap-6` | 1.5rem (24px) |
| `gap-[32px]` | `gap-8` | 2rem (32px) |

**Note:** Also applies to `gap-x-` and `gap-y-` variants

---

## Typography Mappings

### Font Size

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `text-[12px]` | `text-xs` | 0.75rem (12px) |
| `text-[14px]` | `text-sm` | 0.875rem (14px) |
| `text-[16px]` | `text-base` | 1rem (16px) |
| `text-[18px]` | `text-lg` | 1.125rem (18px) |
| `text-[20px]` | `text-xl` | 1.25rem (20px) |
| `text-[24px]` | `text-2xl` | 1.5rem (24px) |
| `text-[30px]` | `text-3xl` | 1.875rem (30px) |
| `text-[36px]` | `text-4xl` | 2.25rem (36px) |
| `text-[48px]` | `text-5xl` | 3rem (48px) |
| `text-[60px]` | `text-6xl` | 3.75rem (60px) |

### Font Weight

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `font-[100]` | `font-thin` | 100 |
| `font-[200]` | `font-extralight` | 200 |
| `font-[300]` | `font-light` | 300 |
| `font-[400]` | `font-normal` | 400 |
| `font-[500]` | `font-medium` | 500 |
| `font-[600]` | `font-semibold` | 600 |
| `font-[700]` | `font-bold` | 700 |
| `font-[800]` | `font-extrabold` | 800 |
| `font-[900]` | `font-black` | 900 |

---

## Border Radius Mappings

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `rounded-[0px]` | `rounded-none` | 0 |
| `rounded-[2px]` | `rounded-sm` | 0.125rem (2px) |
| `rounded-[4px]` | `rounded` | 0.25rem (4px) |
| `rounded-[6px]` | `rounded-md` | 0.375rem (6px) |
| `rounded-[8px]` | `rounded-lg` | 0.5rem (8px) |
| `rounded-[12px]` | `rounded-xl` | 0.75rem (12px) |
| `rounded-[16px]` | `rounded-2xl` | 1rem (16px) |
| `rounded-[24px]` | `rounded-3xl` | 1.5rem (24px) |
| `rounded-[9999px]` | `rounded-full` | 9999px |

---

## Opacity Mappings

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `opacity-[0]` | `opacity-0` | 0 |
| `opacity-[0.05]` | `opacity-5` | 0.05 |
| `opacity-[0.1]` | `opacity-10` | 0.1 |
| `opacity-[0.25]` | `opacity-25` | 0.25 |
| `opacity-[0.5]` | `opacity-50` | 0.5 |
| `opacity-[0.75]` | `opacity-75` | 0.75 |
| `opacity-[1]` | `opacity-100` | 1 |

---

## Z-Index Mappings

| Arbitrary Value | Standard Utility | CSS Value |
|----------------|------------------|-----------|
| `z-[0]` | `z-0` | 0 |
| `z-[10]` | `z-10` | 10 |
| `z-[20]` | `z-20` | 20 |
| `z-[30]` | `z-30` | 30 |
| `z-[40]` | `z-40` | 40 |
| `z-[50]` | `z-50` | 50 |
| `z-[-1]` | `-z-10` | -10 |
| `z-[9999]` | ⚠️ Keep as `z-[9999]` | Intentional max z-index |

---

## Tailwind v4 @theme Directive

### Token Pattern → Generated Utilities

```css
@theme inline {
  /* Color tokens */
  --color-brand-primary: #3b82f6;
  /* Generates: bg-brand-primary, text-brand-primary, border-brand-primary, etc. */
  
  /* Spacing tokens */
  --spacing-xs: 4px;
  /* Generates: p-xs, m-xs, gap-xs, w-xs, h-xs, space-x-xs, space-y-xs */
  
  /* Width tokens */
  --width-modal: 500px;
  /* Generates: w-modal, max-w-modal, min-w-modal */
  
  /* Radius tokens */
  --radius-card: 10px;
  /* Generates: rounded-card */
  
  /* Shadow tokens */
  --shadow-elevation: 0px 4px 12px rgba(0, 0, 0, 0.1);
  /* Generates: shadow-elevation */
  
  /* Font size tokens */
  --text-heading: 20px;
  /* Generates: text-heading */
  
  /* Font weight tokens */
  --font-weight-medium: 500;
  /* Generates: font-medium */
  
  /* Font family tokens */
  --font-body: 'Inter', sans-serif;
  /* Generates: font-body */
}
```

### Complete Token Type Reference

| Token Prefix | Generated Utilities | Example |
|-------------|---------------------|---------|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `fill-*`, `stroke-*`, `ring-*` | `--color-brand → bg-brand` |
| `--spacing-*` | `p-*`, `m-*`, `gap-*`, `w-*`, `h-*`, `inset-*`, `space-x-*`, `space-y-*` | `--spacing-xl → p-xl` |
| `--width-*` | `w-*`, `max-w-*`, `min-w-*` | `--width-modal → w-modal` |
| `--height-*` | `h-*`, `max-h-*`, `min-h-*` | `--height-panel → h-panel` |
| `--radius-*` | `rounded-*` | `--radius-card → rounded-card` |
| `--shadow-*` | `shadow-*` | `--shadow-md → shadow-md` |
| `--text-*` | `text-*` (font-size) | `--text-display → text-display` |
| `--font-weight-*` | `font-*` | `--font-weight-bold → font-bold` |
| `--font-*` | `font-*` (font-family) | `--font-sans → font-sans` |
| `--blur-*` | `blur-*` | `--blur-sm → blur-sm` |
| `--brightness-*` | `brightness-*` | `--brightness-50 → brightness-50` |
| `--contrast-*` | `contrast-*` | `--contrast-100 → contrast-100` |
| `--grayscale-*` | `grayscale-*` | `--grayscale-0 → grayscale-0` |
| `--invert-*` | `invert-*` | `--invert-0 → invert-0` |
| `--saturate-*` | `saturate-*` | `--saturate-100 → saturate-100` |
| `--sepia-*` | `sepia-*` | `--sepia-0 → sepia-0` |
| `--opacity-*` | `opacity-*` | `--opacity-50 → opacity-50` |
| `--transition-*` | `transition-*` | `--transition-all → transition-all` |
| `--duration-*` | `duration-*` | `--duration-300 → duration-300` |
| `--ease-*` | `ease-*` | `--ease-in → ease-in` |
| `--delay-*` | `delay-*` | `--delay-100 → delay-100` |
| `--animate-*` | `animate-*` | `--animate-spin → animate-spin` |

### Color Token Special Cases

**Tailwind v4 supports opacity modifiers with slash notation:**

```tsx
// Token definition
@theme inline {
  --color-primary: rgba(59, 130, 246, 1);
}

// Usage with opacity
<div className="bg-primary/50"> {/* 50% opacity */}
<div className="text-primary/75"> {/* 75% opacity */}
<div className="border-primary/25"> {/* 25% opacity */}
```

**Arbitrary opacity in v4:**
```tsx
<div className="bg-primary/[0.15]"> {/* 15% opacity */}
```

---

## Adding Custom Tokens

### Location Options

#### Option 1: @theme inline (Recommended for v4)

**File:** `src/styles/theme.css`

**Syntax:**
```css
@theme inline {
  --width-panel: 280px;
  --color-brand-surface: rgba(240, 248, 255, 1);
  --spacing-xxl: 48px;
}
```

**Pros:**
- Native v4 approach
- Automatic utility generation
- CSS custom properties available in styles
- IDE autocomplete support

#### Option 2: tailwind.config.ts (v3 Compatibility)

**File:** `tailwind.config.ts`

**Syntax:**
```typescript
export default {
  theme: {
    extend: {
      width: {
        'panel': '280px',
      },
      colors: {
        'brand-surface': 'rgba(240, 248, 255, 1)',
      },
      spacing: {
        'xxl': '48px',
      }
    }
  }
}
```

**Pros:**
- Familiar v3 syntax
- Better for complex theme logic
- TypeScript autocomplete

---

## Token Naming Best Practices

### DO ✅

```css
/* Semantic names */
--color-brand-primary
--color-status-success
--color-surface-elevated

/* Component-based names */
--width-modal-md
--radius-button
--shadow-card

/* Size scales */
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl
--text-xs, --text-sm, --text-base, --text-lg

/* Use kebab-case */
--color-brand-accent (not --colorBrandAccent or --color_brand_accent)
```

### DON'T ❌

```css
/* Magic numbers */
--width-437 (not semantic)
--color-abc123 (not descriptive)

/* Abbreviations that aren't clear */
--col-pri (unclear)
--bg-sec (ambiguous)

/* Mixing naming conventions */
--colorPrimary (camelCase - use kebab-case)
--Color_Secondary (snake_case - use kebab-case)
```

---

## Decision Tree for Replacements

```
Arbitrary value found (e.g., w-[300px])
│
├─ Step 1: Check Standard Tailwind
│   └─ Does w-4, text-sm, rounded-md, etc. match?
│      └─ YES → Use standard utility ✅
│      └─ NO → Go to Step 2
│
├─ Step 2: Check Project Theme
│   └─ Does w-modal-sm, bg-brand-dark, etc. match?
│      └─ YES → Use project theme utility ✅
│      └─ NO → Go to Step 3
│
├─ Step 3: Check Frequency
│   └─ Does value appear 3+ times?
│      └─ YES → Add @theme token → Use generated utility ✅
│      └─ NO → Go to Step 4
│
└─ Step 4: Single Use
    └─ Can you use var(--closest-token)?
       └─ YES → Use w-[var(--spacing-xl)] ✅
       └─ NO → Keep arbitrary with comment:
          {/* arbitrary: intentional - [reason] */}
```

---

## Common Patterns

### Pattern 1: Standard Utility First

```tsx
// ❌ Before
<div className="w-[16px] h-[16px] p-[12px] text-[14px]">

// ✅ After (all standard utilities)
<div className="w-4 h-4 p-3 text-sm">
```

### Pattern 2: Mix Standard + Project Theme

```tsx
// ❌ Before
<Dialog className="w-[400px] p-[16px] rounded-[10px] shadow-[0px_1px_2px...]">

// ✅ After
<Dialog className="w-modal-md p-4 rounded-card shadow-elevation-sm">
//                   ↑ project   ↑ std  ↑ project  ↑ project
```

### Pattern 3: Add New Token for Repeated Values

```tsx
// ❌ Before (appears 4 times in codebase)
<Panel className="w-[280px]">
<Sidebar className="w-[280px]">
<Menu className="w-[280px]">
<Nav className="w-[280px]">

// ✅ After (add --width-panel: 280px to @theme)
<Panel className="w-panel">
<Sidebar className="w-panel">
<Menu className="w-panel">
<Nav className="w-panel">
```

### Pattern 4: Keep Intentional Arbitraries

```tsx
// ✅ Keep (dynamic calculation)
<div className="h-[calc(100vh-var(--header)-var(--footer))]">
  {/* arbitrary: intentional - dynamic viewport calculation */}
</div>

// ✅ Keep (maximum z-index)
<Overlay className="z-[9999]">
  {/* arbitrary: intentional - ensure overlay is above all content */}
</Overlay>

// ✅ Keep (JS-computed value)
<div className={`w-[${dynamicWidth}px]`}>
  {/* arbitrary: intentional - width computed at runtime */}
</div>
```

---

## Verification Commands

### Find All Arbitrary Values

```bash
# Find all arbitrary values in class names
rg 'className=.*\[.*?\]' src/ --type tsx

# Find specific patterns
rg '(w|h|min-w|max-w)-\[' src/
rg '(p|m|gap)-\[' src/
rg '(text|bg|border)-\[' src/
```

### Count Occurrences

```bash
# Count how many times a value appears
rg 'w-\[300px\]' src/ | wc -l

# Find all unique arbitrary widths
rg -o 'w-\[.*?\]' src/ --no-filename | sort | uniq -c | sort -rn
```

### Verify No Arbitrary Values Remain

```bash
# Should only show intentional ones
rg '\[.*?\]' src/ --type tsx | grep className
```

---

## Related References

- [Theme Mapping Reference](./theme-mapping.md) - Project-specific token mappings
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Official docs
- [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/v4-migration) - v3 to v4 migration
