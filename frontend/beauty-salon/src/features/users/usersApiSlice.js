import {
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5, // In production you can update it, by default it is 60s
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User', id })),
          ];
        } else return [{ type: 'User', id: 'LIST' }];
      },
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;

// returns the query result object
export const selectUserResult =
  userApiSlice.endpoints.getUsers.select();

// creates memoized selector
export const selectUserData = createSelector(
  selectUserResult,
  (usersResult) => usersResult.data // normalized state object with ids and entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUserIds,
  //pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUserData(state) ?? initialState
);
