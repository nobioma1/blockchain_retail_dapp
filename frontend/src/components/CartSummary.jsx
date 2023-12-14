import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useCart } from '@hooks/useCart';
import { displayPrice } from '@/utils';

const CartSummary = ({ totalCost }) => {
  const { shoppingCart } = useCart();

  return (
    <Box minWidth="40%" maxWidth="510px" borderWidth={1} borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" p={3}>
        Cart Summary
      </Text>
      <Divider />
      <Box py={2} px={5} mb={8}>
        {shoppingCart.map((item) => (
          <Flex
            py={3}
            key={item.id}
            justifyContent="space-between"
            _notLast={{ borderBottomWidth: 1 }}
          >
            <Flex flex={1} flexDirection="column">
              <Text fontWeight="semibold">
                {item.cartItem.qty}x {item.product.name}
              </Text>
              <Text fontSize="sm">{displayPrice(item.product.price)}</Text>
            </Flex>
            <Flex maxWidth="200px" fontWeight="semibold">
              {displayPrice(item.total)}
            </Flex>
          </Flex>
        ))}
      </Box>
      <Divider />
      <Text fontSize="lg" textAlign="right" p={3}>
        Total: &nbsp;
        <Text as="span" fontWeight="bold">
          {displayPrice(totalCost)}
        </Text>
      </Text>
    </Box>
  );
};

CartSummary.propTypes = {
  totalCost: PropTypes.number.isRequired,
};

export default CartSummary;
