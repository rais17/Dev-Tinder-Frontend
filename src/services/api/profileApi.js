import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUserProfile: builder.query({
            query: () => ({
                url: '/profile',
            }),
            providesTags: ['CurrentUser'],
        }),

        updateCurrentUserProfile: builder.mutation({
            query: (data) => ({
                url: '/profile/update',
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["CurrentUser"],
        })
    })
});

export const {
    useGetCurrentUserProfileQuery,
    useUpdateCurrentUserProfileMutation
} = profileApi;
