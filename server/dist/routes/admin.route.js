"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_services_1 = __importDefault(require("../module/admin.services"));
const Middleware_1 = require("../utils/Middleware");
const AdminRoute = (0, express_1.Router)();
AdminRoute.post("/login", admin_services_1.default.LoginAdmin);
AdminRoute.get("/", Middleware_1.AdminVaildation, admin_services_1.default.getAdmin);
AdminRoute.get("/stats", Middleware_1.AdminVaildation, admin_services_1.default.stats);
exports.default = AdminRoute;
