import { useContext } from 'react';

import { CartContext } from '@/contexts/CartProvider';

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('CartContext must be used within a CartProvider');
  }

  return context;
};
