import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectAllUsers } from '../users/usersApiSlice';

import { selectServicesById } from './ServicesApiSlice';
import EditServiceForm from './EditNewService';

const EditService = () => {
  const { id } = useParams();

  const service = useSelector((state) =>
    selectServicesById(state, id)
  );
  const users = useSelector(selectAllUsers);

  const content =
    service && users ? (
      <EditServiceForm service={service} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditService;

// import { useSelector } from 'react-redux';
// import { selectServiceById } from './ServicesApiSlice';
// import { selectAllUsers } from '../users/usersApiSlice';
// import EditServiceForm from './EditServiceForm';

// const EditService = () => {
//   // Assuming you have stored the user ID in the Redux store under 'userId' field
//   const userId = useSelector((state) => state.user.userId);

//   // Now you can use 'userId' in your operations or API calls as needed

//   // Rest of the code remains unchanged
//   const { id } = useParams();
//   const service = useSelector((state) => selectServiceById(state, id));
//   const users = useSelector(selectAllUsers);

//   const content =
//     service && users ? (
//       <EditServiceForm service={service} users={users} />
//     ) : (
//       <p>Loading...</p>
//     );

//   return content;
// };

// export default EditService;
