import React from 'react';

interface AnalyticsIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function AnalyticsIcon({ className, 'aria-hidden': ariaHidden }: AnalyticsIconProps) {
  return (
    <svg
      aria-hidden={ariaHidden}
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 14l4.5-5 3.5 3 4-5.5L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
