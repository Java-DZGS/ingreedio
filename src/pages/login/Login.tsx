import React, { ReactElement, useState } from 'react';
import './Login.scss';
import { Button, FormControl, FormHelperText } from '@chakra-ui/react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { ROUTES } from '../../routes/routes';

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

      navigate(ROUTES.HOME);
    }, 500);
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="email-container">
            <FormControl id="email">
              <Input
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
          </div>
          <div className="password-container">
            <FormControl id="password">
              <Input
                type="password"
                label="Password"
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
          </div>
          <Button
            style={{
              borderRadius: 20,
              paddingRight: 25,
              paddingLeft: 25,
              fontSize: 18,
              marginTop: 10,
              marginBottom: 10,
            }}
            colorScheme="green"
            type="submit"
            isLoading={loading}
          >
            Log in
          </Button>
          <p>or</p>
          <div>
            <Button
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
              colorScheme="green"
              variant="link"
              onClick={() => navigate(ROUTES.REGISTRATION)}
            >
              Create new account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
