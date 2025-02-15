import { baseApi } from "../../api/baseApi";

export const workoutApi = baseApi.enhanceEndpoints({ addTagTypes: ["Workouts"] }).injectEndpoints({
    endpoints: (builder) => ({
        getAllWorkout: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/workout${queryParam}`,
                    method: 'GET',
                };
            },
            providesTags: ["Workouts"]
        }),
        createWorkout: builder.mutation({
            query: (workout) => ({
                url: '/workout/create-workout',
                method: 'POST',
                body: workout,
            }),
            invalidatesTags: ["Workouts"]
        }),
    })
})

export const { useGetAllWorkoutQuery, useCreateWorkoutMutation } = workoutApi