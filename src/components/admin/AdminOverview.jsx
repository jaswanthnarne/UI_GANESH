import React from 'react';
import { useDataStore } from '../../store/useDataStore';
import API from '../../services/api';
import { TrendingUp, Wallet, Receipt, Award, ArrowUpRight, ArrowDownLeft, ShieldCheck, Download, PlusCircle, Layers, Settings, FileDown } from 'lucide-react';

export const AdminOverview = ({ onNavigateTab }) => {
  const { summary, contributions, expenses, settings, festivalYear } = useDataStore();

  const metrics = summary?.metrics || {
    totalCollected: 0,
    totalSpent: 0,
    netBalance: 0,
    targetGoal: 100000,
    progressPercentage: 0,
    totalContributors: 0,
    totalExpenseRecords: 0,
  };

  const recentContribs = (contributions || []).slice(0, 5);
  const recentExps = (expenses || []).slice(0, 5);

  const handleExportFullReport = async () => {
    try {
      const year = festivalYear || settings?.festivalYear || 2026;
      const response = await API.get(`/public/export-csv?festivalYear=${year}`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Ganesh_Utsav_${year}_Financial_Report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Failed to export full financial report');
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-card rounded-3xl bg-gradient-to-r from-saffron-500/10 via-gold-500/10 to-amber-500/10 border border-saffron-300/40">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-saffron-500 text-white uppercase tracking-wider">
            EXECUTIVE COMMITTEE DASHBOARD — {festivalYear}
          </span>
          <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-cream-50 mt-2">
            Welcome, Treasurer & Committee Admin
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
            Real-time financial status, budget target tracking, and quick administrative actions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigateTab('contributions')}
            className="px-4 py-2.5 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Log Contribution</span>
          </button>

          <button
            onClick={() => onNavigateTab('expenses')}
            className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md flex items-center space-x-1.5"
          >
            <Receipt className="w-4 h-4" />
            <span>+ Log Expense</span>
          </button>

          <button
            onClick={handleExportFullReport}
            className="px-4 py-2.5 rounded-2xl bg-cream-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-xs border border-saffron-300/60 hover:bg-cream-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
            title="Export full financial statement CSV"
          >
            <FileDown className="w-4 h-4 text-saffron-700 dark:text-gold-400" />
            <span>Export Full CSV</span>
          </button>
        </div>
      </div>

      {/* 3 Main Executive KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Funds Collected */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-saffron-700 dark:text-saffron-300">
              Total Collected Funds
            </span>
            <div className="p-3 rounded-2xl bg-saffron-500/10 text-saffron-600 dark:text-gold-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-cream-50">
              ₹{metrics.totalCollected.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              From <strong className="text-emerald-600 font-bold">{metrics.totalContributors}</strong> resident entries
            </p>
          </div>
          
          <div className="mt-4 pt-3 border-t border-saffron-200/50 flex items-center justify-between text-xs">
            <span className="text-stone-500">Target Budget: ₹{metrics.targetGoal.toLocaleString('en-IN')}</span>
            <button onClick={() => onNavigateTab('contributions')} className="text-saffron-600 font-bold hover:underline">
              Manage Funds →
            </button>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Total Expenses Spent
            </span>
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Receipt className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-cream-50">
              ₹{metrics.totalSpent.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Across <strong className="text-amber-600 font-bold">{metrics.totalExpenseRecords}</strong> verified bill items
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-saffron-200/50 flex items-center justify-between text-xs">
            <span className="text-stone-500">Verified Bill Receipts</span>
            <button onClick={() => onNavigateTab('expenses')} className="text-amber-600 font-bold hover:underline">
              Manage Bills →
            </button>
          </div>
        </div>

        {/* Current Net Balance */}
        <div className="glass-card p-6 rounded-3xl relative overflow-hidden border-2 border-emerald-400/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Current Available Reserve
            </span>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-display font-bold text-3xl sm:text-4xl text-emerald-700 dark:text-emerald-400">
              ₹{metrics.netBalance.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Net balance available in committee account
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-saffron-200/50 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-bold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Healthy Status
            </span>
            <button onClick={() => onNavigateTab('settings')} className="text-stone-600 font-bold hover:underline">
              Edit Settings →
            </button>
          </div>
        </div>

      </div>

      {/* Recent Ledger Summary Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Contributions */}
        <div className="glass-panel p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 flex items-center">
              <ArrowUpRight className="w-5 h-5 mr-2 text-emerald-600" />
              Recent Funds Collected
            </h4>
            <button onClick={() => onNavigateTab('contributions')} className="text-xs text-saffron-600 font-bold hover:underline">
              View All ({contributions.length})
            </button>
          </div>

          <div className="space-y-3">
            {recentContribs.map((c) => (
              <div key={c._id} className="p-3 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-saffron-200/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-saffron-900 dark:text-gold-300">Flat {c.flatNumber}</span>
                  <span className="mx-2 text-stone-300">•</span>
                  <span className="font-semibold">{c.contributorName}</span>
                  <p className="text-[10px] text-stone-400">{new Date(c.date).toLocaleDateString('en-IN')}</p>
                </div>
                <span className="font-display font-bold text-sm text-emerald-700 dark:text-emerald-400">
                  + ₹{c.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="glass-panel p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 flex items-center">
              <ArrowDownLeft className="w-5 h-5 mr-2 text-amber-600" />
              Recent Expense Records
            </h4>
            <button onClick={() => onNavigateTab('expenses')} className="text-xs text-amber-600 font-bold hover:underline">
              View All ({expenses.length})
            </button>
          </div>

          <div className="space-y-3">
            {recentExps.map((e) => (
              <div key={e._id} className="p-3 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-saffron-200/40 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{e.description}</span>
                  <p className="text-[10px] text-stone-400">Vendor: {e.vendor || 'N/A'}</p>
                </div>
                <span className="font-display font-bold text-sm text-amber-700 dark:text-amber-400">
                  - ₹{e.amount.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
