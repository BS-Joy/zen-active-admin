import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo,
            })
        }),
        forgotPassword: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/forgot-pass',
                method: 'POST',
                body: userInfo,
            })
        }),
        verifyEmail: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/verify-user',
                method: 'PATCH',
                body: userInfo,
            })
        }),
        changePassword: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/reset-pass',
                method: 'POST',
                body: userInfo,
            })
        }),
        getTotalUsers: builder.query({
            query: () => '/user/total-user',
        }),
        getAllUser: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/user${queryParam}`,
                    method: 'GET',
                };
            }
        }),
    })
})

export const { useLoginMutation, useForgotPasswordMutation, useVerifyEmailMutation, useChangePasswordMutation, useGetTotalUsersQuery, useGetAllUserQuery } = authApi