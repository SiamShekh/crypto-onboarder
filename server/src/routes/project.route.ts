import { Router } from "express";
import project from "../module/project.services";
import { UserVaildation } from "../utils/Middleware";

const ProjectRoute = Router();
ProjectRoute.post("/", UserVaildation, project.addProject);
// UserRoute.patch("/refer-alart",UserVaildation, user.claimReferReward);


export default ProjectRoute;