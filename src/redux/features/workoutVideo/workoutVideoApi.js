import { baseApi } from "../../api/baseApi";

export const workoutVideoApi = baseApi.enhanceEndpoints({ addTagTypes: ["WorkoutVideos"] }).injectEndpoints({
    endpoints: (builder) => ({
        getWorkoutVideos: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/workout-video${queryParam}`,
                    method: 'GET',
                };
            },
            providesTags: ["WorkoutVideos"]
        }),
        // getSingleBadge: builder.query({
        //     query: (badgeId) => ({
        //         url: `/badge/${badgeId}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ["Badges"]
        // }),
        // createBadge: builder.mutation({
        //     query: (badge) => ({
        //         url: '/badge/create-badge',
        //         method: 'POST',
        //         body: badge,
        //     }),
        //     invalidatesTags: ["Badges"]
        // }),
        // editBadge: builder.mutation({
        //     query: ({ badgeId, formData }) => ({
        //         url: `/badge/${badgeId}`,
        //         method: 'PATCH',
        //         body: formData
        //     }),
        //     invalidatesTags: ["Badges"]
        // }),
        // deleteBadge: builder.mutation({
        //     query: (badgeId) => ({
        //         url: `/badge/${badgeId}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ["Badges"]
        // }),
    })
})

export const { useGetWorkoutVideosQuery } = workoutVideoApi