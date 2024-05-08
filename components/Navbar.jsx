import Link from 'next/link';
import { FaHome, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex justify-between items-center"> {/* Ensure items are centered */}
        <li className="flex items-center">
          <FaHome className="mr-2" /> 
          <Link href="/">Home</Link> {/* Maintain text link */}
        </li>
        <li className="flex items-center">
          <FaShoppingCart className="mr-2" />
          <Link href="/cart">Cart</Link> {/* Maintain text link */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
