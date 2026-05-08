---
name: Architecture & File Structure Implementation
description: Implement consistent file naming, folder structure, barrel exports, and separation of concerns for scalable, maintainable application architecture
applyTo: 'src/**, **/*.ts, **/*.tsx, src/routes/**, src/hooks/**, src/services/**'
---

Build well-organized, scalable applications with consistent naming conventions, proper folder structure, and clear separation of concerns.

## 📁 Folder & File Naming

Follow consistent naming conventions for files and folders based on their purpose.

**Implementation:**
```typescript
// ✅ Project structure with proper naming
/*
src/
├── components/
│   ├── ui/                           # shadcn/ui components
│   │   ├── Button.tsx               # PascalCase for components
│   │   ├── Input.tsx
│   │   └── index.ts                 # Barrel export
│   ├── user-profile/                # kebab-case folders
│   │   ├── UserCard.tsx             # PascalCase .tsx
│   │   ├── UserAvatar.tsx
│   │   ├── UserList.tsx
│   │   └── index.ts
│   └── product-catalog/
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       └── index.ts
├── hooks/
│   ├── useAuth.ts                   # camelCase with 'use' prefix
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── index.ts
├── services/
│   ├── authService.ts               # camelCase with 'Service' suffix
│   ├── userService.ts
│   ├── productService.ts
│   └── index.ts
├── contexts/
│   ├── AuthContext.tsx              # PascalCase with 'Context' suffix
│   ├── ThemeContext.tsx
│   └── index.ts
├── types/
│   ├── authTypes.ts                 # camelCase with 'Types' suffix
│   ├── userTypes.ts
│   ├── productTypes.ts
│   └── index.ts
├── utils/
│   ├── formatters.ts                # camelCase for utilities
│   ├── validators.ts
│   └── index.ts
└── pages/
    ├── HomePage.tsx                 # PascalCase with 'Page' suffix
    ├── DashboardPage.tsx
    └── index.ts
*/

// ✅ Component file example
// components/user-profile/UserCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { User } from '@/types/userTypes';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{user.email}</p>
      </CardContent>
    </Card>
  );
}

// ✅ Hook file example
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authService } from '@/services';
import type { User } from '@/types/authTypes';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}

// ✅ Service file example
// services/authService.ts
import type { User, LoginCredentials } from '@/types/authTypes';

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await fetch('/api/auth/me');
    if (!response.ok) return null;
    return response.json();
  }
}

export const authService = new AuthService();

// ✅ Context file example
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useCallback } from 'react';
import type { User, LoginCredentials } from '@/types/authTypes';
import { authService } from '@/services';

interface AuthContextValue {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const userData = await authService.login(credentials);
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}

// ✅ Types file example
// types/userTypes.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  preferences?: Partial<UserPreferences>;
}
```

## 📦 Barrel Exports

Use barrel exports (index.ts) to create clean public APIs for modules.

**Implementation:**
```typescript
// ✅ Component barrel export
// components/user-profile/index.ts
export { UserCard } from './UserCard';
export { UserAvatar } from './UserAvatar';
export { UserList } from './UserList';
export { UserProfile } from './UserProfile';

// Usage
import { UserCard, UserAvatar } from '@/components/user-profile';

// ✅ Hooks barrel export
// hooks/index.ts
export { useAuth } from './useAuth';
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
export { useMediaQuery } from './useMediaQuery';

// Usage
import { useAuth, useDebounce } from '@/hooks';

// ✅ Services barrel export
// services/index.ts
export { authService } from './authService';
export { userService } from './userService';
export { productService } from './productService';
export { orderService } from './orderService';

// Usage
import { authService, userService } from '@/services';

// ✅ Types barrel export
// types/index.ts
export type { User, UserRole, UserPreferences } from './userTypes';
export type { Product, ProductCategory } from './productTypes';
export type { Order, OrderStatus, OrderItem } from './orderTypes';

// Usage
import type { User, Product, Order } from '@/types';

// ✅ Utils barrel export
// utils/index.ts
export { formatDate, formatCurrency, formatPercent } from './formatters';
export { validateEmail, validatePhone, validateUrl } from './validators';
export { cn, clsx } from './classNames';

// Usage
import { formatDate, validateEmail, cn } from '@/utils';

// ✅ Feature barrel export
// features/products/index.ts
export { ProductList } from './components/ProductList';
export { ProductCard } from './components/ProductCard';
export { useProducts } from './hooks/useProducts';
export { productService } from './services/productService';
export type { Product, ProductCategory } from './types';

// Usage
import { ProductList, useProducts, productService } from '@/features/products';
import type { Product } from '@/features/products';

// ✅ UI components barrel export
// components/ui/index.ts
export { Button, buttonVariants } from './button';
export { Input } from './input';
export { Label } from './label';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

// Usage
import { Button, Input, Card, Dialog } from '@/components/ui';

// ✅ Contexts barrel export
// contexts/index.ts
export { AuthProvider, useAuthContext } from './AuthContext';
export { ThemeProvider, useTheme } from './ThemeContext';
export { NotificationProvider, useNotifications } from './NotificationContext';

// Usage
import { AuthProvider, useAuthContext, ThemeProvider } from '@/contexts';
```

## 📄 Page Components (Default Exports)

Use default exports for page components to enable React.lazy code splitting.

**Implementation:**
```tsx
// ✅ Page component with default export
// pages/HomePage.tsx
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to the App</h1>
      {user ? (
        <p>Hello, {user.name}!</p>
      ) : (
        <Button>Sign In</Button>
      )}
    </div>
  );
}

// ✅ Dashboard page with data fetching
// pages/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { userService } from '@/services';

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    userService.getStats().then(setStats);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{stats?.totalUsers}</p>
        </CardContent>
      </Card>
      {/* More cards */}
    </div>
  );
}

// ✅ Profile page with custom hook
// pages/ProfilePage.tsx
import { Card } from '@/components/ui';
import { UserProfile } from '@/components/user-profile';
import { useCurrentUser } from '@/hooks';

export default function ProfilePage() {
  const { user, loading } = useCurrentUser();

  if (loading) return <LoadingSpinner />;
  if (!user) return <NotFoundMessage />;

  return (
    <Card>
      <UserProfile user={user} />
    </Card>
  );
}

// ✅ Settings page with tabs
// pages/SettingsPage.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';

export default function SettingsPage() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <AccountSettings />
      </TabsContent>
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  );
}

// ✅ Pages barrel export (for typing)
// pages/index.ts
export { default as HomePage } from './HomePage';
export { default as DashboardPage } from './DashboardPage';
export { default as ProfilePage } from './ProfilePage';
export { default as SettingsPage } from './SettingsPage';

// Note: These are for typing only, lazy load in routes:
// const HomePage = lazy(() => import('@/pages/HomePage'));
```

## 🪝 Hook Organization

Centralize all custom hooks in the `src/hooks/` directory for easy discovery and reuse.

**Implementation:**
```typescript
// ✅ All hooks in src/hooks/
/*
src/hooks/
├── useAuth.ts
├── useLocalStorage.ts
├── useDebounce.ts
├── useMediaQuery.ts
├── useCurrentUser.ts
├── useProducts.ts
├── useOrders.ts
└── index.ts
*/

// ✅ Authentication hook
// hooks/useAuth.ts
import { useState, useCallback } from 'react';
import { authService } from '@/services';
import type { User, LoginCredentials } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  return { user, loading, login, logout };
}

// ✅ Data fetching hook
// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { productService } from '@/services';
import type { Product } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    productService.getAll()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

// ✅ Form hook
// hooks/useForm.ts
import { useState, useCallback } from 'react';

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return { values, errors, handleChange, setErrors, reset };
}

// ✅ Utility hook
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ✅ Media query hook
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// ✅ LocalStorage hook
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// ✅ Hooks barrel export
// hooks/index.ts
export { useAuth } from './useAuth';
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
export { useMediaQuery } from './useMediaQuery';
export { useProducts } from './useProducts';
export { useForm } from './useForm';
```

## 🚀 Cross-Feature Imports

Import from feature public APIs through barrel exports, not internal files.

**Implementation:**
```typescript
// ✅ Feature structure with public API
/*
src/features/
├── products/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── ProductList.tsx
│   │   └── ProductFilters.tsx
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useProductFilters.ts
│   ├── services/
│   │   └── productService.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts                    # Public API
├── orders/
│   ├── components/
│   │   ├── OrderCard.tsx
│   │   └── OrderList.tsx
│   ├── hooks/
│   │   └── useOrders.ts
│   ├── services/
│   │   └── orderService.ts
│   └── index.ts                    # Public API
└── users/
    ├── components/
    │   ├── UserCard.tsx
    │   └── UserList.tsx
    ├── hooks/
    │   └── useUsers.ts
    └── index.ts                    # Public API
*/

// ✅ Feature public API
// features/products/index.ts
// Export only what other features should use
export { ProductCard } from './components/ProductCard';
export { ProductList } from './components/ProductList';
export { useProducts } from './hooks/useProducts';
export type { Product, ProductCategory } from './types';

// ✅ Import from feature public API
// features/orders/components/OrderDetails.tsx
import { ProductCard } from '@/features/products'; // ✅ Through public API
import { UserCard } from '@/features/users';       // ✅ Through public API

export function OrderDetails({ order }: { order: Order }) {
  return (
    <div>
      <h2>Order #{order.id}</h2>
      <UserCard user={order.user} />
      <div className="mt-4">
        {order.items.map(item => (
          <ProductCard key={item.id} product={item.product} />
        ))}
      </div>
    </div>
  );
}

// ✅ Page importing from features
// pages/ProductsPage.tsx
import { ProductList, useProducts } from '@/features/products';

export default function ProductsPage() {
  const { products, loading } = useProducts();

  return (
    <div>
      <h1>Products</h1>
      <ProductList products={products} loading={loading} />
    </div>
  );
}

// ✅ Feature with shared utilities
// features/products/index.ts
export { ProductCard } from './components/ProductCard';
export { ProductList } from './components/ProductList';
export { useProducts } from './hooks/useProducts';
export { formatProductPrice } from './utils/formatters';
export type { Product, ProductCategory } from './types';

// ✅ Cross-feature shared types
// types/shared.ts
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Multiple features can import these
import type { PaginatedResponse, ApiError } from '@/types/shared';
```

## 🗺️ Route File Structure

Use `.tsx` extension for route files containing JSX and wrap lazy-loaded components in Suspense.

**Implementation:**
```tsx
// ✅ Route file with proper structure
// routes/index.tsx (note .tsx extension for JSX)
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/components/shared';

// Lazy load page components
const HomePage = lazy(() => import('@/pages/HomePage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));

// Suspense wrapper component
function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <SuspenseWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </SuspenseWrapper>
    </BrowserRouter>
  );
}

// ✅ Route file with nested routes
// routes/index.tsx
import { Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layouts';

const DashboardOverview = lazy(() => import('@/pages/dashboard/OverviewPage'));
const DashboardAnalytics = lazy(() => import('@/pages/dashboard/AnalyticsPage'));
const DashboardReports = lazy(() => import('@/pages/dashboard/ReportsPage'));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="analytics" element={<DashboardAnalytics />} />
        <Route path="reports" element={<DashboardReports />} />
      </Route>
    </Routes>
  );
}

// ✅ Route file with protected routes
// routes/index.tsx
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <SuspenseWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </SuspenseWrapper>
    </BrowserRouter>
  );
}

// ✅ Route configuration with metadata
// routes/config.ts
export const routes = {
  home: { path: '/', title: 'Home' },
  dashboard: { path: '/dashboard', title: 'Dashboard' },
  profile: { path: '/profile', title: 'Profile' },
  settings: { path: '/settings', title: 'Settings' },
  products: { path: '/products', title: 'Products' },
  productDetail: (id: string) => ({
    path: `/products/${id}`,
    title: 'Product Details',
  }),
};

// Usage in navigation
import { Link } from 'react-router-dom';
import { routes } from '@/routes/config';

<Link to={routes.dashboard.path}>{routes.dashboard.title}</Link>
```

## 🧠 Separation of Concerns

Separate business logic from presentation by using hooks and services.

**Implementation:**
```tsx
// ✅ Page with proper separation
// pages/ProductsPage.tsx
import { ProductList } from '@/components/product-catalog';
import { SearchInput } from '@/components/shared';
import { useProducts } from '@/hooks';

export default function ProductsPage() {
  const {
    products,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
  } = useProducts();

  return (
    <div>
      <h1>Products</h1>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <ProductList products={products} loading={loading} />
    </div>
  );
}

// ✅ Hook encapsulating business logic
// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { productService } from '@/services';
import { useDebounce } from './useDebounce';
import type { Product, ProductFilters } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilters>({});

  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setLoading(true);
    
    productService
      .search(debouncedQuery, filters)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [debouncedQuery, filters]);

  return {
    products,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
  };
}

// ✅ Presentational component (no business logic)
// components/product-catalog/ProductList.tsx
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from '@/components/shared';
import type { Product } from '@/types';

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

export function ProductList({ products, loading }: ProductListProps) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ Form with business logic in hook
// pages/ProfileEditPage.tsx
import { ProfileForm } from '@/components/user-profile';
import { useProfileEdit } from '@/hooks';

export default function ProfileEditPage() {
  const {
    user,
    loading,
    handleSubmit,
    handleCancel,
  } = useProfileEdit();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Edit Profile</h1>
      <ProfileForm
        user={user}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

// ✅ Hook with form logic
// hooks/useProfileEdit.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/services';
import { useAuthContext } from '@/contexts';
import { toast } from 'sonner';
import type { UpdateUserInput } from '@/types';

export function useProfileEdit() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: UpdateUserInput) => {
    setLoading(true);
    try {
      await userService.update(user!.id, data);
      await refreshUser();
      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return {
    user,
    loading,
    handleSubmit,
    handleCancel,
  };
}
```

## 🏗️ Service Layer Pattern

Centralize all API calls in service classes for maintainability and reusability.

**Implementation:**
```typescript
// ✅ Service class pattern
// services/userService.ts
import type { User, UpdateUserInput, CreateUserInput } from '@/types/userTypes';
import type { PaginatedResponse } from '@/types/shared';

class UserService {
  private baseUrl = '/api/users';

  async getAll(page = 1, pageSize = 20): Promise<PaginatedResponse<User>> {
    const response = await fetch(
      `${this.baseUrl}?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  }

  async getById(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) throw new Error('User not found');
    return response.json();
  }

  async create(data: CreateUserInput): Promise<User> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
  }

  async search(query: string): Promise<User[]> {
    const response = await fetch(
      `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  }
}

export const userService = new UserService();

// ✅ Service with error handling
// services/productService.ts
import { ApiError } from '@/types/shared';
import type { Product, ProductFilters, CreateProductInput } from '@/types/productTypes';

class ProductService {
  private baseUrl = '/api/products';

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }

  async getAll(): Promise<Product[]> {
    const response = await fetch(this.baseUrl);
    return this.handleResponse<Product[]>(response);
  }

  async search(query: string, filters: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice.toString());

    const response = await fetch(`${this.baseUrl}/search?${params}`);
    return this.handleResponse<Product[]>(response);
  }

  async create(data: CreateProductInput): Promise<Product> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return this.handleResponse<Product>(response);
  }
}

export const productService = new ProductService();

// ✅ Service with authentication
// services/authService.ts
import type { User, LoginCredentials, RegisterData } from '@/types/authTypes';

class AuthService {
  private baseUrl = '/api/auth';

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include httpOnly cookies
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  }

  async register(data: RegisterData): Promise<User> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    await fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${this.baseUrl}/me`, {
        credentials: 'include',
      });

      if (!response.ok) return null;
      return response.json();
    } catch {
      return null;
    }
  }

  async refreshToken(): Promise<void> {
    await fetch(`${this.baseUrl}/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
  }
}

export const authService = new AuthService();

// ✅ Base API service
// services/api.ts
import { config } from '@/config/env';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      credentials: 'include',
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }
    return response.json();
  }
}

export const api = new ApiService(config.apiUrl);

// ✅ Services barrel export
// services/index.ts
export { authService } from './authService';
export { userService } from './userService';
export { productService } from './productService';
export { orderService } from './orderService';
export { api } from './api';
```

## 📐 Complete Project Structure Example

```typescript
// ✅ Well-organized project structure
/*
src/
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── index.ts
│   ├── shared/                      # Shared custom components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── index.ts
│   ├── user-profile/                # Feature-specific components
│   │   ├── UserCard.tsx
│   │   ├── UserAvatar.tsx
│   │   ├── UserList.tsx
│   │   └── index.ts
│   └── product-catalog/
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       ├── ProductFilters.tsx
│       └── index.ts
├── hooks/                           # All custom hooks
│   ├── useAuth.ts
│   ├── useProducts.ts
│   ├── useDebounce.ts
│   └── index.ts
├── services/                        # API service layer
│   ├── authService.ts
│   ├── userService.ts
│   ├── productService.ts
│   ├── api.ts
│   └── index.ts
├── contexts/                        # React contexts
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── index.ts
├── types/                           # TypeScript types
│   ├── userTypes.ts
│   ├── productTypes.ts
│   ├── authTypes.ts
│   ├── shared.ts
│   └── index.ts
├── utils/                           # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   ├── classNames.ts
│   └── index.ts
├── pages/                           # Page components
│   ├── HomePage.tsx
│   ├── DashboardPage.tsx
│   ├── ProductsPage.tsx
│   └── index.ts
├── routes/                          # Routing configuration
│   ├── index.tsx
│   └── config.ts
├── config/                          # App configuration
│   ├── env.ts
│   └── constants.ts
├── lib/                             # Third-party integrations
│   ├── utils.ts
│   └── logger.ts
└── App.tsx
*/
```

---

## 📚 Resources

- [React Project Structure](https://react.dev/learn/thinking-in-react)
- [File Naming Conventions](https://github.com/kettanaito/naming-cheatsheet)
- [Barrel Exports](https://basarat.gitbook.io/typescript/main-1/barrel)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Router](https://reactrouter.com/)
