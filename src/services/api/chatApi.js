import { baseApi } from "./baseApi";

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUserChat: builder.query({
            query: ({toUserId, count}) => `/chat/${toUserId}?count=${count}`,
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true,
            providesTags: ['UserChat'],
        })
    })
});

export const { useGetCurrentUserChatQuery } = chatApi;