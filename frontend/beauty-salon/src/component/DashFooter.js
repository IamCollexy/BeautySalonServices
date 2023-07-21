import React from 'react';
import { FaHouseUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const DashFooter = () => {
  const navigate = useNavigate();

  const { pathName } = useLocation();

  const onGoHomeClicked = () => navigate('/dashboard');

  let goHomeButton = null;
  if (pathName !== '/dashboard') {
    goHomeButton = (
      <button
        className="dashboard-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FaHouseUser />
      </button>
    );
  }
  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );

  return content;
};

export default DashFooter;
