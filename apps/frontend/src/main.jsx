import '@fontsource/bubblegum-sans';
import '@fontsource/lato/100.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Web3Provider from '@contexts/Web3Provider';
import CartProvider from '@contexts/CartProvider';

import RootPage from './app/RootPage';
import Homepage from './app/HomePage';
import CheckoutPage from './app/CheckoutPage';

const root = createRoot(document.getElementById('root'));

const theme = extendTheme({
  styles: {
    global: {
      'html, body, #root': {
        minHeight: '100%',
        overflowX: 'hidden',
      },
    },
  },
  fonts: {
    heading: `Lato, sans-serif`,
    body: `Lato, sans-serif`,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: '',
        element: <Homepage />,
      },
    ],
  },
]);

root.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </Web3Provider>
    </QueryClientProvider>
  </ChakraProvider>
);
