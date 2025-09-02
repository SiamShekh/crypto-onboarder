import { Router } from "express";
import telegram from "../module/telegram.services";
import { UserVaildation } from "../utils/Middleware";

const telegramRoute = Router();
telegramRoute.get('/channel', UserVaildation, telegram.getChannel);
telegramRoute.patch('/verify', UserVaildation, telegram.checkTelegramJoin);
telegramRoute.get('/share-invite-link', UserVaildation, telegram.preparedInlineMessage);

export default telegramRoute;