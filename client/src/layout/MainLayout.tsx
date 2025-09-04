import { Link, Outlet } from "react-router-dom";
import icon from "../assets/icon.webp";
import { FaWallet } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { useContext, useEffect } from "react";
import user from "../api/User";
import { ContextValues } from "../utils/ContextApi";

const MainLayout = () => {
    const values = useContext(ContextValues);

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
            name: "Add Project",
            href: "/add-project"
        },
        {
            id: 4,
            name: "Explore",
            href: "/explore"
        },
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
            const token = await cookieStore.get("token");

            if (connected && publicKey?.toBase58() && !token?.value && !values?.user?.isLoading && !values?.user?.data?.solAddress) {
                userRegister[0]({ address: publicKey?.toBase58() })
            }
        }

        callUser();
    }, [connected])

    console.log();



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

                {/* <CustomWalletButton /> */}
                <div>
                    {connected ? (
                        <div className="tooltip tooltip-left" data-tip={publicKey?.toBase58()}>
                            <button
                                className="bg-[#750075] w-40 h-12 cursor-pointer hover:shadow-lg backdrop-blur-3xl shadow-pink-500/20 font-montserrat flex items-center gap-2 rounded-full p-5"
                                onClick={() => {
                                    disconnect();
                                    window.cookieStore.delete("token");
                                    // autoConnect()
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
                </div >
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