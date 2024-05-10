'use client';
import { createContext, useState, useContext } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Define a provider to manage cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCartWithRemovedItems = () => {
    const removedItems = [...cart];
    setCart([]);
    return removedItems.map(item => item.id); // Return the IDs of the removed items
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCartWithRemovedItems }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context
export const useCart = () => {
  return useContext(CartContext);
};
