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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}
