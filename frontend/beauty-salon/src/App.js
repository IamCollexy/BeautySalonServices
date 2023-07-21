import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Public from './component/Public';
import Login from './component/Login';
import DashLayout from './component/DashLayout';
import Welcome from './features/auth/Welcome';
import ServiceList from './features/Services/ServiceList';
import UserList from './features/users/UserList';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dashboard" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="services">
            <Route index element={<ServiceList />} />
          </Route>
          <Route path="users">
            <Route index element={<UserList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
