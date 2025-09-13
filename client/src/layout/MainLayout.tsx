import { Link, Outlet, useLocation } from "react-router-dom";
import icon from "../assets/icon.webp";
import { FaTelegramPlane, FaWallet } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { useContext, useEffect } from "react";
import user from "../api/User";
import { ContextValues } from "../utils/ContextApi";
import LoginRequired from "../components/item/LoginRequired";
import { MdMenu } from "react-icons/md";

const MainLayout = () => {
    const values = useContext(ContextValues);

    const nav_item = [
        {
            id: 1,
            name: "Explore",
            href: "/explore"
        },
        {
            id: 2,
            name: "Profile",
            href: "/profile"
        },
        {
            id: 3,
            name: "Add Project",
            href: "/add-project"
        },
        {
            id: 4,
            name: "Earn Rewards",
            href: "/earn-reward"
        }
    ]

    const {
        wallets,               // List of available wallets
        wallet,                // The currently selected wallet
        publicKey,             // The connected wallet's public key (if connected)
        connected,             // Boolean: is wallet connected?
        select,                // Select a wallet by name
        connect,               // Connect the selected wallet
        disconnect,             // Disconnect the wallet,
    } = useWallet();

    const userRegister = user.LoginUser();

    const handleWalletClick = async (walletName: WalletName) => {
        try {
            select(walletName);

            // Wait until the wallet is actually selected
            const waitForWalletSelection = () =>
                new Promise<void>((resolve, reject) => {
                    const interval = setInterval(() => {
                        if (wallet?.adapter?.name === walletName) {
                            clearInterval(interval);
                            resolve();
                        }
                    }, 50);

                    // Timeout after 2 seconds
                    setTimeout(() => {
                        clearInterval(interval);
                        reject(new Error("Wallet selection timed out"));
                    }, 2000);
                });

            await waitForWalletSelection();

            await connect();
        } catch (error) {
            console.error("Wallet connection error:", error);
            // toast.error("Something went wrong, please try with another wallet.");
        }
    };

    useEffect(() => {
        const callUser = async () => {
            if (connected && publicKey?.toBase58() && !values?.user?.isLoading && !values?.user?.data?.solAddress) {
                userRegister[0]({ address: publicKey?.toBase58() })
            }
        }

        callUser();
    }, [connected]);

    const securePath = ["/add-project", "/profile"];
    const { pathname } = useLocation();

    useEffect(() => {
        if (sessionStorage.getItem("welcome") !== "yes") {
            (document.getElementById('welcome_modal') as HTMLDialogElement).showModal();
        }
    }, [])

    return (
        <div data-theme="night" className="min-h-screen w-full">

            <dialog id="welcome_modal" className="modal backdrop-blur-xs">
                <div className="modal-box border border-white/10 font-montserrat">
                    <p className="text-center text-white font-semibold text-xl">How it works</p>
                    <p className="text-center text-xs mt-1 opacity-60">One platform to explore every upcoming memecoin before it goes live on any launchpad.</p>
                    <p className="text-xs text-center mt-5 opacity-50">1. Discover upcoming memecoins before launch</p>
                    <p className="text-xs text-center opacity-50">2. Check socials and complete task to get rewards</p>
                    <p className="text-xs text-center opacity-50">3. 🔥 APE INTO THE NEXT POTENTIAL 100x EARLY 🔥</p>
                    <p className="text-xs text-center mt-4 opacity-70">by clicking this button you agree to the terms and conditions and certify that you are over 18 years old</p>

                    <button
                        onClick={() => {
                            (document.getElementById('welcome_modal') as HTMLDialogElement).close();
                            sessionStorage.setItem("welcome", "yes");
                        }}
                        className="text-[#c1ff72] text-center border p-3 cursor-pointer w-full mt-5 rounded-xl border-white/20 text-sm">I am ready to find next 100x</button>
                </div>
            </dialog>

            <dialog id="earn_reward_modal" className="modal backdrop-blur-xs">
                <div className="modal-box border border-white/10 font-montserrat">
                    <p className="text-center font-monda text-xl">How Rewards Work on WhyBuy</p>
                    <p className="text-center text-xs mt-2 text-yellow-500 font-medium">Browse upcoming memecoins listed before launch</p>
                    <p className="text-center text-xs mt-2 text-yellow-500 font-medium">Complete Tasks like Follow on X, join telegram, visit website, or other simple social tasks</p>
                    <p className="text-center text-xs mt-2 text-yellow-500 font-medium">Once task are done, unlock and claim your reward (token, whitelist spot, or points)</p>
                    <p className="text-center text-xs mt-2 text-yellow-500 font-medium">Rewards are distributed directly by the project team</p>
                    <p className="text-center text-xs mt-2 text-yellow-500 font-medium">Share your referral link and climb the leaderboard for extra perks</p>

                    <button
                        onClick={() => {
                            (document.getElementById('earn_reward_modal') as HTMLDialogElement).close();
                        }}
                        className="text-[#c1ff72] text-center border p-3 cursor-pointer w-full mt-5 rounded-xl border-white/20 text-sm">I am ready to earn rewards</button>
                </div>
            </dialog>

            <dialog id="all_wallet" className="modal">
                <div className="modal-box">
                    <p className="text-2xl font-opensans font-bold">Connect wallet</p>
                    <p className="text-sm">Get start by connecting your preferred wallet below.</p>
                    <div style={{ marginTop: "10px" }}>
                        {wallets.map((wallet) => (
                            <div
                                key={wallet.adapter.name}
                                onClick={() => handleWalletClick(wallet.adapter.name)}
                                className="flex items-center gap-3 my-4 cursor-pointer hover:bg-white/10 p-3 rounded-2xl relative"
                            >
                                <img src={wallet?.adapter?.icon} alt={wallet.adapter.name} className="size-9 rounded-2xl" />
                                <div>
                                    <p className="font-medium">{wallet.adapter.name}</p>
                                    <p className="text-xs opacity-50">Transaction Versions: {wallet.adapter.supportedTransactionVersions}</p>
                                </div>
                                {
                                    wallet?.adapter?.name === "Phantom" &&
                                    <p className="text-xs absolute right-3 font-montserrat">Recommend</p>
                                }
                            </div>
                        ))}
                    </div>

                    <p className="font-monda">By connecting your wallet, you're agree to our <span className="text-blue-400">Terms of service</span> and our <span className="text-blue-400">privacy policy</span></p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className="md:flex items-center justify-between p-3 max-w-7xl mx-auto hidden">
                <div className="flex items-center gap-3">
                    <img
                        className="size-12"
                        src={icon}
                        alt="why-buy" />

                    <div className="p-3 px-8 flex items-center gap-8 font-monda bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
                        {
                            nav_item.map((nav) => (
                                nav?.name !== "Earn Rewards" &&
                                <Link
                                    className="hover:text-white text-white/40 duration-500"
                                    key={nav?.id}
                                    to={nav?.href}
                                >{nav?.name}</Link>
                            ))
                        }
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => (document.getElementById("earn_reward_modal") as HTMLDialogElement).showModal()}
                        className="bg-white/10 cursor-pointer p-2 px-5 text-sm font-monda rounded-full">earn rewards</button>

                    <div>
                        {connected ? (
                            <div className="tooltip tooltip-left" data-tip={publicKey?.toBase58()}>
                                <button
                                    className="bg-[#750075] w-40 h-12 cursor-pointer hover:shadow-lg backdrop-blur-3xl shadow-pink-500/20 font-montserrat flex items-center gap-2 rounded-full p-5"
                                    onClick={() => {
                                        disconnect();
                                        values?.user?.setIsLoading(true);
                                    }}>
                                    <img
                                        src={wallet?.adapter?.icon}
                                        className="text-base size-6" />
                                    <div>
                                        <p className="text-start font-monda font-medium">{wallet?.adapter?.name}</p>
                                        <p className="text-start text-xs font-monda opacity-60 text-white">Disconnect</p>
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    className="bg-[#750075] w-40 h-12 cursor-pointer hover:shadow-lg backdrop-blur-3xl shadow-pink-500/20 font-montserrat flex items-center gap-2 rounded-full p-5"
                                    onClick={() => {
                                        (document.getElementById("all_wallet") as HTMLDialogElement).show();
                                    }}>
                                    <FaWallet className="text-base" />
                                    <div>
                                        <p className="font-medium text-sm text-start line-clamp-1">Connect Wallet</p>
                                        <p className="text-start text-xs text-white/60 line-clamp-1">Network: Sol</p>
                                    </div>
                                </button>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between p-3 max-w-7xl mx-auto border-b border-white/10 md:hidden">
                <div className="dropdown">
                    <div tabIndex={0} role="button">
                        <MdMenu className="text-3xl" />
                    </div>
                    <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <div className="p-3 flex items-center w-fit flex-col gap-4 font-monda bg-white/5 rounded-md border border-white/5 backdrop-blur-sm">
                            {
                                nav_item.map((nav) => (
                                    nav?.name === "Earn Rewards" ?
                                        <button
                                            key={nav?.id}
                                            onClick={() => (document.getElementById("earn_reward_modal") as HTMLDialogElement).showModal()}
                                            className="bg-white/10 cursor-pointer p-2 px-5 text-sm font-monda rounded-full">earn rewards</button>
                                        :
                                        <Link
                                            className="hover:text-white text-white/40 duration-500"
                                            key={nav?.id}
                                            to={nav?.href}
                                        >{nav?.name}</Link>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div>
                    {connected ? (
                        <div className="tooltip tooltip-left" data-tip={publicKey?.toBase58()}>
                            <button
                                className="bg-[#750075] w-fit h-10 cursor-pointer hover:shadow-lg backdrop-blur-3xl shadow-pink-500/20 font-montserrat flex items-center gap-1 rounded-md px-2"
                                onClick={() => {
                                    disconnect();
                                    values?.user?.setIsLoading(true);
                                    // autoConnect()
                                }}>
                                <img
                                    src={wallet?.adapter?.icon}
                                    className="text-base size-6" />
                                <div>
                                    <p className="text-start font-monda text-xs font-medium">{wallet?.adapter?.name}</p>
                                    <p className="text-start text-[9px] font-monda opacity-60 text-white">Disconnect</p>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                className="bg-[#750075] w-fit h-10 cursor-pointer hover:shadow-lg backdrop-blur-3xl shadow-pink-500/20 font-montserrat flex items-center gap-2 rounded-md p-2"
                                onClick={() => {
                                    (document.getElementById("all_wallet") as HTMLDialogElement).show();
                                }}>
                                <FaWallet className="text-base" />
                                <div>
                                    <p className="font-medium text-xs text-start line-clamp-1">Connect Wallet</p>
                                    <p className="text-start text-[9px] text-white/60 line-clamp-1">Network: Sol</p>
                                </div>
                            </button>

                            <dialog id="all_wallet" className="modal">
                                <div className="modal-box">
                                    <p className="text-2xl font-opensans font-bold">Connect wallet</p>
                                    <p className="text-sm">Get start by connecting your preferred wallet below.</p>
                                    <div style={{ marginTop: "10px" }}>
                                        {wallets.map((wallet) => (
                                            <div
                                                key={wallet.adapter.name}
                                                onClick={() => handleWalletClick(wallet.adapter.name)}
                                                className="flex items-center gap-3 my-4 cursor-pointer hover:bg-white/10 p-3 rounded-2xl relative"
                                            >
                                                <img src={wallet?.adapter?.icon} alt={wallet.adapter.name} className="size-9 rounded-2xl" />
                                                <div>
                                                    <p className="font-medium">{wallet.adapter.name}</p>
                                                    <p className="text-xs opacity-50">Transaction Versions: {wallet.adapter.supportedTransactionVersions}</p>
                                                </div>
                                                {
                                                    wallet?.adapter?.name === "Phantom" &&
                                                    <p className="text-xs absolute right-3 font-montserrat">Recommend</p>
                                                }
                                            </div>
                                        ))}
                                    </div>

                                    <p className="font-monda">By connecting your wallet, you're agree to our <span className="text-blue-400">Terms of service</span> and our <span className="text-blue-400">privacy policy</span></p>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                    )
                    }
                </div>
            </div>

            <div className="min-h-screen">
                {
                    securePath.includes(pathname) && !values?.user?.data?.solAddress ?
                        <LoginRequired /> :
                        <Outlet />
                }
            </div>

            <div className="border-t border-white/10 py-10">
                {/* <div className="max-w-7xl mx-auto p-3 lg:p-0">
                    <div className="flex items-center justify-between md:flex-row flex-col">
                        <div className="flex-1">
                            <img src={icon} alt="why buy" className="size-12" />
                            <p className="max-w-md font-montserrat mt-3">The ultimate platform for launching, trading, and staking memecoins. Join the revolution and make your token legendary!</p>
                        </div>
                        <div className="flex flex-1 justify-between items-center w-full gap-5 font-monda">
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

                    <div className="flex items-center justify-between flex-col md:flex-row">
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
                </div> */}
                <div className="flex items-center justify-between lg:flex-row flex-col gap-5 max-w-7xl mx-auto">
                    <Link to={"https://x.com/whybuydotfun"} className="flex items-center gap-1 ">
                        <FaXTwitter className="lg:text-2xl" />
                        <p className="font-monda lg:text-base font-medium">Follow on X</p>
                    </Link>
                    <div className="flex items-center gap-5">
                        <Link to={"/terms"} className="text-sm font-monda">Terms</Link>
                        <Link to={"/privacy"} className="text-sm font-monda">Privacy</Link>
                        <Link to={"/"} className="text-sm font-monda">Home</Link>
                    </div>
                    <Link to={"https://t.me/whybuydotfun"} className="flex items-center gap-3">
                        <p className="font-montserrat lg:text-base font-medium">Join Telegram</p>
                        <FaTelegramPlane className="lg:text-3xl" />
                    </Link>
                </div>
                <div className="lg:w-96 h-[1px] bg-white/20 rounded-full my-3 mx-auto"></div>
                <p className="text-xs text-center">2025 © whybuy All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default MainLayout;