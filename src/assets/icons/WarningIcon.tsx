
interface WarningIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function WarningIcon({ className, 'aria-hidden': ariaHidden }: WarningIconProps) {
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
      <path
        d="M8.574 2.553a1.6 1.6 0 0 1 2.852 0l7.143 13.333A1.6 1.6 0 0 1 17.143 18H2.857a1.6 1.6 0 0 1-1.426-2.114L8.574 2.553Z"
        fill="#F59E0B"
      />
      <path
        d="M10 7.5v4M10 13.5h.008"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
