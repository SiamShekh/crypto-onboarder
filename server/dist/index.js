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
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../generated/prisma");
const cors_1 = __importDefault(require("cors"));
const Utilite_1 = __importDefault(require("./utils/Utilite"));
const main_route_1 = __importDefault(require("./routes/main.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
exports.prisma = new prisma_1.PrismaClient();
exports.app.use((0, cors_1.default)({
    origin: "*",
    // origin: ["https://localhost:5173","https://api.whybuy.fun"],
    credentials: true
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.get("/", Utilite_1.default.CatchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({
        code: 200,
        msg: "Server is runing",
        data: []
    });
})));
exports.app.use(main_route_1.default);
exports.app.use(Utilite_1.default.Error_Handler);
exports.app.use(Utilite_1.default.NotFound);
