import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../utils/constant"

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        mode: 'cors'
    }),
    tagTypes: ["CurrentUser", "UserFeed", "ReviewRequest", "UserCoonections", "UserChat"],
    endpoints: () => ({})
})