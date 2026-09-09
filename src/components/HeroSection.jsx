import React from 'react';
import { motion } from 'framer-motion';
import { ModakIcon } from './PastelMotifs';
import { GaneshaLineArt } from './GaneshaLineArt';
import { HandDrawnCurve } from './HandcraftedGanesha';
import { Calendar, Sparkles, Heart, BellRing, Users, Camera, ArrowDown } from 'lucide-react';

export const HeroSection = ({ settings, onScrollToSchedule, onScrollToVolunteers }) => {
  const announcementNotice = settings?.announcementNotice || 'Ganesh Chaturthi 2026 celebrations start soon! Daily Morning & Evening Aarti schedule is updated.';
  const committeeName = settings?.committeeName || 'Ganesh Utsav Celebration Committee';
  const festivalYear = settings?.festivalYear || 2026;

  return (
    <section className="relative overflow-hidden pt-8 pb-20 px-4 sm:px-6 lg:px-8 festive-pattern">
      {/* Background ambient glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-saffron-300/25 dark:bg-saffron-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-gold-300/20 dark:bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Lord Ganesha Line Art Centerpiece (from user attached artwork) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
          className="flex justify-center mb-6"
        >
          <div className="relative p-6 rounded-full glass-card border-2 border-saffron-300/60 dark:border-saffron-700/60 shadow-2xl shadow-saffron-500/20 group">
            <GaneshaLineArt className="w-44 h-44 sm:w-56 sm:h-56 text-saffron-500 transform group-hover:scale-105 transition-transform duration-700" glow={true} />
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 px-3 py-1 rounded-full bg-gradient-to-r from-saffron-500 via-gold-400 to-amber-600 text-white font-serif font-bold text-[11px] shadow-lg tracking-wider"
            >
              🕉️ Shree Ganesha 2026
            </motion.div>
          </div>
        </motion.div>

        {/* Top Festive Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-saffron-100/90 dark:bg-stone-800/90 border border-saffron-300/60 dark:border-saffron-700/50 shadow-sm mb-4"
        >
          <ModakIcon className="w-4 h-4 text-gold-500" />
          <span className="text-xs font-bold text-saffron-900 dark:text-saffron-200 tracking-wider uppercase">
            {committeeName} — {festivalYear}
          </span>
        </motion.div>

        {/* Hero Title with Distinctive Flowing Cursive Calligraphy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-cream-50 leading-tight">
            Ganpati Bappa Morya!
          </h1>

          {/* Cursive Calligraphy Highlight Phrase */}
          <div className="relative inline-block mt-4 mb-2 px-2">
            <span
              style={{ fontFamily: "'Dancing Script', 'Great Vibes', 'Sacramento', cursive" }}
              className="font-cursive-calligraphy text-5xl sm:text-7xl lg:text-8xl font-bold gold-gradient-text block leading-tight py-2 tracking-wide"
            >
              Fund & Event Transparency
            </span>
            
            {/* Hand-Drawn Stroke Curve Underline */}
            <div className="w-full max-w-lg mx-auto -mt-2 sm:-mt-4">
              <HandDrawnCurve />
            </div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-4 text-base sm:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-sans"
        >
          Welcome to our residential community's official Ganesh Chaturthi portal! Stay updated on daily Aarti schedules, Mahaprasad distribution, and volunteer sign-ups.
        </motion.p>

        {/* Community Ticker Notice */}
        {announcementNotice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-400/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-medium"
          >
            <BellRing className="w-4 h-4 text-saffron-600 dark:text-gold-400 shrink-0 animate-bounce" />
            <span>{announcementNotice}</span>
          </motion.div>
        )}

        {/* Festive Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card p-6 rounded-3xl group"
          >
            <div className="p-3 rounded-2xl bg-saffron-500/10 text-saffron-600 dark:text-gold-400 inline-block mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100">
              Daily Aarti & Pooja Timings
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              Morning 07:30 AM & Evening 07:30 PM daily Aarti with Vedic chanting and dhol tasha procession.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card p-6 rounded-3xl group"
          >
            <div className="p-3 rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-400 inline-block mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100">
              Resident Volunteer Roster
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              Sign up as a resident volunteer for Prasad serving, Mandap decoration, and Visarjan coordination.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="glass-card p-6 rounded-3xl group"
          >
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 inline-block mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100">
              Cultural & Prasad Events
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
              Children's Rangoli competition, Sthapana Mahaprasad, and grand eco-friendly Visarjan immersion.
            </p>
          </motion.div>

        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#schedule-section"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-saffron-500 via-gold-500 to-saffron-600 text-white font-semibold text-sm shadow-lg shadow-saffron-500/25 hover:shadow-xl hover:shadow-saffron-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
          >
            <span>Explore Aarti Schedule & Timings</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
