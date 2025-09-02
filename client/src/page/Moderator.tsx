import { miniApp } from "@telegram-apps/sdk";
import { useEffect } from "react";
import firefont from "../assets/FireFontEmoji_AgADDUEAAiTsmUs.gif";
import gsap from "gsap";
import target from "../assets/LoveDayEmoji_AgADgm0AAmKH8Ug.gif";

const Moderator = () => {

    const ResponsibilityandBenefits = [
        {
            id: 1,
            responsibility: "Be an admin in our Telegram support group. Help other users.",
            benefits: "If you reach level 1 target, you get $25 base salary."
        },
        {
            id: 2,
            responsibility: "Keep inviting new friends.",
            benefits: "You get double reward for each friend you refer."
        },
        {
            id: 3,
            responsibility: "Do simple marketing.",
            benefits: "Make promo codes and share in your area."
        },
        {
            id: 4,
            responsibility: "Stay active and follow updates.",
            benefits: "You will know about new updates early, from moderator group"
        },
    ];

    return (
        <div className="pb-20">
            <img src={firefont} alt="fire premium" className="size-40 mx-auto" />

            <div className="overflow-x-auto mt-4 font-montserrat bg-white/10 rounded-2xl">
                <table className="table">
                    <thead>
                        <tr className="">
                            <th>Responsibility</th>
                            <th>Benefits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ResponsibilityandBenefits?.map((responsibility) => (
                                <tr className="text-xs">
                                    <td>{responsibility?.responsibility}</td>
                                    <td>{responsibility?.benefits}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <button className=" bg-white/30 cursor-pointer px-3 p-2 rounded-full mt-5 w-full font-monda">I read it. Want to be a moderator.</button>
        </div>
    );
};

export default Moderator;