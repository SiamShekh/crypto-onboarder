import { Router } from "express";
import project from "../module/project.services";
import { UserVaildation } from "../utils/Middleware";

const ProjectRoute = Router();

ProjectRoute.post("/", UserVaildation, project.addProject);
ProjectRoute.get("/", UserVaildation, project.getProjects);

export default ProjectRoute;