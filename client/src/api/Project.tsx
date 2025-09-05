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
        UpdateProject: builder.mutation({
            query: ({ id, body }: {
                id: string, body: {
                    name: string;
                    tagline: string;
                    reward: string;
                    task: string[];
                }
            }) => ({
                url: `/project/update/${id}`,
                method: "PATCH",
                body: body
            }),
            invalidatesTags: ["project"]
        }),
        SoftDeleteProject: builder.mutation({
            query: ({ id }: {
                id: string
            }) => ({
                url: `/project/delete/${id}`,
                method: "PATCH",
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
        getSpecificProject: builder.query({
            query: ({ id }: { id: string }) => ({
                url: "/project/specific",
                method: "GET",
                params: { id }
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
    },
    getSpecificProject: {
        lazy: ProjectEndpoint.useLazyGetSpecificProjectQuery,
        use: ProjectEndpoint.useGetSpecificProjectQuery
    },
    UpdateProject: ProjectEndpoint.useUpdateProjectMutation,
    SoftDeleteProject: ProjectEndpoint.useSoftDeleteProjectMutation
}

export default project;