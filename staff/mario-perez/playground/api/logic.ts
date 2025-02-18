import { Logic } from "./types"
import data from "./data"
import { DuplicityError, CredentialsError } from "./errors"
const logic: Logic = {
    registerUser(name: string, email: string, username: string, password: string) {
        let user = data.users.find(user => user.email === email || user.username === username)

        if (user) throw new DuplicityError('user already exists')

        user = {
            id: data.uuid(),
            name,
            email,
            username,
            password
        }

        data.users.push(user)
    },

    authenticateUser(username: string, password: string) {

        let user = data.users.find(user => user.username === username)

        if (!user || user.password !== password) {
            throw new CredentialsError('Wrong credentials')
        }
        return user.id
    }
}

export default logic