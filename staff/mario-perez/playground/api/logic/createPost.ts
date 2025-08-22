import { CreatePost } from "./types"
import { SystemError, NotFoundError } from "../errors"
import { User, Post } from "../data/models"
import { validate } from "../validate"

export const createPost: CreatePost = (userId, image, text) => {
    validate.id(userId, "userId")
    validate.url(image, "image")
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Post.create({ author: userId, image, text })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => { })
}