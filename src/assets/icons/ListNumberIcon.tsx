import React from 'react';

interface ListNumberIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ListNumberIcon({ className, 'aria-hidden': ariaHidden }: ListNumberIconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3h1.5v4M2 7h3M2 10.5a1.5 1.5 0 0 1 3 0c0 .6-.3 1.1-1 1.5L2 13.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 4.5h7M7 8h7M7 11.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
