# Troubleshooting Guide

Common issues encountered during unused code and dependency cleanup, with solutions.

## Build Errors

### Error: "Cannot find module 'package-name'"

**Symptoms:**
```
Error: Cannot find module 'react-query'
    at Function.Module._resolveFilename
```

**Cause:** Removed a dependency that's still being used somewhere

**Solution:**

1. **Restore the package:**
   ```bash
   npm install package-name
   ```

2. **Find where it's used:**
   ```bash
   # Search for imports
   rg "from ['\"]package-name['\"]"
   
   # Search for requires
   rg "require\(['\"]package-name['\"]"
   
   # Search config files
   rg "package-name" "*.config.*"
   ```

3. **Decide:**
   - If used: Keep the package
   - If not used: Remove the import and uninstall again

### Error: "Module not found: Error: Can't resolve './Component'"

**Symptoms:**
```
Module not found: Error: Can't resolve './OldModal'
```

**Cause:** Deleted a file that's still imported

**Solution:**

1. **Find all imports of deleted file:**
   ```bash
   rg "from ['\"].*OldModal"
   ```

2. **Either:**
   - Restore the file from git: `git checkout HEAD -- path/to/file.tsx`
   - Or remove all imports of it

3. **Re-run build** to verify

### Error: "Property 'X' does not exist on type 'Y'"

**Symptoms:**
```
Property 'user' does not exist on type 'Props'
```

**Cause:** Removed a type property that's still being used

**Solution:**

1. **Check what was removed:**
   ```bash
   git diff HEAD path/to/types.ts
   ```

2. **Restore the type definition:**
   ```typescript
   interface Props {
     user: User // Add back removed property
   }
   ```

3. **Or remove the usage** if it was truly unused

## TypeScript Errors

### Error: "Cannot find name 'ComponentName'"

**Symptoms:**
```typescript
Cannot find name 'Button'
```

**Cause:** Removed import but component still used

**Solution:**

1. **Add back the import:**
   ```typescript
   import { Button } from './components/Button'
   ```

2. **Or verify** if the component usage should also be removed

### Error: "'X' is declared but its value is never read"

**Symptoms:**
```typescript
'helper' is declared but its value is never read
```

**Cause:** Import exists but isn't used (good to remove!)

**Solution:**

```typescript
// ❌ BEFORE
import { helper } from './utils'

// ✅ AFTER - Remove it
// Import removed
```

This is not an error after cleanup - it's the goal!

### Error: "Type 'X' is not assignable to type 'Y'"

**Symptoms:**
```typescript
Type 'string' is not assignable to type 'User'
```

**Cause:** Removed type import that's still needed

**Solution:**

```typescript
// Add back the type import
import type { User } from './types'

const user: User = getUser()
```

## Runtime Errors

### Error: "X is not a function"

**Symptoms:**
```
TypeError: debounce is not a function
```

**Cause:** Removed import of function that's called at runtime

**Solution:**

1. **Find the call site:**
   ```bash
   rg "debounce\("
   ```

2. **Add back import:**
   ```typescript
   import { debounce } from 'lodash-es'
   ```

3. **Or replace** with alternative implementation

### Error: "Cannot read property 'X' of undefined"

**Symptoms:**
```
Cannot read property 'format' of undefined
```

**Cause:** Removed module import, now accessing undefined

**Solution:**

1. **Check what's undefined:**
   ```typescript
   console.log(dateUtils) // undefined - import was removed!
   ```

2. **Restore import:**
   ```typescript
   import * as dateUtils from './dateUtils'
   ```

### Error: Module not loaded / Lazy load failed

**Symptoms:**
```
ChunkLoadError: Loading chunk 5 failed
```

**Cause:** Removed component that's lazy-loaded

**Solution:**

1. **Find lazy imports:**
   ```bash
   rg "React.lazy|lazy\(" src/
   ```

2. **Check route configs:**
   ```bash
   rg "component:|element:" src/routes
   ```

3. **Restore component** or update route config

## Test Failures

### Error: "Test suite failed to run"

**Symptoms:**
```
Cannot find module 'test-utils' from 'Component.test.tsx'
```

**Cause:** Removed test utility or mock

**Solution:**

1. **Check test files:**
   ```bash
   rg "test-utils" "**/*.test.ts*"
   ```

2. **Restore test utilities:**
   - Test helpers should NOT be removed
   - Mock files should be kept
   - Test setup files are essential

3. **Verify test dependencies:**
   ```bash
   # Check if test packages were removed
   npm ls @testing-library/react
   ```

### Error: Tests pass but coverage drops

**Symptoms:**
- Tests pass ✅
- Coverage shows unused code still exists

**Cause:** Removed unused code that wasn't tested anyway (good!)

**Solution:**

This is expected and actually good - coverage reflects actual code now.

Update coverage thresholds if needed:
```javascript
// jest.config.js or vitest.config.ts
coverage: {
  branches: 80, // Adjust if needed
  functions: 80,
  lines: 80,
  statements: 80
}
```

## Dependency Issues

### Error: "Peer dependency not met"

**Symptoms:**
```
npm WARN react-dom@18.2.0 requires a peer of react@^18.2.0
but none is installed
```

**Cause:** Removed a package that's a peer of another

**Solution:**

```bash
# Reinstall the peer dependency
npm install react@^18.2.0
```

**Prevention:** Never remove packages with active peer relationships

### Error: "Could not resolve dependency"

**Symptoms:**
```
Could not resolve dependency:
npm ERR! peer @babel/core@"^7.0.0" from plugin
```

**Cause:** Removed peer dependency of a plugin

**Solution:**

1. **Check what needs it:**
   ```bash
   npm ls @babel/core
   ```

2. **Reinstall:**
   ```bash
   npm install @babel/core
   ```

### Symptom: Slow install after cleanup

**Cause:** Removed lockfile or made conflicting changes

**Solution:**

1. **Delete and regenerate lockfile:**
   ```bash
   rm package-lock.json
   npm install
   ```

2. **Or use fresh install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## Config Issues

### Error: "Unknown option in vite.config"

**Symptoms:**
```
Unknown option: 'optimizeDeps.include'
```

**Cause:** Removed plugin that provided this option

**Solution:**

1. **Check vite.config.ts:**
   ```typescript
   // Removed plugin but left its config
   export default defineConfig({
     optimizeDeps: {
       include: ['removed-package'] // ❌ Remove this
     }
   })
   ```

2. **Clean up config:**
   ```typescript
   export default defineConfig({
     // Config for removed plugins removed
   })
   ```

### Error: "Cannot find module in tsconfig paths"

**Symptoms:**
```
Cannot find module '@/components/Button'
```

**Cause:** Removed path mapping in tsconfig.json

**Solution:**

1. **Restore path mapping:**
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Ensure vite/webpack has matching config:**
   ```typescript
   // vite.config.ts
   resolve: {
     alias: {
       '@': path.resolve(__dirname, './src')
     }
   }
   ```

## Bundle Issues

### Symptom: Styles missing after cleanup

**Cause:** Removed side-effect CSS import

**Solution:**

```typescript
// ❌ Removed this
import './global.css'
import 'react-toastify/dist/ReactToastify.css'

// ✅ Restore side-effect imports
import './global.css'
import 'react-toastify/dist/ReactToastify.css'
```

**Rule:** Never remove imports with no named imports (side-effects only)

### Symptom: Larger bundle after cleanup

**Cause:** Tree-shaking now including more of remaining packages

**Explanation:** Sometimes removing small unused package causes larger chunks of remaining packages to be included. This is OK and expected.

**Solution:** Analyze with bundle visualizer to understand why:

```bash
# Visualize bundle
npm run build -- --analyze

# Or use vite-bundle-visualizer
npx vite-bundle-visualizer
```

## Prevention Strategies

### 1. Incremental Cleanup

```bash
# Make small commits after each phase
git add -A
git commit -m "chore: remove unused imports from components/"

git add -A
git commit -m "chore: remove unused utility functions"

# Easy to rollback specific changes
git revert HEAD~1
```

### 2. Pre-Cleanup Verification

```bash
# Before cleanup, ensure everything works
npm run type-check
npm run test
npm run build

# All should pass ✅
```

### 3. Automated Detection

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'error',
    'import/no-unused-modules': 'error'
  }
}
```

### 4. Use Git Stash for Risky Changes

```bash
# Try cleanup
... make changes ...

# Test it
npm run build

# If broken, restore
git stash

# If good, commit
git add -A && git commit -m "cleanup"
```

## Recovery Procedures

### Full Rollback

```bash
# Revert all changes
git checkout HEAD -- .
npm install

# Verify
npm run build
```

### Partial Rollback

```bash
# Restore specific file
git checkout HEAD -- src/components/Modal.tsx

# Restore specific dependency
npm install package-name@version

# Verify
npm run build
```

### Cherry-Pick Good Changes

```bash
# Create new branch from before cleanup
git checkout -b cleanup-redo HEAD~5

# Cherry-pick only safe commits
git cherry-pick abc123  # Safe import cleanup
git cherry-pick def456  # Safe variable cleanup

# Skip the problematic commits
```

## When to Stop Cleanup

Stop and reassess if:

- ❌ More than 3 build errors
- ❌ Tests failing unexpectedly  
- ❌ Runtime errors appearing
- ❌ Bundle size increasing significantly
- ❌ Peer dependency conflicts
- ❌ Team members report broken features

**Recommendation:** Rollback, analyze what went wrong, and retry with more careful verification.

## Getting Help

If stuck, check:

1. **Git diff:** What exactly changed?
   ```bash
   git diff HEAD
   ```

2. **Package diff:** What dependencies changed?
   ```bash
   git diff HEAD -- package.json
   ```

3. **Build output:** What's the exact error?
   ```bash
   npm run build 2>&1 | tee build.log
   ```

4. **Test output:** Which tests fail?
   ```bash
   npm run test 2>&1 | tee test.log
   ```

5. **Search codebase:** Where is X used?
   ```bash
   rg "search-term" --type ts --type tsx
   ```

---

Remember: **When in doubt, rollback and retry with smaller steps.**
