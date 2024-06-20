import axios from 'axios';
import FormData from 'form-data';

const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNTUzMGYzZS00MGI4LTRjZDctOTU3Yi02NTIxZWI3MmYxNDMiLCJlbWFpbCI6InByYWNzaGFyZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYmZiZjI3ZWRiNjc4ZWU2ZGYyNWYiLCJzY29wZWRLZXlTZWNyZXQiOiJlYjExNjBmYTExM2E0ZjM5MzhlNTkwYTAzYzczOTU4ZWNmZGRiYTAwZWNmYmZlYjZhN2E2YmNlMzI3NGM3NmUxIiwiaWF0IjoxNzE4ODE2MzUyfQ.qkOOoALt20Su5TyaNBFC_96JTnGRMYJrRkwlrdlSkkM'; // Store your JWT in .env.local file

export const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const pinataMetadata = JSON.stringify({
    name: 'File name', // Optionally, you can make this dynamic
  });
  formData.append('pinataMetadata', pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append('pinataOptions', pinataOptions);

  try {
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${JWT}`
      }
    });
    return res.data; // Return the response data
  } catch (error) {
    console.error('Error uploading file to IPFS: ', error);
    throw error; // Throw error to be handled by the caller
  }
};




