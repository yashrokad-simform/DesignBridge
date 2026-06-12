---
name: Tailwind CSS Implementation
description: Implement Tailwind CSS best practices using semantic design tokens, proper dark mode patterns, responsive utilities, and the cn() utility for maintainable styling
applyTo: '**/*.tsx, **/*.jsx, **/*.css, src/components/**'
---

Build maintainable, theme-aware components with Tailwind CSS using semantic design tokens, proper dark mode support, and responsive utilities.

## 🎨 Semantic Design Tokens

Use semantic color tokens that automatically adapt to light and dark themes.

**Implementation:**
```tsx
// ✅ Button with semantic tokens
import { Button } from '@/components/ui/button';

export function ThemedButton() {
  return (
    <Button
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      Click Me
    </Button>
  );
}

// ✅ Card with semantic background and text colors
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function UserCard({ user }: { user: User }) {
  return (
    <Card className="bg-card text-card-foreground border-border">
      <CardHeader>
        <CardTitle className="text-foreground">
          {user.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{user.email}</p>
      </CardContent>
    </Card>
  );
}

// ✅ Alert with semantic accent colors
export function Alert({ message }: { message: string }) {
  return (
    <div className="bg-accent text-accent-foreground rounded-lg p-4">
      <p>{message}</p>
    </div>
  );
}

// ✅ Navigation with semantic colors
export function Navigation() {
  return (
    <nav className="bg-background border-b border-border">
      <ul className="flex gap-4 p-4">
        <li>
          <a
            href="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
}

// ✅ Input with semantic borders and backgrounds
export function SearchInput() {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="bg-background text-foreground border border-input rounded-md px-3 py-2 focus:border-ring focus:ring-2 focus:ring-ring/20"
    />
  );
}

// ✅ Badge with semantic colors
export function StatusBadge({ status }: { status: 'active' | 'pending' | 'inactive' }) {
  const colors = {
    active: 'bg-primary text-primary-foreground',
    pending: 'bg-accent text-accent-foreground',
    inactive: 'bg-muted text-muted-foreground',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[status]}`}>
      {status}
    </span>
  );
}

// ✅ Complete color palette reference
/*
Semantic Tokens:
- bg-background / text-foreground         → Main background and text
- bg-card / text-card-foreground          → Card backgrounds
- bg-primary / text-primary-foreground    → Primary actions
- bg-secondary / text-secondary-foreground → Secondary actions
- bg-accent / text-accent-foreground      → Accents and highlights
- bg-muted / text-muted-foreground        → Subdued text and backgrounds
- bg-destructive / text-destructive-foreground → Destructive actions
- border-border                            → Default borders
- border-input                             → Input borders
- ring-ring                                → Focus rings
*/
```

## 🎭 CSS Variables with @theme

Reference CSS variables using `@theme` in stylesheets for custom component styles.

**Implementation:**
```css
/* ✅ Custom component using @theme */
/* styles/custom-tooltip.css */
.tooltip {
  background-color: @theme(colors.popover);
  color: @theme(colors.popover-foreground);
  border: 1px solid @theme(colors.border);
  border-radius: @theme(borderRadius.md);
  padding: @theme(spacing.2) @theme(spacing.3);
  font-size: @theme(fontSize.sm);
  box-shadow: @theme(boxShadow.md);
}

.tooltip-arrow {
  fill: @theme(colors.popover);
}

/* ✅ Custom scrollbar using theme colors */
/* styles/scrollbar.css */
.custom-scrollbar::-webkit-scrollbar {
  width: @theme(spacing.2);
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: @theme(colors.muted);
  border-radius: @theme(borderRadius.full);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: @theme(colors.muted-foreground / 40%);
  border-radius: @theme(borderRadius.full);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: @theme(colors.muted-foreground / 60%);
}

/* ✅ Gradient using theme colors */
/* styles/gradient-background.css */
.gradient-bg {
  background: linear-gradient(
    135deg,
    @theme(colors.primary / 10%),
    @theme(colors.accent / 10%)
  );
}

/* ✅ Animation with theme values */
/* styles/pulse-animation.css */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: @theme(opacity.50);
  }
}

.pulse {
  animation: pulse @theme(transitionDuration.1000) ease-in-out infinite;
}

/* ✅ Custom focus styles using theme */
/* styles/focus.css */
.custom-focus:focus {
  outline: 2px solid @theme(colors.ring);
  outline-offset: 2px;
  border-radius: @theme(borderRadius.md);
}

/* ✅ Spacing and typography from theme */
/* styles/prose.css */
.prose {
  font-size: @theme(fontSize.base);
  line-height: @theme(lineHeight.relaxed);
  color: @theme(colors.foreground);
}

.prose h1 {
  font-size: @theme(fontSize.4xl);
  font-weight: @theme(fontWeight.bold);
  margin-bottom: @theme(spacing.4);
  color: @theme(colors.foreground);
}

.prose h2 {
  font-size: @theme(fontSize.2xl);
  font-weight: @theme(fontWeight.semibold);
  margin-bottom: @theme(spacing.3);
  color: @theme(colors.foreground);
}

.prose p {
  margin-bottom: @theme(spacing.4);
  color: @theme(colors.muted-foreground);
}

.prose a {
  color: @theme(colors.primary);
  text-decoration: underline;
  text-underline-offset: @theme(spacing.1);
}

.prose a:hover {
  color: @theme(colors.primary / 80%);
}
```

## 🌓 Dark Mode with Semantic Colors

Implement dark mode using `dark:` variants with semantic color tokens.

**Implementation:**
```tsx
// ✅ Component with automatic dark mode support
export function Banner() {
  return (
    <div className="bg-background text-foreground">
      {/* Semantic tokens automatically switch in dark mode */}
      <h1 className="text-2xl font-bold text-foreground">Welcome</h1>
      <p className="text-muted-foreground">Get started with our app</p>
    </div>
  );
}

// ✅ Hero section with dark mode gradient
export function Hero() {
  return (
    <section className="bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Build Something Amazing
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          The best tool for modern development
        </p>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg">
          Get Started
        </button>
      </div>
    </section>
  );
}

// ✅ Card with hover states that work in dark mode
export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-4 hover:border-primary transition-colors">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {product.name}
      </h3>
      <p className="text-muted-foreground mb-4">
        {product.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">
          ${product.price}
        </span>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ✅ Sidebar with dark mode borders
export function Sidebar() {
  return (
    <aside className="bg-card border-r border-border h-screen w-64">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="block px-4 py-2 rounded-md bg-accent text-accent-foreground"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="/users"
              className="block px-4 py-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Users
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

// ✅ Focus states with dark mode support
export function CustomInput() {
  return (
    <input
      type="text"
      className="bg-background text-foreground border border-input rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
    />
  );
}

// ✅ Alert states with dark mode
export function AlertMessage({ type, message }: { type: 'success' | 'error'; message: string }) {
  const styles = {
    success: 'bg-primary/10 text-primary border-primary/20',
    error: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  return (
    <div className={`border rounded-lg p-4 ${styles[type]}`}>
      <p className="font-medium">{message}</p>
    </div>
  );
}

// ✅ Table with dark mode support
export function DataTable({ data }: { data: User[] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-border bg-muted/50">
          <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
            Name
          </th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
            <td className="px-4 py-3 text-sm text-foreground">
              {user.name}
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
              {user.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

## 🎯 Tailwind Utilities Over Inline Styles

Use Tailwind utility classes instead of inline style objects.

**Implementation:**
```tsx
// ✅ Layout with Tailwind utilities
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <nav className="flex items-center space-x-4">
            <a href="/" className="text-foreground font-semibold">
              Logo
            </a>
          </nav>
        </div>
      </header>
      <main className="flex-1 container py-6">
        {children}
      </main>
      <footer className="border-t border-border bg-background">
        <div className="container py-6 text-center text-muted-foreground">
          © 2026 Company Name
        </div>
      </footer>
    </div>
  );
}

// ✅ Grid layout with Tailwind
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ Flexbox utilities
export function UserProfile({ user }: { user: User }) {
  return (
    <div className="flex items-start gap-4">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-16 w-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground">
          {user.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {user.email}
        </p>
      </div>
    </div>
  );
}

// ✅ Positioning with Tailwind
export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-lg bg-card p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
}

// ✅ Typography with Tailwind
export function Article({ article }: { article: Article }) {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        {article.title}
      </h1>
      <p className="text-muted-foreground mb-8">
        {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <div className="space-y-4 text-foreground">
        {article.content}
      </div>
    </article>
  );
}

// ✅ Transitions and transforms
export function AnimatedCard() {
  return (
    <div className="transform rounded-lg bg-card p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold text-foreground">
        Hover me!
      </h3>
    </div>
  );
}
```

## 📱 Mobile-First Responsive Design

Apply responsive utilities in mobile-first order: base → sm: → md: → lg: → xl: → 2xl:

**Implementation:**
```tsx
// ✅ Responsive grid
export function ResponsiveGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.id} className="bg-card rounded-lg p-4">
          {item.name}
        </div>
      ))}
    </div>
  );
}

// ✅ Responsive typography
export function Hero() {
  return (
    <section className="py-12 md:py-16 lg:py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
        Welcome to Our Platform
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl">
        Build amazing applications with our tools
      </p>
    </section>
  );
}

// ✅ Responsive spacing
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}

// ✅ Responsive flex direction
export function SplitLayout({ sidebar, content }: SplitLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-64 flex-shrink-0">
        {sidebar}
      </aside>
      <main className="flex-1">
        {content}
      </main>
    </div>
  );
}

// ✅ Responsive visibility
export function Navigation() {
  return (
    <nav className="flex items-center justify-between">
      <div className="text-xl font-bold">Logo</div>
      
      {/* Mobile menu button - visible on small screens */}
      <button className="lg:hidden p-2">
        <MenuIcon />
      </button>
      
      {/* Desktop menu - hidden on small screens */}
      <ul className="hidden lg:flex gap-6">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}

// ✅ Responsive padding and margins
export function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        {children}
      </div>
    </section>
  );
}

// ✅ Responsive image sizes
export function HeroImage() {
  return (
    <img
      src="/hero.jpg"
      alt="Hero"
      className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
    />
  );
}

// ✅ Responsive columns with different layouts
export function BlogLayout({ posts, sidebar }: BlogLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Posts - full width on mobile, 2/3 on desktop */}
      <div className="w-full lg:w-2/3 space-y-6">
        {posts.map(post => (
          <article key={post.id} className="bg-card rounded-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {post.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
      
      {/* Sidebar - hidden on mobile, 1/3 on desktop */}
      <aside className="hidden lg:block lg:w-1/3">
        {sidebar}
      </aside>
    </div>
  );
}
```

## 🔧 cn() Utility for Conditional Classes

Use the `cn()` utility from `@/lib/utils` for merging and conditional class application.

**Implementation:**
```tsx
import { cn } from '@/lib/utils';

// ✅ Conditional variant classes
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'default',
  size = 'md',
  className,
  children,
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        // Variant styles
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        },
        // Size styles
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        // Custom classes
        className
      )}
    >
      {children}
    </button>
  );
}

// ✅ Conditional state classes
interface InputProps {
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Input({ error, disabled, className, ...props }: InputProps) {
  return (
    <div>
      <input
        className={cn(
          'w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          error && 'border-destructive focus:ring-destructive',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

// ✅ Active state styling
interface NavItemProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export function NavItem({ href, isActive, children }: NavItemProps) {
  return (
    <a
      href={href}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {children}
    </a>
  );
}

// ✅ Multiple conditional classes
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  rounded = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold',
        // Variants
        {
          'bg-primary text-primary-foreground': variant === 'default',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'bg-destructive text-destructive-foreground': variant === 'destructive',
          'border border-input bg-background': variant === 'outline',
        },
        // Sizes
        {
          'px-2 py-0.5 text-xs': size === 'sm',
          'px-2.5 py-1 text-sm': size === 'md',
          'px-3 py-1.5 text-base': size === 'lg',
        },
        // Border radius
        rounded ? 'rounded-full' : 'rounded-md',
        className
      )}
    >
      {children}
    </span>
  );
}

// ✅ Complex conditional logic
interface CardProps {
  elevated?: boolean;
  interactive?: boolean;
  selected?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  elevated = false,
  interactive = false,
  selected = false,
  className,
  children,
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-card text-card-foreground border border-border',
        elevated && 'shadow-lg',
        interactive && 'cursor-pointer transition-all hover:shadow-md',
        selected && 'border-primary ring-2 ring-ring',
        className
      )}
    >
      {children}
    </div>
  );
}

// ✅ Array of conditional classes
interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Alert({ type, icon, className, children }: AlertProps) {
  const typeStyles = {
    info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-900',
    success: 'bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-900',
    warning: 'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-900',
    error: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-900',
  };

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4',
        typeStyles[type],
        className
      )}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex-1">{children}</div>
    </div>
  );
}
```

## 📐 Class Ordering

Order Tailwind classes logically: layout → spacing → typography → colors → effects

**Implementation:**
```tsx
// ✅ Well-ordered classes
export function WellOrderedButton() {
  return (
    <button
      className={cn(
        // Layout
        'flex items-center justify-center',
        // Spacing
        'px-4 py-2 gap-2',
        // Typography
        'text-sm font-medium',
        // Colors
        'bg-primary text-primary-foreground',
        // Effects
        'rounded-md shadow-sm hover:bg-primary/90 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
    >
      Click Me
    </button>
  );
}

// ✅ Card with ordered classes
export function OrderedCard() {
  return (
    <div
      className={cn(
        // Layout
        'flex flex-col',
        // Sizing
        'w-full max-w-sm',
        // Spacing
        'p-6 gap-4',
        // Typography (none here)
        // Colors
        'bg-card text-card-foreground border border-border',
        // Effects
        'rounded-lg shadow-md hover:shadow-lg transition-shadow'
      )}
    >
      <h3 className="text-lg font-semibold text-foreground">
        Card Title
      </h3>
      <p className="text-muted-foreground">
        Card content goes here
      </p>
    </div>
  );
}

// ✅ Input with ordered classes
export function OrderedInput() {
  return (
    <input
      type="text"
      className={cn(
        // Layout
        'flex',
        // Sizing
        'w-full h-10',
        // Spacing
        'px-3 py-2',
        // Typography
        'text-sm placeholder:text-muted-foreground',
        // Colors
        'bg-background text-foreground border border-input',
        // Effects
        'rounded-md',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed'
      )}
    />
  );
}

// ✅ Navigation item with ordered classes
export function OrderedNavItem({ isActive }: { isActive: boolean }) {
  return (
    <a
      href="#"
      className={cn(
        // Layout
        'inline-flex items-center',
        // Spacing
        'px-4 py-2',
        // Typography
        'text-sm font-medium',
        // Colors
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground',
        // Effects
        'rounded-md',
        'hover:bg-accent hover:text-accent-foreground',
        'transition-colors'
      )}
    >
      Dashboard
    </a>
  );
}

// ✅ Complex grid layout with ordered classes
export function OrderedGrid() {
  return (
    <div
      className={cn(
        // Layout
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        // Sizing
        'w-full min-h-screen',
        // Spacing
        'gap-6 p-6',
        // Typography (none)
        // Colors
        'bg-background',
        // Effects (none)
      )}
    >
      {/* Grid items */}
    </div>
  );
}
```

## 🎨 @apply for Repeated Patterns

Use `@apply` for complex repeated patterns in dedicated stylesheets.

**Implementation:**
```css
/* ✅ Button base styles with @apply */
/* styles/components.css */
.btn-base {
  @apply inline-flex items-center justify-center;
  @apply rounded-md font-medium transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
  @apply disabled:opacity-50 disabled:pointer-events-none;
}

.btn-primary {
  @apply btn-base;
  @apply bg-primary text-primary-foreground;
  @apply hover:bg-primary/90;
  @apply h-10 px-4 py-2;
}

.btn-outline {
  @apply btn-base;
  @apply border border-input bg-background;
  @apply hover:bg-accent hover:text-accent-foreground;
  @apply h-10 px-4 py-2;
}

/* ✅ Form input pattern */
.form-input {
  @apply flex w-full rounded-md border border-input;
  @apply bg-background px-3 py-2;
  @apply text-sm text-foreground placeholder:text-muted-foreground;
  @apply focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent;
  @apply disabled:cursor-not-allowed disabled:opacity-50;
}

.form-label {
  @apply text-sm font-medium text-foreground;
  @apply block mb-2;
}

.form-error {
  @apply text-sm text-destructive;
  @apply mt-1;
}

/* ✅ Card patterns */
.card {
  @apply rounded-lg border border-border;
  @apply bg-card text-card-foreground;
  @apply shadow-sm;
}

.card-header {
  @apply flex flex-col space-y-1.5;
  @apply p-6;
}

.card-title {
  @apply text-2xl font-semibold leading-none tracking-tight;
  @apply text-foreground;
}

.card-content {
  @apply p-6 pt-0;
}

/* ✅ Typography scale */
.heading-1 {
  @apply text-4xl font-bold tracking-tight;
  @apply text-foreground;
}

.heading-2 {
  @apply text-3xl font-semibold tracking-tight;
  @apply text-foreground;
}

.heading-3 {
  @apply text-2xl font-semibold tracking-tight;
  @apply text-foreground;
}

.body-text {
  @apply text-base text-foreground;
  @apply leading-relaxed;
}

.muted-text {
  @apply text-sm text-muted-foreground;
}

/* ✅ Container patterns */
.container-fluid {
  @apply w-full px-4 sm:px-6 md:px-8;
  @apply mx-auto;
}

.container-narrow {
  @apply max-w-3xl mx-auto;
  @apply px-4 sm:px-6;
}

.container-wide {
  @apply max-w-7xl mx-auto;
  @apply px-4 sm:px-6 lg:px-8;
}

/* ✅ Focus ring pattern */
.focus-ring {
  @apply focus:outline-none;
  @apply focus-visible:ring-2 focus-visible:ring-ring;
  @apply focus-visible:ring-offset-2 focus-visible:ring-offset-background;
}

/* ✅ Transition patterns */
.transition-base {
  @apply transition-all duration-200 ease-in-out;
}

.transition-slow {
  @apply transition-all duration-300 ease-in-out;
}
```

```tsx
// ✅ Using @apply classes in components
export function FormField({ label, error, ...props }: FormFieldProps) {
  return (
    <div>
      <label className="form-label">
        {label}
      </label>
      <input
        className="form-input"
        {...props}
      />
      {error && (
        <p className="form-error">{error}</p>
      )}
    </div>
  );
}

// ✅ Using card classes
export function ProfileCard({ user }: { user: User }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{user.name}</h3>
      </div>
      <div className="card-content">
        <p className="muted-text">{user.email}</p>
      </div>
    </div>
  );
}

// ✅ Using typography classes
export function Article({ article }: { article: Article }) {
  return (
    <article className="container-narrow py-12">
      <h1 className="heading-1 mb-4">{article.title}</h1>
      <p className="muted-text mb-8">
        {new Date(article.date).toLocaleDateString()}
      </p>
      <div className="body-text space-y-4">
        {article.content}
      </div>
    </article>
  );
}
```

## 🔍 Avoiding !important with Proper Specificity

Structure CSS properly to avoid needing `!important` overrides.

**Implementation:**
```tsx
// ✅ Use cn() to control class precedence
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'default' | 'outline';
  className?: string;
}

export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles first
        'inline-flex items-center justify-center rounded-md px-4 py-2 font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        // Variant styles
        variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'outline' && 'border border-input bg-background hover:bg-accent',
        // Custom classes last (highest priority)
        className
      )}
      {...props}
    />
  );
}

// Usage: custom classes override defaults
<Button className="bg-destructive text-destructive-foreground">
  Delete
</Button>

// ✅ Layer-based specificity in CSS
/* styles/global.css */
@layer base {
  /* Reset and base styles - lowest priority */
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
  }
}

@layer components {
  /* Component patterns - medium priority */
  .btn {
    @apply inline-flex items-center justify-center rounded-md;
  }
}

@layer utilities {
  /* Utilities - highest priority */
  .text-balance {
    text-wrap: balance;
  }
}

// ✅ Component composition for specificity
export function Card({ elevated, className, ...props }: CardProps) {
  // Base card always has these styles
  const baseStyles = 'rounded-lg bg-card text-card-foreground border border-border p-6';
  
  // Elevated adds shadow
  const elevatedStyles = elevated ? 'shadow-lg' : '';
  
  // Custom classes override everything
  return (
    <div
      className={cn(baseStyles, elevatedStyles, className)}
      {...props}
    />
  );
}

// ✅ State-based classes with proper order
export function Input({ error, focused, disabled, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        // Base styles
        'w-full rounded-md border px-3 py-2 text-sm',
        'bg-background text-foreground',
        // State styles in order of precedence
        !error && !focused && 'border-input',
        focused && !error && 'border-ring ring-2 ring-ring/20',
        error && 'border-destructive ring-2 ring-destructive/20',
        disabled && 'opacity-50 cursor-not-allowed',
        // Custom overrides
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}

// ✅ Scoped styles with CSS modules (if needed for complex cases)
// Component.module.css
.wrapper {
  @apply rounded-lg bg-card p-6;
}

.wrapper[data-state="active"] {
  @apply border-primary;
}

// Component.tsx
import styles from './Component.module.css';

export function Component({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={styles.wrapper}
      data-state={isActive ? 'active' : 'inactive'}
    >
      Content
    </div>
  );
}
```

---

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [clsx + tailwind-merge (cn utility)](https://github.com/dcastil/tailwind-merge)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
