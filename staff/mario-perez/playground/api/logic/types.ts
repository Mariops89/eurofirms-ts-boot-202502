type PostType = {
    id: string
    image: string
    text: string
    date: Date
}


type RegisterUser = (name: string, email: string, username: string, password: string) => Promise<void>

type AuthenticateUser = (username: string, password: string) => Promise<string>

type GetUserName = (userId: string) => Promise<string>

type CreatePost = (userId: string, image: string, text: string) => Promise<void>

type GetPosts = (userId: string) => Promise<PostType[]>

type DeletePost = (userId: string, postId: string) => Promise<void>

type Logic = {
    registerUser: RegisterUser
    authenticateUser: AuthenticateUser
    getUserName: GetUserName
    createPost: CreatePost
    getPosts: GetPosts
    deletePost: DeletePost
}

export {
    Logic,
    RegisterUser,
    AuthenticateUser,
    GetUserName,
    CreatePost,
    GetPosts,
    DeletePost,
    PostType
}