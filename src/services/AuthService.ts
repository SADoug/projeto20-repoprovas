import bcrypt from "bcrypt"
import authRepository from "../repositories/AuthRepository"
import { users } from "@prisma/client"


export type CreateUser = Omit<users, "id">;

async function UserInsertService(CreateUser: CreateUser) {
    const hashedPassword = bcrypt.hashSync(CreateUser.password, 10)
    const result = await authRepository.getUserByEmail(CreateUser.email)
    if (result[0]) { throw { type: "conflict", message: "email already exists" } }
    await authRepository.insertUserDb(
        CreateUser.email,
        hashedPassword,
    )
}

const AuthService = {
    UserInsertService,
}

export default AuthService
