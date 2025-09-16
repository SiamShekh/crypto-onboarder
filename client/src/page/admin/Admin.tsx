import { useForm } from "react-hook-form";
import { toast } from "sonner";
import admin from "../../api/Admin";
import { useContext, useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { RTKErrorTypes } from "../..";
import { ContextValuesAdmin } from "../../utils/ContextApiAdmin";

const Admin = () => {
    const { setValue, watch, } = useForm();
    const [mutation, { status, error, isLoading }] = admin.ChangePassword();
    const values = useContext(ContextValuesAdmin);

    const handleChangePassword = () => {
        if (!watch("password")) {
            toast.error("Enter a strong password.");
        }

        (document.getElementById('changePassword') as HTMLDialogElement).showModal();
    }

    const handleChange = () => {
        mutation({ password: watch("password") })
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                toast.success("Successfully changed password.");
                (document.getElementById('changePassword') as HTMLDialogElement).close();
                break;

            case QueryStatus.rejected:
                toast.error((error as RTKErrorTypes)?.data?.msg);
                break;
        }
    }, [status, error])

    return (
        <div className="p-3">

            <dialog id="changePassword" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change password!</h3>
                    <p className="py-4">Are you sure you want to change password?</p>
                    {
                        isLoading ?
                            <button type="button"
                                className="text-center w-full bg-white text-black p-2 mt-5 rounded-full font-roboto">
                                <span className="loading loading-spinner loading-md"></span>
                            </button> :
                            <button type="button"
                                onClick={handleChange}
                                className="text-center w-full bg-white text-black p-2 mt-5 rounded-full font-roboto">Update Password</button>
                    }

                    <button type="button" onClick={() => {
                        (document.getElementById('changePassword') as HTMLDialogElement).close();
                    }} className="text-center w-full p-2 mt-5 rounded-full font-roboto cursor-pointer">Go back</button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className="max-w-md bg-white/10 rounded-xl p-3">
                <p className="font-medium font-montserrat text-center">Change Password</p>

                <div className="mt-5">
                    <p className="text-xs">Email</p>
                    <input
                        className="bg-white/10 text-white outline-none font-opensans w-full p-2 mt-1 rounded-lg"
                        value={values?.user?.data?.email}
                        readOnly
                        type="text" />
                </div>

                <div className="mt-3">
                    <p className="text-xs">Password</p>
                    <input
                        className="bg-white/10 text-white font-opensans w-full p-2 mt-1 rounded-lg"
                        placeholder={"Enter password"}
                        // value={watch("password")}
                        onChange={(e) => setValue("password", e?.target.value)}
                        type="text" />
                </div>

                <button onClick={handleChangePassword} type="button" className="text-center w-full bg-white text-black p-2 mt-5 rounded-full font-roboto">Update Password</button>
            </div>
        </div>
    );
};

export default Admin;