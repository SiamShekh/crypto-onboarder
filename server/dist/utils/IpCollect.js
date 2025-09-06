"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const IpCollect = (userTg, info) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield fetch(`https://ipinfo.io/?token=c79e99d0e5c9f5`);
    const requestJson = yield request.json();
    return yield __1.prisma.iP.create({
        data: {
            info,
            userId: userTg,
            ip: requestJson === null || requestJson === void 0 ? void 0 : requestJson.ip,
            city: requestJson === null || requestJson === void 0 ? void 0 : requestJson.city,
            country: requestJson === null || requestJson === void 0 ? void 0 : requestJson.country,
            loc: requestJson === null || requestJson === void 0 ? void 0 : requestJson.loc,
            org: requestJson === null || requestJson === void 0 ? void 0 : requestJson.org,
            postal: requestJson === null || requestJson === void 0 ? void 0 : requestJson.postal,
            timezone: requestJson === null || requestJson === void 0 ? void 0 : requestJson.timezone,
            region: requestJson === null || requestJson === void 0 ? void 0 : requestJson.region,
        }
    });
});
exports.default = IpCollect;
