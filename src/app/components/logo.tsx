import React from 'react'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ className, ...props }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="100" height="100" rx="20" fill="#10B981" />
    <path
      d="M50 25L25 50L50 75L75 50L50 25Z"
      stroke="white"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="15" fill="white" />
  </svg>
)