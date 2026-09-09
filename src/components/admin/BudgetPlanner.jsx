import React, { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Calculator, Plus, Trash2, Save, Target, CheckCircle2, DollarSign } from 'lucide-react';

export const BudgetPlanner = () => {
  const { settings, updateSettings, festivalYear } = useDataStore();

  // Initial Budget Allocation Items
  const [items, setItems] = useState([
    { id: 1, category: 'Idol Purchase & Advance', amount: 25000 },
    { id: 2, category: 'Mandap Floral & Lighting Setup', amount: 30000 },
    { id: 3, category: 'Mahaprasad & Sweets (10 Days)', amount: 25000 },
    { id: 4, category: 'Sound System & Dhol Tasha Booking', amount: 15000 },
    { id: 5, category: 'Visarjan Eco-Immersion Tank', amount: 5000 },
  ]);

  const [newItemCategory, setNewItemCategory] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Dynamic Total Sum of All Budget Items
  const totalCalculatedSum = items.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemCategory || !newItemAmount) return;
    setItems([
      ...items,
      { id: Date.now(), category: newItemCategory, amount: Number(newItemAmount) },
    ]);
    setNewItemCategory('');
    setNewItemAmount('');
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleApplySumAsTargetGoal = async () => {
    try {
      setLoading(true);
      setMsg('');
      const res = await updateSettings({ targetGoal: totalCalculatedSum });
      setMsg(`Official Target Goal updated to ₹${totalCalculatedSum.toLocaleString('en-IN')} in Database!`);
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
          <Calculator className="w-5 h-5 mr-2 text-saffron-600" />
          Budget Allocation & Target Goal Planner
        </h3>
        <p className="text-xs text-stone-500">
          Enter planned expense items below. The dynamic total sum can be set directly as your community's official target goal!
        </p>
      </div>

      {msg && (
        <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-xs text-center flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      {/* Target Goal KPI Summary Card */}
      <div className="glass-card p-6 rounded-3xl bg-gradient-to-r from-saffron-500/10 via-gold-500/10 to-amber-500/10 border-2 border-saffron-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-saffron-700 dark:text-gold-400">
            DYNAMIC CALCULATED BUDGET TOTAL
          </span>
          <p className="font-display font-extrabold text-4xl text-saffron-900 dark:text-cream-50 mt-1">
            ₹{totalCalculatedSum.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Current DB Target Goal: <strong className="text-saffron-700 dark:text-gold-300">₹{(settings?.targetGoal || 100000).toLocaleString('en-IN')}</strong>
          </p>
        </div>

        <button
          onClick={handleApplySumAsTargetGoal}
          disabled={loading}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-saffron-500 via-gold-500 to-amber-600 hover:from-saffron-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg shadow-saffron-500/25 flex items-center space-x-2 transition-all self-start sm:self-center"
        >
          <Target className="w-4 h-4" />
          <span>{loading ? 'Saving to DB...' : `Set ₹${totalCalculatedSum.toLocaleString('en-IN')} as Official Target Goal`}</span>
        </button>
      </div>

      {/* Add New Item Form */}
      <form onSubmit={addItem} className="glass-card p-6 rounded-3xl space-y-4 text-xs">
        <h4 className="font-serif font-bold text-sm text-saffron-900 dark:text-gold-300 uppercase tracking-wider">
          + Add Budget Line Item
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Item Category / Allocation Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Eco Clay Idol Purchase & Shringar"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Estimated Cost (₹) *</label>
            <input
              type="number"
              inputMode="numeric"
              required
              placeholder="e.g. 20000"
              value={newItemAmount}
              onChange={(e) => setNewItemAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 font-bold text-saffron-900 focus:ring-2 focus:ring-saffron-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md"
        >
          + Add Allocation Row
        </button>
      </form>

      {/* Items Register Table */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 mb-4">
          Planned Allocations Breakdown ({items.length} Items)
        </h4>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-saffron-200/50 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-saffron-100 dark:bg-stone-700 text-saffron-700 dark:text-gold-300">
                  <DollarSign className="w-4 h-4" />
                </div>
                <span className="font-bold text-stone-800 dark:text-stone-200">{item.category}</span>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-display font-bold text-sm text-saffron-900 dark:text-gold-300">
                  ₹{Number(item.amount).toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
