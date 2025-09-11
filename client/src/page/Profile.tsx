import icon from "../assets/icon.webp";
import { useContext, useEffect } from "react";
import { ContextValues } from "../utils/ContextApi";
import { FaCopy } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import project from "../api/Project";
import { Project, RTKErrorTypes } from "..";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import user from "../api/User";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { Link } from "react-router-dom";

const Profile = () => {
    const values = useContext(ContextValues);
    const { data, isFetching } = project.getMyProjects.use(undefined);
    const { setValue, watch, resetField } = useForm();
    const [updateUsernameMutation, { status: updateStatus, error: updateUsernameError }] = user.updateUsername();

    const handleUpdateUsername = () => {
        if (!watch("username")) {
            toast.error("Username is required");
            return;
        }

        updateUsernameMutation({ username: watch("username") })
    }

    useEffect(() => {
        switch (updateStatus) {
            case QueryStatus.fulfilled:
                toast.success("Username updated successfully");
                resetField("username");
                (document.getElementById('updateUsername') as HTMLDialogElement).close();

                break;

            case QueryStatus.rejected:
                toast.error((updateUsernameError as RTKErrorTypes)?.data?.msg || "Failed to update username");
                break;
        }
    }, [resetField, updateStatus, updateUsernameError])

    return (
        <div className="max-w-5xl mx-auto p-3">
            <div className="my-10 rounded-2xl border border-white/10 bg-white/5 p-3 lg:p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <img src={icon} alt="icon" className="size-12 lg:size-20 bg-white/5 rounded-full p-2 border-white/10 border" />
                        <div>
                            <div>
                                <p className="text-xl font-monda text-white">{values?.user?.data?.username ? values?.user?.data?.username : values?.user?.data?.solAddress?.slice(0, 12) + "..."}</p>
                            </div>
                            <div className="lg:flex items-center gap-2 my-1 hidden">
                                <p className="text-sm opacity-70">
                                    {values?.user?.data?.solAddress
                                        ? `${values.user.data.solAddress.slice(0, 4)}.....${values.user.data.solAddress.slice(-4)}`
                                        : 'No address'}
                                </p>

                                <FaCopy className="text-sm" />
                            </div>
                            <a target="_blank" href={`https://solscan.io/account/${values?.user?.data?.solAddress}`} className="flex items-center gap-3 font-monda text-xs text-purple-400 cursor-pointer">
                                <p>View on Solscan</p>
                            </a>
                        </div>
                    </div>
                    <button onClick={() => (document.getElementById('updateUsername') as HTMLDialogElement).showModal()} className="bg-white/10 px-4 lg:px-10 font-monda text-sm cursor-pointer border border-white/10 py-1 lg:py-2 rounded-sm">Edit</button>
                </div>

                {
                    isFetching ? (
                        <div className="bg-white/3 border p-3 border-white/10 mt-5 rounded-md grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            <LoadingSkelaton />
                            <LoadingSkelaton />
                            <LoadingSkelaton />
                            <LoadingSkelaton />
                        </div>
                    ) :
                        data?.length === 0 || data?.length === undefined ?
                            (
                                <div className="bg-white/5 border flex flex-col items-center justify-center p-10 border-white/10 mt-5 rounded-md">
                                    <MdDoNotDisturb className="text-5xl" />
                                    <p className="font-monda">No project found</p>
                                </div>
                            ) :
                            <div className="bg-white/3 border p-3 border-white/10 mt-5 rounded-md grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {
                                    data?.map((item: Project) => (
                                        <ProjectCard item={item} key={item?.id} />
                                    ))
                                }
                            </div>
                }

            </div>

            <dialog id="updateUsername" className="modal">
                <div className="modal-box">
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Username</legend>
                        <input
                            onChange={(e) => setValue("username", e.target.value)}
                            required
                            type="text"
                            defaultValue={values?.user?.data?.username}
                            className="input w-full"
                            placeholder="Enter username" />
                        <button
                            onClick={handleUpdateUsername}
                            type="button"
                            className="px-10 py-2 bg-white/10 font-monda mt-5 w-fit rounded-md mx-auto">Update</button>
                    </fieldset>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Profile;

const ProjectCard = ({ item }: { item: Project }) => {
    const [deleteMutation, { data: deleteData, error: deleteError, isLoading: deleteIsLoading, isSuccess, isError }] = project.SoftDeleteProject();

    const handleDelete = () => {
        if (!item?.id) {
            toast.error("Project id is required");
            return;
        }

        deleteMutation({ id: String(item.id) });
    }

    useEffect(() => {
        if (isSuccess) {
            if (deleteData?.isDelete) {
                toast.success("Project deleted successfully.");
            } else {
                toast.error("Project deletion failed.");
            }
        } else if (isError) {
            toast.error(
                (deleteError as RTKErrorTypes)?.data?.msg ??
                "An unexpected error occurred while deleting the project."
            );
        }
    }, [isSuccess, isError, deleteData, deleteError]);



    return (
        <div key={item?.id} className="bg-white/5 rounded-2xl p-3">
            <Toaster />
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="md:size-12 size-8 bg-white/5 rounded-full border border-white/5 relative">
                        <img src={item?.image} alt={item?.name} className=" object-contain" />
                        {
                            item?.isVerified &&
                            <div className="size-3 rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                        }
                    </div>
                    <div>
                        <p className="font-monda text-xl line-clamp-1 capitalize">{item?.name}</p>
                        <p className="font-montserrat text-xs line-clamp-1 opacity-60">{new Date(item?.launchDate).toLocaleDateString("en-GB")} - <a className="text-xs font-medium text-white" href={`/detail/${item?.slug}`}>Details</a></p>
                    </div>
                </div>
                <Link to={`/more-info/${item?.slug}`} className="font-montserrat text-sm font-medium bg-white/10 p-1 px-4 rounded-md cursor-pointer">More</Link>
            </div>
            <div className="p-3 bg-white/5 rounded-md">
                <p className="font-montserrat text-xs line-clamp-3 relative overflow-hidden">{item?.description}</p>
            </div>

            {
                deleteIsLoading ?
                    <button
                        className="bg-[#8A0000] text-white font-monda text-sm cursor-pointer border border-red-700 py-2 rounded-sm mt-5 w-full">
                        <span className="loading loading-spinner loading-md"></span>
                    </button>
                    :
                    <button
                        onClick={handleDelete}
                        className="bg-[#8A0000] text-white font-monda text-sm cursor-pointer border border-red-700 py-2 rounded-sm mt-5 w-full">Delete</button>
            }
        </div>
    )
}

const LoadingSkelaton = () => (
    <div className="bg-white/5 rounded-2xl p-3">
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 size-8 md:size-12 object-contain" />
                <div>
                    <p className="w-24 md:w-32 h-6 bg-white/10 rounded-md" />
                    <p className="w-16 md:w-20 h-4 mt-2 bg-white/10 rounded-md" />
                </div>
            </div>
            <button className="w-12 md:w-20 h-6 bg-white/10 rounded-md" />
        </div>
        <p className="w-full h-20 bg-white/10 p-3 rounded-md" />
    </div>
);