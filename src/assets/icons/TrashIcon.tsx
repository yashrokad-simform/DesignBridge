import React from 'react';

interface TrashIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function TrashIcon({ className, 'aria-hidden': ariaHidden }: TrashIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.5 4.5H13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5.5 4.5V3.5C5.5 2.948 5.948 2.5 6.5 2.5H9.5C10.052 2.5 10.5 2.948 10.5 3.5V4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.5 4.5L4.2 12.5C4.2 13.328 4.872 14 5.7 14H10.3C11.128 14 11.8 13.328 11.8 12.5L12.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 7.5V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M9.5 7.5V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
