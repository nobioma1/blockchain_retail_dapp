import { AccordionButton, Radio, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CheckoutOptionHeader = ({ title, value }) => {
  return (
    <AccordionButton height="60px">
      <Stack>
        <Radio value={value} size="lg">
          {title}
        </Radio>
      </Stack>
    </AccordionButton>
  );
};

CheckoutOptionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default CheckoutOptionHeader;
