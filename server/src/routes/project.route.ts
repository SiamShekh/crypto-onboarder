import { Router } from "express";
import project from "../module/project.services";
import { AdminVaildation, UserVaildation } from "../utils/Middleware";

const ProjectRoute = Router();

ProjectRoute.post("/", UserVaildation, project.addProject);
ProjectRoute.get("/", project.getProjects);
ProjectRoute.get("/me", UserVaildation, project.getMyProjects);
ProjectRoute.get("/specific", project.getSpacificProject);
ProjectRoute.patch("/update/:id", UserVaildation, project.updateProject);
ProjectRoute.patch("/delete/:id", UserVaildation, project.softDeleteProject);
ProjectRoute.post("/traffic", project.referrelIp);
ProjectRoute.get("/admin", AdminVaildation, project.getAdminProjects);
ProjectRoute.patch("/admin", AdminVaildation, project.deleteProject);
ProjectRoute.patch("/undo", AdminVaildation, project.undoProject);
ProjectRoute.patch("/verify", AdminVaildation, project.verifyProject);
ProjectRoute.get("/referer", UserVaildation, project.projectReferer);

 
export default ProjectRoute;