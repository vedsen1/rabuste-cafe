import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMenuItems, MenuItem } from '../services/menuService';

const CATEGORIES = [
  'Robusta Cold',
  'Robusta Hot',
  'Blend Cold',
  'Blend Hot',
  'Manual Brew',
  'Non Coffee',
  'Savoury'
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
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

  // Filter items by active category
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  // Group by subcategory (Milk / Non-Milk) if applicable
  const hasSubcategories = !['Manual Brew', 'Non Coffee', 'Savoury'].includes(activeCategory);
  
  const milkItems = filteredItems.filter(item => item.subcategory === 'Milk');
  const nonMilkItems = filteredItems.filter(item => item.subcategory === 'Non-Milk');
  const otherItems = filteredItems.filter(item => !item.subcategory); // For categories without subcategories

  const MenuList = ({ items }: { items: MenuItem[] }) => (
    <div className="space-y-6">
      {items.length > 0 ? (
        items.map((item, i) => (
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
        <div className="text-brown-900/50 italic">No items available.</div>
      )}
    </div>
  );

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

        {/* Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-lg md:text-xl font-sans tracking-widest uppercase transition-colors duration-300 pb-2 ${
                activeCategory === cat 
                  ? 'text-brown-900 border-b-2 border-brown-900 font-bold' 
                  : 'text-brown-900/50 hover:text-brown-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-brown-900/50">Loading menu...</div>
          ) : (
            <>
              {hasSubcategories ? (
                <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                  {/* Milk Section */}
                  <div>
                    <h3 className="text-3xl font-serif text-brown-900 mb-8 border-b border-gold-500/30 pb-2 inline-block">
                      Milk Based
                    </h3>
                    <MenuList items={milkItems} />
                  </div>

                  {/* Non-Milk Section */}
                  <div>
                    <h3 className="text-3xl font-serif text-brown-900 mb-8 border-b border-gold-500/30 pb-2 inline-block">
                      Non-Milk Based
                    </h3>
                    <MenuList items={nonMilkItems} />
                  </div>
                </div>
              ) : (
                // Standard List for other categories
                <MenuList items={otherItems.length > 0 ? otherItems : filteredItems} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
