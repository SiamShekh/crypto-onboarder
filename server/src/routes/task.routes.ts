import { Router } from "express";
import { UserVaildation } from "../utils/Middleware";
import task from "../module/task.services";

const TaskRoutes = Router();

TaskRoutes.post("/", UserVaildation, task.addTask);
TaskRoutes.delete("/", UserVaildation, task.deleteTask);

export default TaskRoutes;;