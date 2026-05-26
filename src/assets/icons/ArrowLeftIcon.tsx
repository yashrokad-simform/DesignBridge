import React from 'react';

interface ArrowLeftIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ArrowLeftIcon({ className, 'aria-hidden': ariaHidden }: ArrowLeftIconProps) {
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
        d="M10 6H2M5 3L2 6l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
