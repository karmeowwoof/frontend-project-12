import React from 'react';
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import { useTranslation } from 'react-i18next';

const Modal = (props) => {
  const { toggleShow, show, setShow } = props;
  const { t } = useTranslation();

  return (
    <MDBModal tabIndex="-1" show={show} setShow={setShow}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{t('modal.title')}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput
              label={t('modal.label')}
              id="typeText"
              type="text"
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleShow}>
              {t('modal.close')}
            </MDBBtn>
            <MDBBtn>{t('modal.submit')}</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default Modal;
