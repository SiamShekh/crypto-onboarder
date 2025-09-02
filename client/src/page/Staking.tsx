import moment from "moment";
import toncoin from "../assets/ton_coin.svg";

const Staking = () => {
    return (
        <div>
            <p className="text-2xl font-monda">Soft staking</p>
            <p className="text-xs opacity-60 max-w-2/3">Lock your real money and get a MEAW allocation of up to 100M.</p>
            <p className="text-yellow-500 text-xs my-2">Why you do staking?</p>

            <div className="my-3 flex items-center justify-between">
                <div>
                    <p className="text-xs text-white/50">Your Stake</p>
                    <p className="text-xl text-white">= $0.0</p>
                </div>
                <div>
                    <p className="text-xs text-white/50 text-end">Total Stake</p>
                    <p className="text-xl text-white blur-xs">$231K</p>
                </div>
            </div>

            <p className="text-xs font-montserrat text-white/60 mb-1">Stake</p>
            <div className="bg-white/10 p-3 rounded-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src={toncoin} alt="meaw" className="rounded-full size-10" />
                        <div>
                            <p className="font-montserrat text-white font-medium">TON</p>
                            <p className="text-xs opacity-60 capitalize">available: 2 ton</p>
                        </div>
                    </div>

                    <button className="text-sm bg-white/10 px-5 py-2 rounded-full font-montserrat cursor-pointer text-white duration-500 hover:bg-white hover:text-black">Top up</button>
                </div>

                <input
                    placeholder="Enter the amount to stake in TON."
                    className="text-sm bg-white/5 p-3 w-full font-montserrat mt-3 rounded-2xl outline-none"
                    type="text" />
                <p className="text-xs text-white/50 mt-1">Expected Reward: 23,00000 MEAW</p>
                <button className="bg-white/10 p-2 w-full rounded-full mt-4 font-montserrat hover:bg-white hover:text-black duration-500 font-medium">Stake</button>
            </div>

            <p className="text-xs font-montserrat text-white/60 mb-1 mt-3">My Staking</p>
            <div className="bg-white/10 p-3 rounded-2xl">
                <div className="flex items-center gap-3 justify-between my-1">
                    <div className="flex items-center gap-3">
                        <img src={toncoin} alt="meaw" className="rounded-full size-10" />
                        <div>
                            <p className="text-sm font-montserrat">23 Ton Stake</p>
                            <p className="text-xs opacity-50 font-montserrat capitalize">reward: 90,0989 meaw</p>
                        </div>
                    </div>
                    <p className="text-xs opacity-40">{moment(new Date()).fromNow()}</p>
                </div>

                <div className="flex items-center gap-3 justify-between my-1">
                    <div className="flex items-center gap-3">
                        <img src={toncoin} alt="meaw" className="rounded-full size-10" />
                        <div>
                            <p className="text-sm font-montserrat">23 Ton Stake</p>
                            <p className="text-xs opacity-50 font-montserrat capitalize">reward: 90,0989 meaw</p>
                        </div>
                    </div>
                    <p className="text-xs opacity-40">{moment(new Date()).fromNow()}</p>
                </div>
            </div>
        </div>
    );
};

export default Staking;