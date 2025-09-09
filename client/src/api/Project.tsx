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
            query: ({ slug }: { slug: string }) => ({
                url: "/project/specific",
                method: "GET",
                params: { slug }
            }),
            providesTags: ["project"]
        }),
        projectTraffic: builder.mutation({
            query: (body) => ({
                url: "/project/traffic",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["project"]
        }),
        getAdminProjects: builder.query({
            query: ({ search, page, status }: { search?: string, page?: number, status?: string }) => ({
                url: "/project/admin",
                method: "GET",
                params: { search, page, status }
            }),
            providesTags: ["project"]
        }),
        DeleteAdminProject: builder.mutation({
            query: ({ id }: {
                id: number
            }) => ({
                url: `/project/admin`,
                method: "PATCH",
                body: { id }
            }),
            invalidatesTags: ["project"]
        }),
        UndoAdminProject: builder.mutation({
            query: ({ id }: {
                id: number
            }) => ({
                url: `/project/undo`,
                method: "PATCH",
                body: { id }
            }),
            invalidatesTags: ["project"]
        }),
        getProjectBySlug: builder.query({
            query: ({ slug }: { slug: string }) => ({
                url: "/project/slug",
                method: "GET",
                params: { slug }
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
    getAdminProjects: {
        lazy: ProjectEndpoint.useLazyGetAdminProjectsQuery,
        use: ProjectEndpoint.useGetAdminProjectsQuery
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
    SoftDeleteProject: ProjectEndpoint.useSoftDeleteProjectMutation,
    projectTraffic: ProjectEndpoint.useProjectTrafficMutation,
    DeleteAdminProject: ProjectEndpoint.useDeleteAdminProjectMutation,
    UndoAdminProject: ProjectEndpoint.useUndoAdminProjectMutation,
    getProjectBySlug:{
        use: ProjectEndpoint.useGetProjectBySlugQuery,
        lazy: ProjectEndpoint.useLazyGetProjectBySlugQuery
    }
}

export default project;