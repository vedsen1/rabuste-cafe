import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRobustaSeeds, addRobustaSeed, deleteRobustaSeed, RobustaSeed } from '../../services/seedsService';
import { Trash2, Plus } from 'lucide-react';

export const SeedsManager = () => {
  const [seeds, setSeeds] = useState<RobustaSeed[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    loadSeeds();
  }, []);

  const loadSeeds = async () => {
    try {
      const data = await getRobustaSeeds();
      setSeeds(data);
    } catch (error) {
      console.error('Failed to load seeds:', error);
      alert('Failed to load seeds');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    setLoading(true);
    try {
      await addRobustaSeed(formData, selectedFile);
      alert('Seed added successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        quantity: '',
      });
      setSelectedFile(null);
      setPreviewUrl('');
      setShowForm(false);
      await loadSeeds();
    } catch (error) {
      console.error('Failed to add seed:', error);
      alert(`Failed to add seed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this seed?')) return;

    try {
      await deleteRobustaSeed(id);
      alert('Seed deleted successfully!');
      await loadSeeds();
    } catch (error) {
      console.error('Failed to delete seed:', error);
      alert('Failed to delete seed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-serif text-cream-100">Robusta Seeds Manager</h2>
        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-brown-900 px-6 py-3 rounded-lg font-semibold transition-all"
        >
          <Plus size={20} />
          Add New Seed
        </motion.button>
      </div>

      {/* Add Seed Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-brown-900 p-8 rounded-xl border border-gold-500/20 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Seed Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="bg-brown-800 text-cream-100 px-4 py-3 rounded-lg border border-gold-500/20 focus:border-gold-400 outline-none"
            />
            <input
              type="text"
              name="price"
              placeholder="Price (e.g., ₹500)"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="bg-brown-800 text-cream-100 px-4 py-3 rounded-lg border border-gold-500/20 focus:border-gold-400 outline-none"
            />
          </div>

          <input
            type="text"
            name="quantity"
            placeholder="Quantity (e.g., 100 seeds)"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            className="w-full bg-brown-800 text-cream-100 px-4 py-3 rounded-lg border border-gold-500/20 focus:border-gold-400 outline-none"
          />

          <textarea
            name="description"
            placeholder="Seed Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full bg-brown-800 text-cream-100 px-4 py-3 rounded-lg border border-gold-500/20 focus:border-gold-400 outline-none resize-none"
          />

          <div>
            <label className="block text-cream-200 mb-3">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full bg-brown-800 text-cream-100 px-4 py-3 rounded-lg border border-gold-500/20 focus:border-gold-400"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-4 w-48 h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <div className="flex gap-4">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-gold-500 hover:bg-gold-600 disabled:bg-gray-500 text-brown-900 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              {loading ? 'Uploading...' : 'Add Seed'}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({
                  title: '',
                  description: '',
                  price: '',
                  quantity: '',
                });
                setSelectedFile(null);
                setPreviewUrl('');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-brown-800 hover:bg-brown-700 text-cream-100 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Seeds List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seeds.map((seed) => (
          <motion.div
            key={seed.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brown-900 rounded-xl overflow-hidden border border-gold-500/20 hover:border-gold-400/50 transition-all"
          >
            {seed.imageUrl && (
              <img
                src={seed.imageUrl}
                alt={seed.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-serif text-gold-400">{seed.title}</h3>
              <p className="text-cream-200/70 text-sm line-clamp-2">{seed.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-cream-200">Price: <span className="font-bold text-gold-400">{seed.price}</span></span>
                <span className="text-cream-200">Qty: <span className="font-bold">{seed.quantity}</span></span>
              </div>
              <motion.button
                onClick={() => handleDelete(seed.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-2 bg-red-900 hover:bg-red-800 text-red-100 px-4 py-2 rounded-lg transition-all"
              >
                <Trash2 size={18} />
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {seeds.length === 0 && !showForm && (
        <div className="text-center py-12 text-cream-200/60">
          <p>No seeds yet. Add your first Robusta seed package!</p>
        </div>
      )}
    </div>
  );
};
