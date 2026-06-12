
interface SettingsIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function SettingsIcon({ className, 'aria-hidden': ariaHidden }: SettingsIconProps) {
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
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.1 4.1l1.06 1.06M14.84 14.84l1.06 1.06M15.9 4.1l-1.06 1.06M5.16 14.84l-1.06 1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
