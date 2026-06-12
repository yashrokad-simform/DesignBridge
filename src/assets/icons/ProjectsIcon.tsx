
interface ProjectsIconProps {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}

export function ProjectsIcon({ className, 'aria-hidden': ariaHidden }: ProjectsIconProps) {
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
      <rect x="2" y="4" width="16" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10h8M6 13.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
