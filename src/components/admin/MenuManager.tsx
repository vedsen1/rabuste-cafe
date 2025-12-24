import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getMenuItems, addMenuItem, deleteMenuItem, MenuItem } from '../../services/menuService';

export const MenuManager = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', category: 'Beverages', price: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getMenuItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    
    await addMenuItem(newItem);
    setNewItem({ name: '', category: 'Beverages', price: '' });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteMenuItem(id);
      fetchItems();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-cream-100 mb-6">Manage Menu</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-brown-900 p-6 rounded-lg border border-gold-500/20 mb-8 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-cream-200 text-sm font-bold mb-1">Item Name</label>
          <input 
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
            placeholder="e.g. Espresso"
          />
        </div>
        <div className="w-full md:w-48">
          <label className="block text-cream-200 text-sm font-bold mb-1">Category</label>
          <select 
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
          >
            <option>Beverages</option>
            <option>Desserts</option>
            <option>Specials</option>
          </select>
        </div>
        <div className="w-full md:w-32">
          <label className="block text-cream-200 text-sm font-bold mb-1">Price</label>
          <input 
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
            placeholder="$0.00"
          />
        </div>
        <button type="submit" className="bg-gold-500 text-brown-900 px-4 py-2 rounded font-bold hover:bg-cream-100 transition flex items-center gap-2">
          <Plus size={18} /> Add
        </button>
      </form>

      {/* List */}
      <div className="bg-brown-900 rounded-xl overflow-hidden border border-gold-500/10">
        <table className="w-full text-left text-cream-200">
          <thead className="bg-brown-800 text-gold-400">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
            ) : items.map((item) => (
              <tr key={item.id} className="border-b border-brown-800 hover:bg-brown-800/50">
                <td className="p-4 font-bold">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(item.id!)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
