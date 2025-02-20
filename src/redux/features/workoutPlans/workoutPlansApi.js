import { baseApi } from "../../api/baseApi";

export const workoutPlansApi = baseApi.enhanceEndpoints({ addTagTypes: ["WorkoutPlans"] }).injectEndpoints({
    endpoints: (builder) => ({
        getWorkoutPlans: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/workout-plan${queryParam}`,
                    method: 'GET',
                };
            },
            providesTags: ["WorkoutPlans"]
        }),
        // getSingleWorkout: builder.query({
        //     query: (workoutId) => ({
        //         url: `/workout/${workoutId}`,
        //         method: 'GET',
        //     }),
        //     providesTags: ["Workouts"]
        // }),
        // createWorkout: builder.mutation({
        //     query: (workout) => ({
        //         url: '/workout/create-workout',
        //         method: 'POST',
        //         body: workout,
        //     }),
        //     invalidatesTags: ["Workouts"]
        // }),
        // editWorkout: builder.mutation({
        //     query: ({ workoutId, formData }) => ({
        //         url: `/workout/${workoutId}`,
        //         method: 'PATCH',
        //         body: formData
        //     }),
        //     invalidatesTags: ["Workouts"]
        // }),
        // deleteWorkout: builder.mutation({
        //     query: (workoutId) => ({
        //         url: `/workout/${workoutId}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ["Workouts"]
        // }),
    })
})

export const { useGetWorkoutPlansQuery } = workoutPlansApi