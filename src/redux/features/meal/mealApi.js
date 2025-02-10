import { baseApi } from "../../api/baseApi";

export const mealApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMeal: builder.query({
            query: (type) => ({
                url: `/meal`,
                method: 'GET',
            })
        }),

    })
})

export const { useGetAllMealQuery } = mealApi