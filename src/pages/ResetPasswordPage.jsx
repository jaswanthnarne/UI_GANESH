import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DiyaMotif } from '../components/PastelMotifs';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const { resetPassword } = useAuthStore();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMsg('');
      const res = await resetPassword(token, newPassword);
      setMsg(res.message || 'Password reset successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 festive-pattern">
      <div className="bg-[#FAF6F0] dark:bg-[#1E1812] border-2 border-saffron-300 dark:border-saffron-800 rounded-3xl max-w-md w-full p-8 shadow-2xl">
        
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-saffron-500/10 text-saffron-600 mb-3">
            <DiyaMotif className="w-10 h-10 text-saffron-500" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-saffron-900 dark:text-gold-300">
            Set New Admin Password
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Ganesh Chaturthi Fund & Event Transparency Portal
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-800 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        {msg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{msg} Redirecting to login...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-stone-600 dark:text-stone-300 font-semibold mb-1">New Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-stone-600 dark:text-stone-300 font-semibold mb-1">Confirm New Password *</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500 text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md shadow-saffron-500/20 flex items-center justify-center space-x-1"
          >
            <span>{loading ? 'Resetting Password...' : 'Save New Password'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
