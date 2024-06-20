'use client'
import { useState } from 'react';
import { mintNFT } from '../../utils/contract';

const MintPage = () => {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMint = async () => {
    if (file && price) {
      const title = file.name; // Use the file name as the title
      await mintNFT(file, title, price);
    } else {
      alert('Please select a file and set a price.');
    }
  };

  return (
    <div className="container mx-auto p-6 h-screen">
      <h1 className="text-2xl font-bold mb-4">Mint Your NFT</h1>
      <input 
        type="text" 
        placeholder="Price (wei)" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        className="mb-4 p-2 border rounded" 
      />
      <input type="file" onChange={handleFileChange} className="mb-4 p-2 border rounded" />
      <button onClick={handleMint} className="bg-blue-500 text-white py-2 px-4 rounded">Mint NFT</button>
    </div>
  );
};

export default MintPage;
