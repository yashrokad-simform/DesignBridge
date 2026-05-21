import React from 'react';

interface ArrowRightIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ArrowRightIcon({ className, 'aria-hidden': ariaHidden }: ArrowRightIconProps) {
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
        d="M2 6h8M7 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
