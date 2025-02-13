import { baseApi } from "../../api/baseApi";

export const badgeApi = baseApi.enhanceEndpoints({ addTagTypes: ["Badges"] }).injectEndpoints({
    endpoints: (builder) => ({
        getBadges: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/badge${queryParam}`,
                    method: 'GET',
                };
            },
            providesTags: ["Badges"]
        }),
        getSingleBadge: builder.query({
            query: (badgeId) => ({
                url: `/badge/${badgeId}`,
                method: 'GET',
            }),
            providesTags: ["Badges"]
        }),
        createBadge: builder.mutation({
            query: (badge) => ({
                url: '/badge/create-badge',
                method: 'POST',
                body: badge,
            }),
            invalidatesTags: ["Badges"]
        }),
        // editTerms: builder.mutation({
        //     query: (term) => ({
        //         url: `/privacy&terms/terms`,
        //         method: 'POST',
        //         body: term
        //     }),
        //     invalidatesTags: ['Terms']
        // }),
    })
})

export const { useGetBadgesQuery, useCreateBadgeMutation, useGetSingleBadgeQuery } = badgeApi