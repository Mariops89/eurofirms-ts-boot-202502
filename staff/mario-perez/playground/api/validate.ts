import { z, ZodSchema } from "zod"
import { ValidationError } from "./errors"

function validateWithSchema<T>(schema: ZodSchema<T>, data: unknown, explain = "data") {
    const result = schema.safeParse(data)

    if (result.success)
        return

    throw new ValidationError(`invalid ${explain}: (${result.error.issues[0]?.message || "validation failed"}`)
}

const EMAIL_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const nameSchema = z.string().min(1).max(30)
const emailSchema = z.string().refine(value => EMAIL_REGEX.test(value), { message: "wrong email format" })
const usernameSchema = z.string().min(3).max(30)
const passwordSchema = z.string().min(8).max(100)



export const validate = {
    name(name: string, explain = "name") {
        validateWithSchema(nameSchema, name, explain)
    },
    email(email: string, explain = "email") {
        validateWithSchema(emailSchema, email, explain)
    },
    username(username: string, explain = "username") {
        validateWithSchema(usernameSchema, username, explain)
    },
    password(password: string, explain = "password") {
        validateWithSchema(passwordSchema, password, explain)
    }
}