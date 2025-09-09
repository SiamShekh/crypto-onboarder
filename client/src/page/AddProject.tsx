import { FaPlus } from "react-icons/fa";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UploadImage from "../utils/UploadImage";
import project from "../api/Project";
import { QueryStatus } from "@reduxjs/toolkit/query";

interface field {
    fieldType?: React.HTMLInputTypeAttribute,
    fieldPlaceholder: string,
    registerKey: string,
    maxLength?: number,
    minLength?: number,
    required?: boolean,
    className?: string,
    label: string
}

const AddProject = () => {
    const method = useForm();
    const [formFields, setFormFields] = useState<field[]>([]);
    const [addProject, { status }] = project.NewProject();
    const [isLoading, setIsLoading] = useState(false);

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
                toast.success("Project added successfully");
                method.reset();
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
    }, [status, method.reset])


    return (
        <div className="p-3">

            {
                isLoading &&
                <div className="fixed w-full flex items-center justify-center">
                    <span className="loading loading-spinner loading-md" />
                </div>
            }

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

                        <InputField
                            fieldType="url"
                            registerKey={"task.0"}
                            className="p-3 outline-none bg-white/5 mt-1 rounded-md w-full"
                            label="X Profile"
                            fieldPlaceholder="Enter X Handle"
                            required
                        />
                        {
                            formFields.map((field, index) => (
                                <InputField
                                    key={index}
                                    fieldType={field?.fieldType}
                                    registerKey={`task.${index + 1}`}
                                    className="p-3 outline-none bg-white/5 mt-1 rounded-md w-full"
                                    label={field?.label}
                                    fieldPlaceholder={field?.fieldPlaceholder}
                                />
                            ))
                        }

                        <div
                            onClick={() => (document.getElementById('add_field') as HTMLFormElement).showModal()}
                            className={`bg-white/5 flex gap-2 justify-center items-center col-span-full p-3 rounded-md h-full cursor-pointer`}>
                            <FaPlus />
                            <p>Add Custom Task</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        {
                            // isLoading ?
                            //     <button type="button" className="bg-white/5 px-10 py-2 cursor-pointer font-medium rounded-2xl mx-auto my-5">
                            //         <span className="loading loading-spinner loading-md"></span>
                            //     </button> :
                            <button type="submit" className="bg-white/5 px-10 py-2 cursor-pointer font-medium rounded-2xl mx-auto my-5">Submit</button>
                        }
                    </div>

                </form>
            </FormProvider>

            <dialog id="add_field" className="modal">
                <div className="modal-box">
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full mx-auto border p-4">
                        <legend className="fieldset-legend">Page details</legend>

                        <label className="label">Label</label>
                        <input {...method.register("add_label")} required type="text" className="input w-full" placeholder="Enter task label" />

                        <button
                            onClick={() => {
                                const newLabel = method.watch("add_label");

                                if (newLabel) {
                                    const newField: field = {
                                        fieldType: "text",
                                        registerKey: "task." + ((formFields?.length || 0) + 1),
                                        label: newLabel,
                                        fieldPlaceholder: "Enter " + newLabel,
                                    };

                                    // Update the state (immutable way)
                                    setFormFields([...formFields, newField]);

                                    method.resetField("add_label");
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


const InputField = ({ fieldType, fieldPlaceholder, registerKey, maxLength, minLength, className, label, required }: { fieldType?: React.HTMLInputTypeAttribute, fieldPlaceholder: string, registerKey: string, maxLength?: number, minLength?: number, required?: boolean, className?: string, label: string }) => {

    const { register, formState: { errors, } } = useFormContext();

    return (
        <div>
            <p className="text-xs">{label}</p>
            <input
                type={fieldType}
                placeholder={fieldPlaceholder}
                {...register(registerKey, {
                    ...(maxLength && {
                        maxLength: {
                            value: maxLength,
                            message: `Maximum ${maxLength} characters allowed.`
                        }
                    }),
                    ...(minLength && {
                        minLength: {
                            value: minLength,
                            message: `Minimum ${minLength} characters required.`
                        }
                    }),
                    ...(required && {
                        required: {
                            message: `${label} is required`,
                            value: true
                        }
                    }),
                })}
                className={className}
            />
            {errors[registerKey] && (
                <p className="text-xs text-red-500 line-clamp-1 mt-1">{errors[registerKey]?.message as string}</p>
            )}
        </div>
    )
}