import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { Request, Response } from "express";
import dotenv from "dotenv"
dotenv.config()
import AuthService from "../services/AuthService"
import { users } from "@prisma/client"

export type CreateUser = Omit<users, "id">;

export async function postUser(req: Request, res: Response) {
    const CreateUser = req.body
    await AuthService.UserInsertService(CreateUser);
    res.sendStatus(201)

}

export async function postSignin(req: Request, res: Response) {
    const user = res.locals.user
    const email = req.body.email
    console.log("local storage user", user)
    const secretKey = process.env.JWT_SECRET_KEY || "secret";
    const token: JwtPayload | Secret = jwt.sign(user[0].id, secretKey)
    console.log("your token is", token)

    res.send({ ...user, token, email })

}

