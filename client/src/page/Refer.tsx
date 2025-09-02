import { FaChevronRight } from "react-icons/fa";
import hand_shake_icon from "../assets/hand-shake-emoji.svg";
import usdt_emoji from "../assets/usdt_emoji.svg";
import robot_emoji from "../assets/robot_emoji.svg";
import rocket_anim from "../assets/TONEmoji_rocket.gif";
import Modal from "../components/item/Modal";
import { IoCopy } from "react-icons/io5";
import { IoIosShare } from "react-icons/io";
import desk_clashing from "../assets/Orangoutang_desk_clash.gif";
import { copyTextToClipboard, hapticFeedbackImpactOccurred, shareMessage } from "@telegram-apps/sdk";
import { MINI_APP_LINK } from "../constant";
import { useContext, useEffect } from "react";
import { ContextValues } from "../utils/ContextApi";
import { toast } from "sonner";
import telegram from "../api/Telegram";
import { QueryStatus } from "@reduxjs/toolkit/query";
import moment from "moment";

const Refer = () => {
    const values = useContext(ContextValues);
    const shareMessageQuery = telegram.shareMessage.lazy();

    useEffect(() => {
        switch (shareMessageQuery[1]?.status) {
            case QueryStatus.rejected:
                toast.error(`Share message is currently unable, try again.`);
                break;

            case QueryStatus.fulfilled:
                if (shareMessageQuery[1]?.data?.result?.id) {
                    shareMessage(shareMessageQuery[1]?.data?.result?.id);
                } else {
                    toast.error('Retry sometime later')
                }
                break;
        }

    }, [shareMessageQuery])

    return (
        <div className="pb-20">

            <p className="text-white/50 text-sm font-medium">Invite Friends</p>
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
                <Modal
                    button={
                        <div className="flex items-center cursor-pointer mt-5 gap-1 justify-center">
                            <p className="font-medium text-sm">Share link</p>
                            <FaChevronRight className="text-xs" />
                        </div>
                    }
                    content={
                        <>
                            <img src={desk_clashing} alt="desk clash" />
                            {
                                shareMessageQuery[1]?.isFetching ?
                                    <div
                                        onClick={() => {
                                            if (hapticFeedbackImpactOccurred.isAvailable()) {
                                                hapticFeedbackImpactOccurred('medium');
                                            }
                                        }}
                                        className="flex cursor-pointer items-center justify-center gap-2 bg-white/10 w-full p-3 rounded-xl text-sm">
                                        <span className="loading loading-spinner loading-md" />
                                    </div>
                                    :
                                    <div className="flex items-center justify-between gap-2">
                                        <div
                                            onClick={async () => {
                                                await copyTextToClipboard(`${MINI_APP_LINK}?startapp=${values?.user?.data?.tgId}`);
                                                toast.success('Successfully copied.')
                                            }}
                                            className="flex cursor-pointer items-center justify-center gap-2 bg-white/10 w-full p-3 rounded-xl text-sm">
                                            <p>Copy link</p>
                                            <IoCopy className="text-base" />
                                        </div>
                                        <div
                                            onClick={async () => {
                                                await shareMessageQuery[0](undefined);
                                            }}
                                            className="flex cursor-pointer items-center justify-center gap-2 bg-white/10 w-full p-3 rounded-xl text-sm">
                                            <p>Share</p>
                                            <IoIosShare className="text-base" />
                                        </div>
                                    </div>
                            }
                        </>
                    }
                />
            </div>

            <p className="text-white/50 text-sm font-medium mt-5">Friends List <span className="text-white">{values?.user?.data?.frens}</span></p>
            <div className="bg-white/10 p-4 rounded-2xl mt-2 flex items-center justify-center flex-col">
                {
                    values?.user?.data?.friends?.length ?
                        values?.user?.data?.friends?.map((user) => (
                            <div className={`flex items-center justify-between w-full ${values?.user?.data?.friends?.length > 1 && 'py-1'}`}>
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#022E54] text-white rounded-full size-10 flex items-center justify-center uppercase">{user?.referredUser?.name?.slice(0, 1)}</div>
                                    <div>
                                        <p className="text-sm text-white">{user?.referredUser?.username ? `@${user?.referredUser?.username}` : user?.referredUser?.name}</p>
                                        <div className="flex items-center opacity-50 font-medium gap-1 mt-1">
                                            <img src={usdt_emoji} alt="usdt" className="size-4" />
                                            <p className="text-xs">+{user?.rewardUSDT} USDT</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs">{moment(user?.createdAt).fromNow()}</p>
                            </div>
                        ))
                        :
                        <>
                            <img src={rocket_anim} alt="rocket anim" className="size-28" />
                            <p className="mt-4 text-sm">No friend</p>
                        </>
                }
            </div>
        </div>
    );
};

export default Refer;

