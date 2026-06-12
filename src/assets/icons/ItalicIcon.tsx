
interface ItalicIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ItalicIcon({ className, 'aria-hidden': ariaHidden }: ItalicIconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3H7M9 13H6M9 3 7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
