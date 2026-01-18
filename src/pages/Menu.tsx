import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import muffin from '../assets/muffin.png';
import { getMenuItems, MenuItem } from '../services/menuService';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  'Robusta Cold',
  'Robusta Hot',
  'Blend Cold',
  'Blend Hot',
  'Manual Brew',
  'Non Coffee',
  'Shakes',
  'Savoury'
];

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addToCart, cartItems, clearCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenuItems();
        setMenuItems(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const cartCount = cartItems.reduce((a, b) => a + b.quantity, 0);

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price.replace(/[^\d]/g, ''));
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    const amount = getTotalAmount();
    if (amount === 0) return;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: 'Coffee Store',
      description: 'Coffee Order',
      handler: (response: any) => {
        console.log('Payment Success:', response);

        clearCart(); // ✅ THIS FIXES YOUR ISSUE

        alert('Payment Successful ☕');
      },
      theme: {
        color: '#2f7d5d',
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };


  const GridCard = ({ item }: { item: MenuItem }) => (
    <div className="bg-white rounded-xl border shadow-sm">
      <div className="h-60 bg-[#f7f3ee]">
        {item.imageUrl ? (
          <img src={item.imageUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">No Image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold">{item.price}</span>
          <button
            onClick={() => addToCart(item, 'menu')}
            className="bg-[#2f7d5d] text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f2e8db] pb-24">
      {/* HERO */}
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

      {/* MENU GRID */}
      <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          (selectedCategory === 'All'
            ? menuItems
            : menuItems.filter(i => i.category === selectedCategory)
          )
            .filter(item => item.name && item.name.trim() !== '')
            .map(item => <GridCard key={item.id} item={item} />)
        )}
      </div>

      {/* FLOATING CART */}
      <div className="fixed bottom-24 right-6 group z-40">
        <button className="bg-[#FFC107] p-4 rounded-full shadow-xl relative">
          <ShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* CART POPUP */}
        <div className="absolute bottom-full right-0 mb-3 w-64 bg-white rounded-xl shadow-xl p-4 opacity-0 group-hover:opacity-100 transition">
          <h4 className="font-bold mb-2">Cart</h4>

          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Empty</p>
          ) : (
            <>
              <ul className="text-sm mb-3 max-h-32 overflow-y-auto">
                {cartItems.map(i => (
                  <li key={i.cartItemId} className="flex justify-between">
                    <span>{i.name}</span>
                    <span>x{i.quantity}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#2f7d5d] text-white py-2 rounded"
              >
                Checkout ₹{getTotalAmount()}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}