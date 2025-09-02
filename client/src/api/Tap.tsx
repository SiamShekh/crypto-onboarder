import BaseApi from "../Baseapi";

const TapEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        newTap: builder.mutation({
            query: (arg) => ({
                url: "/tap",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["tap","user"]
        }),
    })
});

const tapgame = {
    newTap: TapEndpoint.useNewTapMutation
}

export default tapgame;