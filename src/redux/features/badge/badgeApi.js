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

export const { useGetBadgesQuery } = badgeApi