
interface DotsHorizontalIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function DotsHorizontalIcon({ className, 'aria-hidden': ariaHidden }: DotsHorizontalIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="3" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="13" cy="8" r="1.25" fill="currentColor" />
    </svg>
  );
}
