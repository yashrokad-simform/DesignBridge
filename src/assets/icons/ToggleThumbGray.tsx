
interface ToggleThumbGrayProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ToggleThumbGray({ className, 'aria-hidden': ariaHidden }: ToggleThumbGrayProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="#D1D5DB" />
    </svg>
  );
}
