import { Types, Schema, model } from "mongoose"

const { ObjectId } = Schema.Types

interface IUser {
    name: string
    email: string
    username: string
    password: string
}

interface IPost {
    author: Types.ObjectId
    image: string
    text: string
    date: Date
}



const user = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const post = new Schema<IPost>({
    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
})

const User = model<IUser>("User", user)
const Post = model<IPost>("Post", post)

export {
    IUser,
    IPost,
    User,
    Post
}