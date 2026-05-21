import React from 'react';

interface CloseIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function CloseIcon({ className, 'aria-hidden': ariaHidden }: CloseIconProps) {
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
        d="M9 3L3 9M3 3l6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
