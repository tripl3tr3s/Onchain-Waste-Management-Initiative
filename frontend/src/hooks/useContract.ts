import { useContract, useSigner } from 'wagmi';
import { MaterialTracker__factory } from '../../../typechain-types';

export const useMaterialTracker = (address: string) => {
  const { data: signer } = useSigner();
  
  return useContract({
    address,
    abi: MaterialTracker__factory.abi,
    signerOrProvider: signer,
  });
};