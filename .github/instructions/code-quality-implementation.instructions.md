---
name: Code Quality & Linting Implementation
description: Write clean, maintainable code following ESLint rules, Prettier formatting, import organization, and React Hooks best practices for TypeScript/JavaScript files
applyTo: '**/*.ts, **/*.tsx, **/*.js, **/*.jsx, src/**'
---

Write high-quality, maintainable code that passes all linting checks with consistent formatting and proper code organization.

## 🎯 ESLint Rule Compliance

Follow ESLint rules to maintain code quality and prevent common errors.

**Implementation:**
```typescript
// ✅ Proper null checks
function getUserName(user: User | null): string {
  if (!user) {
    return 'Guest';
  }
  return user.name;
}

// ✅ Use === instead of ==
if (status === 'active') {
  // Safe equality check
}

// ✅ Consistent return types
function calculateTotal(items: Item[]): number {
  if (items.length === 0) {
    return 0;
  }
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ✅ Proper error handling
async function fetchData(): Promise<Data> {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}

// ✅ Explicit types (no implicit any)
interface FormData {
  name: string;
  email: string;
  age: number;
}

function handleSubmit(data: FormData): void {
  // Process form data
}

// ✅ Switch statements with default case
function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'yellow';
    case 'completed':
      return 'green';
    case 'cancelled':
      return 'red';
    default:
      return 'gray';
  }
}
```

## 🪝 React Hooks Rules

Declare all dependencies in hook arrays to prevent stale closures and bugs.

**Implementation:**
```tsx
// ✅ useEffect with complete dependencies
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        const data = await fetchUserById(userId);
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
  }, [userId]); // All external dependencies listed

  return <div>{user?.name}</div>;
}

// ✅ useCallback with complete dependencies
function SearchableList({ items, onSelect }: Props) {
  const [query, setQuery] = useState('');

  const handleSelect = useCallback((item: Item) => {
    console.log(`Selected: ${item.name}`);
    onSelect(item);
  }, [onSelect]); // Include onSelect dependency

  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]); // Both dependencies listed

  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      {filteredItems.map(item => (
        <button key={item.id} onClick={() => handleSelect(item)}>
          {item.name}
        </button>
      ))}
    </div>
  );
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
  }, [value, delay]); // Both value and delay as dependencies

  return debouncedValue;
}

// ✅ Stable callback references with useCallback
function Form({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email });
  }, [name, email, onSubmit]); // All used values included

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ useEffect cleanup functions
function WebSocketComponent({ url }: { url: string }) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup function
    return () => {
      ws.close();
    };
  }, [url]); // url dependency

  return <div>{messages.map((msg, i) => <p key={i}>{msg}</p>)}</div>;
}
```

## 📦 File Export Patterns

Organize exports properly to support Fast Refresh and maintain clean module boundaries.

**Implementation:**
```tsx
// ✅ Component file - export only component
// components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`btn-${variant}`}
    >
      {children}
    </button>
  );
}

// ✅ Utility file - separate from components
// utils/validation.ts
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
}

export const VALIDATION_MESSAGES = {
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number',
} as const;

// ✅ Constants file - separate from components
// constants/routes.ts
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

export const API_ENDPOINTS = {
  USERS: '/api/users',
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
} as const;

// ✅ Barrel file - can mix types of exports
// components/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Select } from './Select';
export { Dialog } from './Dialog';

// Re-export utilities used by components
export { cn } from '../utils/cn';

// ✅ Type definitions file
// types/user.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'user' | 'guest';

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}
```

## 🧹 Dead Code & Unused Variables

Keep the codebase clean by removing unused code and imports.

**Implementation:**
```typescript
// ✅ Import only what you use
import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/formatters';
import type { User } from '@/types/user';

function UserCard({ user }: { user: User }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Effect logic
  }, []);

  return (
    <div onClick={() => setIsExpanded(!isExpanded)}>
      <h3>{user.name}</h3>
      <p>{formatDate(user.createdAt)}</p>
    </div>
  );
}

// ✅ Remove unused variables immediately
function calculateDiscount(price: number, couponCode: string): number {
  // Use all declared variables
  const discountRate = getDiscountRate(couponCode);
  return price * (1 - discountRate);
}

// ✅ Clean up commented code
function processOrder(order: Order): void {
  validateOrder(order);
  saveOrder(order);
  sendConfirmation(order);
  // Active code only - no commented blocks
}

// ✅ Use TypeScript's unused parameter convention
function handleClick(_event: React.MouseEvent, itemId: string): void {
  // Prefix with _ if parameter is required by interface but not used
  console.log(`Clicked item: ${itemId}`);
}

// ✅ Destructure to use only needed properties
function UserGreeting({ user }: { user: User }) {
  // Extract only what you need
  const { name, email } = user;
  
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>{email}</p>
    </div>
  );
}
```

## 🔍 Console & Debugging

Use proper logging utilities instead of console statements in production code.

**Implementation:**
```typescript
// ✅ Create a logger utility
// lib/logger.ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = import.meta.env.DEV;

  debug(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  info(message: string, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  error(message: string, error?: Error, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, error, ...args);
    
    // Send to error tracking service in production
    if (!this.isDevelopment && error) {
      // Sentry.captureException(error);
    }
  }
}

export const logger = new Logger();

// ✅ Use logger in application code
// services/api.ts
import { logger } from '@/lib/logger';

export async function fetchUsers(): Promise<User[]> {
  try {
    logger.debug('Fetching users from API');
    
    const response = await fetch('/api/users');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    logger.info('Successfully fetched users', { count: data.length });
    
    return data;
  } catch (error) {
    logger.error('Failed to fetch users', error as Error);
    throw error;
  }
}

// ✅ Conditional debugging helper
// utils/debug.ts
export function debugLog(message: string, data?: unknown): void {
  if (import.meta.env.DEV) {
    console.log(`🔍 ${message}`, data);
  }
}

// Usage
import { debugLog } from '@/utils/debug';

function processData(data: Data) {
  debugLog('Processing data', data);
  // Process data
}

// ✅ Performance debugging
export function measurePerformance<T>(
  label: string,
  fn: () => T
): T {
  if (!import.meta.env.DEV) {
    return fn();
  }

  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
  
  return result;
}

// Usage
const result = measurePerformance('Data transformation', () => {
  return transformData(rawData);
});
```

## 📐 Prettier Formatting

Write consistently formatted code with proper indentation, quotes, and spacing.

**Implementation:**
```typescript
// .prettierrc configuration
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}

// ✅ Consistent formatting examples
// 2-space indentation
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const discount = item.discount || 0;
    return sum + (itemTotal - discount);
  }, 0);
}

// Single quotes for strings
const greeting = 'Hello, World!';
const message = `Welcome, ${userName}!`;

// Trailing commas in multi-line structures
const user = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
};

const colors = [
  'red',
  'green',
  'blue',
  'yellow',
];

// Proper spacing around operators
const total = price + tax - discount;
const isValid = age >= 18 && hasLicense;

// Consistent object/array formatting
const config = { timeout: 5000, retries: 3, debug: true };

const longConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token',
  },
};

// Function parameter formatting
function createUser(
  name: string,
  email: string,
  role: UserRole,
  preferences?: UserPreferences
): User {
  return {
    id: generateId(),
    name,
    email,
    role,
    preferences: preferences || getDefaultPreferences(),
  };
}

// JSX formatting
function Card({ title, description, actions }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        <p>{description}</p>
      </div>
      <div className="card-footer">
        {actions.map((action) => (
          <button key={action.id} onClick={action.onClick}>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

## 📥 Import Order

Organize imports in a consistent, logical order for better readability.

**Implementation:**
```typescript
// ✅ Properly organized imports
// 1. External libraries (React ecosystem first)
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';

// 2. Internal aliases - components
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { UserCard } from '@/components/UserCard';

// 3. Internal aliases - hooks
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';

// 4. Internal aliases - utilities
import { cn } from '@/lib/utils';
import { formatDate, formatCurrency } from '@/utils/formatters';

// 5. Internal aliases - services
import { fetchUsers, updateUser } from '@/services/api';

// 6. Relative imports
import { validateForm } from '../utils/validation';
import { UserForm } from './UserForm';
import { UserList } from './UserList';

// 7. Type imports (grouped separately)
import type { User, UserRole } from '@/types/user';
import type { FormData } from '../types';

// Component implementation
export function UserManagement() {
  // Component code
}

// ✅ ESLint plugin configuration for import sorting
// .eslintrc.json
{
  "plugins": ["import"],
  "rules": {
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type"
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "@/**",
            "group": "internal"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  }
}
```

## 🔄 Circular Dependencies

Structure modules with one-way dependencies to avoid circular import issues.

**Implementation:**
```typescript
// ✅ Proper module organization

// types/user.ts - Base types (no imports)
export interface User {
  id: string;
  name: string;
  email: string;
}

// types/order.ts - Depends on user types
import type { User } from './user';

export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

// services/user.service.ts - Implements user operations
import type { User } from '@/types/user';

export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// services/order.service.ts - Depends on user service
import type { Order } from '@/types/order';
import { fetchUser } from './user.service';

export async function fetchOrderWithUser(orderId: string): Promise<Order> {
  const order = await fetchOrder(orderId);
  const user = await fetchUser(order.userId);
  return { ...order, user };
}

// ✅ Shared utilities in separate module
// utils/shared.ts
export function generateId(): string {
  return crypto.randomUUID();
}

export function formatTimestamp(date: Date): string {
  return date.toISOString();
}

// Both services can import from shared utils
// services/user.service.ts
import { generateId } from '@/utils/shared';

// services/order.service.ts
import { generateId } from '@/utils/shared';

// ✅ Use barrel exports to manage dependencies
// components/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';

// Other modules import from barrel
import { Button, Input, Card } from '@/components';

// ✅ Break circular dependencies with events
// Instead of: A imports B, B imports A
// Use: A emits event, B listens to event

// lib/events.ts
import { EventEmitter } from 'events';

export const eventBus = new EventEmitter();

export const EVENTS = {
  USER_UPDATED: 'user:updated',
  ORDER_CREATED: 'order:created',
} as const;

// services/user.service.ts
import { eventBus, EVENTS } from '@/lib/events';

export function updateUser(user: User) {
  // Update user
  eventBus.emit(EVENTS.USER_UPDATED, user);
}

// services/order.service.ts
import { eventBus, EVENTS } from '@/lib/events';

eventBus.on(EVENTS.USER_UPDATED, (user: User) => {
  // React to user update
  refreshOrdersForUser(user.id);
});
```

## 🔧 ESLint Configuration

Comprehensive ESLint setup for TypeScript and React projects.

**Implementation:**
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "react-refresh",
    "import"
  ],
  "rules": {
    // TypeScript
    "@typescript-eslint/no-unused-vars": [
      "error",
      { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { "prefer": "type-imports" }
    ],
    
    // React
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ],
    
    // Import
    "import/no-unresolved": "error",
    "import/no-cycle": "error",
    "import/no-unused-modules": "warn",
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "type"
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }
    ],
    
    // General
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-debugger": "error",
    "prefer-const": "error",
    "no-var": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": true,
      "node": true
    }
  }
}
```

## 📝 Package.json Scripts

Useful scripts for linting and formatting.

**Implementation:**
```json
{
  "scripts": {
    "lint": "eslint . --ext ts,tsx --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,css,md}\"",
    "type-check": "tsc --noEmit",
    "check-all": "pnpm type-check && pnpm lint && pnpm format:check"
  }
}
```

---

## 📚 Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [React Hooks Rules](https://react.dev/reference/rules/rules-of-hooks)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Plugin Import](https://github.com/import-js/eslint-plugin-import)
