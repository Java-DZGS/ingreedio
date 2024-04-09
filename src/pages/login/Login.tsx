import React, { ReactElement, useEffect, useState } from 'react';
import './Login.scss';
import { Button, FormControl } from '@chakra-ui/react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input/Input';
import { ROUTES } from '../../routes/routes';
import actions from '../../store/actions';
import { RootState } from '../../store/reducers';

const Login = (): ReactElement => {
  // Navigate hook
  const navigate = useNavigate();
  // Sign in hook
  const signIn = useSignIn();

  const dispatch = useDispatch();
  const {
    loginSuccessful,
    accessToken,
    buttonLoading,
  } = useSelector((state: RootState) => state.auth);

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (!loggingIn || loginSuccessful == null) return;

    if (loginSuccessful) {
      signIn({
        auth: {
          token: accessToken,
        },
        userState: { name: username },
        // todo: refresh tokens
        // refresh: refreshToken,
      });

      navigate(ROUTES.HOME);
    } else {
      // todo: proper error message
      alert('Login unsuccessful');
    }

    setLoggingIn(false);
    dispatch(actions.endAuthAction());
  }, [loginSuccessful]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoggingIn(true);
    dispatch(actions.signInRequest(username, password));

    // Prevent from page reload
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
                minLength={6}
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
