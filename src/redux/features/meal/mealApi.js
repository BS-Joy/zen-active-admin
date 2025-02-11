import { baseApi } from "../../api/baseApi";

export const mealApi = baseApi.enhanceEndpoints({ addTagTypes: ['Meals'] }).injectEndpoints({
    endpoints: (builder) => ({
        getAllMeal: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/meal${queryParam}`,
                    method: 'GET',
                };
            },
            providesTags: ['Meals']
        }),
        createMeal: builder.mutation({
            query: (meal) => ({
                url: '/meal/create-meal',
                method: 'POST',
                body: meal,
            }),
            invalidatesTags: ['Meals']
        }),
    })
})

export const { useGetAllMealQuery, useCreateMealMutation } = mealApi