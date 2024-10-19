import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const useIPFS = () => {
  const uploadToIPFS = async (data: any) => {
    try {
      const result = await client.add(JSON.stringify(data));
      return `ipfs://${result.path}`;
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw error;
    }
  };

  return { uploadToIPFS };
};