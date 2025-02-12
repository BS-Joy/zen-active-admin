import { baseApi } from "../../api/baseApi";

export const settingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTerm: builder.query({
            query: () => '/privacy&terms/terms',
        }),
        editTerms: builder.mutation({
            query: (term) => ({
                url: `/privacy&terms/terms`,
                method: 'POST',
                body: term
            }),
        }),
    })
})

export const { useGetTermQuery, useEditTermsMutation } = settingApi