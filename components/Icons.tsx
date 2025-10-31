
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SendIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export const PaperclipIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.5 10.5a.75.75 0 001.06 1.06l10.5-10.5a.75.75 0 011.06 0s.003.004.004.005a.75.75 0 01-1.064 1.056L5.165 18.23a2.25 2.25 0 003.182 3.182l11.25-11.25a3.75 3.75 0 10-5.303-5.303L6.045 13.91a.75.75 0 001.06 1.06l7.25-7.25a2.25 2.25 0 013.182 3.182l-8.75 8.75a.75.75 0 11-1.06-1.06l8.75-8.75a.75.75 0 00-1.06-1.06l-8.75 8.75a2.25 2.25 0 000 3.182s.004.003.005.004a2.25 2.25 0 003.177-.005l8.75-8.75a.75.75 0 00-1.06-1.06L12 17.182a.75.75 0 11-1.06-1.06l7.25-7.25a3.75 3.75 0 00-5.303-5.303L1.61 14.97a5.25 5.25 0 007.424 7.424l11.25-11.25a.75.75 0 00-1.06-1.06l-1.061 1.06.001-.002z"
      clipRule="evenodd"
    />
  </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        {...props}
    >
        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

export const AuraLogo: React.FC<IconProps> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 2a10 10 0 0 1 10 10" />
        <path d="M12 2a10 10 0 0 0-10 10" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);
