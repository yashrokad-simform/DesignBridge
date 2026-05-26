import React from 'react';

interface StepDotIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function StepDotIcon({ className, 'aria-hidden': ariaHidden }: StepDotIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 8 8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}
