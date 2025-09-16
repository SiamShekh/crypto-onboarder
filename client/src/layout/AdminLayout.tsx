import { MdManageAccounts, MdOutlineSpaceDashboard, MdPassword } from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/icon.webp";
import { AiOutlineMenu } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { ContextValuesAdmin } from "../utils/ContextApiAdmin";

const AdminLayout = () => {

    const pages = [
        {
            id: 1,
            title: "Dashboard",
            icon: <MdOutlineSpaceDashboard />,
            href: "/admin"
        },
        {
            id: 2,
            title: "Wallet",
            icon: <MdManageAccounts />,
            href: "/admin/wallet"
        },
        {
            id: 3,
            title: "Project",
            icon: <FaList />,
            href: "/admin/project"
        },
        {
            id: 4,
            title: "Change Password",
            icon: <MdPassword />,
            href: "/admin/info"
        },
        // {
        //     id: 1,
        //     title: "Dashboard",
        //     icon: <MdOutlineSpaceDashboard />,
        //     href: "/"
        // },
    ]

    const { pathname } = useLocation();

    const values = useContext(ContextValuesAdmin);
    const navigate = useNavigate();

    useEffect(() => {
        if ((!values?.user?.data?.email && !values?.user?.isLoadingQuery) || (values?.user?.data?.email === undefined && !values?.user?.isLoadingQuery)) {
            navigate("/auth", { replace: true });
        }
    }, [navigate, values]);

    return (
        <div data-theme="night" className="">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="flex items-center gap-5 p-3 border-b w-full lg:hidden">
                        <label htmlFor="my-drawer-2">
                            <AiOutlineMenu className="text-xl" />
                        </label>

                        <p className="text-xl font-medium font-montserrat">Admin</p>
                    </div>
                    {/* Open drawer */}

                    <div className="min-h-screen">
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
                        <div className="flex items-center justify-center gap-4 mb-20 mt-10">
                            <img src={icon} alt="icon" className="size-16" />
                            <p className="text-4xl font-monda font-semibold">Admin</p>
                        </div>
                        {
                            pages.map((nav) => (
                                <Link to={nav?.href} key={nav?.id} >
                                    <div className={`${pathname === nav?.href && "bg-white/3 my-2"} cursor-pointer hover:bg-black/10 duration-500 rounded-sm p-3 flex items-center gap-3`}>
                                        <p className="text-2xl">{nav?.icon}</p>
                                        <p className="font-montserrat">{nav?.title}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;