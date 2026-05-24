import React from 'react';

interface CloseCircleIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function CloseCircleIcon({ className, 'aria-hidden': ariaHidden }: CloseCircleIconProps) {
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
      <circle cx="10" cy="10" r="10" fill="#EF4444" />
      <path
        d="M13 7L7 13M7 7l6 6"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
