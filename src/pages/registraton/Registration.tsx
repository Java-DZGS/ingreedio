import React, { ReactElement, useState } from 'react';
import './Registration.scss';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';

const Registration = (): ReactElement => {
  // Navigate hook
  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent from page reload
    e.preventDefault();
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
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
