import PropTypes from 'prop-types';
import { Button, HStack, Text } from '@chakra-ui/react';

const QtyButton = ({ qty, increment, decrement }) => {
  return (
    <HStack spacing={4}>
      <Button
        width="40px"
        variant="outline"
        isDisabled={qty < 2}
        onClick={decrement}
      >
        -
      </Button>
      <Text>{qty}</Text>
      <Button width="40px" variant="outline" onClick={increment}>
        +
      </Button>
    </HStack>
  );
};

QtyButton.propTypes = {
  qty: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
};

export default QtyButton;
