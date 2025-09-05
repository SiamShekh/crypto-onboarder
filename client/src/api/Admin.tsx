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
    })
});

const admin = {
    LoginUser: AdminEndpoint.useLoginAdminMutation,
}

export default admin;