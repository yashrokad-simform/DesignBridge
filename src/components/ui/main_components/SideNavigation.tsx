import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from '@/assets/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@/assets/icons/ArrowRightIcon';
import { ChevronRightIcon } from '@/assets/icons/ChevronRightIcon';

export interface NavItemData {
  label: string;
  icon: React.ReactNode;
  href: string;
  selected?: boolean;
}

export interface NavProfileData {
  name: string;
  role: string;
  avatar?: string;
  avatarColor?: string;
  href?: string;
}

export interface SideNavProps {
  collapsed: boolean;
  onToggle: () => void;
  logo: React.ReactNode;
  items: NavItemData[];
  showProfile?: boolean;
  profile?: NavProfileData;
  navItemHeight?: number;
  className?: string;
}

/* ── Profile Avatar ──────────────────────────────────────── */
function ProfileAvatar({ profile, size = 'md' }: { profile: NavProfileData; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'size-9' : 'size-9';
  const initials = profile.name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');

  if (profile.avatar) {
    return (
      <img
        src={profile.avatar}
        alt={profile.name}
        className={cn(sizeClass, 'rounded-full overflow-hidden object-cover shrink-0')}
      />
    );
  }

  return (
    <div
      className={cn(sizeClass, 'rounded-full flex items-center justify-center shrink-0 select-none')}
      style={{ backgroundColor: profile.avatarColor ?? '#4f46e5' }}
    >
      <span className="text-white text-xs font-semibold leading-none">{initials}</span>
    </div>
  );
}

/* ── NavItem CVA ─────────────────────────────────────────── */
const navItemVariants = cva(
  'flex items-center overflow-hidden shrink-0 w-full cursor-pointer transition-colors group',
  {
    variants: {
      variant: {
        'expanded-selected':  'h-11 px-3 py-2 rounded-lg bg-nav-tile-bg-primary gap-2',
        'expanded-default':   'h-11 px-3 py-2 rounded-lg gap-2 hover:bg-nav-bg-hover',
        'collapsed-selected': 'justify-center p-0',
        'collapsed-default':  'justify-center p-0 rounded-lg hover:bg-nav-bg-hover',
      },
    },
    defaultVariants: { variant: 'expanded-default' },
  },
);

type NavItemVariant = 'expanded-selected' | 'expanded-default' | 'collapsed-selected' | 'collapsed-default';

/* ── Icon cloner ─────────────────────────────────────────── */
function cloneIcon(icon: React.ReactNode, colorClass: string): React.ReactNode {
  if (!React.isValidElement(icon)) return icon;
  return React.cloneElement(
    icon as React.ReactElement<{ className?: string; 'aria-hidden'?: string }>,
    { className: cn('size-5', colorClass), 'aria-hidden': 'true' },
  );
}

/* ── NavItem ─────────────────────────────────────────────── */
interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  href: string;
  selected?: boolean;
  collapsed?: boolean;
  navItemHeight?: number;
}

function NavItem({ label, icon, href, selected = false, collapsed = false, navItemHeight }: NavItemProps) {
  const variant: NavItemVariant = collapsed
    ? selected ? 'collapsed-selected' : 'collapsed-default'
    : selected ? 'expanded-selected'  : 'expanded-default';

  const iconColor = selected ? 'text-nav-icon-primary' : 'text-nav-icon-secondary';

  if (collapsed) {
    return (
      <a href={href} className={navItemVariants({ variant })}>
        <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
          <div className={cn(
            'flex items-center justify-center p-3 rounded-lg shrink-0',
            selected ? 'bg-nav-tile-bg-primary' : 'bg-nav-tile-bg-secondary',
          )}>
            {cloneIcon(icon, iconColor)}
          </div>
          <span className={cn(
            'text-xs font-medium leading-4 text-center w-full',
            selected ? 'text-nav-text-primary-collapse' : 'text-nav-text-secondary',
          )}>
            {label}
          </span>
        </div>
      </a>
    );
  }

  return (
    <a href={href} className={navItemVariants({ variant })} style={navItemHeight ? { height: `${navItemHeight}px` } : undefined}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-start shrink-0">
          {cloneIcon(icon, iconColor)}
        </div>
        <span className={cn(
          'text-sm leading-4.5 flex-1 min-w-0',
          selected ? 'font-semibold text-nav-text-primary' : 'font-medium text-nav-text-secondary',
        )}>
          {label}
        </span>
      </div>
    </a>
  );
}

/* ── SideNav ─────────────────────────────────────────────── */
export function SideNav({
  collapsed,
  onToggle,
  logo,
  items,
  showProfile = true,
  profile,
  navItemHeight,
  className,
}: SideNavProps) {
  return (
    <div className={cn('relative bg-bg-white flex items-center h-full font-inter', className)}>

      {/* Sidebar Panel */}
      <div className={cn(
        'bg-nav-bg flex flex-col h-full items-start overflow-hidden',
        'motion-safe:transition-[width] motion-safe:duration-200',
        collapsed ? 'w-24' : 'w-60',
      )}>

        {/* Header */}
        <div className={cn(
          'flex items-center h-19 p-5 shrink-0 w-full overflow-hidden',
          collapsed ? 'justify-center' : 'justify-start',
        )}>
          <div className="flex items-center justify-center max-h-16 overflow-hidden max-w-full">
            {logo}
          </div>
        </div>

        {/* Nav Items */}
        <div className={cn(
          'flex-1 flex flex-col min-h-0 w-full overflow-y-auto overflow-x-hidden',
          collapsed ? 'px-1 py-2 gap-3 items-center' : 'p-5 gap-1',
        )}>
          {items.map((item) => (
            <NavItem
              key={item.href}
              label={item.label}
              icon={item.icon}
              href={item.href}
              selected={item.selected}
              collapsed={collapsed}
              navItemHeight={collapsed ? undefined : navItemHeight}
            />
          ))}
        </div>

        {/* Profile */}
        {showProfile && profile && (
          <div className="shrink-0 w-full p-5">
            <div className="flex items-center gap-2 p-3 rounded-xl overflow-hidden bg-nav-tile-bg-secondary">
              {collapsed ? (
                <div className="flex items-center justify-center">
                  <ProfileAvatar profile={profile} />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <ProfileAvatar profile={profile} />
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0 whitespace-nowrap">
                      <span className="text-sm font-medium leading-4.5 text-nav-text-primary-collapse truncate">
                        {profile.name}
                      </span>
                      <span className="text-xs font-medium leading-4 text-nav-text-secondary truncate">
                        {profile.role}
                      </span>
                    </div>
                  </div>
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 overflow-hidden text-nav-text-secondary"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        type="button"
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        onClick={onToggle}
        className={cn(
          'absolute top-[63px] bg-bg-black border border-border-white rounded-[160px] flex items-center p-1 text-text-white',
          'motion-safe:transition-[left] motion-safe:duration-200',
          collapsed ? 'left-[84px]' : 'left-[228px]',
        )}
      >
        {collapsed
          ? <ArrowRightIcon aria-hidden="true" className="size-4" />
          : <ArrowLeftIcon  aria-hidden="true" className="size-4" />}
      </button>
    </div>
  );
}
