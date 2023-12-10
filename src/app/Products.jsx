import { useShoes } from '@hooks/queries/useShoes';
import Product from './Product';
import { Spinner, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';

const Products = () => {
  const { data = [], isLoading } = useShoes();

  if (isLoading) {
    return (
      <Stack pt={14} alignItems="center">
        <Spinner size="lg" />
        <Text fontSize="small" color="gray.700">
          Fetching your products, hang in there...
        </Text>
      </Stack>
    );
  }

  return (
    <Wrap spacing="32px">
      {data.map((product) => (
        <WrapItem
          key={product.id}
          borderWidth={1}
          borderRadius="md"
          boxShadow="sm"
        >
          <Product {...product} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Products;
