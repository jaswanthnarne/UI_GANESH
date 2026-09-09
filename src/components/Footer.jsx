import React from 'react';
import { Link } from 'react-router-dom';
import { GaneshaLineArt } from './GaneshaLineArt';
import { QrCode, Phone, MapPin, Shield } from 'lucide-react';

export const Footer = ({ settings }) => {
  const committeeName = settings?.committeeName || 'Ganesh Utsav Celebration Committee';
  const address = settings?.address || 'Apartment Community';
  const upiId = settings?.upiId || 'ganeshutsav@upi';
  const upiName = settings?.upiName || 'Treasurer - Ganesh Committee';
  const phone = settings?.contactPhone || '+91 98765 43210';
  const festivalYear = settings?.festivalYear || 2026;

  return (
    <footer className="mt-20 border-t border-saffron-200/60 dark:border-saffron-900/30 bg-cream-100/50 dark:bg-[#15110E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Col 1: Committee Details */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 rounded-2xl bg-saffron-500 text-white">
              <GaneshaLineArt className="w-7 h-7 text-white" glow={false} />
            </div>
            <h3 className="font-serif font-bold text-lg text-saffron-900 dark:text-gold-300">
              {committeeName}
            </h3>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
            Building trust, joy, and transparency across our residential community during Ganesh Utsav.
          </p>
          <p className="text-xs text-stone-500 flex items-center mb-1">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-saffron-500" />
            {address}
          </p>
          <p className="text-xs text-stone-500 flex items-center">
            <Phone className="w-3.5 h-3.5 mr-1.5 text-saffron-500" />
            Treasurer: {phone}
          </p>
        </div>

        {/* Col 2: Offline UPI Contribution Details */}
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <h4 className="font-serif font-bold text-sm text-saffron-900 dark:text-gold-300 flex items-center mb-2">
              <QrCode className="w-4 h-4 mr-2 text-saffron-600" />
              Offline Contribution UPI Info
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-3">
              Contributions are collected offline via cash or UPI. Payments are logged and verified by our authorized committee treasurers.
            </p>
            <div className="p-3 rounded-xl bg-saffron-50 dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 text-xs">
              <p className="font-semibold text-stone-700 dark:text-stone-300">UPI ID: <span className="text-saffron-700 dark:text-gold-400 font-mono">{upiId}</span></p>
              <p className="text-[11px] text-stone-500 mt-0.5">Payee Name: {upiName}</p>
            </div>
          </div>
        </div>

        {/* Col 3: Quick Links & Transparency Seal */}
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="font-serif font-bold text-sm text-saffron-900 dark:text-gold-300 mb-3">
              Community Portal Features
            </h4>
            <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-2">
              <li className="flex items-center">
                <Shield className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                Verified & Transparent Financial Ledger
              </li>
              <li className="flex items-center">
                <Shield className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                Digital Verified Bill & Receipt Records
              </li>
              <li className="flex items-center">
                <Shield className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                Downloadable 2-Page Receipt with Ganesh Shlokas
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-saffron-200/50 dark:border-stone-800 flex justify-between items-center text-[11px] text-stone-400">
            <span>© {festivalYear} {committeeName}</span>
            <Link to="/login" className="hover:text-saffron-600 underline font-semibold">
              Committee Sign In
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
