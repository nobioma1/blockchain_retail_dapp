import { useContext } from 'react';

import { Web3Context } from '@contexts/Web3Provider';

export const useWeb3 = () => {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error('Web3Context must be used within a Web3Provider');
  }

  return context;
};
