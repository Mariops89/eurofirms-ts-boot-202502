import { Types, Schema, model } from "mongoose"

const { ObjectId } = Schema.Types

type UserDocType = {
    _id: Types.ObjectId
    name: string
    email: string
    username: string
    password: string
    __v: number
}

type PostDocType = {
    _id: Types.ObjectId
    author: Types.ObjectId
    image: string
    text: string
    date: Date
    __v: number
}



const user = new Schema<UserDocType>({
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

const post = new Schema<PostDocType>({
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

const User = model<UserDocType>("User", user)
const Post = model<PostDocType>("Post", post)

export {
    UserDocType,
    PostDocType,

    User,
    Post,
}