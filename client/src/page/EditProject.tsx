import { useParams } from "react-router-dom";
import project from "../api/Project";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import InputField from "../components/item/InputField";

const EditProject = () => {
    const param = useParams();
    const { data, isFetching } = project.getSpecificProject.use({ slug: param?.id as string });
    const method = useForm();
    const [updateProjectMutation, { status: updateProjectStatus, isLoading }] = project.UpdateProject();

    const addYourProject = async (e: FieldValues) => {
        updateProjectMutation({
            id: String(data?.id), body: {
                name: e?.name,
                tagline: e?.tagline,
                reward: e?.reward,
                task: e?.task,
            }
        });
    }

    useEffect(() => {
        switch (updateProjectStatus) {
            case QueryStatus.fulfilled:
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


    return (
        <div>
            {
                isFetching &&
                <div className="fixed w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md" />
                </div>
            }

            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(addYourProject)} className="max-w-7xl mx-auto font-montserrat">
                    <p className="font-medium text-4xl text-white text-center my-5">Edit your project</p>
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
                    </div>

                    <div className="flex items-center justify-center">
                        {
                            isLoading ?
                                <button type="button" className="bg-white/5 px-10 py-2 cursor-pointer font-medium rounded-2xl mx-auto my-5">
                                    <span className="loading loading-spinner loading-md"></span>
                                </button> :
                                <button type="submit" className="bg-white/5 px-10 py-2 cursor-pointer font-medium rounded-2xl mx-auto my-5">Edit</button>
                        }
                    </div>
                </form>
            </FormProvider>
            <div className="divider max-w-7xl mx-auto">OR</div>

        </div>
    );
};

export default EditProject;