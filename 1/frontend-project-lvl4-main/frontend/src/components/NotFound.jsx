import React from "react";
import { Link } from "react-router-dom";
// import notFound from "../assets/images/notFound";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      {/* <img src={notFound} /> */}
      <p style={{ textAlign: "center" }}>
        <Link to="/">{t('notFound.linkText')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
