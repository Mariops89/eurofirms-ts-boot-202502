import { logic } from "../logic"

interface LoginFormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
    elements: LoginFormElements;
}


interface LoginProps {
    onRegisterClick: () => void;
    onUserLoggedIn: () => void;
}

export const Login = ({ onRegisterClick, onUserLoggedIn }: LoginProps) => {
    const handleSubmit = async (event: React.FormEvent<LoginForm>) => {
        event.preventDefault();

        const form = event.currentTarget;

        const username = form.elements.username.value;
        const password = form.elements.password.value;

        try {
            await logic.loginUser(username, password);

            onUserLoggedIn();
        } catch (error) {
            console.error(error);

            alert((error as Error).message);
        }
    }

    const handleRegisterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        onRegisterClick();
    }

    return <><h1>Login</h1>
        <form onSubmit={handleSubmit}>

            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="username" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="password" />

            <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <a href="#" onClick={handleRegisterClick}>Register</a></p>
    </>
}