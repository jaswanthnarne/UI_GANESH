import React, { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Upload, Trash2, Receipt, Image as ImageIcon, Pencil, X } from 'lucide-react';

export const ExpensesManager = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useDataStore();
  const [editingExpense, setEditingExpense] = useState(null);

  const [form, setForm] = useState({
    category: 'idol_purchase',
    description: '',
    amount: '',
    vendor: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [receiptFile, setReceiptFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) {
      setMsg('Please fill description and amount.');
      return;
    }

    try {
      setLoading(true);
      setMsg('');

      const formData = new FormData();
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('amount', form.amount);
      formData.append('vendor', form.vendor);
      formData.append('date', form.date);

      if (receiptFile) {
        formData.append('receiptImage', receiptFile);
      }

      await addExpense(formData);
      setMsg('Expense record logged successfully!');
      setForm({
        category: 'idol_purchase',
        description: '',
        amount: '',
        vendor: '',
        date: new Date().toISOString().split('T')[0],
      });
      setReceiptFile(null);
      setPreviewUrl('');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-cream-50">
          Expense & Receipt Photo Manager
        </h3>
        <p className="text-xs text-stone-500">
          Upload paper bill receipts directly to Cloudinary for transparency.
        </p>
      </div>

      {msg && (
        <div className="p-3 rounded-xl bg-amber-100 dark:bg-stone-800 text-amber-900 dark:text-amber-200 font-semibold text-xs text-center">
          {msg}
        </div>
      )}

      {/* Expense Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Expense Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 text-xs focus:ring-2 focus:ring-saffron-500"
            >
              <option value="idol_purchase">Idol Purchase</option>
              <option value="decoration">Mandap Decoration</option>
              <option value="prasad">Prasad & Sweets</option>
              <option value="logistics">Logistics & Sound</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Description / Bill Purpose *</label>
            <input
              type="text"
              required
              placeholder="e.g. Clay idol advance payment"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 text-xs focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Amount Spent (₹) *</label>
            <input
              type="number"
              inputMode="numeric"
              required
              placeholder="e.g. 15000"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 text-xs font-bold text-amber-700 focus:ring-2 focus:ring-saffron-500"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Vendor / Store Name</label>
            <input
              type="text"
              placeholder="e.g. Laxmi Decorators"
              value={form.vendor}
              onChange={(e) => setForm({ ...form, vendor: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 text-xs focus:ring-2 focus:ring-saffron-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">Date Paid</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200 text-xs focus:ring-2 focus:ring-saffron-500"
            />
          </div>
        </div>

        {/* Receipt Image Upload Dropzone */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
            Receipt Image Photo (Cloudinary Upload)
          </label>
          
          <div className="flex items-center space-x-4">
            <label className="flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-saffron-300 dark:border-stone-700 bg-saffron-50/50 dark:bg-stone-800/50 hover:bg-saffron-100/50 cursor-pointer transition-colors text-xs text-stone-500">
              <Upload className="w-5 h-5 text-saffron-600 mb-1" />
              <span>Click to select paper bill photo (JPG/PNG)</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            {previewUrl && (
              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-saffron-300 shrink-0">
                <img src={previewUrl} alt="Receipt preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20"
        >
          {loading ? 'Uploading & Saving...' : '+ Log Verified Expense'}
        </button>
      </form>

      {/* Expenses Register */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 mb-4">
          Logged Expenses ({expenses.length})
        </h4>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {expenses.map((e) => (
            <div key={e._id} className="p-3.5 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-saffron-200/50 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-stone-900 dark:text-stone-100">{e.description}</span>
                <span className="mx-2 text-stone-300">•</span>
                <span className="uppercase text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                  {e.category.replace('_', ' ')}
                </span>
                <p className="text-[10px] text-stone-400 mt-0.5">Vendor: {e.vendor || 'N/A'}</p>
              </div>

              <div className="flex items-center space-x-3">
                {e.receiptImageUrl && (
                  <a href={e.receiptImageUrl} target="_blank" rel="noreferrer" className="text-amber-600 underline text-[11px]">
                    Receipt
                  </a>
                )}
                <span className="font-display font-bold text-sm text-amber-700 dark:text-amber-400">
                  - ₹{e.amount.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => setEditingExpense({ ...e })}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-amber-50"
                  title="Edit Expense"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  onClick={() => deleteExpense(e._id)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50"
                  title="Delete Expense"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT EXPENSE MODAL */}
      {editingExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-amber-200 dark:border-stone-800 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-cream-50 flex items-center space-x-2">
                <Pencil className="w-4 h-4 text-amber-600" />
                <span>Edit Expense Record</span>
              </h3>
              <button onClick={() => setEditingExpense(null)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (ev) => {
                ev.preventDefault();
                try {
                  setLoading(true);
                  const formData = new FormData();
                  formData.append('category', editingExpense.category);
                  formData.append('description', editingExpense.description);
                  formData.append('amount', editingExpense.amount);
                  formData.append('vendor', editingExpense.vendor || '');
                  if (editingExpense.date) {
                    formData.append('date', editingExpense.date);
                  }

                  await updateExpense(editingExpense._id, formData);
                  setMsg('Expense updated successfully!');
                  setEditingExpense(null);
                } catch (err) {
                  alert(err.message);
                } finally {
                  setLoading(false);
                }
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-semibold mb-1">Expense Category *</label>
                <select
                  value={editingExpense.category}
                  onChange={(ev) => setEditingExpense({ ...editingExpense, category: ev.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200"
                >
                  <option value="idol_purchase">Idol Purchase</option>
                  <option value="decoration">Mandap Decoration</option>
                  <option value="prasad">Prasad & Sweets</option>
                  <option value="logistics">Logistics & Sound</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Description / Bill Purpose *</label>
                <input
                  type="text"
                  required
                  value={editingExpense.description}
                  onChange={(ev) => setEditingExpense({ ...editingExpense, description: ev.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Amount Spent (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingExpense.amount}
                    onChange={(ev) => setEditingExpense({ ...editingExpense, amount: ev.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200 font-bold text-amber-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Vendor / Store Name</label>
                  <input
                    type="text"
                    value={editingExpense.vendor || ''}
                    onChange={(ev) => setEditingExpense({ ...editingExpense, vendor: ev.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-saffron-200"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingExpense(null)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
