import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from 'react-auth-kit/AuthProvider';
import createStore from 'react-auth-kit/createStore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

interface IUserData {
  uid: string;
}

export type IRootState = ReturnType<typeof store.getState>

const authStore = createStore<IUserData>({
  authName: '_auth',
  authType: 'localstorage',
  // todo: refresh tokens
  // refresh: refresh,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    {/* AuthProvider should wrap the BrowserRouter or HashRouter,
    otherwise PrivateRoute will not work and throw an error. */}
    <AuthProvider store={authStore}>
      <Provider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
);
