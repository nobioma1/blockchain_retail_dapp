import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { createContext, useCallback, useMemo, useState } from 'react';

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const getItemTotal = (cartItem, product, id = nanoid()) => {
    return {
      id,
      cartItem,
      product,
      total: cartItem.qty * product.price,
    };
  };

  const addToCart = useCallback((product, cartItem) => {
    setShoppingCart((items) => [...items, getItemTotal(cartItem, product)]);
  }, []);

  const removeFromCart = useCallback(
    (itemId) => {
      setShoppingCart(() => {
        return shoppingCart.filter((item) => item.id !== itemId);
      });
    },
    [shoppingCart]
  );

  const cartItemQty = useCallback(
    (itemId, operator) => {
      const newItems = [...shoppingCart];
      let itemIdx = newItems.findIndex((item) => item.id === itemId);

      const updated = {
        ...newItems[itemIdx],
        cartItem: {
          ...newItems[itemIdx].cartItem,
          qty:
            operator === 'SUBTR'
              ? newItems[itemIdx].cartItem.qty - 1
              : newItems[itemIdx].cartItem.qty + 1,
        },
      };

      newItems[itemIdx] = getItemTotal(
        updated.cartItem,
        updated.product,
        updated.id
      );

      setShoppingCart(newItems);
    },
    [shoppingCart]
  );

  const value = useMemo(
    () => ({
      shoppingCart,
      addToCart,
      removeFromCart,
      clearCart: () => setShoppingCart([]),
      decreaseQty: (itemId) => cartItemQty(itemId, 'SUBTR'),
      increaseQty: (itemId) => cartItemQty(itemId, 'ADD'),
    }),
    [shoppingCart, addToCart, removeFromCart, cartItemQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
