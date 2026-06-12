
interface SearchIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function SearchIcon({ className, 'aria-hidden': ariaHidden }: SearchIconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
