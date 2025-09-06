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
const __1 = require("..");
const Utilite_1 = require("../utils/Utilite");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LoginAdmin = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        throw new Error("Email is required.");
    }
    if (!password) {
        throw new Error("Password is required.");
    }
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const admin = yield transactionClient.admins.findFirst({
            where: {
                email,
                password
            }
        });
        if (!admin) {
            const isAdminExist = yield transactionClient.admins.findFirst({});
            if (!isAdminExist) {
                const newAdmin = yield transactionClient.admins.create({
                    data: {
                        email,
                        password
                    }
                });
                return newAdmin;
            }
            else {
                throw new Error("The admin credentials are incorrect.");
            }
        }
        else {
            return admin;
        }
    }));
    const token = jsonwebtoken_1.default.sign(result, process.env.SECRET);
    res
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        secure: true,
        sameSite: "none",
    })
        .status(200)
        .json(result);
}));
const getAdmin = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const admin = yield __1.prisma.admins.findUniqueOrThrow({
        where: {
            id: (_a = req === null || req === void 0 ? void 0 : req.admin) === null || _a === void 0 ? void 0 : _a.id
        }
    });
    res.status(200).json(admin);
}));
const stats = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const wallet = yield transactionClient.user.count();
        const project = yield transactionClient.project.count();
        const visitor = yield transactionClient.iP.count();
        const recent10Visitor = yield transactionClient.iP.findMany({
            orderBy: {
                createdAt: "desc"
            },
            take: 10
        });
        return { wallet, project, visitor, ten: recent10Visitor };
    }));
    res.status(200).json(result);
}));
const admin = {
    LoginAdmin,
    getAdmin,
    stats
};
exports.default = admin;
