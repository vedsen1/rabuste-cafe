import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMenuItems, MenuItem } from '../services/menuService';

const categories = ['Beverages', 'Desserts', 'Specials'];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Beverages');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuItems();
        setMenuItems(data);
      } catch (error) {
        console.error("Failed to load menu", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif text-brown-900 text-center mb-12"
        >
          Our Menu
        </motion.h1>

        {/* Categories */}
        <div className="flex justify-center gap-8 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xl font-sans tracking-widest uppercase transition-colors duration-300 ${
                activeCategory === cat ? 'text-brown-900 border-b-2 border-brown-900 font-bold' : 'text-brown-900/50 hover:text-brown-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center text-brown-900/50">Loading menu...</div>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between items-baseline border-b border-brown-900/10 pb-4 group hover:border-brown-900/30 transition-colors"
              >
                <h3 className="text-2xl font-serif text-brown-900 group-hover:text-gold-600 transition-colors">{item.name}</h3>
                <div className="flex-1 mx-4 border-b border-dotted border-brown-900/20 relative top-[-6px]" />
                <span className="text-xl font-bold text-brown-900">{item.price}</span>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-brown-900/50">No items found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
}
