import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GiTakeMyMoney } from 'react-icons/gi';
import { BsShop } from 'react-icons/bs';
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
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@hooks/useCart';

import CartList from './CartList';

const Cart = () => {
  const btnRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { shoppingCart } = useCart();

  const isEmptyList = shoppingCart.length === 0;
  const isCheckout = location.pathname === '/checkout';

  const handleGoToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleOnContinueShopping = () => {
    onClose();

    if (isCheckout) {
      navigate('/');
    }
  };

  return (
    <>
      <Button
        variant="outline"
        rightIcon={<FiShoppingCart />}
        ref={btnRef}
        onClick={onOpen}
        position="relative"
      >
        {!isEmptyList && (
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
            <CartList />
            {isEmptyList && (
              <Text pt={4} textAlign="center">
                You have not added any item to cart 👀
              </Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            <HStack spacing={3}>
              <Button
                variant="outline"
                onClick={handleOnContinueShopping}
                leftIcon={<BsShop />}
              >
                Continue Shopping
              </Button>
              {!isCheckout && (
                <Button
                  colorScheme="blue"
                  rightIcon={<GiTakeMyMoney />}
                  onClick={handleGoToCheckout}
                  isDisabled={isEmptyList}
                  size="lg"
                >
                  Checkout
                </Button>
              )}
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
