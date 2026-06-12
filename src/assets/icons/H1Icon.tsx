
interface H1IconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function H1Icon({ className, 'aria-hidden': ariaHidden }: H1IconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3v10M2 8h6M8 3v10M11 6l2-2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
