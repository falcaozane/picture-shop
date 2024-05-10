'use client';
import { createContext, useState, useContext } from 'react';

// Create a context for removed items
const RemovedItemsContext = createContext();

// Define a provider to manage removed items state
export const RemovedItemsProvider = ({ children }) => {
  const [removedItems, setRemovedItems] = useState([]);

  const addRemovedItems = (items) => {
    setRemovedItems((prev) => [...prev, ...items]);
  };

  const clearRemovedItems = () => {
    setRemovedItems([]);
  };

  return (
    <RemovedItemsContext.Provider
      value={{ removedItems, addRemovedItems, clearRemovedItems }}
    >
      {children}
    </RemovedItemsContext.Provider>
  );
};

// Custom hook to use the Removed Items context
export const useRemovedItems = () => {
  return useContext(RemovedItemsContext);
};
