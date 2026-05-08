# Cleanup Patterns Reference

Common patterns for safely identifying and removing unused code and dependencies.

## Safe Import Removal Patterns

### Pattern 1: Remove Completely Unused Imports

```typescript
// ❌ BEFORE
import { useState, useEffect, useCallback } from 'react'
import { format, parse, isValid } from 'date-fns'
import { debounce } from 'lodash-es'

function Component() {
  const [state, setState] = useState(0) // Only useState used
  return <div>{state}</div>
}

// ✅ AFTER
import { useState } from 'react'

function Component() {
  const [state, setState] = useState(0)
  return <div>{state}</div>
}
```

**Detection:** ESLint rule `@typescript-eslint/no-unused-vars`

### Pattern 2: Keep Side-Effect Imports

```typescript
// ✅ KEEP - Side effects
import 'normalize.css'
import './global.css'
import '@/polyfills/array-flat'
import 'react-toastify/dist/ReactToastify.css'

// ❌ REMOVE - Pure imports not used
import { helper } from './utils' // if helper never used
```

**Rule:** Never remove imports with no named imports (side-effect only)

### Pattern 3: Type-Only Import Optimization

```typescript
// ❌ BEFORE
import { User } from './types' // Only used in type position

const user: User = getUser()

// ✅ AFTER
import type { User } from './types'

const user: User = getUser()
```

**Benefit:** Tree-shaking optimization, clearer intent

### Pattern 4: Namespace Import Cleanup

```typescript
// ❌ BEFORE
import * as utils from './utils' // Only uses 1 function

utils.formatDate(date)

// ✅ AFTER
import { formatDate } from './utils'

formatDate(date)
```

**Benefit:** Better tree-shaking, smaller bundle

## Unused Variable Patterns

### Pattern 1: Remove Unused Local Variables

```typescript
// ❌ BEFORE
function calculate(x: number, y: number) {
  const sum = x + y // never used
  const product = x * y
  return product
}

// ✅ AFTER
function calculate(x: number, y: number) {
  const product = x * y
  return product
}

// 🔥 BEST - Inline if simple
function calculate(x: number, y: number) {
  return x * y
}
```

### Pattern 2: Intentionally Unused Parameters

```typescript
// ❌ BEFORE - ESLint warning
function handler(event, context) { // context unused
  return event.body
}

// ✅ AFTER - Prefix with underscore
function handler(event, _context) {
  return event.body
}

// 🔥 BEST - Destructure only what's needed
const handler = ({ body }: Event) => body
```

### Pattern 3: Unused State Variables

```typescript
// ❌ BEFORE
function Component() {
  const [count, setCount] = useState(0) // count never read
  return <button onClick={() => setCount(c => c + 1)}>Click</button>
}

// ✅ AFTER
function Component() {
  const [, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>Click</button>
}

// 💡 CONSIDER - Do you need state at all?
// If count is never used, maybe this should just be a button click tracker
// that logs or sends analytics instead
```

### Pattern 4: Destructuring Cleanup

```typescript
// ❌ BEFORE
const { id, name, email, age, address } = user
// Only id and name used

console.log(id, name)

// ✅ AFTER
const { id, name } = user

console.log(id, name)
```

## Unused Function Patterns

### Pattern 1: Remove Non-Exported Functions

```typescript
// ❌ BEFORE
function helperA() { /* ... */ } // never called
function helperB() { /* ... */ } // called by helperC
function helperC() { /* ... */ } // exported

export { helperC }

// ✅ AFTER
function helperB() { /* ... */ }
function helperC() { /* ... */ }

export { helperC }
```

**Detection:** Search codebase for function name usage

### Pattern 2: Remove Duplicate Functions

```typescript
// ❌ BEFORE
function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}

function formatDateString(date: Date) { // duplicate logic
  return date.toISOString().split('T')[0]
}

// ✅ AFTER - Keep one, remove duplicate
function formatDate(date: Date) {
  return date.toISOString().split('T')[0]
}
```

### Pattern 3: Legacy Function Cleanup

```typescript
// ❌ BEFORE
// Old API - deprecated since v2.0
function oldFetch(url: string) { /* ... */ }

// New API
async function fetch(url: string) { /* ... */ }

export { fetch, oldFetch } // Still exported for compatibility

// ✅ AFTER - Remove after grace period
async function fetch(url: string) { /* ... */ }

export { fetch }
```

**Rule:** Verify no external projects depend on `oldFetch` before removing

## Unused Component Patterns

### Pattern 1: Remove Completely Unused Components

```typescript
// ❌ BEFORE - components/OldModal.tsx exists
export function OldModal() { /* ... */ }

// Not imported anywhere in codebase

// ✅ AFTER - File deleted
```

**Verification Steps:**
1. Search: `import.*OldModal`
2. Search: `from.*OldModal`
3. Check route configs
4. Check lazy imports

### Pattern 2: Component Consolidation

```typescript
// ❌ BEFORE - Two similar components
// components/PrimaryButton.tsx
export function PrimaryButton() { /* ... */ }

// components/ActionButton.tsx
export function ActionButton() { /* ... */ } // Same as PrimaryButton

// ✅ AFTER - Consolidate to one
// components/Button.tsx
export function Button({ variant = 'primary' }) { /* ... */ }
```

### Pattern 3: Remove Duplicate Components

```typescript
// ❌ BEFORE
// components/Modal.tsx
export function Modal() { /* ... */ }

// components/Dialog.tsx  
export function Dialog() { /* ... */ } // Does same thing as Modal

// ✅ AFTER - Keep one, migrate usages
// components/Modal.tsx
export function Modal() { /* ... */ }

// Migrate all Dialog usages to Modal, then delete Dialog.tsx
```

## Unused Type Patterns

### Pattern 1: Remove Unused Interfaces

```typescript
// ❌ BEFORE
interface OldUser { /* ... */ } // not used
interface User { id: number; name: string }

// ✅ AFTER
interface User { id: number; name: string }
```

### Pattern 2: Remove Redundant Type Aliases

```typescript
// ❌ BEFORE
type ID = number
type UserId = number // Redundant
type ProductId = number // Redundant

// ✅ AFTER - Remove redundant aliases
type ID = number
```

### Pattern 3: Inline Simple Types

```typescript
// ❌ BEFORE
type ButtonProps = { label: string } // Only used once

function Button(props: ButtonProps) { /* ... */ }

// ✅ AFTER - Inline if used once
function Button(props: { label: string }) { /* ... */ }

// 💡 OR use destructuring
function Button({ label }: { label: string }) { /* ... */ }
```

## Dependency Verification Commands

### Check Import Usage

```bash
# Search for all imports of a package
grep -r "from 'package-name'" src/
grep -r 'from "package-name"' src/

# Search for require usage
grep -r "require('package-name')" src/

# Search with ripgrep (faster)
rg "from ['\"]package-name['\"]" src/
```

### Check Config File Usage

```bash
# Check vite config
rg "package-name" vite.config.ts vite.config.js

# Check all config files
rg "package-name" "*.config.*"

# Check tsconfig
rg "package-name" tsconfig.json
```

### Check Package Scripts

```bash
# View all scripts
npm run

# Check if package is used in scripts
grep "package-name" package.json
```

### Use Automated Tools

```bash
# depcheck - Find unused dependencies
npx depcheck

# ts-prune - Find unused exports
npx ts-prune

# knip - Find unused files, exports, dependencies
npx knip
```

## Dynamic Import Detection

### Pattern 1: String Template Imports

```typescript
// Hard to detect statically
const moduleName = getModuleName()
const module = await import(`./modules/${moduleName}`)

// Search manually for import( with template strings
grep -r "import(\`" src/
grep -r "import(\${" src/
```

### Pattern 2: Conditional Imports

```typescript
// Easy to miss in static analysis
if (condition) {
  const { helper } = await import('./utils')
}

// Search for await import
grep -r "await import" src/
```

### Pattern 3: Legacy require()

```typescript
// Old CommonJS style
const module = require('package-name')

// Search for require calls
grep -r "require(" src/
```

## Safe Removal Checklist

Before removing any code:

- [ ] **Not exported** from file
- [ ] **Not imported** anywhere else
- [ ] **Not referenced** in type positions
- [ ] **Not in route configs** (React Router, Next.js, etc.)
- [ ] **Not dynamically imported**
- [ ] **Not used in JSX** as component
- [ ] **Not side-effect** import
- [ ] **Not in config files**

Before removing any dependency:

- [ ] **Zero imports** in entire codebase
- [ ] **Not in vite.config** or other build configs
- [ ] **Not in tsconfig.json** types array
- [ ] **Not in eslint config** plugins/extends
- [ ] **Not in postcss config** plugins
- [ ] **Not in package.json** scripts
- [ ] **Not a peer dependency** of used packages
- [ ] **Not dynamically imported**
- [ ] **Not side-effect** package (analytics, polyfills)
- [ ] **Not build-critical** (vite, typescript, etc.)

## Common False Positives

### False Positive 1: Route Components

```typescript
// Looks unused but is used in routes
import { AdminPanel } from './AdminPanel'

const routes = [
  { path: '/admin', component: AdminPanel }
]
// ❌ DON'T remove AdminPanel - it's used!
```

### False Positive 2: HOC Wrapped Components

```typescript
// Looks unused but is wrapped
function BaseComponent() { /* ... */ }

export default withAuth(BaseComponent)
// ❌ DON'T remove BaseComponent - it's used by HOC!
```

### False Positive 3: Re-exported Items

```typescript
// Looks unused in this file
export { Button } from './Button'
export { Modal } from './Modal'
// ❌ DON'T remove - these are re-exports!
```

### False Positive 4: Type-Only Usage

```typescript
// Looks unused but used in type
import { User } from './types'

const users: User[] = []
// ❌ DON'T remove - used in type position!
```

---

## Best Practices

1. **Start Small:** Remove unused imports first, then variables, then functions
2. **Verify Constantly:** Run `tsc --noEmit` and `npm run build` frequently
3. **Test After Each Phase:** Don't accumulate too many changes
4. **Use Git:** Commit after each successful cleanup phase
5. **Document Decisions:** Note why something was kept if unclear
6. **Prefer Type Imports:** Use `import type` for type-only imports
7. **Use Automation:** Let tools like ESLint and depcheck do the heavy lifting
8. **Manual Review:** Always manually verify automated suggestions
