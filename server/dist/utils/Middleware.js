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
    const decode = yield jsonwebtoken_1.default.verify(token, process.env.SECRET);
    const userDecode = decode;
    if (!userDecode) {
        throw new Error("Jwt not found");
    }
    const user = yield __1.prisma.user.findFirst({
        where: {
            id: userDecode.id
        }
    });
    if (!user) {
        throw new Error("User not found");
    }
    req.user = {
        id: user === null || user === void 0 ? void 0 : user.id,
        address: user.solAddress
    };
    if (user)
        next();
}));
exports.AdminVaildation = (0, Utilite_1.CatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req === null || req === void 0 ? void 0 : req.cookies.token;
    if (!token) {
        throw new Error("Token not found");
    }
    const decode = yield jsonwebtoken_1.default.verify(token, process.env.SECRET);
    if (!decode) {
        throw new Error("Payload user not found");
    }
    const decodeUser = decode;
    if (!(decodeUser === null || decodeUser === void 0 ? void 0 : decodeUser.id) || !(decodeUser === null || decodeUser === void 0 ? void 0 : decodeUser.email) || !(decodeUser === null || decodeUser === void 0 ? void 0 : decodeUser.password)) {
        throw new Error("Payload not contain enough data");
    }
    const admin = yield __1.prisma.admins.findUniqueOrThrow({
        where: {
            id: decodeUser === null || decodeUser === void 0 ? void 0 : decodeUser.id
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
