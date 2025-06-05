import { Schema, model } from 'mongoose'

interface IUser {
    name: string
    email: string
    username: string
    password: string
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

const User = model<IUser>('User', user)

export {
    IUser,
    User
}