
interface CheckIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function CheckIcon({ className, 'aria-hidden': ariaHidden }: CheckIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 7L5.5 10.5L12 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
