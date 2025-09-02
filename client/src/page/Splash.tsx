import user from "../api/User";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { miniApp, useRawInitData } from "@telegram-apps/sdk-react";
import meaw from "../assets/icon.png";

const Splash = () => {
    const [trigger, { data }] = user.LoginUser();
    const navigate = useNavigate();
    const initData = useRawInitData();

    useEffect(() => {
        trigger({ key: initData });
    }, [trigger, initData]);

    useEffect(() => {
        if (miniApp.mountSync.isAvailable() && !miniApp.isMounted()) {
            miniApp.mountSync();
        }

        if (miniApp.setHeaderColor.isAvailable()) {
            miniApp.setHeaderColor('#000000');
        }

        if (miniApp.setBottomBarColor.isAvailable()) {
            miniApp.setBottomBarColor('#000000');
        }
    }, [])

    useEffect(() => {
        if (data?.token) {
            sessionStorage.setItem("token", data?.token);

            setTimeout(() => {
                if (data?.channel_join) {
                    navigate("/app", { replace: true });
                } else {
                    navigate("/intro", { replace: true });
                }
            }, 1000);
        }
    }, [data?.token, navigate, data?.channel_join]);

    return (
        <div data-theme="black" className="h-screen overflow-hidden relative">
            <img src={meaw} alt="cat face icon" className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] scale-75" />
            <span className="loading loading-spinner loading-xs absolute bottom-3 left-[50%] -translate-x-[50%]"></span>
        </div>
    );
};

export default Splash;