import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

const useCheckForcefulLogout = (): void => {
  const toast = useToast();
  const forcedLogout = localStorage.getItem('forcefullyLoggedOut');

  useEffect(() => {
    if (forcedLogout === 'true') {
      toast({
        title: 'You were logged out',
        description: 'An error occured. Please try logging in again',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      localStorage.removeItem('forcefullyLoggedOut');
    }
  }, [forcedLogout]);
};

export default useCheckForcefulLogout;
