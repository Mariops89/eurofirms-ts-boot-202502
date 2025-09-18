import { RegisterUser } from "./types"
import { validate, errors } from "com"
const { SystemError } = errors

export const registerUser: RegisterUser = (name, email, username, password) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    return fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, username, password })
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 201) return


            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then((body: { error: string, message: string }) => {
                    const { error, message } = body


                    const constructor = errors[error as keyof typeof errors]

                    throw new constructor(message)
                })
        })
}