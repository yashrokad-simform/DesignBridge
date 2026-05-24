import React from 'react';

interface InfoCircleIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function InfoCircleIcon({ className, 'aria-hidden': ariaHidden }: InfoCircleIconProps) {
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
      <circle cx="10" cy="10" r="10" fill="#3B82F6" />
      <path
        d="M10 9v5M10 6.5h.008"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
