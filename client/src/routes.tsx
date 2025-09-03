import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import MainLayout from "./layout/MainLayout";
import { SolanaProvider } from "./utils/SolanaProvider";
import ContextApi from "./utils/ContextApi";

const Routes = createBrowserRouter([
    {
        path: "/",
        element:
            <SolanaProvider>
                <ContextApi>
                    <MainLayout />
                </ContextApi>
            </SolanaProvider>,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]);

export default Routes;