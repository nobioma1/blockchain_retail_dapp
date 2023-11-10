import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from '@app/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
