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
    })
})

export const { useLoginMutation, useForgotPasswordMutation, useVerifyEmailMutation } = authApi