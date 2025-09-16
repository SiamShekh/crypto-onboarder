import { Link, useParams } from "react-router-dom";
import project from "../api/Project";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import InputField from "../components/item/InputField";
import UploadImage from "../utils/UploadImage";
import task from "../api/Task";
import { FaChevronRight } from "react-icons/fa";
import { RTKErrorTypes, Task, User } from "..";

const MoreInfoProject = () => {
    const param = useParams();
    const { data, isFetching } = project.getSpecificProject.use({ slug: param?.id as string });
    const method = useForm();
    const [updateProjectMutation, { status: updateProjectStatus, isLoading }] = project.UpdateProject();
    const deleteTaskMutation = task.DeleteTask();

    const addYourProject = async (e: FieldValues) => {
        updateProjectMutation({
            id: String(data?.id), body: {
                name: e?.name,
                reward: e?.reward,
                description: String(e?.description).trim(),
                launchDate: new Date(e?.launch_date)
            }
        });
    }

    useEffect(() => {
        switch (updateProjectStatus) {
            case QueryStatus.fulfilled:
                (document.getElementById('edit_project') as HTMLDialogElement).close();
                toast.success("Project updated successfully");
                break;

            case QueryStatus.rejected:
                toast.error("Failed to update project");
                break;
        }
    }, [updateProjectStatus]);

    useEffect(() => {
        if (data?.id) {
            const launchDate = formatDateForInput(data.launchDate);

            method.reset({
                ...data,
                launch_date: launchDate,
            });
        }
    }, [data, method]);

    const formatDateForInput = (date: string | Date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    useEffect(() => {
        switch (deleteTaskMutation[1]?.status) {
            case QueryStatus.fulfilled:
                toast.success(`Task successfully deleted.`);
                break;

            case QueryStatus.rejected:
                toast.error(`Something went wrong.`);
                break;
        }
    }, [deleteTaskMutation[1]?.status])

    return (
        <div className="py-5 lg:px-0 px-3">
            {
                isFetching &&
                <div className="fixed w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md" />
                </div>
            }
            <NewTaskModal projectId={data?.id} />

            <div className="grid lg:grid-cols-3 gap-3 max-w-7xl mx-auto">
                <div className="bg-white/3 lg:col-span-2 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={data?.image} alt={data?.name} className="bg-white/10 size-12 rounded-full overflow-hidden" />
                            <div>
                                <p className="font-opensans text-xl">{data?.name}</p>
                                <p className="text-xs font-montserrat opacity-50">Launch Date: {new Date(data?.launchDate).toLocaleDateString("en-GB")}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => (document.getElementById('edit_project') as HTMLDialogElement).showModal()}
                            className="text-xs font-montserrat bg-white/5 rounded-full border-white/5 text-white border px-5 py-1">Edit</button>
                    </div>
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent my-7 via-white/20 to-transparent"></div>
                    <div>
                        <p className="text-xs opacity-50 font-montserrat">About {data?.name}?</p>
                        <p className="font-opensans line-clamp-3">{data?.description}</p>
                    </div>
                </div>

                <div className="bg-white/3 rounded-xl p-3">
                    <div className="p-2 flex items-center justify-between">
                        <p className="text-2xl font-monda font-semibold text-center">🏆 Leaderboard</p>
                        <Link to={`/referer-info/${param?.id as string}`}>
                            <p className="font-monda text-xs bg-white/5 p-1 px-3 border border-white/10 rounded-full">View more</p>
                        </Link>
                    </div>

                    {
                        data?.ProjectReferrel && data?.ProjectReferrel?.length > 0 ?
                            data?.ProjectReferrel?.slice(0, 2).map((referrel: { user: User }, i: number) => (
                                <div key={i} className="flex items-center justify-between my-2 bg-white/5 p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-monda capitalize">{referrel?.user?.username ? referrel?.user?.username : referrel?.user?.solAddress?.slice(0, 15) + "..."}</p>
                                            <p className="font-monda text-xs opacity-50 capitalize">{referrel?.user?.solAddress?.slice(0, 15) + "..."}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-montserrat">{referrel?.user?._count?.ProjectReferrel} People</p>
                                </div>
                            )) :
                            <p className="font-montserrat text-center text-xs">No referrals yet</p>
                    }
                </div>

                <div className="flex items-center justify-between lg:col-span-3 bg-white/5 p-3 rounded-xl">
                    <p>To distribute rewards, get users' addresses here.</p>
                    <Link to={`/referer-info/${data?.slug}`} className="bg-white/5 px-5 py-1 rounded-full">View</Link>
                </div>

            </div>

            <dialog id="edit_project" className="modal">
                <div className="modal-box">
                    <FormProvider {...method}>
                        <form onSubmit={method.handleSubmit(addYourProject)} className="flex flex-col gap-3">
                            <InputField
                                fieldPlaceholder="Enter project name"
                                fieldType="text"
                                registerKey={"name"}
                                className="p-3 outline-none bg-white/5 mt-1 rounded-md w-full"
                                minLength={3}
                                maxLength={12}
                                label="Project Name"
                                required
                            />

                            <InputField
                                fieldPlaceholder="Enter launch date"
                                fieldType="date"
                                registerKey={"launch_date"}
                                className="p-3 outline-none bg-white/5 mt-1 rounded-md w-full"
                                label="Launch Date"
                                required
                            />

                            <InputField
                                fieldType="text"
                                registerKey={"reward"}
                                className="p-3 outline-none bg-white/5 mt-1 rounded-md w-full"
                                label="Rewards"
                                fieldPlaceholder="Enter reward (optional)"
                            />

                            <div className="col-span-full">
                                <p className="text-xs">Project description</p>
                                <textarea
                                    placeholder="Write a brief about your project"
                                    {...method.register("description", {
                                        maxLength: {
                                            value: 500,
                                            message: `Maximum 500 characters allowed.`
                                        },
                                        minLength: {
                                            value: 50,
                                            message: `Minimum 50 characters required.`
                                        },
                                        required: {
                                            message: `Description is required`,
                                            value: true
                                        }
                                    })}
                                    className="p-3 outline-none bg-white/5 mt-1 rounded-md w-full"
                                />
                                {method.formState.errors["description"] && (
                                    <p className="text-xs text-red-500 line-clamp-1 mt-1">{method.formState.errors["description"]?.message as string}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-center">
                                {
                                    isLoading ?
                                        <button type="button" className="bg-white w-full p-2 cursor-pointer font-medium rounded-full text-black mx-auto my-5">
                                            <span className="loading loading-spinner loading-md"></span>
                                        </button> :
                                        <button type="submit" className="bg-white w-full p-2 cursor-pointer font-medium rounded-full text-black mx-auto my-5">Edit</button>
                                }
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </dialog>

            <div className="max-w-7xl mx-auto mt-5">
                <div className="flex items-center justify-between">
                    <p className="font-montserrat">Task: {data?.task?.length}</p>

                    <button
                        onClick={() => (document.getElementById('new_task') as HTMLDialogElement).showModal()}
                        className="text-xs bg-white/5 font-montserrat px-4 cursor-pointer py-2 rounded-lg">Add Task</button>
                </div>

                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Task</th>
                                <th>Link</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isFetching ?
                                    <TableSkelaton /> :
                                    data?.task?.length === 0 || data?.task?.length === undefined ?
                                        <td className="" colSpan={5}>
                                            <div className="text-center font-medium my-10 font-montserrat">
                                                <p>No task found</p>
                                            </div>
                                        </td>
                                        :
                                        data?.task?.map((task: Task, index: number) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            className="size-8 bg-white/5 border border-white/5 rounded-xl"
                                                            src={task?.taskImg}
                                                            alt={task?.taskLabel} />
                                                        <p className="text-base font-montserrat font-medium line-clamp-1">{task?.taskLabel}</p>
                                                    </div>
                                                </td>
                                                <td className="line-clamp-1">{task?.taskHref}</td>
                                                <td className="">{new Date(task?.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    {
                                                        deleteTaskMutation[1]?.isLoading ?
                                                            <button
                                                                type="button"
                                                                className="bg-[#FFADAD] text-black font-monda text-xs px-4 py-1 rounded-sm">
                                                                <span className="loading loading-spinner loading-xs" />
                                                            </button> :
                                                            <button
                                                                onClick={() => deleteTaskMutation[0]({ id: task?.id })}
                                                                type="button"
                                                                className="bg-[#FFADAD] text-black font-monda text-xs px-4 py-1 rounded-sm">Delete</button>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MoreInfoProject;

const NewTaskModal = ({ projectId }: { projectId: number }) => {
    const methods = useForm();
    const [taskMutation, { error, status }] = task.AddTask();
    const [isLoading, setLoading] = useState(false);

    const onSubmit = async (e: FieldValues) => {
        setLoading(true);
        Promise.resolve(UploadImage(e?.icon[0]))
            .then((imgUrl) => {
                taskMutation({
                    taskLabel: e?.title,
                    taskImg: imgUrl,
                    taskHref: e?.link,
                    projectId: projectId
                })
            })
            .catch((err) => {
                toast.error(err);
            })
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                toast.success("Task created successfully");
                setLoading(false);
                methods.reset();
                (document.getElementById("new_task") as HTMLDialogElement).close();
                break;

            case QueryStatus.rejected:
                toast.error((error as RTKErrorTypes)?.data?.msg || "Something went wrong");
                setLoading(false);
                break;
        }
    }, [status, error, methods]);

    return (
        <dialog id="new_task" className="modal">
            <div className="modal-box font-montserrat">
                <div className="border border-white/10 mb-4 p-3 rounded-lg flex gap-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-12 relative overflow-hidden bg-white/5 rounded-xl">
                            {
                                methods.watch("icon") && methods.watch("icon")[0] &&
                                <img src={URL.createObjectURL(methods.watch("icon")[0])} alt="icon" />
                            }
                        </div>
                        <div>
                            {
                                methods.watch("title") ?
                                    <p className="line-clamp-1 text-white">{methods.watch("title")}</p> :
                                    <p className="w-40 rounded-sm h-6 bg-white/5" />
                            }
                            {
                                methods.watch("link") ?
                                    <p className="text-xs line-clamp-1">{methods.watch("link")}</p> :
                                    <p className="w-24 rounded-sm h-4 mt-2 bg-white/5" />
                            }
                        </div>
                    </div>
                    <FaChevronRight className="text-2xl opacity-40" />
                </div>
                <p className="text-xl text-center">Add Task</p>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="my-5 flex flex-col gap-5">
                        <InputField
                            label="Title"
                            fieldPlaceholder="Enter task title"
                            registerKey="title"
                            fieldType="text"
                            required
                            className="outline-none bg-white/10 w-full p-3 rounded-md"
                        />
                        <InputField
                            label="Link"
                            fieldPlaceholder="Enter task link"
                            registerKey="link"
                            fieldType="url"
                            required
                            className="outline-none bg-white/10 w-full p-3 rounded-md"
                        />
                        <InputField
                            label="Icon"
                            registerKey="icon"
                            fieldType="file"
                            required
                            className="outline-none bg-white/10 w-full p-3 rounded-md"
                        />
                        {
                            isLoading ?
                                <button className="bg-white text-black font-medium p-3 rounded-full">
                                    <span className="loading loading-spinner loading-md"></span>
                                </button> :
                                <button type="submit" className="bg-white text-black font-medium p-3 rounded-full">Add Task</button>
                        }
                        <button
                            onClick={() => (document.getElementById("new_task") as HTMLDialogElement).close()}
                            className="text-sm"
                            type="button">Go back</button>
                    </form>
                </FormProvider>
            </div>
        </dialog>
    )
}

const TableSkelaton = () => (
    <>
        <tr>
            <th>
                <div className="size-6 rounded-xl bg-white/10"></div>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-white/5 border border-white/5 rounded-xl" />
                    <p className="w-32 rounded-sm h-6 bg-white/5" />
                </div>
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
        </tr>
        <tr>
            <th>
                <div className="size-6 rounded-xl bg-white/10"></div>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-white/5 border border-white/5 rounded-xl" />
                    <p className="w-32 rounded-sm h-6 bg-white/5" />
                </div>
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
        </tr>
        <tr>
            <th>
                <div className="size-6 rounded-xl bg-white/10"></div>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="size-8 bg-white/5 border border-white/5 rounded-xl" />
                    <p className="w-32 rounded-sm h-6 bg-white/5" />
                </div>
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
            <td>
                <p className="w-32 h-6 rounded-sm bg-white/5" />
            </td>
        </tr>
    </>
)