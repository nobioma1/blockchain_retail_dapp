import { useQuery } from '@tanstack/react-query';

import backendApi from '@apis/api';

export const useShoes = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await backendApi.get('/products');
      return response.data;
    },
  });
};
