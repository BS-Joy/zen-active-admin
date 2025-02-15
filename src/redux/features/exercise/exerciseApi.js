import { baseApi } from "../../api/baseApi";

export const exerciseApi = baseApi.enhanceEndpoints({ addTagTypes: ["Exercises"] }).injectEndpoints({
    endpoints: (builder) => ({
        getAllExercise: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/exercise${queryParam}`,
                    method: 'GET',
                };
            },
            providesTags: ["Exercises"]
        }),
        createExercise: builder.mutation({
            query: (exercise) => ({
                url: '/exercise',
                method: 'POST',
                body: exercise,
            }),
            invalidatesTags: ["Exercises"]
        }),
    })
})

export const { useGetAllExerciseQuery, useCreateExerciseMutation } = exerciseApi