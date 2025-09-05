import { createBrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import MainLayout from "./layout/MainLayout";
import { SolanaProvider } from "./utils/SolanaProvider";
import ContextApi from "./utils/ContextApi";
import AddProject from "./page/AddProject";
import Explore from "./page/Explore";
import Profile from "./page/Profile";
import EditProject from "./page/EditProject";
import ProjectDetails from "./page/ProjectDetails";

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
            },
            {
                path: "add-project",
                element: <AddProject />
            },
            {
                path: "explore",
                element: <Explore />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "edit-project/:id",
                element: <EditProject />
            },
            {
                path: "/detail/:id",
                element: <ProjectDetails />
            }
        ]
    }
]);

export default Routes;