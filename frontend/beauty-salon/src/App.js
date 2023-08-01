import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Public from './component/Public';
import Login from './component/Login';
import DashLayout from './component/DashLayout';
import Welcome from './features/auth/Welcome';
import ServiceList from './features/services/ServiceList';
import UserList from './features/users/UserList';
import EditUser from './features/users/EditUser';
import NewUserForm from './features/users/NewUserForm';
import EditService from './features/services/EditService';
import NewService from './features/services/NewService';
import Prefetch from './features/auth/Prefetch';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route element={<Prefetch />}>
          <Route path="dashboard" element={<DashLayout />}>
            <Route index element={<Welcome />} />
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>
            <Route path="services">
              <Route index element={<ServiceList />} />
              <Route path=":id" element={<EditService />} />
              <Route path="new" element={<NewService />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
