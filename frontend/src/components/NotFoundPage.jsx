import React from 'react';
import { useTranslation } from 'react-i18next';

import notFoundPic from '../assets/404.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column align-items-center">
      <img src={notFoundPic} alt={t('notFound.alt')} className="img-fluid h-25" />
      <h1 className="text-center text-muted mt-3 mb-0">{t('notFound.header')}</h1>
      <p className="text-center text-muted">
        {t('notFound.message')}
        <a href="/" className="text-muted">{t('notFound.linkText')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
