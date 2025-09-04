import { Router } from "express";
import project from "../module/project.services";
import { UserVaildation } from "../utils/Middleware";

const ProjectRoute = Router();

ProjectRoute.post("/", UserVaildation, project.addProject);
ProjectRoute.get("/",  project.getProjects);
ProjectRoute.get("/me", UserVaildation, project.getMyProjects);
ProjectRoute.get("/specific", UserVaildation, project.getSpacificProject);
ProjectRoute.patch("/update/:id", UserVaildation, project.updateProject);

export default ProjectRoute;