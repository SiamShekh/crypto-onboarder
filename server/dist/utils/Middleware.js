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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVaildation = exports.UserVaildation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const Utilite_1 = require("./Utilite");
exports.UserVaildation = (0, Utilite_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req === null || req === void 0 ? void 0 : req.cookies.token;
    if (!token) {
        throw new Error("token not found");
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            next(err);
        const user = yield __1.prisma.user.findUniqueOrThrow({
            where: {
                id: decode === null || decode === void 0 ? void 0 : decode.id
            }
        });
        req.user = {
            id: user === null || user === void 0 ? void 0 : user.id,
            address: user.solAddress
        };
        if (user)
            next();
    }));
}));
exports.AdminVaildation = (0, Utilite_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req === null || req === void 0 ? void 0 : req.cookies.token;
    if (!token) {
        throw new Error("token not found");
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            next(err);
        const admin = yield __1.prisma.admins.findUniqueOrThrow({
            where: {
                id: decode === null || decode === void 0 ? void 0 : decode.id
            }
        });
        req.admin = {
            id: admin === null || admin === void 0 ? void 0 : admin.id,
            email: admin.email,
            password: admin.password
        };
        if (admin)
            next();
    }));
}));
