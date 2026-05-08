---
name: Build & Vite Implementation
description: Implement Vite-compatible code with ESM standards, environment variables, asset imports, code splitting, and bundle optimization for TypeScript/React applications
applyTo: '**/*.ts, **/*.tsx, src/**, vite.config.ts, **/.env*'
---

Build production-ready code that compiles correctly with TypeScript and Vite, following ESM standards and optimization best practices.

## 🏗️ Build Success & Type Safety

Write type-safe code that passes TypeScript compilation and Vite build without errors.

**Implementation:**
```tsx
// Explicitly type all props and function signatures
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ 
  onClick, 
  children, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn-${variant}`}
    >
      {children}
    </button>
  );
}

// Type useState and useRef properly
const [count, setCount] = useState<number>(0);
const inputRef = useRef<HTMLInputElement>(null);

// Type custom hooks with explicit return types
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  return [storedValue, setStoredValue] as const;
}

// Type event handlers
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  console.log('Clicked');
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
```

## 🔄 Import Patterns (TS vs TSX)

Organize files correctly with `.ts` for pure TypeScript and `.tsx` for React components.

**Implementation:**
```typescript
// ✅ utils/formatters.ts (pure TypeScript, no JSX)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ✅ types/user.ts (type definitions)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export type UserRole = User['role'];

// ✅ components/UserCard.tsx (React component)
import { formatDate } from '@/utils/formatters';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ hooks/useAuth.ts (custom hook without JSX)
import { useState, useEffect } from 'react';
import { User } from '@/types/user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auth logic
  }, []);

  return { user, loading };
}

// ✅ hooks/useUserForm.tsx (custom hook that returns JSX)
import { useState } from 'react';

export function useUserForm() {
  const [name, setName] = useState('');

  const formElement = (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );

  return { name, formElement };
}
```

## ⚡ Dynamic Imports & Code Splitting

Use `React.lazy()` and `Suspense` for route-level code splitting and performance optimization.

**Implementation:**
```tsx
// routes/index.tsx - Lazy load route components
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Lazy load heavy pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Settings = lazy(() => import('@/pages/Settings'));

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Lazy load heavy components
import { lazy, Suspense } from 'react';

const ChartComponent = lazy(() => import('@/components/Chart'));

export function AnalyticsPage() {
  return (
    <div>
      <h1>Analytics</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <ChartComponent data={chartData} />
      </Suspense>
    </div>
  );
}

// Lazy load modal content
const AdvancedSettingsModal = lazy(() => import('./AdvancedSettingsModal'));

export function SettingsPage() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div>
      <button onClick={() => setShowAdvanced(true)}>
        Advanced Settings
      </button>
      {showAdvanced && (
        <Suspense fallback={<div>Loading...</div>}>
          <AdvancedSettingsModal onClose={() => setShowAdvanced(false)} />
        </Suspense>
      )}
    </div>
  );
}

// Preload on hover for better UX
const HeavyFeature = lazy(() => import('./HeavyFeature'));

function App() {
  const preloadHeavyFeature = () => {
    import('./HeavyFeature');
  };

  return (
    <button onMouseEnter={preloadHeavyFeature}>
      Show Feature
    </button>
  );
}
```

## 📦 ESM Only (No CommonJS)

Use modern ES module syntax exclusively for imports and exports.

**Implementation:**
```typescript
// ✅ Named exports and imports
// utils/api.ts
export const API_BASE_URL = 'https://api.example.com';
export const API_TIMEOUT = 5000;

export async function fetchUser(id: string) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  return response.json();
}

export async function updateUser(id: string, data: UserData) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.json();
}

// Import named exports
import { fetchUser, updateUser, API_BASE_URL } from '@/utils/api';

// ✅ Default exports
// components/Button.tsx
export default function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}

// Import default export
import Button from '@/components/Button';

// ✅ Mixed exports
// utils/format.ts
export default function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

export function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

// Import both
import formatPrice, { formatPercent } from '@/utils/format';

// ✅ Re-exports (barrel files)
// components/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Select } from './Select';

// Import from barrel
import { Button, Input } from '@/components';

// ✅ Type-only imports/exports
// types/index.ts
export type { User, UserRole } from './user';
export type { Product, ProductCategory } from './product';

// Import types
import type { User } from '@/types';
```

## 🌍 Environment Variables

Access environment variables using Vite's `import.meta.env` API with proper typing and validation.

**Implementation:**
```typescript
// env.d.ts - Type environment variables
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_SENTRY_DSN?: string; // Optional
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// config/env.ts - Centralized environment configuration
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  appTitle: import.meta.env.VITE_APP_TITLE,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE, // 'development' | 'production'
} as const;

// Validate required environment variables at startup
function validateEnv() {
  const required = ['VITE_API_URL', 'VITE_API_KEY', 'VITE_APP_TITLE'];
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

validateEnv();

// utils/api.ts - Use config
import { config } from '@/config/env';

export async function apiRequest(endpoint: string) {
  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    headers: {
      'X-API-Key': config.apiKey,
    },
  });
  return response.json();
}

// Feature flags based on environment
export function FeaturePreview({ children }: { children: React.ReactNode }) {
  if (!config.isDevelopment) {
    return null;
  }
  return <div className="dev-preview">{children}</div>;
}

// .env.example - Document available variables
/*
# API Configuration
VITE_API_URL=https://api.example.com
VITE_API_KEY=your-api-key-here

# Application
VITE_APP_TITLE=My App

# Feature Flags
VITE_ENABLE_ANALYTICS=false

# Optional
VITE_SENTRY_DSN=https://your-sentry-dsn
*/
```

## 🔒 Client vs Server Code Separation

Keep Node.js-specific code separate from client code to prevent build issues.

**Implementation:**
```typescript
// ✅ Client-safe utilities (src/utils/crypto.ts)
// Use Web Crypto API for client-side
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Generate random IDs client-side
export function generateId(): string {
  return crypto.randomUUID();
}

// ✅ Client-safe storage (src/utils/storage.ts)
export class LocalStorage<T> {
  constructor(private key: string) {}

  get(): T | null {
    try {
      const item = localStorage.getItem(this.key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  remove(): void {
    localStorage.removeItem(this.key);
  }
}

// ✅ Client-safe data fetching
export async function downloadFile(url: string): Promise<Blob> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.statusText}`);
  }
  return response.blob();
}

// ✅ Server-side code (separate from client bundle)
// If you need Node.js APIs, keep them in:
// - vite.config.ts
// - scripts/ folder
// - API routes (if using a meta-framework)

// vite.config.ts
import { defineConfig } from 'vite';
import fs from 'fs'; // OK here, not bundled for client
import path from 'path';

export default defineConfig({
  // Config using Node.js APIs
});
```

## 🖼️ Asset Imports

Import static assets using Vite's asset handling system.

**Implementation:**
```tsx
// SVG as React component
import Logo from '@/assets/logo.svg?react';
import ArrowIcon from '@/assets/icons/arrow.svg?react';

export function Header() {
  return (
    <header>
      <Logo className="w-32 h-8" />
      <button>
        Next <ArrowIcon className="inline w-4 h-4" />
      </button>
    </header>
  );
}

// SVG as URL string
import logoUrl from '@/assets/logo.svg';
import iconUrl from '@/assets/icon.svg';

export function OpenGraphImage() {
  return (
    <meta property="og:image" content={logoUrl} />
  );
}

// Image imports
import heroImage from '@/assets/hero.png';
import avatarDefault from '@/assets/avatar-default.jpg';
import productThumb from '@/assets/products/thumbnail.webp';

export function Hero() {
  return (
    <div>
      <img src={heroImage} alt="Hero banner" />
      <img src={avatarDefault} alt="Default avatar" />
      <img src={productThumb} alt="Product thumbnail" />
    </div>
  );
}

// JSON imports
import config from '@/data/config.json';
import translations from '@/locales/en.json';

export function App() {
  console.log(config.version);
  console.log(translations.welcome);
}

// CSS imports
import '@/styles/global.css';
import styles from '@/components/Button.module.css';

export function StyledComponent() {
  return <button className={styles.primary}>Click</button>;
}

// Dynamic image paths (public folder)
// Place files in /public folder, reference without import
export function DynamicImage({ userId }: { userId: string }) {
  return (
    <img 
      src={`/avatars/${userId}.jpg`} 
      alt="User avatar"
      onError={(e) => {
        e.currentTarget.src = '/avatars/default.jpg';
      }}
    />
  );
}

// Inline assets as data URLs (for small files)
import tinyIcon from '@/assets/tiny-icon.svg?url';
// Vite automatically inlines small files as base64

// Raw file content
import shaderCode from '@/shaders/fragment.glsl?raw';
console.log(shaderCode); // File content as string
```

## 📊 Bundle Optimization

Optimize bundle size through lazy loading, tree-shaking, and efficient imports.

**Implementation:**
```tsx
// ✅ Tree-shakeable lodash imports
import debounce from 'lodash-es/debounce';
import throttle from 'lodash-es/throttle';
import uniq from 'lodash-es/uniq';

export function SearchInput() {
  const debouncedSearch = debounce((query: string) => {
    performSearch(query);
  }, 300);

  return <input onChange={(e) => debouncedSearch(e.target.value)} />;
}

// ✅ Lazy load heavy libraries
import { lazy, Suspense } from 'react';

// Charts only loaded when needed
const ChartComponent = lazy(() => 
  import('recharts').then(module => ({
    default: module.LineChart
  }))
);

// PDF viewer only loaded when needed
const PDFViewer = lazy(() => import('react-pdf'));

// Code editor only loaded when needed  
const CodeEditor = lazy(() => import('@monaco-editor/react'));

export function DocumentPage() {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPDF(true)}>View PDF</button>
      {showPDF && (
        <Suspense fallback={<LoadingSpinner />}>
          <PDFViewer file="/document.pdf" />
        </Suspense>
      )}
    </div>
  );
}

// ✅ Use native APIs instead of heavy libraries
// Date formatting with native Intl
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Relative time with native Intl
export function formatRelativeTime(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = date.getTime() - Date.now();
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  return rtf.format(days, 'day');
}

// Number formatting with native Intl
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// ✅ Conditional imports based on features
export function App() {
  const [showEditor, setShowEditor] = useState(false);

  // Only import editor when feature is used
  const loadEditor = async () => {
    const { Editor } = await import('./features/editor');
    // Use Editor
  };

  return (
    <button onClick={loadEditor}>Open Editor</button>
  );
}

// ✅ Virtual scrolling for large lists
import { useVirtualizer } from '@tanstack/react-virtual';

export function LargeList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} className="h-96 overflow-auto">
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <div key={virtualRow.index}>
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 📤 Barrel Export Patterns

Create efficient barrel files with selective exports for better tree-shaking.

**Implementation:**
```typescript
// ✅ components/index.ts - Selective component exports
export { Button } from './Button';
export { Input } from './Input';
export { Select } from './Select';
export { Checkbox } from './Checkbox';
export { Dialog } from './Dialog';

// Re-export types separately
export type { ButtonProps } from './Button';
export type { InputProps } from './Input';
export type { SelectProps } from './Select';

// ✅ utils/index.ts - Group related utilities
export { formatDate, formatCurrency, formatPercent } from './formatters';
export { validateEmail, validatePhone, validateUrl } from './validators';
export { debounce, throttle } from './performance';

// ✅ hooks/index.ts - Custom hooks
export { useAuth } from './useAuth';
export { useLocalStorage } from './useLocalStorage';
export { useDebounce } from './useDebounce';
export { useMediaQuery } from './useMediaQuery';

// ✅ types/index.ts - Type definitions
export type { User, UserRole, UserStatus } from './user';
export type { Product, ProductCategory } from './product';
export type { Order, OrderStatus, OrderItem } from './order';

// ✅ constants/index.ts - Application constants
export { API_ROUTES } from './routes';
export { ERROR_MESSAGES } from './messages';
export { VALIDATION_RULES } from './validation';

// Usage: Import what you need
import { Button, Input } from '@/components';
import { formatDate, validateEmail } from '@/utils';
import { useAuth, useLocalStorage } from '@/hooks';
import type { User, Product } from '@/types';
```

## 🔧 Vite Configuration Best Practices

Configure Vite for optimal development and build performance.

**Implementation:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh in development
      fastRefresh: true,
    }),
  ],
  
  // Path aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  
  // Build optimization
  build: {
    // Generate source maps for production debugging
    sourcemap: true,
    
    // Manual chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          
          // Feature chunks
          'feature-charts': ['recharts'],
          'feature-forms': ['react-hook-form', 'zod'],
        },
      },
    },
    
    // Increase chunk size warning limit (if needed)
    chunkSizeWarningLimit: 1000,
  },
  
  // Development server
  server: {
    port: 3000,
    open: true,
    
    // Proxy API requests in development
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  
  // Preview server (for testing builds locally)
  preview: {
    port: 4173,
  },
});
```

## 📦 Package.json Scripts

Define useful scripts for building and testing.

**Implementation:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "type-check": "tsc -b --noEmit",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "analyze": "vite-bundle-visualizer"
  }
}
```

---

## 📚 Resources

- [Vite Guide](https://vitejs.dev/guide/)
- [Vite Asset Handling](https://vitejs.dev/guide/assets.html)
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)
- [React Code Splitting](https://react.dev/reference/react/lazy)
