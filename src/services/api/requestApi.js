import { baseApi } from "./baseApi";

export const requestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        showInterest: builder.mutation({
            query: ({status, toUserId}) => ({
                url: `request/send/${status}/${toUserId}`,
                method: "POST",
                body: {}
            }),
            invalidatesTags: ["UserFeed"]
        }),

        reviewReceivedRequest: builder.mutation({
            query: ({status, connectionId}) => ({
                url: `request/review/${status}/${connectionId}`,
                method: "POST",
                body: {}
            }),
            invalidatesTags: ["ReviewRequest", "UserCoonections"]
        })
    })
})

export const { useShowInterestMutation, useReviewReceivedRequestMutation } = requestApi;