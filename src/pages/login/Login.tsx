import React, { ReactElement, useEffect, useState } from 'react';
import './Login.scss';
import { Button, FormControl, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input/Input';
import { ROUTES } from '../../routes/routes';
import actions from '../../store/actions';
import { RootState } from '../../store/reducers';

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    loginSuccessful,
    accessToken,
    refreshToken,
    buttonLoading,
    errorCode,
  } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (!loggingIn || loginSuccessful == null) return;

    if (loginSuccessful) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);
      navigate(ROUTES.HOME);
    } else {
      let errorMessage;
      switch (errorCode) {
        case 401:
          errorMessage = 'Invalid username or password. Please try again.';
          break;
        case errorCode && errorCode >= 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again.';
      }

      toast({
        title: 'Login unsuccessful',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setLoggingIn(false);
    dispatch(actions.endAuthAction());
  }, [loginSuccessful]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoggingIn(true);
    dispatch(actions.signInRequest(username, password));

    e.preventDefault();
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="username-container">
            <FormControl id="username">
              <Input
                label="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
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
                required
              />
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
            isLoading={buttonLoading}
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
