import { Logic, PostType } from "./types"

import { Schema, Types } from "mongoose"

import { IUser, IPost, User, Post } from "./models"

import { SystemError, DuplicityError, CredentialsError, NotFoundError } from "./errors"
import { Mongoose } from "mongoose"

const { ObjectId } = Schema.Types

const logic: Logic = {
    // se puede quitar el tipo de dato si ya se ha especificado en el tipado
    registerUser(name, email, username, password) {
        // TODO input validation
        return User.create({ name, email, username, password })
            .catch(error => {
                if (error.code === 11000)
                    throw new DuplicityError('user already exists')
                throw new SystemError(error.message)
            })
            .then(user => { })
    },

    authenticateUser(username, password) {
        // TODO input validation
        return User.findOne({ username })
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user || user.password !== password) {
                    throw new CredentialsError('Wrong credentials')
                }
                return user.id
            })
    },

    getUserName(userId) {
        // TODO input validation
        return User.findById(userId)
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('user not found')

                return user.name
            })
    },

    createPost(userId, image, text) {
        // TODO input validation
        return User.findById(userId)
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('user not found')

                return Post.create({ author: userId, image, text })
                    .catch(error => { throw new SystemError(error.message) })
            })
            .then(post => { })
    },

    getPosts(userId) {
        // TODO input validation
        return User.findById(userId)
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('user not found')

                return Post.find().lean()
            })
            .then(posts => {
                const normalizedPosts = posts.map(post => {
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
    },
}

export default logic