import React from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBContainer,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';

import { useAuth } from '../hooks/index.js';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();
  const { logOut, user } = useAuth();
  return (
    <MDBNavbar expand="lg" dark bgColor="dark">
      <MDBContainer breakpoint="lg">
        <MDBNavbarBrand tag="span" className="mb-0 h1">
          <MDBIcon fas icon="comments" size="sm" className="me-2" />
             {t('header.name')}
        </MDBNavbarBrand>
        {!!user && (
          <MDBBtn onClick={() => logOut()} color="primary">
            {t('header.logout')}
          </MDBBtn>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
