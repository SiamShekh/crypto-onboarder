import { Link, Outlet } from "react-router-dom";
import icon from "../assets/icon.webp";
import { FaWallet } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MainLayout = () => {

    const nav_item = [
        {
            id: 1,
            name: "How it works",
            href: "/help"
        },
        {
            id: 2,
            name: "Profile",
            href: "/profile"
        },
        {
            id: 3,
            name: "Create Token",
            href: "/creation"
        },
        {
            id: 4,
            name: "Explore",
            href: "/explore"
        },
    ]

    return (
        <div data-theme="night" className="min-h-screen w-full">
            <div className="flex items-center justify-between p-3 max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <img
                        className="size-12"
                        src={icon}
                        alt="why-buy" />

                    <div className="p-3 px-8 flex items-center gap-8 font-monda bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
                        {
                            nav_item.map((nav) => (
                                <Link
                                    className="hover:text-white text-white/40 duration-500"
                                    key={nav?.id}
                                    to={nav?.href}
                                >{nav?.name}</Link>
                            ))
                        }
                    </div>
                </div>

                <div className="bg-[#750075] cursor-pointer hover:shadow-lg backdrop-blur-3xl shadow-pink-500/20 duration-500 font-montserrat flex items-center gap-2 text-xs rounded-full p-3 px-5">
                    <FaWallet className="text-base" />
                    <p className="font-medium">Connect Wallet</p>
                </div>
            </div>

            <div className="min-h-screen">
                <Outlet />
            </div>

            <div className="bg-[#7500758e] py-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <img src={icon} alt="why buy" className="size-12" />
                            <p className="max-w-md font-montserrat mt-3">The ultimate platform for launching, trading, and staking memecoins. Join the revolution and make your token legendary!</p>
                        </div>
                        <div className="flex flex-1 justify-between items-center gap-5 font-monda">
                            <div>
                                <p className="font-bold">Explore</p>
                                <div className="flex flex-col gap-1 mt-2">
                                    {
                                        nav_item.map((nav) => (
                                            <Link
                                                className="text-sm hover:text-white text-white/40 duration-500"
                                                key={nav?.id}
                                                to={nav?.href}
                                            >{nav?.name}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <p className="font-bold">Join us</p>
                                <div className="flex flex-col gap-1 mt-2">
                                    {
                                        nav_item.map((nav) => (
                                            <Link
                                                className="text-sm hover:text-white text-white/40 duration-500"
                                                key={nav?.id}
                                                to={nav?.href}
                                            >{nav?.name}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-white/20 my-5" />

                    <div className="flex items-center justify-between">
                        <p className="font-monda">© 2025 Poo.Fun All rights reserved.</p>
                        <div className="flex items-center justify-end gap-3">
                            <div className="bg-white/10 hover:bg-black/10 duration-500 p-2 rounded-lg">
                                <FaXTwitter className="text-3xl" />
                            </div>
                            <div className="bg-white/10 hover:bg-black/10 duration-500 p-2 rounded-lg">
                                <FaXTwitter className="text-3xl" />
                            </div>
                            <div className="bg-white/10 hover:bg-black/10 duration-500 p-2 rounded-lg">
                                <FaXTwitter className="text-3xl" />
                            </div>
                            <div className="bg-white/10 hover:bg-black/10 duration-500 p-2 rounded-lg">
                                <FaXTwitter className="text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;