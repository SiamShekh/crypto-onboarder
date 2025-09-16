import BaseApi from "../Baseapi";

const AdminEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        LoginAdmin: builder.mutation({
            query: (arg) => ({
                url: "/admin/login",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["user"]
        }),
        ChangePassword: builder.mutation({
            query: (arg) => ({
                url: "/admin/password",
                method: "PATCH",
                body: arg
            }),
            invalidatesTags: ["user"]
        }),
        getAdmin: builder.query({
            query: () => ({
                url: "/admin",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        getAdminStats: builder.query({
            query: () => ({
                url: "/admin/stats",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
    })
});

const admin = {
    LoginUser: AdminEndpoint.useLoginAdminMutation,
    getAdmin: AdminEndpoint.useGetAdminQuery,
    getAdminStats: AdminEndpoint.useGetAdminStatsQuery,
    ChangePassword: AdminEndpoint.useChangePasswordMutation
}

export default admin;