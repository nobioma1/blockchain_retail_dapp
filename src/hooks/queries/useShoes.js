import { useQuery, useQueryClient } from '@tanstack/react-query';

import shoesApi from '@apis/shoesApi';
import shoesData from '../../data';

export const useShoes = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['shoes'],
    queryFn: async () => {
      try {
        // const response = await shoesApi.get('/shoes');

        // free API max out at 20 requests per day
        // fallback to dummy data

        // const data = response?.data ?? [];

        const data = [];

        if (data.length === 0) {
          throw new Error('No shoes to display');
        }

        return data;
      } catch {
        return shoesData;
      }
    },
  });
};
