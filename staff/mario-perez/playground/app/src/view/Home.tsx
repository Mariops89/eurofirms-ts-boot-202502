import { logic } from "../logic"
import { useEffect, useState } from "react"
import { UserType } from "../logic/types"


export const Home = () => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const user = await logic.getUser()

                setUser(user)
            } catch (error) {
                console.error(error)

                alert((error as Error).message);
            }
        })()
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home Page!</p>
            <p>{user ? `Hello, ${user.name}` : "Loading..."}</p>
        </div>
    )
}