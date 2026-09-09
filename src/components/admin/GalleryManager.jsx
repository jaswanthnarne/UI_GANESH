import React, { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Camera, Upload, Trash2 } from 'lucide-react';

export const GalleryManager = () => {
  const { gallery, addGalleryImage, deleteGalleryImage } = useDataStore();

  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('idol');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMsg('Please select an image file to upload.');
      return;
    }

    try {
      setLoading(true);
      setMsg('');

      const formData = new FormData();
      formData.append('caption', caption);
      formData.append('category', category);
      formData.append('image', imageFile);

      await addGalleryImage(formData);
      setMsg('Photo uploaded to Cloudinary gallery successfully!');
      setCaption('');
      setImageFile(null);
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
        <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-cream-50 flex items-center">
          <Camera className="w-5 h-5 mr-2 text-saffron-600" />
          Cloudinary Photo Gallery Manager
        </h3>
        <p className="text-xs text-stone-500">
          Upload festival photos (Idol, Decor, Pooja, Visarjan) to Cloudinary.
        </p>
      </div>

      {msg && (
        <div className="p-3 rounded-xl bg-saffron-100 dark:bg-stone-800 text-saffron-900 font-semibold text-xs text-center">
          {msg}
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 rounded-3xl space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Photo Caption</label>
            <input
              type="text"
              placeholder="e.g. Day 1 Evening Sthapana Aarti"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-saffron-200"
            >
              <option value="idol">Idol / Murti</option>
              <option value="decorations">Mandap & Decorations</option>
              <option value="pooja">Pooja & Aarti</option>
              <option value="cultural">Cultural Events</option>
              <option value="visarjan">Visarjan</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">Select Photo File *</label>
          <div className="flex items-center space-x-4">
            <label className="flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-saffron-300 dark:border-stone-700 bg-saffron-50/50 cursor-pointer hover:bg-saffron-100/50 transition-colors text-stone-500">
              <Upload className="w-5 h-5 text-saffron-600 mb-1" />
              <span>Click to choose photo</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>

            {previewUrl && (
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-saffron-300 shrink-0">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs shadow-md"
        >
          {loading ? 'Uploading to Cloudinary...' : '+ Upload Photo to Gallery'}
        </button>
      </form>

      {/* Photo List */}
      <div className="glass-panel p-6 rounded-3xl">
        <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-cream-100 mb-4">
          Gallery Photos ({gallery.length})
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {gallery.map((img) => (
            <div key={img._id} className="relative group rounded-2xl overflow-hidden border border-saffron-200 aspect-square">
              <img src={img.imageUrl} alt={img.caption} className="w-full h-full object-cover" />
              <button
                onClick={() => deleteGalleryImage(img._id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
