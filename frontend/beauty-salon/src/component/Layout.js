import { Outlet } from 'react-router-dom';

import React from 'react';

// For all components that would show in all routes, private or Public
const Layout = () => {
  return <Outlet />;
};

export default Layout;
