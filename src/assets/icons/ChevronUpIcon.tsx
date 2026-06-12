
interface ChevronUpIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ChevronUpIcon({ className, 'aria-hidden': ariaHidden }: ChevronUpIconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
