import { baseApi } from "../../api/baseApi";

export const settingApi = baseApi.enhanceEndpoints({ addTagTypes: ['Terms'] }).injectEndpoints({
    endpoints: (builder) => ({
        getTerm: builder.query({
            query: () => '/privacy&terms/terms',
            providesTags: ['Terms']
        }),
        editTerms: builder.mutation({
            query: (term) => ({
                url: `/privacy&terms/terms`,
                method: 'POST',
                body: term
            }),
            invalidatesTags: ['Terms']
        }),
    })
})

export const { useGetTermQuery, useEditTermsMutation } = settingApi