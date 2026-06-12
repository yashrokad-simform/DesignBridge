
interface InfoCircleOutlineIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function InfoCircleOutlineIcon({ className, 'aria-hidden': ariaHidden }: InfoCircleOutlineIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 9v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="6.5" r="0.75" fill="currentColor" />
    </svg>
  );
}
