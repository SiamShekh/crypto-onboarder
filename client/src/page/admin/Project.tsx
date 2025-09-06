import { useForm } from "react-hook-form";
import project from "../../api/Project";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

interface ProjectType {
    id: number
    image: string
    name: string
    tagline: string
    reward: string
    task: string[]
    _count: {
        ProjectReferrel: number
    }
}

const Project = () => {
    const { setValue, watch } = useForm();
    const deleteAdminProject = project.DeleteAdminProject();

    const exploreData = project.getAdminProjects.use({
        search: watch("search") || "",
        page: Number(watch("page") || 0),
    });

    useEffect(() => {
        switch (deleteAdminProject[1]?.status) {
            case QueryStatus.fulfilled:
                toast.success("Project deleted");
                break;

            case QueryStatus.rejected:
                toast.error("Something went wrong");
                break;
        }
    }, [deleteAdminProject[1]?.status])

    return (
        <div className="max-w-7xl mx-auto p-3">
            <div className="flex items-center justify-between my-5">
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
                            <th>Tagline</th>
                            <th>Reward</th>
                            <th>Task</th>
                            <th>Visitor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            exploreData?.data?.map((project: ProjectType, key: number) => (
                                <tr key={key} className="text-center font-opensans">
                                    <th>{key + 1}</th>
                                    <td>{project?.name}</td>
                                    <td>{project?.tagline}</td>
                                    <td>{project?.reward}</td>
                                    <td>{project?.task?.length}</td>
                                    <td>{project?._count?.ProjectReferrel}</td>
                                    <td>
                                        {
                                            deleteAdminProject[1]?.isLoading ?
                                                <div className="px-5 bg-white/5 w-fit p-1 rounded-md mx-auto ">
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                </div> :
                                                <div
                                                    onClick={() => {
                                                        if (!deleteAdminProject[1]?.isLoading) {
                                                            deleteAdminProject[0]({ id: project?.id })
                                                        }
                                                    }}
                                                    className="font-monda cursor-pointer text-xs bg-white/5 w-fit p-1 rounded-md mx-auto">Delete</div>
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
