import React, { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Megaphone, Trash2, Pin } from 'lucide-react';

export const AnnouncementsManager = () => {
  const { announcements, addAnnouncement, deleteAnnouncement } = useDataStore();

  const [form, setForm] = useState({
    title: '',
    body: '',
    pinned: false,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.body) {
      setMsg('Please fill announcement title and body.');
      return;
    }

    try {
      setLoading(true);
      setMsg('');
      await addAnnouncement(form);
      setMsg('Announcement posted successfully!');
      setForm({ title: '', body: '', pinned: false });
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
          <Megaphone className="w-5 h-5 mr-2 text-saffron-600" />
          Community Noticeboard Manager
        </h3>
        <p className="text-xs text-stone-500">
          Publish official notices, Aarti schedule changes, and community announcements.
        </p>
      </div>

      {msg && (
        <div className="p-3 rounded-xl bg-saffron-100 dark:bg-stone-800 text-saffron-900 font-semibold text-xs text-center">
          {msg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Announcement Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Sthapana Pooja Timing & Guidelines"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
          />
        </div>

        <div>
          <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Notice Body / Message *</label>
          <textarea
            rows="3"
            required
            placeholder="Enter notice details..."
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center space-x-2 text-stone-700 dark:text-stone-300 cursor-pointer">
            <input
              type="checkbox"
              checked={form.pinned}
              onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
              className="rounded text-saffron-600 focus:ring-saffron-500"
            />
            <span>Pin to top of Community Dashboard</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs"
          >
            {loading ? 'Publishing...' : '+ Publish Announcement'}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 mb-4">
          Active Announcements ({announcements.length})
        </h4>

        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a._id} className="p-4 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-saffron-200/50 flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center space-x-2">
                  {a.pinned && <Pin className="w-3.5 h-3.5 text-saffron-600" />}
                  <span className="font-bold text-stone-900 dark:text-stone-100">{a.title}</span>
                </div>
                <p className="text-stone-500 text-[11px] mt-1">{a.body}</p>
              </div>

              <button
                onClick={() => deleteAnnouncement(a._id)}
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
