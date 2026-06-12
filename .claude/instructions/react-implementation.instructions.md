---
name: React Patterns & Hooks Implementation
description: Implement React best practices with component purity, hooks patterns, performance optimization, state management, and proper lifecycle handling for React/TypeScript applications
applyTo: '**/*.tsx, **/*.jsx, src/components/**, src/pages/**, src/hooks/**'
---

Build maintainable, performant React applications using modern patterns, hooks best practices, and proper state management.

## 🎯 Component Purity & Side Effects

Write pure, predictable components that keep side effects isolated in proper lifecycle hooks.

**Implementation:**
```tsx
// ✅ Pure component - same props always produce same output
interface GreetingProps {
  name: string;
  title?: string;
}

function Greeting({ name, title = 'Welcome' }: GreetingProps) {
  // No side effects during render
  return (
    <div>
      <h1>{title}</h1>
      <p>Hello, {name}!</p>
    </div>
  );
}

// ✅ Side effects properly isolated in useEffect
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // API calls in useEffect, not in render
  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        const data = await api.getUser(userId);
        if (!cancelled) {
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (!user) return <ErrorMessage />;

  return <UserDetails user={user} />;
}

// ✅ Computed values derived from props (pure)
function PriceDisplay({ price, quantity, taxRate }: PriceProps) {
  // Calculations during render are fine (pure)
  const subtotal = price * quantity;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Tax: ${tax.toFixed(2)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}

// ✅ Subscriptions in useEffect
function RealtimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Subscribe to notifications
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ul>
      {notifications.map(notif => (
        <li key={notif.id}>{notif.message}</li>
      ))}
    </ul>
  );
}

// ✅ Timers in useEffect
function CountdownTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;

    const timer = setInterval(() => {
      setRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remaining]);

  return <div>Time remaining: {remaining}s</div>;
}
```

## 🔗 Hooks Dependencies

Include all dependencies from component scope in hooks to prevent stale closures and bugs.

**Implementation:**
```tsx
// ✅ Complete dependency arrays
function SearchResults({ query, filters }: SearchProps) {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    async function search() {
      // Both query and filters used - both in deps
      const data = await api.search(query, filters);
      setResults(data);
    }

    search();
  }, [query, filters]); // All dependencies listed

  return <ResultList results={results} />;
}

// ✅ useCallback with complete dependencies
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]); // Both dependencies included

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []); // No dependencies with functional setState

  return (
    <div>
      <FilterButtons filter={filter} onChange={setFilter} />
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
        ))}
      </ul>
    </div>
  );
}

// ✅ Extract stable values outside component
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_PAGE_SIZE = 20;

function DataList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // These values never change, safe to use without deps
    fetch(`${API_BASE_URL}/items?limit=${DEFAULT_PAGE_SIZE}`)
      .then(res => res.json())
      .then(setData);
  }, []); // Empty deps OK - no component values used

  return <List items={data} />;
}

// ✅ Custom hooks with proper dependencies
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Both parameters as dependencies

  return debouncedValue;
}

function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]); // Dependency on debounced value

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}

// ✅ Multiple related effects with correct dependencies
function UserDashboard({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<User[]>([]);

  // Fetch user data
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // Fetch user's posts (depends on userId)
  useEffect(() => {
    fetchUserPosts(userId).then(setPosts);
  }, [userId]);

  // Fetch user's friends (depends on userId)
  useEffect(() => {
    fetchUserFriends(userId).then(setFriends);
  }, [userId]);

  return (
    <div>
      <UserHeader user={user} />
      <PostsList posts={posts} />
      <FriendsList friends={friends} />
    </div>
  );
}
```

## ⚡ Performance Optimization

Profile and measure before optimizing to ensure meaningful improvements.

**Implementation:**
```tsx
// ✅ Profile with React DevTools before optimizing
import { Profiler } from 'react';

function App() {
  const onRenderCallback = (
    id: string,
    phase: 'mount' | 'update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    console.log(`${id} (${phase}) took ${actualDuration}ms`);
  };

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}

// ✅ Use useCallback only when needed (passing to memoized children)
const ExpensiveList = React.memo(function ExpensiveList({ 
  items, 
  onItemClick 
}: ListProps) {
  return (
    <ul>
      {items.map(item => (
        <ExpensiveListItem key={item.id} item={item} onClick={onItemClick} />
      ))}
    </ul>
  );
});

function ParentComponent() {
  const [items, setItems] = useState<Item[]>([]);

  // useCallback justified - passed to memoized child
  const handleItemClick = useCallback((itemId: string) => {
    console.log('Clicked:', itemId);
  }, []);

  return <ExpensiveList items={items} onItemClick={handleItemClick} />;
}

// ✅ Use useMemo for expensive calculations (measured to be slow)
function DataAnalysis({ data }: { data: DataPoint[] }) {
  // Only memoize if this operation is measured to be slow (>10ms)
  const statistics = useMemo(() => {
    console.log('Calculating statistics...');
    
    const sum = data.reduce((acc, point) => acc + point.value, 0);
    const mean = sum / data.length;
    const variance = data.reduce(
      (acc, point) => acc + Math.pow(point.value - mean, 2),
      0
    ) / data.length;
    const stdDev = Math.sqrt(variance);

    return { sum, mean, variance, stdDev };
  }, [data]);

  return (
    <div>
      <StatDisplay label="Mean" value={statistics.mean} />
      <StatDisplay label="Std Dev" value={statistics.stdDev} />
    </div>
  );
}

// ✅ Skip memoization for simple calculations
function SimpleCalculation({ price, quantity }: { price: number; quantity: number }) {
  // No useMemo needed - simple calculation is fast
  const total = price * quantity;
  const tax = total * 0.08;
  const finalPrice = total + tax;

  return <div>Total: ${finalPrice.toFixed(2)}</div>;
}

// ✅ Measure before and after optimization
function OptimizedComponent({ items }: { items: Item[] }) {
  // Add performance marks
  performance.mark('filter-start');
  
  const filteredItems = useMemo(() => {
    const result = items.filter(item => item.active);
    performance.mark('filter-end');
    performance.measure('filter-duration', 'filter-start', 'filter-end');
    return result;
  }, [items]);

  return <List items={filteredItems} />;
}
```

## 🎨 DOM Manipulation

Use refs for controlled DOM access while letting React manage the DOM declaratively.

**Implementation:**
```tsx
// ✅ Focus management with refs
function LoginForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus email input on mount
    emailInputRef.current?.focus();
  }, []);

  const handleEmailSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      passwordInputRef.current?.focus();
    }
  };

  return (
    <form>
      <input
        ref={emailInputRef}
        type="email"
        placeholder="Email"
        onKeyDown={handleEmailSubmit}
      />
      <input
        ref={passwordInputRef}
        type="password"
        placeholder="Password"
      />
    </form>
  );
}

// ✅ Scroll position management
function ScrollToTop() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div ref={containerRef} className="overflow-auto h-96">
      <Content />
      <button onClick={scrollToTop}>Back to Top</button>
    </div>
  );
}

// ✅ Measuring elements
function AdaptiveLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setWidth(width);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {width > 768 ? <DesktopLayout /> : <MobileLayout />}
    </div>
  );
}

// ✅ Third-party library integration
function MapComponent({ center, zoom }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<MapLibrary.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize third-party map library
    mapInstanceRef.current = new MapLibrary.Map(mapRef.current, {
      center,
      zoom,
    });

    return () => {
      mapInstanceRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // Update map when props change
    mapInstanceRef.current?.setCenter(center);
    mapInstanceRef.current?.setZoom(zoom);
  }, [center, zoom]);

  return <div ref={mapRef} className="h-96 w-full" />;
}

// ✅ Canvas drawing with refs
function CanvasDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw on canvas
    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);
  }, []);

  return <canvas ref={canvasRef} width={400} height={400} />;
}

// ✅ Imperative handle with forwardRef
interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  reset: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer({ src }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      reset: () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.pause();
        }
      },
    }));

    return <video ref={videoRef} src={src} />;
  }
);

function VideoController() {
  const playerRef = useRef<VideoPlayerHandle>(null);

  return (
    <div>
      <VideoPlayer ref={playerRef} src="/video.mp4" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.pause()}>Pause</button>
      <button onClick={() => playerRef.current?.reset()}>Reset</button>
    </div>
  );
}
```

## 📊 State Management

Colocate state effectively and use composition to avoid prop drilling.

**Implementation:**
```tsx
// ✅ State colocated at lowest needed level
function Accordion() {
  return (
    <div>
      <AccordionItem title="Section 1">
        Content 1
      </AccordionItem>
      <AccordionItem title="Section 2">
        Content 2
      </AccordionItem>
      <AccordionItem title="Section 3">
        Content 3
      </AccordionItem>
    </div>
  );
}

function AccordionItem({ title, children }: AccordionItemProps) {
  // State only affects this item
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

// ✅ Lift state when multiple components need it
function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems(prev => [...prev, item]);
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div>
      <CartSummary items={items} />
      <CartItemList items={items} onRemove={removeItem} />
      <ProductList onAddToCart={addItem} />
    </div>
  );
}

// ✅ Use composition to avoid prop drilling
function Dashboard({ user }: { user: User }) {
  return (
    <Layout>
      <Sidebar>
        <UserMenu user={user} />
      </Sidebar>
      <MainContent>
        <Header>
          <UserProfile user={user} />
        </Header>
        <Content user={user} />
      </MainContent>
    </Layout>
  );
}

// ✅ Context for global state (theme, auth, i18n)
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// ✅ Separate contexts for different concerns
interface AuthContextValue {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (credentials: Credentials) => {
    const userData = await api.login(credentials);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ✅ Batch related values in context
interface AppSettingsContextValue {
  language: string;
  currency: string;
  timezone: string;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null);

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
  });

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const value = useMemo(
    () => ({ ...settings, updateSettings }),
    [settings, updateSettings]
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}
```

## 🔑 Keys in Lists

Use stable, unique identifiers as keys to maintain component identity.

**Implementation:**
```tsx
// ✅ Use unique IDs from data
function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
}

// ✅ Generate stable IDs when creating items
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(), // Unique ID generated once
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemove={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
}

// ✅ Composite keys for nested structures
function OrderHistory({ orders }: { orders: Order[] }) {
  return (
    <div>
      {orders.map(order => (
        <div key={order.id}>
          <h3>Order #{order.id}</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={`${order.id}-${item.productId}-${index}`}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ✅ Use index only for static, never-changing lists
const MENU_ITEMS = ['Home', 'About', 'Services', 'Contact'] as const;

function StaticMenu() {
  return (
    <nav>
      {MENU_ITEMS.map((item, index) => (
        // OK to use index - list never changes
        <a key={index} href={`/${item.toLowerCase()}`}>
          {item}
        </a>
      ))}
    </nav>
  );
}

// ✅ Backend-generated IDs
interface Product {
  id: string; // Backend provides unique ID
  name: string;
  price: number;
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 📝 Controlled vs Uncontrolled Inputs

Be consistent with form input management approach.

**Implementation:**
```tsx
// ✅ Controlled form inputs (React manages state)
function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ Uncontrolled form inputs (DOM manages state)
function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || '',
      message: messageRef.current?.value || '',
    };
    
    console.log('Submitting:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} name="name" placeholder="Name" />
      <input ref={emailRef} name="email" type="email" placeholder="Email" />
      <textarea ref={messageRef} name="message" placeholder="Message" />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ React Hook Form (recommended for complex forms)
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

function ReactHookFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    await api.submitForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} placeholder="Name" />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>
      
      <div>
        <input {...register('email')} type="email" placeholder="Email" />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      
      <div>
        <textarea {...register('message')} placeholder="Message" />
        {errors.message && (
          <span className="error">{errors.message.message}</span>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

// ✅ Controlled with validation
function ControlledWithValidation() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Real-time validation
    if (value && !value.includes('@')) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        aria-invalid={!!emailError}
        aria-describedby={emailError ? 'email-error' : undefined}
      />
      {emailError && (
        <span id="email-error" className="error">
          {emailError}
        </span>
      )}
    </div>
  );
}
```

## 🔄 useEffect Cleanup

Return cleanup functions to prevent memory leaks and stale subscriptions.

**Implementation:**
```tsx
// ✅ Timer cleanup
function AutoRefresh({ interval = 30000 }: { interval?: number }) {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
      refreshData();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval]);

  return <div>Last updated: {lastUpdate.toLocaleTimeString()}</div>;
}

// ✅ Event listener cleanup
function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveDocument();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return <div>Press Ctrl+S to save</div>;
}

// ✅ Subscription cleanup
function StockTicker({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const subscription = stockPriceService.subscribe(symbol, (newPrice) => {
      setPrice(newPrice);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [symbol]);

  return <div>{symbol}: ${price?.toFixed(2)}</div>;
}

// ✅ WebSocket cleanup
function ChatMessages({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://api.example.com/rooms/${roomId}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  return (
    <ul>
      {messages.map(msg => (
        <li key={msg.id}>{msg.text}</li>
      ))}
    </ul>
  );
}

// ✅ Animation frame cleanup
function SmoothScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frameId: number;

    const updateScrollPosition = () => {
      setScrollY(window.scrollY);
      frameId = requestAnimationFrame(updateScrollPosition);
    };

    frameId = requestAnimationFrame(updateScrollPosition);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div>Scroll position: {scrollY}px</div>;
}
```

## ⏱️ Async in useEffect

Handle asynchronous operations properly in effects with cleanup and error handling.

**Implementation:**
```tsx
// ✅ Define async function inside effect
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const data = await api.getUser(userId);
        
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return null;

  return <UserDetails user={user} />;
}

// ✅ Use AbortController for fetch cancellation
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function search() {
      try {
        const response = await fetch(`/api/search?q=${query}`, {
          signal: abortController.signal,
        });
        
        const data = await response.json();
        setResults(data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Search failed:', error);
        }
      }
    }

    if (query) {
      search();
    }

    return () => {
      abortController.abort();
    };
  }, [query]);

  return <ResultsList results={results} />;
}

// ✅ Handle race conditions
function DataFetcher({ id }: { id: string }) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await api.getData(id);
      
      // Only update if this is still the latest request
      if (!ignore) {
        setData(result);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [id]);

  return <DataDisplay data={data} />;
}

// ✅ Multiple async operations with Promise.all
function DashboardData({ userId }: { userId: string }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchAllData() {
      setLoading(true);

      try {
        const [user, stats, notifications] = await Promise.all([
          api.getUser(userId),
          api.getUserStats(userId),
          api.getNotifications(userId),
        ]);

        if (!cancelled) {
          setData({ user, stats, notifications });
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAllData();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (!data) return null;

  return (
    <div>
      <UserHeader user={data.user} />
      <StatsWidget stats={data.stats} />
      <NotificationsList notifications={data.notifications} />
    </div>
  );
}
```

## 📦 Code Splitting

Split application code by routes to reduce initial bundle size and improve load times.

**Implementation:**
```tsx
// ✅ Lazy load route components
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// ✅ Loading fallback with skeleton
function PageSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <div className="h-8 w-64 bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
    </div>
  );
}

function AppWithSkeleton() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        {/* Routes */}
      </Routes>
    </Suspense>
  );
}

// ✅ Split by feature area
const AdminRoutes = lazy(() => import('@/features/admin/Routes'));
const UserRoutes = lazy(() => import('@/features/users/Routes'));
const ProductRoutes = lazy(() => import('@/features/products/Routes'));

function FeatureRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminRoutes />
          </Suspense>
        }
      />
      <Route
        path="/users/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <UserRoutes />
          </Suspense>
        }
      />
      <Route
        path="/products/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <ProductRoutes />
          </Suspense>
        }
      />
    </Routes>
  );
}

// ✅ Preload on navigation intent
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

function Navigation() {
  const preloadDashboard = () => {
    // Start loading before navigation
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

// ✅ Error boundary for lazy-loaded components
class LazyLoadErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Failed to load component</h2>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppWithErrorBoundary() {
  return (
    <LazyLoadErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Routes */}
        </Routes>
      </Suspense>
    </LazyLoadErrorBoundary>
  );
}
```

## 🏗️ Component Definition

Define components at module level with named functions for better debugging.

**Implementation:**
```tsx
// ✅ Named function at module level
function UserCard({ user }: { user: User }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ Named function declaration (preferred)
function ProductList({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

function ProductItem({ product }: { product: Product }) {
  return (
    <li>
      <h4>{product.name}</h4>
      <p>${product.price}</p>
    </li>
  );
}

// ✅ Named arrow function export
export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
};

// Better: Named function
export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

// ✅ Extract helper components to module level
function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function PriceTag({ price }: { price: number }) {
  return <span className="price">{formatPrice(price)}</span>;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <PriceTag price={product.price} />
    </div>
  );
}

// ✅ Conditional rendering without conditional component definition
function Dashboard({ userRole }: { userRole: 'admin' | 'user' }) {
  // Render different content, not different components
  return (
    <div>
      {userRole === 'admin' ? (
        <AdminPanel />
      ) : (
        <UserPanel />
      )}
    </div>
  );
}

// Both components defined at module level
function AdminPanel() {
  return <div>Admin Dashboard</div>;
}

function UserPanel() {
  return <div>User Dashboard</div>;
}

// ✅ Generic components with TypeScript
function List<T extends { id: string }>({ 
  items, 
  renderItem 
}: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
function UserList({ users }: { users: User[] }) {
  return (
    <List
      items={users}
      renderItem={(user) => <UserCard user={user} />}
    />
  );
}
```

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Rules of Hooks](https://react.dev/reference/rules)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [React Hook Form](https://react-hook-form.com/)
- [React Query/TanStack Query](https://tanstack.com/query/latest)
