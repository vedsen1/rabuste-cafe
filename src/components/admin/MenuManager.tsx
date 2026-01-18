import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Upload, Edit2, X } from 'lucide-react';
import { getMenuItems, addMenuItem, deleteMenuItem, updateMenuItem, MenuItem } from '../../services/menuService';
import { uploadToCloudinary } from '../../services/cloudinaryService';
import { validateMenuItem } from '../../lib/validation';

const CATEGORIES = [
  'Robusta Cold',
  'Robusta Hot',
  'Blend Cold',
  'Blend Hot',
  'Manual Brew',
  'Non Coffee',
  'Savoury'
];

const SUBCATEGORIES = ['Milk', 'Non-Milk'];

export const MenuManager = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    category: CATEGORIES[0],
    subcategory: 'Milk',
    price: '',
    costPrice: '',
    description: '',
    isSpecial: false
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: true }), {})
  );

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getMenuItems();
      setItems(data);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Error fetching menu:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate input
    const validation = validateMenuItem(newItem as MenuItem);
    if (!validation.valid) {
      setError(validation.errors.join(', '));
      return;
    }

    setUploading(true);
    try {
      let imageUrl = isEditing && editingItem?.imageUrl ? editingItem.imageUrl : '';

      // Upload new image if provided
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }

      // Only include subcategory if it's relevant
      const needsSubcategory = !['Manual Brew', 'Non Coffee', 'Shakes', 'Savoury'].includes(newItem.category || '');
      const itemData = {
        ...newItem,
        subcategory: needsSubcategory ? newItem.subcategory : undefined,
        imageUrl,
      } as MenuItem;

      if (isEditing && editingItem?.id) {
        // Update existing item
        await updateMenuItem(editingItem.id, itemData);
      } else {
        // Add new item
        await addMenuItem(itemData);
      }

      // Reset form
      setNewItem({
        name: '',
        category: CATEGORIES[0],
        subcategory: 'Milk',
        price: '',
        costPrice: '',
        description: '',
        isSpecial: false
      });
      setFile(null);
      setIsEditing(false);
      setEditingItem(null);
      fetchItems();
    } catch (err: any) {
      setError(err.message || (isEditing ? 'Failed to update item' : 'Failed to add item'));
      console.error(isEditing ? "Failed to update menu item" : "Failed to add menu item", err);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setIsEditing(true);
    setEditingItem(item);
    setNewItem({
      name: item.name,
      category: item.category,
      subcategory: item.subcategory || 'Milk',
      price: item.price,
      costPrice: item.costPrice || '',
      description: item.description || ''
    });
    setFile(null);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    setNewItem({
      name: '',
      category: CATEGORIES[0],
      subcategory: 'Milk',
      price: '',
      costPrice: '',
      description: ''
    });
    setFile(null);
    setError('');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteMenuItem(id);
      fetchItems();
    }
  };

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const showSubcategory = !['Manual Brew', 'Non Coffee', 'Shakes', 'Savoury'].includes(newItem.category || '');

  // Group items by category
  const groupedItems = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = items.filter(item => item.category === cat);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div>
      <h2 className="text-4xl font-serif text-gold-400 mb-2 tracking-wide">Menu Management</h2>
      <p className="text-gold-400/70 text-sm tracking-widest uppercase font-semibold mb-8">Add, Edit & Manage Menu Items</p>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 text-red-200 p-4 rounded-lg mb-6 text-sm border border-red-500/15">
          {error}
        </div>
      )}

      {/* Add/Edit Form */}
      <form onSubmit={handleAdd} className="bg-brown-800 p-8 rounded-lg border border-brown-700 mb-10 flex flex-col gap-5 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-serif text-cream-100 tracking-wide">
            {isEditing ? 'Edit Menu Item' : 'Add New Item'}
          </h3>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-300 rounded-lg transition-colors border border-red-500/20"
            >
              <X size={16} />
              Cancel
            </button>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <label className="block text-cream-200 text-sm font-bold mb-2">Item Name</label>
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full bg-brown-700 border border-brown-600 rounded-lg p-3 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-brown-500 transition-all"
              placeholder="e.g. Espresso"
            />
          </div>

          <div className="w-full md:w-48">
            <label className="block text-cream-200 text-sm font-bold mb-2">Category</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full bg-brown-700 border border-brown-600 rounded-lg p-3 text-cream-100 focus:outline-none focus:border-brown-500 transition-all"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {showSubcategory && (
            <div className="w-full md:w-40">
              <label className="block text-cream-200 text-sm font-bold mb-2">Type</label>
              <select
                value={newItem.subcategory}
                onChange={(e) => setNewItem({ ...newItem, subcategory: e.target.value })}
                className="w-full bg-brown-700 border border-brown-600 rounded-lg p-3 text-cream-100 focus:outline-none focus:border-brown-500 transition-all"
              >
                {SUBCATEGORIES.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}

          <div className="w-full md:w-36">
            <label className="block text-cream-200 text-sm font-bold mb-2">Selling Price</label>
            <input
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="w-full bg-brown-700 border border-brown-600 rounded-lg p-3 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-brown-500 transition-all"
              placeholder="₹0.00"
            />
          </div>

          <div className="w-full md:w-36">
            <label className="block text-cream-200 text-sm font-bold mb-2">Cost Price</label>
            <input
              value={newItem.costPrice || ''}
              onChange={(e) => setNewItem({ ...newItem, costPrice: e.target.value })}
              className="w-full bg-brown-700 border border-brown-600 rounded-lg p-3 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-brown-500 transition-all"
              placeholder="₹0.00"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block text-cream-200 text-sm font-bold mb-2">Description</label>
          <input
            value={newItem.description || ''}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="w-full bg-brown-700 border border-brown-600 rounded-lg p-3 text-cream-100 placeholder-cream-400/30 focus:outline-none focus:border-brown-500 transition-all"
            placeholder="e.g. Rich and intense flavor"
          />
        </div>

        <div className="flex items-center gap-3 bg-brown-700/50 p-4 rounded-lg border border-gold-400/20">
          <input
            type="checkbox"
            id="isSpecial"
            checked={newItem.isSpecial || false}
            onChange={(e) => setNewItem({ ...newItem, isSpecial: e.target.checked })}
            className="w-5 h-5 cursor-pointer accent-gold-400"
          />
          <label htmlFor="isSpecial" className="text-cream-100 font-semibold cursor-pointer flex-1">
            Mark as Robusta Special
          </label>
          <span className="text-xs text-gold-400/70">Featured in Specials section</span>
        </div>

        <div className="w-full">
          <label className="block text-cream-200 text-sm font-bold mb-2">Image</label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="hidden"
              id="menu-upload"
            />
            <label htmlFor="menu-upload" className="w-full bg-brown-700 border border-brown-600 rounded-lg p-3 text-cream-200 cursor-pointer flex items-center justify-center gap-2 hover:bg-brown-700/80 transition-all">
              <Upload size={18} /> {file ? 'Image Selected' : 'Upload Image'}
            </label>
          </div>
          
          {/* Show current image when editing */}
          {isEditing && editingItem?.imageUrl && !file && (
            <div className="mt-4 flex items-start gap-4">
              <div className="flex-1">
                <p className="text-cream-200 text-xs mb-2 opacity-70 font-semibold">Current Image:</p>
                <img 
                  src={editingItem.imageUrl} 
                  alt={editingItem.name}
                  className="h-24 w-24 object-cover rounded-lg border border-brown-600"
                />
              </div>
            </div>
          )}
          
          {/* Show selected file preview */}
          {file && (
            <div className="mt-4">
              <p className="text-cream-200 text-xs mb-2 opacity-70 font-semibold">Preview:</p>
              <img 
                src={URL.createObjectURL(file)} 
                alt="Preview"
                className="h-24 w-24 object-cover rounded-lg border border-brown-600"
              />
            </div>
          )}
        </div>

        <button type="submit" disabled={uploading} className="w-full bg-gold-500 hover:bg-gold-600 text-brown-900 px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg uppercase tracking-wide text-sm">
          <Plus size={18} /> {uploading ? (isEditing ? 'Updating...' : 'Adding...') : (isEditing ? 'Update Item' : 'Add Item')}
        </button>
      </form>

      {/* Structured List (Accordion Style) */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-cream-200/50 py-12">Loading menu items...</div>
        ) : (
          CATEGORIES.map(cat => {
            const categoryItems = groupedItems[cat] || [];
            if (categoryItems.length === 0) return null; // Hide empty categories

            return (
              <div key={cat} className="bg-brown-800 rounded-lg overflow-hidden border border-brown-700 shadow-lg hover:shadow-xl transition-all">
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between p-5 bg-brown-700 hover:bg-brown-700/80 transition-all group"
                >
                  <h3 className="text-xl font-serif text-cream-100 font-semibold">{cat}</h3>
                  <div className="flex items-center gap-3 text-cream-200">
                    <span className="text-sm bg-brown-900 px-3 py-1.5 rounded-lg border border-brown-700 font-semibold">{categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}</span>
                    {openCategories[cat] ? <ChevronUp size={22} className="group-hover:text-cream-100 transition-colors" /> : <ChevronDown size={22} className="group-hover:text-cream-100 transition-colors" />}
                  </div>
                </button>

                {openCategories[cat] && (
                  <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left text-cream-200 text-sm">
                      <thead className="bg-brown-900 text-cream-200 text-xs uppercase sticky top-0 border-b border-brown-700">
                        <tr>
                          <th className="p-4 font-bold">Image</th>
                          <th className="p-4 font-bold">Name</th>
                          <th className="p-4 font-bold">Description</th>
                          <th className="p-4 font-bold text-center">Selling Price</th>
                          <th className="p-4 font-bold text-center">Cost Price</th>
                          <th className="p-4 font-bold text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryItems.map((item) => (
                          <tr key={item.id} className="border-b border-brown-700 hover:bg-brown-700/30 transition-colors last:border-0 group">
                            <td className="p-4">
                              {item.imageUrl ? (
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.name}
                                  className="h-14 w-14 object-cover rounded-lg border border-brown-600"
                                />
                              ) : (
                                <div className="h-14 w-14 bg-brown-700 rounded-lg border border-brown-600 flex items-center justify-center text-xs text-cream-300/60 font-semibold">
                                  No img
                                </div>
                              )}
                            </td>
                            <td className="p-4 font-bold text-cream-100">{item.name}</td>
                            <td className="p-4 opacity-75 text-xs max-w-xs truncate text-cream-200/80">
                              {item.description || '-'}
                            </td>
                            <td className="p-4 font-mono text-center font-semibold text-gold-400">₹{item.price}</td>
                            <td className="p-4 font-mono text-center text-cream-200/70">
                              {item.costPrice ? `₹${item.costPrice}` : '-'}
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="text-blue-400 hover:text-blue-300 p-2.5 hover:bg-blue-500/10 rounded-lg transition-all border border-blue-400/20"
                                  title="Edit Item"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id!)}
                                  className="text-red-400 hover:text-red-300 p-2.5 hover:bg-red-500/10 rounded-lg transition-all border border-red-400/20"
                                  title="Delete Item"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
