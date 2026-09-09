import React, { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Calendar, Trash2, Plus, Users } from 'lucide-react';

export const EventsManager = () => {
  const { events, addEvent, deleteEvent } = useDataStore();

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '07:30 PM',
    category: 'aarti',
    location: 'Main Mandap',
    slotsString: 'Pooja Assistant, Prasad Distribution Coordinator, Stage Lead',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      setMsg('Please fill event title and date.');
      return;
    }

    try {
      setLoading(true);
      setMsg('');

      const slotsArray = form.slotsString
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((role) => ({
          role,
          maxSlots: 3,
          assignedTo: [],
        }));

      await addEvent({
        title: form.title,
        description: form.description,
        date: form.date,
        time: form.time,
        category: form.category,
        location: form.location,
        volunteerSlots: slotsArray,
      });

      setMsg('Event scheduled successfully!');
      setForm({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: '07:30 PM',
        category: 'aarti',
        location: 'Main Mandap',
        slotsString: 'Pooja Assistant, Prasad Distribution Coordinator, Stage Lead',
      });
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-cream-50 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-saffron-600" />
          Event Schedule & Volunteer Roster Manager
        </h3>
        <p className="text-xs text-stone-500">
          Add Aarti timings, Mahaprasad events, Visarjan procession info, and volunteer slot roles.
        </p>
      </div>

      {msg && (
        <div className="p-3 rounded-xl bg-saffron-100 dark:bg-stone-800 text-saffron-900 font-semibold text-xs text-center">
          {msg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Event Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Mahaprasad & Evening Grand Aarti"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
            >
              <option value="aarti">Daily Aarti</option>
              <option value="prasad">Prasad Distribution</option>
              <option value="visarjan">Visarjan Procession</option>
              <option value="cultural">Cultural Program</option>
              <option value="other">Other Ritual</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Date *</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Time</label>
            <input
              type="text"
              placeholder="e.g. 07:30 PM"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Location Venue</label>
            <input
              type="text"
              placeholder="e.g. Clubhouse Courtyard"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Event Description</label>
          <textarea
            rows="2"
            placeholder="Details about pooja rituals, special prasad, or guidelines"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
          />
        </div>

        <div>
          <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
            Volunteer Slot Roles (Comma separated roles for resident signup)
          </label>
          <input
            type="text"
            placeholder="Pooja Assistant, Refreshments Team, Queue Manager"
            value={form.slotsString}
            onChange={(e) => setForm({ ...form, slotsString: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 text-xs"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs"
        >
          {loading ? 'Saving...' : '+ Schedule Event'}
        </button>
      </form>

      {/* Events List */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 mb-4">
          Scheduled Events ({events.length})
        </h4>

        <div className="space-y-3">
          {events.map((ev) => (
            <div key={ev._id} className="p-4 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-saffron-200/50 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-saffron-900 dark:text-gold-300">{ev.title}</span>
                <span className="mx-2 text-stone-300">•</span>
                <span className="text-stone-500">{new Date(ev.date).toLocaleDateString('en-IN')} at {ev.time}</span>
                <p className="text-stone-500 text-[11px] mt-0.5">{ev.description}</p>
              </div>

              <button
                onClick={() => deleteEvent(ev._id)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
