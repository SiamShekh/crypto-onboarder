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
exports.CatchAsync = void 0;
const http_status_codes_1 = require("http-status-codes");
const CatchAsync = (fx) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return Promise.resolve(fx(req, res, next)).catch(next); });
};
exports.CatchAsync = CatchAsync;
const Error_Handler = (err, req, res, next) => {
    var _a, _b;
    if (err instanceof Error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(Object.assign({ code: http_status_codes_1.StatusCodes.BAD_REQUEST, msg: err === null || err === void 0 ? void 0 : err.message, data: [] }, (((_a = process.env) === null || _a === void 0 ? void 0 : _a.TS_NODE_DEV) && { stack: err.stack })));
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(Object.assign(Object.assign({ code: http_status_codes_1.StatusCodes.BAD_REQUEST, msg: 'Something went wrong' }, (((_b = process.env) === null || _b === void 0 ? void 0 : _b.TS_NODE_DEV) && { stack: err.stack })), { data: [] }));
    }
};
const NotFound = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
        code: 200,
        msg: "path not found",
        path: req === null || req === void 0 ? void 0 : req.path,
        data: []
    });
};
const Utility = {
    NotFound,
    Error_Handler,
    CatchAsync: exports.CatchAsync
};
exports.default = Utility;
