import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { getMenuItems, addMenuItem, deleteMenuItem, MenuItem } from '../../services/menuService';
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
    price: '' 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
    
    // Only include subcategory if it's relevant (not for Manual Brew/Non Coffee/Savoury)
    const needsSubcategory = !['Manual Brew', 'Non Coffee', 'Savoury'].includes(newItem.category || '');
    const itemToAdd = {
      ...newItem,
      subcategory: needsSubcategory ? newItem.subcategory : undefined
    } as MenuItem;

    try {
      await addMenuItem(itemToAdd);
      setNewItem({ 
        name: '', 
        category: CATEGORIES[0], 
        subcategory: 'Milk',
        price: '' 
      });
      fetchItems();
    } catch (err: any) {
      setError(err.message || 'Failed to add item');
      if (import.meta.env.DEV) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteMenuItem(id);
      fetchItems();
    }
  };

  const toggleCategory = (cat: string) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const showSubcategory = !['Manual Brew', 'Non Coffee', 'Savoury'].includes(newItem.category || '');

  // Group items by category
  const groupedItems = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = items.filter(item => item.category === cat);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div>
      <h2 className="text-3xl font-serif text-brown-900 mb-6">Manage Menu</h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 text-red-200 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-brown-900 p-6 rounded-lg border border-gold-500/20 mb-8 flex flex-col md:flex-row gap-4 items-end flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-cream-200 text-sm font-bold mb-1">Item Name *</label>
          <input 
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            maxLength={100}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
            placeholder="e.g. Espresso"
          />
        </div>
        
        <div className="w-full md:w-48">
          <label className="block text-cream-200 text-sm font-bold mb-1">Category *</label>
          <select 
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {showSubcategory && (
          <div className="w-full md:w-32">
            <label className="block text-cream-200 text-sm font-bold mb-1">Type</label>
            <select 
              value={newItem.subcategory}
              onChange={(e) => setNewItem({...newItem, subcategory: e.target.value})}
              className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
            >
              {SUBCATEGORIES.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        )}

        <div className="w-full md:w-32">
          <label className="block text-cream-200 text-sm font-bold mb-1">Price (₹) *</label>
          <input 
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
            placeholder="₹0.00"
            type="number"
            step="0.01"
            min="0"
          />
        </div>
        <button type="submit" className="bg-gold-500 text-brown-900 px-4 py-2 rounded font-bold hover:bg-cream-100 transition flex items-center gap-2">
          <Plus size={18} /> Add
        </button>
      </form>

      {/* Structured List (Accordion Style) */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-brown-900/50">Loading menu...</div>
        ) : (
          CATEGORIES.map(cat => {
            const categoryItems = groupedItems[cat] || [];
            if (categoryItems.length === 0) return null; // Hide empty categories

            return (
              <div key={cat} className="bg-brown-900 rounded-xl overflow-hidden border border-gold-500/10">
                <button 
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between p-4 bg-brown-800 hover:bg-brown-700 transition-colors"
                >
                  <h3 className="text-xl font-serif text-gold-400 font-bold">{cat}</h3>
                  <div className="flex items-center gap-2 text-cream-200">
                    <span className="text-sm bg-brown-900 px-2 py-1 rounded-full">{categoryItems.length} items</span>
                    {openCategories[cat] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {openCategories[cat] && (
                  <div className="p-0">
                    <table className="w-full text-left text-cream-200">
                      <thead className="bg-brown-900/50 text-gold-400/80 text-sm uppercase">
                        <tr>
                          <th className="p-4 font-normal w-1/3">Name</th>
                          <th className="p-4 font-normal">Subcategory</th>
                          <th className="p-4 font-normal">Price</th>
                          <th className="p-4 font-normal text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryItems.map((item) => (
                          <tr key={item.id} className="border-b border-gold-500/5 hover:bg-brown-800/30 transition-colors last:border-0">
                            <td className="p-4 font-bold">{item.name}</td>
                            <td className="p-4 opacity-70 text-sm">
                              {item.subcategory ? (
                                <span className={`px-2 py-1 rounded text-xs ${item.subcategory === 'Milk' ? 'bg-cream-100/10 text-cream-100' : 'bg-brown-900 text-gold-400 border border-gold-500/20'}`}>
                                  {item.subcategory}
                                </span>
                              ) : '-'}
                            </td>
                            <td className="p-4 font-mono">{item.price}</td>
                            <td className="p-4 text-center">
                              <button 
                                onClick={() => handleDelete(item.id!)} 
                                className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-full transition-colors"
                                title="Delete Item"
                              >
                                <Trash2 size={16} />
                              </button>
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
