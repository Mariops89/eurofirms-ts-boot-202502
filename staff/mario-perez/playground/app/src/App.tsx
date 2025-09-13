import { useState } from "react"

import { Register } from "./view/Register"

function App() {
  const [view, setView] = useState("register")

  return <>
    {view === "register" && <Register />}
  </>
}

export default App
