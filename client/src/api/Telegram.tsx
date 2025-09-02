import BaseApi from "../Baseapi";

const TelegramEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChannel: builder.query({
            query: (arg) => ({
                url: "/telegram/channel",
                method: "GET",
                params: { username: arg }
            }),
            providesTags: ["telegram"]
        }),
        shareMessage: builder.query({
            query: () => ({
                url: "/telegram/share-invite-link",
                method: "GET",
            }),
            providesTags: ["telegram"]
        }),
        

    })
});

const telegram = {
    channel: {
        query: TelegramEndpoint.useGetChannelQuery,
        lazy: TelegramEndpoint.useLazyGetChannelQuery
    },
    shareMessage: {
        query: TelegramEndpoint.useShareMessageQuery,
        lazy: TelegramEndpoint.useLazyShareMessageQuery
    }
}

export default telegram;