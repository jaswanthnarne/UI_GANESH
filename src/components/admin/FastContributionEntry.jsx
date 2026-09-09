import React, { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { useAuthStore } from '../../store/useAuthStore';
import { ShareableReceiptModal } from '../ShareableReceiptModal';
import { Plus, Trash2, Layers, Download, Share2, Search, CheckCircle2, Pencil, X } from 'lucide-react';

export const FastContributionEntry = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  const { contributions, addContribution, addBulkContributions, updateContribution, deleteContribution, settings } = useDataStore();
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [editingContribution, setEditingContribution] = useState(null);
  const [search, setSearch] = useState('');

  // Single Form State
  const [singleForm, setSingleForm] = useState({
    flatNumber: '',
    contributorName: '',
    amount: '',
    mode: 'upi',
    notes: '',
    isAnonymous: false,
    date: new Date().toISOString().split('T')[0],
  });

  // Bulk Form State
  const [bulkRows, setBulkRows] = useState([
    { flatNumber: '', contributorName: '', amount: '', mode: 'upi' },
    { flatNumber: '', contributorName: '', amount: '', mode: 'upi' },
    { flatNumber: '', contributorName: '', amount: '', mode: 'upi' },
  ]);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!singleForm.flatNumber || !singleForm.contributorName || !singleForm.amount) {
      setMsg('Please fill flat number, contributor name, and amount.');
      return;
    }

    try {
      setLoading(true);
      setMsg('');
      await addContribution(singleForm);
      setMsg('Contribution logged successfully in MongoDB!');
      setSingleForm({
        flatNumber: '',
        contributorName: '',
        amount: '',
        mode: 'upi',
        notes: '',
        isAnonymous: false,
        date: new Date().toISOString().split('T')[0],
      });
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    const validRows = bulkRows.filter((r) => r.flatNumber && r.contributorName && r.amount);

    if (validRows.length === 0) {
      setMsg('Please enter at least one complete row.');
      return;
    }

    try {
      setLoading(true);
      setMsg('');
      const res = await addBulkContributions(validRows);
      setMsg(res.message || 'Bulk entries saved to MongoDB!');
      setBulkRows([
        { flatNumber: '', contributorName: '', amount: '', mode: 'upi' },
        { flatNumber: '', contributorName: '', amount: '', mode: 'upi' },
        { flatNumber: '', contributorName: '', amount: '', mode: 'upi' },
      ]);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addBulkRow = () => {
    setBulkRows([...bulkRows, { flatNumber: '', contributorName: '', amount: '', mode: 'upi' }]);
  };

  const updateBulkRow = (index, field, value) => {
    const next = [...bulkRows];
    next[index][field] = value;
    setBulkRows(next);
  };

  const filteredContributions = (contributions || []).filter((c) => {
    const q = search.toLowerCase();
    return (
      (c.flatNumber || '').toLowerCase().includes(q) ||
      (c.contributorName || '').toLowerCase().includes(q) ||
      (c.notes || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      
      {/* Header & Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-cream-50">
            Collected Funds & Receipt Generation
          </h3>
          <p className="text-xs text-stone-500">
            Fast single & bulk contribution entries. Click "Receipt PDF" on any entry to download the official 2-Page Receipt.
          </p>
        </div>

        <button
          onClick={() => setIsBulkMode(!isBulkMode)}
          className="px-4 py-2 rounded-xl bg-saffron-100 dark:bg-stone-800 text-saffron-900 dark:text-gold-300 font-semibold text-xs border border-saffron-300/60 transition-colors flex items-center space-x-1.5 self-start"
        >
          <Layers className="w-4 h-4" />
          <span>{isBulkMode ? 'Switch to Single Entry' : 'Switch to Bulk Entry Mode'}</span>
        </button>
      </div>

      {msg && (
        <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-stone-800 text-emerald-900 dark:text-gold-300 font-semibold text-xs text-center flex items-center justify-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{msg}</span>
        </div>
      )}

      {/* SINGLE ENTRY FORM */}
      {!isBulkMode ? (
        <form onSubmit={handleSingleSubmit} className="glass-card p-6 rounded-3xl space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Flat Number *</label>
              <input
                type="text"
                required
                tabIndex={1}
                placeholder="e.g. A-102"
                value={singleForm.flatNumber}
                onChange={(e) => setSingleForm({ ...singleForm, flatNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Contributor Name *</label>
              <input
                type="text"
                required
                tabIndex={2}
                placeholder="e.g. Ramesh Patel"
                value={singleForm.contributorName}
                onChange={(e) => setSingleForm({ ...singleForm, contributorName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Amount (₹) *</label>
              <input
                type="number"
                inputMode="numeric"
                required
                tabIndex={3}
                placeholder="e.g. 5000"
                value={singleForm.amount}
                onChange={(e) => setSingleForm({ ...singleForm, amount: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 font-bold text-saffron-900 focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Payment Mode</label>
              <select
                tabIndex={4}
                value={singleForm.mode}
                onChange={(e) => setSingleForm({ ...singleForm, mode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              >
                <option value="upi">UPI / GPay / PhonePe</option>
                <option value="cash">Cash Handover</option>
                <option value="other">Bank Transfer / Cheque</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Date Logged</label>
              <input
                type="date"
                tabIndex={5}
                value={singleForm.date}
                onChange={(e) => setSingleForm({ ...singleForm, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Notes (Optional)</label>
              <input
                type="text"
                tabIndex={6}
                placeholder="e.g. Mahaprasad sponsor"
                value={singleForm.notes}
                onChange={(e) => setSingleForm({ ...singleForm, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 focus:ring-2 focus:ring-saffron-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center space-x-2 text-stone-600 dark:text-stone-300 cursor-pointer">
              <input
                type="checkbox"
                checked={singleForm.isAnonymous}
                onChange={(e) => setSingleForm({ ...singleForm, isAnonymous: e.target.checked })}
                className="rounded text-saffron-600 focus:ring-saffron-500"
              />
              <span>Mark as Anonymous on Public Dashboard</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              tabIndex={7}
              className="px-6 py-3 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md shadow-saffron-500/20"
            >
              {loading ? 'Logging...' : '+ Log Contribution'}
            </button>
          </div>
        </form>
      ) : (
        /* BULK ENTRY FORM */
        <form onSubmit={handleBulkSubmit} className="glass-card p-6 rounded-3xl space-y-4 text-xs">
          <div className="space-y-3">
            {bulkRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-3">
                  <input
                    type="text"
                    placeholder="Flat No (e.g. B-101)"
                    value={row.flatNumber}
                    onChange={(e) => updateBulkRow(idx, 'flatNumber', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    placeholder="Contributor Name"
                    value={row.contributorName}
                    onChange={(e) => updateBulkRow(idx, 'contributorName', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Amount (₹)"
                    value={row.amount}
                    onChange={(e) => updateBulkRow(idx, 'amount', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 font-bold text-saffron-900"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    value={row.mode}
                    onChange={(e) => updateBulkRow(idx, 'mode', e.target.value)}
                    className="w-full px-2 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
                  >
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={addBulkRow}
              className="px-4 py-2 rounded-xl bg-saffron-100 text-saffron-800 font-semibold"
            >
              + Add Row
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold"
            >
              {loading ? 'Saving...' : 'Submit Bulk Rows'}
            </button>
          </div>
        </form>
      )}

      {/* Contributions Register & Receipt Download Table */}
      <div className="glass-panel p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100">
            Collected Funds Register ({filteredContributions.length})
          </h4>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search flat or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 text-xs"
            />
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {filteredContributions.map((c) => (
            <div key={c._id} className="p-3.5 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-saffron-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-saffron-900 dark:text-gold-300">Flat {c.flatNumber}</span>
                <span className="mx-2 text-stone-300">•</span>
                <span className="font-semibold text-stone-800 dark:text-stone-200">{c.contributorName}</span>
                <span className="mx-2 text-stone-300">•</span>
                <span className="uppercase text-[10px] px-2 py-0.5 rounded-full bg-saffron-100 text-saffron-800 font-bold">{c.mode}</span>
                <p className="text-[10px] text-stone-400 mt-0.5">Logged on {new Date(c.date).toLocaleDateString('en-IN')}</p>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center">
                <span className="font-display font-bold text-sm text-emerald-700 dark:text-emerald-400">
                  ₹{c.amount.toLocaleString('en-IN')}
                </span>

                {/* Prominent Receipt Download Action */}
                <button
                  onClick={() => setSelectedReceipt(c)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-600 text-white font-semibold text-[11px] shadow-sm flex items-center space-x-1 hover:shadow-md transition-all"
                  title="Download Official 2-Page PDF Receipt"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Receipt PDF</span>
                </button>

                {isAdmin && (
                  <>
                    <button
                      onClick={() => setEditingContribution({ ...c })}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50"
                      title="Edit Contribution"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => deleteContribution(c._id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT CONTRIBUTION MODAL */}
      {editingContribution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-saffron-200 dark:border-stone-800 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-cream-50 flex items-center space-x-2">
                <Pencil className="w-4 h-4 text-saffron-600" />
                <span>Edit Contribution Record</span>
              </h3>
              <button onClick={() => setEditingContribution(null)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setLoading(true);
                  await updateContribution(editingContribution._id, editingContribution);
                  setMsg('Contribution updated successfully!');
                  setEditingContribution(null);
                } catch (err) {
                  alert(err.message);
                } finally {
                  setLoading(false);
                }
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-semibold mb-1">Flat Number *</label>
                <input
                  type="text"
                  required
                  value={editingContribution.flatNumber}
                  onChange={(e) => setEditingContribution({ ...editingContribution, flatNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Contributor Name *</label>
                <input
                  type="text"
                  required
                  value={editingContribution.contributorName}
                  onChange={(e) => setEditingContribution({ ...editingContribution, contributorName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingContribution.amount}
                    onChange={(e) => setEditingContribution({ ...editingContribution, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200 font-bold text-saffron-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Payment Mode</label>
                  <select
                    value={editingContribution.mode}
                    onChange={(e) => setEditingContribution({ ...editingContribution, mode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200"
                  >
                    <option value="upi">UPI / GPay / PhonePe</option>
                    <option value="cash">Cash Handover</option>
                    <option value="other">Bank Transfer / Cheque</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Notes</label>
                <input
                  type="text"
                  value={editingContribution.notes || ''}
                  onChange={(e) => setEditingContribution({ ...editingContribution, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200"
                />
              </div>

              <label className="flex items-center space-x-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={editingContribution.isAnonymous || false}
                  onChange={(e) => setEditingContribution({ ...editingContribution, isAnonymous: e.target.checked })}
                  className="rounded text-saffron-600 focus:ring-saffron-500"
                />
                <span>Mark as Anonymous</span>
              </label>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingContribution(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-saffron-500 text-white font-bold"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2-Page Receipt Modal Trigger */}
      {selectedReceipt && (
        <ShareableReceiptModal
          contribution={selectedReceipt}
          settings={settings}
          onClose={() => setSelectedReceipt(null)}
        />
      )}

    </div>
  );
};
