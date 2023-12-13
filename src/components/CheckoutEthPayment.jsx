import {
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import coinlayer from '@apis/coinlayer';
import { useWeb3 } from '@hooks/useWeb3';
import { useCart } from '@hooks/useCart';
import { displayWalletAddress } from '@/utils';
import { useToast } from '@hooks/useToast';
import CheckoutOptionHeader from './CheckoutOptionHeader';

const CheckoutEthPayment = ({ paymentCharge }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('idle');
  const { account, isConnected, withdrawFromAccount } = useWeb3();

  const getDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // get historical data for conversion - limited by current coinlayer plan
  const { data } = useQuery({
    queryKey: ['EUR/ETH'],
    queryFn: async () => {
      const res = await coinlayer.get(`/${getDate()}`, {
        params: {
          target: 'EUR',
          symbols: 'ETH',
          amount: paymentCharge,
        },
      });
      return res.data;
    },
  });

  const promoRate = 99.9999;
  const ethRate = data?.rates.ETH ?? 0;
  const originalPrice = ethRate * paymentCharge;
  const discountAmount = (originalPrice * promoRate) / 100;
  const discountedPrice = originalPrice - discountAmount;

  const handlePay = async () => {
    setStatus('isLoading');
    try {
      await withdrawFromAccount(discountedPrice);
      clearCart();
      navigate('/checkout?status=complete', { replace: true });
    } catch (error) {
      setStatus('isError');
      toast('error', {
        title: 'Error Processing Wallet Transactions',
        description: error.message,
      });
    }
  };

  return (
    <AccordionItem isDisabled={!isConnected}>
      <CheckoutOptionHeader
        tag={`${promoRate}% OFF`}
        title="Pay using your Metamask Wallet"
        value={0}
      />
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

            {ethRate && (
              <>
                <Text>Rate: {ethRate} ETH</Text>
                <Text>
                  Amount:{' '}
                  <Text
                    fontWeight="semibold"
                    as="span"
                    textDecoration="line-through"
                  >
                    {originalPrice} ETH
                  </Text>
                </Text>
                <Text>
                  Amount to Pay:{' '}
                  <Text fontWeight="semibold" as="span">
                    {discountedPrice} ETH
                  </Text>
                </Text>
              </>
            )}

            <Button
              size="lg"
              height="50px"
              colorScheme="gray"
              onClick={handlePay}
              isLoading={status === 'isLoading'}
              isDisabled={status === 'isLoading'}
            >
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
