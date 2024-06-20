import Web3 from 'web3';
import PictureNFT from '../contracts/PictureNFT.json'; // ABI of your contract
import { uploadToIPFS } from './ipfs'; // Ensure IPFS import is correct

const contractAddress = '0x1836a7784b45f9ce4b9cd49bb4cf267e810de937';

export const mintNFT = async (file, title, price) => {
  if (!window.ethereum) {
    alert('Please install MetaMask!');
    return;
  }

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  const account = accounts[0];

  // Upload the picture to IPFS
  const ipfsResponse = await uploadToIPFS(file);
  const ipfsHash = ipfsResponse.IpfsHash;

  // Interact with the smart contract
  const contract = new web3.eth.Contract(PictureNFT, contractAddress);

  try {
    await contract.methods.createNFT(account, `https://ipfs.io/ipfs/${ipfsHash}`, title, price).send({ from: account });
    alert('NFT minted successfully!');
  } catch (error) {
    console.error('Error minting NFT: ', error);
    alert('Failed to mint NFT');
  }
};
