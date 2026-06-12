
interface IndeterminateIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function IndeterminateIcon({ className, 'aria-hidden': ariaHidden }: IndeterminateIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="18" rx="4" fill="var(--color-bg-brand-secondary)" />
      <path
        d="M5 9H13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
