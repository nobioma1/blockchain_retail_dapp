import { Box, Flex, Stack, Text } from '@chakra-ui/react';

import Slider from '@components/Slider';
import Products from '@components/Products';

const Homepage = () => {
  return (
    <Box height="100%">
      <Flex
        spacing={4}
        width="100%"
        height="380px"
        bgColor="gray.50"
        borderBottomWidth={1}
        alignItems="center"
        justifyContent="center"
      >
        <Slider />
      </Flex>
      <Stack
        p={5}
        spacing={5}
        margin="0 auto"
        maxWidth="1280px"
        position="relative"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="semibold">
          Browse Affordable Shoes on Futa
        </Text>
        <Products />
      </Stack>
    </Box>
  );
};

export default Homepage;
