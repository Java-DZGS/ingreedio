import React, { useState } from "react";
import "./Login.scss";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sign in hook
  const signIn = useSignIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: get token from backend, put the following lines to .then()
    signIn({
      auth: {
        // TODO: insert the token here
        token: "<jwt token>",
      },
      userState: { name: "user", uuid: 123456 },
    });
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
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" type="submit">
              Sign in
            </Button>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default Login;
