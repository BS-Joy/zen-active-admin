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
        getSingleWorkoutPlan: builder.query({
            query: (workoutPlanId) => ({
                url: `/workout-plan/${workoutPlanId}`,
                method: 'GET',
            }),
            providesTags: ["WorkoutPlans"]
        }),
        createWorkoutPlan: builder.mutation({
            query: (workoutPlan) => ({
                url: '/workout-plan/create-workout-plan',
                method: 'POST',
                body: workoutPlan,
            }),
            invalidatesTags: ["WorkoutPlans"]
        }),
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

export const { useGetWorkoutPlansQuery, useGetSingleWorkoutPlanQuery, useCreateWorkoutPlanMutation } = workoutPlansApi