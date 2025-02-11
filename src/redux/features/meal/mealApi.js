import { baseApi } from "../../api/baseApi";

export const mealApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMeal: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/meal${queryParam}`,
                    method: 'GET',
                };
            }
        }),

    })
})

export const { useGetAllMealQuery } = mealApi