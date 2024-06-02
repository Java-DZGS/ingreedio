import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { ROUTES } from './routes/routes';
import './App.scss';
import Header from './components/Header';
import Registration from './pages/registraton/Registration';
import Profile from './pages/profile/Profile';
import ProductList from './pages/product_list/ProductList';
import ProductDetails from './pages/product_details/ProductDetails';
import useLoginAutomatically from './hooks/useLoginAutomatically';
import { LoginState, ProtectedRoute } from './routes/ProtectedRoute';
import useCheckForcefulLogout from './hooks/useCheckForcefulLogout';

function App(): ReactElement {
  useLoginAutomatically();
  useCheckForcefulLogout();

  return (
    <div className="app">
      <Header />
      <div className="screen">
        <Routes>
          <Route index element={<Home />} />
          <Route
            path={ROUTES.LOGIN}
            element={(
              <ProtectedRoute expectedLoginState={LoginState.LOGGED_OUT}>
                <Login />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.REGISTRATION}
            element={(
              <ProtectedRoute expectedLoginState={LoginState.LOGGED_OUT}>
                <Registration />
              </ProtectedRoute>
            )}
          />
          <Route
            path={ROUTES.PROFILE}
            element={(
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )}
          />
          <Route path={ROUTES.PRODUCTS} element={<ProductList />} />
          <Route path={ROUTES.PRODUCT} element={<ProductDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
