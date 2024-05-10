'use client';
import { useCart } from '@/app/context/cartContext';
import { useRemovedItems } from '@/app/context/removedItemsContext';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, clearCartWithRemovedItems, removeFromCart } = useCart();
  const { addRemovedItems } = useRemovedItems();
  const router = useRouter();

  const handlePay = () => {
    const removedItemIDs = clearCartWithRemovedItems(); // Get IDs of removed items
    addRemovedItems(removedItemIDs); // Update the removed items list
    toast.success("Payment Successful!"); // Show success toast
    router.push('/'); // Redirect to the home page
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
      </div>
    </div>
  );
};

export default Cart;
