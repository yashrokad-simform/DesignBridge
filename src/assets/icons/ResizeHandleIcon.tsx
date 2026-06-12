
interface ResizeHandleIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ResizeHandleIcon({ className, 'aria-hidden': ariaHidden }: ResizeHandleIconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6l-8 8M14 10l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
