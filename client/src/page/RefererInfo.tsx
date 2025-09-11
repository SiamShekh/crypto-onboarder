import { useParams } from "react-router-dom";
import project from "../api/Project";
import { User } from "..";

const RefererInfo = () => {
    const param = useParams();
    const { data, isFetching } = project.getTopRefererBySlug.use({ slug: param?.id as string });
    return (
        <div className="max-w-7xl mx-auto p-3 bg-white/5 rounded-2xl">
            {
                isFetching &&
                <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            }
            <p className="font-montserrat text-sm text-center mb-5">View the top 50 wallet addresses along with their number of referrals.</p>
            <div className="overflow-x-auto rounded-box bg-white/5 mx-auto max-w-7xl">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Address</th>
                            <th>Referred</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((user: User, i: number) => (
                                <tr>
                                    <th>{i + 1}</th>
                                    <td>{user?.solAddress}</td>
                                    <td>{user?._count?.ProjectReferrel}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RefererInfo;