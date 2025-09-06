"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_services_1 = __importDefault(require("../module/user.services"));
const Middleware_1 = require("../utils/Middleware");
const UserRoute = (0, express_1.Router)();
UserRoute.post("/login", user_services_1.default.create_user);
UserRoute.get("/me", Middleware_1.UserVaildation, user_services_1.default.getUser);
UserRoute.patch("/username", Middleware_1.UserVaildation, user_services_1.default.updateUsername);
UserRoute.get("/admin", Middleware_1.AdminVaildation, user_services_1.default.getUserAdmin);
exports.default = UserRoute;
