import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { SolanaProvider } from "./utils/SolanaProvider";
import ContextApi from "./utils/ContextApi";
import AddProject from "./page/AddProject";
import Explore from "./page/Explore";
import Profile from "./page/Profile";
import EditProject from "./page/EditProject";
import ProjectDetails from "./page/ProjectDetails";
import AdminLayout from "./layout/AdminLayout";
import Login from "./page/admin/Login";
import Dashboard from "./page/admin/Dashboard";
import ContextApiAdmin from "./utils/ContextApiAdmin";
import Wallet from "./page/admin/Wallet";
import Project from "./page/admin/Project";

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
                element: <Explore />
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
    },
    {
        path: "/admin",
        element: <ContextApiAdmin>
            <AdminLayout />
        </ContextApiAdmin>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "wallet",
                element: <Wallet />
            },
            {
                path: "project",
                element: <Project />
            },
        ]
    },
    {
        path: "/auth",
        element: <Login />
    }
]);

export default Routes;