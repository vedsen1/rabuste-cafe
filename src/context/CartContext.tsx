import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../services/menuService';
import { ArtPiece } from '../services/artService';

export type CartableItem = MenuItem | ArtPiece;

export interface CartItem {
  id?: string;
  title?: string;
  name?: string;
  price: string;
  imageUrl?: string;
  cartItemId: string;
  quantity: number;
  itemType: 'menu' | 'art';
  [key: string]: unknown;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartableItem, itemType: 'menu' | 'art') => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ✅ Add to cart with art support
  const addToCart = (item: CartableItem, itemType: 'menu' | 'art') => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id && i.itemType === itemType);

      if (existingItem) {
        return prev.map(i =>
          i.id === item.id && i.itemType === itemType
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
          itemType,
          cartItemId: crypto.randomUUID(),
        } as CartItem,
      ];
    });
  };

  // ✅ Remove single cart item
  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // ✅ Update quantity
  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ✅ Clear cart (used after Razorpay success)
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Total price calculation
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(String(item.price || '0').replace(/[^0-9.]/g, '')) || 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
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
