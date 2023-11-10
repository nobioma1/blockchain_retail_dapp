import { useToast as useChakraToast } from '@chakra-ui/toast';

export const useToast = (options = {}) => {
  const toast = useChakraToast();

  const OPTIONS = {
    duration: 5000,
    position: 'top-right',
    ...options,
  };

  return (status, { title, description }) =>
    toast({
      status,
      title,
      description,
      ...OPTIONS,
    });
};
