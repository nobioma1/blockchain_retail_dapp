import { useMemo, useState } from 'react';
import {
  Accordion,
  Box,
  Button,
  Flex,
  Heading,
  RadioGroup,
  ScaleFade,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BsShop } from 'react-icons/bs';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

import { useCart } from '@hooks/useCart';
import CartSummary from '@components/CartSummary';
import CheckoutEthPayment from '@components/CheckoutEthPayment';
import CheckoutStripePayment from '@components/CheckoutStripePayment';

const STEPS = [
  { title: 'Shopping Cart' },
  { title: 'Checkout' },
  { title: 'Finish' },
];

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(0);
  const navigate = useNavigate();
  const { shoppingCart } = useCart();
  const [searchParams] = useSearchParams();
  const { activeStep } = useSteps({
    index: 1,
    count: STEPS.length,
  });

  const handleOnContinueShopping = () => {
    navigate('/');
  };

  const continueShoppingButton = (
    <Button
      variant="outline"
      onClick={handleOnContinueShopping}
      leftIcon={<BsShop />}
    >
      Continue Shopping
    </Button>
  );

  const totalCost = useMemo(() => {
    return shoppingCart.reduce((acc, curr) => {
      const total = acc + curr.total;
      return total;
    }, 0);
  }, [shoppingCart]);

  if (searchParams.get('status') === 'complete') {
    return (
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        pt={10}
      >
        <ScaleFade initialScale={0.9} in={true}>
          <Stack alignItems="center" spacing={3}>
            <IoIosCheckmarkCircleOutline size={150} color="green" />
            <Text fontSize="xl" fontWeight="bold">
              Order Complete
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Thank you for shopping with us!!
            </Text>

            {continueShoppingButton}
          </Stack>
        </ScaleFade>
      </Flex>
    );
  }

  if (shoppingCart.length === 0) {
    return (
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        pt={10}
      >
        <Box mb={8}>
          <Heading fontSize="xl" textAlign="center">
            You&apos;ve not added any item to cart
          </Heading>
          <Text textAlign="center">
            To checkout, go back to store and continue shopping and select an
            item.
          </Text>
        </Box>
        {continueShoppingButton}
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" maxWidth="1280px" margin="0 auto">
      <Stack pt={5} px={3} spacing={8}>
        <Box maxWidth="580px">
          <Stepper index={activeStep}>
            {STEPS.map((step) => (
              <Step key={step.title}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
        <Flex justifyContent="space-between" gap={28}>
          <Stack spacing={5} flex={1}>
            <Text fontSize="xl" fontWeight="semibold">
              Payment Methods
            </Text>
            <Accordion onChange={setPaymentMethod}>
              <RadioGroup value={paymentMethod}>
                <CheckoutEthPayment paymentCharge={totalCost} />
                <CheckoutStripePayment
                  currency="eur"
                  paymentCharge={totalCost}
                  isSelected={paymentMethod === 1}
                />
              </RadioGroup>
            </Accordion>
          </Stack>
          <CartSummary totalCost={totalCost} />
        </Flex>
      </Stack>
    </Flex>
  );
};

export default CheckoutPage;
