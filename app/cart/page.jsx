'use client';
import { useCart } from '@/app/context/cartContext';
import { useRemovedItems } from '@/app/context/removedItemsContext';
import { useWallet } from '@/app/context/walletContext';
import { useTransactions } from '@/app/context/transactionsContext';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, clearCartWithRemovedItems } = useCart();
  const { walletAddress } = useWallet();
  const { addTransaction, transactions } = useTransactions(); // <-- New context
  const { addRemovedItems } = useRemovedItems();
  const router = useRouter();

  const handlePay = async () => {
    if (walletAddress === '') {
      toast.error("Please connect your wallet");
      return;
    }

    const removedItemIDs = clearCartWithRemovedItems(); // Get IDs of removed items
    addRemovedItems(removedItemIDs); // Add these removed item IDs to context

    try {
      const web3 = new Web3(window.ethereum);
      const ethAmount = 0.01; 

      const tx = {
        from: walletAddress,
        to: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', // Testnet wallet address
        value: web3.utils.toWei(ethAmount.toString(), 'ether'),
        gas: 21000,
        blockNumber: await web3.eth.getBlockNumber()
      };

      const receipt = await web3.eth.sendTransaction(tx);
      addTransaction(receipt); 
      toast.success("Payment Successful!");
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Try again.");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b border-gray-300"
            >
              <div>
                <span className="text-xl">{item.name}</span>
                <span className="ml-4">{`Price: $${item.price}`}</span>
              </div>
              <button
                className="text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out"
                onClick={() => removeFromCart(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
        <p className="text-lg font-bold mt-4">{`Total: $${total}`}</p>
        <button
          className={`mt-6 px-4 py-2 ${
            cart.length === 0
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 ease-in-out'
          } rounded-lg`}
          onClick={handlePay}
          disabled={cart.length === 0}
        >
          Pay
        </button>

        {/* Section to display previous transactions */}
        <div className="mt-6">
          <h3 className="text-xl font-bold">Previous Transactions:</h3>
          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <ul className='text-pretty'>
              {transactions.map((txn, index) => (
                <li key={index} className="border-b p-2">
                  <p className='truncate hover:text-clip'>Transaction Hash: {txn.transactionHash}</p>
                  <br />
                  <span>Block Number: {txn?.blockNumber}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
