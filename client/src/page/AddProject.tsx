import { FaPlus } from "react-icons/fa";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import project from "../api/Project";
import UploadImage from "../utils/UploadImage";
import { toast } from "sonner";
import { QueryStatus } from "@reduxjs/toolkit/query";

const AddProject = () => {
    const { watch, register, reset, resetField, handleSubmit } = useForm();
    const [addProject, { status }] = project.NewProject();
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
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
                label: "Logo image (upload)",
                placeholder: "Upload logo",
                field_type: "file",
                key: "logo_image",
                default_value: "",
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
            {
                label: "Website",
                placeholder: "https://...",
                field_type: "url",
                key: "task.0",
                default_value: "",
                col_span: 2
            },
            {
                label: "X (Twitter) link",
                placeholder: "https://twitter.com/yourproject",
                field_type: "url",
                key: "task.1",
                default_value: "",
                col_span: 2
            },
            {
                label: "Telegram link",
                placeholder: "https://t.me/yourchannel",
                field_type: "url",
                key: "task.2",
                default_value: "",
                col_span: 2
            },
        ]
    });

    const handleAddField = async (e: FieldValues) => {
        setIsLoading(true);
        Promise.resolve(UploadImage(e?.logo_image[0]))
            .then(async (img) => {
                if (img === undefined) {
                    toast.error("Image upload failed");
                    return;
                }
                toast.success("Image uploaded successfully");
                addProject({
                    name: e.name,
                    tagline: e.tagline,
                    logo_image: img,
                    reward: e.reward,
                    task: e?.task
                })
            })
            .catch(() => {
                toast.error("Image upload failed");
            });
    }


    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                toast.success("Project added successfully");
                reset();
                setIsLoading(false);
                break;

            case QueryStatus.rejected:
                toast.error("Failed to add project");
                setIsLoading(false);
                break;

            case QueryStatus.pending:
                setIsLoading(true);
                break;
        }
    }, [status, reset])



    return (
        <div>
            
            {
                isLoading &&
                <div className="fixed w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md" />
                </div>
            }

            <form onSubmit={handleSubmit(handleAddField)} className="max-w-7xl mx-auto font-montserrat">
                <p className="font-medium text-4xl text-white text-center my-5">Add your project</p>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl grid grid-cols-2 gap-6">
                    {
                        formFields.project_info.map((field, index) => (
                            <div key={index} className={`col-span-${field?.col_span}`}>
                                <p className="text-xs">{field?.label}</p>
                                <input required {...register(field?.key)} type={field?.field_type} placeholder={field.placeholder} className="p-3 border outline-none border-white/10 bg-white/5 mt-1 rounded-md w-full" />
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
                        isLoading ?
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
                                        key: "task." + (formFields.social_info.length + 1),
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

export default AddProject;
