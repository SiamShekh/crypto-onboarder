import { Router } from "express";
import admin from "../module/admin.services";

const AdminRoute = Router();

AdminRoute.post("/login", admin.LoginAdmin);

export default AdminRoute;