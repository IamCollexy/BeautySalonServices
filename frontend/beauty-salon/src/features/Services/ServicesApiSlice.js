import {
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const servicesAdapter = createEntityAdapter({});

const initialState = servicesAdapter.getInitialState();

export const serviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => '/services',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5, // In production you can update it, by default it is 60s
      transformResponse: (responseData) => {
        const loadedServices = responseData.map((service) => {
          service.id = service._id;
          return service;
        });
        return servicesAdapter.setAll(initialState, loadedServices);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Service', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Service', id })),
          ];
        } else return [{ type: 'Service', id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetServicesQuery } = serviceApiSlice;

// returns the query result object
export const selectServiceResult =
  serviceApiSlice.endpoints.getServices.select();

// creates memoized selector
export const selectServiceData = createSelector(
  selectServiceResult,
  (servicesResult) => servicesResult.data // normalized state object with ids and entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring

export const {
  selectAll: selectAllServices,
  selectById: selectServicesById,
  selectIds: selectServiceIds,
  //pass in a selector that returns the services slice of state
} = servicesAdapter.getSelectors(
  (state) => selectServiceData(state) ?? initialState
);
