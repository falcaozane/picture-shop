'use client'
import { createContext, useContext, useState } from 'react';
import Web3 from 'web3';

const WalletContext = createContext();

export const useWallet = () => {
  return useContext(WalletContext);
};

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.requestAccounts();
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet: ', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
