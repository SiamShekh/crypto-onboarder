import { FaGift, FaHome, FaRobot } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const BottomDock = () => {
    const item = [
        {
            icon: <FaHome />,
            name: "Game",
            href: "/app"
        },
        {
            icon: <FaGift />,
            name: "Earn",
            href: "/app/earn"
        },
        {
            icon: <FaMoneyBillTrendUp />,
            name: "Staking",
            href: "/app/staking"
        },
        {
            icon: <FaRobot />,
            name: "Moderator",
            href: "/app/moderator"
        },
        {
            icon: <IoMenu />,
            name: "Menu",
            href: "/app/menu"
        }
    ]
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="fixed p-3 bottom-0 left-0 w-full z-50">
            <div className="bg-white/10 backdrop-blur-md w-full flex items-center justify-between rounded-full">
                {
                    item?.map((menu) => (
                        <div
                            onClick={() => navigate(menu?.href)}
                            key={menu?.name}
                            className={`flex-1 flex items-center rounded-full justify-center p-4 ${pathname.endsWith(menu?.href) ? 'bg-white/10 p-3' : ''}`}>
                            <p className="text-2xl">{menu?.icon}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default BottomDock;