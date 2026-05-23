import React from 'react';

interface ChevronRightIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ChevronRightIcon({ className, 'aria-hidden': ariaHidden }: ChevronRightIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 2.5L8.5 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
