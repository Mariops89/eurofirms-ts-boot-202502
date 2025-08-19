import { Logic, PostType } from "./types"

import { Schema, Types } from "mongoose"

//import { User, Post } from "../data/models"

//import { SystemError, DuplicityError, CredentialsError, NotFoundError, OwnershipError } from "../errors"
import { Mongoose } from "mongoose"

import { registerUser } from "./registerUser"
import { authenticateUser } from "./authenticateUser"
import { getUserName } from "./getUserName"
import { createPost } from "./createPost"
import { getPosts } from "./getPosts"
import { deletePost } from "./deletePost"

const { ObjectId } = Schema.Types

const logic: Logic = {
    // se puede quitar el tipo de dato si ya se ha especificado en el tipado
    registerUser,
    authenticateUser,
    getUserName,
    createPost,
    getPosts,
    deletePost
}

export {
    logic
}