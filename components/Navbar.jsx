import Link from 'next/link';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import { SiWalletconnect } from "react-icons/si";
import { useWallet } from '@/app/context/walletContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { connectWallet, walletAddress } = useWallet();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    setConnected(walletAddress !== '');
  }, [walletAddress]);

  return (
    <nav className="bg-gray-800 p-4 text-white sticky top-1 rounded-lg m-1 z-10 shadow-lg">
      <ul className="flex justify-between items-center mx-2">
        <li className="flex items-center">
          <FaHome className="mr-2" />
          <Link href="/">Home</Link>
        </li>
        <li>
          {connected ? (
            <button className='bg-green-500 px-3 py-2 rounded flex items-center'><span className='hidden md:inline-block'>Connected: </span>{walletAddress.slice(0, 6)}...</button>
          ) : (
            <button
              className="bg-blue-500 px-4 py-2 rounded text-white flex items-center hover:bg-blue-700"
              onClick={connectWallet}
            >
              <SiWalletconnect className='flex mx-1' /> <span className='hidden md:inline-block'>Connect Wallet</span>
            </button>
          )}
        </li>
        <li className="flex items-center">
          <FaShoppingCart className="mr-2" />
          <Link href="/cart">Cart</Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
