import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.18:3500/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
        credentials: 'include',
    }),
    // tagTypes: [''],
    endpoints: () => ({})
})