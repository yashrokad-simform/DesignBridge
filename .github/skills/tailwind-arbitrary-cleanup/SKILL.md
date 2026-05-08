---
name: tailwind-arbitrary-cleanup
description: 'Replace Tailwind CSS arbitrary values (w-[300px], bg-[#1a1a1a]) with semantic theme-backed utility classes using CSS custom properties. Use when: cleaning up arbitrary values, migrating to v4 theme system, enforcing design system consistency, improving maintainability, preparing for design token migration, or standardizing Tailwind usage. Preserves visual appearance and behavior.'
argument-hint: 'File path, component name, directory, or "all" for full project scan'
user-invocable: true
---

# Tailwind Arbitrary Value Cleanup

Systematic workflow for replacing Tailwind CSS arbitrary values with semantic, theme-backed utility classes without changing visual appearance, layout, or behavior.

## When to Use This Skill

**Theme System Adoption:**
- Migrating to Tailwind v4 with `@theme` directive
- Enforcing design system consistency
- Standardizing component styling
- Preparing for design token migration

**Code Quality:**
- Removing magic numbers from class names
- Improving maintainability
- Making styles semantic and self-documenting
- Reducing arbitrary value proliferation

**Warning Signs:**
- Many `w-[300px]`, `text-[#1a1a1a]` patterns in codebase
- Duplicate arbitrary values across components
- Unclear what design tokens exist
- Hard to maintain consistent spacing/colors

## What This Skill Does

1. **Discovers** all arbitrary values in component class names
2. **Maps** values to existing theme tokens or standard utilities
3. **Extends** theme with new tokens for repeated values
4. **Replaces** arbitrary values with semantic utilities
5. **Verifies** visual appearance remains identical

---

## 4-Phase Workflow

### Phase 1: Discovery & Inventory

**Objective:** Find all arbitrary values and categorize them.

#### Step 1A: Search for Arbitrary Value Patterns

**Search Patterns:**
```bash
# Find all arbitrary values in class names
rg "className=.*\[.*?\]" src/ --type tsx --type ts
rg "class=.*\[.*?\]" src/ --type jsx --type js

# Or more specific patterns
rg "(w|h|min-w|max-w|min-h|max-h)-\[" src/
rg "(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-\[" src/
rg "(text|bg|border)-\[" src/
rg "(rounded|shadow|opacity|gap|space-[xy])-\[" src/
rg "(top|right|bottom|left|z)-\[" src/
```

**Target Patterns:**
- `w-[300px]`, `h-[40px]`, `min-w-[200px]`, `max-w-[600px]`
- `p-[16px]`, `px-[20px]`, `m-[8px]`, `gap-[12px]`
- `text-[14px]`, `text-[#1a1a1a]`, `text-[rgba(115,115,115,1)]`
- `bg-[#f5f5f5]`, `bg-[rgba(12,43,64,0.95)]`
- `border-[#e5e5e5]`, `rounded-[8px]`, `rounded-[10px]`
- `shadow-[0px_1px_2px...]`, `opacity-[0.8]`

#### Step 1B: Categorize by Type and Frequency

Group findings by value type:

```markdown
## Arbitrary Values Found

### Width/Height (42 instances)
- `w-[300px]` - 8 occurrences → Modal width
- `w-[400px]` - 5 occurrences → Form width
- `w-[40px]` - 12 occurrences → Icon button size
- `h-[40px]` - 15 occurrences → Input height
- `max-w-[600px]` - 2 occurrences → Content max-width

### Spacing (38 instances)
- `p-[16px]` - 6 occurrences → Standard padding
- `px-[20px]` - 4 occurrences → Horizontal padding
- `m-[8px]` - 3 occurrences → Small margin
- `gap-[12px]` - 5 occurrences → Flex/grid gap
- `space-y-[24px]` - 4 occurrences → Vertical spacing

### Colors (27 instances)
- `text-[#1a1a1a]` - 4 occurrences → Dark text
- `bg-[rgba(12,43,64,1)]` - 6 occurrences → Brand dark
- `bg-[rgba(245,245,245,1)]` - 3 occurrences → Muted background
- `border-[rgba(229,229,229,1)]` - 8 occurrences → Border color

### Border Radius (18 instances)
- `rounded-[8px]` - 9 occurrences → Standard radius
- `rounded-[10px]` - 5 occurrences → Card radius
- `rounded-[12px]` - 4 occurrences → Large radius

### Shadows (12 instances)
- `shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]` - 7 occurrences → Small elevation
- `shadow-[0px_4px_12px...]` - 5 occurrences → Medium elevation

### Typography (15 instances)
- `text-[14px]` - 6 occurrences → Small text
- `text-[20px]` - 4 occurrences → Heading size
- `text-[24px]` - 3 occurrences → Display size
- `font-[600]` - 2 occurrences → Semibold weight
```

**Output:** Complete inventory with frequency analysis

### Phase 2: Mapping Strategy

**Objective:** Determine replacement approach for each value.

#### Step 2A: Check Standard Tailwind Utilities

**Standard Utility Mappings:**

See [Tailwind v4 Reference](./references/tailwind-v4-patterns.md) for complete mappings.

**Quick Reference:**
```
w-[4px] → w-1       w-[16px] → w-4      w-[32px] → w-8
h-[8px] → h-2       h-[24px] → h-6      h-[48px] → h-12
p-[12px] → p-3      p-[20px] → p-5      p-[40px] → p-10
m-[8px] → m-2       m-[16px] → m-4      m-[32px] → m-8
text-[12px] → text-xs   text-[14px] → text-sm   text-[16px] → text-base
rounded-[6px] → rounded-md   rounded-[8px] → rounded-lg
opacity-[0.5] → opacity-50   opacity-[0.75] → opacity-75
```

**Rule:** Always prefer standard Tailwind utilities when exact match exists.

#### Step 2B: Map to Existing Project Theme

**Read Project Theme:**

1. **Check `src/styles/theme.css` `:root` tokens:**
   ```css
   --radius: 8px;
   --primary: rgba(17, 180, 234, 1);
   --input-height: 40px;
   --spacing-md: 16px;
   ```

2. **Check `@theme inline` block:**
   ```css
   @theme inline {
     --color-primary: var(--primary);
     --radius-lg: var(--radius);
     --spacing-md: 16px;
   }
   ```

3. **Check `tailwind.config.ts` extended theme:**
   ```typescript
   theme: {
     extend: {
       width: {
         'modal-sm': '300px',
         'modal-md': '400px',
       }
     }
   }
   ```

**Project-Specific Mappings:**

See [Theme Mapping Reference](./references/theme-mapping.md) for complete project mappings.

**Quick Reference:**
```
w-[300px] → w-modal-sm       w-[400px] → w-modal-md
w-[500px] → w-modal-lg       w-[600px] → w-modal-xl
w-[40px], h-[40px] → w-input-icon, h-input-icon
text-[20px] → text-heading-lg
text-[24px] → text-display
rounded-[8px] → rounded-lg
rounded-[10px] → rounded-card
bg-[rgba(12,43,64,1)] → bg-brand-dark
bg-[rgba(77,127,250,1)] → bg-brand-accent
shadow-[0px_1px_2px...] → shadow-elevation-sm
```

#### Step 2C: Decision Tree for Each Value

```
For each arbitrary value:

1. Does STANDARD Tailwind utility exist?
   └─ YES → Use it (w-4, text-sm, rounded-md)
   └─ NO → Go to step 2

2. Does EXISTING project theme token exist?
   └─ YES → Use mapped utility (w-modal-sm, bg-brand-dark)
   └─ NO → Go to step 3

3. Does value appear 3+ times?
   └─ YES → Add NEW @theme token → Use generated utility
   └─ NO → Go to step 4

4. Single use / one-off?
   └─ Use var(--closest-token) in arbitrary value
   └─ OR keep as-is with comment: {/* arbitrary: intentional */}
```

**Output:** Mapping plan for each unique value

```markdown
## Mapping Plan

### Use Standard Utilities (45 values)
- `w-[16px]` → `w-4` (15 occurrences)
- `p-[12px]` → `p-3` (8 occurrences)
- `text-[14px]` → `text-sm` (12 occurrences)
- `rounded-[6px]` → `rounded-md` (10 occurrences)

### Use Existing Theme (28 values)
- `w-[300px]` → `w-modal-sm` (8 occurrences)
- `bg-[rgba(12,43,64,1)]` → `bg-brand-dark` (6 occurrences)
- `rounded-[8px]` → `rounded-lg` (9 occurrences)
- `shadow-[0px_1px_2px...]` → `shadow-elevation-sm` (5 occurrences)

### Add New Theme Tokens (12 values)
- `w-[280px]` → NEW: `w-panel` (4 occurrences)
- `text-[18px]` → NEW: `text-lg` (5 occurrences)
- `gap-[24px]` → NEW: `gap-6` (3 occurrences)

### Keep as var(--token) (3 values)
- `h-[calc(100vh-64px)]` → Keep as-is (1 occurrence)
- `w-[calc(var(--spacing-xl)+4px)]` → Keep var() usage (2 occurrences)

### Keep as Arbitrary (2 values)
- `z-[9999]` → Keep (modal overlay, intentional)
- `w-[${dynamicWidth}px]` → Keep (dynamic JS value)
```

### Phase 3: Theme Extension

**Objective:** Add new tokens to theme for repeated values.

#### Step 3A: Identify Tokens to Add

From mapping plan, extract all "Add New Theme Tokens" items that appear 3+ times.

**Tailwind v4 Token Types:**

See [Tailwind v4 Patterns Reference](./references/tailwind-v4-patterns.md) for complete token syntax.

**Token Naming Conventions:**

```css
@theme inline {
  /* Colors → bg-*, text-*, border-* */
  --color-brand-surface: rgba(240, 248, 255, 1);
  
  /* Spacing → p-*, m-*, gap-*, w-*, h-* */
  --spacing-panel: 280px;
  --spacing-xxl: 48px;
  
  /* Width → w-* */
  --width-panel: 280px;
  --width-sidebar-compact: 240px;
  
  /* Radius → rounded-* */
  --radius-card: 10px;
  --radius-button: 6px;
  
  /* Shadows → shadow-* */
  --shadow-elevation-sm: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  
  /* Typography → text-* (size) */
  --text-lg: 18px;
  --text-display: 24px;
  
  /* Font Weight → font-* */
  --font-weight-semibold: 600;
}
```

#### Step 3B: Update Theme Files

**Decision: Where to Add?**

1. **`src/styles/theme.css` `@theme inline` block** (Tailwind v4 native)
   - Use for: Colors, spacing, radius, shadows, typography
   - Generates utilities automatically
   - Syntax: `--color-*`, `--spacing-*`, `--radius-*`, etc.

2. **`tailwind.config.ts` `theme.extend`** (v3 compatibility)
   - Use for: Complex width/maxWidth, custom utilities
   - Syntax: Standard Tailwind config

**Example Addition to `@theme inline`:**

```css
@theme inline {
  /* Existing tokens... */
  
  /* NEW: Panel widths */
  --width-panel: 280px;
  --width-sidebar-compact: 240px;
  
  /* NEW: Extended spacing */
  --spacing-xxl: 48px;
  
  /* NEW: Typography sizes */
  --text-lg: 18px; /* between text-base (16px) and text-xl (20px) */
  
  /* NEW: Brand surface color */
  --color-brand-surface: rgba(240, 248, 255, 1);
}
```

**Output:** Updated theme files

```markdown
## Theme Changes

### Added to @theme inline (src/styles/theme.css)
- `--width-panel: 280px;` → Generates `w-panel`
- `--spacing-xxl: 48px;` → Generates `p-xxl`, `m-xxl`, `gap-xxl`
- `--text-lg: 18px;` → Generates `text-lg`
- `--color-brand-surface: rgba(240, 248, 255, 1);` → Generates `bg-brand-surface`, `text-brand-surface`

### Added to tailwind.config.ts
- `width: { 'sidebar-compact': '240px' }` → Generates `w-sidebar-compact`
```

### Phase 4: Replacement & Verification

**Objective:** Replace arbitrary values and verify appearance unchanged.

#### Step 4A: Replace Systematically

**Replacement Order:**
1. Standard utilities (safest, no theme changes)
2. Existing theme utilities
3. Newly added theme utilities
4. var(--token) replacements

**For Each File:**

1. **Load File Content**
   - Read entire file to see all occurrences

2. **Replace Arbitrary Values**
   ```tsx
   // ❌ BEFORE
   <Dialog className="w-[400px] p-[20px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
     <DialogTitle className="text-[20px] font-[600] text-[rgba(12,43,64,1)]">
       Title
     </DialogTitle>
     <DialogContent className="space-y-[16px] text-[14px] text-[rgba(115,115,115,1)]">
       Content
     </DialogContent>
   </Dialog>
   
   // ✅ AFTER
   <Dialog className="w-modal-md p-5 rounded-lg shadow-elevation-sm">
     <DialogTitle className="text-heading-lg font-semibold text-brand-dark">
       Title
     </DialogTitle>
     <DialogContent className="space-y-4 text-sm text-muted-foreground">
       Content
     </DialogContent>
   </Dialog>
   ```

3. **Document Changes**
   - Track what was replaced
   - Note any values kept as arbitrary

**Batch Replacement Example:**

```markdown
## Replacements in src/components/UserProfile.tsx

Changed:
- `w-[300px]` → `w-modal-sm` (line 45)
- `p-[16px]` → `p-4` (line 47)
- `rounded-[8px]` → `rounded-lg` (line 47)
- `text-[14px]` → `text-sm` (lines 52, 58, 64)
- `bg-[rgba(12,43,64,1)]` → `bg-brand-dark` (line 70)

Kept:
- `w-[calc(100%-20px)]` - Dynamic calculation (line 89)
```

#### Step 4B: Visual Verification

**Steps:**

1. **Start Dev Server**
   ```bash
   pnpm run dev
   # or npm run dev / yarn dev
   ```

2. **Visual Inspection**
   - Navigate to all affected components
   - Compare before/after screenshots if available
   - Check all responsive breakpoints
   - Verify hover/focus states

3. **Browser DevTools Check**
   - Inspect computed styles match expectations
   - Verify CSS custom properties resolve correctly
   - Check for any broken styles

**Common Issues:**

- **Token not generating utility:** Check `@theme inline` syntax
- **Wrong color/size:** Verify token value matches arbitrary value
- **Style not applying:** Check specificity, ensure no conflicts

#### Step 4C: Build Verification

```bash
# Type check
pnpm run type-check

# Build
pnpm run build

# Expected: No errors
```

**Common Issues:**
- Missing theme tokens (not defined)
- Typo in utility class name
- Tailwind config not updated

#### Step 4D: Final Audit

**Search for Remaining Arbitrary Values:**

```bash
# Find any remaining arbitrary values
rg "className=.*\[.*?\]" src/ --type tsx

# Verify only intentional ones remain
```

**Intentional Arbitrary Values (OK to keep):**
- Dynamic JS-computed values: `w-[${width}px]`
- Complex calc expressions: `h-[calc(100vh-var(--header)-var(--footer))]`
- One-off layout hacks with comments

**Output:** Verification report

```markdown
## Verification Complete

✅ **Visual:** No appearance changes detected
✅ **Build:** Production build successful
✅ **Type Check:** No TypeScript errors
✅ **Arbitrary Values:** 2 intentional instances remaining

### Changes Summary
- **Files Modified:** 23
- **Arbitrary Values Replaced:** 137
- **Theme Tokens Added:** 12
- **Standard Utilities Used:** 45
- **Existing Theme Used:** 80

### Remaining Arbitrary Values (Intentional)
1. `src/components/Layout.tsx:45` - `h-[calc(100vh-64px)]` - Dynamic viewport calculation
2. `src/components/Modal.tsx:89` - `z-[9999]` - Maximum z-index for overlay

### Bundle Impact
- **Before:** Theme tokens unused, arbitrary values in bundle
- **After:** Consolidated theme tokens, better tree-shaking
- **Estimated Savings:** Minimal (mostly maintainability gain)
```

---

## Safety Rules (Non-Negotiable)

### Never Change

- ❌ Component logic or behavior
- ❌ Event handlers or state management
- ❌ Component names or function signatures
- ❌ Visual layout or appearance (must be pixel-perfect)
- ❌ Responsive breakpoint behavior
- ❌ Animation timings or transitions

### Always Verify

**Before Replacement:**
- [ ] Standard utility exists for this exact value
- [ ] Theme token value matches arbitrary value exactly
- [ ] No side effects from changing specificity

**After Replacement:**
- [ ] Visual appearance identical (screenshot comparison)
- [ ] All breakpoints work correctly
- [ ] Hover/focus/active states unchanged
- [ ] Build succeeds without errors
- [ ] TypeScript compiles without errors

### Do NOT Replace

**Dynamic Values:**
```tsx
// ❌ DON'T replace - JS computed
<div className={`w-[${dynamicWidth}px]`} />
```

**Complex Calculations:**
```tsx
// ❌ DON'T replace - complex calc
<div className="h-[calc(100vh-var(--header)-var(--footer))]" />
```

**Intentional One-Offs:**
```tsx
// ❌ DON'T replace - intentional hack
<div className="z-[9999]" /> {/* Max z-index for modal overlay */}
```

### Add Comments for Kept Arbitraries

```tsx
{/* arbitrary: intentional - dynamic calculation */}
<div className="w-[calc(100%-var(--sidebar))]" />

{/* arbitrary: intentional - maximum z-index */}
<div className="z-[9999]" />
```

---

## Tailwind v4 Theme System

### @theme inline Directive

**Syntax:**
```css
@theme inline {
  /* Token pattern → Generated utilities */
  --color-*: value;     /* → bg-*, text-*, border-* */
  --spacing-*: value;   /* → p-*, m-*, gap-*, w-*, h-* */
  --width-*: value;     /* → w-* */
  --radius-*: value;    /* → rounded-* */
  --shadow-*: value;    /* → shadow-* */
  --text-*: value;      /* → text-* (font-size) */
  --font-weight-*: val; /* → font-* */
}
```

**Example:**
```css
@theme inline {
  --color-brand-surface: rgba(240, 248, 255, 1);
  /* Generates: bg-brand-surface, text-brand-surface, border-brand-surface */
  
  --spacing-panel: 280px;
  /* Generates: p-panel, m-panel, gap-panel, w-panel, h-panel */
  
  --radius-card: 10px;
  /* Generates: rounded-card */
}
```

### v3 vs v4 Comparison

**v3 (tailwind.config.js):**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-surface': 'rgba(240, 248, 255, 1)'
      }
    }
  }
}
```

**v4 (@theme inline):**
```css
@theme inline {
  --color-brand-surface: rgba(240, 248, 255, 1);
}
```

**Benefits of v4:**
- Native CSS custom properties
- Better IDE autocomplete
- Runtime theme switching possible
- Simpler syntax, no config file needed

---

## Common Patterns

See [Theme Mapping Reference](./references/theme-mapping.md) for:
- Complete project-specific token mappings
- Color palette mappings
- Spacing scale mappings
- Typography scale mappings

See [Tailwind v4 Patterns](./references/tailwind-v4-patterns.md) for:
- Standard Tailwind utility equivalents
- @theme inline token syntax
- Token naming conventions
- Generated utility patterns

---

## Quality Checklist

Before completing cleanup:

**Discovery:**
- [ ] All arbitrary values inventoried
- [ ] Values categorized by type
- [ ] Frequency analysis completed
- [ ] Duplicate values identified

**Mapping:**
- [ ] Standard utilities checked first
- [ ] Existing theme tokens mapped
- [ ] New tokens identified (3+ occurrences)
- [ ] One-off values documented

**Theme Extension:**
- [ ] New tokens follow naming conventions
- [ ] @theme inline syntax correct
- [ ] Tokens generate expected utilities
- [ ] Theme changes tested locally

**Replacement:**
- [ ] All files updated systematically
- [ ] Visual appearance unchanged
- [ ] Build succeeds
- [ ] TypeScript compiles
- [ ] Only intentional arbitraries remain

**Verification:**
- [ ] Visual inspection: ✅ Identical
- [ ] Responsive: ✅ All breakpoints work
- [ ] Build: ✅ Successful
- [ ] Type Check: ✅ No errors
- [ ] Audit: ✅ Only intentional arbitraries

---

## Success Metrics

**Code Quality:**
- ✅ Reduced arbitrary values by 90%+
- ✅ All repeated values use theme tokens
- ✅ Theme system fully utilized
- ✅ Styles semantic and self-documenting

**Maintainability:**
- ✅ Design tokens centralized in theme
- ✅ Easy to update global styles
- ✅ No magic numbers in components
- ✅ Consistent spacing/colors across app

**Design System:**
- ✅ Theme tokens enforced
- ✅ Design system compliance improved
- ✅ Easier designer-developer handoff
- ✅ Better alignment with design tokens

---

## Example Invocation

```
/tailwind-arbitrary-cleanup src/components/Dashboard.tsx
/tailwind-arbitrary-cleanup src/components/
/tailwind-arbitrary-cleanup all
```

---

## Troubleshooting

**Issue:** Theme token not generating utility

**Solution:** Check `@theme inline` syntax:
```css
/* ❌ Wrong */
@theme inline {
  color-primary: blue; /* Missing -- prefix */
}

/* ✅ Correct */
@theme inline {
  --color-primary: blue;
}
```

**Issue:** Style not applying after replacement

**Solution:** Verify token value matches arbitrary value exactly:
```tsx
/* ❌ Mismatch */
/* theme.css: --width-modal: 300px */
<div className="w-modal" /> /* Expects 300px, but looks different */

/* Check: Did arbitrary value have different unit? */
/* Original: w-[30rem] - not 300px! */
```

**Issue:** Build fails after theme changes

**Solution:** Restart dev server to pick up theme changes:
```bash
# Stop server (Ctrl+C)
pnpm run dev
```

---

## Related Skills & Agents

**Complementary:**
- `@shadcn-tailwind-review` - Review design system compliance
- `@tailwind-code-review` - Review Tailwind usage patterns

**Follow-Up:**
- `/cleanup-unused` - Remove unused CSS after consolidation
- Design token migration skill (if creating design system)

---

**Remember:** Visual appearance must remain pixel-perfect. When in doubt, keep the arbitrary value with a comment explaining why it's intentional.
