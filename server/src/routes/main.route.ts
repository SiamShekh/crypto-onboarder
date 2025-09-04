import { Router } from "express";
import UserRoute from "./user.route";
import ProjectRoute from "./project.route";

const MainRoute = Router();
MainRoute.use("/user", UserRoute);
MainRoute.use("/project", ProjectRoute);

export default MainRoute;