import { DeletePost } from "./types"
import { User, Post } from "../data/models"
import { SystemError, NotFoundError, OwnershipError } from "../errors"

export const deletePost: DeletePost = (userId, postId) => {
    //TODO input validation
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError("user not found")

            return Post.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => {
            if (!post) throw new NotFoundError("post not found")

            if (post.author.toString() !== userId) throw new OwnershipError("user is not author of post")

            return Post.deleteOne({ _id: postId })
                .catch(error => { throw new SystemError(error.message) })
        })
        // hay que devolver una promesa vacía, como el deleteOne devuelve una promesa, ponemos un then con un return vacio
        .then(() => { })
}