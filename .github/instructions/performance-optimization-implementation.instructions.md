---
name: Performance Optimization Implementation
description: Implement high-performance React applications with memoization, re-render prevention, code splitting, memory leak prevention, and Core Web Vitals optimization
applyTo: '**/*.tsx, **/*.jsx, src/components/**, src/pages/**, src/hooks/**, src/routes/**'
---

Build performant React applications by optimizing re-renders, implementing proper memoization, code splitting routes, and preventing memory leaks.

## 🎯 Prevent Unnecessary Re-renders

Optimize component structure by isolating state and using memoization strategically.

**Implementation:**
```tsx
// ✅ Colocate state close to where it's used
function ProductCard({ product }: { product: Product }) {
  // State only affects this component
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
      {isExpanded && <p>{product.description}</p>}
    </div>
  );
}

// ✅ Isolate frequently changing state
function SearchPage() {
  return (
    <>
      <Header />
      <SearchInput /> {/* Search state isolated here */}
      <SearchResults /> {/* Gets results via context/query */}
      <Footer />
    </>
  );
}

function SearchInput() {
  // Local state doesn't affect siblings
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  return (
    <input 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products..."
    />
  );
}

// ✅ Use React.memo for pure presentational components
interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const Card = React.memo(function Card({ 
  title, 
  description, 
  onClick 
}: CardProps) {
  console.log('Card rendered:', title);
  
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
});

// ✅ Split components to prevent cascading re-renders
function UserDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div>
      {/* Navigation state doesn't affect content areas */}
      <Navigation selected={selectedTab} onSelect={setSelectedTab} />
      
      {/* Only active tab component renders */}
      {selectedTab === 'overview' && <OverviewTab />}
      {selectedTab === 'settings' && <SettingsTab />}
      {selectedTab === 'activity' && <ActivityTab />}
    </div>
  );
}

// ✅ Use composition to avoid prop drilling and re-renders
function Layout({ children }: { children: React.ReactNode }) {
  // Theme state doesn't cause children to re-render
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className={`layout theme-${theme}`}>
      <Header theme={theme} onThemeChange={setTheme} />
      {children} {/* Children render independently */}
      <Footer />
    </div>
  );
}

// ✅ Optimize context to prevent unnecessary re-renders
interface AuthContextValue {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Memoize the context value to prevent re-renders
  const value = useMemo<AuthContextValue>(() => ({
    user,
    login: async (credentials) => {
      const userData = await authenticate(credentials);
      setUser(userData);
    },
    logout: () => setUser(null),
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

## 💾 Memoize Heavy Computations

Use `useMemo` to cache expensive calculations and prevent redundant work.

**Implementation:**
```tsx
// ✅ Memoize filtering and sorting large datasets
function ProductList({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  const filteredAndSortedProducts = useMemo(() => {
    console.log('Filtering and sorting products...');
    
    // Filter
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.price - b.price;
    });
  }, [products, searchQuery, sortBy]);

  return (
    <div>
      <input 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
      <ul>
        {filteredAndSortedProducts.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

// ✅ Memoize complex transformations
function AnalyticsDashboard({ data }: { data: DataPoint[] }) {
  const chartData = useMemo(() => {
    console.log('Transforming data for chart...');
    
    return data.reduce((acc, point) => {
      const date = format(point.timestamp, 'yyyy-MM-dd');
      
      if (!acc[date]) {
        acc[date] = { date, total: 0, count: 0 };
      }
      
      acc[date].total += point.value;
      acc[date].count += 1;
      
      return acc;
    }, {} as Record<string, { date: string; total: number; count: number }>);
  }, [data]);

  const averages = useMemo(() => {
    return Object.values(chartData).map(day => ({
      date: day.date,
      average: day.total / day.count,
    }));
  }, [chartData]);

  return <LineChart data={averages} />;
}

// ✅ Memoize derived state calculations
function ShoppingCart({ items }: { items: CartItem[] }) {
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const tax = useMemo(() => {
    return subtotal * 0.08; // 8% tax
  }, [subtotal]);

  const shipping = useMemo(() => {
    if (subtotal > 100) return 0;
    if (subtotal > 50) return 5;
    return 10;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + tax + shipping;
  }, [subtotal, tax, shipping]);

  return (
    <div>
      <div>Subtotal: ${subtotal.toFixed(2)}</div>
      <div>Tax: ${tax.toFixed(2)}</div>
      <div>Shipping: ${shipping.toFixed(2)}</div>
      <div>Total: ${total.toFixed(2)}</div>
    </div>
  );
}

// ✅ Memoize complex object creation
function DataTable({ rows, columns }: TableProps) {
  const tableConfig = useMemo(() => ({
    sortable: true,
    filterable: true,
    columns: columns.map(col => ({
      ...col,
      accessor: row => row[col.key],
      formatter: col.format || ((val) => String(val)),
    })),
    pageSizes: [10, 25, 50, 100],
  }), [columns]);

  return <Table data={rows} config={tableConfig} />;
}

// ✅ Memoize regular expression patterns
function SearchResults({ items, query }: { items: Item[]; query: string }) {
  const searchRegex = useMemo(() => {
    try {
      return new RegExp(query, 'gi');
    } catch {
      return null;
    }
  }, [query]);

  const matches = useMemo(() => {
    if (!searchRegex) return [];
    
    return items.filter(item => 
      searchRegex.test(item.name) || searchRegex.test(item.description)
    );
  }, [items, searchRegex]);

  return (
    <ul>
      {matches.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## 🔄 Stabilize Event Handlers

Use `useCallback` to create stable function references for optimized child components.

**Implementation:**
```tsx
// ✅ Stabilize handlers passed to memoized children
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleToggle = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []); // No dependencies needed with functional setState

  const handleDelete = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

const TodoItem = React.memo(function TodoItem({ 
  todo, 
  onToggle, 
  onDelete 
}: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

// ✅ Stabilize API calls in event handlers
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    const data = await api.getUser(userId);
    setUser(data);
  }, [userId]);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    await api.updateUser(userId, updates);
    await fetchUser();
  }, [userId, fetchUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <UserForm user={user} onSave={updateUser} />
    </div>
  );
}

// ✅ Stabilize debounced handlers
function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  return (
    <input 
      value={query}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}

// ✅ Stabilize event handlers with external dependencies
function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { showNotification } = useNotifications();

  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
    showNotification(`Added ${product.name} to cart`);
  }, [product, onAddToCart, showNotification]);

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

// ✅ Create stable handler factory
function DataGrid({ rows }: { rows: Row[] }) {
  // Factory function to create stable handlers
  const handleRowClick = useCallback((rowId: string) => {
    return () => {
      console.log('Row clicked:', rowId);
      // Navigate or show details
    };
  }, []);

  return (
    <table>
      <tbody>
        {rows.map(row => (
          <tr key={row.id} onClick={handleRowClick(row.id)}>
            <td>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## 🔑 Stable List Keys

Use unique, stable IDs as keys to optimize list rendering and maintain component state.

**Implementation:**
```tsx
// ✅ Use unique ID from data
function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

// ✅ Composite keys for nested data
function OrderList({ orders }: { orders: Order[] }) {
  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>
          <ul>
            {order.items.map(item => (
              <li key={`${order.id}-${item.productId}`}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ✅ Generate stable IDs for client-side data
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

function TodoApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const addTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: crypto.randomUUID(), // Stable ID generated once
      text,
      completed: false,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ✅ Use stable identifiers for dynamic content
function CommentThread({ comments }: { comments: Comment[] }) {
  return (
    <div>
      {comments.map(comment => (
        <article key={comment.id}>
          <header>{comment.author}</header>
          <p>{comment.text}</p>
          {comment.replies && comment.replies.length > 0 && (
            <ul>
              {comment.replies.map(reply => (
                <li key={`${comment.id}-reply-${reply.id}`}>
                  {reply.text}
                </li>
              ))}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
}

// ✅ Maintain keys across filtering/sorting
function FilterableList({ items }: { items: Product[] }) {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');

  const processedItems = useMemo(() => {
    return items
      .filter(item => item.name.includes(filter))
      .sort((a, b) => sortBy === 'name' 
        ? a.name.localeCompare(b.name)
        : a.price - b.price
      );
  }, [items, filter, sortBy]);

  return (
    <ul>
      {processedItems.map(item => (
        // Use item.id, not index - maintains identity across operations
        <li key={item.id}>
          <ProductCard product={item} />
        </li>
      ))}
    </ul>
  );
}
```

## 🖼️ Prevent Layout Shift (CLS)

Specify image dimensions and use aspect ratio containers to prevent Cumulative Layout Shift.

**Implementation:**
```tsx
// ✅ Explicit width and height attributes
function ProductImage({ product }: { product: Product }) {
  return (
    <img
      src={product.imageUrl}
      alt={product.name}
      width={400}
      height={300}
      loading="lazy"
    />
  );
}

// ✅ Next.js Image component with dimensions
import Image from 'next/image';

function HeroSection() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero banner"
      width={1200}
      height={600}
      priority
    />
  );
}

// ✅ Aspect ratio containers with Tailwind
function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-square w-full overflow-hidden rounded-lg">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

// ✅ Video aspect ratio container
function VideoPlayer({ videoId }: { videoId: string }) {
  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Video player"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// ✅ Skeleton loader with same dimensions
function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="aspect-square w-full animate-pulse bg-gray-200 rounded-lg" />
      <div className="h-6 w-3/4 animate-pulse bg-gray-200 rounded" />
      <div className="h-4 w-1/2 animate-pulse bg-gray-200 rounded" />
    </div>
  );
}

function ProductCard({ productId }: { productId: string }) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
  });

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-muted-foreground">${product.price}</p>
    </div>
  );
}

// ✅ Responsive images with srcset and aspect ratio
function ResponsiveImage({ src, alt }: ImageProps) {
  return (
    <div className="aspect-[16/9] w-full">
      <img
        src={`${src}?w=800`}
        srcSet={`
          ${src}?w=400 400w,
          ${src}?w=800 800w,
          ${src}?w=1200 1200w
        `}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
```

## 🚀 Route-Level Code Splitting

Split your application by routes using `React.lazy` to reduce initial bundle size.

**Implementation:**
```tsx
// ✅ Route-level code splitting
// routes/index.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Lazy load page components
const HomePage = lazy(() => import('@/pages/HomePage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

// ✅ Nested route splitting
const UsersRoutes = lazy(() => import('@/pages/users/UsersRoutes'));
const ProductsRoutes = lazy(() => import('@/pages/products/ProductsRoutes'));

function App() {
  return (
    <Routes>
      <Route path="/users/*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <UsersRoutes />
        </Suspense>
      } />
      <Route path="/products/*" element={
        <Suspense fallback={<LoadingSpinner />}>
          <ProductsRoutes />
        </Suspense>
      } />
    </Routes>
  );
}

// ✅ Conditional route loading
function ConditionalRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {user?.role === 'admin' && (
        <Route 
          path="/admin/*" 
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <AdminRoutes />
            </Suspense>
          } 
        />
      )}
    </Routes>
  );
}

// ✅ Loading skeleton for better UX
function PageSkeleton() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="h-8 w-64 bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-48 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    </div>
  );
}

export function OptimizedRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        {/* Routes */}
      </Routes>
    </Suspense>
  );
}

// ✅ Preload routes on hover/focus
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

function Navigation() {
  const preloadDashboard = () => {
    // Preload the component when user hovers over link
    import('@/pages/DashboardPage');
  };

  return (
    <nav>
      <Link 
        to="/dashboard"
        onMouseEnter={preloadDashboard}
        onFocus={preloadDashboard}
      >
        Dashboard
      </Link>
    </nav>
  );
}
```

## 📡 Data Fetching Patterns

Implement efficient data fetching with proper dependency management and cleanup.

**Implementation:**
```tsx
// ✅ Use TanStack Query for data fetching
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return null;

  return <UserDetails user={user} />;
}

// ✅ Mutations with optimistic updates
function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: (id: string) => toggleTodo(id),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Snapshot previous value
      const previousTodos = queryClient.getQueryData(['todos']);

      // Optimistically update
      queryClient.setQueryData(['todos'], (old: Todo[]) =>
        old.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      );

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleMutation.mutate(todo.id)}
      />
      <span>{todo.text}</span>
    </div>
  );
}

// ✅ Custom hook with proper dependencies and cancellation
function useUser(userId: string | null) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    let cancelled = false;
    const abortController = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal,
        }).then(res => res.json());

        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled && err.name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
      abortController.abort();
    };
  }, [userId]); // Complete dependency array

  return { user, loading, error };
}

// ✅ Parallel data fetching
function DashboardPage() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
  });

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  // All queries run in parallel
  return (
    <div>
      <UserHeader user={user} />
      <StatsWidget stats={stats} />
      <NotificationsList notifications={notifications} />
    </div>
  );
}

// ✅ Dependent queries
function OrderDetails({ orderId }: { orderId: string }) {
  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrder(orderId),
  });

  const { data: customer } = useQuery({
    queryKey: ['customer', order?.customerId],
    queryFn: () => fetchCustomer(order!.customerId),
    enabled: !!order?.customerId, // Only run when order is loaded
  });

  return (
    <div>
      <OrderSummary order={order} />
      <CustomerInfo customer={customer} />
    </div>
  );
}
```

## 🧹 Memory Leak Prevention

Implement proper cleanup in effects to prevent memory leaks and stale updates.

**Implementation:**
```tsx
// ✅ Cleanup timers
function AutoSaveForm({ data }: { data: FormData }) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      saveFormData(data);
      setLastSaved(new Date());
    }, 30000); // Auto-save every 30 seconds

    return () => {
      clearInterval(interval); // Cleanup on unmount
    };
  }, [data]);

  return (
    <div>
      {lastSaved && <p>Last saved: {lastSaved.toLocaleTimeString()}</p>}
    </div>
  );
}

// ✅ Cleanup event listeners
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>{size.width} x {size.height}</div>;
}

// ✅ Cleanup subscriptions
function RealtimeData({ channelId }: { channelId: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const subscription = subscribeToChannel(channelId, (newData) => {
      setData(prev => [...prev, newData]);
    });

    return () => {
      subscription.unsubscribe(); // Cleanup subscription
    };
  }, [channelId]);

  return <DataList data={data} />;
}

// ✅ Cleanup WebSocket connections
function ChatRoom({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://api.example.com/chat/${roomId}`);

    ws.onopen = () => {
      console.log('Connected to chat');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close(); // Cleanup connection
    };
  }, [roomId]);

  return <MessageList messages={messages} />;
}

// ✅ Cleanup async operations
function DataFetcher({ userId }: { userId: string }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const result = await api.getUserData(userId);
        
        if (!cancelled) {
          setData(result); // Only update if still mounted
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Fetch error:', error);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true; // Prevent state updates after unmount
    };
  }, [userId]);

  return <div>{data?.name}</div>;
}

// ✅ Cleanup observers
function VisibilityTracker({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect(); // Cleanup observer
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible && children}
    </div>
  );
}

// ✅ Cleanup animation frames
function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId: number;
    const start = Date.now();
    const duration = 1000;

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(target * progress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId); // Cleanup animation
    };
  }, [target]);

  return <div className="text-4xl font-bold">{count}</div>;
}
```

## 🧊 Memoize Pure Components

Wrap pure presentational components with `React.memo` to prevent unnecessary re-renders.

**Implementation:**
```tsx
// ✅ Memoize pure display components
interface UserCardProps {
  name: string;
  email: string;
  avatar: string;
}

const UserCard = React.memo(function UserCard({ 
  name, 
  email, 
  avatar 
}: UserCardProps) {
  console.log('UserCard rendered');
  
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
});

// ✅ Memoize with custom comparison
interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = React.memo(
  function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison: only re-render if product data changes
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.name === nextProps.product.name &&
      prevProps.product.price === nextProps.product.price
    );
  }
);

// ✅ Memoize list items
const ListItem = React.memo(function ListItem({ 
  item, 
  onSelect 
}: ListItemProps) {
  return (
    <li 
      className="list-item"
      onClick={() => onSelect(item.id)}
    >
      {item.name}
    </li>
  );
});

function List({ items, onSelect }: ListProps) {
  return (
    <ul>
      {items.map(item => (
        <ListItem 
          key={item.id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

// ✅ Memoize complex presentational components
interface ChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  color: string;
}

const LineChart = React.memo(function LineChart({
  data,
  width,
  height,
  color,
}: ChartProps) {
  console.log('LineChart rendered');
  
  // Expensive SVG rendering
  return (
    <svg width={width} height={height}>
      {/* Complex chart rendering */}
    </svg>
  );
});

// ✅ Memoize components with children
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = React.memo(function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
});
```

---

## 📚 Resources

- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [React.memo Documentation](https://react.dev/reference/react/memo)
- [useMemo Hook](https://react.dev/reference/react/useMemo)
- [useCallback Hook](https://react.dev/reference/react/useCallback)
- [TanStack Query](https://tanstack.com/query/latest)
- [Core Web Vitals](https://web.dev/vitals/)
- [React Profiler](https://react.dev/reference/react/Profiler)
