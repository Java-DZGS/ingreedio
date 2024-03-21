import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

interface IUserData {
  uid: string;
}

const store = createStore<IUserData>({
  authName: '_auth',
  authType: 'localstorage',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    {/* AuthProvider should wrap the BrowserRouter or HashRouter,
    otherwise PrivateRoute will not work and throw an error. */}
    <AuthProvider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
);
