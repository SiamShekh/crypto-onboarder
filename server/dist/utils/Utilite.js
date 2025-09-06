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
const CatchAsync = (fx) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { return Promise.resolve(fx(req, res, next)).catch(next); });
};
exports.CatchAsync = CatchAsync;
const Error_Handler = (err, req, res, next) => {
    if (err instanceof Error) {
        res.send({
            code: 400,
            msg: err === null || err === void 0 ? void 0 : err.message,
            error: err,
            data: []
        });
    }
    else {
        res.send({
            code: 400,
            msg: 'Something went wrong',
            error: err,
            data: []
        });
    }
};
const NotFound = (req, res, next) => {
    res.send({
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
