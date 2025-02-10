import { baseApi } from "../../api/baseApi";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransaction: builder.query({
            query: (type) => ({
                url: `/subscription/earn?type=${type}`,
                method: 'GET',
            })
        }),
        getTotalEarnings: builder.query({
            query: () => '/subscription/total-earn',
        }),
        getRecentTransactions: builder.query({
            query: () => '/subscription',
        }),
    })
})

export const { useGetAllTransactionQuery, useGetTotalEarningsQuery, useGetRecentTransactionsQuery } = transactionApi