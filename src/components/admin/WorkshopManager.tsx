import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { getWorkshops, addWorkshop, deleteWorkshop, Workshop } from '../../services/workshopService';

export const WorkshopManager = () => {
  const [items, setItems] = useState<Workshop[]>([]);
  const [newWorkshop, setNewWorkshop] = useState({ title: '', schedule: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getWorkshops();
      setItems(data);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkshop.title || !newWorkshop.schedule) return;
    
    await addWorkshop(newWorkshop);
    setNewWorkshop({ title: '', schedule: '' });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteWorkshop(id);
      fetchItems();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-brown-900 mb-6">Manage Workshops</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="bg-brown-900 p-6 rounded-lg border border-gold-500/20 mb-8 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-cream-200 text-sm font-bold mb-1">Workshop Title</label>
          <input 
            value={newWorkshop.title}
            onChange={(e) => setNewWorkshop({...newWorkshop, title: e.target.value})}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
            placeholder="e.g. Latte Art Masterclass"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-cream-200 text-sm font-bold mb-1">Schedule / Details</label>
          <input 
            value={newWorkshop.schedule}
            onChange={(e) => setNewWorkshop({...newWorkshop, schedule: e.target.value})}
            className="w-full bg-brown-800 border border-gold-500/30 rounded p-2 text-cream-100"
            placeholder="e.g. Every Saturday • 10:00 AM"
          />
        </div>
        <button type="submit" className="bg-gold-500 text-brown-900 px-4 py-2 rounded font-bold hover:bg-cream-100 transition flex items-center gap-2">
          <Plus size={18} /> Add
        </button>
      </form>

      {/* List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-brown-900 p-6 rounded-xl border border-gold-500/10 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-serif text-cream-100">{item.title}</h3>
              <p className="text-cream-200/60">{item.schedule}</p>
            </div>
             <button onClick={() => handleDelete(item.id!)} className="text-red-400 hover:text-red-300">
               <Trash2 size={18} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};
