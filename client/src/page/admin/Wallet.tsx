import { useState } from "react";
import user from "../../api/User";

const Wallet = () => {
    const [page, setPage] = useState(0);
    const adminWallet = user.adminUser({ page });

    return (
        <div className="p-3">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 font-monda">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Username</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adminWallet?.data?.length === 0 || adminWallet?.data?.length === undefined ?
                                <tr>
                                    <td colSpan={3}>
                                        <div>
                                            <p className="text-center">No user found</p>
                                        </div>
                                    </td>
                                </tr>
                                :
                                adminWallet?.data?.map((user: { username: string, solAddress: string }, id: number) => (
                                    <tr key={id}>
                                        <th>{id + 1}</th>
                                        <td>{user?.username ? user?.username : "N/A"}</td>
                                        <td>{user?.solAddress}</td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between">
                <button onClick={() => setPage(page - 1)} className="bg-white/10 px-5 py-2 font-montserrat text-xs font-medium rounded-md mt-5">Previous</button>
                <button onClick={() => setPage(page + 1)} className="bg-white/10 px-5 py-2 font-montserrat text-xs font-medium rounded-md mt-5">Next</button>
            </div>
        </div>
    );
};

export default Wallet;