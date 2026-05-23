import React from 'react';

interface ChevronDownIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ChevronDownIcon({ className, 'aria-hidden': ariaHidden }: ChevronDownIconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
