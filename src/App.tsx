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

function App(): ReactElement {
  return (
    <div className="app">
      <Header />
      <div className="screen">
        <Routes>
          <Route index element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTRATION} element={<Registration />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.PRODUCTS} element={<ProductList />} />
          <Route path={ROUTES.PRODUCT} element={<ProductDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
