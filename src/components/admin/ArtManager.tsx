import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Trash2, Image as ImageIcon, Save, Loader2 } from 'lucide-react';
import { addArtPiece, getArtPieces, deleteArtPiece, ArtPiece } from '../../services/artService';

export const ArtManager = () => {
  const [pieces, setPieces] = useState<ArtPiece[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<ArtPiece>>({
    title: '',
    artist: '',
    price: '',
    description: '',
    category: 'Traditional',
    year: new Date().getFullYear().toString(),
    dimensions: '',
    isArEnabled: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchPieces();
  }, []);

  const fetchPieces = async () => {
    try {
      const data = await getArtPieces();
      setPieces(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch art pieces');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!imageFile) throw new Error('Please select an image');

      await addArtPiece(formData as ArtPiece, imageFile);

      // Reset form
      setFormData({
        title: '',
        artist: '',
        price: '',
        description: '',
        category: 'Traditional',
        year: new Date().getFullYear().toString(),
        dimensions: '',
        isArEnabled: false
      });
      setImageFile(null);
      setPreviewUrl(null);
      setShowAddForm(false);
      fetchPieces(); // Refresh list
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to add artwork');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this artwork?')) return;
    try {
      await deleteArtPiece(id);
      setPieces(pieces.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete artwork');
    }
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-gold-400">Art Gallery Manager</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-gold-500 text-brown-900 px-4 py-2 rounded-lg font-bold hover:bg-gold-400 transition-colors"
        >
          <Plus size={20} />
          Add New Piece
        </button>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brown-900 border border-gold-500/20 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif text-white">Add New Artwork</h3>
                <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Upload */}
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-gray-400 mb-2">Artwork Image</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-gold-500/50 transition-colors relative">
                      {previewUrl ? (
                        <div className="relative h-64 w-full">
                          <img src={previewUrl} alt="Preview" className="h-full w-full object-contain mx-auto" />
                          <button
                            type="button"
                            onClick={() => { setImageFile(null); setPreviewUrl(null); }}
                            className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400 mb-2">Click to upload image</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Title</label>
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Artist</label>
                    <input
                      required
                      type="text"
                      value={formData.artist}
                      onChange={e => setFormData({ ...formData, artist: e.target.value })}
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gold-500 outline-none"
                    >
                      <option value="Traditional">Traditional</option>
                      <option value="Digital">Digital</option>
                      <option value="Sculpture">Sculpture</option>
                      <option value="Photography">Photography</option>
                      <option value="Contemporary">Contemporary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Price (e.g. ₹50,000)</label>
                    <input
                      required
                      type="text"
                      value={formData.price}
                      onChange={e => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Dimensions</label>
                    <input
                      type="text"
                      placeholder='24x36"'
                      value={formData.dimensions}
                      onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Year</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-black/30 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-gold-500 outline-none"
                    />
                  </div>
                  <div className="col-span-full flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="arEnabled"
                      checked={formData.isArEnabled}
                      onChange={e => setFormData({ ...formData, isArEnabled: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-700 bg-black/30 text-gold-500 focus:ring-gold-500"
                    />
                    <label htmlFor="arEnabled" className="text-white">Enable AR Experince for this artwork</label>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gold-500 text-brown-900 font-bold hover:bg-gold-400 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                    Save Artwork
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* List View */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pieces.map((piece) => (
            <div key={piece.id} className="bg-brown-800/50 border border-gold-500/10 rounded-xl overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img src={piece.imageUrl} alt={piece.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-lg font-serif text-white truncate">{piece.title}</h3>
                  <p className="text-gold-400 text-sm">{piece.price}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-xs text-gray-400 uppercase tracking-wider">{piece.category}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => piece.id && handleDelete(piece.id)}
                    className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
