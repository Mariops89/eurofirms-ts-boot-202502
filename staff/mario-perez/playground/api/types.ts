type Logic = {
    registerUser(name: string, email: string, username: string, password: string): Promise<void>
    authenticateUser(username: string, password: string): Promise<string>
    getUserName(userId: string): Promise<string>
}

export {
    Logic
}