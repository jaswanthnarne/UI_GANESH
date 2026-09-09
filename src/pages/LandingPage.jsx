import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AnnouncementsSection } from '../components/AnnouncementsSection';
import { EventRoster } from '../components/EventRoster';
import { PhotoGallery } from '../components/PhotoGallery';

export const LandingPage = ({ settings, announcements, events, gallery }) => {
  return (
    <main className="space-y-6">
      {/* 1. Animated Hero Showcase with Ganesha Art & Cursive Headline */}
      <HeroSection settings={settings} />

      {/* 2. Community Noticeboard */}
      <div id="notices-section">
        <AnnouncementsSection announcements={announcements} />
      </div>

      {/* 3. Event Schedule & Resident Volunteer Roster */}
      <div id="schedule-section">
        <div id="volunteers-section">
          <EventRoster events={events} />
        </div>
      </div>

      {/* 4. Celebration Photo Highlights */}
      <div id="gallery-section">
        <PhotoGallery gallery={gallery} />
      </div>
    </main>
  );
};
