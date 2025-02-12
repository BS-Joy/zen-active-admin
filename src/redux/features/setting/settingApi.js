import { baseApi } from "../../api/baseApi";

export const settingApi = baseApi.enhanceEndpoints({ addTagTypes: ['Terms', 'Privacy'] }).injectEndpoints({
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
        getPrivacy: builder.query({
            query: () => '/privacy&terms/privacy',
            providesTags: ['Privacy']
        }),
        editPrivacy: builder.mutation({
            query: (privacy) => ({
                url: `/privacy&terms/privacy`,
                method: 'POST',
                body: privacy
            }),
            invalidatesTags: ['Privacy']
        }),
    })
})

export const { useGetTermQuery, useEditTermsMutation, useGetPrivacyQuery, useEditPrivacyMutation } = settingApi