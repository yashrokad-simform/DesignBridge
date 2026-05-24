import React from 'react';

interface DocumentUploadIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function DocumentUploadIcon({ className, 'aria-hidden': ariaHidden }: DocumentUploadIconProps) {
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
      <path d="M6 8V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3.5 5.5L6 3L8.5 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 10H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
