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
    })
});

const project = {
    NewProject: ProjectEndpoint.useNewProjectMutation,
}

export default project;