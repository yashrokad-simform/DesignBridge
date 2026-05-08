# Component Extraction Templates

Quick-start templates for common extraction patterns.

## Presentational Component Template

```tsx
// [ComponentName].tsx
interface [ComponentName]Props {
  // Define props
  data: DataType
  onAction?: (id: string) => void
}

/**
 * [Brief description of what this component displays/does]
 * 
 * @param data - [Description]
 * @param onAction - [Description]
 */
export function [ComponentName]({ 
  data, 
  onAction 
}: [ComponentName]Props) {
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

## Container Component Template

```tsx
// [FeatureName]Container.tsx
interface [FeatureName]ContainerProps {
  id: string
  // Additional props
}

/**
 * Container component that manages data fetching and state for [FeatureName]
 */
export function [FeatureName]Container({ 
  id 
}: [FeatureName]ContainerProps) {
  const { data, loading, error } = useFetch<DataType>(`/api/endpoint/${id}`)
  
  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  if (!data) return <EmptyState />
  
  return <[FeatureName] data={data} />
}

// [FeatureName].tsx - Pure presentational component
interface [FeatureName]Props {
  data: DataType
}

export function [FeatureName]({ data }: [FeatureName]Props) {
  return (
    <div>
      {/* Render data */}
    </div>
  )
}
```

## Custom Hook Template

```tsx
// use[FeatureName].ts
interface Use[FeatureName]Options {
  // Options
  enabled?: boolean
}

interface Use[FeatureName]Return {
  data: DataType | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Custom hook for [description of logic]
 * 
 * @param dependency - [Description]
 * @param options - Optional configuration
 * @returns Object containing data, loading, error states and refetch function
 */
export function use[FeatureName](
  dependency: string,
  options: Use[FeatureName]Options = {}
): Use[FeatureName]Return {
  const [data, setData] = useState<DataType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const refetch = useCallback(() => {
    setLoading(true)
    setError(null)
    
    fetchData(dependency)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [dependency])
  
  useEffect(() => {
    if (options.enabled !== false) {
      refetch()
    }
  }, [refetch, options.enabled])
  
  return { data, loading, error, refetch }
}
```

## Layout Component Template

```tsx
// [LayoutName]Layout.tsx
interface [LayoutName]LayoutProps {
  children?: React.ReactNode
  header?: React.ReactNode
  sidebar?: React.ReactNode
  footer?: React.ReactNode
}

/**
 * Layout component providing consistent structure for [section/feature]
 */
export function [LayoutName]Layout({
  children,
  header,
  sidebar,
  footer
}: [LayoutName]LayoutProps) {
  return (
    <div className="[layout-name]-layout">
      {header && (
        <header className="[layout-name]-header">
          {header}
        </header>
      )}
      
      <div className="[layout-name]-body">
        {sidebar && (
          <aside className="[layout-name]-sidebar">
            {sidebar}
          </aside>
        )}
        
        <main className="[layout-name]-main">
          {children}
        </main>
      </div>
      
      {footer && (
        <footer className="[layout-name]-footer">
          {footer}
        </footer>
      )}
    </div>
  )
}
```

## Compound Component Template

```tsx
// [ComponentName].tsx
interface [ComponentName]ContextType {
  // Shared state
  activeId: string | null
  setActiveId: (id: string | null) => void
}

const [ComponentName]Context = createContext<[ComponentName]ContextType | undefined>(undefined)

function use[ComponentName]Context() {
  const context = useContext([ComponentName]Context)
  if (!context) {
    throw new Error('Component must be used within [ComponentName]')
  }
  return context
}

// Root component
interface [ComponentName]Props {
  defaultActiveId?: string
  children: React.ReactNode
}

export function [ComponentName]({ 
  defaultActiveId, 
  children 
}: [ComponentName]Props) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId || null)
  
  return (
    <[ComponentName]Context.Provider value={{ activeId, setActiveId }}>
      <div className="[component-name]">
        {children}
      </div>
    </[ComponentName]Context.Provider>
  )
}

// Sub-component
interface [SubComponent]Props {
  id: string
  children: React.ReactNode
}

function [SubComponent]({ id, children }: [SubComponent]Props) {
  const { activeId, setActiveId } = use[ComponentName]Context()
  const isActive = activeId === id
  
  return (
    <div 
      className={isActive ? 'active' : ''}
      onClick={() => setActiveId(id)}
    >
      {children}
    </div>
  )
}

// Attach sub-components
[ComponentName].[SubComponent] = [SubComponent]
```

## Index File Template

```tsx
// index.ts
export { [ComponentName] } from './[ComponentName]'
export type { [ComponentName]Props } from './[ComponentName]'

// If there are sub-components
export { [SubComponentName] } from './[SubComponentName]'
export type { [SubComponentName]Props } from './[SubComponentName]'

// If there are hooks
export { use[HookName] } from './use[HookName]'
export type { Use[HookName]Return } from './use[HookName]'
```

## Usage

Replace placeholders:
- `[ComponentName]` - The actual component name (e.g., UserCard, ProductList)
- `[FeatureName]` - Feature or domain name (e.g., User, Product)
- `[DataType]` - The TypeScript type for data (e.g., User, Product[])
- `[LayoutName]` - Layout identifier (e.g., Dashboard, Settings)
- `[SubComponent]` - Sub-component name (e.g., Tab, Item)
- `[HookName]` - Custom hook name (e.g., Fetch, LocalStorage)
