import { baseApi } from "../../api/baseApi";

export const settingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTerm: builder.query({
            query: () => '/privacy&terms/terms',
        }),

    })
})

export const { useGetTermQuery } = settingApi