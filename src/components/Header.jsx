import { Text, Flex, HStack, Icon } from '@chakra-ui/react';
import { LiaShoePrintsSolid } from 'react-icons/lia';

import Cart from '@app/Cart';

import MetamaskButton from '@components/MetamaskButton';

const Header = () => {
  return (
    <Flex
      top={0}
      left={0}
      px={3}
      width="100%"
      minHeight="65px"
      position="fixed"
      backgroundColor="gray.50"
      justifyContent="center"
      borderBottomWidth={1}
      zIndex={999}
    >
      <Flex
        width="100%"
        maxWidth="1280px"
        alignItems="center"
        justifyContent="space-between"
        cursor="pointer"
      >
        <HStack>
          <Icon as={LiaShoePrintsSolid} boxSize={6} />
          <Text fontWeight="bold" fontSize="3xl" fontFamily="Bubblegum Sans">
            Futas
          </Text>
        </HStack>

        <HStack spacing={3}>
          <Cart />
          <MetamaskButton />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Header;
