const { errors } = await import("com")
import { GetUser, UserType } from "./types"
const { SystemError } = errors
import { data } from "../data";

export const getUser: GetUser = async (): Promise<UserType> => {
    const token = data.getToken()
    if (!token) throw new Error("token is missing")
    return fetch("http://localhost:8080/users/self", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })
                    .then((user) => user as UserType)

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then((body: { error: string, message: string }) => {
                    const { error, message } = body

                    const constructor = errors[error as keyof typeof errors]

                    throw new constructor(message)
                })
        })
}