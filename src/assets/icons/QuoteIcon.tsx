import React from 'react';

interface QuoteIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function QuoteIcon({ className, 'aria-hidden': ariaHidden }: QuoteIconProps) {
  return (
    <svg aria-hidden={ariaHidden} className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9a3 3 0 0 1 3-3V4a5 5 0 0 0-5 5v3h4V9H3ZM10 9a3 3 0 0 1 3-3V4a5 5 0 0 0-5 5v3h4V9h-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
