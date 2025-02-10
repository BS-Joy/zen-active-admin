import { baseApi } from "../../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransaction: builder.query({
            query: (type) => ({
                url: `/subscription/earn?type=${type}`,
                method: 'GET',
            })
        }),
    })
})

export const { useGetAllTransactionQuery } = transactionApi