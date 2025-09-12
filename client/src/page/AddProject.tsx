import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UploadImage from "../utils/UploadImage";
import project from "../api/Project";
import { QueryStatus } from "@reduxjs/toolkit/query";
import InputField from "../components/item/InputField";
import { RTKErrorTypes } from "..";
import { Link, useNavigate } from "react-router-dom";

const AddProject = () => {
    const method = useForm();
    const [addProject, { status, data: projectData, error: errorProject }] = project.NewProject();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = method.handleSubmit((data) => {
        if (Number(data?.logo[0]?.size || 0) > 524288) {
            toast.error("File size exceeds 512 KB");
            return;
        }

        setIsLoading(true);

        Promise.resolve(UploadImage(data?.logo[0]))
            .then(async (img) => {
                if (img === undefined) {
                    toast.error("Image upload failed");
                    return;
                }

                addProject({
                    name: data.name,
                    launchDate: data.launch_date,
                    logo_image: img,
                    reward: data.reward,
                    task: data?.task,
                    description: data?.description
                })
            })
            .catch(() => {
                setIsLoading(false)
                toast.error("Image upload failed");
            });
    });

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                setIsLoading(false);

                (document.getElementById('project') as HTMLDialogElement).showModal();

                if (projectData?.status === "success") {
                    toast.success("Project added successfully");
                    method.reset();
                } else {
                    toast.error("Something went wrong");
                }
                break;

            case QueryStatus.rejected:
                toast.error((errorProject as RTKErrorTypes)?.data?.msg || "Failed to add project");
                setIsLoading(false);
                break;

            case QueryStatus.pending:
                setIsLoading(true);
                break;
        }
    }, [status, method.reset, errorProject, method, projectData])

    return (
        <div className="p-3">

            {
                isLoading &&
                <div className="fixed w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md" />
                </div>
            }

            {/* <button className="btn" onClick={() => document.getElementById('project').showModal()}>open modal</button> */}
            <dialog id="project" className="modal">
                <div className="modal-box">
                    <p className="font-opensans text-[#c1ff72] text-xl text-center font-medium">Your project is now live on WhyBuy 🎉</p>
                    <p className="my-3 text-center font-montserrat text-sm">To increase visibility and build trust, you can now:</p>
                    <p className="font-montserrat text-center font-medium text-yellow-400 text-xs">Add your official social handles (X, Telegram, Discord, Website, etc..)</p>
                    <p className="font-montserrat text-center font-medium text-yellow-400 text-xs my-1">Create social tasks for users (Follow, Join, Retweet, Visit, etc..)</p>
                    <p className="font-montserrat text-center font-medium text-yellow-400 text-xs my-1">Engage the community and boost your project's credibility before launch.</p>
                    <button
                        onClick={() => {
                            navigate(`/more-info/${projectData?.data?.slug}`);
                            (document.getElementById('project') as HTMLDialogElement).close();
                        }}
                        className="text-[#c1ff72] text-center border p-3 cursor-pointer w-full mt-5 rounded-xl border-white/20 text-sm">Add Social Tasks</button>
                </div>
            </dialog>

            <FormProvider {...method}>
                <form onSubmit={onSubmit} className="max-w-7xl mx-auto font-montserrat">
                    <p className="font-medium text-4xl text-white text-center my-5">Add your project</p>
                    <div className="bg-white/5 p-3 rounded-md grid grid-cols-2 gap-6">

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
                            fieldType="file"
                            registerKey={"logo"}
                            className="p-3 outline-none bg-white/5 mt-1 rounded-md w-full"
                            label="Select Logo"
                            required
                            fieldPlaceholder="logo"
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
                                        value: 200,
                                        message: `Maximum 200 characters allowed.`
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

                        <div className="flex items-center gap-2 col-span-full">
                            <input type="checkbox" {...method.register("checkbox")} required className="checkbox" />
                            <p>I have read and agreed to the <Link to={"/terms"} className="font-medium underline">terms of use</Link></p>
                        </div>
                    </div>


                    <div className="flex items-center justify-center">
                        {
                            isLoading ?
                                <button type="button" className="bg-white text-black w-96 py-2 cursor-pointer font-medium rounded-full mx-auto my-5">
                                    <span className="loading loading-spinner loading-md"></span>
                                </button> :
                                <button
                                    disabled={!method.watch("checkbox")}
                                    type="submit"
                                    className="disabled:bg-white/30 bg-white text-black w-96 py-2 cursor-pointer font-medium rounded-full mx-auto my-5">Submit</button>
                        }
                    </div>

                </form>
            </FormProvider>
        </div>
    );
};

export default AddProject;

