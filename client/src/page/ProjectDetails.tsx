import { useParams } from "react-router-dom";
import project from "../api/Project";
import { DETAILS_PAGE } from "../constant";
import { useContext } from "react";
import { ContextValues } from "../utils/ContextApi";
import { toast } from "sonner";

const ProjectDetails = () => {
    const param = useParams();
    const values = useContext(ContextValues);
    const referralLink = `${DETAILS_PAGE}${param?.id}?startweb=${values?.user?.data?.solAddress}`;
    const { data, isFetching, status } = project.getSpecificProject.use({ id: param?.id as string });

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 bg-white/5 p-4 rounded-xl">

                    {
                        isFetching ?
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-14 bg-black/10 skeleton rounded-xl p-2" />
                                    <div>
                                        <div className="w-40 h-6 mb-2 bg-black/10 skeleton rounded-md" />
                                        <div className="w-24 h-4 bg-black/10 skeleton rounded-md" />
                                    </div>
                                </div>

                                <div className="w-24 h-6 bg-black/10 skeleton rounded-md" />
                            </div> :
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={data?.image} alt={data?.name} className="size-14 bg-black rounded-xl p-2" />
                                    <div>
                                        <p className="font-monda text-xl">{data?.name}</p>
                                        <p className="text-xs font-montserrat text-white/50 line-clamp-1">{data?.tagline}</p>
                                    </div>
                                </div>

                                <p className="text-xs">{data?.reward}</p>
                            </div>
                    }

                    <div className="grid grid-cols-2 gap-3 mt-5">
                        {
                            isFetching ?
                                <>
                                    <div className="border border-white/10 p-3 rounded-md flex items-center justify-between">
                                        <div>
                                            <p className="w-40 h-5 skeleton bg-black/10 rounded-sm" />
                                            <p className="w-24 mt-1 h-3 skeleton bg-black/10 rounded-sm" />
                                        </div>
                                        <div className="bg-black/10 skeleton w-20 h-6 rounded-sm" />
                                    </div>
                                    <div className="border border-white/10 p-3 rounded-md flex items-center justify-between">
                                        <div>
                                            <p className="w-40 h-5 skeleton bg-black/10 rounded-sm" />
                                            <p className="w-24 mt-1 h-3 skeleton bg-black/10 rounded-sm" />
                                        </div>
                                        <div className="bg-black/10 skeleton w-20 h-6 rounded-sm" />
                                    </div>
                                    <div className="border border-white/10 p-3 rounded-md flex items-center justify-between">
                                        <div>
                                            <p className="w-40 h-5 skeleton bg-black/10 rounded-sm" />
                                            <p className="w-24 mt-1 h-3 skeleton bg-black/10 rounded-sm" />
                                        </div>
                                        <div className="bg-black/10 skeleton w-20 h-6 rounded-sm" />
                                    </div>
                                </> :
                                data?.task?.map((task: string, i: number) => (
                                    <div key={i} className="border border-white/10 p-3 rounded-md flex items-center justify-between">
                                        <p className="font-montserrat cursor-pointer">{new URL(task).host}</p>
                                        <a href={task} target="_blank" >
                                            <button className="text-xs cursor-pointer font-monda bg-white/10 px-3 py-1 rounded-full">Check</button>
                                        </a>
                                    </div>
                                ))
                        }

                        <div className="flex justify-between items-center col-span-full bg-white/5 p-3 rounded-md">
                            <div>
                                <p className="font-monda">Referral</p>
                                {
                                    isFetching ?
                                    <p className="bg-black/10 w-72 rounded-sm h-6 "/>:
                                    <p className="text-xs opacity-70">{referralLink}</p>
                                }
                            </div>
                            <button onClick={() => {
                                navigator.clipboard.writeText(referralLink);
                                toast.success("Copied to clipboard");
                            }} className="font-montserrat text-sm bg-white/10 px-5 py-1 rounded-md border border-white/10">Copy</button>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 p-4 relative rounded-xl">
                    <p className="text-2xl font-monda font-semibold text-center">🏆 Leaderboard</p>

                    <p className="font-montserrat absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-xs">No referrals yet</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;

