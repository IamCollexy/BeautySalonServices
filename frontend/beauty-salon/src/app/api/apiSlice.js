// export const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000',
//   }),
//   tagTypes: ['Users'],
//   endpoints: (builder) => ({
//     // Fetch user data by ID
//     fetchUserById: builder.query({
//       query: (id) => `users/${id}`, // Replace 'users' with the actual endpoint for fetching user data
//     }),
//   }),
// });
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({}),
});
