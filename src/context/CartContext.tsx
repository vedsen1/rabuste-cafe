import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../services/menuService';

export interface CartItem extends MenuItem {
  cartItemId: string; // Unique ID for the item in cart (in case of duplicates/variants)
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

  const addToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      // Check if item already exists
      const existingItem = prev.find((i) => i.id === item.id);
      
      if (existingItem) {
        return prev.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...item, quantity: 1, cartItemId: `${item.id}-${Date.now()}` }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    // Remove non-numeric chars from price (e.g. "₹4.00" -> 4.00)
    const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return total + priceValue * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
