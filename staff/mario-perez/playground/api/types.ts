type User = {
    id: string,
    name: string,
    email: string,
    username: string,
    password: string
}

type Post = {
    id: string,
    author: string,
    image: string,
    text: string,
    date: Date
}

type Data = {
    uuid(): string,
    users: User[],
    posts: Post[]
}

type Logic = {
    registerUser(name: string, email: string, username: string, password: string): void
}

export {
    User,
    Post,
    Data,
    Logic
}