import BaseApi from "../Baseapi";

const TaskEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        AddTask: builder.mutation({
            query: (arg) => ({
                url: "/task",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["task", "project"]
        }),
        DeleteTask: builder.mutation({
            query: (arg) => ({
                url: "/task",
                method: "DELETE",
                body: arg
            }),
            invalidatesTags: ["task", "project"]
        }),
        UpdateTask: builder.mutation({
            query: (arg) => ({
                url: "/task",
                method: "PATCH",
                body: arg
            }),
            invalidatesTags: ["task", "project"]
        }),
    })
});

const task = {
    AddTask: TaskEndpoint.useAddTaskMutation,
    DeleteTask: TaskEndpoint.useDeleteTaskMutation,
    UpdateTask: TaskEndpoint.useUpdateTaskMutation
}

export default task;