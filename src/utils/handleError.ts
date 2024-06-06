import { AxiosError } from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

export const handleError = (error: unknown, errorTitle: string): void => {
  let errorMessage = 'An unexpected error occurred. Please try again.';
  if (error instanceof AxiosError) {
    errorMessage = error.response?.data.detail;
  }
  toast({
    title: `${errorTitle} Please try again.`,
    description: errorMessage,
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
};
