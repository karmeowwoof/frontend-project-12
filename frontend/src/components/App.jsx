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
import axios from 'axios';
import routes from '../routes.js';


import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

import AuthProvider from '../contexts/AuthProvider.jsx';
import { AuthContext } from '../contexts/index.js';

const PrivateOutlet = () => {
  const auth = useContext(AuthContext);

  const serverPingInterval = 5000; 

const checkServerConnection = () => {
  
  axios.get('/')
    .then(() => {
    })
    .catch(() => {
      auth.logOut()
    });
};

setInterval(checkServerConnection, serverPingInterval);

  return auth.user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
<AuthProvider>
<BrowserRouter>
<div className="d-flex flex-column h-100">
<Header />
<Routes>
<Route path={routes.mainPagePath()} element={<PrivateOutlet />}>
<Route path={routes.mainPagePath()} element={<MainPage />} />
</Route>
<Route path={routes.loginPagePath()} element={<LoginPage />} />
<Route path={routes.signupPagePath()} element={<RegistrationPage />} />
<Route path="*" element={<NotFoundPage />} />
</Routes>
</div>
<ToastContainer />
</BrowserRouter>
</AuthProvider>
);

export default App;