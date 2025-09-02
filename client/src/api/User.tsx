import BaseApi from "../Baseapi";

const UserEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        LoginUser: builder.mutation({
            query: (arg) => ({
                url: "/user/login",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["user"]
        }),
        getUser: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        verifyChannelJoining: builder.mutation({
            query: () => ({
                url: "/telegram/verify",
                method: "PATCH",
            }),
            invalidatesTags: ["user"]
        }),
        seenReferAlart: builder.mutation({
            query: () => ({
                url: "/user/refer-alart",
                method: "PATCH",
            }),
            invalidatesTags: ["user"]
        }),
    })
});

const user = {
    LoginUser: UserEndpoint.useLoginUserMutation,
    getUser: UserEndpoint.useGetUserQuery,
    verifyChannelJoining: UserEndpoint.useVerifyChannelJoiningMutation,
    seenReferAlart: UserEndpoint.useSeenReferAlartMutation
}

export default user;