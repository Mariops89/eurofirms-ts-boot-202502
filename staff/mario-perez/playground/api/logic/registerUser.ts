import { User } from "../data/models"
import { RegisterUser } from "./types"
import { errors, validate } from "com"

const { DuplicityError, SystemError } = errors

export const registerUser: RegisterUser = (name, email, username, password) => {
    validate.name(name), "name"
    validate.email(email), "email"
    validate.username(username), "username"
    validate.password(password), "password"

    return User.create({ name, email, username, password })
        .catch(error => {
            if (error.code === 11000)
                throw new DuplicityError("user already exists")
            throw new SystemError(error.message)
        })
        .then(user => { })
}