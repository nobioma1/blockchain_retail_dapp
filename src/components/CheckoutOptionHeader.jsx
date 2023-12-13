import { AccordionButton, Radio, Stack, Tag, TagLabel } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CheckoutOptionHeader = ({ title, value, tag }) => {
  return (
    <AccordionButton height="60px">
      <Stack>
        <Radio value={value} size="lg">
          {title}
          {tag && (
            <Tag
              ml={3}
              borderRadius="full"
              variant="solid"
              colorScheme="orange"
            >
              <TagLabel fontWeight="bold">{tag}</TagLabel>
            </Tag>
          )}
        </Radio>
      </Stack>
    </AccordionButton>
  );
};

CheckoutOptionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  tag: PropTypes.string,
};

export default CheckoutOptionHeader;
