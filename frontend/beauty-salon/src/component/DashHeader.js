import React from 'react';
import { Link } from 'react-router-dom';

const DashHeader = () => {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dash/services" />
        <nav className="dash-header__nav">
          <a href="home">Home</a>
          <a href="services">Services</a>
          <a href="contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;
