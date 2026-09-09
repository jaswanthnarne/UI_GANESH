import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2, PlusCircle, Sparkles, X } from 'lucide-react';
import { useDataStore } from '../store/useDataStore';

export const EventRoster = ({ events }) => {
  const { signUpVolunteer } = useDataStore();
  const [selectedSlot, setSelectedSlot] = useState(null); // { eventId, slot }
  const [form, setForm] = useState({ name: '', phone: '', flatNumber: '' });
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.flatNumber) {
      setStatusMsg('Please provide your name and flat number');
      return;
    }

    try {
      setLoading(true);
      setStatusMsg('');
      const res = await signUpVolunteer(selectedSlot.eventId, selectedSlot.slot._id, form);
      setStatusMsg(res.message || 'Successfully registered as volunteer!');
      setTimeout(() => {
        setSelectedSlot(null);
        setForm({ name: '', phone: '', flatNumber: '' });
        setStatusMsg('');
      }, 1500);
    } catch (err) {
      setStatusMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="events-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-cream-50 flex items-center">
          <Sparkles className="w-6 h-6 mr-2.5 text-gold-500" />
          Event Schedule & Volunteer Roster
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Aarti schedule, Mahaprasad duties & resident volunteer registration.
        </p>
      </div>

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(events || []).map((event) => (
          <div key={event._id} className="glass-card p-6 rounded-3xl flex flex-col justify-between">
            <div>
              
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 dark:bg-stone-800 dark:text-gold-300 border border-saffron-300/40">
                  {event.category.toUpperCase()}
                </span>
                <span className="text-xs text-stone-500 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-saffron-500" />
                  {event.time}
                </span>
              </div>

              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-cream-100 mb-1">
                {event.title}
              </h3>

              <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center mb-3">
                <MapPin className="w-3.5 h-3.5 mr-1 text-saffron-600" />
                {event.location || 'Clubhouse Mandap'} — {new Date(event.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                {event.description}
              </p>

              {/* Volunteer Slots List */}
              <div className="mt-4 pt-4 border-t border-saffron-200/50 dark:border-stone-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-900 dark:text-gold-300 flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1.5" />
                  Volunteer Roster
                </h4>

                {event.volunteerSlots && event.volunteerSlots.length > 0 ? (
                  event.volunteerSlots.map((slot) => {
                    const isFull = slot.assignedTo.length >= slot.maxSlots;

                    return (
                      <div key={slot._id} className="p-3 rounded-2xl bg-white/70 dark:bg-stone-800/70 border border-saffron-200/40 dark:border-stone-700/50 text-xs">
                        <div className="flex items-center justify-between font-semibold">
                          <span>{slot.role}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${isFull ? 'bg-stone-200 text-stone-600' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'}`}>
                            {slot.assignedTo.length} / {slot.maxSlots} Slots
                          </span>
                        </div>

                        {/* Volunteers Assigned List */}
                        {slot.assignedTo.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {slot.assignedTo.map((v, idx) => (
                              <div key={idx} className="text-[11px] text-stone-600 dark:text-stone-300 flex items-center justify-between">
                                <span>• {v.name} (Flat {v.flatNumber})</span>
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                              </div>
                            ))}
                          </div>
                        )}

                        {!isFull && (
                          <button
                            onClick={() => setSelectedSlot({ eventId: event._id, slot })}
                            className="mt-2 w-full py-1.5 rounded-xl bg-saffron-500/10 hover:bg-saffron-500/20 text-saffron-700 dark:text-gold-300 font-semibold text-[11px] flex items-center justify-center space-x-1 transition-colors"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Sign Up as Volunteer</span>
                          </button>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[11px] text-stone-400 italic">No specific volunteer roles requested yet.</p>
                )}

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Volunteer Signup Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-[#FAF6F0] dark:bg-[#1E1812] border-2 border-saffron-400 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedSlot(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif font-bold text-lg text-saffron-900 dark:text-gold-300 mb-1">
              Sign Up for Volunteer Role
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Role: <strong className="text-stone-800 dark:text-stone-200">{selectedSlot.slot.role}</strong>
            </p>

            {statusMsg && (
              <div className="mb-4 p-2.5 rounded-xl bg-saffron-100 dark:bg-stone-800 text-saffron-900 dark:text-saffron-200 text-xs font-semibold text-center">
                {statusMsg}
              </div>
            )}

            <form onSubmit={handleSignUpSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 dark:text-stone-300 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-300 font-semibold mb-1">Flat Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B-402"
                  value={form.flatNumber}
                  onChange={(e) => setForm({ ...form, flatNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <div>
                <label className="block text-stone-600 dark:text-stone-300 font-semibold mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-semibold shadow-md shadow-saffron-500/20"
              >
                {loading ? 'Registering...' : 'Confirm Volunteer Registration'}
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
