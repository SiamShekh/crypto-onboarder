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
const IpCollect_1 = __importDefault(require("../utils/IpCollect"));
const Utilite_1 = require("../utils/Utilite");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const create_user = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req === null || req === void 0 ? void 0 : req.body;
    if (!address) {
        throw new Error("Wallet address is required");
    }
    const tx = yield __1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield tx.user.findFirst({
            where: {
                solAddress: address
            }
        });
        if (user) {
            return user;
        }
        const val = yield tx.user.create({
            data: {
                solAddress: address
            }
        });
        return val;
    }));
    (0, IpCollect_1.default)(tx === null || tx === void 0 ? void 0 : tx.id, 'login time ip.');
    const token = jsonwebtoken_1.default.sign(tx, process.env.SECRET);
    res.cookie('token', token, { httpOnly: false, maxAge: 1000 * 60 * 60, secure: true, sameSite: "none" }).send({ status: true });
}));
const getUser = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const user = yield transactionClient
            .user
            .findFirstOrThrow({
            where: {
                id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
            },
        });
        return { user };
    }));
    res.status(200).send(result);
}));
const updateUsername = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req === null || req === void 0 ? void 0 : req.body;
    if (!username) {
        throw new Error("Username is required");
    }
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const user = yield transactionClient.user.findFirst({
            where: {
                username: username
            }
        });
        if (user) {
            throw new Error("Username already exsits, use another one.");
        }
        const updateUsername = yield transactionClient.user.update({
            where: {
                id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
            },
            data: {
                username: username
            }
        });
        return updateUsername;
    }));
    res.status(200).send({ status: true, result });
}));
const getUserAdmin = ((0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const users = yield __1.prisma.user.findMany({
        take: 10,
        orderBy: {
            connectAt: "desc"
        },
        skip: Number(page || 0) * 10,
        select: {
            username: true,
            solAddress: true,
            ips: {
                take: 1,
                orderBy: {
                    createdAt: "desc"
                },
                select: {
                    ip: true,
                    city: true,
                    timezone: true,
                    country: true
                }
            }
        }
    });
    res.status(200).json(users);
})));
const user = {
    create_user,
    getUser,
    updateUsername,
    getUserAdmin
};
exports.default = user;
