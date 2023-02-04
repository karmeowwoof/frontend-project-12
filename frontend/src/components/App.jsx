/*eslint-disable*/
import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

import AuthProvider from '../contexts/AuthProvider.jsx';
import { AuthContext } from '../contexts/index.js';

const PrivateOutlet = () => {
  const auth = useContext(AuthContext);

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
<AuthProvider>
<BrowserRouter>
<div className="d-flex flex-column h-100">
<Header />
<Routes>
<Route path="/" element={<PrivateOutlet />}>
<Route path="" element={<MainPage />} />
</Route>
<Route path="/login" element={<LoginPage />} />
<Route path="/signup" element={<RegistrationPage />} />
<Route path="*" element={<NotFoundPage />} />
</Routes>
</div>
<ToastContainer />
</BrowserRouter>
</AuthProvider>
);

export default App;
