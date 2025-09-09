import { useParams, useSearchParams } from "react-router-dom";
import project from "../api/Project";
import { DETAILS_PAGE } from "../constant";
import { useContext, useEffect } from "react";
import { ContextValues } from "../utils/ContextApi";
import { toast } from "sonner";
import { Task, User } from "..";

const ProjectDetails = () => {
    const param = useParams();
    const values = useContext(ContextValues);
    const referralLink = `${DETAILS_PAGE}${param?.slug}?startweb=${values?.user?.data?.solAddress}`;
    const { data, isFetching } = project.getSpecificProject.use({ slug: param?.slug as string });
    const traffic = project.projectTraffic();
    const solAddress = useSearchParams()[0].get("startweb");

    useEffect(() => {
        if (solAddress && param?.slug) {
            traffic[0]({
                slug: param?.slug as string,
                address: solAddress,
            });
        }
    }, [param?.slug, solAddress, traffic])

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
                                        {
                                            data?.launchDate ?
                                                <p className="text-xs font-montserrat text-white/50 line-clamp-1">Launch Date: {new Date(data?.launchDate).toLocaleString()}</p> :
                                                data?.reward &&
                                                <p className="text-xs font-montserrat text-white/50 line-clamp-1">Launch Date: {new Date(data?.launchDate).toLocaleString()}</p>
                                        }
                                    </div>
                                </div>

                                <p className="text-xs">{data?.reward}</p>
                            </div>
                    }

                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <div className="p-3 border-white/10 border w-full col-span-full rounded-md">
                            {data?.description}
                        </div>

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
                                data?.task?.map((task: Task, i: number) => (
                                    <div key={i} className="border border-white/10 p-3 rounded-md flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                className="size-8 bg-white/5 rounded-xl border border-white/5"
                                                src={task?.taskImg}
                                                alt={task?.taskLabel} />
                                            <p className="font-montserrat font-medium">{task?.taskLabel}</p>
                                        </div>
                                        <a href={task?.taskHref} target="_blank" >
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
                                        <p className="bg-black/10 w-72 rounded-sm h-6 " /> :
                                        <p className="text-xs opacity-70">{referralLink}</p>
                                }
                            </div>
                            <button onClick={() => {
                                navigator.clipboard.writeText(referralLink);
                                toast.success("Copied to clipboard");
                            }} className="font-montserrat text-sm cursor-pointer bg-white/10 px-5 py-1 rounded-md border border-white/10">Copy</button>
                        </div>


                    </div>
                </div>

                <div className="bg-white/5 p-4 relative rounded-xl">
                    <p className="text-2xl font-monda font-semibold text-center">🏆 Leaderboard</p>
                    {
                        data?.ProjectReferrel && data?.ProjectReferrel?.length > 0 ?
                            data?.ProjectReferrel?.map((referrel: { user: User }, i: number) => (
                                <div key={i} className="flex items-center justify-between my-2 bg-white/5 p-3 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-monda capitalize">{referrel?.user?.username ? referrel?.user?.username : referrel?.user?.solAddress?.slice(0, 15) + "..."}</p>
                                            <p className="font-monda text-xs opacity-50 capitalize">{referrel?.user?.solAddress?.slice(0, 15) + "..."}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-montserrat">{referrel?.user?._count?.ProjectReferrel} People</p>
                                </div>
                            )) :
                            <p className="font-montserrat absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-xs">No referrals yet</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;

