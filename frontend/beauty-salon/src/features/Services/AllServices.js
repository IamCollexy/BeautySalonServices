import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectServicesById } from './ServicesApiSlice';
import { FaPenSquare } from 'react-icons/fa';

const AllServices = ({ serviceId }) => {
  const service = useSelector((state) =>
    selectServicesById(state, serviceId)
  );

  const navigate = useNavigate();

  if (service) {
    const created = new Date(service.createdAt).toLocaleString(
      'en-US',
      {
        day: 'numeric',
        month: 'long',
      }
    );

    const updated = new Date(service.updatedAt).toLocaleString(
      'en-US',
      {
        day: 'numeric',
        month: 'long',
      }
    );
    const handleEdit = () =>
      navigate(`/dashboard/services/${service.id}`);
    return (
      <tr className="table__row">
        <td className="note__status--completed">
          {service.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__created">{updated}</td>
        <td className="table__cell note__created">
          {service.desiredService}
        </td>
        <td className="table__cell note__created">
          {service.message}
        </td>
        <td>
          <button
            className="icon-button table__button"
            onClick={handleEdit}
          >
            <FaPenSquare />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default AllServices;
