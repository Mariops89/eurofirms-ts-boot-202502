import { Logic } from "./types"

import { IUser, User } from "./models"

import { SystemError, DuplicityError, CredentialsError, NotFoundError } from "./errors"

const logic: Logic = {
    // se puede quitar el tipo de dato si ya se ha especificado en el tipado
    registerUser(name, email, username, password) {
        const user = new User<IUser>({ name, email, username, password })
        return user.save()
            .catch(error => {
                if (error.code === 11000)
                    throw new DuplicityError('user already exists')
                throw new SystemError(error.message)
            })
            .then(user => { })
    },

    authenticateUser(username, password) {
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
        return User.findById(userId)
            .catch(error => { throw new SystemError(error.message) })
            .then(user => {
                if (!user) throw new NotFoundError('user not found')

                return user.name
            })
    }
}

export default logic