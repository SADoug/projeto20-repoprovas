import Joi from "joi";
import { CreateUserData } from "../services/userService.js";

export const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password')
});
