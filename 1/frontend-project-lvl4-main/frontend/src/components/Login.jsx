import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import routes from '../routes';

import { useAuth } from '../hooks/index.js';
import { useTranslation } from 'react-i18next';
import loginImg from '../assets/images/login.png';

const Login = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const LoginSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn(res.data);
        const { from } = location.state || {
          from: { pathname: routes.chatRoomPath() },
        };
        navigate(from);
      } catch (err) {
        if (!err.isAxiosError) {
          console.log(t('errors.unknown'));
          return;
        }

        if (err.response?.status === 401) {
          setAuthFailed(true);
        } else {
          console.log(t('errors.network'));
        }
      }
    },
  });

  const inputFieldClass = cn('mb-4', {
    'is-invalid': authFailed,
  });

  return (
    <section className="login-main d-flex align-items-center flex-fill">
      <MDBContainer breakpoint="md">
        <MDBRow>
          <MDBCol center className="d-flex justify-content-center">
            <MDBCard className="rounded-3 shadow-2 border min-vw-75">
              <MDBCardHeader className="display-6 text-center">
                {t('login.title')}
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    className="d-flex justify-content-center mb-4 mt-4"
                    size={6}
                  >
                    <img
                      src={loginImg}
                      className="img-fluid w-75"
                      alt="login"
                    />
                  </MDBCol>
                  <MDBCol center size={6}>
                    <form onSubmit={formik.handleSubmit}>
                      <MDBInput
                        className={inputFieldClass}
                        type="text"
                        id="username"
                        label={t('login.username')}
                        size="lg"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        autoComplete="username"
                      />
                      <MDBInput
                        className={inputFieldClass}
                        type="password"
                        id="password"
                        label={t('login.password')}
                        size="lg"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        autoComplete="password"
                      />
                      <MDBBtn size="lg" type="submit" className="mt-4" block>
                        {t('login.submit')}
                      </MDBBtn>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
              <MDBCardFooter className="text-center">
              {`${t('login.newToChat')} `}
                <Link to={routes.signupPagePath()}>{t('login.signup')}</Link>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Login;
