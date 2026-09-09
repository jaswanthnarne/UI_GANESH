import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { useDataStore } from '../../store/useDataStore';
import { useThemeStore } from '../../store/useThemeStore';

import { AdminOverview } from './AdminOverview';
import { FastContributionEntry } from './FastContributionEntry';
import { ExpensesManager } from './ExpensesManager';
import { SettingsManager } from './SettingsManager';
import { UserAccountsManager } from './UserAccountsManager';
import { EventsManager } from './EventsManager';
import { AnnouncementsManager } from './AnnouncementsManager';
import { GalleryManager } from './GalleryManager';
import { GaneshaLineArt } from '../GaneshaLineArt';
import { BudgetPlanner } from './BudgetPlanner';
import {
  LayoutDashboard,
  DollarSign,
  Receipt,
  Settings,
  Users,
  Calendar,
  Megaphone,
  Camera,
  ArrowLeft,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sun,
  Moon,
  Wallet
} from 'lucide-react';

export const AdminControlPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { settings, festivalYear } = useDataStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const isVolunteer = user?.role === 'volunteer';
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const [activeTab, setActiveTab] = useState(isVolunteer ? 'contributions' : 'overview'); // Volunteer defaults to contributions
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarNavItems = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard, adminOnly: true },
    { id: 'contributions', label: 'Collected Funds', icon: DollarSign, badge: 'Ledger' },
    { id: 'expenses', label: 'Expenses & Receipts', icon: Receipt, badge: 'Bills', adminOnly: true },
    { id: 'budget', label: 'Budget Planner', icon: Wallet, adminOnly: true },
    { id: 'settings', label: 'Committee Settings', icon: Settings, adminOnly: true },
    { id: 'users', label: 'User & Volunteer Logins', icon: Users, adminOnly: true },
    { id: 'events', label: 'Events & Schedules', icon: Calendar, adminOnly: true },
    { id: 'announcements', label: 'Noticeboard', icon: Megaphone, adminOnly: true },
    { id: 'gallery', label: 'Photo Gallery', icon: Camera, badge: 'Cloud', adminOnly: true },
  ].filter((item) => !isVolunteer || !item.adminOnly);

  const committeeName = settings?.committeeName || 'Ganesh Utsav Committee';

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#1A1612] flex flex-col lg:flex-row festive-pattern text-stone-800 dark:text-stone-200">
      
      {/* FIXED GLASSMORPHISM SIDEBAR */}
      <aside
        className={`lg:sticky lg:top-0 lg:h-screen glass-panel border-r border-saffron-200/60 dark:border-saffron-900/30 transition-all duration-300 z-30 flex flex-col justify-between p-4 shrink-0 overflow-y-auto ${
          sidebarCollapsed ? 'w-full lg:w-20' : 'w-full lg:w-72'
        }`}
      >
        <div>
          {/* Sidebar Top Logo Header */}
          <div className="flex items-center justify-between pb-4 border-b border-saffron-200/50 dark:border-stone-800">
            <div className="flex items-center space-x-3 cursor-pointer overflow-hidden" onClick={() => navigate('/')}>
              <div className="p-2 rounded-2xl bg-gradient-to-tr from-saffron-500 via-gold-400 to-amber-600 text-white shadow-md shrink-0">
                <GaneshaLineArt className="w-8 h-8 text-white" glow={false} strokeColor="#FFFFFF" />
              </div>
              {!sidebarCollapsed && (
                <div className="truncate">
                  <h1 className="font-serif font-bold text-sm text-saffron-900 dark:text-gold-300 truncate">
                    {committeeName}
                  </h1>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Admin Panel ({festivalYear})
                  </span>
                </div>
              )}
            </div>

            {/* Collapse Toggle Button (Desktop) */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 rounded-xl bg-saffron-100/70 dark:bg-stone-800 text-saffron-800 dark:text-gold-300 hover:bg-saffron-200 transition-colors"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Sidebar Vertical Navigation List */}
          <nav className="mt-6 space-y-1.5">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-saffron-500 to-amber-600 text-white shadow-md shadow-saffron-500/25'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-saffron-100/60 dark:hover:bg-stone-800/60'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-saffron-600 dark:text-gold-400 group-hover:scale-110 transition-transform'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!sidebarCollapsed && item.badge && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase ${isActive ? 'bg-white/20 text-white' : 'bg-saffron-100 text-saffron-800 dark:bg-stone-800 dark:text-gold-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* PINNED BOTTOM OPTIONS IN SIDEBAR (Public Portal & Sign Out) */}
        <div className="pt-4 border-t border-saffron-200/50 dark:border-stone-800 space-y-2 mt-6">
          <button
            onClick={() => navigate('/')}
            className={`w-full py-2.5 px-3 rounded-xl bg-saffron-50 dark:bg-stone-800/80 text-saffron-900 dark:text-gold-300 font-semibold text-xs border border-saffron-200/60 flex items-center hover:bg-saffron-100 transition-colors ${sidebarCollapsed ? 'justify-center' : 'justify-start space-x-2.5'}`}
            title="Return to Public Portal"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-saffron-600" />
            {!sidebarCollapsed && <span>Public Portal</span>}
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className={`w-full py-2.5 px-3 rounded-xl text-red-600 bg-red-50 dark:bg-stone-800/60 hover:bg-red-100 font-semibold text-xs flex items-center transition-colors ${sidebarCollapsed ? 'justify-center' : 'justify-start space-x-2.5'}`}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE CONTENT WITH REBUILT CLEAN TOP NAVBAR */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-h-screen">
        
        {/* REBUILT CLEAN TOP NAVBAR */}
        <header className="glass-panel p-4 rounded-2xl mb-8 flex items-center justify-between shadow-sm border border-saffron-200/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-saffron-500/10 text-saffron-600">
              <GaneshaLineArt className="w-7 h-7 text-saffron-500" glow={false} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-saffron-600 dark:text-gold-400">
                ADMIN WORKSPACE
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-cream-50 leading-tight">
                {sidebarNavItems.find(t => t.id === activeTab)?.label}
              </h2>
            </div>
          </div>

          {/* Right Controls: Dark Mode & Sign Out Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-saffron-100/60 dark:bg-stone-800 text-saffron-700 dark:text-gold-300 hover:bg-saffron-200 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Profile Pill */}
            <div className="hidden sm:flex items-center space-x-2 bg-saffron-50 dark:bg-stone-800 px-3 py-1.5 rounded-xl border border-saffron-200/60 text-xs">
              <div className="w-6 h-6 rounded-full bg-saffron-500 text-white font-bold flex items-center justify-center text-[10px]">
                {user?.name ? user.name[0].toUpperCase() : 'A'}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-stone-800 dark:text-stone-200 leading-none">{user?.name || 'Treasurer'}</span>
                <span className="text-[9px] uppercase font-extrabold text-saffron-600 dark:text-gold-400 mt-0.5">{user?.role || 'admin'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-stone-800 text-red-600 font-semibold text-xs hover:bg-red-100 transition-colors flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Animated Workspace View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && isAdmin && <AdminOverview onNavigateTab={setActiveTab} />}
            {activeTab === 'contributions' && <FastContributionEntry />}
            {activeTab === 'expenses' && isAdmin && <ExpensesManager />}
            {activeTab === 'budget' && isAdmin && <BudgetPlanner />}
            {activeTab === 'settings' && isAdmin && <SettingsManager />}
            {activeTab === 'users' && isAdmin && <UserAccountsManager />}
            {activeTab === 'events' && isAdmin && <EventsManager />}
            {activeTab === 'announcements' && isAdmin && <AnnouncementsManager />}
            {activeTab === 'gallery' && isAdmin && <GalleryManager />}
          </motion.div>
        </AnimatePresence>

      </main>

    </div>
  );
};
