import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";

const Routes = createBrowserRouter([
    // {
    //     path: '/app',
    //     element: <ContextApi><AppLayout /></ContextApi>,
    //     children: [
    //         {
    //             index: true,
    //             element: <Game />
    //         },
    //         {
    //             path: "earn",
    //             element: <EarnLayout />
    //         },
    //         {
    //             path: "staking",
    //             element: <Staking />
    //         },
    //         {
    //             path: "moderator",
    //             element: <Moderator />
    //         },
    //     ]
    // },
    // {
    //     path: '/',
    //     element: <Splash />,
    //     errorElement: <NotFound />
    // },
    // {
    //     path: '/intro',
    //     element: <ContextApi><Introduction /></ContextApi>,
    //     errorElement: <NotFound />
    // },
    {
        path: "/",
        element: <Home />,
    }
]);

export default Routes;