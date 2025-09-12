// import { useContext, useEffect } from "react";
// import { ContextValuesAdmin } from "../../utils/ContextApiAdmin";
// import { useNavigate } from "react-router-dom";
import admin from "../../api/Admin";
import { GiCrossedChains } from "react-icons/gi";
import { FaList } from "react-icons/fa";
import { FaTowerCell } from "react-icons/fa6";

const Dashboard = () => {
    // const values = useContext(ContextValuesAdmin);
    // const navigate = useNavigate();
    const getAdminStats = admin.getAdminStats(undefined);

    // useEffect(() => {
    //     if (!values?.user?.data?.email && !values?.user?.isLoadingQuery) {
    //         navigate("/auth", { replace: true });
    //     }
    // }, [navigate, values]);

    return (
        <div className="p-3">
            {
                getAdminStats?.isFetching &&
                <div className="fixed h-screen w-full flex items-center justify-center inset-0">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            }
            <div className="grid lg:grid-cols-3 gap-3">
                <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <GiCrossedChains className="text-2xl" />
                        <p className="font-monda text-xl">Connected Wallet</p>
                    </div>
                    <p className="text-7xl text-white font-semibold">{getAdminStats?.data?.wallet}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <FaList className="text-2xl" />
                        <p className="font-monda text-xl">Total Project</p>
                    </div>
                    <p className="text-7xl text-white font-semibold">{getAdminStats?.data?.project}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <FaTowerCell className="text-2xl" />
                        <p className="font-monda text-xl">Total referrel</p>
                    </div>
                    <p className="text-7xl text-white font-semibold">{getAdminStats?.data?.referrel}</p>
                </div>
            </div>

          
        </div>
    );
};

export default Dashboard;