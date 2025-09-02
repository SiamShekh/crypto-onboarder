import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Splash from "./page/Splash";
import NotFound from "./utils/NotFound";
import Introduction from "./page/Introduction";
import ContextApi from "./utils/ContextApi";
import Game from "./page/Game";
import EarnLayout from "./layout/EarnLayout";
import Staking from "./page/Staking";
import Moderator from "./page/Moderator";

const Routes = createBrowserRouter([
    {
        path: '/app',
        element: <ContextApi><AppLayout /></ContextApi>,
        children: [
            {
                index: true,
                element: <Game />
            },
            {
                path: "earn",
                element: <EarnLayout />
            },
            {
                path: "staking",
                element: <Staking />
            },
            {
                path: "moderator",
                element: <Moderator />
            },
        ]
    },
    {
        path: '/',
        element: <Splash />,
        errorElement: <NotFound />
    },
    {
        path: '/intro',
        element: <ContextApi><Introduction /></ContextApi>,
        errorElement: <NotFound />
    },
]);

export default Routes;