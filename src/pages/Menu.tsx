import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Coffee, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import muffin from '../assets/muffin.png';
import menuHeroBg from '../assets/menu-hero-bg.png';
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

  // UI helpers
  const categoryColor = (cat: string) => {
    switch (cat) {
      case 'Robusta Cold': return 'bg-[#2f7d5d]';
      case 'Robusta Hot': return 'bg-[#c24f33]';
      case 'Blend Cold': return 'bg-[#4f6fc2]';
      case 'Blend Hot': return 'bg-[#c28a33]';
      case 'Manual Brew': return 'bg-[#7a5f3b]';
      case 'Non Coffee': return 'bg-[#7a7a7a]';
      case 'Savoury': return 'bg-[#a64b2a]';
      default: return 'bg-[#7a5f3b]';
    }
  };
  const [selectedCategory, setSelectedCategory] = useState<string>('All');



  const GridCard = ({ item }: { item: MenuItem }) => (
    <div className="bg-white rounded-xl border border-[#eee] shadow-sm hover:shadow-md transition-shadow overflow-hidden relative">
      {/* Rating badge */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full border border-[#ddd] text-[#555] text-xs font-semibold">
        <Star size={14} className="text-[#f5a623]" fill="#f5a623" />
        <span>4.8</span>
      </div>
      {/* Image */}
      <div className="h-72 w-full bg-[#f7f3ee]">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#b7a89a]">No Image</div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block w-3 h-3 rounded-sm ${categoryColor(item.category)}`} />
          <h3 className="text-lg font-semibold text-[#2b2b2b]">{item.name}</h3>
        </div>
        <p className="text-sm text-[#6f6f6f] mb-3">{item.description || item.name}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#333] font-semibold">{item.price}</span>
          <button
            onClick={() => addToCart(item)}
            className="px-3 py-2 bg-[#2f7d5d] text-white rounded-md text-xs font-semibold hover:bg-[#276b51]"
          >
            Add to Cart
          </button>
        </div>
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
          {items.map(item => <GridCard key={item.id} item={item} />)}
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
    <div className="min-h-screen pb-20 overflow-x-hidden relative bg-[#f2e8db]">
      {/* Hero */}
      {/* Hero */}
      <section className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-0">

          {/* Left: Text Content */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[#4CAF50] font-[Yellowtail] text-3xl md:text-4xl mb-4 transform -rotate-2">
              we speak fluent coffee
            </span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] leading-[1.1] mb-2 tracking-tight font-sans">
              NO MATTER WHICH <br />
              ROAST YOU <span className="text-[#FFC107] font-[Yellowtail] font-normal ml-2">prefer.</span>
            </h1>

            <p className="mt-6 text-gray-500 text-lg max-w-lg leading-relaxed font-sans">
              Freshly brewed global coffee blends. From Robusta to Arabica, authentic flavors delivered fresh to your cup every day.
            </p>

            <button
              onClick={() => document.getElementById('menu-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 bg-[#FFC107] hover:bg-[#ffb300] text-black font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              Order Now <span className="text-xl">→</span>
            </button>

            <div className="mt-10 flex items-center gap-6 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#FFC107] rounded-full"></span> Brewed to Order</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-[#FFC107] rounded-full"></span> Menu Changes Weekly</span>
            </div>
          </div>

          {/* Right: Muffin/Image with Badges */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative flex justify-center">
              <img
                src={muffin}
                alt="Delicious Feature"
                className="w-full max-w-2xl h-auto object-contain transform hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Category Filters */}
      <div className="container mx-auto px-6 mt-8 mb-6" id="menu-grid">
        <div className="flex flex-wrap gap-3">
          {['All', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border ${selectedCategory === cat
                ? 'bg-[#2f7d5d] text-white border-[#2f7d5d]'
                : 'bg-white text-[#53483f] border-[#ddd] hover:bg-[#f7f3ee]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Menu */}
      <div className="container mx-auto px-6">
        {loading ? (
          <div className="text-center text-[#6f6f6f] py-20">Brewing the menu...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {(selectedCategory === 'All' ? menuItems : menuItems.filter(i => i.category === selectedCategory)).map((item) => (
              <GridCard key={item.id || item.name} item={item} />
            ))}
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
