
interface BoldIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function BoldIcon({ className, 'aria-hidden': ariaHidden }: BoldIconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8h5a2.5 2.5 0 0 0 0-5H4v5ZM4 8h5.5a2.5 2.5 0 0 1 0 5H4V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
