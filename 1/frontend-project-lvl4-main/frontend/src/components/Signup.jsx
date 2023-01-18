import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBCardHeader,
} from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import routes from '../routes';
import signupImg from '../assets/images/signup.png';
import { useAuth } from '../hooks/index.js';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required(t('signup.required'))
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints')),
    password: Yup.string()
      .trim()
      .required(t('signup.required'))
      .min(6, t('signup.passMin')),
    confirmPassword: Yup.string().test(
      'confirmPassword',
      t('signup.mustMatch'),
      (value, context) => value === context.parent.password
    ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);

      try {
        const res = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        });
        auth.logIn(res.data);
        navigate(routes.chatRoomPath());
      } catch (err) {
        if (!err.isAxiosError) {
          throw err;
        }

        if (err.response.status === 409) {
          setRegistrationFailed(true);
          return;
        }

        throw err;
      }
    },
  });

  const isInvalidField = (field) =>
    (formik.errors[field] && formik.touched[field]) || registrationFailed;

  const UsernameClass = cn('mb-4', {
    'is-invalid': isInvalidField('username'),
  });

  const PasswordClass = cn('mb-4', {
    'is-invalid': isInvalidField('password'),
  });

  const ConfirmPasswordClass = cn('mb-4', {
    'is-invalid': isInvalidField('confirmPassword'),
  });

  return (
    <section className="signup-main d-flex align-items-center flex-fill">
      <MDBContainer breakpoint="md">
        <MDBRow>
          <MDBCol center className="d-flex justify-content-center">
            <MDBCard className="rounded-3 shadow-2 border min-vw-75">
              <MDBCardHeader className="display-6 text-center">
                {t('signup.title')}
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol
                    className="d-flex justify-content-center mb-4 mt-4"
                    size={6}
                  >
                    <img
                      src={signupImg}
                      className="img-fluid w-75"
                      alt="login"
                    />
                  </MDBCol>
                  <MDBCol center size={6}>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="position-relative">
                        <MDBInput
                          className={UsernameClass}
                          type="text"
                          id="username"
                          label={t('signup.username')}
                          size="lg"
                          name="username"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.username}
                          autoComplete="username"
                          required
                        />
                        {isInvalidField('username') && (
                          <span
                            className="invalid-tooltip"
                            style={{ display: 'block' }}
                          >
                            {t(formik.errors.username)}
                          </span>
                        )}
                      </div>
                      <MDBInput
                        className={PasswordClass}
                        type="password"
                        id="password"
                        label={t('signup.password')}
                        size="lg"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        autoComplete="password"
                        required
                      />
                      <MDBInput
                        className={ConfirmPasswordClass}
                        type="password"
                        id="confirmPassword"
                        label={t('signup.confirmPassword')}
                        size="lg"
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        autoComplete="confirmPassword"
                      />
                      <MDBBtn size="lg" type="submit" className="mt-4" block>
                        {t('signup.submit')}
                      </MDBBtn>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Signup;
