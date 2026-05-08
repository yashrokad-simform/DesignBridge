---
name: Security Implementation
description: Implement secure applications with proper secret management, XSS prevention, input validation, secure storage, and dependency security for TypeScript/React applications
applyTo: '**/*.ts, **/*.tsx, **/*.js, **/*.jsx, src/**, **/.env*, .gitignore'
---

Build secure applications by implementing proper secret management, preventing XSS attacks, validating inputs, and following security best practices.

## 🔐 Secret Management

Store sensitive configuration securely using environment variables with proper access control.

**Implementation:**
```typescript
// ✅ .env file (gitignored)
/*
# Server-side secrets (no VITE_ prefix - not exposed to client)
DATABASE_URL=postgresql://localhost:5432/mydb
API_SECRET_KEY=your-secret-key-here
STRIPE_SECRET_KEY=sk_test_xxx

# Client-side environment variables (VITE_ prefix required)
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My Application
VITE_ENABLE_ANALYTICS=true
*/

// ✅ .env.example (committed to git)
/*
# Server Configuration
DATABASE_URL=
API_SECRET_KEY=
STRIPE_SECRET_KEY=

# Client Configuration
VITE_API_URL=
VITE_APP_NAME=
VITE_ENABLE_ANALYTICS=
*/

// ✅ .gitignore (always ignore env files)
/*
.env
.env.local
.env.*.local
.env.production
*/

// ✅ Type-safe environment configuration
// config/env.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_ENABLE_ANALYTICS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
} as const;

// Validate required environment variables
function validateEnv() {
  const required = ['VITE_API_URL', 'VITE_APP_NAME'];
  const missing = required.filter(
    (key) => !import.meta.env[key as keyof ImportMetaEnv]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

validateEnv();

// ✅ Use configuration in application
// services/api.ts
import { config } from '@/config/env';

export async function fetchData(endpoint: string) {
  const response = await fetch(`${config.apiUrl}${endpoint}`);
  return response.json();
}

// ✅ Server-side secret usage (backend/API routes)
// api/payment.ts (backend)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPayment(amount: number) {
  return await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });
}

// ✅ Conditional secrets for different environments
// config/env.ts
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

export const config = {
  apiUrl: isDevelopment
    ? 'http://localhost:3000'
    : import.meta.env.VITE_API_URL,
  enableDebugMode: isDevelopment,
  logLevel: isDevelopment ? 'debug' : 'error',
};
```

## 🛡️ XSS Prevention

Protect against Cross-Site Scripting by properly handling user-generated content.

**Implementation:**
```tsx
// ✅ React automatically escapes content (safe by default)
function UserComment({ comment }: { comment: string }) {
  // React escapes the comment automatically
  return <p>{comment}</p>;
}

function UserProfile({ user }: { user: User }) {
  return (
    <div>
      {/* All these are safe - React escapes automatically */}
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <span>{user.location}</span>
    </div>
  );
}

// ✅ Sanitize HTML before rendering with DOMPurify
import DOMPurify from 'isomorphic-dompurify';

interface RichTextProps {
  content: string;
}

function RichTextContent({ content }: RichTextProps) {
  // Sanitize HTML content before rendering
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'title', 'target'],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="rich-text"
    />
  );
}

// ✅ Strict sanitization for user-generated HTML
function BlogPost({ content }: { content: string }) {
  const sanitizedHTML = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'strong', 'em', 'u', 'a', 'ul', 'ol', 'li',
      'blockquote', 'code', 'pre', 'br',
    ],
    ALLOWED_ATTR: {
      'a': ['href', 'title', 'target', 'rel'],
      'img': ['src', 'alt', 'title'],
    },
    ALLOW_DATA_ATTR: false,
  });

  return <article dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}

// ✅ Markdown rendering with sanitization
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

function MarkdownRenderer({ markdown }: { markdown: string }) {
  const rawHTML = marked(markdown);
  const sanitizedHTML = DOMPurify.sanitize(rawHTML);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}

// ✅ Safe attribute binding
function DynamicImage({ src, alt }: { src: string; alt: string }) {
  // React escapes attribute values automatically
  return <img src={src} alt={alt} />;
}

// ✅ Use textContent over innerHTML for plain text
function copyToClipboard(text: string) {
  const element = document.createElement('textarea');
  element.textContent = text; // Safe - no HTML parsing
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
}

// ✅ CSP (Content Security Policy) header configuration
/*
// In your server configuration (e.g., Nginx, Express)
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://trusted-cdn.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
*/
```

## 🧹 Input Sanitization

Validate and sanitize all user inputs before processing or storing.

**Implementation:**
```typescript
// ✅ Schema validation with Zod
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50).trim(),
  email: z.string().email().toLowerCase(),
  age: z.number().int().min(13).max(120),
  bio: z.string().max(500).trim().optional(),
  website: z.string().url().optional(),
});

type UserInput = z.infer<typeof userSchema>;

function validateUserInput(data: unknown): UserInput {
  return userSchema.parse(data);
}

// ✅ Form validation with React Hook Form + Zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registrationSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

type RegistrationData = z.infer<typeof registrationSchema>;

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationData) => {
    // Data is validated and sanitized
    await api.register(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} />
      {errors.username && <span>{errors.username.message}</span>}
      
      <input {...register('email')} type="email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Register</button>
    </form>
  );
}

// ✅ Sanitize strings before API calls
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .slice(0, 1000); // Limit length
}

function sanitizeSearchQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Only alphanumeric, spaces, hyphens
    .slice(0, 100);
}

// ✅ URL parameter encoding
function buildSearchUrl(query: string, filters: Record<string, string>): string {
  const params = new URLSearchParams();
  
  // Properly encode query
  params.set('q', query);
  
  // Encode filter values
  Object.entries(filters).forEach(([key, value]) => {
    params.set(key, value);
  });
  
  return `/search?${params.toString()}`;
}

// ✅ File upload validation
const fileUploadSchema = z.object({
  name: z.string().regex(/^[\w\-. ]+$/),
  type: z.enum(['image/jpeg', 'image/png', 'image/gif', 'image/webp']),
  size: z.number().max(5 * 1024 * 1024), // 5MB max
});

function validateFileUpload(file: File): boolean {
  try {
    fileUploadSchema.parse({
      name: file.name,
      type: file.type,
      size: file.size,
    });
    return true;
  } catch {
    return false;
  }
}

// ✅ Input maxLength attributes
function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <input
      type="search"
      maxLength={100}
      placeholder="Search..."
      onChange={(e) => onSearch(sanitizeSearchQuery(e.target.value))}
    />
  );
}

// ✅ Textarea with character limit
function CommentBox() {
  const [text, setText] = useState('');
  const maxLength = 500;

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, maxLength))}
        maxLength={maxLength}
        placeholder="Write a comment..."
      />
      <span>{text.length} / {maxLength}</span>
    </div>
  );
}
```

## ✅ Safe Dynamic Code Execution

Use secure alternatives to `eval()` for dynamic operations.

**Implementation:**
```typescript
// ✅ Parse JSON safely
function parseJsonData(jsonString: string): unknown {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Invalid JSON:', error);
    return null;
  }
}

// ✅ Dynamic property access with object lookup
const handlers = {
  add: (a: number, b: number) => a + b,
  subtract: (a: number, b: number) => a - b,
  multiply: (a: number, b: number) => a * b,
  divide: (a: number, b: number) => a / b,
} as const;

type Operation = keyof typeof handlers;

function calculate(operation: Operation, a: number, b: number): number {
  const handler = handlers[operation];
  if (!handler) {
    throw new Error(`Unknown operation: ${operation}`);
  }
  return handler(a, b);
}

// ✅ Dynamic component rendering with lookup
const componentMap = {
  button: Button,
  input: Input,
  select: Select,
  textarea: TextArea,
} as const;

type ComponentType = keyof typeof componentMap;

function DynamicComponent({ type, ...props }: { type: ComponentType }) {
  const Component = componentMap[type];
  if (!Component) {
    return null;
  }
  return <Component {...props} />;
}

// ✅ Configuration-driven behavior
interface Action {
  type: 'navigate' | 'alert' | 'log';
  payload: string;
}

function executeAction(action: Action) {
  switch (action.type) {
    case 'navigate':
      window.location.href = action.payload;
      break;
    case 'alert':
      alert(action.payload);
      break;
    case 'log':
      console.log(action.payload);
      break;
    default:
      console.warn('Unknown action type');
  }
}

// ✅ Template string interpolation (safe)
function generateMessage(name: string, score: number): string {
  return `Hello ${name}, your score is ${score}`;
}

// ✅ Dynamic imports for code splitting
async function loadFeature(featureName: string) {
  const validFeatures = ['charts', 'analytics', 'reports'];
  
  if (!validFeatures.includes(featureName)) {
    throw new Error('Invalid feature name');
  }
  
  const module = await import(`./features/${featureName}`);
  return module.default;
}
```

## 🔗 URL Validation

Validate and sanitize URLs to prevent open redirect and XSS vulnerabilities.

**Implementation:**
```typescript
// ✅ Validate URL before navigation
function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    // Only allow http and https protocols
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function safeNavigate(urlString: string) {
  if (isValidUrl(urlString)) {
    window.location.href = urlString;
  } else {
    console.error('Invalid URL:', urlString);
  }
}

// ✅ Validate redirect URLs
function validateRedirectUrl(
  redirectUrl: string,
  allowedDomains: string[]
): boolean {
  try {
    const url = new URL(redirectUrl);
    
    // Check protocol
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return false;
    }
    
    // Check if domain is in allowlist
    return allowedDomains.some(domain => 
      url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

function RedirectPage({ url }: { url: string }) {
  const allowedDomains = ['example.com', 'trusted-partner.com'];
  
  useEffect(() => {
    if (validateRedirectUrl(url, allowedDomains)) {
      window.location.href = url;
    } else {
      console.error('Redirect to untrusted URL blocked:', url);
    }
  }, [url]);

  return <div>Redirecting...</div>;
}

// ✅ Safe external links with security attributes
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = isValidUrl(href);

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

// ✅ Build URLs safely with URLSearchParams
function buildApiUrl(
  endpoint: string,
  params: Record<string, string>
): string {
  const url = new URL(endpoint, config.apiUrl);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  
  return url.toString();
}

// Usage
const apiUrl = buildApiUrl('/search', {
  q: userQuery,
  page: '1',
  limit: '20',
});

// ✅ Validate and parse query parameters
function useQueryParams() {
  const [searchParams] = useSearchParams();
  
  const returnUrl = searchParams.get('returnUrl');
  
  // Validate return URL
  const safeReturnUrl = returnUrl && isValidUrl(returnUrl)
    ? returnUrl
    : '/dashboard';
  
  return { returnUrl: safeReturnUrl };
}

// ✅ Sanitize URLs in user content
function sanitizeUrls(content: string): string {
  return content.replace(/javascript:/gi, '');
}

// ✅ Download links with safety checks
function DownloadButton({ fileUrl }: { fileUrl: string }) {
  const handleDownload = () => {
    if (!isValidUrl(fileUrl)) {
      console.error('Invalid file URL');
      return;
    }

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = '';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return <button onClick={handleDownload}>Download File</button>;
}
```

## 🔒 Dependency Security

Keep dependencies secure and up-to-date with regular audits.

**Implementation:**
```bash
# ✅ Regular security audits
pnpm audit

# ✅ Automatically fix vulnerabilities
pnpm audit --fix

# ✅ Update dependencies
pnpm update

# ✅ Update to latest within version range
pnpm update --latest

# ✅ Check for outdated packages
pnpm outdated

# ✅ Install specific secure version
pnpm add package-name@1.2.3
```

```json
// ✅ package.json - Use exact versions for security-critical packages
{
  "dependencies": {
    "react": "^18.2.0",
    "dompurify": "3.0.6",
    "crypto-js": "4.2.0"
  },
  "scripts": {
    "audit": "pnpm audit",
    "audit:fix": "pnpm audit --fix",
    "check-deps": "pnpm outdated"
  }
}
```

```typescript
// ✅ Use well-maintained, popular packages
// Check npm stats before adding dependencies:
// - Weekly downloads
// - Last publish date
// - Open issues count
// - Security advisories

// ✅ Subresource Integrity (SRI) for CDN resources
function ExternalScript() {
  return (
    <script
      src="https://cdn.example.com/library.js"
      integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
      crossOrigin="anonymous"
    />
  );
}

// ✅ Regular dependency updates schedule
/*
Create a schedule for dependency maintenance:
1. Weekly: `pnpm audit` check
2. Monthly: Update patch versions
3. Quarterly: Review and update minor versions
4. Document breaking changes in CHANGELOG
*/

// ✅ Automated dependency updates with Dependabot
/*
.github/dependabot.yml

version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    reviewers:
      - "team-name"
*/
```

## 💾 Secure Data Storage

Store data securely with proper encryption and access control.

**Implementation:**
```typescript
// ✅ Store only non-sensitive data in localStorage
interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  sidebarCollapsed: boolean;
  notificationsEnabled: boolean;
}

class PreferencesStorage {
  private static KEY = 'user_preferences';

  static save(preferences: UserPreferences): void {
    localStorage.setItem(this.KEY, JSON.stringify(preferences));
  }

  static load(): UserPreferences | null {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static clear(): void {
    localStorage.removeItem(this.KEY);
  }
}

// ✅ httpOnly cookies for authentication (backend)
/*
// Express.js example (backend)
res.cookie('auth_token', token, {
  httpOnly: true,      // Cannot be accessed via JavaScript
  secure: true,        // Only sent over HTTPS
  sameSite: 'strict',  // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
*/

// ✅ Client-side encrypted storage (when localStorage is necessary)
import CryptoJS from 'crypto-js';

class SecureStorage {
  private static ENCRYPTION_KEY = import.meta.env.VITE_STORAGE_KEY!;

  static setItem(key: string, value: unknown): void {
    const jsonString = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(
      jsonString,
      this.ENCRYPTION_KEY
    ).toString();
    localStorage.setItem(key, encrypted);
  }

  static getItem<T>(key: string): T | null {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const decrypted = CryptoJS.AES.decrypt(
        encrypted,
        this.ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);

      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

// ✅ Session storage for temporary data
class SessionStorage {
  static setFormDraft(formId: string, data: unknown): void {
    sessionStorage.setItem(`form_draft_${formId}`, JSON.stringify(data));
  }

  static getFormDraft<T>(formId: string): T | null {
    try {
      const data = sessionStorage.getItem(`form_draft_${formId}`);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static clearFormDraft(formId: string): void {
    sessionStorage.removeItem(`form_draft_${formId}`);
  }
}

// ✅ Clear sensitive data on logout
function useAuth() {
  const logout = useCallback(() => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies (via API call to backend)
    api.post('/auth/logout');
    
    // Redirect to login
    window.location.href = '/login';
  }, []);

  return { logout };
}

// ✅ What to store where
/*
localStorage: 
  ✓ Theme preferences
  ✓ Language settings
  ✓ UI state (sidebar, layout)
  ✓ Non-sensitive user preferences
  ✗ Authentication tokens
  ✗ API keys
  ✗ Personal information
  ✗ Payment information

httpOnly Cookies (backend):
  ✓ Authentication tokens
  ✓ Session IDs
  ✓ Refresh tokens

Memory (React state):
  ✓ Temporary form data
  ✓ Current page state
  ✓ Fetched data (with caching library)
*/
```

## 🌐 CORS & Authentication Headers

Handle authentication securely with proper CORS configuration and httpOnly cookies.

**Implementation:**
```typescript
// ✅ Fetch with credentials (httpOnly cookies)
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    ...options,
    credentials: 'include', // Send httpOnly cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized - redirect to login
      window.location.href = '/login';
    }
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// ✅ API client with automatic credential handling
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      credentials: 'include', // Always include httpOnly cookies
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export const api = new ApiClient(config.apiUrl);

// ✅ Backend CORS configuration example (Express.js)
/*
import cors from 'cors';

app.use(cors({
  origin: 'https://your-frontend-domain.com', // Specific origin
  credentials: true, // Allow credentials (cookies)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
*/

// ✅ CSRF protection with tokens (if using form submissions)
/*
Backend sends CSRF token in response:
res.cookie('csrf_token', csrfToken, {
  httpOnly: false, // Accessible by JS for CSRF protection
  secure: true,
  sameSite: 'strict',
});

Frontend includes token in requests:
*/
async function fetchWithCsrf(endpoint: string, options: RequestInit = {}) {
  const csrfToken = getCookie('csrf_token');

  return fetch(endpoint, {
    ...options,
    credentials: 'include',
    headers: {
      'X-CSRF-Token': csrfToken,
      ...options.headers,
    },
  });
}

function getCookie(name: string): string {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || '';
  }
  return '';
}

// ✅ Handle authentication errors globally
function useApiInterceptor() {
  useEffect(() => {
    const handleUnauthorized = (event: CustomEvent) => {
      // Clear local state
      localStorage.clear();
      
      // Redirect to login
      window.location.href = '/login';
    };

    window.addEventListener('unauthorized', handleUnauthorized as EventListener);

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized as EventListener);
    };
  }, []);
}

// ✅ Refresh token handling
async function refreshAuthToken(): Promise<void> {
  try {
    await fetch(`${config.apiUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // Send refresh token cookie
    });
  } catch (error) {
    // Refresh failed - redirect to login
    window.location.href = '/login';
  }
}
```

## 🔍 Security Testing

Implement security testing practices to catch vulnerabilities early.

**Implementation:**
```typescript
// ✅ Input validation tests
import { describe, it, expect } from 'vitest';
import { sanitizeString, validateEmail } from './validation';

describe('Input Validation', () => {
  it('should sanitize malicious input', () => {
    const malicious = '<script>alert("xss")</script>';
    const sanitized = sanitizeString(malicious);
    expect(sanitized).not.toContain('<script>');
  });

  it('should validate email format', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
  });

  it('should reject SQL injection attempts', () => {
    const sqlInjection = "'; DROP TABLE users; --";
    const sanitized = sanitizeString(sqlInjection);
    expect(sanitized).not.toContain('DROP TABLE');
  });
});

// ✅ XSS prevention tests
describe('XSS Prevention', () => {
  it('should sanitize HTML content', () => {
    const malicious = '<img src=x onerror=alert("xss")>';
    const sanitized = DOMPurify.sanitize(malicious);
    expect(sanitized).not.toContain('onerror');
  });

  it('should preserve safe HTML', () => {
    const safe = '<p>Hello <strong>World</strong></p>';
    const sanitized = DOMPurify.sanitize(safe);
    expect(sanitized).toBe(safe);
  });
});

// ✅ Security headers checklist
/*
Recommended HTTP Security Headers:

Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
*/
```

---

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Zod Validation](https://zod.dev/)
- [Web Security Checklist](https://cheatsheetseries.owasp.org/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
