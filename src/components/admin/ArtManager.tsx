import { useState, useEffect } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { getArtPieces, addArtPiece, deleteArtPiece, ArtPiece } from '../../services/artService';
import { validateArtPiece } from '../../lib/validation';

export const ArtManager = () => {
  const [items, setItems] = useState<ArtPiece[]>([]);
  const [newArt, setNewArt] = useState({ 
    title: '', 
    artist: '', 
    price: '', 
    description: '',
    stock: 1,
    category: '',
    dimensions: '',
    medium: '',
    year: new Date().getFullYear().toString()
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getArtPieces();
      setItems(data);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Error fetching art:", err);
      }
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate input
    const validation = validateArtPiece(newArt);
    if (!validation.valid) {
      setError(validation.errors.join(', '));
      return;
    }

    if (!file) {
      setError('Please select an image file');
      return;
    }
    
    setUploading(true);
    try {
      await addArtPiece(newArt, file);
      setNewArt({ 
        title: '', 
        artist: '', 
        price: '', 
        description: '',
        stock: 1,
        category: '',
        dimensions: '',
        medium: '',
        year: new Date().getFullYear().toString()
      });
      setFile(null);
      fetchItems();
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.');
      if (import.meta.env.DEV) {
        console.error("Upload failed", err);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteArtPiece(id);
      fetchItems();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-brown-900 mb-6">Manage Art Gallery</h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 text-red-200 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-brown-900 p-6 rounded-lg border border-gold-500/20 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Title *</label>
            <input 
              value={newArt.title}
              onChange={(e) => setNewArt({...newArt, title: e.target.value})}
              maxLength={100}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
              placeholder="Piece Title"
            />
          </div>
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Artist *</label>
            <input 
              value={newArt.artist}
              onChange={(e) => setNewArt({...newArt, artist: e.target.value})}
              maxLength={100}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
              placeholder="Artist Name"
            />
          </div>
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Price (₹) *</label>
            <input 
              value={newArt.price}
              onChange={(e) => setNewArt({...newArt, price: e.target.value})}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
              placeholder="₹0.00"
              type="number"
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Stock</label>
            <input 
              value={newArt.stock}
              onChange={(e) => setNewArt({...newArt, stock: parseInt(e.target.value) || 1})}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
              type="number"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Category</label>
            <input 
              value={newArt.category}
              onChange={(e) => setNewArt({...newArt, category: e.target.value})}
              maxLength={50}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
              placeholder="e.g., Abstract"
            />
          </div>
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Medium</label>
            <input 
              value={newArt.medium}
              onChange={(e) => setNewArt({...newArt, medium: e.target.value})}
              maxLength={50}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
              placeholder="e.g., Oil on Canvas"
            />
          </div>
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Dimensions</label>
            <input 
              value={newArt.dimensions}
              onChange={(e) => setNewArt({...newArt, dimensions: e.target.value})}
              maxLength={50}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
              placeholder="e.g., 48x36 inches"
            />
          </div>
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Year</label>
            <input 
              value={newArt.year}
              onChange={(e) => setNewArt({...newArt, year: e.target.value})}
              maxLength={4}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
              placeholder="YYYY"
            />
          </div>
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-1">Image *</label>
            <div className="relative">
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
                id="art-upload"
              />
              <label htmlFor="art-upload" className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-200 cursor-pointer flex items-center justify-center gap-2 hover:bg-brown-700">
                <Upload size={16} /> {file ? 'Selected' : 'Upload'}
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-cream-200 text-sm font-bold mb-1">Description</label>
          <textarea 
            value={newArt.description}
            onChange={(e) => setNewArt({...newArt, description: e.target.value})}
            maxLength={1000}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100 min-h-[80px]"
            placeholder="Artwork details..."
          />
        </div>

        <button type="submit" disabled={uploading} className="bg-gold-500 text-brown-900 px-6 py-2 rounded font-bold hover:bg-cream-100 transition flex items-center justify-center gap-2 disabled:opacity-50">
          <Plus size={18} /> {uploading ? 'Uploading...' : 'Add Artwork'}
        </button>
      </form>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-brown-900 rounded-lg p-4 border border-gold-500/10 relative group">
            <div className="w-full h-40 bg-brown-800 mb-4 rounded overflow-hidden">
               <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif text-cream-100 mb-1">{item.title}</h3>
            <p className="text-sm text-cream-200/60 mb-1">{item.artist}</p>
            {item.category && <p className="text-xs text-gold-300 mb-1">{item.category}</p>}
            <p className="text-gold-400 font-bold mb-2">{item.price}</p>
            <p className={`text-xs ${(item.stock ?? 1) > 0 ? 'text-green-400' : 'text-red-400'}`}>
              Stock: {item.stock ?? 1}
            </p>
            
            <button 
              onClick={() => handleDelete(item.id!)}
              className="absolute top-2 right-2 bg-red-900/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
