import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserFeed: builder.query({
            query: () => ({
                url: '/user/feed'
            }),
            providesTags: ['UserFeed'],
        }),
        getUserReceivedRequest: builder.query({
            query: () => ({
                url: '/user/received/request'
            }),
            providesTags: ["ReviewRequest"]
        }),
        getUsersConnections: builder.query({
            query: () => ({
                url: 'user/connections'
            }),
            providesTags: ["UserCoonections"]
        })
    })
});

export const { useGetUserFeedQuery, useGetUserReceivedRequestQuery, useGetUsersConnectionsQuery } = userApi;