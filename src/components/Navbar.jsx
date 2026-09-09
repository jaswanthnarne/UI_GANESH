import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useDataStore } from '../store/useDataStore';
import { useThemeStore } from '../store/useThemeStore';
import { GaneshaLineArt } from './GaneshaLineArt';
import { Sun, Moon, Lock, ShieldCheck, Calendar, LogOut, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { settings, festivalYear, setFestivalYear } = useDataStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const committeeName = settings?.committeeName || 'Ganesh Utsav Celebration Committee';
  const address = settings?.address || 'Royal Palms Apartment';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel shadow-sm border-b border-saffron-200/50 dark:border-saffron-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Community Info */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="p-2 rounded-2xl bg-gradient-to-tr from-saffron-500 via-gold-400 to-amber-600 text-white shadow-md shadow-saffron-500/20">
              <GaneshaLineArt className="w-9 h-9 text-white" glow={false} />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg sm:text-xl text-saffron-900 dark:text-saffron-200 tracking-wide leading-tight flex items-center">
                {committeeName}
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium truncate max-w-[220px] sm:max-w-xs">
                📍 {address}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            
            <a
              href="#schedule-section"
              className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-saffron-600 transition-colors"
            >
              Aarti Schedule
            </a>

            <a
              href="#notices-section"
              className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-saffron-600 transition-colors"
            >
              Announcements
            </a>

            <a
              href="#gallery-section"
              className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-saffron-600 transition-colors"
            >
              Photo Gallery
            </a>

            {/* Festival Year Selector */}
            <div className="flex items-center bg-saffron-100/80 dark:bg-stone-800/80 px-3 py-1.5 rounded-full border border-saffron-200 dark:border-stone-700 text-xs font-semibold text-saffron-900 dark:text-saffron-200">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-saffron-600" />
              <span>Year:</span>
              <select
                value={festivalYear}
                onChange={(e) => setFestivalYear(Number(e.target.value))}
                className="bg-transparent font-bold cursor-pointer focus:outline-none ml-1 text-saffron-700 dark:text-saffron-300"
              >
                <option value={2026} className="dark:bg-stone-900">2026</option>
                <option value={2025} className="dark:bg-stone-900">2025</option>
                <option value={2024} className="dark:bg-stone-900">2024</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-saffron-100/60 dark:bg-stone-800/80 text-saffron-700 dark:text-gold-300 hover:bg-saffron-200/60 dark:hover:bg-stone-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin CTA */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-xl font-semibold text-xs transition-all flex items-center shadow-sm bg-gradient-to-r from-saffron-500 to-saffron-600 text-white hover:shadow-md hover:shadow-saffron-500/20"
                >
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  Admin Control Panel
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2 rounded-xl text-stone-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-stone-800 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl font-semibold text-xs bg-saffron-100 dark:bg-stone-800 text-saffron-900 dark:text-saffron-200 border border-saffron-300/60 dark:border-stone-700 hover:bg-saffron-200/70 transition-all flex items-center"
              >
                <Lock className="w-3.5 h-3.5 mr-1.5 text-saffron-600" />
                Committee Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-saffron-100/60 dark:bg-stone-800 text-saffron-700 dark:text-gold-300"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-saffron-900 dark:text-saffron-200 hover:bg-saffron-100 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-saffron-200 px-4 py-4 space-y-3">
          <a
            href="#schedule-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold text-stone-700 dark:text-stone-300 py-1.5"
          >
            Aarti Schedule & Timings
          </a>

          <a
            href="#gallery-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold text-stone-700 dark:text-stone-300 py-1.5"
          >
            Photo Gallery
          </a>

          {isAuthenticated ? (
            <div className="space-y-2 pt-2">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-saffron-500 text-white font-semibold text-xs flex items-center justify-center"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Admin Control Panel
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-saffron-600 text-white font-semibold text-xs flex items-center justify-center"
            >
              <Lock className="w-4 h-4 mr-2" />
              Committee Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
