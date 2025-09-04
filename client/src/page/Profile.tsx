import icon from "../assets/icon.webp";
import { useContext } from "react";
import { ContextValues } from "../utils/ContextApi";
import { FaCopy } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import project from "../api/Project";
import { Project } from "..";

const Profile = () => {
    const values = useContext(ContextValues);
    const { data, isFetching } = project.getMyProjects.use(undefined);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="my-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={icon} alt="icon" className="size-20 bg-white/5 rounded-full p-2 border-white/10 border" />
                        <div>
                            <div>
                                <p className="text-xl font-monda text-white">{values?.user?.data?.username ? values?.user?.data?.username : values?.user?.data?.solAddress?.slice(0, 12) + "..."}</p>
                            </div>
                            <div className="flex items-center gap-2 my-1">
                                <p className="text-sm opacity-70">
                                    {values?.user?.data?.solAddress
                                        ? `${values.user.data.solAddress.slice(0, 4)}.....${values.user.data.solAddress.slice(-4)}`
                                        : 'No address'}
                                </p>

                                <FaCopy className="text-sm" />
                            </div>
                            <a target="_blank" href={`https://solscan.io/account/${values?.user?.data?.solAddress}`} className="flex items-center gap-3 font-monda text-xs text-purple-400 cursor-pointer">
                                <p>View on Solscan</p>
                            </a>
                        </div>
                    </div>
                    <div className="bg-white/10 px-10 font-monda text-sm cursor-pointer border border-white/10 py-2 rounded-sm">Edit</div>
                </div>

                {
                    isFetching ? (
                        <div className="bg-white/3 border p-3 border-white/10 mt-5 rounded-md grid grid-cols-3 gap-3">
                            <LoadingSkelaton />
                            <LoadingSkelaton />
                            <LoadingSkelaton />
                            <LoadingSkelaton />
                        </div>
                    ) :
                        data?.length === 0 || data?.length === undefined ?
                            (
                                <div className="bg-white/5 border flex flex-col items-center justify-center p-10 border-white/10 mt-5 rounded-md">
                                    <MdDoNotDisturb className="text-5xl" />
                                    <p className="font-monda">No project found</p>
                                </div>
                            ) :
                            <div className="bg-white/3 border p-3 border-white/10 mt-5 rounded-md grid grid-cols-3 gap-3">
                                {
                                    data?.map((item: Project) => (
                                        <ProjectCard item={item} key={item?.id} />
                                    ))
                                }
                            </div>
                }

            </div>
        </div>
    );
};

export default Profile;

const ProjectCard = ({ item }: { item: Project }) => {
    return (
        <div key={item?.id} className="bg-white/5 rounded-2xl p-3">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <img src={item?.image} alt={item?.name} className="size-12 object-contain" />
                    <div>
                        <p className="font-monda text-xl line-clamp-1 capitalize">{item?.name}</p>
                        <p className="font-montserrat text-sm line-clamp-1 opacity-60">{item?.reward}</p>
                    </div>
                </div>
                <button className="font-montserrat text-sm font-medium bg-white/10 p-1 px-4 rounded-md cursor-pointer">Edit</button>
            </div>
            <p className="font-montserrat bg-white/10 p-3 rounded-md">Reward: {item?.tagline} USDT</p>
        </div>
    )
}

const LoadingSkelaton = () => (
    <div className="bg-white/5 rounded-2xl p-3">
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 size-12 object-contain" />
                <div>
                    <p className="w-32 h-6 bg-white/10 rounded-md" />
                    <p className="w-20 h-4 mt-2 bg-white/10 rounded-md" />
                </div>
            </div>
            <button className="w-20 h-6 bg-white/10 rounded-md" />
        </div>
        <p className="w-full h-20 bg-white/10 p-3 rounded-md" />
    </div>
);