'use client';
import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import { useCart } from '@/app/context/cartContext';
import PictureCard from '../components/PictureCard';
import Navbar from '../components/Navbar';

// Create an Unsplash API client using your access key
const unsplash = createApi({
  accessKey: 'o2zj4ht79dqiTn4jVSbAde6h-_eAaRL7w8E79j-EXMw',
});

const Home = () => {
  const [pictures, setPictures] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    // Fetch a collection of photos from Unsplash
    const fetchPictures = async () => {
      const response = await unsplash.photos.list({
        page: 1,
        perPage: 10,
      });

      const data = response.response.results.map((photo) => ({
        id: photo.id,
        name: photo.description || 'Untitled',
        price: Math.floor(Math.random() * 50) + 10,
        url: photo.urls.small,
      }));

      setPictures(data);
    };

    fetchPictures();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pictures.map((pic) => (
          <PictureCard
            key={pic.id}
            picture={pic}
            onAddToCart={() => addToCart(pic)}
            onRemoveFromCart={() => removeFromCart(pic.id)}
            isInCart={cart.some(item => item.id === pic.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

