import { AuthenticateUser } from "./types"
import { SystemError, CredentialsError } from "../errors"
import { User } from "../data/models"
export const authenticateUser: AuthenticateUser = (username, password) => {
    // TODO input validation
    return User.findOne({ username })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user || user.password !== password) {
                throw new CredentialsError("Wrong credentials")
            }
            return user.id
        })
}