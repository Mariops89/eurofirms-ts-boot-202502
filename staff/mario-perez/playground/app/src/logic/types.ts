type UserType = {
    id: string
    name: string
    email: string
    username: string
}

type RegisterUser = (name: string, email: string, username: string, password: string) => Promise<void>

type LoginUser = (username: string, password: string) => Promise<void>

type GetUser = () => Promise<UserType>

type Logic = {
    registerUser: RegisterUser
    loginUser: LoginUser
    getUser: GetUser
}

export {
    RegisterUser,
    Logic,
    LoginUser,
    GetUser,
    UserType
}