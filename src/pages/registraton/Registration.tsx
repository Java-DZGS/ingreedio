import React, { ReactElement, useEffect, useState } from 'react';
import './Registration.scss';
import { Button, FormControl, FormHelperText } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/Input/Input';
import { ROUTES } from '../../routes/routes';
import actions from '../../store/actions';
import { IRootState } from '../..';

const Registration = (): ReactElement => {
  // Navigate hook
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    signupSuccessful,
    buttonLoading,
  } = useSelector((state: IRootState) => state.auth);

  // States
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);

  useEffect(() => {
    if (!signingUp) return;

    if (signupSuccessful) {
      navigate(ROUTES.LOGIN);
    } else {
      // todo: proper error message
      alert('Sign up unsuccessful');
    }
    setSigningUp(false);
  }, [signupSuccessful]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setSigningUp(true);
    dispatch(actions.signUpRequest(username, displayName, email, password));

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
          <div className="displayname-container">
            <FormControl id="displayname">
              <Input
                label="Display name"
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </FormControl>
          </div>
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
            isLoading={buttonLoading}
          >
            Sign up
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
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Log in to an existing account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
