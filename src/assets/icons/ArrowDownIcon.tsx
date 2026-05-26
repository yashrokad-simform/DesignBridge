import React from 'react';

interface ArrowDownIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ArrowDownIcon({ className, 'aria-hidden': ariaHidden }: ArrowDownIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
