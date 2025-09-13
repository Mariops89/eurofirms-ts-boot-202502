type RegisterUser = (name: string, email: string, username: string, password: string) => Promise<void>

type Logic = {
    registerUser: RegisterUser
}

export {
    RegisterUser,
    Logic
}