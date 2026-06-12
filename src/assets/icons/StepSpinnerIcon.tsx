
interface StepSpinnerIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function StepSpinnerIcon({ className, 'aria-hidden': ariaHidden }: StepSpinnerIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
