'use client';
import { createContext, useState, useContext } from 'react';
import Web3 from 'web3';

// Create a context for the wallet
const WalletContext = createContext();

// Define a provider to manage wallet state
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setWalletAddress(accounts[0]);
    } else {
      console.error("MetaMask not installed");
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the Wallet context
export const useWallet = () => {
  return useContext(WalletContext);
};
