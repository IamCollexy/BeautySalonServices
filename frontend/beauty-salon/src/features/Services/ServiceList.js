import React from 'react';
import { useGetServicesQuery } from './ServicesApiSlice';
import AllServices from './AllServices';

const ServiceList = () => {
  const {
    data: Services,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetServicesQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data.message}</p>;
  }

  if (isSuccess) {
    const { ids } = Services;

    const tableContent = ids?.length
      ? ids.map((serviceId) => (
          <AllServices key={serviceId} serviceId={serviceId} />
        ))
      : null;

    content = (
      <table className="table table--services">
        <thead className="table___thead">
          <tr>
            <th scope="col" className="table__th service__status">
              Username
            </th>
            <th scope="col" className="table__th service___created">
              Created
            </th>
            <th scope="col" className="table__th service___updated">
              Updated
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default ServiceList;
