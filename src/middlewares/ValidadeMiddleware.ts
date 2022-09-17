import { Request, Response, NextFunction } from "express"
import { signupSchema, signinSchema } from "../schema/AuthSchema";
import authRepository from "../repositories/AuthRepository";

export function validatesignUpSchemaMiddleware(req: Request, res: Response, next: NextFunction) {
  const validation = signupSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error).status(422);
  }
  return next();
}

export async function validatesignInSchemaMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.body)
  const validation = signinSchema.validate(req.body);
  if (validation.error) {
    return res.send(validation.error).status(422);
  }
  const { email } = req.body
  const users = await authRepository.getUserByEmail(email)
  if (!users[0]) { throw { type: "conflict", message: "email does not exist" } }
  res.locals.user = users
  console.log("###Mid", res.locals.user)
  return next();
}