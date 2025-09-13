import { logic } from "../logic"

export const Register = () => {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value

        try {
            logic.registerUser(name, email, username, password)
        } catch (error) {
            console.error(error)

            alert((error as Error).message)
        }
    }



    return <><h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="name" />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email" />

            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" />

            <button type="submit">Register</button>
        </form>
    </>
}
