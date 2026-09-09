import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { GaneshaLineArt } from '../components/GaneshaLineArt';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useDataStore } from '../store/useDataStore';
import { Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, Key, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { login, forgotPassword } = useAuthStore();
  const { settings } = useDataStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isForgot, setIsForgot] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Login failed. Please check your credentials.');
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFillDemo = () => {
    setEmail('admin@ganeshtracker.org');
    setPassword('Admin@Ganesh2026');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto festive-pattern">
          <div className="glass-panel border-2 border-saffron-300 dark:border-saffron-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* LEFT SIDEBAR: PORTAL OVERVIEW & GANESHA ARTWORK */}
            <div className="lg:col-span-5 p-8 bg-gradient-to-br from-saffron-500 via-gold-500 to-amber-600 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
                    <GaneshaLineArt className="w-10 h-10 text-white" glow={false} strokeColor="#FFFFFF" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white">Ganesh Utsav Portal</h3>
                    <p className="text-xs text-gold-100">Committee Admin Workspace</p>
                  </div>
                </div>

                <div className="my-6">
                  <h2 className="font-serif font-extrabold text-2xl text-white leading-tight">
                    Committee & Treasurer Sign In
                  </h2>
                  <p className="text-xs text-gold-100 mt-2 leading-relaxed">
                    Access the executive administration dashboard to log contributions, manage expense receipt uploads to Cloudinary, and update festival settings.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-200 shrink-0" />
                  <span>MongoDB Atlas Backed Ledger DB</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-200 shrink-0" />
                  <span>Cloudinary Receipt Image Uploads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-200 shrink-0" />
                  <span>2-Page PDF Receipts with Ganesh Shlokas</span>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: LOGIN FORM */}
            <div className="lg:col-span-7 p-8 bg-[#FAF6F0] dark:bg-[#1E1812] flex flex-col justify-between">
              <div>
                <div className="text-center md:text-left mb-6">
                  <h3 className="font-serif font-bold text-2xl text-saffron-900 dark:text-gold-300">
                    {isForgot ? 'Reset Password' : 'Account Sign In'}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {isForgot
                      ? 'Enter your account email to receive a password reset link'
                      : 'Sign in with your committee credentials to open the admin dashboard'}
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-800 dark:bg-red-950 text-xs font-semibold text-center">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold text-center">
                    {message}
                  </div>
                )}

                {/* Quick Demo Credentials Autofill Helper */}
                {!isForgot && (
                  <div
                    onClick={handleAutoFillDemo}
                    className="mb-5 p-3.5 rounded-2xl bg-saffron-50 dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 cursor-pointer hover:bg-saffron-100/70 transition-colors text-xs shadow-sm"
                    title="Click to auto-fill default admin credentials"
                  >
                    <div className="flex items-center justify-between font-bold text-saffron-900 dark:text-gold-300 mb-1">
                      <span className="flex items-center">
                        <Key className="w-3.5 h-3.5 mr-1 text-saffron-600" />
                        Default Admin Credentials (Click to Auto-Fill)
                      </span>
                    </div>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px]">Email: <strong className="text-saffron-800 dark:text-gold-400">admin@ganeshtracker.org</strong></p>
                    <p className="text-stone-600 dark:text-stone-300 text-[11px]">Password: <strong className="text-saffron-800 dark:text-gold-400">Admin@Ganesh2026</strong></p>
                  </div>
                )}

                {!isForgot ? (
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
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-stone-600 dark:text-stone-300 font-semibold">Password</label>
                        <button
                          type="button"
                          onClick={() => setIsForgot(true)}
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
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-saffron-500 via-gold-500 to-amber-600 hover:from-saffron-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-saffron-500/20 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <span>{loading ? 'Authenticating...' : 'Sign In & Open Admin Control Panel'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-stone-600 dark:text-stone-300 font-semibold mb-1">Registered Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="email"
                          required
                          placeholder="admin@ganeshtracker.org"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 focus:ring-2 focus:ring-saffron-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs"
                    >
                      {loading ? 'Sending Link...' : 'Send Password Reset Link'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsForgot(false)}
                      className="w-full text-center text-stone-500 hover:text-stone-800 text-[11px]"
                    >
                      Back to Sign In
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800 text-center text-[11px] text-stone-400">
                <Link to="/" className="hover:text-saffron-600 underline font-medium">
                  ← Return to Public Festival Portal
                </Link>
              </div>

            </div>

          </div>
        </main>
      </div>

      <Footer settings={settings} />
    </div>
  );
};
