import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { LOCAL_SERVER, PROD_SERVER } from "./constant";

const BaseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.DEV ? LOCAL_SERVER : PROD_SERVER,
        credentials: "include"
    }),
    endpoints: () => ({}),
    tagTypes: ["user", "project", "admin", "task"]
});

export default BaseApi;