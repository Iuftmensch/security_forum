// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import {
//     THREAD_URL,
//     THREAD_CREATE_URL,
//     TAG_URL,
//     THREAD_UPDATE_URL,
//     API_URL
// } from './const';

// export const apiSlice = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: API_URL,
//         prepareHeaders: (headers, { getState }) => {
//             const token = getState().auth.token
//             if (token) {
//                 headers.set('Authorization', `Token ${token}`)
//             }

//             return headers
//         },
//     }),
//     tagTypes: ['Threads'],
//     endpoints: (builder) => ({
//         getThreads: builder.query({
//             query: () => `/`,
//             providesTags: ['Threads']
//         }),
//     }),
// })

// export const { useGetThreadsQuery } = apiSlice;