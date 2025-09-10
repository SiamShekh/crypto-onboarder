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
const Utilite_1 = require("../utils/Utilite");
const addTask = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const { projectId, taskLabel, taskImg, taskHref } = body;
    if (!projectId) {
        throw new Error("Project id is required");
    }
    if (!taskLabel) {
        throw new Error("Label is required");
    }
    if (!taskImg) {
        throw new Error("Icon is required");
    }
    if (!taskHref) {
        throw new Error("Task link is required");
    }
    const task = yield __1.prisma.task.create({
        data: {
            projectId: Number(projectId),
            taskLabel,
            taskHref,
            taskImg,
            userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id
        }
    });
    res.status(200).json(task);
}));
const deleteTask = (0, Utilite_1.CatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    if (!id) {
        throw new Error("Task id required");
    }
    const result = yield __1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield transactionClient.task.findUniqueOrThrow({
            where: {
                id
            }
        });
        const deleted = yield transactionClient.task.delete({
            where: {
                id
            }
        });
        return deleted;
    }));
    res.status(200).json(result);
}));
const task = {
    addTask,
    deleteTask
};
exports.default = task;
