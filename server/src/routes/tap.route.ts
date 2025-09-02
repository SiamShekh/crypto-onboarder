import { Router } from "express";
import { UserVaildation } from "../utils/Middleware";
import tap from "../module/tap.services";

const TapRoute = Router();
TapRoute.post(`/`, UserVaildation, tap.newTap);

export default TapRoute;