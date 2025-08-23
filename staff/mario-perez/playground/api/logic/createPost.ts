import { CreatePost } from "./types"
import { User, Post } from "../data/models"
import { errors, validate } from "com"

const { SystemError, NotFoundError } = errors

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