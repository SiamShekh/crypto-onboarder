import { useParams } from "react-router-dom";
import project from "../api/Project";
import { FieldValues, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

interface FormFields {
    project_info: {
        label: string;
        placeholder: string,
        field_type: string,
        key: string,
        default_value: string,
        col_span: number
    }[],
    social_info: {
        label: string;
        placeholder: string,
        field_type: string,
        key: string,
        default_value: string,
        col_span: number
    }[],
}

const EditProject = () => {
    const param = useParams();
    const { data, isFetching, status } = project.getSpecificProject.use({ id: param?.id as string });
    const { handleSubmit, register, watch, resetField, reset } = useForm();
    const [updateProjectMutation,{status: updateProjectStatus}] = project.UpdateProject();

    const [formFields, setFormFields] = useState<FormFields>({
        project_info: [
            {
                label: "Name",
                placeholder: "FROG",
                field_type: "text",
                key: "name",
                default_value: "FROG",
                col_span: 1
            },
            {
                label: "Tagline",
                placeholder: "solana",
                field_type: "text",
                key: "tagline",
                default_value: "solana",
                col_span: 1
            },
            {
                label: "Reward",
                placeholder: "100000 Tokens",
                field_type: "text",
                key: "reward",
                default_value: "100000 Tokens",
                col_span: 2
            }
        ],
        social_info: [
        ]
    });

    const addYourProject = async (e: FieldValues) => {
        updateProjectMutation({ id: String(param?.id), body: {
            name: e?.name,
            tagline: e?.tagline,
            reward: e?.reward,
            task: e?.task,
        } });
    }

    useEffect(() => {
        if (status === QueryStatus.fulfilled && data) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const defaultValues: Record<string, any> = {};

            formFields.project_info.forEach((field) => {
                defaultValues[field.key] = data[field.key];
            });

            // Dynamically build task fields
            const socialFields = data.task?.map((taskLink: string, index: number) => {
                const key = `task.${index}`;
                defaultValues[key] = taskLink;

                return {
                    label: `Task ${index + 1}`,
                    placeholder: "Enter Task Link",
                    field_type: "text",
                    key,
                    default_value: taskLink,
                    col_span: 2,
                };
            }) || [];

            setFormFields((prev) => ({
                ...prev,
                social_info: socialFields,
            }));

            // setTaskCount(socialFields.length);
            reset(defaultValues); // Load default values into form
        }
    }, [status,data, formFields.project_info, reset]);

    useEffect(()=>{
        switch (updateProjectStatus) {
            case QueryStatus.fulfilled:
                toast.success("Project updated successfully");
                break;
        
            case QueryStatus.rejected:
                toast.error("Failed to update project");
                break;
        }
    },[updateProjectStatus])

    return (
        <div>
            {
                isFetching &&
                <div className="fixed w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md" />
                </div>
            }

            <form onSubmit={handleSubmit(addYourProject)} className="max-w-7xl mx-auto font-montserrat">
                <p className="font-medium text-4xl text-white text-center my-5">Add your project</p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl grid grid-cols-2 gap-6">
                    {
                        formFields.project_info.map((field, index) => (
                            <div key={index} className={`col-span-${field?.col_span}`}>
                                <p className="text-xs">{field?.label}</p>
                                <input required {...register(field?.key)} defaultValue={data?.[field?.key]} type={field?.field_type} placeholder={field.placeholder} className="p-3 border outline-none border-white/10 bg-white/5 mt-1 rounded-md w-full" />
                            </div>
                        ))
                    }

                    {
                        formFields.social_info.map((field, index) => (
                            <div key={index} className={`col-span-${field?.col_span}`}>
                                <p className="text-xs">Task:: {field?.label}</p>
                                <input required {...register(field?.key)} type={field?.field_type} placeholder={field.placeholder} className="p-3 border outline-none border-white/10 bg-white/5 mt-1 rounded-md w-full" />
                            </div>
                        ))
                    }

                    <div
                        onClick={() => (document.getElementById('add_field') as HTMLFormElement).showModal()}
                        className={`bg-white/5 flex gap-2 justify-center items-center p-3 rounded-md h-full cursor-pointer`}>
                        <FaPlus />
                        <p>Add Custom Task</p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    {
                        isFetching ?
                            <button type="button" className="bg-white/5 px-10 py-2 cursor-pointer font-medium rounded-2xl mx-auto my-5">
                                <span className="loading loading-spinner loading-md"></span>
                            </button> :
                            <button type="submit" className="bg-white/5 px-10 py-2 cursor-pointer font-medium rounded-2xl mx-auto my-5">Submit</button>
                    }
                </div>

            </form>

            <dialog id="add_field" className="modal">
                <div className="modal-box">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full mx-auto border p-4">
                        <legend className="fieldset-legend">Page details</legend>

                        <label className="label">Label</label>
                        <input {...register("add_label")} required type="text" className="input w-full" placeholder="Enter task label" />

                        <button
                            onClick={() => {
                                const newLabel = watch("add_label");

                                if (newLabel) {
                                    const newField = {
                                        col_span: 1,
                                        default_value: "",
                                        field_type: "text",
                                        key: "task." + ((formFields.social_info.length - 1) + 1),
                                        label: newLabel,
                                        placeholder: "Enter " + newLabel
                                    };

                                    // Update the state (immutable way)
                                    setFormFields(prev => ({
                                        ...prev,
                                        social_info: [...prev.social_info, newField]
                                    }));

                                    resetField("add_label");
                                    (document.getElementById('add_field') as HTMLFormElement).close();
                                }
                            }}
                            type="button"
                            className="bg-white p-2 mt-4 w-fit mx-auto text-black font-medium rounded-md">Add Field</button>
                    </fieldset>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default EditProject;