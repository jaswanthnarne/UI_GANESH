import React, { useState } from 'react';
import { Camera, X, Image as ImageIcon } from 'lucide-react';

export const PhotoGallery = ({ gallery }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = (gallery || []).filter((img) => {
    if (filter === 'all') return true;
    return img.category === filter;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 dark:text-cream-50 flex items-center">
            <Camera className="w-6 h-6 mr-2.5 text-saffron-600 dark:text-gold-400" />
            Celebration Photo Gallery
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Photo highlights of Ganesh Idol, Mandap decorations & Aarti moments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {['all', 'idol', 'decorations', 'pooja', 'cultural'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full capitalize transition-colors ${
                filter === cat
                  ? 'bg-saffron-500 text-white shadow-sm'
                  : 'bg-saffron-100/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-saffron-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedImage(item)}
              className="glass-card rounded-3xl overflow-hidden cursor-pointer group relative aspect-square"
            >
              <img
                src={item.imageUrl}
                alt={item.caption || 'Ganesh Celebration Photo'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <p className="text-white font-medium text-xs truncate">{item.caption || 'Ganesh Utsav Highlight'}</p>
                <span className="text-[10px] text-gold-300 capitalize">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-stone-400 glass-panel rounded-3xl">
          <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
          No photos uploaded under this category yet.
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="relative max-w-3xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-saffron-400 p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.caption}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            {selectedImage.caption && (
              <p className="mt-3 text-center text-sm font-medium text-cream-100">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
