import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const CatchAsync = (fx: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => Promise.resolve(fx(req, res, next)).catch(next);
}

const Error_Handler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(StatusCodes.BAD_REQUEST).send({
            code: StatusCodes.BAD_REQUEST,
            msg: err?.message,
            data: [],
            ...(process.env?.TS_NODE_DEV && { stack: err.stack })
        });
    } else {
        res.status(StatusCodes.BAD_REQUEST).send({
            code: StatusCodes.BAD_REQUEST,
            msg: 'Something went wrong',
            ...(process.env?.TS_NODE_DEV && { stack: err.stack }),
            data: []
        });
    }
};

const NotFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).send({
        code: 200,
        msg: "path not found",
        path: req?.path,
        data: []
    });
};

const Utility = {
    NotFound,
    Error_Handler,
    CatchAsync
}

export default Utility;