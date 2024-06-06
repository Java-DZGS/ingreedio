import { AxiosError } from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const handleError = (errorTitle: string): void => {
  toast({
    title: `${errorTitle} :(`,
    description: 'Please try again. :)',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
};
