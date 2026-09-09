import React from 'react';

export const DiyaMotif = ({ className = "w-8 h-8 text-saffron-500 opacity-80" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Diya Flame */}
    <path
      d="M32 6C32 6 25 18 25 25C25 28.866 28.134 32 32 32C35.866 32 39 28.866 39 25C39 18 32 6 32 6Z"
      fill="url(#flameGradient)"
      className="animate-flame-flicker transform-gpu origin-bottom"
    />
    <path
      d="M32 12C32 12 28 20 28 24C28 26.2091 29.7909 28 32 28C34.2091 28 36 26.2091 36 24C36 20 32 12 32 12Z"
      fill="#FFE847"
    />
    {/* Diya Base */}
    <path
      d="M12 36C12 36 16 54 32 54C48 54 52 36 52 36H12Z"
      fill="currentColor"
      fillOpacity="0.85"
    />
    <path
      d="M10 36C10 34.8954 10.8954 34 12 34H52C53.1046 34 54 34.8954 54 36C54 37.1046 53.1046 38 52 38H12C10.8954 38 10 37.1046 10 36Z"
      fill="currentColor"
    />
    <defs>
      <linearGradient id="flameGradient" x1="32" y1="6" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFDC19" />
        <stop offset="0.6" stopColor="#F38B2B" />
        <stop offset="1" stopColor="#D96F14" />
      </linearGradient>
    </defs>
  </svg>
);

export const MandalaMotif = ({ className = "w-64 h-64 text-saffron-300 opacity-10 pointer-events-none" }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
    <circle cx="100" cy="100" r="70" />
    <circle cx="100" cy="100" r="50" strokeDasharray="2 2" />
    <circle cx="100" cy="100" r="30" />
    <path d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36" strokeOpacity="0.5" />
    <circle cx="100" cy="20" r="6" />
    <circle cx="100" cy="180" r="6" />
    <circle cx="20" cy="100" r="6" />
    <circle cx="180" cy="100" r="6" />
  </svg>
);

export const ModakIcon = ({ className = "w-6 h-6 text-gold-500" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 8 8 8 13C8 17.4183 9.79086 21 12 21C14.2091 21 16 17.4183 16 13C16 8 12 2 12 2Z" fillOpacity="0.9" />
    <path d="M12 2C12 2 10 7 10 12C10 16.5 11 20 12 20C13 20 14 16.5 14 12C14 7 12 2 12 2Z" fill="#FFE847" />
  </svg>
);
