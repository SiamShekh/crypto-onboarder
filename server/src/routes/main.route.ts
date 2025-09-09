import { Router } from "express";
import UserRoute from "./user.route";
import ProjectRoute from "./project.route";
import AdminRoute from "./admin.route";
import TaskRoutes from "./task.routes";

const MainRoute = Router();

MainRoute.use("/user", UserRoute);
MainRoute.use("/project", ProjectRoute);
MainRoute.use("/admin", AdminRoute);
MainRoute.use("/task", TaskRoutes);

export default MainRoute;