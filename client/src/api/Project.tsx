import BaseApi from "../Baseapi";

const ProjectEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        NewProject: builder.mutation({
            query: (arg) => ({
                url: "/project",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["project"]
        }),
        getProjects: builder.query({
            query: ({ search, page }: { search?: string, page?: number }) => ({
                url: "/project",
                method: "GET",
                params: { search, page }
            }),
            providesTags: ["project"]
        }),
        getMyProjects: builder.query({
            query: () => ({
                url: "/project/me",
                method: "GET",
            }),
            providesTags: ["project"]
        }),
    })
});

const project = {
    NewProject: ProjectEndpoint.useNewProjectMutation,
    getProjects: {
        lazy: ProjectEndpoint.useLazyGetProjectsQuery,
        use: ProjectEndpoint.useGetProjectsQuery
    },
    getMyProjects: {
        lazy: ProjectEndpoint.useLazyGetMyProjectsQuery,
        use: ProjectEndpoint.useGetMyProjectsQuery
    }
}

export default project;