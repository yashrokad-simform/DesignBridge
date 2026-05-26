import React from 'react';

interface H2IconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function H2Icon({ className, 'aria-hidden': ariaHidden }: H2IconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 3v10M2 8h6M8 3v10M11 5.5a1.5 1.5 0 0 1 3 0c0 .8-.5 1.5-1.5 2.5L11 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
