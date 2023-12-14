import { IoMdClose } from 'react-icons/io';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import QtyButton from '@/components/QtyButton';
import { useCart } from '@hooks/useCart';
import { displayPrice } from '../utils';

const CartList = () => {
  const { shoppingCart, decreaseQty, increaseQty, removeFromCart } = useCart();

  return (
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
            {shoppingCart?.map((item) => (
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
  );
};

export default CartList;
