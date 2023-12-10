import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box } from '@chakra-ui/react';

import Web3Provider from '@contexts/Web3Provider';
import CartProvider from '@contexts/CartProvider';
import Header from '@components/Header';
import Products from './Products';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <CartProvider>
          <Header />
          <Box paddingTop="65px">
            <Box
              width="100%"
              minH="380px"
              bgColor="gray.50"
              borderBottomWidth={1}
            ></Box>
            <Products />
          </Box>
        </CartProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
};

export default App;
