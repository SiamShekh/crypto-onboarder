import { Link, useLocation } from "react-router-dom";
import Task from "../page/Task";
import Refer from "../page/Refer";

const EarnLayout = () => {
    const { search } = useLocation();

    return (
        <div className="min-h-screen font-montserrat">
            <div className="bg-yellow-500 size-16 absolute top-6 right-0 blur-[60px]"></div>
            <p className="text-3xl font-medium text-white">Earn</p>
            <p className="text-xl opacity-60 max-w-2/3">Complete simple tasks and get meaw</p>

            <div className="flex items-center bg-white/10 rounded-full my-4 text-white justify-center relative">
                <Link to={`/app/earn?page=task`} className={`flex-1 p-3 rounded-full text-center duration-50 ${search === "?page=task" ? "bg-white/10 text-white" : "text-white/40"}  ${search === "" && 'bg-white/10 text-white/100'}`}>
                    <p>Tasks</p>
                </Link>
                <Link to={`/app/earn?page=refer`} className={`flex-1 p-3 rounded-full text-center duration-500 ${search === "?page=refer" ? "bg-white/10 text-white" : "text-white/40"}`}>
                    <p>Refer</p>
                </Link>
            </div>

            {
                search === "?page=task" ?
                    <Task /> :
                    search === "" ?
                        <Task /> :
                        <Refer />
            }
        </div>
    );
};

export default EarnLayout;