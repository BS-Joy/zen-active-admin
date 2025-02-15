import { baseApi } from "../../api/baseApi";

export const workoutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllWorkout: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/workout${queryParam}`,
                    method: 'GET',
                };
            }
        }),

    })
})

export const { useGetAllWorkoutQuery } = workoutApi