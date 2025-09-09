import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const BaseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://api.whybuy.fun",
        baseUrl: "http://localhost:3000",
        credentials: "include"
    }),
    endpoints: () => ({}),
    tagTypes: ["user", "project", "admin"]
});

export default BaseApi;