import { useState } from "react"

import { Register } from "./view/Register"
import { Login } from "./view/Login"
import { Home } from "./view/Home"

function App() {
  const [view, setView] = useState("login")

  const handleLoginClick = () => {
    setView("login")
  }

  const handleRegisterClick = () => {
    setView("register")
  }

  const handleUserRegister = () => {
    setView("login")
  }

  const handleUserLogin = () => setView("home")

  return <>
    {view === "register" && <Register onLoginClick={handleLoginClick} onUserRegistered={handleUserRegister} />}
    {view === "login" && <Login onRegisterClick={handleRegisterClick} onUserLoggedIn={handleUserLogin} />}
    {view === "home" && <Home />}
  </>
}

export default App
