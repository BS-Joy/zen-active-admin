import { baseApi } from "../../api/baseApi";

export const exerciseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllExercise: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/exercise${queryParam}`,
                    method: 'GET',
                };
            }
        }),

    })
})

export const { useGetAllExerciseQuery } = exerciseApi