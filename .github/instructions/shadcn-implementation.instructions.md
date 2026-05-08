---
name: shadcn/ui Implementation
description: Implement shadcn/ui components with proper imports, CVA variants, asChild usage, Radix accessibility, compound patterns, and form validation for consistent, accessible UI
applyTo: 'src/components/**/*.tsx, src/app/**/*.tsx, src/pages/**/*.tsx'
---

Build consistent, accessible UI components using shadcn/ui patterns with proper imports, variants, composition, and form validation.

## 📦 Component Imports

Import shadcn/ui components from barrel exports for maintainability and consistency.

**Implementation:**
```tsx
// ✅ Named imports from barrel exports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// ✅ Multiple components from same module
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ✅ Dialog compound components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// ✅ Form components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// ✅ Usage in component
function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  );
}

// ✅ Import utilities alongside components
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function CustomButton() {
  return (
    <a
      href="/dashboard"
      className={cn(buttonVariants({ variant: 'outline' }))}
    >
      Go to Dashboard
    </a>
  );
}
```

## 🎨 CVA Variant Patterns

Use and extend class-variance-authority (CVA) variants consistently.

**Implementation:**
```tsx
// ✅ Using existing button variants
import { Button } from '@/components/ui/button';

function ButtonExamples() {
  return (
    <div className="space-x-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}

// ✅ Using size variants
function ButtonSizes() {
  return (
    <div className="space-x-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ✅ Combining variants
function CombinedVariants() {
  return (
    <div className="space-x-2">
      <Button variant="outline" size="sm">Small Outline</Button>
      <Button variant="destructive" size="lg">Large Delete</Button>
      <Button variant="ghost" size="icon">
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ✅ Extending button variants in custom component
// components/loading-button.tsx
import * as React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingButton({
  children,
  loading,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

// Usage
function FormWithLoading() {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingButton loading={loading} onClick={handleSubmit}>
      Submit
    </LoadingButton>
  );
}

// ✅ Creating custom variants configuration
// components/ui/custom-button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const customButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof customButtonVariants> {
  asChild?: boolean;
}

export function CustomButton({
  className,
  variant,
  size,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(customButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// ✅ Using badge variants
import { Badge } from '@/components/ui/badge';

function StatusBadges() {
  return (
    <div className="space-x-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Pending</Badge>
    </div>
  );
}
```

## 🔗 asChild Prop Usage

Use the `asChild` prop to compose components with custom wrappers like Link or other elements.

**Implementation:**
```tsx
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// ✅ Button as Link with asChild
function NavigationButton() {
  return (
    <Button asChild>
      <Link to="/dashboard">Go to Dashboard</Link>
    </Button>
  );
}

// ✅ Multiple link buttons
function Navigation() {
  return (
    <nav className="space-x-2">
      <Button asChild variant="ghost">
        <Link to="/">Home</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/about">About</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/contact">Contact</Link>
      </Button>
    </nav>
  );
}

// ✅ Dialog trigger with custom element
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

function DialogWithCustomTrigger() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <h2>Settings</h2>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  );
}

// ✅ Custom card as clickable link
function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow" asChild>
      <Link to={`/products/${product.id}`}>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>${product.price}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={product.image} alt={product.name} />
        </CardContent>
      </Link>
    </Card>
  );
}

// ✅ DropdownMenuItem with Link
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button onClick={handleLogout}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ✅ Next.js Link with Button
import NextLink from 'next/link';

function NextNavigation() {
  return (
    <Button asChild>
      <NextLink href="/dashboard">Dashboard</NextLink>
    </Button>
  );
}

// ✅ Alert dialog with custom triggers
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

function DeleteConfirmation({ onDelete }: { onDelete: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## ♿ Radix Accessibility Props

Preserve and utilize Radix UI accessibility attributes for proper ARIA support.

**Implementation:**
```tsx
// ✅ Preserve aria-* attributes
import { Switch } from '@/components/ui/switch';

function NotificationToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="notifications"
        checked={enabled}
        onCheckedChange={setEnabled}
        aria-label="Toggle notifications"
      />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  );
}

// ✅ Use data-state for styling
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

function CollapsibleSection() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between data-[state=open]:text-primary">
        <span>Show more details</span>
        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="text-sm text-muted-foreground">
          Additional details here...
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}

// ✅ Accordion with proper ARIA
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function FAQ() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
        <AccordionContent>
          A collection of re-usable components built with Radix UI and Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          Use the CLI to add components to your project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// ✅ Dialog with proper focus management
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function UserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ✅ Tooltip with delay and side
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function TooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Additional information</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// ✅ Tabs with keyboard navigation
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ProfileTabs() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <AccountSettings />
      </TabsContent>
      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>
    </Tabs>
  );
}
```

## 🏗️ Component Composition

Follow compound component patterns for proper semantic structure and styling.

**Implementation:**
```tsx
// ✅ Card compound pattern
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={product.image} alt={product.name} className="w-full rounded" />
        <p className="mt-4 text-sm">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-2xl font-bold">${product.price}</span>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

// ✅ Dialog compound pattern
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function ConfirmationDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ✅ Sheet compound pattern
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse our site</SheetDescription>
        </SheetHeader>
        <nav className="mt-6 space-y-2">
          <a href="/" className="block py-2">Home</a>
          <a href="/about" className="block py-2">About</a>
          <a href="/contact" className="block py-2">Contact</a>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// ✅ Table compound pattern
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableCaption>A list of recent users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ✅ Alert compound pattern
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';

function Notifications() {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You have 3 new messages waiting for you.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

## 🎯 data-slot Attributes

Preserve `data-slot` attributes when wrapping shadcn components for consistent styling.

**Implementation:**
```tsx
// ✅ Preserve data-slot in wrapper component
import { Button, type ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingButton({
  loading,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      data-slot="button"
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

// ✅ Forward data attributes in custom wrapper
interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
  label: string;
}

export function IconButton({
  icon,
  label,
  ...props
}: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      data-slot="icon-button"
      {...props}
    >
      {icon}
    </Button>
  );
}

// ✅ Preserve data attributes in form field wrapper
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';

function CustomFormField({
  control,
  name,
  label,
  children,
}: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem data-slot="form-item">
          <FormLabel data-slot="form-label">{label}</FormLabel>
          <FormControl data-slot="form-control">
            {children}
          </FormControl>
        </FormItem>
      )}
    />
  );
}
```

## 📁 Custom vs UI Components

Organize components properly with shadcn/ui in the `ui` folder and custom components separately.

**Implementation:**
```typescript
// ✅ Directory structure
/*
src/
├── components/
│   ├── ui/                    # shadcn/ui components only
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   ├── shared/                # Reusable custom components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   └── user-avatar.tsx
│   └── features/              # Feature-specific components
│       ├── auth/
│       │   ├── login-form.tsx
│       │   └── register-form.tsx
│       └── products/
│           ├── product-card.tsx
│           └── product-list.tsx
*/

// ✅ Custom component using shadcn/ui
// components/shared/user-avatar.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserAvatarProps {
  user: User;
  onLogout: () => void;
}

export function UserAvatar({ user, onLogout }: UserAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ✅ Extend shadcn component by wrapping
// components/shared/search-input.tsx
import { Input, type InputProps } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps extends InputProps {
  onSearch: (query: string) => void;
}

export function SearchInput({ onSearch, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
        {...props}
      />
    </div>
  );
}

// ✅ Feature-specific component
// components/features/products/product-card.tsx
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{product.name}</CardTitle>
          {product.featured && <Badge>Featured</Badge>}
        </div>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full rounded object-cover"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-2xl font-bold">${product.price}</span>
        <Button onClick={() => onAddToCart(product)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

// ✅ Composite custom component
// components/shared/stat-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

## 📝 Forms with react-hook-form + zod

Build validated forms using shadcn Form components with react-hook-form and zod.

**Implementation:**
```tsx
// ✅ Complete form example with validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  email: z.string().email('Invalid email address'),
  bio: z
    .string()
    .max(160, 'Bio must be less than 160 characters')
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: '',
      email: '',
      bio: '',
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      await api.updateProfile(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about yourself"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Brief description for your profile (max 160 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save changes'}
        </Button>
      </form>
    </Form>
  );
}

// ✅ Form with Select component
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const settingsSchema = z.object({
  language: z.enum(['en', 'es', 'fr', 'de']),
  theme: z.enum(['light', 'dark', 'system']),
  notifications: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export function SettingsForm() {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      language: 'en',
      theme: 'system',
      notifications: true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save settings</Button>
      </form>
    </Form>
  );
}

// ✅ Form with Checkbox and Switch
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
});

export function NotificationForm() {
  const form = useForm({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: false,
      pushNotifications: false,
      categories: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Email Notifications</FormLabel>
                <FormDescription>
                  Receive notifications via email
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel>Notification Categories</FormLabel>
              {['updates', 'marketing', 'security'].map((category) => (
                <FormField
                  key={category}
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(category)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, category])
                              : field.onChange(
                                  field.value?.filter((value) => value !== category)
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save preferences</Button>
      </form>
    </Form>
  );
}

// ✅ Multi-step form
export function MultiStepForm() {
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(multiStepSchema),
    defaultValues: {
      // All fields
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 1 && <PersonalInfoStep control={form.control} />}
        {step === 2 && <AddressStep control={form.control} />}
        {step === 3 && <ReviewStep values={form.getValues()} />}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button type="button" onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
```

## 🎨 Button Variants

Use defined button variants for consistent styling across the application.

**Implementation:**
```tsx
import { Button } from '@/components/ui/button';

// ✅ Primary actions
function PrimaryActions() {
  return (
    <div className="space-x-2">
      <Button variant="default">Save</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  );
}

// ✅ Destructive actions
function DeleteAction({ onDelete }: { onDelete: () => void }) {
  return (
    <Button variant="destructive" onClick={onDelete}>
      Delete Account
    </Button>
  );
}

// ✅ Secondary actions
function SecondaryActions() {
  return (
    <div className="space-x-2">
      <Button variant="secondary">Export</Button>
      <Button variant="secondary">Import</Button>
    </div>
  );
}

// ✅ Ghost buttons for subtle actions
function SubtleActions() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm">
        <Edit className="mr-2 h-4 w-4" />
        Edit
      </Button>
      <Button variant="ghost" size="sm">
        <Share className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
}

// ✅ Link styled as button
function LinkButton() {
  return (
    <Button variant="link" asChild>
      <Link to="/help">Learn more</Link>
    </Button>
  );
}

// ✅ Icon buttons
function IconButtons() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon">
        <Settings className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Bell className="h-4 w-4" />
      </Button>
      <Button variant="destructive" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

// ✅ Button sizes
function ButtonSizes() {
  return (
    <div className="flex items-center space-x-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

// ✅ Loading states
function LoadingButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button disabled={loading} onClick={() => setLoading(true)}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? 'Processing...' : 'Submit'}
    </Button>
  );
}

// ✅ Button groups
function ButtonGroup() {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <Button variant="outline" className="rounded-r-none">
        Left
      </Button>
      <Button variant="outline" className="rounded-none border-l-0">
        Middle
      </Button>
      <Button variant="outline" className="rounded-l-none border-l-0">
        Right
      </Button>
    </div>
  );
}

// ✅ Action buttons with icons and text
function ActionButtons() {
  return (
    <div className="flex flex-col space-y-2">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download Report
      </Button>
      <Button variant="secondary">
        <Upload className="mr-2 h-4 w-4" />
        Upload Files
      </Button>
    </div>
  );
}
```

---

## 📚 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Class Variance Authority](https://cva.style/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
