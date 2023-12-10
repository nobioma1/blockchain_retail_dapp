import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, Stack, Text } from '@chakra-ui/react';

import Web3Provider from '@contexts/Web3Provider';
import CartProvider from '@contexts/CartProvider';
import Header from '@components/Header';
import Products from './Products';
import Slider from '@components/Slider';

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
          <Box marginTop="65px">
            <Box
              width="100%"
              minH="380px"
              bgColor="gray.50"
              borderBottomWidth={1}
            ></Box>
            <Stack
              p={5}
              spacing={5}
              margin="0 auto"
              maxWidth="1280px"
              position="relative"
            >
              <Slider />
              <Stack alignItems="center" spacing={5}>
                <Box>
                  <Text fontSize="xl" fontWeight="semibold">
                    Browse Affordable Shoes on Futa
                  </Text>
                </Box>
                <Products />
              </Stack>
            </Stack>
          </Box>
        </CartProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
};

export default App;
