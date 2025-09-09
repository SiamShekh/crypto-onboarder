import BaseApi from "../Baseapi";

const TaskEndpoint = BaseApi.injectEndpoints({
    endpoints: (builder) => ({
        AddTask: builder.mutation({
            query: (arg) => ({
                url: "/task",
                method: "POST",
                body: arg
            }),
            invalidatesTags: ["task"]
        }),
        DeleteTask: builder.mutation({
            query: (arg)=>({
                url: "/task",
                method: "DELETE",
                body: arg
            }),
            invalidatesTags: ["task"]
        })
    })
});

const task = {
    AddTask: TaskEndpoint.useAddTaskMutation,
    DeleteTask: TaskEndpoint.useDeleteTaskMutation
}

export default task;