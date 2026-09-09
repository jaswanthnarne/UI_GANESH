import React from 'react';
import { Megaphone, Pin, Calendar, User } from 'lucide-react';

export const AnnouncementsSection = ({ announcements }) => {
  if (!announcements || announcements.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-cream-50 flex items-center">
          <Megaphone className="w-6 h-6 mr-2.5 text-saffron-600 dark:text-gold-400" />
          Community Announcements
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Official festival updates, pooja timings, and committee notices.
        </p>
      </div>

      {/* Grid of Announcements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {announcements.map((item) => (
          <div
            key={item._id}
            className={`glass-card p-6 rounded-3xl relative transition-all ${
              item.pinned
                ? 'border-2 border-saffron-400 dark:border-saffron-500/50 shadow-md'
                : ''
            }`}
          >
            {item.pinned && (
              <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-saffron-500 text-white uppercase tracking-wider">
                <Pin className="w-3 h-3 mr-1" />
                Pinned Notice
              </span>
            )}

            <div className="flex items-center space-x-2 text-[11px] text-stone-400 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>

            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 mb-2">
              {item.title}
            </h3>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
              {item.body}
            </p>

            <div className="mt-4 pt-3 border-t border-saffron-200/50 dark:border-stone-800 flex items-center text-[10px] text-stone-400">
              <User className="w-3 h-3 mr-1 text-saffron-500" />
              <span>Posted by {item.author || 'Committee'}</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
