import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks';
import routes from '../routes';

import avatar from '../assets/avatar_1.jpg';

const RegistrationPage = () => {
  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('signup.required'))
      .min(3, t('signup.usernameConstraints'))
      .max(20, t('signup.usernameConstraints')),
    password: yup
      .string()
      .trim()
      .required(t('signup.required'))
      .min(6, t('signup.passMin')),
    confirmPassword: yup
      .string()
      .required(t('signup.required'))
      .oneOf([yup.ref('password')], t('signup.mustMatch')),
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
        const response = await axios.post(routes.signupPath(), {
          username: values.username,
          password: values.password,
        });
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        console.log(err);
        if (err.isAxiosError) {
          if (err.response.status === 409) {
            setRegistrationFailed(true);
            inputRef.current.select();
          } else {
            toast.error(t('errors.network'));
          }
        } else {
          toast.error(t('errors.unknown'));
          throw err;
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={avatar}
                  className="rounded-circle"
                  alt={t('signup.header')}
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={t('signup.usernameConstraints')}
                    name='username'
                    id='username'
                    autoComplete='username'
                    isInvalid={
                      (formik.errors.username && formik.touched.username) || registrationFailed
                    }
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor='username'>
                    {t('signup.username')}
                  </Form.Label>
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.username || t('signup.alreadyExists')}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type="password"
                    placeholder={t('signup.passwordConstraints')}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    isInvalid={
                      formik.errors.password && formik.touched.password
                    }
                    required
                  />
                  <Form.Label htmlFor="password">
                    {t('signup.password')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    type="password"
                    placeholder={t('signup.confirm')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    isInvalid={
                      formik.errors.confirmPassword && formik.touched.confirmPassword
                    }
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">
                    {t('signup.confirm')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  className="btn-block"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('signup.submit')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
