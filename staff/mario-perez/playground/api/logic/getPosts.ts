import { GetPosts, PostType } from "./types"
import { SystemError, NotFoundError } from "../errors"
import { User, Post } from "../data/models"
import { validate } from "../validate"

export const getPosts: GetPosts = (userId) => {
    validate.id(userId, "userId")

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Post.find().lean()
        })
        .then(posts => {
            const normalizedPosts = posts.map<PostType>(post => {
                return {
                    id: post._id.toString(),
                    author: post.author.toString(),
                    image: post.image,
                    text: post.text,
                    date: post.date
                }
            })

            return normalizedPosts
        })
}