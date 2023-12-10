import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react';
import { BiCart } from 'react-icons/bi';

import { useCart } from '@hooks/useCart';
import QtyButton from '@/components/QtyButton';
import { displayPrice } from '../utils';

const sizes = ['35.5', '37', '38', '39', '40', '41', '42', '42.5', '43', '44'];

const DEFAULT_CART_ITEM = { qty: 1, size: sizes[0] };

const Product = (product) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartItem, setCartItem] = useState(DEFAULT_CART_ITEM);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, cartItem);
    setCartItem(DEFAULT_CART_ITEM);
    onClose();
  };

  const addQty = () => {
    setCartItem((item) => ({
      ...item,
      qty: item.qty + 1,
    }));
  };

  const decreaseQty = () => {
    setCartItem((item) => ({
      ...item,
      qty: item.qty - 1,
    }));
  };

  return (
    <>
      <Flex flexDirection="column" maxWidth={{ md: '280px' }} cursor="pointer">
        <Box minHeight="350px" bgColor="#FAFAFA" borderTopRadius="lg">
          <Image
            width="100%"
            src={product.image}
            alt={product.name}
            borderTopRadius="md"
          />
        </Box>
        <Stack p={3} spacing={1}>
          <Text>{displayPrice(product.price)}</Text>
          <Text fontWeight="semibold">{product.name}</Text>
          <Button
            size="sm"
            ref={finalRef}
            onClick={onOpen}
            variant="outline"
            leftIcon={<BiCart />}
          >
            Add to cart
          </Button>
        </Stack>
      </Flex>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={finalRef}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add &quot;{product.name}&quot; to cart</ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack py={3} spacing={6}>
              <Flex justifyContent="space-between">
                <Text fontWeight="semibold" color="gray.700">
                  Sizes
                </Text>
                <Wrap spacing={3} maxWidth="75%" justify="flex-end">
                  {sizes.map((size) => (
                    <WrapItem
                      key={size}
                      padding={2}
                      borderWidth={1}
                      borderRadius="md"
                      cursor="pointer"
                      borderColor={
                        cartItem.size === size ? 'cadetblue' : 'gray.100'
                      }
                      onClick={() => setCartItem((item) => ({ ...item, size }))}
                    >
                      {size}
                    </WrapItem>
                  ))}
                </Wrap>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="semibold" color="gray.700">
                  Quantity
                </Text>
                <QtyButton
                  qty={cartItem.qty}
                  increment={addQty}
                  decrement={decreaseQty}
                />
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontWeight="semibold" color="gray.700">
                  Price
                </Text>
                <Text fontSize="xl">
                  {displayPrice(cartItem.qty * product.price)}
                </Text>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter borderTopWidth={1}>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              ref={finalRef}
              leftIcon={<BiCart />}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Product;
