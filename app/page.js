'use client';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import PictureNFT from '../contracts/PictureNFT.json'; // ABI of your contract

const contractAddress = '0x1836a7784b45f9ce4b9cd49bb4cf267e810de937';

const Home = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(PictureNFT, contractAddress);

      try {
        const tokenCounter = await contract.methods.tokenCounter().call();
        console.log('Token Counter:', tokenCounter);

        const nftsData = [];

        for (let i = 0; i < tokenCounter; i++) {
          const tokenId = i; // token IDs start from 0 to tokenCounter - 1
          const tokenURI = await contract.methods.tokenURI(tokenId).call();
          nftsData.push({ tokenId, tokenURI });
        }

        setNfts(nftsData);
      } catch (error) {
        console.error('Error fetching NFTs: ', error);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className='bg-violet-100 h-full'>
      <div className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft) => (
          <div key={nft.tokenId} className="p-4 bg-violet-50 border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl hover:border-blue-300 transition-shadow duration-200 ease-in-out">
            <div className="overflow-hidden block rounded-lg">
              <img
                className="w-full h-56 object-cover rounded-lg hover:scale-125 ease-in duration-150"
                src={nft.tokenURI}
                alt={`NFT ${nft.tokenId}`}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex-start">
                <h3 className="mt-2 text-lg font-semibold">NFT {nft.tokenId}</h3>
                <p className="text-gray-600">Token ID: {nft.tokenId}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
