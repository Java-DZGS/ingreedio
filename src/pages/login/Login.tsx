import React, { ReactElement, useState } from 'react';
import './Login.scss';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';

const Login = (): ReactElement => {
  // Navigate hook
  const navigate = useNavigate();
  // Sign in hook
  const signIn = useSignIn();

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Password regex

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent from page reload
    e.preventDefault();

    // Set loading button
    setLoading(true);

    // TODO: get token from the backend and replace this timeout
    setTimeout(() => {
      setLoading(false);

      signIn({
        auth: {
          // TODO: insert the token here
          token: '<jwt token>',
        },
        userState: { name: 'user', uuid: 123456 },
      });

      navigate('/');
    }, 500);
  };

  return (
    <div className="login-page">
      <Box
        w="full"
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        p="6"
        boxShadow="md"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing="4">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                pattern="\D*\d+\D*"
                required
              />
              <FormHelperText>
                Password must be at least 6 characters long and contain at least
                1 digit.
              </FormHelperText>
            </FormControl>
            <Button colorScheme="blue" type="submit" isLoading={loading}>
              Sign in
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default Login;
