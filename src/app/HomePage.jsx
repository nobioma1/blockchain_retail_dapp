import { Box, Stack, Text } from '@chakra-ui/react';

import Slider from '@components/Slider';
import Products from '@components/Products';

const Homepage = () => {
  return (
    <Box>
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
  );
};

export default Homepage;
