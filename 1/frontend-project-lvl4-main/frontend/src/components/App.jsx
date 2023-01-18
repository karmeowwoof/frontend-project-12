import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useAuth } from '../hooks/index.js';
import { AuthContext } from '../hooks/index.js';
import routes from '../routes.js';

/* components */

import Login from './Login.jsx';
import ChatRoom from './ChatRoom.jsx';
import Signup from './Signup.jsx';
import NotFound from './NotFound.jsx';
import Header from './Header.jsx';

/* AuthProvider */

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null
  );
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        getAuthHeader,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

/* App */

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path={routes.chatRoomPath()} element={<PrivateOutlet />}>
              <Route path={routes.chatRoomPath()} element={<ChatRoom />} />
            </Route>
            <Route path={routes.loginPagePath()} element={<Login />} />
            <Route path={routes.signupPagePath()} element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
