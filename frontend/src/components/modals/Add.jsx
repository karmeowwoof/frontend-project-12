import React, { useEffect, useRef, useContext } from 'react';
import * as yup from 'yup';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';

import { ApiContext } from '../../contexts/index.js';

import { getAllChannels } from '../../slices/selectors';

import { actions as modalsActions } from '../../slices/modalsSlice';

const Add = () => {
  const dispatch = useDispatch();
  const inputEl = useRef();
  const chat = useContext(ApiContext);
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const channels = useSelector(getAllChannels);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('modalAdd.channelConstraints'))
      .max(20, t('modalAdd.channelConstraints'))
      .notOneOf(
        channels.map((channel) => channel.name),
        t('modalAdd.unique'),
      )
      .required(t('modalAdd.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const cleanedName = leoProfanity.clean(values.name);
      chat.addNewChannel({ name: cleanedName });
      toast.success(t('modalAdd.success'));
      dispatch(modalsActions.hideModal());
    },
  });

  return (
    <Modal show centered>
      <Modal.Header
        closeButton
        onHide={() => dispatch(modalsActions.hideModal())}
      >
        <Modal.Title>{t('modalAdd.addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className="mb-2"
            onChange={formik.handleChange}
            ref={inputEl}
            id="name"
            name="name"
            value={formik.values.name}
            isInvalid={formik.errors.name && formik.touched.name}
          />
          <Form.Label htmlFor="name" className="visually-hidden">
            {t('modalAdd.name')}
          </Form.Label>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              onClick={() => dispatch(modalsActions.hideModal())}
            >
              {t('modalAdd.cancel')}
            </Button>
            <Button type="submit" variant="primary">
              {t('modalAdd.send')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default Add;
