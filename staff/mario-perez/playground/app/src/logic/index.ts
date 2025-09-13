import { Logic } from "./types"

import { validate, errors } from "com"

const { SystemError } = errors

const logic: Logic = {
    registerUser(name, email, username, password) {
        // TODO validate input
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

                        // @ts-ignore

                        const constructor = errors[error]

                        throw new constructor(message)
                    })
            })
    }
}

export {
    logic
}
