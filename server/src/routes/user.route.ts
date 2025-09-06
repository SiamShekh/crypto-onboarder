import { Router } from "express";
import user from "../module/user.services";
import { AdminVaildation, UserVaildation } from "../utils/Middleware";

const UserRoute = Router();

UserRoute.post("/login", user.create_user);
UserRoute.get("/me", UserVaildation, user.getUser);
UserRoute.patch("/username", UserVaildation, user.updateUsername);
UserRoute.get("/admin", AdminVaildation, user.getUserAdmin);

export default UserRoute;