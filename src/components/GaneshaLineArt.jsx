import React from 'react';

export const GaneshaLineArt = ({
  className = "w-12 h-12 text-saffron-500",
  strokeColor = "url(#ganeshaGoldGradient)",
  glow = true
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-saffron-400/20 dark:bg-saffron-500/10 rounded-full blur-xl animate-pulse-subtle pointer-events-none" />
      )}
      <svg
        viewBox="0 0 400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="ganeshaGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDC19" />
            <stop offset="40%" stopColor="#F38B2B" />
            <stop offset="100%" stopColor="#D96F14" />
          </linearGradient>
          <linearGradient id="ganeshaSaffronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F38B2B" />
            <stop offset="50%" stopColor="#E5BF00" />
            <stop offset="100%" stopColor="#800020" />
          </linearGradient>
        </defs>

        <g stroke={strokeColor} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
          {/* Flame / Water droplet top */}
          <path d="M200 25 C190 45 200 65 200 65 C200 65 210 45 200 25 Z" fill={strokeColor} />

          {/* Three Wavy Arcs / Crown Waves */}
          <path d="M175 80 Q 200 70 225 80" />
          <path d="M168 95 Q 200 82 232 95" />
          <path d="M160 110 Q 200 95 240 110" />

          {/* Head & Ears & Trunk Loop */}
          <path d="M200 120 C170 120 160 140 160 165 C160 210 180 230 200 230 C220 230 230 290 200 320 C180 340 160 320 160 300 C160 260 220 260 225 210" />
          
          {/* Left Ear */}
          <path d="M170 140 C120 120 110 170 145 215 C155 225 165 220 170 200" />

          {/* Right Ear */}
          <path d="M230 140 C280 120 290 170 255 215 C245 225 235 220 230 200" />

          {/* Tilak Dots on forehead */}
          <circle cx="200" cy="140" r="4" fill={strokeColor} />
          <circle cx="200" cy="152" r="3" fill={strokeColor} />
          <circle cx="200" cy="162" r="2" fill={strokeColor} />

          {/* Left Knee & Body Loop */}
          <path d="M170 280 C120 270 110 330 160 370 C200 400 210 420 195 435" />

          {/* Right Knee & Body Loop */}
          <path d="M230 280 C280 270 290 330 240 370 C200 400 190 420 205 435" />

          {/* Lotus Flower on Left Knee */}
          <path d="M115 255 C120 245 130 245 135 255 C135 255 145 250 145 260 C145 270 125 275 115 255 Z" />

          {/* Modak/Bowl on Right Knee */}
          <path d="M260 250 C250 250 245 265 255 275 C265 285 280 270 275 255 Z" fill={strokeColor} />
        </g>
      </svg>
    </div>
  );
};
