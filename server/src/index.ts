import express from "express";
import { PrismaClient } from "../generated/prisma";
import cors from "cors";
import Utility from "./utils/Utilite";
import MainRoute from "./routes/main.route";
import cookie from "cookie-parser";

export const app = express();
export const prisma = new PrismaClient();

app.use(cors({
    origin: ["https://localhost:5173"],
    credentials: true
}));

app.use(express.json());
app.use(cookie());

app.get("/", Utility.CatchAsync(async (req, res) => {
    res.send({
        code: 200,
        msg: "Server is runing",
        data:[]
    })
}))

app.use(MainRoute);

app.use(Utility.Error_Handler);
app.use(Utility.NotFound);

