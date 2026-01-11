import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Coffee, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMenuItems, MenuItem } from '../services/menuService';
import { useCart } from '../context/CartContext';

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
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();

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

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter for Specialty Items (Robusta Cold or Hot)
  const specialtyItems = menuItems.filter(
    item => item.category === 'Robusta Cold' || item.category === 'Robusta Hot'
  );

  // Group items by category and then by subcategory
  const groupedItems = CATEGORIES.reduce((acc, cat) => {
    const catItems = menuItems.filter(item => item.category === cat);
    if (catItems.length > 0) {
      // Check for subcategories
      const milkItems = catItems.filter(item => item.subcategory === 'Milk');
      const nonMilkItems = catItems.filter(item => item.subcategory === 'Non-Milk');
      const otherItems = catItems.filter(item => !item.subcategory);

      acc[cat] = {
        milk: milkItems,
        nonMilk: nonMilkItems,
        others: otherItems
      };
    }
    return acc;
  }, {} as Record<string, { milk: MenuItem[], nonMilk: MenuItem[], others: MenuItem[] }>);



const MenuItemCard = ({ item }: { item: MenuItem }) => (
    <div className="flex-shrink-0 w-[160px] md:w-[320px] bg-brown-900/90 rounded-xl overflow-hidden border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 group shadow-lg snap-start hover:scale-105 z-0 hover:z-10 relative">
      {/* Image Area */}
      <div className="h-32 md:h-48 w-full bg-black/40 relative overflow-hidden rounded-t-xl">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brown-900/20 bg-cream-100/5">
            <span className="font-serif italic">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 flex flex-col gap-2 md:gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-sm md:text-xl font-serif text-gold-400 leading-tight line-clamp-2">{item.name}</h3>
          <span className="text-sm md:text-lg font-bold text-cream-100">{item.price}</span>
        </div>
        
        <p className="text-xs md:text-sm text-cream-200/60 line-clamp-2 min-h-[2.5em] hidden md:block">
          {item.description || "A classic favorite brewed to perfection."}
        </p>

        <button 
          onClick={() => addToCart(item)}
          className="mt-auto w-full py-2 md:py-3 bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-brown-900 rounded-lg text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-1 md:gap-2"
        >
          Add <span className="hidden md:inline">to Cart</span>
        </button>
      </div>
    </div>
  );

  const ScrollRow = ({ items }: { items: MenuItem[] }) => {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (rowRef.current) {
        const scrollAmount = direction === 'left' ? -300 : 300;
        rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    return (
      <div className="relative group/row">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-brown-900/80 text-gold-400 p-2 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-brown-900 shadow-lg -ml-4"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scroll Container */}
        <div 
          ref={rowRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide -mx-6 px-6"
        >
          {items.map(item => <MenuItemCard key={item.id} item={item} />)}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-brown-900/80 text-gold-400 p-2 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-brown-900 shadow-lg -mr-4"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden relative">
      
      {/* Background Texture */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/coffee.png')]"></div>

      {/* Our Menu Heading */}
      <div className="container mx-auto px-6 relative z-10 pt-32 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="block text-gold-500 text-sm tracking-[0.3em] uppercase mb-4 font-bold">Discover Our Flavors</span>
          <h1 className="text-5xl md:text-7xl font-serif text-brown-900">Our Menu</h1>
        </motion.div>
      </div>

      {/* Our Specialty Section */}
      <section className="container mx-auto px-6 mb-24 relative z-10 bg-brown-900/5 py-16 rounded-3xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-brown-900 mb-12 text-left pl-4">Our Specialty</h2>
          
          <div className="space-y-12">
            {/* Group by Subcategory Logic for Specialty Section */}
            {(() => {
              const milkItems = specialtyItems.filter(item => item.subcategory === 'Milk');
              const nonMilkItems = specialtyItems.filter(item => item.subcategory === 'Non-Milk');
              const otherItems = specialtyItems.filter(item => !item.subcategory);

              if (specialtyItems.length === 0) {
                 return (
                  <div className="text-center text-brown-900/50 py-10">
                    <Coffee size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Our Robusta specialties are brewing soon...</p>
                  </div>
                 );
              }

              return (
                <>
                  {/* Milk Based */}
                  {milkItems.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-brown-900 mb-6 pl-2">Milk Based</h3>
                      <ScrollRow items={milkItems} />
                    </div>
                  )}

                  {/* Non-Milk Based */}
                  {nonMilkItems.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-brown-900 mb-6 pl-2">Non-Milk Based</h3>
                      <ScrollRow items={nonMilkItems} />
                    </div>
                  )}

                   {/* Other Items */}
                   {otherItems.length > 0 && (
                    <div>
                      {(milkItems.length > 0 || nonMilkItems.length > 0) && <h3 className="text-lg font-bold text-brown-900 mb-6 pl-2">Others</h3>}
                      <ScrollRow items={otherItems} />
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </motion.div>
      </section>

      {/* Actual Menu Grid */}
      <div className="container mx-auto px-6 relative z-10">
        {loading ? (
          <div className="text-center text-brown-900/50 py-20">Brewing the menu...</div>
        ) : (
          <div className="space-y-24">
            {CATEGORIES.filter(cat => cat !== 'Robusta Cold' && cat !== 'Robusta Hot').map((cat) => {
              const group = groupedItems[cat];
              if (!group) return null;

              const hasSub = group.milk.length > 0 || group.nonMilk.length > 0;

              return (
                <motion.div 
                  key={cat}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  {/* Category Title */}
                  <div className="flex items-baseline gap-6 mb-8 border-b border-brown-900/10 pb-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-brown-900">{cat}</h2>
                  </div>

                  {/* Subcategories or Direct Items */}
                  <div className="space-y-12">
                    {/* Milk Based */}
                    {group.milk.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-brown-900 mb-6 pl-2">Milk Based</h3>
                        <ScrollRow items={group.milk} />
                      </div>
                    )}

                    {/* Non-Milk Based */}
                    {group.nonMilk.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-brown-900 mb-6 pl-2">Non-Milk Based</h3>
                        <ScrollRow items={group.nonMilk} />
                      </div>
                    )}

                    {/* Other Items (No subcategory) */}
                    {group.others.length > 0 && (
                      <div>
                        {hasSub && <h3 className="text-lg font-bold text-brown-900 mb-6 pl-2">Others</h3>}
                        <ScrollRow items={group.others} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gold-500 text-brown-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform relative group">
          <ShoppingCart size={24} fill="currentColor" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-brown-900">
              {cartCount}
            </span>
          )}
          
          {/* Simple Tooltip Cart Summary */}
          <div className="absolute bottom-full right-0 mb-4 w-64 bg-white text-brown-900 rounded-xl shadow-xl p-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity origin-bottom-right transform scale-95 group-hover:scale-100">
            <h4 className="font-bold border-b border-brown-900/10 pb-2 mb-2">Cart Summary</h4>
            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Your cart is empty</p>
            ) : (
              <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
                {cartItems.map(item => (
                  <li key={item.cartItemId} className="flex justify-between">
                    <span className="truncate w-32">{item.name}</span>
                    <span className="font-mono">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
