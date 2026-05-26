import React from 'react';

interface ToggleThumbWhiteProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ToggleThumbWhite({ className, 'aria-hidden': ariaHidden }: ToggleThumbWhiteProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="white" />
    </svg>
  );
}
