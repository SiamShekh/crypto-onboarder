import icon from "../assets/icon.png";
import profile_vector from "../assets/profile_vector.svg";
import profile_left_vector from "../assets/profile_left_vector.png";
import profile_right_vector from "../assets/profile_right_vector.png";
import { HiWallet } from "react-icons/hi2";
import { IoMdPeople } from "react-icons/io";
import help_desk_icon from "../assets/help_desk_3d.webp";
import { FaChevronRight } from "react-icons/fa";
import tap_element from "../assets/tap_element.webp";
import star_effect from "../assets/tap_bg_star.png";
import tapgame from "../api/Tap";
import { useContext, useEffect, useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { ContextValues } from "../utils/ContextApi";
import moment from "moment";

const Game = () => {
    const newTapMutation = tapgame.newTap();
    const values = useContext(ContextValues);

    const [tapInfo, setTapInfo] = useState<{ tap: number, coin: number, lastTapAt: Date }>({
        coin: 0,
        lastTapAt: new Date(),
        tap: 0
    });

    const tap = (e: React.PointerEvent<HTMLDivElement>) => {
        const body = document.getElementById("body");
        const paragraph = document.createElement("p");
        paragraph.className = "font-bebas font-semibold clickAnimation text-xl absolute z-10";
        paragraph.style.top = `${e.clientY}px`;
        paragraph.style.left = `${e.clientX}px`;
        paragraph.textContent = "+1";
        paragraph.style.color = "#000000";
        body?.appendChild(paragraph);

        setTapInfo({ coin: tapInfo?.coin + 1, tap: tapInfo?.tap + 1, lastTapAt: new Date() });

        setTimeout(() => {
            body?.removeChild(paragraph);
        }, 1000);
    }

    const claimHandler = () => {
        if (tapInfo?.coin === 0) {
            return;
        }

        if (newTapMutation[1]?.isLoading) {
            return;
        }

        newTapMutation[0]({
            jwtToken: btoa(JSON.stringify(tapInfo)),
        });
    }

    useEffect(() => {
        switch (newTapMutation[1]?.status) {
            case QueryStatus.fulfilled:
                if (newTapMutation[1]?.data?.userTgId) {
                    setTapInfo({
                        coin: tapInfo.coin - newTapMutation[1]?.data?.reward,
                        tap: tapInfo.tap,
                        lastTapAt: tapInfo?.lastTapAt
                    })
                }
                break;

            case QueryStatus.rejected:
                toast.error(`Something went wrong`);
                break;
        }
    }, [newTapMutation[1]?.status])

    return (
        <div id="body" className="h-screen font-montserrat relative">
            <div className="relative p-2 z-10">
                <img
                    className="absolute z-0 object-cover rounded-xl inset-0 w-full h-full"
                    src={profile_vector}
                    alt="profile vector" />

                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <img src={icon} alt="icon" className="size-10 border border-white/10 rounded-full" />
                        <div>
                            <p className="font-medium">{values?.user?.data?.name}</p>
                            <p className="text-xs opacity-50">
                                {values?.user?.data?.joinedAt ? moment(values.user.data.joinedAt).fromNow() + ' joined': 'Unknown join date'}
                            </p>
                        </div>
                    </div>
                    <button className="text-xs bg-blue-800 p-2 rounded-xl font-medium">Connect Wallet</button>
                </div>

                <div className="flex items-center justify-between w-full mt-2">
                    <div className="relative">
                        <img
                            className="w-24 opacity-50"
                            src={profile_left_vector}
                            alt="profile left vector" />
                        <div className="absolute inset-0 flex items-center p-2 gap-2">
                            <HiWallet className="text-2xl" />
                            <div>
                                <p className="text-sm font-medium">$28</p>
                                <p className="text-xs opacity-60">Stake</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            className="w-24 opacity-50"
                            src={profile_right_vector}
                            alt="profile left vector" />
                        <div className="absolute inset-0 flex items-center p-2 gap-2">
                            <IoMdPeople className="text-2xl" />
                            <div>
                                <p className="text-sm font-medium">{values?.user?.data?.frens}</p>
                                <p className="text-xs opacity-60">Frens</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-[50%] -translate-x-[50%]">
                    <div className="flex items-center justify-center gap-1">
                        <img src={icon} alt="icon" className="size-8" />
                        <p className="font-medium">{values?.user?.data?.balance}</p>
                    </div>
                    <p className="text-xs text-center opacity-60">Your rank no: {values?.user?.data?.rank}</p>
                </div>

            </div>
            <div className="bg-cyan-500 size-60 absolute z-0 blur-[100px]" />
            <div className="relative flex items-center justify-between z-10 bg-white/10 p-2 mt-4 rounded-xl">
                <div className="flex items-center gap-3">
                    <img
                        className="size-10 rounded-xl"
                        src={help_desk_icon}
                        alt="help desk" />
                    <div>
                        <p className="text-base font-medium">Meaw is hiring</p>
                        <p className="text-xs opacity-70">Up to $5000/month</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-transparent to-cyan-500 p-1 rounded-full">
                    <FaChevronRight className="text-white text-2xl" />
                </div>
            </div>
            <div
                onPointerDown={tap}
                className="relative z-10 overflow-hidden">
                <img src={star_effect} alt="star" className="absolute" />
                <img
                    className="relative z-10 scale-50"
                    src={tap_element}
                    draggable={false}
                    alt="tap element" />
            </div>
            {
                tapInfo &&
                <button onClick={claimHandler} className="absolute z-30 bottom-20 left-[50%] -translate-x-[50%] text-sm bg-cyan-400 text-black font-medium px-3 py-1 cursor-pointer rounded-full"> Claim {tapInfo?.coin || 0} Meaw</button>
            }
        </div>
    );
};

export default Game;