import { Router } from "express";
import admin from "../module/admin.services";
import { AdminVaildation } from "../utils/Middleware";

const AdminRoute = Router();

AdminRoute.post("/login", admin.LoginAdmin);
AdminRoute.get("/", AdminVaildation, admin.getAdmin);
AdminRoute.get("/stats", AdminVaildation, admin.stats);

export default AdminRoute;