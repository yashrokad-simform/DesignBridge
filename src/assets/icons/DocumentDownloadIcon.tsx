import React from 'react';

interface DocumentDownloadIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function DocumentDownloadIcon({ className, 'aria-hidden': ariaHidden }: DocumentDownloadIconProps) {
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
      <path d="M8 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 8L8 11L11 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
