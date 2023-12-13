import { Outlet } from 'react-router-dom';

import Header from '@components/Header';
import { Box } from '@chakra-ui/react';

const RootPage = () => {
  return (
    <>
      <Header />
      <Box marginTop="65px" width="100%">
        <Outlet />
      </Box>
    </>
  );
};

export default RootPage;
