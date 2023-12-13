import {
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import { useWeb3 } from '@hooks/useWeb3';
import { displayWalletAddress } from '@/utils';
import CheckoutOptionHeader from './CheckoutOptionHeader';

const CheckoutEthPayment = ({ paymentCharge }) => {
  const { account, isConnected } = useWeb3();

  return (
    <AccordionItem isDisabled={!isConnected}>
      <CheckoutOptionHeader title="Pay using your Metamask Wallet" value={0} />
      {isConnected && (
        <AccordionPanel pb={4}>
          <Stack spacing={3}>
            <Flex>
              <Text mr={3}>
                Connected Wallet Address:{' '}
                <Text as="span" fontSize="lg" fontWeight="semibold">
                  {displayWalletAddress(account)}
                </Text>
              </Text>
            </Flex>

            <Button size="lg" height="50px" colorScheme="gray">
              Pay now with Wallet
            </Button>
          </Stack>
        </AccordionPanel>
      )}
    </AccordionItem>
  );
};

CheckoutEthPayment.propTypes = {
  paymentCharge: PropTypes.number.isRequired,
};

export default CheckoutEthPayment;
