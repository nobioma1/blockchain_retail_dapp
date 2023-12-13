import { useEffect, useState } from 'react';
import { AccordionItem, AccordionPanel, Button, Stack } from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';

import backendApi from '@apis/api';
import { useToast } from '@hooks/useToast';
import CheckoutOptionHeader from './CheckoutOptionHeader';

const env = import.meta.env;

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const toast = useToast();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error: elSubmitErr } = await elements.submit();
    if (elSubmitErr?.message) {
      toast('error', {
        title: 'Card Payment Error',
        description: elSubmitErr.message,
      });
      return;
    }

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?status=complete`,
        },
      });

      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      toast('error', {
        title: 'Card Payment Error',
        description: error.message,
      });
      return;
    }
  };

  return (
    <Stack as="form" onSubmit={onFormSubmit} spacing={3}>
      <PaymentElement />
      <Button
        type="submit"
        size="lg"
        height="50px"
        colorScheme="gray"
        isDisabled={!stripe || !elements}
      >
        Make Payment
      </Button>
    </Stack>
  );
};

const stripePromise = loadStripe(env.VITE_STRIPE_PUB_KEY);

const CheckoutStripePayment = ({ paymentCharge, currency, isSelected }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (!isSelected) return;

    const getClientSecret = async () => {
      const res = await backendApi.post('/stripe-processor', {
        currency,
        amount: paymentCharge,
        paymentMethodType: 'card',
      });
      setClientSecret(res.data['client_secret']);
    };

    getClientSecret();
  }, [currency, paymentCharge, isSelected]);

  return (
    <AccordionItem>
      <CheckoutOptionHeader title="Pay with Credit or Debit card" value={1} />
      {clientSecret && (
        <AccordionPanel pb={4}>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeCheckoutForm />
          </Elements>
        </AccordionPanel>
      )}
    </AccordionItem>
  );
};

CheckoutStripePayment.propTypes = {
  paymentCharge: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  isSelected: PropTypes.string.isRequired,
};

export default CheckoutStripePayment;
