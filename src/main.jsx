import '@fontsource/bubblegum-sans';
import '@fontsource/lato/100.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import App from '@app/App';

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

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
