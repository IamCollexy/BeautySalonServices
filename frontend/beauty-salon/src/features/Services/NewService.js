import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersApiSlice';
import NewServiceForm from './NewServiceForm';

const NewService = () => {
  const users = useSelector(selectAllUsers);

  const content = users ? (
    <NewServiceForm users={users} />
  ) : (
    <p>Loading...</p>
  );

  return content;
};
export default NewService;
