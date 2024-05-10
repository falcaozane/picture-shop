'use client';
import { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify';

// Create a context for transactions
const TransactionsContext = createContext();

// Define a provider to manage transaction state
export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    toast.success("Transaction added to history.");
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

// Custom hook to use the Transactions context
export const useTransactions = () => {
  return useContext(TransactionsContext);
};
