import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import MainLayout from "./layout/MainLayout";
import { SolanaProvider } from "./utils/SolanaProvider";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <SolanaProvider><MainLayout /></SolanaProvider>,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]);

export default Routes;