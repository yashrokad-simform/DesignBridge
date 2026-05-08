---
name: cleanup-unused
description: 'Safely remove unused code and npm dependencies from React/TypeScript projects. Use when: cleaning up unused imports, removing dead code, eliminating unused dependencies, improving bundle size, preparing for production, reducing technical debt, cleaning up after refactoring, or improving code maintainability. Preserves functionality and exported APIs.'
argument-hint: 'File path, component name, or "all" for full project scan'
user-invocable: true
---

# Unused Code and Dependency Cleanup

Comprehensive workflow for safely identifying and removing unused code, imports, variables, functions, components, types, and npm dependencies from React + TypeScript projects without breaking functionality.

## When to Use This Skill

**Code Cleanup:**
- After major refactoring or feature removal
- Before production release
- When bundle size is too large
- During code review cleanup
- When removing deprecated features

**Dependency Cleanup:**
- Before major version upgrades
- When package.json has grown large
- During security audit preparation
- When build times are slow

**Warning Signs:**
- ESLint warnings about unused variables
- TypeScript errors about unused imports
- Large node_modules directory
- Long build times
- Unused components in codebase

## What This Skill Does

1. **Analyzes** codebase for unused code and dependencies
2. **Categorizes** findings by safety level (safe/risky/keep)
3. **Plans** removal strategy to avoid breaking changes
4. **Implements** safe removals with verification
5. **Documents** what was removed and why

---

## 4-Phase Workflow

### Phase 1: Discovery & Analysis

**Objective:** Identify all unused code and dependencies safely.

#### Step 1A: Analyze Unused Code

1. **Run Static Analysis Tools**
   ```bash
   # TypeScript compiler unused code detection
   npx tsc --noEmit --extendedDiagnostics
   
   # ESLint unused code detection
   npx eslint . --ext .ts,.tsx
   
   # Find unused exports (if using ts-prune)
   npx ts-prune
   ```

2. **Identify Unused Imports**
   - Search for imports with no usage in file
   - Check for side-effect imports (keep these)
   - Note imports used only in types

3. **Identify Unused Variables**
   - Local variables never read
   - Function parameters prefixed with `_` (intentionally unused)
   - State variables that are set but never used

4. **Identify Unused Functions**
   - Functions defined but never called
   - Exported functions with no external usage
   - Helper functions that became obsolete

5. **Identify Unused Components**
   - React components not imported anywhere
   - Components in legacy folders
   - Duplicate component implementations

6. **Identify Unused Types/Interfaces**
   - TypeScript types/interfaces with no usage
   - Types that were replaced by new definitions
   - Redundant type aliases

#### Step 1B: Analyze Unused Dependencies

1. **List All Dependencies**
   ```bash
   # View all dependencies
   npm list --depth=0
   
   # Or use depcheck (recommended)
   npx depcheck
   ```

2. **Search For Usage**
   For each dependency in package.json:
   - Search for `import ... from 'package-name'`
   - Search for `require('package-name')`
   - Check config files (vite.config, tsconfig, etc.)
   - Check package.json scripts
   - Check for dynamic imports

3. **Categorize Dependencies**

   **Never Remove (Build-Critical):**
   - `vite`, `next`, `webpack`, `rollup`, `esbuild`, `parcel`
   - `typescript`, `@types/*` packages in use
   - `tailwindcss`, `postcss`, `autoprefixer`
   - `eslint`, `prettier`, `stylelint`
   
   **Safe to Check (Potential Candidates):**
   - UI libraries not imported
   - Utilities not used
   - Old dependencies from migrated features
   
   **Never Remove (Special Cases):**
   - `peerDependencies` of used packages
   - Side-effect packages (analytics, monitoring, polyfills)
   - Packages referenced in config files only
   - Packages used in package.json scripts
   - Dynamically imported packages

**Output:** Complete inventory of unused items

```markdown
## Unused Code Found

### Unused Imports (52 instances)
- `src/components/Dashboard.tsx`: unused `formatDate` from date-fns
- `src/utils/helpers.ts`: unused `debounce` from lodash-es
- ...

### Unused Variables (23 instances)
- `src/hooks/useAuth.ts:45`: `const retryCount` never read
- ...

### Unused Functions (14 instances)
- `src/utils/legacy.ts:120`: `function oldFormatter()` never called
- ...

### Unused Components (8 instances)
- `src/components/legacy/OldModal.tsx`: not imported anywhere
- ...

### Unused Types (17 instances)
- `src/types/deprecated.ts`: `interface OldUserType` not used
- ...

## Unused Dependencies Found

### Confirmed Unused (3)
- `moment` (v2.29.4) - replaced by date-fns, no usage found
- `classnames` (v2.3.1) - replaced by clsx, no usage found
- `axios` (v1.4.0) - replaced by fetch API, no usage found

### Possibly Unused (2 - needs verification)
- `react-query` (v3.39.3) - found 2 potential dynamic imports
- `uuid` (v9.0.0) - only found in test files

### Keep (Runtime/Config)
- `react` (v18.2.0) - core dependency
- `vite` (v5.0.0) - build tool
- `tailwindcss` (v3.4.0) - used in config
```

### Phase 2: Safety Assessment

**Objective:** Determine what's safe to remove vs. risky.

#### Step 2A: Code Safety Check

For each unused item:

1. **Check if Exported**
   ```typescript
   // ❌ RISKY - Exported function
   export function unusedHelper() { /* ... */ }
   // Verify: Search entire codebase for imports of this function
   
   // ✅ SAFE - Not exported
   function unusedHelper() { /* ... */ }
   ```

2. **Check for Side Effects**
   ```typescript
   // ❌ RISKY - Side effect import
   import '@/polyfills/array-flat' // Keeps for side effects!
   
   // ✅ SAFE - Pure import
   import { formatDate } from 'date-fns' // Can remove if unused
   ```

3. **Check for Type-Only Usage**
   ```typescript
   // ❌ RISKY - Used in type position
   import { User } from './types' // Used as: const user: User
   
   // ✅ SAFE - Truly unused
   import { Admin } from './types' // Not used at all
   ```

4. **Check Component Usage in Routes**
   ```typescript
   // ❌ RISKY - Component used in route config
   const routes = [
     { path: '/admin', component: AdminPanel }
   ]
   // Even if AdminPanel import looks unused, it's used!
   
   // ✅ SAFE - Component not in routes
   import { OldDashboard } from './legacy' // Truly unused
   ```

#### Step 2B: Dependency Safety Check

For each unused dependency:

1. **Check Config Files**
   - `vite.config.ts` - plugins, optimizeDeps
   - `tsconfig.json` - types, paths
   - `.eslintrc.js` - plugins, extends
   - `postcss.config.js` - plugins
   - `tailwind.config.js` - plugins, theme

2. **Check Package Scripts**
   - `package.json` scripts section
   - Any CLI tools used directly

3. **Check Peer Dependencies**
   ```bash
   # Check what depends on this package
   npm ls package-name
   ```

4. **Check for Dynamic Imports**
   ```typescript
   // Hard to detect statically
   const module = await import(`./modules/${name}`)
   ```

**Safety Categories:**

```markdown
## Safety Assessment

### ✅ SAFE TO REMOVE (78 items)
**Code:**
- 45 unused imports (all verified not used)
- 18 unused variables (all local, not exported)
- 10 unused functions (not exported, not called)
- 5 unused types (not referenced anywhere)

**Dependencies:**
- `moment` - completely replaced, zero usage
- `classnames` - completely replaced, zero usage

### ⚠️ RISKY - NEEDS VERIFICATION (12 items)
**Code:**
- `utils/formatters.ts:45` - exported function, may be used by external projects
- `components/Analytics.tsx` - side-effect component, may be loaded dynamically

**Dependencies:**
- `react-query` - possible dynamic imports need manual check
- `uuid` - found in test files, verify test utilities

### 🔒 KEEP - DO NOT REMOVE (32 items)
**Build Tools:**
- `vite`, `typescript`, `tailwindcss` (build-critical)

**Config Dependencies:**
- `@vitejs/plugin-react` (used in vite.config)
- `eslint-plugin-react` (used in .eslintrc)

**Peer Dependencies:**
- `react-dom` (peer of react)
```

### Phase 3: Safe Removal

**Objective:** Remove confirmed safe items systematically.

#### Step 3A: Remove Unused Code

**Order of Removal:**
1. Unused imports (safest)
2. Unused variables
3. Unused functions (not exported)
4. Unused components
5. Unused types
6. Entire unused files (last)

**For Each File:**

1. **Remove Unused Imports**
   ```typescript
   // ❌ BEFORE
   import { useState, useEffect } from 'react' // useEffect unused
   import { format } from 'date-fns' // format unused
   import { debounce } from 'lodash-es' // debounce unused
   
   // ✅ AFTER
   import { useState } from 'react'
   ```

2. **Remove Unused Variables**
   ```typescript
   // ❌ BEFORE
   function Component() {
     const [count, setCount] = useState(0) // count never used
     const unused = 123 // never used
     return <button onClick={() => setCount(c => c + 1)}>Click</button>
   }
   
   // ✅ AFTER
   function Component() {
     const [, setCount] = useState(0)
     return <button onClick={() => setCount(c => c + 1)}>Click</button>
   }
   ```

3. **Remove Unused Functions**
   ```typescript
   // ❌ BEFORE
   function oldFormatter(data: Data) { /* ... */ } // never called
   
   export function activeFunction() { /* ... */ } // keep if exported
   
   // ✅ AFTER
   export function activeFunction() { /* ... */ }
   ```

4. **Remove Unused Components**
   ```typescript
   // ❌ BEFORE - components/legacy/OldModal.tsx exists but unused
   
   // ✅ AFTER - File deleted, verified no imports
   ```

5. **Remove Unused Types**
   ```typescript
   // ❌ BEFORE
   interface OldUser { /* ... */ } // not used
   interface User { /* ... */ } // used
   
   // ✅ AFTER
   interface User { /* ... */ }
   ```

#### Step 3B: Remove Unused Dependencies

1. **Update package.json**
   ```json
   // ❌ BEFORE
   {
     "dependencies": {
       "moment": "^2.29.4",
       "react": "^18.2.0",
       "classnames": "^2.3.1"
     }
   }
   
   // ✅ AFTER
   {
     "dependencies": {
       "react": "^18.2.0"
     }
   }
   ```

2. **Run Install**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Update Lock File**
   - `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock` updated automatically

**Output:** Changes applied

```markdown
## Removal Complete

### Code Removed
- Removed 45 unused imports across 23 files
- Removed 18 unused variables
- Removed 10 unused functions
- Deleted 5 unused component files
- Removed 8 unused type definitions

### Dependencies Removed
- `moment@2.29.4` - Replaced by date-fns
- `classnames@2.3.1` - Replaced by clsx
- `axios@1.4.0` - Replaced by fetch API

**Bundle Size Impact:**
- Before: 2.4 MB
- After: 1.8 MB
- Savings: 600 KB (25% reduction)
```

### Phase 4: Verification

**Objective:** Ensure no functionality was broken.

#### Step 4A: TypeScript Verification

```bash
# Verify no new type errors
npx tsc --noEmit

# Expected: No errors
```

**Common Issues:**
- Type imports removed but still needed
- Interface removed but referenced elsewhere
- Type-only exports removed

**Fix:** Restore any accidentally removed types

#### Step 4B: Build Verification

```bash
# Build the project
npm run build

# Expected: Build succeeds
```

**Common Issues:**
- Missing dependency error
- Import resolution errors
- Config file referencing removed package

**Fix:** Restore build-critical dependencies

#### Step 4C: Test Verification

```bash
# Run all tests
npm run test

# Run type checking
npm run type-check

# Run linting
npm run lint
```

**Expected:** All tests pass, no new errors

**Common Issues:**
- Test utilities removed
- Mock dependencies removed
- Test-only imports removed

**Fix:** Restore test-related code/dependencies

#### Step 4D: Runtime Verification

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Manual Testing**
   - Navigate through all major routes
   - Test key user flows
   - Check console for errors
   - Verify no runtime errors

3. **Check for Dynamic Import Issues**
   - Test lazy-loaded routes
   - Test conditional features
   - Verify all modals/dialogs open

**Output:** Verification report

```markdown
## Verification Results

✅ **TypeScript:** No type errors
✅ **Build:** Production build successful
✅ **Tests:** All 247 tests passing
✅ **Runtime:** No console errors
✅ **Manual Testing:** All flows working

### Metrics
- **Bundle size:** Reduced by 600 KB (25%)
- **Dependencies:** Reduced from 82 to 79
- **Code files:** Deleted 5 unused components
- **LOC removed:** ~1,200 lines

### Issues Found
None - all verifications passed
```

---

## Safety Rules (Non-Negotiable)

### Never Remove

**Code:**
- ❌ Exported functions/components used by other projects
- ❌ Side-effect imports (polyfills, global styles)
- ❌ Code referenced in route configurations
- ❌ Types used in type positions
- ❌ Public API functions

**Dependencies:**
- ❌ Build tools (vite, webpack, typescript, etc.)
- ❌ Linters/formatters (eslint, prettier, stylelint)
- ❌ CSS frameworks (tailwindcss, postcss, autoprefixer)
- ❌ Peer dependencies of used packages
- ❌ Config-only dependencies
- ❌ Dependencies in package.json scripts
- ❌ Side-effect packages (analytics, monitoring)
- ❌ Dynamically imported packages

### Always Verify

**Before Removing Code:**
- [ ] Not exported from file
- [ ] Not used in type positions
- [ ] Not referenced in configs
- [ ] Not loaded dynamically

**Before Removing Dependencies:**
- [ ] Zero imports in codebase
- [ ] Not in config files
- [ ] Not in package.json scripts
- [ ] Not a peer dependency
- [ ] Not dynamically imported

---

## Common Patterns

See [Cleanup Patterns Reference](./references/cleanup-patterns.md) for:
- Safe import removal patterns
- Unused variable identification
- Dependency verification commands
- Dynamic import detection

## Troubleshooting Guide

See [Troubleshooting Reference](./references/troubleshooting.md) for:
- "Cannot find module" errors
- Type errors after removal
- Build failures
- Runtime errors

---

## Quality Checklist

Before completing cleanup:

**Code Cleanup:**
- [ ] All unused imports removed
- [ ] Unused variables removed (except `_` prefixed)
- [ ] Unused functions removed (non-exported only)
- [ ] Unused components deleted
- [ ] Unused types removed
- [ ] TypeScript compiles without errors
- [ ] ESLint has no unused variable warnings

**Dependency Cleanup:**
- [ ] All truly unused dependencies removed
- [ ] Build-critical dependencies kept
- [ ] Config dependencies kept
- [ ] Peer dependencies kept
- [ ] package-lock.json updated
- [ ] Build succeeds
- [ ] Tests pass

**Verification:**
- [ ] TypeScript: ✅ No errors
- [ ] Build: ✅ Successful
- [ ] Tests: ✅ All passing
- [ ] Runtime: ✅ No console errors
- [ ] Manual testing: ✅ Key flows work

---

## Success Metrics

**Code Quality:**
- ✅ ESLint warnings reduced
- ✅ Codebase size reduced
- ✅ Maintainability improved
- ✅ No functionality broken

**Build Performance:**
- ✅ node_modules size reduced
- ✅ Bundle size reduced
- ✅ Build time improved
- ✅ Install time improved

**Maintainability:**
- ✅ Fewer dependencies to upgrade
- ✅ Cleaner import statements
- ✅ Less dead code to navigate
- ✅ Improved code clarity

---

## Example Invocation

```
/cleanup-unused src/components/Dashboard.tsx
/cleanup-unused all dependencies
/cleanup-unused complete project scan
```

---

## Rollback Procedure

If issues occur after cleanup:

1. **Immediate Rollback**
   ```bash
   git checkout package.json package-lock.json
   npm install
   ```

2. **Partial Rollback**
   - Restore specific removed files from git history
   - Reinstall specific removed dependencies

3. **Investigate**
   - Review what broke
   - Identify the removed item causing the issue
   - Restore only that item

4. **Update Checklist**
   - Document what shouldn't have been removed
   - Add to "Never Remove" list
   - Update safety checks

---

## Related Tools

**Static Analysis:**
- `depcheck` - Find unused dependencies
- `ts-prune` - Find unused exports
- `eslint` - Find unused code
- `tsc` - TypeScript errors

**Bundle Analysis:**
- `vite-bundle-visualizer` - Visualize bundle content
- `webpack-bundle-analyzer` - For webpack projects
- `source-map-explorer` - Analyze source maps

---

**Remember:** When in doubt, DON'T remove. It's better to leave unused code than to break functionality. Always verify thoroughly before removing exported items or dependencies.
