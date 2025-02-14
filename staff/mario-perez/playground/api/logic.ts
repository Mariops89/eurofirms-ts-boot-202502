import { Logic } from "./types"
import data from "./data"
import { DuplicityError } from "./errors"
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
}

export default logic