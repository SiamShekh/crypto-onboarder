import { useForm } from "react-hook-form";
import project from "../../api/Project";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { RTKErrorTypes, Project as TProject } from "../..";

const Project = () => {
    const { setValue, watch } = useForm();
    const [deleteProject, { status: deleteProjectStatus, isLoading: deleteIsLoading, error: deleteProjectError, data: deleteProjectData }] = project.DeleteAdminProject();
    const [undoProject, { status: undoStatus, isLoading: undoIsLoading, error: projectUndoError, data: projectUndoData }] = project.UndoAdminProject();
    const [verifyProject, { status: verifyProjectStatus, isLoading: verifyProjectLoading, data: verifyProjectData, error: verifyProjectError }] = project.VerifyProjectAdmin();

    const exploreData = project.getAdminProjects.use({
        search: watch("search") || "",
        page: Number(watch("page") || 0),
        status: watch("status", "active")
    });

    useEffect(() => {
        switch (deleteProjectStatus) {
            case QueryStatus.fulfilled:
                if (deleteProjectData?.isDelete) {
                    toast.success("The project was deleted successfully.");
                } else {
                    toast.error("Failed to delete the project.")
                }
                break;

            case QueryStatus.rejected:
                toast.error((deleteProjectError as RTKErrorTypes)?.data?.msg || "Something went wrong");
                break;
        }
    }, [deleteProjectStatus, deleteProjectData?.isDelete, deleteProjectError]);

    useEffect(() => {
        switch (undoStatus) {
            case QueryStatus.fulfilled:
                if (!projectUndoData?.isDelete) {
                    toast.success("Project undone successfully.");
                } else {
                    toast.error("Failed to undo the project.");
                }
                break;

            case QueryStatus.rejected:
                toast.error((projectUndoError as RTKErrorTypes)?.data?.msg ?? "An unexpected error occurred while undoing the project.");
                break;
        }
    }, [undoStatus, projectUndoData?.isDelete, projectUndoError]);

    useEffect(() => {
        switch (verifyProjectStatus) {
            case QueryStatus.fulfilled:
                if (verifyProjectData?.isVerified) {
                    toast.success("The project was successfully verified.");
                } else {
                    toast.success("The verification tag has been removed.");
                }
                break;

            case QueryStatus.rejected:
                toast.error((verifyProjectError as RTKErrorTypes)?.data?.msg || "Something went wrong.");
                break;
        }
    }, [verifyProjectStatus, verifyProjectData?.isVerified, verifyProjectError]);

    return (
        <div className="max-w-7xl mx-auto p-3">
            <div className="mx-auto text-sm justify-center border border-white/10 rounded-full overflow-hidden bg-white/5 font-monda w-72 flex items-center">
                <button
                    onClick={() => setValue("status", "active")}
                    className={`text-center ${watch("status", "active") === "active" && "bg-white text-black"} w-full p-2 cursor-pointer`}>Active</button>
                <button
                    onClick={() => setValue("status", "deleted")}
                    className={`text-center ${watch("status", "active") === "deleted" && "bg-white text-black"} w-full p-2 hover:bg-black/10 cursor-pointer`}>Deleted</button>
            </div>
            <div className="flex items-center md:flex-row flex-col gap-4 justify-between my-5">
                <input
                    onChange={(e) => setValue("search", e.target.value)}
                    value={watch("search") || ""}
                    className="bg-white/5 p-3 font-monda outline-none rounded-md w-full max-w-2xl"
                    placeholder="Search by name"
                    type="text" />
                <div className="flex items-center gap-3 font-montserrat">
                    <div
                        onClick={() => setValue("page", (Number(watch("page") || 0) - 1).toString())}
                        className="bg-white/5 p-2 px-5 cursor-pointer rounded-sm">Previous</div>
                    <div
                        onClick={() => setValue("page", (Number(watch("page") || 0) + 1).toString())}
                        className="bg-white/5 p-2 px-5 rounded-sm cursor-pointer">Next</div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                        <tr className="text-center font-montserrat">
                            <th>#</th>
                            <th>Name</th>
                            <th>Launch Date</th>
                            <th>Reward</th>
                            <th>Verify</th>
                            <th>Task</th>
                            <th>Visitor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            exploreData?.data?.length === 0 || exploreData?.data?.length === undefined ?
                                <tr>
                                    <td colSpan={7}>
                                        <div>
                                            <p className="text-center">No user found</p>
                                        </div>
                                    </td>
                                </tr>

                                :

                                exploreData?.data?.map((project: TProject, key: number) => (
                                    <tr key={key} className="text-center font-opensans">
                                        <th>{key + 1}</th>
                                        <td>{project?.name}</td>
                                        <td>{project?.launchDate ? new Date(project?.launchDate).toLocaleString() : "N/A"}</td>
                                        <td>{project?.reward ? project?.reward : "N/A"}</td>
                                        <td>
                                            <input
                                                onChange={(e) => {
                                                    const checkbox = e?.target.checked;
                                                    verifyProject({ id: project?.id })
                                                    console.log(checkbox);

                                                }}
                                                type="checkbox"
                                                defaultChecked={project?.isVerified}
                                                className="toggle" />
                                        </td>
                                        <td>{project?.task?.length}</td>
                                        <td>{project?._count?.ProjectReferrel}</td>
                                        <td>
                                            {
                                                undoIsLoading || deleteIsLoading || verifyProjectLoading ?
                                                    <div className="px-5 bg-white/5 w-fit p-1 rounded-md mx-auto ">
                                                        <span className="loading loading-spinner loading-xs"></span>
                                                    </div> :
                                                    watch("status", "active") === "active" ?
                                                        <div
                                                            onClick={() => {
                                                                if (!deleteIsLoading) {
                                                                    deleteProject({ id: project?.id })
                                                                }
                                                            }}
                                                            className="font-monda cursor-pointer text-xs bg-white/5 w-fit p-1 rounded-md mx-auto">Delete</div> :
                                                        <div
                                                            onClick={() => {
                                                                if (!undoIsLoading) {
                                                                    undoProject({ id: project?.id })
                                                                }
                                                            }}
                                                            className="font-monda cursor-pointer text-xs bg-white/5 w-fit p-1 rounded-md mx-auto">Undo</div>
                                            }
                                        </td>
                                    </tr>
                                ))
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Project;
