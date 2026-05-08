---
name: Accessibility (a11y) Implementation
description: Implement WCAG 2.2 AA accessible components with keyboard navigation, ARIA labels, semantic HTML, focus management, and screen reader support for React/TSX components
applyTo: '**/*.tsx, **/*.jsx, src/components/**, src/pages/**'
---

Build accessible UI components that meet WCAG 2.2 Level AA standards with full keyboard navigation, screen reader support, and visual accessibility.

## ⌨️ Keyboard Navigation

All interactive elements must be keyboard accessible using Tab, Enter, Space, and Escape keys.

**Implementation:**
```tsx
// Use semantic HTML for interactive elements
<button onClick={handleClick}>Submit</button>

// Add keyboard support for custom interactions
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Custom Button
</div>

// Escape key to close dialogs/modals
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose();
  }
};
```

## 🏷️ ARIA Labels for Icon Buttons

Every icon-only button and input requires an accessible label via `aria-label` or visible text.

**Implementation:**
```tsx
// Icon buttons with aria-label
<button aria-label="Delete item" onClick={handleDelete}>
  <Trash2 className="h-4 w-4" />
</button>

<button aria-label="Close dialog" onClick={onClose}>
  <X className="h-5 w-5" />
</button>

// Icon with visible label (preferred)
<button onClick={handleSave}>
  <Save className="h-4 w-4 mr-2" />
  <span>Save Changes</span>
</button>

// Input with aria-label
<input
  type="search"
  aria-label="Search products"
  placeholder="Search..."
/>
```

## 🎨 Color Contrast (WCAG AA)

Use semantic design tokens ensuring 4.5:1 contrast ratio for text and 3:1 for large text (18px+).

**Implementation:**
```tsx
// Use semantic color tokens
<div className="bg-background text-foreground">
  <h1 className="text-2xl text-foreground">Heading</h1>
  <p className="text-muted-foreground">Description text</p>
</div>

// Accessible button variants
<Button variant="destructive">
  {/* bg-destructive + text-destructive-foreground ensures contrast */}
  Delete
</Button>

<Button variant="secondary">
  {/* bg-secondary + text-secondary-foreground */}
  Cancel
</Button>

// Status indicators with sufficient contrast
<Badge className="bg-green-600 text-white">Success</Badge>
<Badge className="bg-red-600 text-white">Error</Badge>
```

## 👁️ Focus-Visible Styles

Replace `outline-none` with explicit focus-visible styles for keyboard navigation clarity.

**Implementation:**
```tsx
// Standard focus-visible pattern
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Click Me
</button>

// shadcn/ui components include focus styles by default
<Button>Already Accessible</Button>

// Custom interactive element
<div
  role="button"
  tabIndex={0}
  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
>
  Custom Element
</div>

// Input with focus styles
<input
  type="text"
  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
/>
```

## 📝 Form Labels

Associate every form input with a descriptive label using `htmlFor`/`id` or `aria-labelledby`.

**Implementation:**
```tsx
// Standard label association
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    placeholder="you@example.com"
  />
</div>

// Multiple labels using aria-labelledby
<div>
  <h3 id="payment-heading">Payment Information</h3>
  <label id="card-label">Card Number</label>
  <input
    type="text"
    aria-labelledby="payment-heading card-label"
  />
</div>

// shadcn Form component (handles associations automatically)
<Form>
  <FormField
    control={form.control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input placeholder="johndoe" {...field} />
        </FormControl>
      </FormItem>
    )}
  />
</Form>
```

## ⚠️ Error States

Communicate validation errors through `aria-invalid` and `aria-describedby` attributes.

**Implementation:**
```tsx
// Input with error state
<div className="space-y-1">
  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    aria-invalid={!!error}
    aria-describedby={error ? "password-error" : undefined}
    className={error ? "border-destructive" : ""}
  />
  {error && (
    <p id="password-error" className="text-sm text-destructive">
      {error}
    </p>
  )}
</div>

// Form field with validation
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input
          {...field}
          aria-invalid={!!form.formState.errors.email}
          aria-describedby={
            form.formState.errors.email ? "email-error" : undefined
          }
        />
      </FormControl>
      <FormMessage id="email-error" />
    </FormItem>
  )}
/>

// Live validation feedback
<div>
  <input
    type="text"
    aria-invalid={isInvalid}
    aria-describedby="username-error username-hint"
  />
  <span id="username-hint" className="text-sm text-muted-foreground">
    Must be 3-20 characters
  </span>
  {isInvalid && (
    <span id="username-error" className="text-sm text-destructive">
      Username is too short
    </span>
  )}
</div>
```

## 🖼️ Image Alt Text

Provide meaningful alt text for content images and empty alt for decorative images.

**Implementation:**
```tsx
// Content images with descriptive alt text
<img
  src="/products/shoes.jpg"
  alt="Blue running shoes with white soles"
  className="rounded-md"
/>

// Decorative images (empty alt)
<img
  src="/icons/decorative-pattern.svg"
  alt=""
  aria-hidden="true"
/>

// Icons as part of buttons (hide from screen readers)
<button>
  <Trash2 className="h-4 w-4" aria-hidden="true" />
  <span>Delete Item</span>
</button>

// Profile image with fallback
<img
  src={user.avatar}
  alt={`${user.name}'s profile picture`}
  onError={(e) => {
    e.currentTarget.src = '/default-avatar.png';
  }}
/>

// Next.js Image component
<Image
  src="/hero-image.jpg"
  alt="Team collaborating on a laptop"
  width={800}
  height={600}
/>
```

## 🎯 Focus Trap in Modals

Use shadcn Dialog/Modal components that handle focus trapping automatically via Radix UI.

**Implementation:**
```tsx
// shadcn Dialog with automatic focus management
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    {/* Focus trapped within dialog automatically */}
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to proceed?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

// Custom modal with Radix Primitives
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Focus automatically managed by Radix */}
      <Dialog.Title>Modal Title</Dialog.Title>
      <Dialog.Description>Modal content</Dialog.Description>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

## 📢 Dynamic Content Announcements

Use `aria-live` regions to announce dynamic content updates to screen readers.

**Implementation:**
```tsx
// Polite announcements for status updates
<div aria-live="polite" className="sr-only">
  {statusMessage}
</div>

// Example: Form submission status
function FormWithStatus() {
  const [status, setStatus] = useState('');

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* form fields */}
        <Button type="submit">Submit</Button>
      </form>
      <div aria-live="polite" className="sr-only">
        {status}
      </div>
    </>
  );
}

// Assertive announcements for errors
<div aria-live="assertive" aria-atomic="true" className="sr-only">
  {errorMessage}
</div>

// Loading state announcement
function DataTable() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div aria-live="polite" aria-busy={loading} className="sr-only">
        {loading ? 'Loading data...' : 'Data loaded'}
      </div>
      <table>{/* table content */}</table>
    </>
  );
}

// sr-only utility class (add to globals.css)
// .sr-only {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   border-width: 0;
// }
```

## 🔢 Tab Order

Maintain natural DOM order for tab navigation. Use tabIndex sparingly.

**Implementation:**
```tsx
// Natural tab order (preferred)
<form>
  <input type="text" placeholder="First Name" />
  <input type="text" placeholder="Last Name" />
  <input type="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>

// Remove element from tab order
<div tabIndex={-1} ref={containerRef}>
  {/* Programmatically focusable but not in tab sequence */}
</div>

// Add non-interactive element to tab order
<div
  role="region"
  tabIndex={0}
  aria-label="Terms and conditions"
  className="overflow-y-auto max-h-64 p-4 border rounded"
>
  {terms}
</div>

// Skip navigation link (first focusable element)
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
>
  Skip to main content
</a>

<main id="main-content">
  {/* Main content */}
</main>
```

## 🎯 Component Examples

### Accessible Button Group
```tsx
function ButtonGroup() {
  const [selected, setSelected] = useState('left');

  return (
    <div role="group" aria-label="Text alignment">
      <button
        onClick={() => setSelected('left')}
        aria-pressed={selected === 'left'}
        className={cn(
          "focus-visible:ring-2 focus-visible:ring-ring",
          selected === 'left' && "bg-accent"
        )}
      >
        <AlignLeft className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Align left</span>
      </button>
      <button
        onClick={() => setSelected('center')}
        aria-pressed={selected === 'center'}
        className={cn(
          "focus-visible:ring-2 focus-visible:ring-ring",
          selected === 'center' && "bg-accent"
        )}
      >
        <AlignCenter className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Align center</span>
      </button>
      <button
        onClick={() => setSelected('right')}
        aria-pressed={selected === 'right'}
        className={cn(
          "focus-visible:ring-2 focus-visible:ring-ring",
          selected === 'right' && "bg-accent"
        )}
      >
        <AlignRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Align right</span>
      </button>
    </div>
  );
}
```

### Accessible Search Input
```tsx
function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  return (
    <div role="search">
      <label htmlFor="search" className="sr-only">
        Search products
      </label>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="pl-10 focus-visible:ring-2 focus-visible:ring-ring"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={results.length > 0}
        />
      </div>
      {results.length > 0 && (
        <ul id="search-results" role="listbox">
          {results.map((result) => (
            <li key={result.id} role="option">
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Accessible Tabs
```tsx
function AccessibleTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <div role="tablist" aria-label="Content sections">
        <button
          role="tab"
          id="tab1"
          aria-selected={activeTab === 'tab1'}
          aria-controls="panel1"
          onClick={() => setActiveTab('tab1')}
          className="focus-visible:ring-2 focus-visible:ring-ring"
        >
          Overview
        </button>
        <button
          role="tab"
          id="tab2"
          aria-selected={activeTab === 'tab2'}
          aria-controls="panel2"
          onClick={() => setActiveTab('tab2')}
          className="focus-visible:ring-2 focus-visible:ring-ring"
        >
          Details
        </button>
      </div>
      <div
        role="tabpanel"
        id="panel1"
        aria-labelledby="tab1"
        hidden={activeTab !== 'tab1'}
      >
        Overview content
      </div>
      <div
        role="tabpanel"
        id="panel2"
        aria-labelledby="tab2"
        hidden={activeTab !== 'tab2'}
      >
        Details content
      </div>
    </div>
  );
}
```

---

## 📚 Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [MDN ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
