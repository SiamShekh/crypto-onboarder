import { prisma } from "..";
import { CatchAsync } from "../utils/Utilite";
import jwt from "jsonwebtoken";

const LoginAdmin = CatchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new Error("Email is required.");
    }

    if (!password) {
        throw new Error("Password is required.");
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        const admin = await transactionClient.admins.findFirst({
            where: {
                email,
                password
            }
        });

        if (!admin) {
            const isAdminExist = await transactionClient.admins.findFirst({});
            if (!isAdminExist) {
                const newAdmin = await transactionClient.admins.create({
                    data: {
                        email,
                        password
                    }
                });

                return newAdmin;
            } else {
                throw new Error("The admin credentials are incorrect.");
            }
        } else {
            return admin;
        }
    });

    const token = jwt.sign(result, process.env.SECRET as string);

    res
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            secure: true,
            sameSite: "none",
        })
        .status(200)
        .json(result);
});

const getAdmin = CatchAsync(async(req, res)=> {
    
})

const admin = {
    LoginAdmin
}

export default admin;