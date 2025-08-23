import { AuthenticateUser } from "./types"
import { User } from "../data/models"
import { errors, validate } from "com"

const { SystemError, CredentialsError } = errors

export const authenticateUser: AuthenticateUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return User.findOne({ username })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user || user.password !== password) {
                throw new CredentialsError("Wrong credentials")
            }
            return user.id
        })
}