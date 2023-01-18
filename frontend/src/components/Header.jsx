import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
    <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
    {auth.user ? (
    <Link to="/" onClick={auth.logOut}>
    {t('logout')}
    </Link>
    ) : null}
    </Container>
    </Navbar>
  );
};

export default Header;
