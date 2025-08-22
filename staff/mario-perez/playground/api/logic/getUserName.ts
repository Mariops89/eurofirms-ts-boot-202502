import { GetUserName } from "./types"
import { SystemError, NotFoundError } from "../errors"
import { User } from "../data/models"
import { validate } from "../validate"

export const getUserName: GetUserName = (userId) => {
    validate.id(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return user.name
        })
}