import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { ROUTES } from './routes/routes';

function App(): ReactElement {
  return (
    <div className="app">
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
