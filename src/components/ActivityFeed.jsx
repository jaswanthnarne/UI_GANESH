import React, { useState } from 'react';
import { Search, Share2, Receipt, ArrowUpRight, ArrowDownLeft, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ActivityFeed = ({ contributions, expenses, onSelectReceipt }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'contributions', 'expenses'
  const [search, setSearch] = useState('');

  // Filter contributions
  const filteredContributions = (contributions || []).filter((c) => {
    const q = search.toLowerCase();
    const flat = (c.flatNumber || '').toLowerCase();
    const name = (c.contributorName || '').toLowerCase();
    const notes = (c.notes || '').toLowerCase();
    return flat.includes(q) || name.includes(q) || notes.includes(q);
  });

  // Filter expenses
  const filteredExpenses = (expenses || []).filter((e) => {
    const q = search.toLowerCase();
    const desc = (e.description || '').toLowerCase();
    const vendor = (e.vendor || '').toLowerCase();
    const category = (e.category || '').toLowerCase();
    return desc.includes(q) || vendor.includes(q) || category.includes(q);
  });

  return (
    <section id="ledger-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-cream-50 flex items-center">
            <FileText className="w-6 h-6 mr-2.5 text-saffron-600 dark:text-gold-400" />
            Live Financial Ledger
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Read-only, transparent log of all contributions received & verified expenses.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search flat, name, vendor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 dark:border-stone-700 text-xs text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-saffron-400 w-full sm:w-64"
            />
          </div>

          {/* Tabs */}
          <div className="flex bg-saffron-100/70 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-stone-700 text-saffron-900 dark:text-gold-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              All Activity
            </button>
            <button
              onClick={() => setActiveTab('contributions')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'contributions'
                  ? 'bg-white dark:bg-stone-700 text-saffron-900 dark:text-gold-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Contributions ({filteredContributions.length})
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'expenses'
                  ? 'bg-white dark:bg-stone-700 text-saffron-900 dark:text-gold-300 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Expenses ({filteredExpenses.length})
            </button>
          </div>

        </div>
      </div>

      {/* Ledger Table Container */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        
        {/* Table View for Medium+ Screens */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-saffron-100/50 dark:bg-stone-800/80 text-xs uppercase font-semibold text-stone-600 dark:text-stone-300 border-b border-saffron-200/50 dark:border-stone-700">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Flat / Vendor</th>
                <th className="py-3.5 px-4">Contributor / Category</th>
                <th className="py-3.5 px-4 text-right">Amount (₹)</th>
                <th className="py-3.5 px-4 text-center">Action / Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-saffron-200/40 dark:divide-stone-800 text-xs text-stone-800 dark:text-stone-200">
              
              {/* Render Contributions if active */}
              {(activeTab === 'all' || activeTab === 'contributions') &&
                filteredContributions.map((c) => (
                  <tr key={c._id} className="hover:bg-saffron-50/60 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-500 dark:text-stone-400">
                      {new Date(c.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        Contrib ({c.mode ? c.mode.toUpperCase() : 'UPI'})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-saffron-900 dark:text-gold-300">
                      Flat {c.flatNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      {c.isAnonymous ? (
                        <span className="italic text-stone-400">Anonymous Resident</span>
                      ) : (
                        <span className="font-semibold">{c.contributorName}</span>
                      )}
                      {c.notes && <p className="text-[11px] text-stone-500 font-normal italic">{c.notes}</p>}
                    </td>
                    <td className="py-3.5 px-4 text-right font-display font-bold text-sm text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                      + ₹{c.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => onSelectReceipt(c)}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg bg-saffron-100 dark:bg-stone-800 text-saffron-800 dark:text-gold-300 hover:bg-saffron-200 transition-colors text-[11px] font-medium"
                        title="Generate & Share WhatsApp Receipt"
                      >
                        <Share2 className="w-3.5 h-3.5 mr-1" />
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))}

              {/* Render Expenses if active */}
              {(activeTab === 'all' || activeTab === 'expenses') &&
                filteredExpenses.map((e) => (
                  <tr key={e._id} className="hover:bg-amber-50/60 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap text-stone-500 dark:text-stone-400">
                      {new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        <ArrowDownLeft className="w-3 h-3 mr-1" />
                        Expense
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-700 dark:text-stone-300">
                      {e.vendor || 'Authorized Vendor'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-stone-800 dark:text-stone-200">{e.description}</span>
                      <p className="text-[11px] text-stone-500 font-normal uppercase tracking-wider">{e.category.replace('_', ' ')}</p>
                    </td>
                    <td className="py-3.5 px-4 text-right font-display font-bold text-sm text-amber-700 dark:text-amber-400 whitespace-nowrap">
                      - ₹{e.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {e.receiptImageUrl ? (
                        <a
                          href={e.receiptImageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-stone-800 text-amber-800 dark:text-amber-300 hover:bg-amber-200 transition-colors text-[11px] font-medium"
                        >
                          <Receipt className="w-3.5 h-3.5 mr-1" />
                          View Receipt
                        </a>
                      ) : (
                        <span className="text-[11px] text-stone-400 italic">No Photo</span>
                      )}
                    </td>
                  </tr>
                ))}

              {/* Empty state */}
              {filteredContributions.length === 0 && filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-xs text-stone-400">
                    No transactions match your search filter.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
