import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { AuthModal } from '../components/modals/AuthModal';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // Group items by type for display if needed, but simple list is fine for now
    const isEmpty = cartItems.length === 0;

    const handleCheckout = async () => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        setIsProcessing(true);

        try {
            // Create order object
            const orderData = {
                userId: user.uid,
                userEmail: user.email,
                items: cartItems,
                totalAmount: totalPrice,
                status: 'pending', // or 'paid' if we had real payment
                createdAt: serverTimestamp(),
            };

            // Save to Firestore
            const orderRef = doc(db, 'orders', crypto.randomUUID());
            await setDoc(orderRef, orderData);

            // Simulate payment delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Clear cart
            clearCart();

            // Redirect to success or home
            alert('Order placed successfully! (Mock Payment)');
            navigate('/');
        } catch (error) {
            console.error("Order failed:", error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F6F1E8] pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 md:top-2 md:-translate-y-0 text-[#2B1B16]/60 hover:text-[#C9A24D] transition-colors flex items-center gap-2"
                >
                    <ArrowLeft size={20} />
                    <span className="hidden md:inline text-sm uppercase tracking-widest">Back</span>
                </button>
                <h1 className="text-4xl md:text-5xl font-serif text-[#2B1B16] mb-12 text-center">Your Cart</h1>

                {isEmpty ? (
                    <div className="text-center py-20">
                        <p className="text-[#2B1B16]/60 text-lg mb-8">Your cart is currently empty.</p>
                        <Link
                            to="/menu"
                            className="inline-flex items-center px-8 py-3 bg-[#2B1B16] text-[#F6F1E8] rounded-full text-xs uppercase tracking-widest hover:bg-[#C9A24D] transition-colors"
                        >
                            Start Ordering
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-[30px] p-6 md:p-10 shadow-xl">
                        {/* Cart Items List */}
                        <div className="space-y-8 mb-10">
                            {cartItems.map((item) => (
                                <div key={item.cartItemId} className="flex flex-col md:flex-row items-center gap-6 border-b border-[#2B1B16]/10 pb-6 last:border-0">
                                    {/* Image */}
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.title || item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#2B1B16]/20">No Image</div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex flex-col md:flex-row md:justify-between items-center mb-2">
                                            <h3 className="font-serif text-xl text-[#2B1B16]">{item.title || item.name}</h3>
                                            <span className="text-xs uppercase tracking-widest text-[#C9A24D] font-bold mt-1 md:mt-0">{item.itemType}</span>
                                        </div>
                                        <p className="text-[#2B1B16]/60 text-sm mb-4">₹{parseFloat(String(item.price).replace(/[^0-9.]/g, ''))}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-[#F6F1E8] rounded-full p-1">
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-[#2B1B16] transition-colors"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center font-medium text-[#2B1B16]">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-[#2B1B16] transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.cartItemId)}
                                            className="p-2 text-[#2B1B16]/40 hover:text-red-500 transition-colors"
                                            title="Remove item"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Total & Checkout */}
                        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#2B1B16]/10">
                            <div className="text-center md:text-left mb-6 md:mb-0">
                                <p className="text-[#2B1B16]/60 text-sm uppercase tracking-widest mb-1">Total Amount</p>
                                <p className="font-serif text-4xl text-[#2B1B16]">₹{totalPrice.toFixed(2)}</p>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className="inline-flex items-center gap-3 px-10 py-4 bg-[#C9A24D] text-[#2B1B16] rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#D4B15E] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
                                {!isProcessing && <ArrowRight size={16} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
}
