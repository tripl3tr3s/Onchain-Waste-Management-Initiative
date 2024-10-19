import { useState } from 'react';
import { useIPFS } from '../hooks/useIPFS';
import { useMaterialTracker } from '../hooks/useContract';

export const CreateMaterial = () => {
  const [name, setName] = useState('');
  const [batchId, setBatchId] = useState('');
  const [amount, setAmount] = useState('');
  const { uploadToIPFS } = useIPFS();
  const contract = useMaterialTracker('YOUR_CONTRACT_ADDRESS');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload metadata to IPFS
      const metadata = {
        name,
        batchId,
        timestamp: new Date().toISOString(),
        properties: {
          // Add additional properties
        }
      };
      
      const ipfsHash = await uploadToIPFS(metadata);
      
      // Create material on blockchain
      const tx = await contract.createMaterial(
        name,
        batchId,
        ipfsHash,
        parseInt(amount)
      );
      
      await tx.wait();
      
      // Reset form
      setName('');
      setBatchId('');
      setAmount('');
      
    } catch (error) {
      console.error('Error creating material:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Material Name"
      />
      <input
        type="text"
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
        placeholder="Batch ID"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button type="submit">Create Material</button>
    </form>
  );
};