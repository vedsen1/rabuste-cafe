import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../services/menuService';

export interface CartItem extends MenuItem {
  cartItemId: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ Add to cart
  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);

      if (existingItem) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          cartItemId: crypto.randomUUID(), // ✅ better unique id
        },
      ];
    });
  };

  // ✅ Remove single cart item
  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // ✅ Clear cart (used after Razorpay success)
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Total price calculation
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Safe hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
