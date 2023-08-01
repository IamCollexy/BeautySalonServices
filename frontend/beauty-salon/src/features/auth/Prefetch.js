import { store } from '../../app/store';
import { userApiSlice } from '../users/usersApiSlice';
import { serviceApiSlice } from '../services/ServicesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing');
    const service = store.dispatch(
      serviceApiSlice.endpoints.getServices.initiate()
    );
    const users = store.dispatch(
      userApiSlice.endpoints.getUsers.initiate()
    );

    return () => {
      console.log('unsubscribing');
      service.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
