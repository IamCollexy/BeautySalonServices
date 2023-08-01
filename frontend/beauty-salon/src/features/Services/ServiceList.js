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
  } = useGetServicesQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

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
      <table className="table table--notes">
        <thead className="table___thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Status
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Service
            </th>
            <th scope="col" className="table__th note__username">
              Description
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
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
