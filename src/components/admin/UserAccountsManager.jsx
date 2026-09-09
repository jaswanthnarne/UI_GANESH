import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserPlus, Shield, Trash2, Users, CheckCircle2 } from 'lucide-react';

export const UserAccountsManager = () => {
  const { usersList, fetchUserAccounts, createUserAccount, deleteUserAccount, user: currentUser } = useAuthStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchUserAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setMsg('Please fill name, email, and password');
      return;
    }

    try {
      setLoading(true);
      setMsg('');
      await createUserAccount(form);
      setMsg(`Created account for ${form.name} (${form.role})!`);
      setForm({ name: '', email: '', password: '', role: 'admin' });
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this committee account?')) {
      try {
        await deleteUserAccount(id);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-cream-50 flex items-center">
          <Users className="w-5 h-5 mr-2 text-saffron-600" />
          Committee & Volunteer Logins Management
        </h3>
        <p className="text-xs text-stone-500">
          Create login accounts for fellow committee members, treasurers, and event volunteers.
        </p>
      </div>

      {msg && (
        <div className="p-3.5 rounded-2xl bg-saffron-100 dark:bg-stone-800 text-saffron-900 dark:text-gold-300 font-semibold text-xs text-center flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      {/* Create User Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-4">
        <h4 className="font-serif font-bold text-sm text-saffron-900 dark:text-gold-300 uppercase tracking-wider">
          + Create New Account
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Deshmukh"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Email Address (Login ID) *</label>
            <input
              type="email"
              required
              placeholder="e.g. vikram@ganeshtracker.org"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Initial Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Role / Access Level</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
            >
              <option value="admin">Committee Admin (Full CRUD access)</option>
              <option value="volunteer">Volunteer (View & Entry access)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md shadow-saffron-500/20"
        >
          {loading ? 'Creating Account...' : '+ Create Account'}
        </button>
      </form>

      {/* User Accounts List */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 mb-4">
          Active Committee Accounts ({usersList.length})
        </h4>

        <div className="space-y-3">
          {usersList.map((u) => {
            const uid = u.id || u._id;
            const isSelf = currentUser?.id === uid || currentUser?._id === uid;

            return (
              <div key={uid} className="p-3.5 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-saffron-200/50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{u.name}</span>
                  <span className="mx-2 text-stone-300">•</span>
                  <span className="text-stone-500">{u.email}</span>
                  <span className="mx-2 text-stone-300">•</span>
                  <span className="uppercase text-[10px] px-2 py-0.5 rounded-full bg-saffron-100 text-saffron-800 font-bold">
                    {u.role}
                  </span>
                  {isSelf && <span className="ml-2 text-[10px] text-emerald-600 font-bold">(You)</span>}
                </div>

                {!isSelf && (
                  <button
                    onClick={() => handleDelete(uid)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete Account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
