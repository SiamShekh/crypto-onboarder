"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Middleware_1 = require("../utils/Middleware");
const task_services_1 = __importDefault(require("../module/task.services"));
const TaskRoutes = (0, express_1.Router)();
TaskRoutes.post("/", Middleware_1.UserVaildation, task_services_1.default.addTask);
TaskRoutes.patch("/", Middleware_1.UserVaildation, task_services_1.default.editTask);
TaskRoutes.delete("/", Middleware_1.UserVaildation, task_services_1.default.deleteTask);
exports.default = TaskRoutes;
;
