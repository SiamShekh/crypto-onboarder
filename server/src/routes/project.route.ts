import { Router } from "express";
import project from "../module/project.services";
import { UserVaildation } from "../utils/Middleware";

const ProjectRoute = Router();

ProjectRoute.post("/", UserVaildation, project.addProject);
ProjectRoute.get("/",  project.getProjects);
ProjectRoute.get("/me", UserVaildation, project.getMyProjects);

export default ProjectRoute;