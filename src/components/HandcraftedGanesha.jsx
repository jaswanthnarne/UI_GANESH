import React from 'react';
import { motion } from 'framer-motion';

export const HandcraftedGanesha = ({ className = "w-48 h-48 sm:w-64 sm:h-64" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer ambient glow halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-saffron-400/30 via-gold-400/30 to-amber-500/20 blur-2xl animate-pulse-subtle pointer-events-none" />

      {/* Ornate Circular Border */}
      <div className="relative p-2.5 rounded-full bg-gradient-to-tr from-saffron-500 via-gold-400 to-amber-600 shadow-xl shadow-saffron-500/25">
        <div className="p-1 rounded-full bg-[#FAF6F0] dark:bg-[#1E1812]">
          <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden relative border-2 border-saffron-300/60 dark:border-saffron-700/60">
            {/* Handcrafted Ganesha Painting */}
            <img
              src="/handcrafted_ganesha.jpg"
              alt="Handcrafted Lord Ganesha Real Art"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            {/* Soft gold vignette gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-saffron-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Floating Diya Sparkles */}
      <motion.div
        animate={{ y: [-4, 4, -4], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-saffron-500 to-gold-400 text-white font-serif font-bold text-[10px] shadow-lg tracking-wider"
      >
        🌺 Sri Siddhivinayak
      </motion.div>
    </div>
  );
};

export const HandDrawnCurve = ({ className = "w-full h-8 text-saffron-500" }) => (
  <svg className={className} viewBox="0 0 500 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Artistic Brushed Underline Stroke */}
    <path
      d="M10 25 Q 120 5, 250 28 Q 380 45, 490 15"
      stroke="url(#handDrawnGoldGradient)"
      strokeWidth="5"
      strokeLinecap="round"
      className="drop-shadow-sm"
    />
    <path
      d="M30 30 Q 150 12, 270 32 Q 390 48, 470 20"
      stroke="#F38B2B"
      strokeWidth="2.5"
      strokeOpacity="0.6"
      strokeLinecap="round"
    />
    {/* Small decorative lotus leaf flourishment at end */}
    <circle cx="490" cy="15" r="4" fill="#E5BF00" />
    <defs>
      <linearGradient id="handDrawnGoldGradient" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F38B2B" />
        <stop offset="0.5" stopColor="#E5BF00" />
        <stop offset="1" stopColor="#D96F14" />
      </linearGradient>
    </defs>
  </svg>
);
