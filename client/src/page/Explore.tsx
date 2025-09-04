import { useForm } from "react-hook-form";
import project from "../api/Project";
import { Project } from "..";

const Explore = () => {
    const { setValue, watch } = useForm();

    const { data, isFetching } = project.getProjects.use({
        search: watch("search") || "",
        page: Number(watch("page") || 0),
    });
    return (
        <div className="max-w-7xl mx-auto">
            <div className="my-10">
                <p className="font-monda text-4xl text-center">REAL USER FOR YOUR CRYPTO PROJECT</p>
                <p className="font-montserrat text-center opacity-60">earn rewards from upcoming meme projects</p>
            </div>

            <div className="flex items-center justify-between my-5">
                <input
                    onChange={(e) => setValue("search", e.target.value)}
                    value={watch("search") || ""}
                    className="bg-white/5 p-3 font-monda outline-none rounded-md w-full max-w-2xl"
                    placeholder="Search by name"
                    type="text" />
                <div className="flex items-center gap-3 font-montserrat">
                    <div
                        onClick={() => setValue("page", (Number(watch("page") || 0) - 1).toString())}
                        className="bg-white/5 p-2 px-5 cursor-pointer rounded-sm">Previous</div>
                    <div
                        onClick={() => setValue("page", (Number(watch("page") || 0) + 1).toString())}
                        className="bg-white/5 p-2 px-5 rounded-sm cursor-pointer">Next</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    isFetching ?
                        (
                            <>
                                <LoadingSkelaton />
                                <LoadingSkelaton />
                                <LoadingSkelaton />
                            </>
                        ) :
                        data?.length === 0 ? (
                            <div className="col-span-full py-10">
                                <p className="font-montserrat text-center">No data found in this page.</p>
                                
                            </div>
                        ) :
                            data?.map((item: Project) => (
                                <div key={item?.id} className="bg-white/5 rounded-2xl p-3">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <img src={item?.image} alt={item?.name} className="size-12 object-contain" />
                                            <div>
                                                <p className="font-monda text-xl line-clamp-1 capitalize">{item?.name}</p>
                                                <p className="font-montserrat text-sm line-clamp-1 opacity-60">{item?.reward}</p>
                                            </div>
                                        </div>
                                        <button className="font-montserrat text-sm font-medium bg-white/10 p-1 px-4 rounded-md cursor-pointer">Details</button>
                                    </div>
                                    <p className="font-montserrat bg-white/10 p-3 rounded-md">Reward: {item?.tagline} USDT</p>
                                </div>
                            ))
                }
            </div>
        </div>
    );
};

export default Explore;

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