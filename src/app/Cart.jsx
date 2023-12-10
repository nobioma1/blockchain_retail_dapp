import { useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@hooks/useCart';
import QtyButton from '@/components/QtyButton';
import { displayPrice } from '../utils';

const Cart = () => {
  const btnRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { shoppingCart, decreaseQty, increaseQty, removeFromCart } = useCart();

  return (
    <>
      <Button
        variant="outline"
        rightIcon={<FiShoppingCart />}
        ref={btnRef}
        onClick={onOpen}
        position="relative"
      >
        {shoppingCart.length > 0 && (
          <Box
            position="absolute"
            borderRadius="full"
            background="teal"
            top={1}
            right={1}
            p={1}
          />
        )}
        Cart
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Shopping Cart</DrawerHeader>

          <DrawerBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Product</Th>
                    <Th>Size</Th>
                    <Th>Quantity</Th>
                    <Th>Remove</Th>
                    <Th isNumeric>Price</Th>
                  </Tr>
                </Thead>
                {shoppingCart.length > 0 && (
                  <Tbody>
                    {shoppingCart.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.product.name}</Td>
                        <Td>{item.cartItem.size}</Td>
                        <Td>
                          <QtyButton
                            qty={item.cartItem.qty}
                            increment={() => increaseQty(item.id)}
                            decrement={() => decreaseQty(item.id)}
                          />
                        </Td>
                        <Td>
                          <Button
                            variant="outline"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <IoMdClose size={20} />
                          </Button>
                        </Td>
                        <Td isNumeric>{displayPrice(item.total)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                )}
              </Table>
            </TableContainer>

            {shoppingCart.length === 0 && (
              <Text pt={4} textAlign="center">
                You have not added any item to cart 👀
              </Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
