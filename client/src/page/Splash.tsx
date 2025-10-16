import bg from "../assets/bg.jpg";

const Splash = () => {
    return (
        <div className="bg-[#101729] h-screen">
            <img src={bg} alt="bg" draggable={false} className="fixed top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] h-[60vh] inset-0 object-cover" />
            <div className="absolute z-10 top-[60%] left-[50%] -translate-x-[50%] flex items-center justify-center flex-col gap-4">
                <a href="https://t.me/whybuydotfun" target="_blank">
                    <button className="bg-[#DCFFAF] text-black px-7 rounded-full font-medium border-b-4 border-white w-28">Telegram</button>
                </a>
                <a href="https://x.com/whybuydotfun" target="_blank">
                    <button className="bg-[#DCFFAF] text-black px-7 rounded-full font-medium border-b-4 border-white w-28">X</button>
                </a>
            </div>
        </div>
    );
};

export default Splash;