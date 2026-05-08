---
name: TypeScript Implementation
description: Implement type-safe TypeScript code using unknown types, generics, satisfies operator, proper type definitions, and utility types for maintainable applications
applyTo: '**/*.ts, **/*.tsx, src/**'
---

Build type-safe, maintainable TypeScript applications with proper type definitions, generics, and modern TypeScript features.

## 🔒 Unknown Types with Type Narrowing

Use `unknown` for truly unknown types and narrow them safely with type guards.

**Implementation:**
```typescript
// ✅ API response with unknown data
async function fetchData(url: string): Promise<unknown> {
  const response = await fetch(url);
  return response.json();
}

// ✅ Type guard for validation
interface User {
  id: string;
  name: string;
  email: string;
}

function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data &&
    typeof (data as User).id === 'string' &&
    typeof (data as User).name === 'string' &&
    typeof (data as User).email === 'string'
  );
}

// ✅ Safe usage with type narrowing
async function getUser(id: string): Promise<User> {
  const data = await fetchData(`/api/users/${id}`);
  
  if (!isUser(data)) {
    throw new Error('Invalid user data');
  }
  
  return data; // TypeScript knows data is User
}

// ✅ Type guard with Zod for complex validation
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
});

type User = z.infer<typeof UserSchema>;

async function getUserWithZod(id: string): Promise<User> {
  const data: unknown = await fetchData(`/api/users/${id}`);
  return UserSchema.parse(data); // Throws if invalid
}

// ✅ Type narrowing with instanceof
function processValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  
  if (value instanceof Date) {
    return value.toISOString();
  }
  
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  
  return String(value);
}

// ✅ Type narrowing with in operator
interface Dog {
  type: 'dog';
  bark: () => void;
}

interface Cat {
  type: 'cat';
  meow: () => void;
}

type Pet = Dog | Cat;

function handlePet(pet: unknown): void {
  if (
    typeof pet === 'object' &&
    pet !== null &&
    'type' in pet
  ) {
    if (pet.type === 'dog' && 'bark' in pet) {
      (pet as Dog).bark();
    } else if (pet.type === 'cat' && 'meow' in pet) {
      (pet as Cat).meow();
    }
  }
}

// ✅ Error handling with unknown
try {
  await someAsyncOperation();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
  } else {
    console.error('Unknown error:', error);
  }
}

// ✅ Type narrowing helper
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value must be a string');
  }
}

function processInput(input: unknown): string {
  assertIsString(input);
  return input.toUpperCase(); // TypeScript knows input is string
}
```

## 🔄 Generics for Type-Safe Functions

Use generics to create reusable, type-safe functions and components.

**Implementation:**
```typescript
// ✅ Generic array utilities
function first<T>(array: T[]): T | undefined {
  return array[0];
}

function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

function filterNotNull<T>(array: (T | null | undefined)[]): T[] {
  return array.filter((item): item is T => item != null);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const firstNum = first(numbers); // number | undefined

const users = [{ name: 'Alice' }, { name: 'Bob' }];
const firstUser = first(users); // { name: string } | undefined

// ✅ Generic Promise wrapper
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw lastError!;
}

// Usage
const userData = await withRetry(() => fetch('/api/user').then(r => r.json()));

// ✅ Generic React component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={keyExtractor(item)}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// Usage with type inference
<List
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
  keyExtractor={(user) => user.id}
/>

// ✅ Generic state management
interface State<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function createStateManager<T>() {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const setData = (data: T) => {
    setState({ data, loading: false, error: null });
  };

  const setLoading = () => {
    setState(prev => ({ ...prev, loading: true }));
  };

  const setError = (error: Error) => {
    setState({ data: null, loading: false, error });
  };

  return { state, setData, setLoading, setError };
}

// ✅ Generic API client
class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }

  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<TResponse> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }
}

// Usage with type inference
const client = new ApiClient();
const user = await client.get<User>('/api/users/1');
const created = await client.post<CreateUserInput, User>('/api/users', {
  name: 'Alice',
  email: 'alice@example.com',
});

// ✅ Generic form hook
interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
}

function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
  });

  const setValue = <K extends keyof T>(field: K, value: T[K]) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true },
    }));
  };

  const setError = <K extends keyof T>(field: K, error: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: error },
    }));
  };

  return { state, setValue, setError };
}

// Usage
const form = useForm({ name: '', email: '', age: 0 });
form.setValue('name', 'Alice'); // Type-safe
// form.setValue('invalid', 'test'); // Error: invalid field
```

## ✨ Satisfies Operator for Type Validation

Use `satisfies` to validate types without widening them.

**Implementation:**
```typescript
// ✅ Config with precise types using satisfies
const routes = {
  home: '/',
  about: '/about',
  contact: '/contact',
  users: '/users',
} satisfies Record<string, string>;

// Type is { home: '/', about: '/about', ... }, not Record<string, string>
const homePath = routes.home; // Type: '/', not string

// ✅ API endpoints with satisfies
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiEndpoint {
  method: HttpMethod;
  path: string;
}

const apiEndpoints = {
  getUser: { method: 'GET', path: '/users/:id' },
  createUser: { method: 'POST', path: '/users' },
  updateUser: { method: 'PUT', path: '/users/:id' },
  deleteUser: { method: 'DELETE', path: '/users/:id' },
} satisfies Record<string, ApiEndpoint>;

// Preserves literal types
apiEndpoints.getUser.method; // Type: 'GET', not HttpMethod

// ✅ Theme configuration
interface Theme {
  colors: Record<string, string>;
  spacing: Record<string, string>;
}

const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    danger: '#ef4444',
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
} satisfies Theme;

// Autocomplete works for specific keys
theme.colors.primary; // ✓
// theme.colors.invalid; // Error

// ✅ Component variants with satisfies
interface ButtonVariants {
  [key: string]: {
    className: string;
    defaultProps?: Record<string, unknown>;
  };
}

const buttonVariants = {
  primary: {
    className: 'bg-primary text-primary-foreground',
    defaultProps: { type: 'button' },
  },
  secondary: {
    className: 'bg-secondary text-secondary-foreground',
  },
  outline: {
    className: 'border border-input bg-background',
  },
} satisfies ButtonVariants;

// Preserves exact variant names
type VariantKey = keyof typeof buttonVariants; // 'primary' | 'secondary' | 'outline'

// ✅ Environment variables with satisfies
interface EnvConfig {
  apiUrl: string;
  apiKey: string;
  environment: 'development' | 'production' | 'test';
}

const envConfig = {
  apiUrl: import.meta.env.VITE_API_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  environment: import.meta.env.MODE,
} satisfies EnvConfig;

// ✅ Feature flags with satisfies
const featureFlags = {
  enableNewUI: true,
  enableBetaFeatures: false,
  maxUploadSize: 10485760,
} satisfies Record<string, boolean | number>;

// Type: { enableNewUI: true, enableBetaFeatures: false, ... }
if (featureFlags.enableNewUI) {
  // Precise boolean literal type
}

// ✅ Icon mapping with satisfies
const iconMap = {
  user: '👤',
  settings: '⚙️',
  home: '🏠',
  logout: '🚪',
} satisfies Record<string, string>;

type IconName = keyof typeof iconMap; // 'user' | 'settings' | 'home' | 'logout'
```

## 🛡️ Type Assertions with Justification

Use type assertions sparingly and always with comments explaining why they're safe.

**Implementation:**
```typescript
// ✅ Justified type assertion after validation
interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  // Assertion safe: API contract guarantees User shape after successful response
  if (response.ok && isValidUser(data)) {
    return data as User;
  }
  
  throw new Error('Invalid user data');
}

// ✅ DOM element assertion with null check
function setupModal() {
  const modalElement = document.getElementById('modal');
  
  if (!modalElement) {
    throw new Error('Modal element not found');
  }
  
  // Safe: verified element exists
  const modal = modalElement as HTMLDialogElement;
  modal.showModal();
}

// ✅ Type assertion after runtime check
interface Dog {
  type: 'dog';
  bark: () => void;
}

interface Cat {
  type: 'cat';
  meow: () => void;
}

type Animal = Dog | Cat;

function handleAnimal(animal: Animal) {
  if (animal.type === 'dog') {
    // Safe: discriminated union narrowing confirmed
    (animal as Dog).bark();
  } else {
    // Safe: only Cat remains
    (animal as Cat).meow();
  }
}

// ✅ Better: Use type guards instead
function isDog(animal: Animal): animal is Dog {
  return animal.type === 'dog';
}

function handleAnimalBetter(animal: Animal) {
  if (isDog(animal)) {
    animal.bark(); // No assertion needed
  } else {
    animal.meow(); // TypeScript knows it's Cat
  }
}

// ✅ Event target assertion with validation
function handleClick(event: React.MouseEvent) {
  const target = event.target;
  
  if (target instanceof HTMLButtonElement) {
    // Safe: instanceof check confirms type
    const button = target as HTMLButtonElement;
    button.disabled = true;
  }
}

// ✅ JSON parse with validation
function parseConfig(jsonString: string): Config {
  const parsed: unknown = JSON.parse(jsonString);
  
  if (!isValidConfig(parsed)) {
    throw new Error('Invalid config format');
  }
  
  // Safe: validation function confirmed structure
  return parsed as Config;
}

// ✅ Third-party library types
import { SomeLibrary } from 'untyped-library';

interface ExpectedLibraryShape {
  method: (arg: string) => number;
}

// Document why assertion is necessary
// Safe: Library documentation confirms this shape, but types are missing
const typedLibrary = SomeLibrary as unknown as ExpectedLibraryShape;
```

## 📝 Explicit Prop Types

Define explicit prop types using `interface` or `type` for all components.

**Implementation:**
```tsx
// ✅ Component with interface props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ✅ Component with required and optional props
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  showActions?: boolean;
}

export function UserCard({
  user,
  onEdit,
  onDelete,
  showActions = true,
}: UserCardProps) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {showActions && (
        <div>
          {onEdit && <button onClick={() => onEdit(user.id)}>Edit</button>}
          {onDelete && <button onClick={() => onDelete(user.id)}>Delete</button>}
        </div>
      )}
    </div>
  );
}

// ✅ Component with generic props
interface ListItemProps<T> {
  item: T;
  renderContent: (item: T) => React.ReactNode;
  onSelect?: (item: T) => void;
}

export function ListItem<T>({
  item,
  renderContent,
  onSelect,
}: ListItemProps<T>) {
  return (
    <div onClick={() => onSelect?.(item)}>
      {renderContent(item)}
    </div>
  );
}

// ✅ Component extending HTML props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  ...inputProps
}: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
      {error && <span className="error">{error}</span>}
      {helperText && <span className="helper">{helperText}</span>}
    </div>
  );
}

// ✅ Component with discriminated union props
type AlertProps =
  | {
      variant: 'success';
      message: string;
      onDismiss?: () => void;
    }
  | {
      variant: 'error';
      error: Error;
      onRetry: () => void;
      onDismiss?: () => void;
    };

export function Alert(props: AlertProps) {
  if (props.variant === 'success') {
    return (
      <div className="alert-success">
        {props.message}
        {props.onDismiss && <button onClick={props.onDismiss}>×</button>}
      </div>
    );
  }

  return (
    <div className="alert-error">
      {props.error.message}
      <button onClick={props.onRetry}>Retry</button>
      {props.onDismiss && <button onClick={props.onDismiss}>×</button>}
    </div>
  );
}

// ✅ Component with children variants
interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Card({ title, children, footer, className }: CardProps) {
  return (
    <div className={className}>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
```

## 🎯 Type vs Interface

Use `type` for unions, intersections, and primitives; use `interface` for object shapes.

**Implementation:**
```typescript
// ✅ Interface for object shapes
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// ✅ Type for unions
type UserRole = 'admin' | 'user' | 'guest';

type Status = 'pending' | 'active' | 'inactive' | 'suspended';

type Theme = 'light' | 'dark' | 'system';

// ✅ Type for intersections
type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type SoftDelete = {
  deletedAt: Date | null;
};

type AuditableEntity = Timestamps & SoftDelete;

// ✅ Type for mapped types
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type ReadonlyEntity<T> = {
  readonly [P in keyof T]: T[P];
};

// ✅ Interface for extending
interface ApiResponse {
  status: number;
  message: string;
}

interface SuccessResponse<T> extends ApiResponse {
  data: T;
}

interface ErrorResponse extends ApiResponse {
  error: {
    code: string;
    details?: Record<string, unknown>;
  };
}

// ✅ Type for conditional types
type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type OptionalFields<T> = {
  [P in keyof T]?: T[P];
};

// ✅ Interface for declaration merging (libraries)
interface Window {
  customProperty: string;
}

// Elsewhere in code
interface Window {
  anotherCustomProperty: number;
}

// ✅ Type for function signatures
type EventHandler = (event: Event) => void;

type AsyncOperation<T> = () => Promise<T>;

type Predicate<T> = (value: T) => boolean;

// ✅ Interface for class contracts
interface Logger {
  log(message: string): void;
  error(message: string, error: Error): void;
  warn(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(message);
  }

  error(message: string, error: Error): void {
    console.error(message, error);
  }

  warn(message: string): void {
    console.warn(message);
  }
}

// ✅ Type for utility types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// ✅ Interface for React component props
interface FormProps {
  onSubmit: (data: FormData) => void;
  initialValues?: Partial<FormData>;
  validationSchema?: ValidationSchema;
}

// ✅ Type for complex unions
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

type ApiResult<T> = Result<T, { message: string; code: number }>;
```

## 🔢 As Const Instead of Enum

Use `as const` objects or union literals instead of enums to avoid runtime overhead.

**Implementation:**
```typescript
// ✅ Union type for simple cases
type UserRole = 'admin' | 'user' | 'guest';

const role: UserRole = 'admin';

// ✅ As const object for values with metadata
const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

type UserRole = typeof UserRole[keyof typeof UserRole];

// Usage
function checkPermission(role: UserRole) {
  if (role === UserRole.ADMIN) {
    return true;
  }
  return false;
}

// ✅ As const with descriptions
const Status = {
  PENDING: { value: 'pending', label: 'Pending Approval', color: 'yellow' },
  ACTIVE: { value: 'active', label: 'Active', color: 'green' },
  INACTIVE: { value: 'inactive', label: 'Inactive', color: 'gray' },
  SUSPENDED: { value: 'suspended', label: 'Suspended', color: 'red' },
} as const;

type StatusKey = keyof typeof Status;
type StatusValue = typeof Status[StatusKey]['value'];

// Usage
function getStatusColor(status: StatusValue): string {
  const entry = Object.values(Status).find(s => s.value === status);
  return entry?.color ?? 'gray';
}

// ✅ As const for HTTP methods
const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];

// ✅ As const for routes
const Routes = {
  HOME: '/',
  ABOUT: '/about',
  USERS: '/users',
  USER_DETAIL: '/users/:id',
  SETTINGS: '/settings',
} as const;

type Route = typeof Routes[keyof typeof Routes];

// ✅ As const for configuration
const Config = {
  API_VERSION: 'v1',
  MAX_RETRIES: 3,
  TIMEOUT_MS: 5000,
  CACHE_DURATION: 3600,
} as const;

// Type-safe access
const timeout: 5000 = Config.TIMEOUT_MS; // Literal type

// ✅ As const for error codes
const ErrorCode = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];

interface ApiError {
  code: ErrorCode;
  message: string;
}

// ✅ As const array for iteration
const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'ja'] as const;

type Language = typeof SUPPORTED_LANGUAGES[number]; // 'en' | 'es' | 'fr' | 'de' | 'ja'

// ✅ As const for feature flags
const FeatureFlags = {
  ENABLE_NEW_UI: true,
  ENABLE_BETA_FEATURES: false,
  MAX_UPLOAD_SIZE: 10485760,
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf'],
} as const;

type FeatureFlag = keyof typeof FeatureFlags;
```

## 📋 Generic Constraints

Add constraints to generics to ensure type requirements are met.

**Implementation:**
```typescript
// ✅ Generic with object constraint
function getProperty<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}

// Usage
const user = { name: 'Alice', age: 30 };
const name = getProperty(user, 'name'); // Type: string
const age = getProperty(user, 'age'); // Type: number
// getProperty(user, 'invalid'); // Error

// ✅ Generic with specific shape constraint
interface Identifiable {
  id: string | number;
}

function findById<T extends Identifiable>(
  items: T[],
  id: string | number
): T | undefined {
  return items.find(item => item.id === id);
}

// Usage
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const user = findById(users, 1); // Works

// ✅ Generic with constructor constraint
interface Constructor<T> {
  new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
  return new ctor(...args);
}

// Usage
class User {
  constructor(public name: string, public email: string) {}
}

const user = createInstance(User, 'Alice', 'alice@example.com');

// ✅ Generic with multiple constraints
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Named {
  name: string;
}

function sortByDate<T extends Timestamped>(items: T[]): T[] {
  return [...items].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );
}

function sortByName<T extends Named>(items: T[]): T[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}

// ✅ Generic with union constraint
function processValue<T extends string | number>(value: T): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// ✅ Generic with array constraint
function concatenate<T extends unknown[]>(...arrays: T[]): T[number][] {
  return arrays.flat();
}

// ✅ Generic React component with constraint
interface WithId {
  id: string | number;
}

interface TableProps<T extends WithId> {
  data: T[];
  columns: {
    key: keyof T;
    label: string;
  }[];
  onRowClick?: (row: T) => void;
}

function Table<T extends WithId>({
  data,
  columns,
  onRowClick,
}: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id} onClick={() => onRowClick?.(row)}>
            {columns.map(col => (
              <td key={String(col.key)}>
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ✅ Generic hook with constraint
function useLocalStorage<T extends string | number | boolean | object>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
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
```

## 📤 Explicit Return Types

Declare explicit return types on exported functions and hooks for better API contracts.

**Implementation:**
```typescript
// ✅ Utility function with explicit return
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function parseJSON<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}

// ✅ Async function with explicit return
export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export async function saveUser(user: User): Promise<void> {
  await fetch(`/api/users/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
}

// ✅ Custom hook with explicit return
export function useAuth(): {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
} {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const userData = await authService.login(credentials);
    setUser(userData);
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
}

// ✅ Hook with tuple return type
export function useToggle(initialValue: boolean = false): [
  boolean,
  () => void,
  (value: boolean) => void
] {
  const [value, setValue] = useState(initialValue);

  const toggle = (): void => {
    setValue(prev => !prev);
  };

  const set = (newValue: boolean): void => {
    setValue(newValue);
  };

  return [value, toggle, set];
}

// ✅ Service method with explicit return
export class UserService {
  async getAll(page: number = 1, pageSize: number = 20): Promise<PaginatedResponse<User>> {
    const response = await fetch(
      `/api/users?page=${page}&pageSize=${pageSize}`
    );
    return response.json();
  }

  async getById(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }

  async create(data: CreateUserInput): Promise<User> {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(id: string): Promise<void> {
    await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }
}

// ✅ Complex return type with type alias
type QueryResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

export function useQuery<T>(
  fetcher: () => Promise<T>
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = async (): Promise<void> => {
    setLoading(true);
    try {
      const result = await fetcher();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, error, loading, refetch };
}

// ✅ Discriminated union return type
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export async function tryCatch<T>(
  fn: () => Promise<T>
): Promise<Result<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

## ⛓️ Optional Chaining and Nullish Coalescing

Use optional chaining (`?.`) and nullish coalescing (`??`) for safe null/undefined handling.

**Implementation:**
```typescript
// ✅ Optional chaining for nested objects
interface User {
  id: string;
  name: string;
  profile?: {
    avatar?: string;
    bio?: string;
    social?: {
      twitter?: string;
      github?: string;
    };
  };
}

function getUserAvatar(user: User): string {
  // Safe access to deeply nested optional properties
  return user.profile?.avatar ?? '/default-avatar.png';
}

function getUserTwitter(user: User): string | undefined {
  return user.profile?.social?.twitter;
}

// ✅ Optional chaining with method calls
interface Logger {
  log?: (message: string) => void;
  error?: (message: string) => void;
}

function logMessage(logger: Logger | null | undefined, message: string): void {
  // Safe method call - only executes if logger and log exist
  logger?.log?.(message);
}

// ✅ Optional chaining with array access
interface Post {
  comments?: Array<{
    id: string;
    text: string;
    author?: {
      name: string;
    };
  }>;
}

function getFirstCommentAuthor(post: Post): string {
  return post.comments?.[0]?.author?.name ?? 'Anonymous';
}

// ✅ Nullish coalescing for default values
function getUserDisplayName(user: User | null | undefined): string {
  // Only uses fallback for null/undefined, not for empty string
  return user?.name ?? 'Guest User';
}

function getPageSize(size: number | null | undefined): number {
  // Ignores 0 as valid value, only uses default for null/undefined
  return size ?? 20;
}

// ✅ Combining optional chaining and nullish coalescing
interface Config {
  api?: {
    baseUrl?: string;
    timeout?: number;
    retries?: number;
  };
}

function getApiConfig(config: Config | undefined) {
  return {
    baseUrl: config?.api?.baseUrl ?? 'https://api.example.com',
    timeout: config?.api?.timeout ?? 5000,
    retries: config?.api?.retries ?? 3,
  };
}

// ✅ Optional chaining in React components
interface UserProfileProps {
  user?: User;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div>
      <h1>{user?.name ?? 'Anonymous'}</h1>
      {user?.profile?.avatar && (
        <img src={user.profile.avatar} alt={user.name} />
      )}
      <p>{user?.profile?.bio ?? 'No bio available'}</p>
    </div>
  );
}

// ✅ Optional chaining with logical AND
function displayUserInfo(user: User | null) {
  // Short-circuit if user or profile doesn't exist
  if (user?.profile?.bio) {
    console.log(user.profile.bio);
  }
}

// ✅ Array operations with optional chaining
interface ApiResponse {
  data?: {
    users?: User[];
  };
}

function getUserCount(response: ApiResponse): number {
  return response.data?.users?.length ?? 0;
}

function getFirstUser(response: ApiResponse): User | undefined {
  return response.data?.users?.[0];
}

// ✅ Nullish coalescing assignment
let config: Config | undefined;

function initializeConfig(): void {
  // Only assigns if config is null/undefined
  config ??= { api: { baseUrl: 'https://api.example.com' } };
}

// ✅ Complex conditional with optional chaining
interface Product {
  id: string;
  price?: number;
  discount?: {
    percentage?: number;
    validUntil?: Date;
  };
}

function calculatePrice(product: Product): number {
  const basePrice = product.price ?? 0;
  const discountPercentage = product.discount?.percentage ?? 0;
  const isValidDiscount = 
    product.discount?.validUntil && 
    new Date() < product.discount.validUntil;

  if (isValidDiscount) {
    return basePrice * (1 - discountPercentage / 100);
  }

  return basePrice;
}
```

## 🛠️ Utility Types

Use TypeScript utility types for type transformations.

**Implementation:**
```typescript
// ✅ Partial for optional updates
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

function updateUser(id: string, updates: Partial<User>): void {
  // Updates can contain any subset of User properties
  // { name: 'Alice' } ✓
  // { email: 'new@email.com', age: 30 } ✓
}

// ✅ Required for ensuring all fields
interface Config {
  apiKey?: string;
  apiUrl?: string;
  timeout?: number;
}

function validateConfig(config: Required<Config>): boolean {
  // All fields must be present
  return config.apiKey.length > 0 && config.apiUrl.length > 0;
}

// ✅ Pick for selecting specific fields
type UserPreview = Pick<User, 'id' | 'name'>;

function getUserPreviews(users: User[]): UserPreview[] {
  return users.map(user => ({
    id: user.id,
    name: user.name,
  }));
}

// ✅ Omit for excluding fields
type UserWithoutSensitive = Omit<User, 'email' | 'age'>;

function getPublicUserData(user: User): UserWithoutSensitive {
  const { email, age, ...publicData } = user;
  return publicData;
}

// ✅ Record for key-value maps
type UserRole = 'admin' | 'user' | 'guest';

type Permissions = Record<UserRole, string[]>;

const permissions: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read'],
};

// ✅ Readonly for immutable types
type ReadonlyUser = Readonly<User>;

function processUser(user: ReadonlyUser): void {
  // user.name = 'New Name'; // Error
  console.log(user.name); // ✓
}

// ✅ ReturnType for function return types
function fetchUser(id: string) {
  return {
    id,
    name: 'Alice',
    email: 'alice@example.com',
  };
}

type FetchUserResult = ReturnType<typeof fetchUser>;

// ✅ Parameters for function parameter types
function createUser(name: string, email: string, age: number): User {
  return { id: '1', name, email, age };
}

type CreateUserParams = Parameters<typeof createUser>; // [string, string, number]

// ✅ Awaited for promise types
type UserPromise = Promise<User>;
type UserType = Awaited<UserPromise>; // User

async function fetchUsers(): Promise<User[]> {
  return [];
}

type FetchUsersResult = Awaited<ReturnType<typeof fetchUsers>>; // User[]

// ✅ NonNullable for removing null/undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>; // string

// ✅ Extract for union filtering
type Status = 'pending' | 'active' | 'inactive' | 'deleted';
type ActiveStatus = Extract<Status, 'pending' | 'active'>; // 'pending' | 'active'

// ✅ Exclude for union removal
type NonDeletedStatus = Exclude<Status, 'deleted'>; // 'pending' | 'active' | 'inactive'

// ✅ Combining utility types
type CreateUserInput = Omit<User, 'id'>;
type UpdateUserInput = Partial<CreateUserInput>;
type UserResponse = Required<Pick<User, 'id' | 'name'>> & Partial<Omit<User, 'id' | 'name'>>;

// ✅ Custom utility type
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Settings {
  theme: {
    mode: 'light' | 'dark';
    primaryColor: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
  };
}

function updateSettings(settings: DeepPartial<Settings>): void {
  // { theme: { mode: 'dark' } } ✓
  // { notifications: { email: false } } ✓
}
```

---

## 📚 Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
