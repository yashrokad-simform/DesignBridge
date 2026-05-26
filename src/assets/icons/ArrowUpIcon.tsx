import React from 'react';

interface ArrowUpIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ArrowUpIcon({ className, 'aria-hidden': ariaHidden }: ArrowUpIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8L6 4L10 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
