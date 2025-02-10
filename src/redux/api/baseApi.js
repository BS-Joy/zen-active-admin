import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.18:3500/api',
        credentials: 'include'
    }),
    // tagTypes: [''],
    endpoints: () => ({})
})