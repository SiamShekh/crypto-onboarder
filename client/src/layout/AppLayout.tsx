import { Outlet, useNavigate } from "react-router-dom";
import BottomDock from "../components/one-time/BottomDock";
import { useContext, useEffect } from "react";
import { ContextValues } from "../utils/ContextApi";
import Modal from "../components/item/Modal";
import refer_img from "../assets/Hands4Friends_AgADpQEAAhZCawo.gif";
import hand_shake_icon from "../assets/hand-shake-emoji.svg";
import usdt_emoji from "../assets/usdt_emoji.svg";
import robot_emoji from "../assets/robot_emoji.svg";
import user from "../api/User";
import { hapticFeedbackImpactOccurred } from "@telegram-apps/sdk";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const AppLayout = () => {
    const values = useContext(ContextValues);
    const referAlart = user.seenReferAlart();
    const navigate = useNavigate();

    useEffect(() => {
        switch (referAlart[1]?.status) {
            case QueryStatus.fulfilled:
                navigate("/app/earn?page=refer");
                break;

            case QueryStatus.rejected:
                toast.error("Something went wrong, try again");
                break;
        }
    }, [referAlart, navigate])

    return (
        <div draggable={false} data-theme="black" className="min-h-screen px-3">
            {
                !values?.user?.data?.isReferAlartShow &&
                <Modal
                    isBlurEffectClose
                    content={
                        <div>
                            <img src={refer_img} alt="refer_image" className="size-60 mx-auto" />
                            <div className="bg-white/10 p-4 rounded-2xl mt-2">
                                <div className="flex items-center gap-2">
                                    <img
                                        className="size-14"
                                        src={hand_shake_icon}
                                        alt="hand shake icon" />

                                    <div>
                                        <p className="text-white text-sm">Earn $0.10 USDT for each friend you invite.</p>
                                        <div className="text-white/40 text-xs flex items-center gap-1">
                                            <img src={usdt_emoji} alt="usdt" className="size-4" />
                                            <span>0.1$ per friend</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-white/10 my-3"></div>

                                <div className="flex items-center gap-2">
                                    <img
                                        className="size-14"
                                        src={robot_emoji}
                                        alt="hand shake icon" />

                                    <div>
                                        <p className="text-white text-sm">Get $0.20 USDT per friend if you're a moderator</p>
                                        <div className="text-white/40 text-xs flex items-center gap-1">
                                            <img src={usdt_emoji} alt="usdt" className="size-4" />
                                            <span>0.2$ per friend</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                referAlart[1]?.isLoading ?
                                    <button
                                        onClick={() => {
                                            if (hapticFeedbackImpactOccurred.isAvailable()) {
                                                hapticFeedbackImpactOccurred('medium');
                                            }
                                        }}
                                        className="bg-white/10 p-3 rounded-2xl w-full mt-3 font-montserrat text-white">
                                        <span className="loading loading-spinner loading-lg"></span>
                                    </button> :
                                    <button
                                        onClick={() => {
                                            referAlart[0](undefined);
                                        }}
                                        className="bg-white/10 p-3 rounded-2xl w-full mt-3 font-montserrat text-white">Okay, I want refer friend</button>
                            }

                        </div>
                    }
                />
            }
            <Outlet />
            <BottomDock />
        </div>
    );
};

export default AppLayout;