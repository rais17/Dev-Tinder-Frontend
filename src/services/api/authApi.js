import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["CurrentUser", "UserFeed", "ReviewRequest", "UserCoonections", "UserChat"],
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                body: {}
            }),
            invalidatesTags: ["CurrentUser"],
        }),
        signup: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signup',
                method: "POST",
                body: credentials
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation
} = authApi;