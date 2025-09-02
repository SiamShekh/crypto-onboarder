import { Router } from "express";
import UserRoute from "./user.route";
import telegramRoute from "./telegram.route";
import TapRoute from "./tap.route";

const MainRoute = Router();
MainRoute.use("/user", UserRoute);
MainRoute.use("/telegram", telegramRoute);
MainRoute.use("/tap", TapRoute);

export default MainRoute;