'use client';
import { useCart } from '@/app/context/cartContext';
import { useRemovedItems } from '@/app/context/removedItemsContext';
import PictureCard from '../components/PictureCard';
import Navbar from '../components/Navbar';
import Image1 from "@/public/images/sunset.jpg"
import Image2 from "@/public/images/Mountain.jpg"
import Image3 from "@/public/images/pexels-jonaskakaroto-736230.jpg"
import Image4 from "@/public/images/3.jpg"
import Image5 from "@/public/images/4.jpg"
import Image6 from "@/public/images/5.jpg"
import Image7 from "@/public/images/6.jpg"
import Image8 from "@/public/images/7.jpg"
import Image9 from "@/public/images/8.jpg"
import Image10 from "@/public/images/9.jpg"
import Image11 from "@/public/images/sunset.jpg"


const staticPictures = [
  { id: '1', name: 'Sunset', price: 20, url: Image1.src },
  { id: '2', name: 'Mountain', price: 25, url: Image2.src },
  { id: '3', name: 'Beach', price: 30, url: Image3.src },
  { id: '4', name: 'Valley', price: 40, url: Image4.src },
  { id: '5', name: 'Forest', price: 15, url: Image5.src },
  { id: '6', name: 'Desert', price: 35, url: Image6.src },
  { id: '7', name: 'Lake', price: 45, url: Image7.src },
  { id: '8', name: 'River', price: 22, url: Image8.src },
  { id: '9', name: 'Bridge', price: 33, url: Image9.src },
  { id: '10', name: 'Valley', price: 18, url: Image10.src },
  { id: '11', name: 'Field', price: 28, url: Image11.src },
];

const Home = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { removedItems } = useRemovedItems();

  // Filter out removed items
  const filteredPictures = staticPictures.filter(
    (pic) => !removedItems.includes(pic.id)
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPictures.map((pic) => (
          <PictureCard
            key={pic.id}
            picture={pic}
            onAddToCart={() => addToCart(pic)}
            onRemoveFromCart={() => removeFromCart(pic.id)}
            isInCart={cart.some((item) => item.id === pic.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
