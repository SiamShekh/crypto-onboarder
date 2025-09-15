import { FieldValues, useForm } from "react-hook-form";
import admin from "../../api/Admin";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const [mutation, { status, isLoading }] = admin.LoginUser();
    const navigate = useNavigate();

    const handleForm = (e: FieldValues) => {
        if (isLoading) {
            return;
        }

        mutation(e);
    }

    useEffect(() => {
        switch (status) {
            case QueryStatus.fulfilled:
                toast.success("Admin logged in successfully");
                navigate("/admin", { replace: true });
                break;

            case QueryStatus.rejected:
                toast.error("Something went wrong.")
                break;
        }
    }, [status, navigate])

    return (
        <div data-theme="night" className="flex items-center justify-center min-h-screen w-full p-3">
            <div data-theme="light" className="p-4 font-monda bg-white w-md rounded-2xl">
                <p className="text-center font-semibold">Login</p>

                <form onSubmit={handleSubmit(handleForm)} className="">
                    <div className="mt-4">
                        <label className="text-xs mb-1 text-black/60">Email*</label>
                        <input
                            placeholder="Email"
                            {...register("email")}
                            className="border border-black/10 outline-none w-full p-3 rounded-sm text-sm"
                            type="email" />
                    </div>

                    <div className="mt-2">
                        <label className="text-xs mb-1 text-black/60">Password*</label>
                        <input
                            placeholder="Password"
                            {...register("password")}
                            className="border border-black/10 outline-none w-full p-3 rounded-sm text-sm"
                            type="text" />
                    </div>

                    <div className="flex items-center justify-center mt-5">
                        {
                            isLoading ?
                                <button type="button" className="bg-black text-white px-10 py-2 rounded-md mx-auto cursor-pointer text-sm">
                                    <span className="loading loading-spinner loading-sm"></span>
                                </button> :
                                <button type="submit" className="bg-black text-white px-10 py-2 rounded-md mx-auto cursor-pointer text-sm">Login</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;