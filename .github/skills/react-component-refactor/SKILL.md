---
name: react-component-refactor
description: 'Refactor complex React components into smaller, reusable components. Use when: component is too large (>300 lines), has multiple responsibilities, difficult to test, has nested JSX, duplicate logic, or poor performance. Analyzes component structure, identifies extraction opportunities, creates sub-components, and verifies functionality.'
argument-hint: 'Path to complex React component to refactor'
user-invocable: true
---

# React Component Refactoring

A systematic workflow for breaking down complex React components into smaller, more maintainable, and reusable pieces.

## When to Use This Skill

### Complexity Indicators

Use this skill when a React component exhibits any of these signs:

**Size & Structure:**
- Over 300 lines of code
- More than 3 levels of JSX nesting
- Multiple return statements with duplicate JSX
- Long files that require excessive scrolling

**Responsibility:**
- Handles multiple concerns (data fetching + rendering + business logic)
- Mixes presentation and container logic
- Has tightly coupled UI and state management

**Maintainability:**
- Difficult to understand without extensive comments
- Hard to test in isolation
- Changes in one part break unrelated parts
- Team members avoid touching it

**Performance:**
- Re-renders too frequently
- Could benefit from React.memo but is too complex
- Expensive computations not isolated

**Reusability:**
- Contains patterns used elsewhere in the codebase
- Has UI elements that could be shared
- Business logic that could be extracted

## Refactoring Strategy

### Component Extraction Patterns

#### 1. Presentational Components

Extract pure UI components that only receive props and render:

```tsx
// Before: Inline card rendering
function Dashboard() {
  const [users, setUsers] = useState([])
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id} className="card">
          <img src={user.avatar} alt={user.name} />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => editUser(user.id)}>Edit</button>
        </div>
      ))}
    </div>
  )
}

// After: Extracted presentational component
interface UserCardProps {
  user: User
  onEdit: (id: string) => void
}

function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
}

function Dashboard() {
  const [users, setUsers] = useState([])
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} onEdit={editUser} />
      ))}
    </div>
  )
}
```

#### 2. Container Components

Extract data fetching and state management logic:

```tsx
// Before: Mixed concerns
function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchUser().then(setUser).finally(() => setLoading(false))
  }, [])
  
  if (loading) return <Spinner />
  
  return (
    <div>
      <ProfileHeader user={user} />
      <ProfileBody user={user} />
    </div>
  )
}

// After: Extracted container component
function UserProfileContainer() {
  const { user, loading, error } = useFetch<User>('/api/user')
  
  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  
  return <UserProfile user={user} />
}

function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <ProfileHeader user={user} />
      <ProfileBody user={user} />
    </div>
  )
}
```

#### 3. Custom Hooks

Extract stateful logic and side effects:

```tsx
// Before: Inline state and effects
function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (!query) return
    
    setLoading(true)
    searchAPI(query)
      .then(setResults)
      .finally(() => setLoading(false))
  }, [query])
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {loading ? <Spinner /> : <ResultsList results={results} />}
    </div>
  )
}

// After: Extracted custom hook
function useSearch(query: string) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }
    
    setLoading(true)
    searchAPI(query)
      .then(setResults)
      .finally(() => setLoading(false))
  }, [query])
  
  return { results, loading }
}

function SearchPage() {
  const [query, setQuery] = useState('')
  const { results, loading } = useSearch(query)
  
  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      {loading ? <Spinner /> : <ResultsList results={results} />}
    </div>
  )
}
```

#### 4. Utility Components

Extract reusable UI patterns:

```tsx
// Before: Duplicate conditional rendering
function UserList() {
  if (loading) return <div className="spinner"><Spinner /></div>
  if (error) return <div className="error">{error.message}</div>
  if (users.length === 0) return <div className="empty">No users found</div>
  return <ul>{/* users */}</ul>
}

function ProductList() {
  if (loading) return <div className="spinner"><Spinner /></div>
  if (error) return <div className="error">{error.message}</div>
  if (products.length === 0) return <div className="empty">No products found</div>
  return <ul>{/* products */}</ul>
}

// After: Extracted utility component
interface DataStateProps<T> {
  data: T[]
  loading: boolean
  error: Error | null
  emptyMessage: string
  children: (data: T[]) => React.ReactNode
}

function DataState<T>({ data, loading, error, emptyMessage, children }: DataStateProps<T>) {
  if (loading) return <div className="spinner"><Spinner /></div>
  if (error) return <div className="error">{error.message}</div>
  if (data.length === 0) return <div className="empty">{emptyMessage}</div>
  return <>{children(data)}</>
}

function UserList() {
  return (
    <DataState
      data={users}
      loading={loading}
      error={error}
      emptyMessage="No users found"
    >
      {users => <ul>{users.map(/* ... */)}</ul>}
    </DataState>
  )
}
```

## Step-by-Step Refactoring Procedure

### Phase 1: Analysis

#### 1.1 Read the Component

Read the entire component file to understand:
- What the component does (its primary responsibility)
- How many different concerns it handles
- What state it manages
- What side effects it has
- What parts of the JSX are repeated

#### 1.2 Identify Extraction Candidates

Look for:

**Visual Sections** - Self-contained UI blocks:
```tsx
// Header, sidebar, footer, card, modal, form sections
<div className="header">
  {/* 20+ lines of header JSX */}
</div>
```

**Repeated Patterns** - Similar JSX structures:
```tsx
{items.map(item => (
  <div key={item.id}>
    {/* Complex repeated structure */}
  </div>
))}
```

**Conditional Blocks** - Different UI for different states:
```tsx
{loading && <Spinner />}
{error && <ErrorMessage />}
{!data && <EmptyState />}
{data && <DataDisplay />}
```

**Event Handlers** - Business logic functions:
```tsx
const handleSubmit = async (data) => {
  // 20+ lines of logic
}
```

**Computed Values** - Derived state or transforms:
```tsx
const filteredItems = items
  .filter(/* ... */)
  .map(/* ... */)
  .sort(/* ... */)
```

#### 1.3 Map Dependencies

For each extraction candidate, identify:
- Props it needs
- State it accesses
- Functions it calls
- Context it consumes

### Phase 2: Planning

#### 2.1 Prioritize Extractions

Start with extractions that have:
1. **Fewest dependencies** - Easy wins that don't touch much state
2. **Highest reusability** - Components used in multiple places
3. **Clearest boundaries** - Well-defined responsibility
4. **Biggest impact** - Largest reduction in parent complexity

#### 2.2 Design Component APIs

For each component to extract, define:

```typescript
// Component interface
interface ComponentProps {
  // Required props
  requiredProp: Type
  
  // Optional props with defaults
  optionalProp?: Type
  
  // Callbacks
  onAction?: (data: Data) => void
  
  // Children or render props
  children?: React.ReactNode
}

// Export what others need
export type { ComponentProps }
export { Component }
```

#### 2.3 Plan File Organization

Decide on structure:

**Option 1: Co-located** (recommended for tightly coupled components)
```
UserProfile/
  UserProfile.tsx         # Main component
  UserProfileHeader.tsx   # Sub-component
  UserProfileBody.tsx     # Sub-component
  useUserData.ts         # Custom hook
  index.ts               # Exports
```

**Option 2: Shared** (for reusable components)
```
components/
  shared/
    Card.tsx
    DataState.tsx
  UserProfile.tsx
hooks/
  useUserData.ts
```

### Phase 3: Implementation

#### 3.1 Extract in Order

Follow this sequence:

1. **Extract hooks first** - Remove stateful logic
2. **Extract utilities** - Remove helper functions
3. **Extract presentational components** - Bottom-up (children first)
4. **Extract container logic** - Last, once children are done

#### 3.2 Create New Component Files

For each extraction:

**Step 1: Create the file**
```bash
# In terminal or using file creation
touch UserCard.tsx
```

**Step 2: Define the interface**
```tsx
// UserCard.tsx
interface UserCardProps {
  user: User
  onEdit: (id: string) => void
  showActions?: boolean
}
```

**Step 3: Copy and adapt JSX**
```tsx
export function UserCard({ user, onEdit, showActions = true }: UserCardProps) {
  return (
    <div className="card">
      {/* Copied and adapted JSX */}
    </div>
  )
}
```

**Step 4: Export from index**
```tsx
// index.ts
export { UserCard } from './UserCard'
export type { UserCardProps } from './UserCard'
```

#### 3.3 Update Parent Component

**Step 1: Import extracted components**
```tsx
import { UserCard } from './UserCard'
import { useUserData } from '@/hooks/useUserData'
```

**Step 2: Replace inline code with component**
```tsx
// Before
<div className="card">
  {/* 30 lines */}
</div>

// After
<UserCard user={user} onEdit={handleEdit} />
```

**Step 3: Remove unused code**
- Delete extracted JSX
- Remove unused state
- Remove unused functions
- Clean up imports

### Phase 4: Verification

#### 4.1 Type Safety Check
```bash
# Verify TypeScript compiles
tsc --noEmit
```

#### 4.2 Functionality Check

Test that:
- [ ] Component renders correctly
- [ ] All interactions work (buttons, inputs, etc.)
- [ ] State updates properly
- [ ] Side effects still trigger
- [ ] Error states still display
- [ ] Loading states still work

#### 4.3 Performance Check

Verify:
- [ ] No unnecessary re-renders introduced
- [ ] Memoization still effective where needed
- [ ] No performance regressions

#### 4.4 Code Quality Check

Ensure:
- [ ] All props have TypeScript types
- [ ] No ESLint/React warnings
- [ ] Props are documented (JSDoc if needed)
- [ ] Component has clear single responsibility
- [ ] Naming is clear and consistent

### Phase 5: Refinement

#### 5.1 Optimize Further

After successful extraction:

**Add React.memo if needed:**
```tsx
export const UserCard = memo(function UserCard({ user, onEdit }: UserCardProps) {
  // Component implementation
})
```

**Extract more if still complex:**
- If extracted component >150 lines, consider further extraction
- If multiple responsibilities remain, extract more

**Improve prop APIs:**
```tsx
// Before: Passing too many individual props
<Header title={title} subtitle={subtitle} icon={icon} showBadge={showBadge} />

// After: Group related props
<Header metadata={{ title, subtitle, icon }} showBadge={showBadge} />
```

#### 5.2 Add Documentation

Add JSDoc comments for exported components:
```tsx
/**
 * Displays user information in a card layout.
 * 
 * @param user - The user object to display
 * @param onEdit - Callback when edit button is clicked
 * @param showActions - Whether to show action buttons (default: true)
 */
export function UserCard({ user, onEdit, showActions = true }: UserCardProps) {
  // ...
}
```

## Decision Tree

### When to Extract a Sub-Component?

```
Is this section:
├─ Used in multiple places? → YES → Extract as shared component
├─ Self-contained UI block? → YES → Extract as presentational component
├─ Has complex logic? → YES → Extract logic to custom hook
├─ Over 50 lines of JSX? → YES → Extract as sub-component
└─ Hurts readability? → YES → Extract as sub-component
```

### What to Name It?

```
Component purpose:
├─ Displays data? → [Entity]Display, [Entity]Card, [Entity]Item
├─ Form for editing? → [Entity]Form, [Entity]Editor
├─ Lists items? → [Entity]List, [Entity]Grid
├─ Contains logic? → [Entity]Container, [Entity]Provider
├─ Wraps children? → [Feature]Wrapper, [Feature]Layout
└─ Handles state? → use[Feature], use[Entity]State (custom hook)
```

### Where to Place It?

```
Component is:
├─ Tightly coupled to parent? → Co-locate in same folder
├─ Used across features? → components/shared/ or components/ui/
├─ Generic utility? → components/common/
└─ Domain-specific? → components/[domain]/
```

## Common Patterns

### Pattern 1: Split Form Sections

```tsx
// Before: Monolithic form
function UserForm() {
  return (
    <form>
      {/* 200+ lines of form fields */}
    </form>
  )
}

// After: Sectioned form
function UserForm() {
  return (
    <form>
      <PersonalInfoSection />
      <AddressSection />
      <PreferencesSection />
    </form>
  )
}
```

### Pattern 2: Separate Data from Presentation

```tsx
// Before: Mixed data and UI
function ProductCard() {
  const [product, setProduct] = useState(null)
  useEffect(() => { /* fetch */ }, [])
  
  return <div>{/* render */}</div>
}

// After: Separated concerns
function ProductCardContainer({ productId }: { productId: string }) {
  const { product, loading, error } = useProduct(productId)
  
  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  
  return <ProductCard product={product} />
}

function ProductCard({ product }: { product: Product }) {
  return <div>{/* render */}</div>
}
```

### Pattern 3: Extract Layout Components

```tsx
// Before: Inline layout
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        {/* sidebar content */}
      </div>
      <div className="main">
        {/* main content */}
      </div>
    </div>
  )
}

// After: Layout component
function DashboardLayout({ 
  sidebar, 
  main 
}: { 
  sidebar: React.ReactNode
  main: React.ReactNode 
}) {
  return (
    <div className="dashboard">
      <div className="sidebar">{sidebar}</div>
      <div className="main">{main}</div>
    </div>
  )
}

function Dashboard() {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      main={<MainContent />}
    />
  )
}
```

## Quality Metrics

### Before Refactoring

Measure baseline:
- Component line count
- Number of useState calls
- Number of useEffect calls
- Cyclomatic complexity
- JSX nesting depth

### After Refactoring

Target improvements:
- **Parent component**: <200 lines
- **Sub-components**: <100 lines each
- **Hooks per component**: <5
- **Props per component**: <8
- **JSX nesting depth**: <4 levels

### Success Criteria

Refactoring is successful if:
- [ ] Parent component is <50% of original size
- [ ] Each component has single, clear responsibility
- [ ] Components are independently testable
- [ ] No duplicate code remains
- [ ] Type safety maintained
- [ ] All functionality preserved
- [ ] Performance not degraded

## Output Format

After completing refactoring, provide:

### 📊 Refactoring Summary

**Original Component**: [ComponentName.tsx]
- Lines of code: [original count]
- Components: 1
- Responsibilities: [list them]

**After Refactoring**:
- Lines of code: [new parent count] (−X% reduction)
- Components: [count]
  - [ParentComponent.tsx]: [lines] - [responsibility]
  - [SubComponent1.tsx]: [lines] - [responsibility]
  - [SubComponent2.tsx]: [lines] - [responsibility]
  - [hooks/useCustomHook.ts]: [lines] - [responsibility]

### 🎯 Extracted Components

#### [SubComponent1]
**Purpose**: [What it does]
**Location**: [File path]
**Props**: [List key props]
**Reusability**: [Used in X places / Highly reusable / Component-specific]

#### [SubComponent2]
**Purpose**: [What it does]
**Location**: [File path]
**Props**: [List key props]
**Reusability**: [Assessment]

### ✅ Verification Results

- [x] TypeScript compiles without errors
- [x] All functionality preserved
- [x] No new React warnings
- [x] Performance maintained
- [x] Code quality improved

### 📝 Testing Recommendations

1. Test [specific scenario]
2. Verify [specific functionality]
3. Check [edge case]

### 🔄 Further Refactoring Opportunities

- [Optional improvement 1]
- [Optional improvement 2]

## Tips and Best Practices

### DO:
- ✅ Start with smallest, easiest extractions first
- ✅ Extract one component at a time and verify
- ✅ Keep related components close in folder structure
- ✅ Use TypeScript interfaces for all props
- ✅ Test after each extraction
- ✅ Preserve existing functionality exactly
- ✅ Add React.memo only when needed for performance

### DON'T:
- ❌ Extract too many components at once (hard to debug)
- ❌ Create components that are too small (<20 lines, single div)
- ❌ Over-engineer with unnecessary abstraction
- ❌ Break working functionality
- ❌ Create components with too many props (>10)
- ❌ Extract before understanding the full component
- ❌ Forget to clean up unused code in parent

## Common Pitfalls

### Pitfall 1: Premature Extraction

**Problem**: Extracting before understanding dependencies
**Solution**: Complete Phase 1 analysis thoroughly

### Pitfall 2: Over-Splitting

**Problem**: Too many tiny components (analysis paralysis)
**Solution**: Only extract if >50 lines or clear reusability

### Pitfall 3: Props Explosion

**Problem**: New component needs 15 props
**Solution**: Component may be wrong boundary; group related props into objects

### Pitfall 4: Breaking Memoization

**Problem**: Extracted component receives new object/function every render
**Solution**: Use useCallback for functions, useMemo for objects passed to memoized children

### Pitfall 5: Lost Context

**Problem**: Extracted component can't access Context
**Solution**: Pass Context values as props or keep component within Provider

## When NOT to Refactor

Skip refactoring if:
- Component is <150 lines and has single responsibility
- Component is simple and easy to understand
- Team is under tight deadline (technical debt acceptable)
- Component is rarely changed or viewed
- Extraction would require complex prop drilling
- Component is scheduled for deletion/rewrite

## Summary

This skill provides a systematic approach to refactoring complex React components:

1. **Analyze** the component to understand its structure and identify extraction opportunities
2. **Plan** what to extract, how to structure it, and in what order
3. **Implement** extractions one at a time, starting with hooks and moving to components
4. **Verify** that functionality is preserved and quality improved
5. **Refine** with further optimizations and documentation

The goal is maintainable, testable, reusable components with clear responsibilities.
