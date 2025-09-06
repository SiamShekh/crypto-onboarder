"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const project_route_1 = __importDefault(require("./project.route"));
const admin_route_1 = __importDefault(require("./admin.route"));
const MainRoute = (0, express_1.Router)();
MainRoute.use("/user", user_route_1.default);
MainRoute.use("/project", project_route_1.default);
MainRoute.use("/admin", admin_route_1.default);
exports.default = MainRoute;
