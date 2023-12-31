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
      // keepUnusedDataFor: 5, // In production you can update it, by default it is 60s
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });

        console.log(loadedUsers);
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
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'POST',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'List' }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: '/users',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

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
