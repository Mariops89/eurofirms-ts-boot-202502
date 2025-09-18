import { validate } from "com"
import { LoginUser } from "./types"
import { errors } from "com"
import { data } from "../data"
const { SystemError } = errors

export const loginUser: LoginUser = async (username: string, password: string) => {
    // TODO validate input
    validate.username(username)
    validate.password(password)

    return fetch("http://localhost:8080/users/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .then(token => data.setToken(token))
                    .catch(error => { throw new SystemError(error.message) })
            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then((body: { error: string, message: string }) => {
                    const { error, message } = body

                    const constructor = errors[error as keyof typeof errors]

                    throw new constructor(message)
                })
        })
}