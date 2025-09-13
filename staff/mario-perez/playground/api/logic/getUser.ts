import { GetUser } from "./types"
import { User } from "../data/models"
import { errors, validate } from "com"

const { SystemError, NotFoundError } = errors

export const getUser: GetUser = (userId) => {
    validate.id(userId)

    return User.findById(userId).select("-_id -password -__v").lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            const { _id, name, email, username } = user

            return {
                id: _id.toString(),
                name,
                email,
                username
            }
        })
}