import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { X, Lock, KeyRound, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose }) => {
  const { login, forgotPassword } = useAuthStore();
  const [tab, setTab] = useState('login'); // 'login' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.message || 'Login failed');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await forgotPassword(email);
      setMessage(res.message);
      if (res.devResetUrl) {
        console.log('[Dev Reset URL]:', res.devResetUrl);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF6F0] dark:bg-[#1E1812] border-2 border-saffron-300 dark:border-saffron-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-saffron-500/10 text-saffron-600 mb-2">
            <ShieldCheck className="w-8 h-8 text-saffron-500" />
          </div>
          <h3 className="font-serif font-bold text-xl text-saffron-900 dark:text-gold-300">
            {tab === 'login' ? 'Committee Admin Login' : 'Reset Admin Password'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {tab === 'login'
              ? 'Enter committee credentials to manage funds & events'
              : 'Enter your account email to receive a password reset link'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-medium text-center">
            {message}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-300 font-semibold mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@ganeshtracker.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-stone-600 dark:text-stone-300 font-semibold">Password</label>
                <button
                  type="button"
                  onClick={() => setTab('forgot')}
                  className="text-saffron-600 hover:underline text-[11px]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md shadow-saffron-500/20 transition-all flex items-center justify-center space-x-1"
            >
              <span>{loading ? 'Authenticating...' : 'Log In to Admin Panel'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-600 dark:text-stone-300 font-semibold mb-1">Registered Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@ganeshtracker.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md shadow-saffron-500/20 transition-all flex items-center justify-center"
            >
              {loading ? 'Generating Link...' : 'Send Reset Link'}
            </button>

            <button
              type="button"
              onClick={() => setTab('login')}
              className="w-full text-center text-stone-500 hover:text-stone-800 text-[11px] font-medium"
            >
              Back to Login
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
