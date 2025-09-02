import { useContext, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { miniApp, openTelegramLink } from "@telegram-apps/sdk";
import { ContextValues } from "../utils/ContextApi";
import telegram from "../api/Telegram";
import { CHANNEL_LINK, CHANNEL_USERNAME } from "../constant";
import icon from "../assets/icon.png";
import user from "../api/User";
import { useNavigate } from "react-router-dom";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const Introduction = () => {
    const text_count = useRef<HTMLParagraphElement | null>(null);
    const day_count = useRef<HTMLParagraphElement | null>(null);
    const values = useContext(ContextValues);
    const channelInfo = telegram.channel.query(CHANNEL_USERNAME);
    const taskContainer = useRef(null);
    const count_frame = useRef(null);
    const [isJoin, setJoin] = useState(false);
    const [isJoinClickLoading, setJoinClickLoading] = useState(false);
    const verifyChannelJoiningMutation = user.verifyChannelJoining();
    const navigate = useNavigate();

    useEffect(() => {
        if (!values?.user?.isLoading) {
            const obj = { val: 0 };
            gsap.to(obj, {
                val: values?.user?.data?.balance,
                duration: 2,
                ease: "none",
                onUpdate: () => {
                    if (text_count.current) {
                        text_count.current.textContent = Math.floor(obj.val).toString();
                    }
                },
                onComplete: () => {
                    gsap.fromTo(count_frame.current, {
                        height: '100vh',
                        width: '100vw',
                    }, {
                        height: '60vh',
                        duration: 2,
                        borderBottomLeftRadius: '30px',
                        borderBottomRightRadius: '30px',
                        onComplete: () => {
                            gsap.fromTo(day_count.current, {
                                opacity: '0%',
                                display: 'block'
                            }, {
                                opacity: '60%',
                                duration: 2,
                                onComplete: () => {
                                    gsap.fromTo(count_frame.current, {
                                        height: '60vh'
                                    }, {
                                        height: '0vh',
                                        duration: 2,
                                        onComplete: () => {
                                            if (miniApp.mountSync.isAvailable() && !miniApp.isMounted()) {
                                                miniApp.mountSync();
                                            }

                                            if (miniApp.setHeaderColor.isAvailable()) {
                                                miniApp.setHeaderColor('#000000');
                                            }

                                            if (miniApp.setBottomBarColor.isAvailable()) {
                                                miniApp.setBottomBarColor('#000000');
                                            }

                                            gsap.fromTo(taskContainer.current, {
                                                display: "none",
                                                opacity: '0%'
                                            }, {
                                                display: "block",
                                                ease: "none",
                                                duration: 2,
                                                opacity: "100%"
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }
    }, [values])

    useEffect(() => {
        if (miniApp.mountSync.isAvailable() && !miniApp.isMounted()) {
            miniApp.mountSync();
        }

        if (miniApp.setHeaderColor.isAvailable()) {
            miniApp.setHeaderColor('#d6f400');
        }

        if (miniApp.setBottomBarColor.isAvailable()) {
            miniApp.setBottomBarColor('#000000');
        }
    }, [])

    useEffect(() => {
        if (isJoinClickLoading) {
            setTimeout(() => {
                setJoinClickLoading(false);
            }, 3000);
        }
    }, [isJoinClickLoading])

    useEffect(() => {
        switch (verifyChannelJoiningMutation[1]?.status) {
            case QueryStatus.fulfilled:
                if (verifyChannelJoiningMutation[1]?.isSuccess && verifyChannelJoiningMutation[1]?.data?.status && values?.user?.data?.isChannelJoined) {
                    navigate("/app");
                }
                break;

            case QueryStatus.rejected:

                break;
        }

    }, [navigate, values?.user?.data?.isChannelJoined, verifyChannelJoiningMutation])

    return (
        <div className="h-screen overflow-hidden relative" data-theme="black">
            {
                (values?.user?.isLoading || channelInfo?.isFetching) &&
                <div className="fixed z-50 w-full h-screen flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm" />
                </div>
            }
            <div
                ref={count_frame}
                className="h-screen w-full flex items-center justify-center text-black flex-col font-monda bg-[#d6f400] object-cover"
            >
                <p
                    ref={text_count}
                    className="text-8xl font-black">400</p>
                <p className="text-2xl">MEAW</p>
            </div>

            <div className="p-3 h-[40vh] w-full flex items-center justify-center flex-col gap-5">
                <p
                    ref={day_count}
                    className="hidden font-bebas text-9xl text-center mx-auto w-fit">Day 1</p>

                <div className="hidden  pt-20" ref={taskContainer}>
                    <img src={icon} alt="meaw" className="size-24 border border-white/10 mb-5 bg-white/10 rounded-full mx-auto" />

                    <p className="text-center font-medium font-montserrat text-2xl">{channelInfo?.data?.result?.title}</p>
                    <p className="text-center mb-4 font-montserrat text-sm opacity-50">+{values?.user?.data?.balance} MEAW</p>

                    <div className="grid grid-cols-3 gap-2 items-center mb-4">
                        <div className="bg-white/10 flex items-center text-blue-400 flex-col rounded-xl p-2">
                            <MdOutlineTipsAndUpdates className="text-2xl" />
                            <p className="font-montserrat text-xs">update</p>
                        </div>
                        <div className="bg-white/10 flex items-center text-blue-400 flex-col rounded-xl p-2">
                            <FaNewspaper className="text-2xl" />
                            <p className="font-montserrat text-xs">news</p>
                        </div>
                        <div className="bg-white/10 flex items-center text-blue-400 flex-col rounded-xl p-2">
                            <IoIosMore className="text-2xl" />
                            <p className="font-montserrat text-xs">more</p>
                        </div>
                    </div>

                    <div className="bg-white/10 p-2 rounded-xl font-montserrat mb-5">
                        <div>
                            <p className="text-xs">channel link</p>
                            <p className="text-blue-400 text-sm">{channelInfo?.data?.result?.invite_link}</p>
                        </div>
                        <div className="w-full h-[1px] my-2 bg-white/10" />
                        <p className="text-xs">description</p>
                        <p className="text-white text-sm">{channelInfo?.data?.result?.description}</p>
                    </div>

                    {(isJoinClickLoading || verifyChannelJoiningMutation[1]?.isLoading) ?
                        <button className="bg-white/10 text-white p-3 rounded-xl text-sm font-montserrat w-full">
                            <span className="loading loading-spinner loading-sm" />
                        </button> :
                        isJoin ?
                            <button
                                onClick={() => {
                                    verifyChannelJoiningMutation[0](undefined);
                                }}
                                className="bg-white/10 text-white p-3 rounded-xl text-sm font-montserrat w-full">Check</button> :
                            values?.user?.data?.isChannelJoined ?
                                <button
                                    onClick={() => navigate("/app")}
                                    className="bg-white/10 text-white p-3 rounded-xl text-sm font-montserrat w-full">Next</button> :
                                <button
                                    onClick={() => {
                                        openTelegramLink(CHANNEL_LINK);
                                        setJoin(true);
                                        setJoinClickLoading(true);
                                    }}
                                    className="bg-white/10 text-white p-3 cursor-pointer rounded-xl text-sm font-montserrat w-full">Join</button>
                    }
                </div>

            </div>
        </div>
    );
};

export default Introduction;