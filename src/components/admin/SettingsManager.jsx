import React, { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Building2, Save, Sparkles, CheckCircle2, QrCode } from 'lucide-react';

export const SettingsManager = () => {
  const { settings, updateSettings, festivalYear } = useDataStore();

  const [form, setForm] = useState({
    committeeName: settings?.committeeName || 'Ganesh Utsav Celebration Committee 2026',
    address: settings?.address || 'Royal Palms Apartment, Phase 1 & 2',
    targetGoal: settings?.targetGoal || 100000,
    upiId: settings?.upiId || 'ganeshutsav@upi',
    upiName: settings?.upiName || 'Royal Palms Ganesh Committee',
    contactPhone: settings?.contactPhone || '+91 98765 43210',
    announcementNotice: settings?.announcementNotice || 'Ganesh Chaturthi 2026 celebrations start on Sept 14th!',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMsg('');
      const res = await updateSettings(form);
      setMsg(res.message || 'Settings updated and reflected live on public landing page!');
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
          <Building2 className="w-5 h-5 mr-2 text-saffron-600" />
          Community & Festival Settings
        </h3>
        <p className="text-xs text-stone-500">
          Modify Committee Name, Apartment Address, Target Budget Goal, and UPI Details. Changes reflect live across the public landing page!
        </p>
      </div>

      {msg && (
        <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-xs text-center flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-6">
        
        {/* Section 1: Community Branding */}
        <div>
          <h4 className="font-serif font-bold text-sm text-saffron-900 dark:text-gold-300 mb-3 uppercase tracking-wider">
            1. Society & Festival Branding
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Committee / Festival Name *
              </label>
              <input
                type="text"
                required
                value={form.committeeName}
                onChange={(e) => setForm({ ...form, committeeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Society / Apartment Address *
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Target Budget & Year */}
        <div>
          <h4 className="font-serif font-bold text-sm text-saffron-900 dark:text-gold-300 mb-3 uppercase tracking-wider">
            2. Budget & Financial Goals
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Target Budget Goal (₹) *
              </label>
              <input
                type="number"
                inputMode="numeric"
                required
                value={form.targetGoal}
                onChange={(e) => setForm({ ...form, targetGoal: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 font-bold text-saffron-900 focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Treasurer Contact Phone
              </label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: UPI Offline Payment Info */}
        <div>
          <h4 className="font-serif font-bold text-sm text-saffron-900 dark:text-gold-300 mb-3 uppercase tracking-wider flex items-center">
            <QrCode className="w-4 h-4 mr-1.5" />
            3. Offline Payment / UPI Info
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                UPI ID (e.g. ganeshutsav@upi)
              </label>
              <input
                type="text"
                value={form.upiId}
                onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500 font-mono text-saffron-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Payee Account Name
              </label>
              <input
                type="text"
                value={form.upiName}
                onChange={(e) => setForm({ ...form, upiName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Notice Ticker */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
            Hero Ticker Announcement Notice
          </label>
          <input
            type="text"
            value={form.announcementNotice}
            onChange={(e) => setForm({ ...form, announcementNotice: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 text-xs focus:ring-2 focus:ring-saffron-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-lg shadow-saffron-500/25 flex items-center justify-center space-x-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving Settings...' : 'Save & Publish Settings Live'}</span>
        </button>

      </form>
    </div>
  );
};
